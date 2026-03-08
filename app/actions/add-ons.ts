'use server';

import { revalidatePath } from 'next/cache';
import { requestGraphQL } from '@/lib/appsync';

export type AddOnItem = {
  id: string;
  title: string;
  description: string;
  subheadline?: string | null;
  location: string;
  date: string;
  time: string;
  altLink?: string | null;
  type?: string | null;
  limit?: number | null;
  eventId: string;
  price?: number | null;
  preferenceSchema?: string | null;
};

export type AddOnRequestItem = {
  id: string;
  registrantId: string;
  addOnId: string;
  status: string;
  preferences?: string | null;
  registrant?: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
  } | null;
};

const APS_ADDONS_BY_EVENT = /* GraphQL */ `
  query ApsAddOnsByEventId($eventId: ID!, $limit: Int, $nextToken: String) {
    apsAddOnsByEventId(eventId: $eventId, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        subheadline
        location
        date
        time
        altLink
        type
        limit
        eventId
        price
        preferenceSchema
      }
      nextToken
    }
  }
`;

const REGISTRANT_ADDON_REQUESTS_BY_ADDON = /* GraphQL */ `
  query RegistrantAddOnRequestsByAddOnId($addOnId: ID!, $limit: Int, $nextToken: String) {
    registrantAddOnRequestsByAddOnId(addOnId: $addOnId, limit: $limit, nextToken: $nextToken) {
      items {
        id
        registrantId
        addOnId
        status
        preferences
        registrant {
          id
          firstName
          lastName
          email
        }
      }
      nextToken
    }
  }
`;

const CREATE_ADDON = /* GraphQL */ `
  mutation CreateApsAddOn($input: CreateApsAddOnInput!) {
    createApsAddOn(input: $input) {
      id
      title
      description
      subheadline
      location
      date
      time
      altLink
      type
      limit
      eventId
      price
      preferenceSchema
    }
  }
`;

const UPDATE_ADDON = /* GraphQL */ `
  mutation UpdateApsAddOn($input: UpdateApsAddOnInput!) {
    updateApsAddOn(input: $input) {
      id
      title
      description
      subheadline
      location
      date
      time
      altLink
      type
      limit
      eventId
      price
      preferenceSchema
    }
  }
`;

const DELETE_ADDON = /* GraphQL */ `
  mutation DeleteApsAddOn($input: DeleteApsAddOnInput!) {
    deleteApsAddOn(input: $input) {
      id
    }
  }
`;

const CREATE_ADDON_REQUEST = /* GraphQL */ `
  mutation CreateRegistrantAddOnRequest($input: CreateRegistrantAddOnRequestInput!) {
    createRegistrantAddOnRequest(input: $input) {
      id
      registrantId
      addOnId
      status
      preferences
    }
  }
`;

const UPDATE_ADDON_REQUEST = /* GraphQL */ `
  mutation UpdateRegistrantAddOnRequest($input: UpdateRegistrantAddOnRequestInput!) {
    updateRegistrantAddOnRequest(input: $input) {
      id
      status
      preferences
    }
  }
`;

const DELETE_ADDON_REQUEST = /* GraphQL */ `
  mutation DeleteRegistrantAddOnRequest($input: DeleteRegistrantAddOnRequestInput!) {
    deleteRegistrantAddOnRequest(input: $input) {
      id
    }
  }
`;

