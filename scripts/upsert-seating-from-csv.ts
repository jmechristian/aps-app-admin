import fs from 'node:fs';
import path from 'node:path';
import { requestGraphQL } from '@/lib/appsync';
import { APS_SEATING_CHART_ID } from '@/lib/seating-chart';
import {
  matchSeatingCsvToRegistrants,
  parseSeatingCsv,
  type SeatingImportRegistrant,
} from '@/lib/seating-import';

const DEFAULT_CSV = path.resolve(
  '/Users/jamiechristian/.cursor/projects/Users-jamiechristian-Dev-aps-app-admin/attachments/ce886e54-fd89-46de-9222-a002a98a981d/Copy_of_Table_Numbers-_APS_2026_-_use_this_-_Table_assignments_10_10_26.csv'
);

const LIST_APS = /* GraphQL */ `
  query ListAPS($limit: Int, $nextToken: String) {
    listAPS(limit: $limit, nextToken: $nextToken) {
      items {
        id
        year
      }
      nextToken
    }
  }
`;

const LIST_REGISTRANTS = /* GraphQL */ `
  query ListApsRegistrants(
    $filter: ModelApsRegistrantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsRegistrants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        attendeeType
        status
        company {
          name
        }
        seatingChartRegistrant {
          id
          tableNumber
          seatingChartID
        }
        apsRegistrantSeatingChartRegistrantId
      }
      nextToken
    }
  }
`;

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
        seatingChartID
        tableNumber
      }
      nextToken
    }
  }
`;

const CREATE_APS_SEATING_CHART_REGISTRANT = /* GraphQL */ `
  mutation CreateApsSeatingChartRegistrant(
    $input: CreateApsSeatingChartRegistrantInput!
  ) {
    createApsSeatingChartRegistrant(input: $input) {
      id
      tableNumber
    }
  }
