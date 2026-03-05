'use server';

import { revalidatePath } from 'next/cache';
import { requestGraphQL } from '@/lib/appsync';
import { fetchCompaniesByEventId, fetchRegistrantsByApsId } from './registrants';

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function paginate<TItem>(opts: {
  query: string;
  variables: Record<string, unknown>;
  getPage: (data: any) => { items: TItem[]; nextToken?: string | null } | null;
  limit?: number;
}) {
  const all: TItem[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data = await requestGraphQL<any>(opts.query, {
      ...opts.variables,
      limit: opts.limit ?? 1000,
      nextToken: nextToken || undefined,
    });

    const page = opts.getPage(data);
    if (!page) break;

    all.push(...(page.items ?? []));
    nextToken = page.nextToken;

    if (nextToken) await sleep(50);
  } while (nextToken);

  return all;
}

export type ExhibitorProfileListItem = {
  id: string;
  eventId: string;
  companyId: string;
  boothNumber?: string | null;
  company?: { id: string; name: string } | null;
};

export async function fetchExhibitorProfilesByEventId(eventId: string) {
  const EXHIBITOR_PROFILES_BY_EVENT_ID = /* GraphQL */ `
    query ApsAppExhibitorProfilesByEventId(
      $eventId: ID!
      $sortDirection: ModelSortDirection
      $filter: ModelApsAppExhibitorProfileFilterInput
      $limit: Int
      $nextToken: String
    ) {
      apsAppExhibitorProfilesByEventId(
        eventId: $eventId
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        items {
          id
          eventId
          companyId
          boothNumber
        }
        nextToken
      }
    }
  `;

  const items = await paginate<Omit<ExhibitorProfileListItem, 'company'>>({
    query: EXHIBITOR_PROFILES_BY_EVENT_ID,
    variables: { eventId },
    getPage: (data) => data.apsAppExhibitorProfilesByEventId ?? null,
  });

  const DELETE_EXHIBITOR = /* GraphQL */ `
    mutation DeleteApsAppExhibitorProfile(
      $input: DeleteApsAppExhibitorProfileInput!
    ) {
      deleteApsAppExhibitorProfile(input: $input) {
        id
      }
    }
  `;
  const { fetchCompanyById } = await import('@/app/actions/companies');

  const resolved: ExhibitorProfileListItem[] = [];
  for (const exhibitor of items) {
    if (!exhibitor.companyId) {
      await requestGraphQL(DELETE_EXHIBITOR, { input: { id: exhibitor.id } });
      continue;
    }

    try {
      const company = await fetchCompanyById(exhibitor.companyId);
      resolved.push({
        ...exhibitor,
        company: { id: company.id, name: company.name },
      });
    } catch {
      await requestGraphQL(DELETE_EXHIBITOR, { input: { id: exhibitor.id } });
    }
  }

  return resolved.sort((a, b) =>
    (a.company?.name ?? '').localeCompare(b.company?.name ?? '')
  );
}

export type ExhibitorProfileDetail = ExhibitorProfileListItem & {
  video?: string | null;
  videoCaption?: string | null;
  sponsorId?: string | null;
  company?: {
    id: string;
    name: string;
    email?: string | null;
    description?: string | null;
    website?: string | null;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    country?: string | null;
    logo?: string | null;
  } | null;
};

export async function fetchExhibitorProfileById(exhibitorId: string) {
  const GET_EXHIBITOR_PROFILE = /* GraphQL */ `
    query GetApsAppExhibitorProfile($id: ID!) {
      getApsAppExhibitorProfile(id: $id) {
        id
        eventId
        companyId
        sponsorId
        boothNumber
        video
        videoCaption
        company {
          id
          name
          email
          description
          website
          phone
          address
          city
          state
          zip
          country
          logo
        }
      }
    }
  `;

  const data = await requestGraphQL<{
    getApsAppExhibitorProfile?: ExhibitorProfileDetail | null;
  }>(GET_EXHIBITOR_PROFILE, { id: exhibitorId });

  return data.getApsAppExhibitorProfile ?? null;
}

export type SponsorListItem = {
  id: string;
  eventId: string;
  companyId: string;
  type?: string | null;
  company?: { id: string; name: string } | null;
};

