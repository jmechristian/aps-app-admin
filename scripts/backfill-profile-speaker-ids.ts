import { requestGraphQL } from '@/lib/appsync';

const LIST_SPEAKERS_BY_EVENT = /* GraphQL */ `
  query APSSpeakersByEventId(
    $eventId: ID!
    $limit: Int
    $nextToken: String
  ) {
    aPSSpeakersByEventId(eventId: $eventId, limit: $limit, nextToken: $nextToken) {
      items {
        id
        profileId
      }
      nextToken
    }
  }
`;

const UPDATE_PROFILE = /* GraphQL */ `
  mutation UpdateApsAppUserProfile($input: UpdateApsAppUserProfileInput!) {
    updateApsAppUserProfile(input: $input) {
      id
      speakerId
    }
  }
`;

type SpeakerItem = { id: string; profileId?: string | null };

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
    throw new Error(
      'Usage: npx tsx scripts/backfill-profile-speaker-ids.ts <eventId> [--dry-run]'
    );
  }
  if (!jwt) {
    throw new Error('Missing APS_ADMIN_JWT (admin user pool token)');
  }

  const speakers = await listSpeakersByEventId(eventId, jwt);

  let updated = 0;
  let skipped = 0;
  let missing = 0;

  for (const speaker of speakers) {
    if (!speaker.profileId) {
      missing += 1;
      continue;
    }

    if (!dryRun) {
      await requestGraphQL(
        UPDATE_PROFILE,
        { input: { id: speaker.profileId, speakerId: speaker.id } },
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
