'use server';

import { revalidatePath } from 'next/cache';
import { requestGraphQL } from '@/lib/appsync';

const IDENTITY_LABELS: Record<string, string> = {
  SPONSOR: 'Sponsor',
  SOLUTION_PROVIDER: 'Packaging / Solution Provider',
  OEM: 'OEM',
  TIER_ONE: 'Tier One Part Supplier',
};

const SESSION_TITLES: Record<string, string> = {
  'robotics-gm': 'Robotics Integration at GM, Nasser Nasser, GM',
  'oem-volvo': 'OEM Packaging Needs, Carlos Gutierrez, Volvo',
  'oem-nissan': 'OEM Packaging Needs, Alex Seger, Nissan',
  'pakfab-toyota':
    'PakFab Case Study: Daniel Castaneda, PakFab & Trevor Franken, Toyota',
  'vehicle-forecasting': 'Vehicle Forecasting, Joseph McCabe, AFS',
  'isuzu-next-chapter': "Isuzu's Next Chapter, Russell Ferebee, Isuzu",
  'guardian-workshop': 'Guardian Breakout Workshop, Ben Hesskamp, Guardian',
  'epr-nissan': 'Extended Producer Responsibility (EPR), Nathan Kilcoyne, Nissan',
  'ask-a-buyer':
    'Ask a Buyer, Michael Isecke GM & Matthias Stiller, Jonas & Redmann',
  'forming-the-future':
    'Forming the Future of Automotive Packaging, Nate Franck, TriEnda',
  'oem-panel':
    'OEM Panel, Bridget Grewal, Magna & Nasser Nasser, GM & Todd Chesna, Ford & Kelsey Kester, BMW',
};

export type PostEventSurveySessionRating = {
  id: string;
  title: string;
  rating: number;
};

export type PostEventSurveyCompletion = {
  id: string;
  registrantId: string;
  completedAt: string | null;
  identityLabel: string;
  name: string;
  email: string | null;
  company: string | null;
  summitRating: number | null;
  gainedValue: boolean | null;
  gainedValueComments: string | null;
  mostBeneficial: string | null;
  leastBeneficial: string | null;
  favoritePresentation: string | null;
  networkGrowthRating: number | null;
  improvementSuggestions: string | null;
  recommendName: string | null;
  recommendCompany: string | null;
  recommendEmail: string | null;
  recommendPhone: string | null;
  sessionRatings: PostEventSurveySessionRating[];
};

type SurveyItem = {
  id: string;
  registrantId?: string | null;
  identityType?: string | null;
  mostBeneficial?: string | null;
  leastBeneficial?: string | null;
  summitRating?: number | null;
  gainedValue?: boolean | null;
  gainedValueComments?: string | null;
  favoritePresentation?: string | null;
  sessionRatings?: string | null;
  networkGrowthRating?: number | null;
  improvementSuggestions?: string | null;
  recommendName?: string | null;
  recommendCompany?: string | null;
  recommendEmail?: string | null;
  recommendPhone?: string | null;
  completedAt?: string | null;
  registrant?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    company?: { name?: string | null } | null;
  } | null;
};

const GET_SURVEY_OPEN = /* GraphQL */ `
  query GetPostEventSurveyOpen($id: ID!) {
    getAPS(id: $id) {
      id
      postEventSurveyOpen
    }
  }
`;

const SET_SURVEY_OPEN = /* GraphQL */ `
  mutation SetPostEventSurveyOpen($input: UpdateAPSInput!) {
    updateAPS(input: $input) {
      id
      postEventSurveyOpen
    }
  }
`;

const SURVEYS_BY_EVENT = /* GraphQL */ `
  query AdminPostEventSurveysByEvent(
    $eventId: ID!
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    apsPostEventSurveysByEventIdAndCreatedAt(
      eventId: $eventId
      sortDirection: $sortDirection
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        registrantId
        identityType
        mostBeneficial
        leastBeneficial
        summitRating
        gainedValue
        gainedValueComments
        favoritePresentation
        sessionRatings
        networkGrowthRating
        improvementSuggestions
        recommendName
        recommendCompany
        recommendEmail
        recommendPhone
        completedAt
        registrant {
          id
          firstName
          lastName
          email
          company {
            id
            name
          }
        }
      }
      nextToken
    }
  }
`;