export async function fetchSponsorsByEventId(eventId: string) {
  const APS_SPONSORS_BY_EVENT_ID = /* GraphQL */ `
    query ApsSponsorsByEventId(
      $eventId: ID!
      $sortDirection: ModelSortDirection
      $filter: ModelApsSponsorFilterInput
      $limit: Int
      $nextToken: String
    ) {
      apsSponsorsByEventId(
        eventId: $eventId
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        items {
          id
          eventId
          companyId
          type
        }
        nextToken
      }
    }
  `;

  const items = await paginate<Omit<SponsorListItem, 'company'>>({
    query: APS_SPONSORS_BY_EVENT_ID,
    variables: { eventId },
    getPage: (data) => data.apsSponsorsByEventId ?? null,
  });

  const DELETE_SPONSOR = /* GraphQL */ `
    mutation DeleteApsSponsor($input: DeleteApsSponsorInput!) {
      deleteApsSponsor(input: $input) {
        id
      }
    }
  `;
  const { fetchCompanyById } = await import('@/app/actions/companies');

  const resolved: SponsorListItem[] = [];
  for (const sponsor of items) {
    if (!sponsor.companyId) {
      await requestGraphQL(DELETE_SPONSOR, { input: { id: sponsor.id } });
      continue;
    }

    try {
      const company = await fetchCompanyById(sponsor.companyId);
      resolved.push({ ...sponsor, company: { id: company.id, name: company.name } });
    } catch {
      await requestGraphQL(DELETE_SPONSOR, { input: { id: sponsor.id } });
    }
  }

  return resolved.sort((a, b) =>
    (a.company?.name ?? '').localeCompare(b.company?.name ?? '')
  );
}

const UPDATE_SPONSOR_TYPE = /* GraphQL */ `
  mutation UpdateApsSponsor($input: UpdateApsSponsorInput!) {
    updateApsSponsor(input: $input) {
      id
      type
    }
  }
`;

export type SponsorTypeValue = 'BOOTH' | 'TABLE' | 'NONE';

export async function updateSponsorType(
  sponsorId: string,
  eventId: string,
  type: SponsorTypeValue | null
) {
  const data = await requestGraphQL<{
    updateApsSponsor?: { id: string; type?: string | null } | null;
  }>(UPDATE_SPONSOR_TYPE, {
    input: { id: sponsorId, type: type ?? null },
  });
  if (!data.updateApsSponsor?.id) {
    throw new Error('Failed to update sponsor type');
  }
  revalidatePath(`/aps/${eventId}/sponsors`);
}

export type SpeakerRegistrantListItem = {
  id: string;
  apsID: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  jobTitle?: string | null;
  company?: { id: string; name: string } | null;
  attendeeType: string;
  status: string;
};

const LIST_SPEAKER_REGISTRANTS_BY_EVENT = /* GraphQL */ `
  query ListApsRegistrants(
    $filter: ModelApsRegistrantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsRegistrants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        apsID
        firstName
        lastName
        email
        jobTitle
        attendeeType
        status
        company {
          id
          name
        }
      }
      nextToken
    }
  }
`;

export async function fetchSpeakerRegistrantsByEventId(eventId: string) {
  const items = await paginate<SpeakerRegistrantListItem>({
    query: LIST_SPEAKER_REGISTRANTS_BY_EVENT,
    variables: {
      filter: {
        apsID: { eq: eventId },
        attendeeType: { eq: 'SPEAKER' },
      },
    },
    getPage: (data) => data.listApsRegistrants ?? null,
  });

  return items.sort((a, b) => {
    const aName = `${a.lastName ?? ''} ${a.firstName ?? ''}`.trim();
    const bName = `${b.lastName ?? ''} ${b.firstName ?? ''}`.trim();
    return aName.localeCompare(bName);
  });
}

export type SpeakerProfileListItem = {
  id: string;
  eventId: string;
  profileId: string;
  presentationTitle?: string | null;
  presentationSummary?: string | null;
  profile?: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    company?: string | null;
    jobTitle?: string | null;
  } | null;
};

