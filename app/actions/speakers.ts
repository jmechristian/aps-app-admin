'use server';

import { requestGraphQL } from '@/lib/appsync';
import { fetchRegistrantById } from '@/app/actions/registrants';
import { fetchRegistrantsByApsId } from '@/app/actions/registrants';

const CREATE_APS_SPEAKER = /* GraphQL */ `
  mutation CreateAPSSpeaker($input: CreateAPSSpeakerInput!) {
    createAPSSpeaker(input: $input) {
      id
      eventId
      firstName
      lastName
      email
      company
      title
    }
  }
`;

const GET_APS_SPEAKER = /* GraphQL */ `
  query GetAPSSpeaker($id: ID!) {
    getAPSSpeaker(id: $id) {
      id
      eventId
      email
      headshot
    }
  }
`;

const UPDATE_APS_SPEAKER = /* GraphQL */ `
  mutation UpdateAPSSpeaker($input: UpdateAPSSpeakerInput!) {
    updateAPSSpeaker(input: $input) {
      id
      headshot
    }
  }
`;

const UPDATE_APS_REGISTRANT = /* GraphQL */ `
  mutation UpdateApsRegistrant($input: UpdateApsRegistrantInput!) {
    updateApsRegistrant(input: $input) {
      id
      attendeeType
    }
  }
`;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function findRegistrantIdByEventAndEmail(eventId: string, email: string) {
  const target = normalizeEmail(email);
  if (!target) return null;

  // IMPORTANT: AppSync string "eq" is case sensitive; we match in code instead.
  const registrants = await fetchRegistrantsByApsId(eventId);
  const match = registrants.find((r) => normalizeEmail(r.email) === target);
  return match?.id ?? null;
}

/**
 * Speakers are people: pick an existing registrant and promote them to an APSSpeaker.
 * (Also ensures registrant.attendeeType becomes SPEAKER.)
 */
export async function createSpeakerFromRegistrantId(input: {
  eventId: string;
  registrantId: string;
}) {
  const registrant = await fetchRegistrantById(input.registrantId);
  if (!registrant) throw new Error('Registrant not found');

  if (registrant.apsID !== input.eventId) {
    throw new Error('Registrant does not belong to this event');
  }

  const companyName = registrant.company?.name;
  if (!companyName) {
    throw new Error(
      'Registrant must have a company to be created as an APSSpeaker'
    );
  }

  // Ensure the registrant is marked as a speaker (best-effort; used elsewhere in the app)
  if (registrant.attendeeType !== 'SPEAKER') {
    await requestGraphQL(UPDATE_APS_REGISTRANT, {
      input: { id: registrant.id, attendeeType: 'SPEAKER' },
    });
  }

  const profilePicKey = registrant.appUser?.profile?.profilePicture ?? null;

  // Create APSSpeaker record (what the Speakers page lists)
  const speakerRes = await requestGraphQL<{
    createAPSSpeaker?: { id: string } | null;
  }>(CREATE_APS_SPEAKER, {
    input: {
      eventId: input.eventId,
      firstName: registrant.firstName || '—',
      lastName: registrant.lastName || '—',
      email: registrant.email,
      company: companyName,
      title: registrant.jobTitle || '—',
      phone: registrant.phone ?? null,
      linkedin: null,
      bio:
        registrant.bio?.trim() ||
        `Speaker bio for ${registrant.firstName ?? ''} ${registrant.lastName ?? ''}`.trim() ||
        '—',
      presentationTitle: registrant.presentationTitle ?? null,
      presentationSummary: registrant.presentationSummary ?? null,
      headshot:
        profilePicKey ||
        registrant.headshot ||
        'https://placehold.co/400x400/png',
      mediaConsent: true,
      privacyConsent: true,
    },
  });

  if (!speakerRes.createAPSSpeaker?.id) {
    throw new Error('Failed to create APSSpeaker');
  }

  return speakerRes.createAPSSpeaker;
}

/**
 * On speaker detail load, ensure APSSpeaker.headshot is synced from the matching
 * registrant's appUser.profile.profilePicture (if present).
 *
 * We only overwrite the headshot if it's missing or a placeholder.
 */
export async function syncSpeakerHeadshotFromRegistrant(input: {
  eventId: string;
  speakerId: string;
}) {
  const speakerRes = await requestGraphQL<{
    getAPSSpeaker?: { id: string; eventId: string; email: string; headshot?: string | null } | null;
  }>(GET_APS_SPEAKER, { id: input.speakerId });

  const speaker = speakerRes.getAPSSpeaker;
  if (!speaker) return null;

  // Only sync if headshot is missing/placeholder.
  const headshot = (speaker.headshot ?? '').trim();
  const bucket =
    process.env.AWS_S3_BUCKET ||
    process.env.NEXT_PUBLIC_AWS_USER_FILES_S3_BUCKET ||
    process.env.NEXT_PUBLIC_AWS_S3_BUCKET;
  const isRawS3BucketUrl =
    !!bucket &&
    headshot.includes(`${bucket}.s3.`) &&
    headshot.includes('.amazonaws.com/');

  const isPlaceholder =
    !headshot ||
    headshot.includes('placehold.co') ||
    headshot.includes('hub-mock') ||
    isRawS3BucketUrl;
  if (!isPlaceholder) return speaker;

  const registrantId = await findRegistrantIdByEventAndEmail(
    input.eventId,
    speaker.email
  );
  if (!registrantId) return speaker;

  const registrant = await fetchRegistrantById(registrantId);
  const key = registrant?.appUser?.profile?.profilePicture ?? null;
  if (!key) return speaker;

  const updated = await requestGraphQL<{
    updateAPSSpeaker?: { id: string; headshot?: string | null } | null;
  }>(UPDATE_APS_SPEAKER, { input: { id: speaker.id, headshot: key } });

  return {
    ...speaker,
    headshot: updated.updateAPSSpeaker?.headshot ?? key,
  };
}


