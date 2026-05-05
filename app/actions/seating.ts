'use server';

import { revalidatePath } from 'next/cache';
import { requestGraphQL } from '@/lib/appsync';
import { fetchRegistrantsByApsId } from '@/app/actions/registrants';
import {
  APS_SEATING_CHART_ID,
  type SeatingAssignment,
  type SeatingRegistrantOption,
} from '@/lib/seating-chart';

type SeatingRegistrantRecord = {
  id: string;
  registrantID: string;
  firstName?: string | null;
  lastName?: string | null;
  company?: string | null;
  email?: string | null;
  role?: string | null;
  tableNumber?: number | null;
  seatingChartID: string;
};

const GET_APS_SEATING_CHART = /* GraphQL */ `
  query GetApsSeatingChart($id: ID!) {
    getApsSeatingChart(id: $id) {
      id
    }
  }
`;

const CREATE_APS_SEATING_CHART = /* GraphQL */ `
  mutation CreateApsSeatingChart($input: CreateApsSeatingChartInput!) {
    createApsSeatingChart(input: $input) {
      id
    }
  }
`;

const APS_SEATING_REGISTRANTS_BY_CHART = /* GraphQL */ `
  query ApsSeatingChartRegistrantsBySeatingChartID(
    $seatingChartID: ID!
    $limit: Int
    $nextToken: String
  ) {
    apsSeatingChartRegistrantsBySeatingChartID(
      seatingChartID: $seatingChartID
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        registrantID
        firstName
        lastName
        company
        email
        role
        tableNumber
        seatingChartID
      }
      nextToken
    }
  }
`;

const APS_SEATING_REGISTRANTS_BY_REGISTRANT = /* GraphQL */ `
  query ApsSeatingChartRegistrantsByRegistrantID(
    $registrantID: ID!
    $limit: Int
    $nextToken: String
  ) {
    apsSeatingChartRegistrantsByRegistrantID(
      registrantID: $registrantID
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        registrantID
        firstName
        lastName
        company
        email
        role
        tableNumber
        seatingChartID
      }
      nextToken
    }
  }
`;

const GET_REGISTRANT_FOR_SEATING = /* GraphQL */ `
  query GetApsRegistrantForSeating($id: ID!) {
    getApsRegistrant(id: $id) {
      id
      firstName
      lastName
      email
      attendeeType
      company {
        id
        name
      }
      apsRegistrantSeatingChartRegistrantId
    }
  }
`;

const CREATE_APS_SEATING_CHART_REGISTRANT = /* GraphQL */ `
  mutation CreateApsSeatingChartRegistrant($input: CreateApsSeatingChartRegistrantInput!) {
    createApsSeatingChartRegistrant(input: $input) {
      id
      registrantID
      tableNumber
      seatingChartID
    }
  }
`;

const UPDATE_APS_SEATING_CHART_REGISTRANT = /* GraphQL */ `
  mutation UpdateApsSeatingChartRegistrant($input: UpdateApsSeatingChartRegistrantInput!) {
    updateApsSeatingChartRegistrant(input: $input) {
      id
      registrantID
      tableNumber
      seatingChartID
    }
  }
`;

const DELETE_APS_SEATING_CHART_REGISTRANT = /* GraphQL */ `
  mutation DeleteApsSeatingChartRegistrant($input: DeleteApsSeatingChartRegistrantInput!) {
    deleteApsSeatingChartRegistrant(input: $input) {
      id
    }
  }
`;

const UPDATE_REGISTRANT_SEATING_LINK = /* GraphQL */ `
  mutation UpdateApsRegistrantSeatingLink($input: UpdateApsRegistrantInput!) {
    updateApsRegistrant(input: $input) {
      id
      apsRegistrantSeatingChartRegistrantId
    }
  }
`;

async function ensureSeatingChartExists() {
  const existing = await requestGraphQL<{ getApsSeatingChart?: { id: string } | null }>(
    GET_APS_SEATING_CHART,
    { id: APS_SEATING_CHART_ID }
  );
  if (existing.getApsSeatingChart?.id) return;

  await requestGraphQL(CREATE_APS_SEATING_CHART, {
    input: { id: APS_SEATING_CHART_ID },
  });
}

