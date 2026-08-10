import { NextRequest, NextResponse } from 'next/server';
import {
  processDueEmailCampaigns,
  runEmailCampaign,
} from '@/app/actions/emails';

type RunCampaignBody = {
  campaignId?: string;
  action?: 'processDue' | string;
  secret?: string;
};

function isAuthorized(req: NextRequest, bodySecret?: string): boolean {
  const secret = process.env.APS_EMAIL_CRON_SECRET;
  if (!secret) return false;

  const header =
    req.headers.get('x-aps-email-secret') ||
    req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

  if (header && header === secret) return true;
  if (bodySecret && bodySecret === secret) return true;
  return false;
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
    if (body.action === 'processDue' || !body.campaignId) {
      const result = await processDueEmailCampaigns();
      return NextResponse.json({ ok: true, ...result });
    }

    const result = await runEmailCampaign(body.campaignId);
    return NextResponse.json({
      ok: true,
      campaignId: result.campaign.id,
      status: result.campaign.status,
      sentCount: result.sentCount,
      failedCount: result.failedCount,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Send failed';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
