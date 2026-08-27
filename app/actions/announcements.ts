'use server';

import {
  fetchRegistrantsByApsId,
} from '@/app/actions/registrants';
import type { RegistrantTypeFilter } from '@/app/actions/emails';

export async function previewAnnouncementAudience(params: {
  eventId: string;
  audienceTypes?: RegistrantTypeFilter[] | null;
}): Promise<{
  broadcast: boolean;
  count: number;
  sample: Array<{ id: string; email: string; name: string }>;
}> {
  const types = (params.audienceTypes ?? []).filter(Boolean);
  const all = await fetchRegistrantsByApsId(params.eventId);
  const typeSet = types.length ? new Set(types.map(String)) : null;

  const filtered = all.filter((registrant) => {
    if (typeSet && !typeSet.has(registrant.attendeeType)) return false;
    return Boolean(registrant.appUser?.id);
  });

  return {
    broadcast: types.length === 0,
    count: filtered.length,
    sample: filtered.slice(0, 8).map((registrant) => ({
      id: registrant.id,
      email: registrant.email,
      name:
        [registrant.firstName, registrant.lastName].filter(Boolean).join(' ') ||
        registrant.email,
    })),
  };
}
