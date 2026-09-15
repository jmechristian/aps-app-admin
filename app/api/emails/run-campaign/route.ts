import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import {
  processDueEmailCampaigns,
  runEmailCampaign,
} from '@/app/actions/emails';

export const maxDuration = 300;

type RunCampaignBody = {
  campaignId?: string;
  action?: 'processDue' | string;
  secret?: string;
};

function cronSecrets(): string[] {
  return [
    process.env.APS_EMAIL_CRON_SECRET,
    process.env.CRON_SECRET,
    process.env.APS_EMAIL_TRACKING_SECRET,
  ].filter((value): value is string => Boolean(value?.trim()));
}

function matchesSecret(
  candidate: string | null | undefined,
  secrets: string[],
): boolean {
  if (!candidate) return false;
  const provided = Buffer.from(candidate);
  return secrets.some((secret) => {
    const expected = Buffer.from(secret);
    if (provided.length !== expected.length) return false;
    return timingSafeEqual(provided, expected);
  });
}

function isAuthorized(req: NextRequest, bodySecret?: string): boolean {
  const secrets = cronSecrets();
  if (secrets.length === 0) return false;

  const header =
    req.headers.get('x-aps-email-secret') ||
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  return matchesSecret(header, secrets) || matchesSecret(bodySecret, secrets);
}

async function runDueOrCampaign(body: RunCampaignBody) {
  if (body.action === 'processDue' || !body.campaignId) {
    const result = await processDueEmailCampaigns();
    return { ok: true, ...result };
  }

  const result = await runEmailCampaign(body.campaignId);
  return {
    ok: true,
    campaignId: result.campaign.id,
    status: result.campaign.status,
    sentCount: result.sentCount,
    failedCount: result.failedCount,
  };
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await processDueEmailCampaigns();
    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Send failed';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  let body: RunCampaignBody = {};
  try {
    body = (await req.json()) as RunCampaignBody;
  } catch {
    body = {};
  }

  if (!isAuthorized(req, body.secret)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    return NextResponse.json(await runDueOrCampaign(body));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Send failed';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