export async function fetchSpeakerProfilesByEventId(eventId: string) {
  const APS_SPEAKERS_BY_EVENT_ID = /* GraphQL */ `
    query APSSpeakersByEventId(
      $eventId: ID!
      $sortDirection: ModelSortDirection
      $filter: ModelAPSSpeakerFilterInput
      $limit: Int
      $nextToken: String
    ) {
      aPSSpeakersByEventId(
        eventId: $eventId
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        items {
          id
          eventId
          profileId
          presentationTitle
          presentationSummary
          profile {
            id
            firstName
            lastName
            email
            company
            jobTitle
          }
        }
        nextToken
      }
    }
  `;

  const items = await paginate<SpeakerProfileListItem>({
    query: APS_SPEAKERS_BY_EVENT_ID,
    variables: { eventId },
    getPage: (data) => data.aPSSpeakersByEventId ?? null,
  });

  return items.sort((a, b) => {
    const aName = `${a.profile?.lastName ?? ''} ${a.profile?.firstName ?? ''}`.trim();
    const bName = `${b.profile?.lastName ?? ''} ${b.profile?.firstName ?? ''}`.trim();
    return aName.localeCompare(bName);
  });
}

export type SpeakerProfileDetail = SpeakerProfileListItem & {
  profile?: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    company?: string | null;
    jobTitle?: string | null;
    attendeeType?: string | null;
    location?: string | null;
    phone?: string | null;
    linkedin?: string | null;
    bio?: string | null;
    profilePicture?: string | null;
    twitter?: string | null;
    facebook?: string | null;
    instagram?: string | null;
    youtube?: string | null;
    website?: string[] | null;
  } | null;
};

export async function fetchSpeakerProfileById(speakerId: string) {
  const GET_APS_SPEAKER = /* GraphQL */ `
    query GetAPSSpeaker($id: ID!) {
      getAPSSpeaker(id: $id) {
        id
        eventId
        presentationTitle
        presentationSummary
        profileId
        profile {
          id
          firstName
          lastName
          email
          company
          jobTitle
          attendeeType
          location
          phone
          linkedin
          bio
          profilePicture
          twitter
          facebook
          instagram
          youtube
          website
        }
      }
    }
  `;

  const data = await requestGraphQL<{
    getAPSSpeaker?: SpeakerProfileDetail | null;
  }>(GET_APS_SPEAKER, { id: speakerId });

  return data.getAPSSpeaker ?? null;
}

export type AgendaListItem = { id: string; eventId: string };

export async function fetchAgendaByEventId(eventId: string) {
  const APS_AGENDA_BY_EVENT_ID = /* GraphQL */ `
    query ApsAgendaByEventId(
      $eventId: ID!
      $sortDirection: ModelSortDirection
      $filter: ModelApsAgendaFilterInput
      $limit: Int
      $nextToken: String
    ) {
      apsAgendaByEventId(
        eventId: $eventId
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        items {
          id
          eventId
        }
        nextToken
      }
    }
  `;

  const items = await paginate<AgendaListItem>({
    query: APS_AGENDA_BY_EVENT_ID,
    variables: { eventId },
    getPage: (data) => data.apsAgendaByEventId ?? null,
  });

  // There should be at most one per event, but we return first defensively.
  return items[0] ?? null;
}

export type AgendaSessionListItem = {
  id: string;
  agendaId: string;
  title?: string | null;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  location?: string | null;
  description?: string | null;
  speakerNames?: string[] | null;
  sponsorNames?: string[] | null;
};

const LIST_SESSIONS_BY_AGENDA = /* GraphQL */ `
  query ApsAppSessionsByAgendaId(
    $agendaId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelApsAppSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    apsAppSessionsByAgendaId(
      agendaId: $agendaId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        agendaId
        title
        date
        startTime
        endTime
        location
        description
        speakers(limit: 1000) {
          items {
            id
            aPSSpeakerId
            aPSSpeaker {
              id
              profile {
                firstName
                lastName
                email
              }
            }
          }
        }
        sponsors(limit: 1000) {
          items {
            id
            apsSponsorId
            apsSponsor {
              id
              companyId
              company {
                id
                name
              }
            }
          }
        }
      }
      nextToken
    }
  }
`;

