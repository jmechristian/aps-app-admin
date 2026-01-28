'use server';

import { requestGraphQL } from '@/lib/appsync';

const EXHIBITORS_BY_COMPANY = /* GraphQL */ `
  query ApsAppExhibitorProfilesByCompanyId(
    $companyId: ID!
    $limit: Int
    $nextToken: String
  ) {
    apsAppExhibitorProfilesByCompanyId(
      companyId: $companyId
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
    }
  }
`;

export async function createExhibitorProfile(input: {
  eventId: string;
  companyId: string;
  boothNumber?: string | null;
}) {
  const existing = await requestGraphQL<{
    apsAppExhibitorProfilesByCompanyId?: {
      items?: Array<{ id: string; eventId?: string | null }> | null;
    } | null;
  }>(EXHIBITORS_BY_COMPANY, { companyId: input.companyId, limit: 1 });

  if (existing.apsAppExhibitorProfilesByCompanyId?.items?.length) {
    throw new Error('This company already has an exhibitor profile.');
  }

  const data = await requestGraphQL<{
    createApsAppExhibitorProfile?: { id: string; eventId: string; companyId: string } | null;
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
}


