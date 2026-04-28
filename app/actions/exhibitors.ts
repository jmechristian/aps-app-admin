'use server';

import { createHmac, randomBytes } from 'crypto';
import { revalidatePath } from 'next/cache';
import { requestGraphQL } from '@/lib/appsync';
import { ensureCompanyAttachedToEvent } from '@/app/actions/companies';
import { generateAndUploadExhibitorPassportQRCode } from '@/lib/qrcode-storage';

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
        qrCode
        passportQrPayload
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
      qrCode
      passportQrPayload
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
      qrCode
      passportQrPayload
    }
  }
`;

const GET_EXHIBITOR_PASSPORT_QR = /* GraphQL */ `
  query GetApsAppExhibitorProfilePassportQr($id: ID!) {
    getApsAppExhibitorProfile(id: $id) {
      id
      eventId
      qrCode
      passportQrPayload
    }
  }
`;

type ExhibitorPassportQrFields = {
  id: string;
  eventId: string;
  qrCode?: string | null;
  passportQrPayload?: string | null;
};

function getPassportQrSecret() {
  return (
    process.env.APS_PASSPORT_QR_SECRET ||
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    null
  );
}

function createPassportQrPayload(eventId: string, exhibitorId: string) {
  const nonce = randomBytes(24).toString('base64url');
  const secret = getPassportQrSecret();
  const signature = secret
    ? createHmac('sha256', secret)
        .update(`${eventId}:${exhibitorId}:${nonce}`)
        .digest('base64url')
    : randomBytes(32).toString('base64url');

  return `aps-passport:v1:${eventId}:${exhibitorId}:${nonce}:${signature}`;
}

async function fetchExhibitorPassportQrFields(
  exhibitorId: string
): Promise<ExhibitorPassportQrFields | null> {
  const data = await requestGraphQL<{
    getApsAppExhibitorProfile?: ExhibitorPassportQrFields | null;
  }>(GET_EXHIBITOR_PASSPORT_QR, { id: exhibitorId });

  return data.getApsAppExhibitorProfile ?? null;
}

export async function ensureExhibitorPassportQr(input: {
  exhibitorId: string;
  eventId?: string | null;
  force?: boolean;
}) {
  const existing = await fetchExhibitorPassportQrFields(input.exhibitorId);
  if (!existing?.id) {
    throw new Error('Exhibitor profile not found.');
  }

  const eventId = input.eventId ?? existing.eventId;
  if (!eventId) {
    throw new Error('Missing event id for exhibitor QR generation.');
  }

  if (!input.force && existing.qrCode && existing.passportQrPayload) {
    return existing;
  }

  const passportQrPayload = createPassportQrPayload(eventId, existing.id);
  const qrCode = await generateAndUploadExhibitorPassportQRCode(
    existing.id,
    passportQrPayload
  );

  const data = await requestGraphQL<{
    updateApsAppExhibitorProfile?: ExhibitorPassportQrFields | null;
  }>(UPDATE_EXHIBITOR_PROFILE, {
    input: {
      id: existing.id,
      qrCode,
      passportQrPayload,
    },
  });

  if (!data.updateApsAppExhibitorProfile?.id) {
    throw new Error('Failed to update exhibitor QR code.');
  }

  revalidatePath(`/aps/${eventId}/exhibitors`);
  revalidatePath(`/aps/${eventId}/exhibitors/${existing.id}`);

  return data.updateApsAppExhibitorProfile;
}

export async function generateExhibitorPassportQr(formData: FormData) {
  const exhibitorId = formData.get('exhibitorId')?.toString();
  const eventId = formData.get('eventId')?.toString();
  const force = formData.get('force') === 'true';

  if (!exhibitorId) throw new Error('Missing exhibitor id');

  await ensureExhibitorPassportQr({
    exhibitorId,
    eventId,
    force,
  });
}

async function findExhibitorProfileForEventAndCompany(
  eventId: string,
  companyId: string
): Promise<{
  id: string;
  sponsorId?: string | null;
  qrCode?: string | null;
  passportQrPayload?: string | null;
} | null> {
  let nextToken: string | null | undefined = null;

  type ExhibitorByEventPage = {
    apsAppExhibitorProfilesByEventId?: {
      items?: Array<{
        id?: string | null;
        companyId?: string | null;
        sponsorId?: string | null;
        qrCode?: string | null;
        passportQrPayload?: string | null;
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
        return {
          id: row.id,
          sponsorId: row.sponsorId,
          qrCode: row.qrCode,
          passportQrPayload: row.passportQrPayload,
        };
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
    await ensureExhibitorPassportQr({
      exhibitorId: existing.id,
      eventId: input.eventId,
    });
  } else {
    const created = await requestGraphQL<{
      createApsAppExhibitorProfile?: { id: string } | null;
    }>(CREATE_EXHIBITOR_PROFILE, {
      input: {
        eventId: input.eventId,
        companyId: input.companyId,
        sponsorId: input.sponsorId,
      },
    });
    if (created.createApsAppExhibitorProfile?.id) {
      await ensureExhibitorPassportQr({
        exhibitorId: created.createApsAppExhibitorProfile.id,
        eventId: input.eventId,
      });
    }
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

  await ensureExhibitorPassportQr({
    exhibitorId: data.createApsAppExhibitorProfile.id,
    eventId: input.eventId,
  });

  revalidatePath(`/aps/${input.eventId}/exhibitors`);
  revalidatePath(
    `/aps/${input.eventId}/exhibitors/${data.createApsAppExhibitorProfile.id}`
  );

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