export async function fetchAgendaSessionsByAgendaId(agendaId: string) {
  type SessionQueryItem = Omit<AgendaSessionListItem, 'speakerNames' | 'sponsorNames'> & {
    speakers?: {
      items?: Array<
        | {
            aPSSpeakerId?: string | null;
            aPSSpeaker?: {
              id: string;
              profile?: {
                firstName?: string | null;
                lastName?: string | null;
                email?: string | null;
              } | null;
            } | null;
          }
        | null
      > | null;
    } | null;
    sponsors?: {
      items?: Array<
        | {
            apsSponsorId?: string | null;
            apsSponsor?: {
              id: string;
              companyId: string;
              company?: { id: string; name: string } | null;
            } | null;
          }
        | null
      > | null;
    } | null;
  };

  let items: SessionQueryItem[];
  try {
    items = await paginate<SessionQueryItem>({
      query: LIST_SESSIONS_BY_AGENDA,
      variables: { agendaId },
      getPage: (data) => data.apsAppSessionsByAgendaId ?? null,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('APSSpeaker') && message.includes('SessionSpeakers')) {
      const { cleanupOrphanedSessionSpeakers } = await import(
        '@/app/actions/speakers'
      );
      await cleanupOrphanedSessionSpeakers();
      items = await paginate<SessionQueryItem>({
        query: LIST_SESSIONS_BY_AGENDA,
        variables: { agendaId },
        getPage: (data) => data.apsAppSessionsByAgendaId ?? null,
      });
    } else {
      throw error;
    }
  }

  const withNames: AgendaSessionListItem[] = items.map((s) => {
    const speakerNames =
      s.speakers?.items
        ?.map((x) => x?.aPSSpeaker)
        .filter(Boolean)
        .map((sp) => {
          const first = sp?.profile?.firstName?.trim() ?? '';
          const last = sp?.profile?.lastName?.trim() ?? '';
          const name = `${first} ${last}`.trim();
          return name || sp?.profile?.email || sp?.id || '—';
        }) ?? [];

    const sponsorNames =
      s.sponsors?.items
        ?.map((x) => x?.apsSponsor)
        .filter(Boolean)
        .map((so) => so!.company?.name ?? so!.companyId ?? so!.id) ?? [];

    return {
      id: s.id,
      agendaId: s.agendaId,
      title: s.title ?? null,
      date: s.date ?? null,
      startTime: s.startTime ?? null,
      endTime: s.endTime ?? null,
      location: s.location ?? null,
      description: s.description ?? null,
      speakerNames,
      sponsorNames,
    };
  });

  // Sort by date then start time (both stored as strings, treated as EST).
  // Missing date/time go to the bottom.
  return withNames.sort((a, b) => {
    const aDate = (a.date ?? '').trim();
    const bDate = (b.date ?? '').trim();
    if (aDate && !bDate) return -1;
    if (!aDate && bDate) return 1;
    if (aDate !== bDate) return aDate.localeCompare(bDate);

    const aStart = (a.startTime ?? '').trim();
    const bStart = (b.startTime ?? '').trim();
    if (aStart && !bStart) return -1;
    if (!aStart && bStart) return 1;
    if (aStart !== bStart) return aStart.localeCompare(bStart);

    // Tiebreaker to keep ordering stable-ish.
    return (a.title ?? '').localeCompare(b.title ?? '');
  });
}

export type CompanyWithRegistrantCount = {
  id: string;
  name: string;
  email: string;
  type?: string | null;
  eventId: string;
  registrantCount: number;
};

/**
 * Used for company pickers: restrict to companies that have at least one registrant
 * for this event, and include a count for UX.
 */
export async function fetchCompaniesWithRegistrantsByEventId(eventId: string) {
  const [companies, registrants] = await Promise.all([
    fetchCompaniesByEventId(eventId),
    fetchRegistrantsByApsId(eventId),
  ]);

  const counts = new Map<string, number>();
  for (const r of registrants) {
    const cid = r.company?.id ?? r.companyId ?? null;
    if (!cid) continue;
    counts.set(cid, (counts.get(cid) ?? 0) + 1);
  }

  const filtered: CompanyWithRegistrantCount[] = companies
    .map((c) => ({
      ...c,
      eventId,
      registrantCount: counts.get(c.id) ?? 0,
    }))
    .filter((c) => c.registrantCount > 0);

  filtered.sort((a, b) => a.name.localeCompare(b.name));
  return filtered;
}


