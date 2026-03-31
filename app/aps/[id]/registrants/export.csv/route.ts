import { fetchRegistrantsByApsId } from '@/app/actions/registrants';
import { fetchAddOnRequestsByAddOnId } from '@/app/actions/add-ons';

function escapeCsv(value: string): string {
  if (value.includes('"')) {
    value = value.replaceAll('"', '""');
  }
  if (/[",\n]/.test(value)) {
    return `"${value}"`;
  }
  return value;
}

export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const rows = await fetchRegistrantsByApsId(id);

  const TOUR_1_ADDON_ID = '238d4f4e-3bec-448e-a4a5-da74c444302e';
  const TOUR_2_ADDON_ID = '42229f11-061c-4e4c-b90f-73e8a16d97b9';

  const [tour1Requests, tour2Requests] = await Promise.all([
    fetchAddOnRequestsByAddOnId(TOUR_1_ADDON_ID),
    fetchAddOnRequestsByAddOnId(TOUR_2_ADDON_ID),
  ]);

  const approvedTour1ByRegistrant = new Map(
    tour1Requests
      .filter((request) => request.status === 'APPROVED')
      .map((request) => [request.registrantId, request] as const)
  );
  const approvedTour2ByRegistrant = new Map(
    tour2Requests
      .filter((request) => request.status === 'APPROVED')
      .map((request) => [request.registrantId, request] as const)
  );

  const getTour1TransportationPreference = (registrantId: string): string => {
    const request = approvedTour1ByRegistrant.get(registrantId);
    if (!request?.preferences) return '';

    try {
      const parsed = JSON.parse(request.preferences) as
        | {
            transportation_preference?: unknown;
            preference?: { transportation_preference?: unknown };
          }
        | null;
      const transportationValue =
        parsed?.transportation_preference ??
        parsed?.preference?.transportation_preference;
      return typeof transportationValue === 'string' ? transportationValue : '';
    } catch {
      return '';
    }
  };

  const header = [
    'AttendeeType',
    'count',
    'First Name',
    'Last Name',
    'Company',
    'Email',
    'Phone',
    'Count',
    'Job Title',
    'Approved Registration Tour 1',
    'Transportation Preference Tour 1',
    'Approved Registration Tour 2',
    'Transportaiton Preference',
    'Approved Registration Tour 3',
    'Transportaiton Preference tour 3',
    'Certificate Preference',
  ].join(',');

  const body = rows
    .map((row) =>
      [
        escapeCsv(row.attendeeType ?? ''),
        '',
        escapeCsv(row.firstName ?? ''),
        escapeCsv(row.lastName ?? ''),
        escapeCsv(row.company?.name ?? ''),
        escapeCsv(row.email ?? ''),
        escapeCsv(row.phone ?? ''),
        '',
        escapeCsv(row.jobTitle ?? ''),
        approvedTour1ByRegistrant.has(row.id) ? 'Yes' : '',
        escapeCsv(getTour1TransportationPreference(row.id)),
        approvedTour2ByRegistrant.has(row.id) ? 'Yes' : '',
        '',
        '',
        '',
        escapeCsv(row.certification ?? ''),
      ].join(',')
    )
    .join('\n');

  const csv = [header, body].filter(Boolean).join('\n');
  const filename = `aps-${id}-registrants.csv`;

  return new Response(csv, {
    status: 200,
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="${filename}"`,
      'cache-control': 'no-store',
    },
  });
}