`;

const UPDATE_APS_SEATING_CHART_REGISTRANT = /* GraphQL */ `
  mutation UpdateApsSeatingChartRegistrant(
    $input: UpdateApsSeatingChartRegistrantInput!
  ) {
    updateApsSeatingChartRegistrant(input: $input) {
      id
      tableNumber
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

type AuthOpts = { authMode?: 'apiKey' | 'userPools'; jwt?: string };

type ListApsResult = {
  listAPS?: {
    items?: Array<{ id: string; year: string } | null>;
    nextToken?: string | null;
  } | null;
};

type ListRegistrantsResult = {
  listApsRegistrants?: {
    items?: Array<{
      id: string;
      firstName?: string | null;
      lastName?: string | null;
      email: string;
      attendeeType?: string | null;
      status?: string | null;
      company?: { name?: string | null } | null;
      seatingChartRegistrant?: { tableNumber?: number | null } | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

type SeatingByRegistrantResult = {
  apsSeatingChartRegistrantsByRegistrantID?: {
    items?: Array<{
      id: string;
      registrantID: string;
      seatingChartID: string;
      tableNumber?: number | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

function graphqlOpts(): AuthOpts | undefined {
  const jwt = process.env.APS_ADMIN_JWT;
  return jwt ? { authMode: 'userPools', jwt } : undefined;
}

async function listEvents() {
  const events: Array<{ id: string; year: string }> = [];
  let nextToken: string | null | undefined = null;
  do {
    const pageToken = nextToken || undefined;
    const data: ListApsResult = await requestGraphQL<ListApsResult>(LIST_APS, {
      limit: 50,
      nextToken: pageToken,
    });
    events.push(...(data.listAPS?.items ?? []).filter((item): item is { id: string; year: string } => Boolean(item)));
    nextToken = data.listAPS?.nextToken;
  } while (nextToken);
  return events;
}

async function listRegistrants(eventId: string): Promise<SeatingImportRegistrant[]> {
  const rows: SeatingImportRegistrant[] = [];
  let nextToken: string | null | undefined = null;
  do {
    const pageToken = nextToken || undefined;
    const data: ListRegistrantsResult = await requestGraphQL<ListRegistrantsResult>(
      LIST_REGISTRANTS,
      {
        filter: { apsID: { eq: eventId } },
        limit: 1000,
        nextToken: pageToken,
      }
    );
    for (const item of data.listApsRegistrants?.items ?? []) {
      if (!item?.id) continue;
      rows.push({
        id: item.id,
        firstName: item.firstName ?? null,
        lastName: item.lastName ?? null,
        email: item.email,
        attendeeType: item.attendeeType ?? null,
        status: item.status ?? null,
        companyName: item.company?.name ?? null,
        tableNumber: item.seatingChartRegistrant?.tableNumber ?? null,
      });
    }
    nextToken = data.listApsRegistrants?.nextToken;
  } while (nextToken);
  return rows;
}

async function ensureSeatingChartExists() {
  const existing = await requestGraphQL<{ getApsSeatingChart?: { id: string } | null }>(
    GET_APS_SEATING_CHART,
    { id: APS_SEATING_CHART_ID },
    graphqlOpts()
  );
  if (existing.getApsSeatingChart?.id) return;
  await requestGraphQL(
    CREATE_APS_SEATING_CHART,
    { input: { id: APS_SEATING_CHART_ID } },
    graphqlOpts()
  );
}

async function getAssignmentByRegistrantId(registrantId: string) {
  let nextToken: string | null | undefined = null;
  do {
    const pageToken = nextToken || undefined;
    const data: SeatingByRegistrantResult = await requestGraphQL<SeatingByRegistrantResult>(
      APS_SEATING_REGISTRANTS_BY_REGISTRANT,
      { registrantID: registrantId, limit: 1000, nextToken: pageToken },
      graphqlOpts()
    );
    const match = (data.apsSeatingChartRegistrantsByRegistrantID?.items ?? []).find(
      (item) => item?.seatingChartID === APS_SEATING_CHART_ID
    );
    if (match) return match;
    nextToken = data.apsSeatingChartRegistrantsByRegistrantID?.nextToken ?? null;
  } while (nextToken);
  return null;
}

async function upsertAssignment(params: {
  registrant: SeatingImportRegistrant;
  tableNumber: number;
}) {
  await ensureSeatingChartExists();
  const existing = await getAssignmentByRegistrantId(params.registrant.id);
  const opts = graphqlOpts();

  if (existing?.id) {
    await requestGraphQL(
      UPDATE_APS_SEATING_CHART_REGISTRANT,
      {
        input: {
          id: existing.id,
          firstName: params.registrant.firstName ?? null,
          lastName: params.registrant.lastName ?? null,
          company: params.registrant.companyName ?? null,
          email: params.registrant.email,
          role: params.registrant.attendeeType ?? null,
          tableNumber: params.tableNumber,
        },
      },
      opts
    );
    await requestGraphQL(
      UPDATE_REGISTRANT_SEATING_LINK,
      {
        input: {
          id: params.registrant.id,
          apsRegistrantSeatingChartRegistrantId: existing.id,
        },
      },
      opts
    );
    return 'updated';
  }

  const created = await requestGraphQL<{
    createApsSeatingChartRegistrant?: { id: string } | null;
  }>(
    CREATE_APS_SEATING_CHART_REGISTRANT,
    {
      input: {
        seatingChartID: APS_SEATING_CHART_ID,
        registrantID: params.registrant.id,
        firstName: params.registrant.firstName ?? null,
        lastName: params.registrant.lastName ?? null,
        company: params.registrant.companyName ?? null,
        email: params.registrant.email,
        role: params.registrant.attendeeType ?? null,
        tableNumber: params.tableNumber,
      },
    },
    opts
  );

  const assignmentId = created.createApsSeatingChartRegistrant?.id;
  if (!assignmentId) throw new Error('Failed to create seating assignment');

  await requestGraphQL(
    UPDATE_REGISTRANT_SEATING_LINK,
    {
      input: {
        id: params.registrant.id,
        apsRegistrantSeatingChartRegistrantId: assignmentId,
      },
    },
    opts
  );
  return 'created';
}

function formatPerson(row: {
  firstName?: string | null;
  lastName?: string | null;
  company?: string | null;
  companyName?: string | null;
  attendeeType?: string | null;
  tableNumber?: number | null;
}) {
  const name = `${row.firstName ?? ''} ${row.lastName ?? ''}`.trim() || '(no name)';
  const company = row.company ?? row.companyName ?? 'no company';
  const type = row.attendeeType ?? 'unknown';
  const table = row.tableNumber == null ? 'none' : String(row.tableNumber);
  return `${name} | ${company} | ${type} | table ${table}`;
}

async function main() {
  const args = process.argv.slice(2);
  const apply = args.includes('--apply');
  const csvPath =
    args.find((arg) => arg.startsWith('--csv='))?.slice('--csv='.length) || DEFAULT_CSV;
  const eventYear =
    args.find((arg) => arg.startsWith('--year='))?.slice('--year='.length) || '2026';

  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV not found: ${csvPath}`);
  }

  const events = await listEvents();
  const event = events.find((item) => item.year === eventYear) ?? events[0];
  if (!event) throw new Error('No APS event found');

  const csvRows = parseSeatingCsv(fs.readFileSync(csvPath, 'utf8'));
  const registrants = await listRegistrants(event.id);
  const result = matchSeatingCsvToRegistrants(csvRows, registrants);

  const alreadyCorrect = result.assignments.filter(
    (item) => item.registrant.tableNumber === item.csv.tableNumber
  );
  const toWrite = result.assignments.filter(
    (item) => item.registrant.tableNumber !== item.csv.tableNumber
  );

  console.log(`Event: ${event.year} (${event.id})`);
  console.log(`CSV rows: ${csvRows.length}`);
  console.log(`Registrants: ${registrants.length}`);
  console.log(`Matched: ${result.assignments.length}`);
  console.log(`Already correct: ${alreadyCorrect.length}`);
  console.log(`Would upsert: ${toWrite.length}`);
  console.log(`Unmatched: ${result.unmatched.length}`);
  console.log(`Conflicts: ${result.conflicts.length}`);
  console.log(`Skipped placeholders: ${result.skipped.length}`);
  console.log('');

  if (result.unmatched.length) {
    console.log('=== UNMATCHED ===');
    for (const item of result.unmatched) {
      console.log(`L${item.csv.line}: ${formatPerson(item.csv)} — ${item.reason}`);
    }
    console.log('');
  }

  if (result.conflicts.length) {
    console.log('=== CONFLICTS ===');
    for (const item of result.conflicts) {
      console.log(`L${item.csv.line}: ${formatPerson(item.csv)} — ${item.reason}`);
      for (const candidate of item.candidates) {
        console.log(
          `  ${candidate.score} ${formatPerson({
            ...candidate.registrant,
            company: candidate.registrant.companyName,
          })} (${candidate.reason})`
        );
      }
    }
    console.log('');
  }

  console.log('=== MATCHED CHANGES ===');
  for (const item of toWrite) {
    console.log(
      `${item.confidence.toUpperCase()} L${item.csv.line}: ${formatPerson(item.csv)} -> ${
        item.registrant.firstName
      } ${item.registrant.lastName} (${item.registrant.email}) ${
        item.registrant.companyName ?? 'no company'
      } [${item.registrant.attendeeType}] current table ${
        item.registrant.tableNumber ?? 'none'
      } => ${item.csv.tableNumber} (${item.reason})`
    );
  }

  if (!apply) {
    console.log('\nDry run only. Re-run with --apply to write assignments.');
    return;
  }

  let created = 0;
  let updated = 0;
  let unchanged = alreadyCorrect.length;
  let failed = 0;

  for (const item of toWrite) {
    if (item.csv.tableNumber == null) continue;
    try {
      const action = await upsertAssignment({
        registrant: item.registrant,
        tableNumber: item.csv.tableNumber,
      });
      if (action === 'created') created += 1;
      else updated += 1;
      await new Promise((resolve) => setTimeout(resolve, 120));
    } catch (error) {
      failed += 1;
      console.error(
        `FAILED ${item.registrant.firstName} ${item.registrant.lastName}:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  console.log(
    `\nApply complete. Created: ${created}. Updated: ${updated}. Unchanged: ${unchanged}. Failed: ${failed}.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
