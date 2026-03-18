import { fetchRegistrantsByApsId } from '@/app/actions/registrants';

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

  const header = [
    'firstName',
    'lastName',
    'company',
    'email',
    'phone',
    'jobTitle',
  ].join(',');

  const body = rows
    .map((row) =>
      [
        escapeCsv(row.firstName ?? ''),
        escapeCsv(row.lastName ?? ''),
        escapeCsv(row.company?.name ?? ''),
        escapeCsv(row.email ?? ''),
        escapeCsv(row.phone ?? ''),
        escapeCsv(row.jobTitle ?? ''),
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
