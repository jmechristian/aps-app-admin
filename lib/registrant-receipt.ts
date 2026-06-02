import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { requestGraphQL } from '@/lib/appsync';
import {
  renderRegistrantReceiptPdf,
  type ReceiptLineItem,
  type ReceiptRegistrant,
} from '@/lib/registrant-receipt-pdf';

const UPDATE_REGISTRANT_INVOICE = /* GraphQL */ `
  mutation UpdateApsRegistrantInvoice($input: UpdateApsRegistrantInput!) {
    updateApsRegistrant(input: $input) {
      id
      invoice
      updatedAt
    }
  }
`;

function loadS3ConfigFromAwsExports(): { bucket: string; region: string } | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs') as typeof import('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path') as typeof import('path');
    const awsExportsPath = path.join(process.cwd(), 'src', 'aws-exports.js');
    if (!fs.existsSync(awsExportsPath)) return null;
    const contents = fs.readFileSync(awsExportsPath, 'utf8');
    const bucketMatch = contents.match(
      /"aws_user_files_s3_bucket"\s*:\s*"([^"]+)"/,
    );
    const regionMatch = contents.match(
      /"aws_user_files_s3_bucket_region"\s*:\s*"([^"]+)"/,
    );
    const bucket = bucketMatch?.[1];
    if (!bucket) return null;
    return { bucket, region: regionMatch?.[1] || 'us-east-1' };
  } catch {
    return null;
  }
}

function getBucketConfig() {
  const bucket = process.env.AWS_S3_BUCKET;
  const region =
    process.env.AWS_S3_BUCKET_REGION || process.env.AWS_REGION || 'us-east-1';
  if (bucket) return { bucket, region };
  const fromAwsExports = loadS3ConfigFromAwsExports();
  if (fromAwsExports) return fromAwsExports;
  throw new Error(
    'S3 bucket not configured. Set AWS_S3_BUCKET or ensure src/aws-exports.js exists.',
  );
}

function attendeeTypeLabel(attendeeType?: string | null) {
  switch (attendeeType) {
    case 'EXHIBITOR':
      return 'Exhibitor Staff Only';
    case 'SPONSOR':
      return 'Sponsor Registration';
    case 'TIER1':
      return 'Tier 1 Registration';
    case 'SOLUTIONPROVIDER':
      return 'Solution Provider Registration';
    case 'SPEAKER':
      return 'Speaker Registration';
    case 'STAFF':
      return 'Staff Registration';
    case 'OEM':
      return 'OEM Registration';
    default:
      return 'General Registration';
  }
}

export type RegistrantReceiptSource = {
  id: string;
  createdAt: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  jobTitle?: string | null;
  attendeeType?: string | null;
  company?: { name?: string | null } | null;
  billingAddressFirstName?: string | null;
  billingAddressLastName?: string | null;
  billingAddressEmail?: string | null;
  billingAddressPhone?: string | null;
  billingAddressStreet?: string | null;
  billingAddressCity?: string | null;
  billingAddressState?: string | null;
  billingAddressZip?: string | null;
  billingAddressCountry?: string | null;
  totalAmount?: number | null;
  discountCode?: string | null;
  paymentConfirmation?: string | null;
};

export function buildReceiptPayload(registrant: RegistrantReceiptSource) {
  const totalDue = Number(registrant.totalAmount ?? 0);
  const label = attendeeTypeLabel(registrant.attendeeType);
  const lineItems: ReceiptLineItem[] = [
    {
      description: `${label} - ${registrant.firstName ?? ''} ${registrant.lastName ?? ''}`.trim(),
      quantity: 1,
      amount: totalDue,
    },
  ];

  const registrantPayload: ReceiptRegistrant = {
    firstName: registrant.firstName,
    lastName: registrant.lastName,
    email: registrant.email,
    companyName: registrant.company?.name ?? null,
    jobTitle: registrant.jobTitle,
    phone: registrant.phone,
    attendeeType: registrant.attendeeType,
    billingAddressFirstName: registrant.billingAddressFirstName,
    billingAddressLastName: registrant.billingAddressLastName,
    billingAddressEmail: registrant.billingAddressEmail,
    billingAddressPhone: registrant.billingAddressPhone,
    billingAddressStreet: registrant.billingAddressStreet,
    billingAddressCity: registrant.billingAddressCity,
    billingAddressState: registrant.billingAddressState,
    billingAddressZip: registrant.billingAddressZip,
    billingAddressCountry: registrant.billingAddressCountry,
  };

  return {
    registrant: registrantPayload,
    invoiceId: registrant.id,
    lineItems,
    subtotal: totalDue,
    discountAmount: 0,
    totalDue,
    discountCode: null,
    paymentConfirmation: registrant.paymentConfirmation ?? null,
    receiptCreatedAt: registrant.createdAt,
  };
}

export async function generateAndAttachRegistrantReceipt(
  registrant: RegistrantReceiptSource,
  opts?: { dryRun?: boolean },
): Promise<{ url: string; receiptCreatedAt: string }> {
  const payload = buildReceiptPayload(registrant);
  const buffer = await renderRegistrantReceiptPdf(payload);
  const { bucket, region } = getBucketConfig();
  const key = `public/invoices/${registrant.id}.pdf`;
  const publicUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

  if (opts?.dryRun) {
    return { url: publicUrl, receiptCreatedAt: payload.receiptCreatedAt };
  }

  const s3 = new S3Client({ region });
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: 'application/pdf',
      ContentDisposition: `attachment; filename="aps-receipt-${registrant.id}.pdf"`,
    }),
  );

  await requestGraphQL(UPDATE_REGISTRANT_INVOICE, {
    input: {
      id: registrant.id,
      invoice: publicUrl,
    },
  });

  return { url: publicUrl, receiptCreatedAt: payload.receiptCreatedAt };
}
