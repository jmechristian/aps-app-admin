'use server';

import QRCode from 'qrcode';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

function loadS3ConfigFromAwsExports(): {
  bucket: string;
  region: string;
} | null {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require('fs') as typeof import('fs');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require('path') as typeof import('path');

    const awsExportsPath = path.join(process.cwd(), 'src', 'aws-exports.js');
    if (!fs.existsSync(awsExportsPath)) return null;

    const contents = fs.readFileSync(awsExportsPath, 'utf8');

    const bucketMatch = contents.match(
      /"aws_user_files_s3_bucket"\s*:\s*"([^"]+)"/
    );
    const regionMatch = contents.match(
      /"aws_user_files_s3_bucket_region"\s*:\s*"([^"]+)"/
    );

    const bucket = bucketMatch?.[1];
    const region = regionMatch?.[1];

    if (!bucket) return null;
    return { bucket, region: region || 'us-east-1' };
  } catch {
    return null;
  }
}

function getBucketConfig() {
  const bucket = process.env.AWS_S3_BUCKET;
  const region =
    process.env.AWS_S3_BUCKET_REGION || process.env.AWS_REGION || 'us-east-1';

  if (bucket) {
    return { bucket, region };
  }

  const fromAwsExports = loadS3ConfigFromAwsExports();
  if (fromAwsExports) {
    return fromAwsExports;
  }

  throw new Error(
    'S3 bucket name not configured. Set AWS_S3_BUCKET (and AWS_S3_BUCKET_REGION), or ensure src/aws-exports.js exists.'
  );
}

// S3 client will use default credentials from environment or IAM role
function createS3Client(region: string) {
  return new S3Client({ region });
}

/**
 * Generate vCard string from registrant data
 */
function generateVCard(data: {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  company?: string | null;
  jobTitle?: string | null;
  website?: string | null;
}): string {
  const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0'];

  // Name
  const fullName =
    [data.firstName, data.lastName].filter(Boolean).join(' ') || data.email;
  lines.push(`FN:${fullName}`);
  if (data.firstName || data.lastName) {
    lines.push(`N:${data.lastName || ''};${data.firstName || ''};;;`);
  }

  // Email
  lines.push(`EMAIL:${data.email}`);

  // Phone
  if (data.phone) {
    lines.push(`TEL:${data.phone}`);
  }

  // Organization
  if (data.company) {
    lines.push(`ORG:${data.company}`);
  }

  // Title
  if (data.jobTitle) {
    lines.push(`TITLE:${data.jobTitle}`);
  }

  // Website
  if (data.website) {
    lines.push(`URL:${data.website}`);
  }

  lines.push('END:VCARD');
  return lines.join('\n');
}

/**
 * Generate QR code image buffer from text payload
 */
async function generateQRCodeBuffer(text: string): Promise<Buffer> {
  try {
    const buffer = await QRCode.toBuffer(text, {
      type: 'png',
      width: 512,
      margin: 2,
      errorCorrectionLevel: 'M',
    });
    return buffer;
  } catch (error) {
    throw new Error(
      `Failed to generate QR code: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Upload QR code to S3 and return the public URL
 */
export async function generateAndUploadQRCodeFromText(
  registrantId: string,
  text: string
): Promise<string> {
  try {
    const { bucket, region } = getBucketConfig();
    const s3Client = createS3Client(region);

    // Generate QR code buffer
    const qrCodeBuffer = await generateQRCodeBuffer(text);

    // Upload to S3
    const key = `qrcodes/${registrantId}.png`;

    // Try to upload with public-read ACL first
    let command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: qrCodeBuffer,
      ContentType: 'image/png',
      ACL: 'public-read', // Make the object publicly readable
    });

    try {
      await s3Client.send(command);
    } catch (error) {
      // If ACL fails (bucket might have ACLs disabled), try without ACL
      // The bucket policy should handle public access
      if (
        error instanceof Error &&
        (error.message.includes('ACL') ||
          error.message.includes('AccessControlListNotSupported'))
      ) {
        console.warn(
          'ACL not supported, uploading without ACL (relying on bucket policy)'
        );
        command = new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: qrCodeBuffer,
          ContentType: 'image/png',
        });
        await s3Client.send(command);
      } else {
        throw error;
      }
    }

    // Return the public URL
    const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

    return url;
  } catch (error) {
    console.error('Failed to generate and upload QR code:', error);
    throw new Error(
      `Failed to generate QR code: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Backwards-compatible helper: generate QR from registrant vCard.
 */
export async function generateAndUploadQRCode(
  registrantId: string,
  data: {
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    phone?: string | null;
    company?: string | null;
    jobTitle?: string | null;
    website?: string | null;
  }
): Promise<string> {
  const vCard = generateVCard(data);
  return generateAndUploadQRCodeFromText(registrantId, vCard);
}
