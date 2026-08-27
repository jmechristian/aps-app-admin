import {
  fetchFullRegistrantDetailsByApsId,
  type FullRegistrantDetails,
} from '@/app/actions/registrants';

function escapeCsv(value: string): string {
  if (value.includes('"')) {
    value = value.replaceAll('"', '""');
  }
  if (/[",\n]/.test(value)) {
    return `"${value}"`;
  }
  return value;
}

function csvValue(value: unknown): string {
  if (value == null) return '';
  if (Array.isArray(value)) {
    return escapeCsv(
      value
        .filter((item) => item != null && item !== '')
        .map((item) => String(item))
        .join('; '),
    );
  }
  if (typeof value === 'boolean' || typeof value === 'number') {
    return escapeCsv(String(value));
  }
  if (typeof value === 'object') {
    return escapeCsv(JSON.stringify(value));
  }
  return escapeCsv(String(value));
}

const COLUMNS: Array<{
  header: string;
  value: (row: FullRegistrantDetails) => unknown;
}> = [
  { header: 'id', value: (row) => row.id },
  { header: 'apsID', value: (row) => row.apsID },
  { header: 'status', value: (row) => row.status },
  { header: 'attendeeType', value: (row) => row.attendeeType },
  { header: 'firstName', value: (row) => row.firstName },
  { header: 'lastName', value: (row) => row.lastName },
  { header: 'email', value: (row) => row.email },
  { header: 'phone', value: (row) => row.phone },
  { header: 'companyId', value: (row) => row.companyId },
  { header: 'companyName', value: (row) => row.company?.name },
  { header: 'jobTitle', value: (row) => row.jobTitle },
  { header: 'termsAccepted', value: (row) => row.termsAccepted },
  { header: 'interests', value: (row) => row.interests },
  { header: 'otherInterest', value: (row) => row.otherInterest },
  { header: 'buyerQuestion', value: (row) => row.buyerQuestion },
  { header: 'packagingChallenge', value: (row) => row.packagingChallenge },
  { header: 'certification', value: (row) => row.certification },
  {
    header: 'billingAddressFirstName',
    value: (row) => row.billingAddressFirstName,
  },
  {
    header: 'billingAddressLastName',
    value: (row) => row.billingAddressLastName,
  },
  { header: 'billingAddressEmail', value: (row) => row.billingAddressEmail },
  { header: 'billingAddressPhone', value: (row) => row.billingAddressPhone },
  { header: 'billingAddressStreet', value: (row) => row.billingAddressStreet },
  { header: 'billingAddressCity', value: (row) => row.billingAddressCity },
  { header: 'billingAddressState', value: (row) => row.billingAddressState },
  { header: 'billingAddressZip', value: (row) => row.billingAddressZip },
  {
    header: 'billingAddressCountry',
    value: (row) => row.billingAddressCountry,
  },
  { header: 'sameAsAttendee', value: (row) => row.sameAsAttendee },
  { header: 'speakerTopic', value: (row) => row.speakerTopic },
  { header: 'learningObjectives', value: (row) => row.learningObjectives },
  { header: 'totalAmount', value: (row) => row.totalAmount },
  { header: 'discountCode', value: (row) => row.discountCode },
  { header: 'paymentConfirmation', value: (row) => row.paymentConfirmation },
  { header: 'paymentMethod', value: (row) => row.paymentMethod },
  { header: 'paymentLast4', value: (row) => row.paymentLast4 },
  { header: 'invoice', value: (row) => row.invoice },
  { header: 'approvedAt', value: (row) => row.approvedAt },
  { header: 'registrationEmailSent', value: (row) => row.registrationEmailSent },
  {
    header: 'registrationEmailSentDate',
    value: (row) => row.registrationEmailSentDate,
  },
  {
    header: 'registrationEmailReceived',
    value: (row) => row.registrationEmailReceived,
  },
  {
    header: 'registrationEmailReceivedDate',
    value: (row) => row.registrationEmailReceivedDate,
  },
  { header: 'welcomeEmailSent', value: (row) => row.welcomeEmailSent },
  {
    header: 'welcomeEmailSentDate',
    value: (row) => row.welcomeEmailSentDate,
  },
  {
    header: 'welcomeEmailReceived',
    value: (row) => row.welcomeEmailReceived,
  },
  {
    header: 'welcomeEmailReceivedDate',
    value: (row) => row.welcomeEmailReceivedDate,
  },
  { header: 'appEmailSent', value: (row) => row.appEmailSent },
  { header: 'appEmailSentDate', value: (row) => row.appEmailSentDate },
  { header: 'appEmailReceived', value: (row) => row.appEmailReceived },
  {
    header: 'appEmailReceivedDate',
    value: (row) => row.appEmailReceivedDate,
  },
  { header: 'headshot', value: (row) => row.headshot },
  { header: 'presentation', value: (row) => row.presentation },
  { header: 'presentationTitle', value: (row) => row.presentationTitle },
  { header: 'presentationSummary', value: (row) => row.presentationSummary },
  { header: 'bio', value: (row) => row.bio },
  { header: 'qrCode', value: (row) => row.qrCode },
  { header: 'appUserId', value: (row) => row.appUserId },
  {
    header: 'seatingChartRegistrantId',
    value: (row) => row.seatingChartRegistrant?.id,
  },
  {
    header: 'seatingChartID',
    value: (row) => row.seatingChartRegistrant?.seatingChartID,
  },
  {
    header: 'tableNumber',
    value: (row) => row.seatingChartRegistrant?.tableNumber,
  },
  {
    header: 'addOnRequests',
    value: (row) =>
      (row.addOnRequests?.items ?? []).filter(Boolean).length
        ? (row.addOnRequests?.items ?? []).filter(Boolean)
        : '',
  },
  { header: 'aPSRegistrantsId', value: (row) => row.aPSRegistrantsId },
  {
    header: 'aPSCompanyRegistrantsId',
    value: (row) => row.aPSCompanyRegistrantsId,
  },
  {
    header: 'apsRegistrantSeatingChartRegistrantId',
    value: (row) => row.apsRegistrantSeatingChartRegistrantId,
  },
  { header: 'createdAt', value: (row) => row.createdAt },
  { header: 'updatedAt', value: (row) => row.updatedAt },
];

export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const rows = await fetchFullRegistrantDetailsByApsId(id);

  const header = COLUMNS.map((column) => column.header).join(',');
  const body = rows
    .map((row) => COLUMNS.map((column) => csvValue(column.value(row))).join(','))
    .join('\n');

  const csv = [header, body].filter(Boolean).join('\n');
  const filename = `aps-${id}-full-registrant-details.csv`;

  return new Response(csv, {
    status: 200,
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="${filename}"`,
      'cache-control': 'no-store',
    },
  });
}