async function getAssignmentByRegistrantId(
  registrantId: string
): Promise<SeatingRegistrantRecord | null> {
  let nextToken: string | null | undefined = null;
  do {
    const data: {
      apsSeatingChartRegistrantsByRegistrantID?: {
        items?: Array<SeatingRegistrantRecord | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL<{
      apsSeatingChartRegistrantsByRegistrantID?: {
        items?: Array<SeatingRegistrantRecord | null>;
        nextToken?: string | null;
      } | null;
    }>(APS_SEATING_REGISTRANTS_BY_REGISTRANT, {
      registrantID: registrantId,
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const items = data.apsSeatingChartRegistrantsByRegistrantID?.items ?? [];
    const match = items.find((item) => item?.seatingChartID === APS_SEATING_CHART_ID) ?? null;
    if (match) return match;
    nextToken = data.apsSeatingChartRegistrantsByRegistrantID?.nextToken ?? null;
  } while (nextToken);

  return null;
}

export async function fetchSeatingAssignments(): Promise<SeatingAssignment[]> {
  await ensureSeatingChartExists();

  const items: SeatingAssignment[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data: {
      apsSeatingChartRegistrantsBySeatingChartID?: {
        items?: Array<SeatingRegistrantRecord | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL<{
      apsSeatingChartRegistrantsBySeatingChartID?: {
        items?: Array<SeatingRegistrantRecord | null>;
        nextToken?: string | null;
      } | null;
    }>(APS_SEATING_REGISTRANTS_BY_CHART, {
      seatingChartID: APS_SEATING_CHART_ID,
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const page = data.apsSeatingChartRegistrantsBySeatingChartID?.items ?? [];
    for (const item of page) {
      if (!item?.id) continue;
      items.push({
        id: item.id,
        registrantId: item.registrantID,
        firstName: item.firstName ?? null,
        lastName: item.lastName ?? null,
        company: item.company ?? null,
        email: item.email ?? null,
        role: item.role ?? null,
        tableNumber: item.tableNumber ?? null,
        seatingChartId: item.seatingChartID,
      });
    }

    nextToken = data.apsSeatingChartRegistrantsBySeatingChartID?.nextToken ?? null;
  } while (nextToken);

  return items.sort((a, b) => {
    const tableA = a.tableNumber ?? Number.MAX_SAFE_INTEGER;
    const tableB = b.tableNumber ?? Number.MAX_SAFE_INTEGER;
    if (tableA !== tableB) return tableA - tableB;
    const nameA = `${a.firstName ?? ''} ${a.lastName ?? ''}`.trim() || a.email || '';
    const nameB = `${b.firstName ?? ''} ${b.lastName ?? ''}`.trim() || b.email || '';
    return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
  });
}

export async function fetchSeatingRegistrantOptions(
  eventId: string
): Promise<SeatingRegistrantOption[]> {
  const registrants = await fetchRegistrantsByApsId(eventId);
  return registrants.map((registrant) => ({
    id: registrant.id,
    firstName: registrant.firstName ?? null,
    lastName: registrant.lastName ?? null,
    email: registrant.email,
    companyName: registrant.company?.name ?? null,
    attendeeType: registrant.attendeeType ?? null,
  }));
}

export async function assignRegistrantToTable(params: {
  eventId: string;
  registrantId: string;
  tableNumber: number;
}) {
  const tableNumber = Number(params.tableNumber);
  if (!Number.isFinite(tableNumber) || tableNumber < 1) {
    throw new Error('Table number must be a positive number.');
  }

  await ensureSeatingChartExists();

  const registrantData = await requestGraphQL<{
    getApsRegistrant?: {
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      attendeeType?: string | null;
      company?: { id: string; name?: string | null } | null;
      apsRegistrantSeatingChartRegistrantId?: string | null;
    } | null;
  }>(GET_REGISTRANT_FOR_SEATING, { id: params.registrantId });

  const registrant = registrantData.getApsRegistrant;
  if (!registrant?.id || !registrant.email) {
    throw new Error('Registrant not found.');
  }

  const existing = await getAssignmentByRegistrantId(params.registrantId);

  if (existing?.id) {
    await requestGraphQL(UPDATE_APS_SEATING_CHART_REGISTRANT, {
      input: {
        id: existing.id,
        firstName: registrant.firstName ?? null,
        lastName: registrant.lastName ?? null,
        company: registrant.company?.name ?? null,
        email: registrant.email,
        role: registrant.attendeeType ?? null,
        tableNumber,
      },
    });

    if (registrant.apsRegistrantSeatingChartRegistrantId !== existing.id) {
      await requestGraphQL(UPDATE_REGISTRANT_SEATING_LINK, {
        input: {
          id: params.registrantId,
          apsRegistrantSeatingChartRegistrantId: existing.id,
        },
      });
    }
  } else {
    const created = await requestGraphQL<{
      createApsSeatingChartRegistrant?: { id: string } | null;
    }>(CREATE_APS_SEATING_CHART_REGISTRANT, {
      input: {
        seatingChartID: APS_SEATING_CHART_ID,
        registrantID: params.registrantId,
        firstName: registrant.firstName ?? null,
        lastName: registrant.lastName ?? null,
        company: registrant.company?.name ?? null,
        email: registrant.email,
        role: registrant.attendeeType ?? null,
        tableNumber,
      },
    });

    const assignmentId = created.createApsSeatingChartRegistrant?.id;
    if (!assignmentId) {
      throw new Error('Failed to create seating assignment.');
    }

    await requestGraphQL(UPDATE_REGISTRANT_SEATING_LINK, {
      input: {
        id: params.registrantId,
        apsRegistrantSeatingChartRegistrantId: assignmentId,
      },
    });
  }

  revalidatePath(`/aps/${params.eventId}`);
  revalidatePath(`/aps/${params.eventId}/seating`);
  revalidatePath(`/aps/${params.eventId}/registrants/${params.registrantId}`);
}

export async function clearRegistrantTableAssignment(params: {
  eventId: string;
  registrantId: string;
}) {
  const existing = await getAssignmentByRegistrantId(params.registrantId);
  if (!existing?.id) return;

  await requestGraphQL(DELETE_APS_SEATING_CHART_REGISTRANT, {
    input: { id: existing.id },
  });

  await requestGraphQL(UPDATE_REGISTRANT_SEATING_LINK, {
    input: {
      id: params.registrantId,
      apsRegistrantSeatingChartRegistrantId: null,
    },
  });

  revalidatePath(`/aps/${params.eventId}`);
  revalidatePath(`/aps/${params.eventId}/seating`);
  revalidatePath(`/aps/${params.eventId}/registrants/${params.registrantId}`);
}

type SeatingActionState = {
  ok: boolean;
  message: string;
};

export async function updateRegistrantSeatingAssignment(
  _prevState: SeatingActionState,
  formData: FormData
): Promise<SeatingActionState> {
  try {
    const eventId = formData.get('eventId')?.toString().trim();
    const registrantId = formData.get('registrantId')?.toString().trim();
    const tableNumberRaw = formData.get('tableNumber')?.toString().trim() ?? '';

    if (!eventId || !registrantId) {
      return { ok: false, message: 'Missing event or registrant identifier.' };
    }

    if (tableNumberRaw === '') {
      await clearRegistrantTableAssignment({ eventId, registrantId });
      return { ok: true, message: 'Seating assignment cleared.' };
    }

    const parsed = Number(tableNumberRaw);
    if (!Number.isFinite(parsed) || parsed < 1) {
      return { ok: false, message: 'Table number must be a positive number.' };
    }

    await assignRegistrantToTable({
      eventId,
      registrantId,
      tableNumber: parsed,
    });

    return { ok: true, message: `Assigned to table ${parsed}.` };
  } catch (error) {
    console.error('Failed to update seating assignment:', error);
    return { ok: false, message: 'Failed to update seating assignment.' };
  }
}
