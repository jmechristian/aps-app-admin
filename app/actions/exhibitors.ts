'use server';

import { revalidatePath } from 'next/cache';
import { requestGraphQL } from '@/lib/appsync';
import { ensureCompanyAttachedToEvent } from '@/app/actions/companies';

const EXHIBITORS_BY_EVENT = /* GraphQL */ `
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
        companyId
        eventId
        sponsorId
      }
      nextToken
    }
  }
`;

const CREATE_EXHIBITOR_PROFILE = /* GraphQL */ `
  mutation CreateApsAppExhibitorProfile(
    $input: CreateApsAppExhibitorProfileInput!
  ) {
    createApsAppExhibitorProfile(input: $input) {
      id
      eventId
      companyId
    }
  }
`;

const UPDATE_EXHIBITOR_PROFILE = /* GraphQL */ `
  mutation UpdateApsAppExhibitorProfile(
    $input: UpdateApsAppExhibitorProfileInput!
  ) {
    updateApsAppExhibitorProfile(input: $input) {
      id
      eventId
      companyId
      boothNumber
      sponsorId
    }
  }
`;

async function findExhibitorProfileForEventAndCompany(
  eventId: string,
  companyId: string
): Promise<{ id: string; sponsorId?: string | null } | null> {
  let nextToken: string | null | undefined = null;

  type ExhibitorByEventPage = {
    apsAppExhibitorProfilesByEventId?: {
      items?: Array<{
        id?: string | null;
        companyId?: string | null;
        sponsorId?: string | null;
      } | null> | null;
      nextToken?: string | null;
    } | null;
  };

  do {
    const page: ExhibitorByEventPage = await requestGraphQL<ExhibitorByEventPage>(
      EXHIBITORS_BY_EVENT,
      {
        eventId,
        filter: { companyId: { eq: companyId } },
        limit: 50,
        nextToken: nextToken || undefined,
      }
    );

    const items = page.apsAppExhibitorProfilesByEventId?.items ?? [];
    for (const row of items) {
      if (row?.id && row.companyId === companyId) {
        return { id: row.id, sponsorId: row.sponsorId };
      }
    }
    nextToken = page.apsAppExhibitorProfilesByEventId?.nextToken ?? null;
  } while (nextToken);

  return null;
}

/** When a new BOOTH sponsor is created: link or create exhibitor profile for this event + company. */
export async function ensureExhibitorProfileForBoothSponsor(input: {
  eventId: string;
  companyId: string;
  sponsorId: string;
}) {
  await ensureCompanyAttachedToEvent({
    eventId: input.eventId,
    companyId: input.companyId,
  });

  const existing = await findExhibitorProfileForEventAndCompany(
    input.eventId,
    input.companyId
  );

  if (existing) {
    await requestGraphQL(UPDATE_EXHIBITOR_PROFILE, {
      input: { id: existing.id, sponsorId: input.sponsorId },
    });
  } else {
    await requestGraphQL(CREATE_EXHIBITOR_PROFILE, {
      input: {
        eventId: input.eventId,
        companyId: input.companyId,
        sponsorId: input.sponsorId,
      },
    });
  }

  revalidatePath(`/aps/${input.eventId}/exhibitors`);
  revalidatePath(`/aps/${input.eventId}/sponsors`);
}

export async function createExhibitorProfile(input: {
  eventId: string;
  companyId: string;
  boothNumber?: string | null;
}) {
  const duplicate = await findExhibitorProfileForEventAndCompany(
    input.eventId,
    input.companyId
  );
  if (duplicate) {
    throw new Error(
      'This company already has an exhibitor profile for this event.'
    );
  }

  await ensureCompanyAttachedToEvent({
    eventId: input.eventId,
    companyId: input.companyId,
  });

  const data = await requestGraphQL<{
    createApsAppExhibitorProfile?: {
      id: string;
      eventId: string;
      companyId: string;
    } | null;
  }>(CREATE_EXHIBITOR_PROFILE, {
    input: {
      eventId: input.eventId,
      companyId: input.companyId,
      boothNumber: input.boothNumber ?? null,
    },
  });

  if (!data.createApsAppExhibitorProfile?.id) {
    throw new Error('Failed to create exhibitor profile');
  }

  return data.createApsAppExhibitorProfile;
}

export async function updateExhibitorBoothNumber(formData: FormData) {
  const id = formData.get('id')?.toString();
  const eventId = formData.get('eventId')?.toString();
  const boothNumberRaw = formData.get('boothNumber')?.toString() ?? '';

  if (!id) throw new Error('Missing exhibitor id');
  if (!eventId) throw new Error('Missing event id');

  const boothNumber = boothNumberRaw.trim() || null;

  const data = await requestGraphQL<{
    updateApsAppExhibitorProfile?: {
      id: string;
      eventId: string;
      companyId: string;
      boothNumber?: string | null;
    } | null;
  }>(UPDATE_EXHIBITOR_PROFILE, {
    input: { id, boothNumber },
  });

  if (!data.updateApsAppExhibitorProfile?.id) {
    throw new Error('Failed to update booth number');
  }

  revalidatePath(`/aps/${eventId}/exhibitors`);
  revalidatePath(`/aps/${eventId}/exhibitors/${id}`);
}
