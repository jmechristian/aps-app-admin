'use server';

import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
import { revalidatePath } from 'next/cache';
import { requestGraphQL } from '@/lib/appsync';
import {
  compareGalleryPhotos,
  galleryPhotoNumber,
  isGalleryJpeg,
} from '@/lib/gallery-sort';
import { isYearLabel } from '@/lib/event-label';

export type GalleryPhoto = {
  key: string;
  filename: string;
  number: number;
  url: string;
};

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
      /"aws_user_files_s3_bucket"\s*:\s*"([^"]+)"/,
    );
    const regionMatch = contents.match(
      /"aws_user_files_s3_bucket_region"\s*:\s*"([^"]+)"/,
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

  if (bucket) return { bucket, region };

  const fromAwsExports = loadS3ConfigFromAwsExports();
  if (fromAwsExports) return fromAwsExports;

  throw new Error(
    'S3 bucket name not configured. Set AWS_S3_BUCKET, or ensure src/aws-exports.js exists.',
  );
}

const GET_APS_YEAR = /* GraphQL */ `
  query GetApsYear($id: ID!) {
    getAPS(id: $id) {
      id
      year
    }
  }
`;

async function eventLabel(eventId: string): Promise<string> {
  const data = await requestGraphQL<{
    getAPS?: { year?: string | null } | null;
  }>(GET_APS_YEAR, { id: eventId });
  const label = data.getAPS?.year?.trim() ?? '';
  if (!label) throw new Error('This event does not have a title.');
  return label;
}

function galleryPrefixForEvent(eventId: string, label: string) {
  // Existing summit photos live at public/2026/. Leave that path alone.
  if (isYearLabel(label)) return `public/${label}/`;
  return `public/events/${eventId}/`;
}

function publicObjectUrl(bucket: string, region: string, key: string) {
  const encoded = key.split('/').map(encodeURIComponent).join('/');
  return `https://${bucket}.s3.${region}.amazonaws.com/${encoded}`;
}

export async function listGalleryPhotos(eventId: string): Promise<{
  year: string;
  prefix: string;
  photos: GalleryPhoto[];
}> {
  const year = await eventLabel(eventId);
  const prefix = galleryPrefixForEvent(eventId, year);
  const { bucket, region } = getBucketConfig();
  const client = new S3Client({ region });

  const keys: string[] = [];
  let continuationToken: string | undefined;
  do {
    const page = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: continuationToken,
      }),
    );
    for (const item of page.Contents ?? []) {
      if (item.Key && isGalleryJpeg(item.Key)) keys.push(item.Key);
    }
    continuationToken = page.IsTruncated
      ? page.NextContinuationToken
      : undefined;
  } while (continuationToken);

  keys.sort(compareGalleryPhotos);

  return {
    year,
    prefix,
    photos: keys.map((key) => ({
      key,
      filename: key.split('/').pop() ?? key,
      number: galleryPhotoNumber(key),
      url: publicObjectUrl(bucket, region, key),
    })),
  };
}

export async function deleteGalleryPhoto(input: {
  eventId: string;
  key: string;
}) {
  const eventId = input.eventId.trim();
  const key = input.key.trim();
  if (!eventId || !key) throw new Error('Missing photo.');

  const year = await eventLabel(eventId);
  const prefix = galleryPrefixForEvent(eventId, year);
  if (!key.startsWith(prefix) || key.includes('..') || !isGalleryJpeg(key)) {
    throw new Error('That file is not a gallery photo for this event.');
  }

  const { bucket, region } = getBucketConfig();
  const client = new S3Client({ region });
  await client.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: key,
    }),
  );

  revalidatePath(`/aps/${eventId}/gallery`);
}