const DELETE_SURVEY = /* GraphQL */ `
  mutation DeleteApsPostEventSurvey($input: DeleteApsPostEventSurveyInput!) {
    deleteApsPostEventSurvey(input: $input) {
      id
    }
  }
`;

function parseSessionRatings(raw: string | null | undefined): PostEventSurveySessionRating[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((item) => {
      const id = String(item?.id || '').trim();
      const rating = Number(item?.rating);
      if (!id || !Number.isFinite(rating)) return [];
      return [
        {
          id,
          title: SESSION_TITLES[id] || id,
          rating,
        },
      ];
    });
  } catch {
    return [];
  }
}

function asCompletion(raw: SurveyItem): PostEventSurveyCompletion | null {
  if (!raw?.id) return null;
  const first = String(raw.registrant?.firstName || '').trim();
  const last = String(raw.registrant?.lastName || '').trim();
  return {
    id: raw.id,
    registrantId: String(raw.registrantId || ''),
    completedAt: raw.completedAt || null,
    identityLabel: IDENTITY_LABELS[String(raw.identityType || '')] || '',
    name: `${first} ${last}`.trim() || 'Attendee',
    email: raw.registrant?.email || null,
    company: raw.registrant?.company?.name || null,
    summitRating: raw.summitRating ?? null,
    gainedValue: typeof raw.gainedValue === 'boolean' ? raw.gainedValue : null,
    gainedValueComments: raw.gainedValueComments || null,
    mostBeneficial: raw.mostBeneficial || null,
    leastBeneficial: raw.leastBeneficial || null,
    favoritePresentation: raw.favoritePresentation || null,
    networkGrowthRating: raw.networkGrowthRating ?? null,
    improvementSuggestions: raw.improvementSuggestions || null,
    recommendName: raw.recommendName || null,
    recommendCompany: raw.recommendCompany || null,
    recommendEmail: raw.recommendEmail || null,
    recommendPhone: raw.recommendPhone || null,
    sessionRatings: parseSessionRatings(raw.sessionRatings),
  };
}

type SurveysByEventResponse = {
  apsPostEventSurveysByEventIdAndCreatedAt?: {
    items?: Array<SurveyItem | null> | null;
    nextToken?: string | null;
  } | null;
};

async function listCompletions(eventId: string): Promise<PostEventSurveyCompletion[]> {
  const rows: PostEventSurveyCompletion[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data: SurveysByEventResponse = await requestGraphQL<SurveysByEventResponse>(
      SURVEYS_BY_EVENT,
      {
        eventId,
        sortDirection: 'DESC',
        limit: 200,
        nextToken: nextToken || undefined,
      },
    );
    const connection: SurveysByEventResponse['apsPostEventSurveysByEventIdAndCreatedAt'] =
      data.apsPostEventSurveysByEventIdAndCreatedAt;
    for (const item of connection?.items || []) {
      if (!item) continue;
      const completion = asCompletion(item);
      if (completion) rows.push(completion);
    }
    nextToken = connection?.nextToken ?? null;
  } while (nextToken);

  return rows;
}

export async function fetchPostEventSurveyAdmin(eventId: string): Promise<{
  open: boolean;
  completions: PostEventSurveyCompletion[];
}> {
  const [openData, completions] = await Promise.all([
    requestGraphQL<{ getAPS?: { postEventSurveyOpen?: boolean | null } | null }>(
      GET_SURVEY_OPEN,
      { id: eventId },
    ),
    listCompletions(eventId),
  ]);

  return {
    open: !!openData.getAPS?.postEventSurveyOpen,
    completions,
  };
}

export async function setPostEventSurveyOpenAction(formData: FormData) {
  const eventId = String(formData.get('eventId') || '').trim();
  const open = String(formData.get('open') || '') === 'true';
  if (!eventId) throw new Error('Missing event id.');

  await requestGraphQL(SET_SURVEY_OPEN, {
    input: { id: eventId, postEventSurveyOpen: open },
  });
  revalidatePath(`/aps/${eventId}/post-event-survey`);
}

export async function resetPostEventSurveyAction(surveyId: string, eventId: string) {
  const id = surveyId.trim();
  if (!id) throw new Error('Missing survey id.');

  await requestGraphQL(DELETE_SURVEY, { input: { id } });
  revalidatePath(`/aps/${eventId}/post-event-survey`);
}
