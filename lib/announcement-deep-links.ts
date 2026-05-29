export const DEFAULT_ANNOUNCEMENT_DEEP_LINK = 'app://notifications';

export function buildSessionDeepLink(sessionId: string): string {
  return `/(main)/agenda/${sessionId}`;
}

export function extractSessionIdFromDeepLink(url?: string | null): string | null {
  const trimmed = String(url || '').trim();
  if (!trimmed) return null;

  const patterns = [
    /\/\(main\)\/agenda\/([^/?#]+)/i,
    /\/agenda\/([^/?#]+)/i,
    /agenda\/([^/?#]+)/i,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return decodeURIComponent(match[1]);
  }

  return null;
}

export function isNotificationsDeepLink(url?: string | null): boolean {
  const trimmed = String(url || '').trim().toLowerCase();
  if (!trimmed) return true;
  return (
    trimmed === DEFAULT_ANNOUNCEMENT_DEEP_LINK.toLowerCase() ||
    trimmed.includes('/hub/notifications') ||
    trimmed.includes('://notifications')
  );
}
