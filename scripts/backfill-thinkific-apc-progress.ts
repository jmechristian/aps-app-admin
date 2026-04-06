import { requestGraphQL } from '@/lib/appsync';
import { getThinkificRegistrantSummaryByEmail } from '@/app/actions/thinkific';

const LIST_REGISTRANTS = /* GraphQL */ `
  query ListApsRegistrantsForThinkificBackfill(
    $filter: ModelApsRegistrantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsRegistrants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        apsID
        email
        appUser {
          id
          profile {
            id
            thinkificId
            apcProgress
          }
        }
      }
      nextToken
    }
  }
`;

const UPDATE_APP_USER_PROFILE = /* GraphQL */ `
  mutation UpdateApsAppUserProfileForThinkificBackfill(
    $input: UpdateApsAppUserProfileInput!
  ) {
    updateApsAppUserProfile(input: $input) {
      id
      thinkificId
      apcProgress
    }
  }
`;

type RegistrantItem = {
  id: string;
  apsID?: string | null;
  email?: string | null;
  appUser?: {
    id?: string | null;
    profile?: {
      id?: string | null;
      thinkificId?: number | null;
      apcProgress?: number | null;
    } | null;
  } | null;
};

type ListRegistrantsResponse = {
  listApsRegistrants?: {
    items?: Array<RegistrantItem | null>;
    nextToken?: string | null;
  } | null;
};

function parseArgs() {
  const dryRun = process.argv.includes('--dry-run');
  const eventId = process.argv.find((arg) => !arg.startsWith('--') && arg !== process.argv[0] && arg !== process.argv[1]) ?? null;
  return { dryRun, eventId };
}

async function listRegistrants(eventId: string | null) {
  const registrants: RegistrantItem[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const filter = eventId ? { apsID: { eq: eventId } } : undefined;
    const response = await requestGraphQL<ListRegistrantsResponse>(
      LIST_REGISTRANTS,
      { filter, limit: 1000, nextToken: nextToken || undefined },
    );

    const items = response.listApsRegistrants?.items ?? [];
    registrants.push(...(items.filter(Boolean) as RegistrantItem[]));
    nextToken = response.listApsRegistrants?.nextToken ?? null;
  } while (nextToken);

  return registrants;
}

async function main() {
  const { dryRun, eventId } = parseArgs();
  const registrants = await listRegistrants(eventId);
  const targets = registrants.filter((registrant) => registrant.appUser?.profile?.id);

  let processed = 0;
  let updated = 0;
  let unchanged = 0;
  let skippedNoEmail = 0;
  let skippedNoProfile = 0;
  let errors = 0;

  for (const registrant of registrants) {
    const profileId = registrant.appUser?.profile?.id ?? null;
    if (!profileId) {
      skippedNoProfile += 1;
      continue;
    }

    const email = registrant.email?.trim().toLowerCase();
    if (!email) {
      skippedNoEmail += 1;
      continue;
    }

    processed += 1;

    try {
      const summary = await getThinkificRegistrantSummaryByEmail(email);
      if (summary.error) {
        errors += 1;
        console.error(
          `Thinkific lookup error for registrant ${registrant.id} (${email}): ${summary.error}`,
        );
        continue;
      }

      const nextThinkificId = summary.thinkificUserId ?? null;
      const nextApcProgress = Number(summary.apcProgramProgress.toFixed(1));
      const currentThinkificId = registrant.appUser?.profile?.thinkificId ?? null;
      const currentApcProgress = registrant.appUser?.profile?.apcProgress ?? null;

      const changed =
        currentThinkificId !== nextThinkificId || currentApcProgress !== nextApcProgress;

      if (!changed) {
        unchanged += 1;
        continue;
      }

      if (!dryRun) {
        await requestGraphQL(
          UPDATE_APP_USER_PROFILE,
          {
            input: {
              id: profileId,
              thinkificId: nextThinkificId,
              apcProgress: nextApcProgress,
            },
          },
        );
      }

      updated += 1;
      console.log(
        `${dryRun ? '[dry-run] ' : ''}Updated profile ${profileId}: thinkificId ${String(
          currentThinkificId,
        )} -> ${String(nextThinkificId)}, apcProgress ${String(
          currentApcProgress,
        )} -> ${nextApcProgress}`,
      );
    } catch (error) {
      errors += 1;
      console.error(
        `Failed processing registrant ${registrant.id} (${email}):`,
        error,
      );
    }
  }

  console.log(
    [
      'Thinkific APC backfill complete.',
      `Event filter: ${eventId ?? 'all events'}.`,
      `Profiles found: ${targets.length}.`,
      `Processed: ${processed}.`,
      `Updated: ${updated}.`,
      `Unchanged: ${unchanged}.`,
      `Skipped (no profile): ${skippedNoProfile}.`,
      `Skipped (no email): ${skippedNoEmail}.`,
      `Errors: ${errors}.`,
      `Dry run: ${dryRun}.`,
    ].join(' '),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
