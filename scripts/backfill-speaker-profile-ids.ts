import { requestGraphQL } from '@/lib/appsync';
import { fetchRegistrantsByApsId } from '@/app/actions/registrants';

const LIST_SPEAKERS_BY_EVENT = /* GraphQL */ `
  query APSSpeakersByEventId(
    $eventId: ID!
    $limit: Int
    $nextToken: String
  ) {
    aPSSpeakersByEventId(eventId: $eventId, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        profileId
      }
      nextToken
    }
  }
`;

const UPDATE_SPEAKER = /* GraphQL */ `
  mutation UpdateAPSSpeaker($input: UpdateAPSSpeakerInput!) {
    updateAPSSpeaker(input: $input) {
      id
      profileId
    }
  }
`;

type SpeakerItem = {
  id: string;
  email?: string | null;
  profileId?: string | null;
};

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function listSpeakersByEventId(eventId: string, jwt: string) {
  const speakers: SpeakerItem[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const response: {
      aPSSpeakersByEventId?: {
        items?: Array<SpeakerItem | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(
      LIST_SPEAKERS_BY_EVENT,
      { eventId, limit: 1000, nextToken: nextToken || undefined },
      { authMode: 'userPools', jwt }
    );

    const items = response.aPSSpeakersByEventId?.items ?? [];
    speakers.push(...(items.filter(Boolean) as SpeakerItem[]));
    nextToken = response.aPSSpeakersByEventId?.nextToken ?? null;
  } while (nextToken);

  return speakers;
}

async function main() {
  const eventId = process.argv[2];
  const dryRun = process.argv.includes('--dry-run');
  const jwt = process.env.APS_ADMIN_JWT;

  if (!eventId) {
    throw new Error('Usage: npx tsx scripts/backfill-speaker-profile-ids.ts <eventId> [--dry-run]');
  }
  if (!jwt) {
    throw new Error('Missing APS_ADMIN_JWT (admin user pool token)');
  }

  const [speakers, registrantsRaw] = await Promise.all([
    listSpeakersByEventId(eventId, jwt),
    fetchRegistrantsByApsId(eventId),
  ]);
  const registrants = registrantsRaw as Array<{
    email?: string | null;
    appUser?: { profile?: { id?: string | null } | null } | null;
  }>;

  const profileIdByEmail = new Map<string, string>();
  for (const r of registrants) {
    const email = r.email ? normalizeEmail(r.email) : '';
    const profileId = r.appUser?.profile?.id ?? null;
    if (email && profileId) {
      profileIdByEmail.set(email, profileId);
    }
  }

  let updated = 0;
  let skipped = 0;
  let missing = 0;

  for (const speaker of speakers) {
    if (speaker.profileId) {
      skipped += 1;
      continue;
    }
    const email = speaker.email ? normalizeEmail(speaker.email) : '';
    const profileId = email ? profileIdByEmail.get(email) ?? null : null;
    if (!profileId) {
      missing += 1;
      continue;
    }

    if (!dryRun) {
      await requestGraphQL(
        UPDATE_SPEAKER,
        { input: { id: speaker.id, profileId } },
        { authMode: 'userPools', jwt }
      );
    }
    updated += 1;
  }

  console.log(
    `Backfill complete. Updated: ${updated}. Skipped: ${skipped}. Missing profile: ${missing}. Dry run: ${dryRun}.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
