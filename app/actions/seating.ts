'use server';

import fs from 'node:fs';
import path from 'node:path';
import { revalidatePath } from 'next/cache';
import { requestGraphQL } from '@/lib/appsync';
import { fetchRegistrantsByApsId } from '@/app/actions/registrants';
import {
  APS_SEATING_CHART_ID,
  type SeatingAssignment,
  type SeatingRegistrantOption,
} from '@/lib/seating-chart';
import {
  matchSeatingCsvToRegistrants,
  parseSeatingCsv,
  type SeatingImportRegistrant,
} from '@/lib/seating-import';

const DEFAULT_SEATING_CSV_PATH = path.join(
  process.cwd(),
  'data',
  'aps-2026-table-assignments.csv'
);

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

async function upsertRegistrantTableAssignment(params: {
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
  let action: 'created' | 'updated' = 'updated';

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
    action = 'created';
  }

  return action;
}

export async function assignRegistrantToTable(params: {
  eventId: string;
  registrantId: string;
  tableNumber: number;
}) {
  await upsertRegistrantTableAssignment({
    registrantId: params.registrantId,
    tableNumber: params.tableNumber,
  });

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

export type SeatingCsvImportPreview = {
  unmatched: Array<{ name: string; company: string; tableNumber: number | null; reason: string }>;
  conflicts: Array<{ name: string; company: string; reason: string }>;
  alreadyCorrect: number;
  changes: Array<{
    registrantId: string;
    name: string;
    email: string;
    company: string;
    currentTable: number | null;
    tableNumber: number;
  }>;
};

function readDefaultSeatingCsv() {
  if (!fs.existsSync(DEFAULT_SEATING_CSV_PATH)) {
    throw new Error('Default seating CSV was not found on the server.');
  }
  return fs.readFileSync(DEFAULT_SEATING_CSV_PATH, 'utf8');
}

async function buildImportRegistrants(eventId: string): Promise<SeatingImportRegistrant[]> {
  const [registrants, assignments] = await Promise.all([
    fetchRegistrantsByApsId(eventId),
    fetchSeatingAssignments(),
  ]);
  const tableByRegistrant = new Map(
    assignments.map((assignment) => [assignment.registrantId, assignment.tableNumber])
  );

  return registrants.map((registrant) => ({
    id: registrant.id,
    firstName: registrant.firstName ?? null,
    lastName: registrant.lastName ?? null,
    email: registrant.email,
    attendeeType: registrant.attendeeType ?? null,
    status: registrant.status ?? null,
    companyName: registrant.company?.name ?? null,
    tableNumber: tableByRegistrant.get(registrant.id) ?? registrant.seatingChartRegistrant?.tableNumber ?? null,
  }));
}

export async function previewSeatingCsvImport(params: {
  eventId: string;
  csvText?: string;
}): Promise<SeatingCsvImportPreview> {
  const csvText = params.csvText?.trim() ? params.csvText : readDefaultSeatingCsv();
  const result = matchSeatingCsvToRegistrants(
    parseSeatingCsv(csvText),
    await buildImportRegistrants(params.eventId)
  );

  return {
    unmatched: result.unmatched.map((item) => ({
      name: `${item.csv.firstName} ${item.csv.lastName}`.trim(),
      company: item.csv.company,
      tableNumber: item.csv.tableNumber,
      reason: item.reason,
    })),
    conflicts: result.conflicts.map((item) => ({
      name: `${item.csv.firstName} ${item.csv.lastName}`.trim(),
      company: item.csv.company,
      reason: item.reason,
    })),
    alreadyCorrect: result.assignments.filter(
      (item) => item.registrant.tableNumber === item.csv.tableNumber
    ).length,
    changes: result.assignments
      .filter(
        (item) =>
          item.csv.tableNumber != null && item.registrant.tableNumber !== item.csv.tableNumber
      )
      .map((item) => ({
        registrantId: item.registrant.id,
        name: `${item.registrant.firstName ?? ''} ${item.registrant.lastName ?? ''}`.trim(),
        email: item.registrant.email,
        company: item.registrant.companyName ?? '',
        currentTable: item.registrant.tableNumber ?? null,
        tableNumber: item.csv.tableNumber as number,
      })),
  };
}

export async function applySeatingImportBatch(params: {
  eventId: string;
  items: Array<{ registrantId: string; tableNumber: number }>;
}) {
  let created = 0;
  let updated = 0;
  const failed: string[] = [];

  for (const item of params.items) {
    try {
      const action = await upsertRegistrantTableAssignment(item);
      if (action === 'created') created += 1;
      else updated += 1;
    } catch (error) {
      failed.push(
        `${item.registrantId}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  revalidatePath(`/aps/${params.eventId}`);
  revalidatePath(`/aps/${params.eventId}/seating`);

  return { created, updated, failed };
}
