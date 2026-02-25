import { exportTempCredentialsByApsId } from '@/app/actions/registrants';

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
  const rows = await exportTempCredentialsByApsId(id);

  const header = ['email', 'tempPassword', 'registrantId', 'createdAt'].join(',');
  const body = rows
    .map((row) => {
      const createdAt = row.createdAt ?? '';
      return [
        escapeCsv(row.email),
        escapeCsv(row.tempPassword),
        escapeCsv(row.registrantId),
        escapeCsv(createdAt),
      ].join(',');
    })
    .join('\n');

  const csv = [header, body].filter(Boolean).join('\n');
  const filename = `aps-${id}-temp-credentials.csv`;

  return new Response(csv, {
    status: 200,
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="${filename}"`,
      'cache-control': 'no-store',
    },
  });
}