export async function fetchAddOnsByEventId(eventId: string): Promise<AddOnItem[]> {
  const items: AddOnItem[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data: {
      apsAddOnsByEventId?: {
        items?: Array<AddOnItem | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(APS_ADDONS_BY_EVENT, {
      eventId,
      limit: 500,
      nextToken: nextToken ?? undefined,
    });

    const page = data.apsAddOnsByEventId?.items ?? [];
    items.push(...(page.filter(Boolean) as AddOnItem[]));
    nextToken = data.apsAddOnsByEventId?.nextToken ?? null;
  } while (nextToken);

  return items;
}

export async function fetchAddOnById(addOnId: string): Promise<AddOnItem | null> {
  const GET_ADDON = /* GraphQL */ `
    query GetApsAddOn($id: ID!) {
      getApsAddOn(id: $id) {
        id
        title
        description
        subheadline
        location
        date
        time
        altLink
        type
        limit
        eventId
        price
        preferenceSchema
      }
    }
  `;
  const data = await requestGraphQL<{ getApsAddOn?: AddOnItem | null }>(GET_ADDON, {
    id: addOnId,
  });
  return data.getApsAddOn ?? null;
}

export async function fetchAddOnRequestsByAddOnId(
  addOnId: string
): Promise<AddOnRequestItem[]> {
  const items: AddOnRequestItem[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data: {
      registrantAddOnRequestsByAddOnId?: {
        items?: Array<AddOnRequestItem | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(REGISTRANT_ADDON_REQUESTS_BY_ADDON, {
      addOnId,
      limit: 500,
      nextToken: nextToken ?? undefined,
    });

    const page = data.registrantAddOnRequestsByAddOnId?.items ?? [];
    items.push(...(page.filter(Boolean) as AddOnRequestItem[]));
    nextToken = data.registrantAddOnRequestsByAddOnId?.nextToken ?? null;
  } while (nextToken);

  return items;
}

export async function createAddOn(
  eventId: string,
  input: {
    title: string;
    description: string;
    subheadline?: string | null;
    location: string;
    date: string;
    time: string;
    altLink?: string | null;
    type?: string | null;
    limit?: number | null;
    price?: number | null;
    preferenceSchema?: string | null;
  }
) {
  await requestGraphQL(CREATE_ADDON, {
    input: {
      ...input,
      eventId,
    },
  });
  revalidatePath(`/aps/${eventId}/add-ons`);
}

export async function updateAddOn(
  addOnId: string,
  eventId: string,
  input: Partial<Omit<AddOnItem, 'id' | 'eventId'>>
) {
  await requestGraphQL(UPDATE_ADDON, {
    input: { id: addOnId, ...input },
  });
  revalidatePath(`/aps/${eventId}/add-ons`);
  revalidatePath(`/aps/${eventId}/add-ons/${addOnId}`);
}

export async function deleteAddOn(addOnId: string, eventId: string) {
  await requestGraphQL(DELETE_ADDON, { input: { id: addOnId } });
  revalidatePath(`/aps/${eventId}/add-ons`);
}

export async function requestAddOn(
  addOnId: string,
  registrantId: string,
  eventId: string,
  preferences?: Record<string, unknown> | null
) {
  const existing = await fetchAddOnRequestsByAddOnId(addOnId);
  const already = existing.find(
    (r) => r.registrantId === registrantId
  );
  if (already) {
    throw new Error('This registrant has already requested this add-on');
  }

  await requestGraphQL(CREATE_ADDON_REQUEST, {
    input: {
      addOnId,
      registrantId,
      status: 'PENDING',
      preferences: preferences ?? null,
    },
  });
  revalidatePath(`/aps/${eventId}/add-ons`);
  revalidatePath(`/aps/${eventId}/add-ons/${addOnId}`);
}

export async function approveAddOnRequest(
  requestId: string,
  addOnId: string,
  eventId: string
) {
  await requestGraphQL(UPDATE_ADDON_REQUEST, {
    input: { id: requestId, status: 'APPROVED' },
  });
  revalidatePath(`/aps/${eventId}/add-ons`);
  revalidatePath(`/aps/${eventId}/add-ons/${addOnId}`);
}

export async function removeAddOnRequest(
  requestId: string,
  addOnId: string,
  eventId: string
) {
  await requestGraphQL(DELETE_ADDON_REQUEST, { input: { id: requestId } });
  revalidatePath(`/aps/${eventId}/add-ons`);
  revalidatePath(`/aps/${eventId}/add-ons/${addOnId}`);
}

export async function updateAddOnRequestPreferences(
  requestId: string,
  addOnId: string,
  eventId: string,
  preferences: Record<string, unknown> | null
) {
  await requestGraphQL(UPDATE_ADDON_REQUEST, {
    input: {
      id: requestId,
      preferences: preferences ?? null,
    },
  });
  revalidatePath(`/aps/${eventId}/add-ons`);
  revalidatePath(`/aps/${eventId}/add-ons/${addOnId}`);
}
