import { createHmac, timingSafeEqual } from 'node:crypto';
import { requestGraphQL } from '@/lib/appsync';

const GIF_1X1 = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64',
);

const GET_SEND_TRACKING = /* GraphQL */ `
  query GetApsEmailSend($id: ID!) {
    getApsEmailSend(id: $id) {
      id
      openedAt
      openCount
      clickedAt
      clickCount
      lastClickedUrl
    }
  }
`;

const UPDATE_SEND_TRACKING = /* GraphQL */ `
  mutation UpdateApsEmailSend($input: UpdateApsEmailSendInput!) {
    updateApsEmailSend(input: $input) {
      id
    }
  }
`;

type SendTracking = {
  id: string;
  openedAt?: string | null;
  openCount?: number | null;
  clickedAt?: string | null;
  clickCount?: number | null;
  lastClickedUrl?: string | null;
};

export function getEmailTrackingGif(): Buffer {
  return GIF_1X1;
}

function getTrackingSecret(): string | null {
  return (
    process.env.APS_EMAIL_TRACKING_SECRET ||
    process.env.APS_EMAIL_CRON_SECRET ||
    null
  );
}

export function getTrackingBaseUrl(): string | null {
  const explicit =
    process.env.APS_EMAIL_TRACKING_BASE_URL || process.env.APS_ADMIN_URL;
  if (explicit) return explicit.replace(/\/$/, '');
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`;
  }
  return null;
}

function sign(value: string): string {
  const secret = getTrackingSecret();
  if (!secret) throw new Error('Missing email tracking secret');
  return createHmac('sha256', secret).update(value).digest('base64url');
}

function tokensMatch(expected: string, received: string): boolean {
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function verifyOpenToken(sendId: string, token: string): boolean {
  try {
    return tokensMatch(sign(`open:${sendId}`), token);
  } catch {
    return false;
  }
}

export function verifyClickToken(
  sendId: string,
  destination: string,
  token: string,
): boolean {
  try {
    return tokensMatch(sign(`click:${sendId}:${destination}`), token);
  } catch {
    return false;
  }
}

export function isAllowedRedirect(destination: string): boolean {
  try {
    const parsed = new URL(destination);
    return (
      parsed.protocol === 'https:' ||
      parsed.protocol === 'http:' ||
      parsed.protocol === 'mailto:' ||
      parsed.protocol === 'tel:'
    );
  } catch {
    return false;
  }
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function escapeHtmlAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function shouldTrackHref(href: string): boolean {
  if (!href) return false;
  const trimmed = href.trim();
  if (trimmed.startsWith('#')) return false;
  if (trimmed.includes('/api/email/t/')) return false;
  return isAllowedRedirect(trimmed);
}

function openUrl(sendId: string): string {
  const token = sign(`open:${sendId}`);
  return `${getTrackingBaseUrl()}/api/email/t/open?s=${encodeURIComponent(sendId)}&t=${token}`;
}

function clickUrl(sendId: string, destination: string): string {
  const token = sign(`click:${sendId}:${destination}`);
  return `${getTrackingBaseUrl()}/api/email/t/click?s=${encodeURIComponent(sendId)}&t=${token}&u=${encodeURIComponent(destination)}`;
}

function rewriteHrefs(html: string, sendId: string): string {
  return html.replace(
    /(\shref\s*=\s*)(["'])([^"']*?)\2/gi,
    (full, prefix: string, quote: string, raw: string) => {
      const href = decodeHtmlEntities(raw).trim();
      if (!shouldTrackHref(href)) return full;
      return `${prefix}${quote}${escapeHtmlAttr(clickUrl(sendId, href))}${quote}`;
    },
  );
}

function injectPixel(html: string, sendId: string): string {
  const pixel = `<img src="${openUrl(sendId)}" width="1" height="1" alt="" style="display:none;width:1px;height:1px;border:0;" />`;
  if (/<body\b[^>]*>/i.test(html)) {
    return html.replace(/<body\b[^>]*>/i, (match) => `${match}${pixel}`);
  }
  return `${pixel}${html}`;
}

/** Wrap links and inject an open pixel. On any failure, returns the original HTML. */
export function applyEmailTracking(html: string, sendId: string): string {
  try {
    if (!html || !sendId) return html;
    if (!getTrackingSecret()) return html;
    if (!getTrackingBaseUrl()) return html;
    return injectPixel(rewriteHrefs(html, sendId), sendId);
  } catch (error) {
    console.error('Email tracking wrap failed; sending original HTML.', error);
    return html;
  }
}

async function loadSendTracking(sendId: string): Promise<SendTracking | null> {
  try {
    const data = await requestGraphQL<{ getApsEmailSend?: SendTracking | null }>(
      GET_SEND_TRACKING,
      { id: sendId },
      { authMode: 'apiKey' },
    );
    return data.getApsEmailSend ?? null;
  } catch {
    return { id: sendId };
  }
}

async function saveSendTracking(
  input: Record<string, unknown>,
): Promise<void> {
  await requestGraphQL(
    UPDATE_SEND_TRACKING,
    { input },
    { authMode: 'apiKey' },
  );
}

export async function recordEmailOpen(sendId: string): Promise<void> {
  const now = new Date().toISOString();
  const current = await loadSendTracking(sendId);
  try {
    await saveSendTracking({
      id: sendId,
      openedAt: current?.openedAt || now,
      openCount: (current?.openCount ?? 0) + 1,
    });
  } catch (error) {
    console.error('Failed to persist email open.', error);
  }
}

export async function recordEmailClick(
  sendId: string,
  destination: string,
): Promise<void> {
  const now = new Date().toISOString();
  const current = await loadSendTracking(sendId);
  try {
    await saveSendTracking({
      id: sendId,
      openedAt: current?.openedAt || now,
      openCount: current?.openCount ?? 1,
      clickedAt: now,
      clickCount: (current?.clickCount ?? 0) + 1,
      lastClickedUrl: destination.slice(0, 500),
    });
  } catch (error) {
    console.error('Failed to persist email click.', error);
  }
}
