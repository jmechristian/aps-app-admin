export const DEFAULT_ANNOUNCEMENT_DEEP_LINK = 'app://notifications';

export const PROFILE_DEEP_LINK = '/(main)/profile';

export const ANNOUNCEMENT_SCREEN_LINKS = [
  { id: 'notifications', label: 'Notifications', path: '' },
  { id: 'profile', label: 'Profile', path: PROFILE_DEEP_LINK },
  { id: 'hub', label: 'Hub', path: '/(main)/hub' },
  { id: 'agenda', label: 'Agenda', path: '/(main)/agenda' },
  { id: 'engage', label: 'Engage', path: '/(main)/engage' },
  { id: 'community', label: 'Community', path: '/(main)/community' },
] as const;

export type AnnouncementScreenId =
  (typeof ANNOUNCEMENT_SCREEN_LINKS)[number]['id'];

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

export function matchAnnouncementScreen(
  url?: string | null,
): (typeof ANNOUNCEMENT_SCREEN_LINKS)[number] | null {
  const trimmed = String(url || '').trim();
  if (!trimmed || isNotificationsDeepLink(trimmed)) {
    return ANNOUNCEMENT_SCREEN_LINKS[0];
  }
  if (extractSessionIdFromDeepLink(trimmed)) return null;
  return (
    ANNOUNCEMENT_SCREEN_LINKS.find(
      (screen) => screen.path && screen.path === trimmed,
    ) ?? null
  );
}
