'use server';

import { fetchExhibitorProfilesByEventId } from '@/app/actions/event-content';
import { fetchRegistrantsByApsId } from '@/app/actions/registrants';
import { requestGraphQL } from '@/lib/appsync';

type PassportStamp = {
  id: string;
  userProfileId: string;
  exhibitorId: string;
  eventId: string;
  stampKey: string;
  scannedAt: string;
  createdAt: string;
};

type PassportStampsByEventResponse = {
  apsAppUserPassportStampsByEventIdAndCreatedAt?: {
    items?: Array<PassportStamp | null> | null;
    nextToken?: string | null;
  } | null;
};

export type PassportRegistrantProgress = {
  registrantId: string;
  name: string;
  email: string;
  companyName: string | null;
  attendeeType: string | null;
  status: string;
  userProfileId: string | null;
  completedCount: number;
  totalExhibitors: number;
  percentComplete: number;
  lastScannedAt: string | null;
};

export type PassportExhibitorProgress = {
  exhibitorId: string;
  companyName: string;
  boothNumber: string | null;
  stampCount: number;
};

export type PassportChallengeTracker = {
  totalRegistrants: number;
  eligibleRegistrants: number;
  totalExhibitors: number;
  totalStamps: number;
  totalPossibleStamps: number;
  averageCompletionPercent: number;
  completedRegistrants: number;
  registrants: PassportRegistrantProgress[];
  exhibitors: PassportExhibitorProgress[];
};

const PASSPORT_STAMPS_BY_EVENT = /* GraphQL */ `
  query ApsAppUserPassportStampsByEventIdAndCreatedAt(
    $eventId: ID!
    $sortDirection: ModelSortDirection
    $limit: Int
    $nextToken: String
  ) {
    apsAppUserPassportStampsByEventIdAndCreatedAt(
      eventId: $eventId
      sortDirection: $sortDirection
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userProfileId
        exhibitorId
        eventId
        stampKey
        scannedAt
        createdAt
      }
      nextToken
    }
  }
`;

async function fetchPassportStampsByEventId(
  eventId: string
): Promise<PassportStamp[]> {
  const stamps: PassportStamp[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data: PassportStampsByEventResponse =
      await requestGraphQL<PassportStampsByEventResponse>(
        PASSPORT_STAMPS_BY_EVENT,
        {
          eventId,
          sortDirection: 'DESC',
          limit: 1000,
          nextToken: nextToken || undefined,
        }
      );

    const items =
      data.apsAppUserPassportStampsByEventIdAndCreatedAt?.items ?? [];
    stamps.push(
      ...items.filter((stamp): stamp is PassportStamp => Boolean(stamp))
    );
    nextToken =
      data.apsAppUserPassportStampsByEventIdAndCreatedAt?.nextToken ?? null;
  } while (nextToken);

  return stamps;
}

function formatRegistrantName(registrant: {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
}) {
  return (
    `${registrant.firstName ?? ''} ${registrant.lastName ?? ''}`.trim() ||
    registrant.email
  );
}

export async function fetchPassportChallengeTracker(
  eventId: string
): Promise<PassportChallengeTracker> {
  const [registrants, exhibitors, stamps] = await Promise.all([
    fetchRegistrantsByApsId(eventId),
    fetchExhibitorProfilesByEventId(eventId),
    fetchPassportStampsByEventId(eventId),
  ]);

  const exhibitorIds = new Set(exhibitors.map((exhibitor) => exhibitor.id));
  const stampsByProfile = new Map<string, PassportStamp[]>();
  const stampCountsByExhibitor = new Map<string, number>();

  for (const stamp of stamps) {
    if (!exhibitorIds.has(stamp.exhibitorId)) continue;

    const profileStamps = stampsByProfile.get(stamp.userProfileId) ?? [];
    profileStamps.push(stamp);
    stampsByProfile.set(stamp.userProfileId, profileStamps);

    stampCountsByExhibitor.set(
      stamp.exhibitorId,
      (stampCountsByExhibitor.get(stamp.exhibitorId) ?? 0) + 1
    );
  }

  const totalExhibitors = exhibitors.length;
  const registrantRows: PassportRegistrantProgress[] = registrants.map(
    (registrant) => {
      const userProfileId = registrant.appUser?.profile?.id ?? null;
      const profileStamps = userProfileId
        ? stampsByProfile.get(userProfileId) ?? []
        : [];
      const completedExhibitors = new Set(
        profileStamps.map((stamp) => stamp.exhibitorId)
      );
      const completedCount = completedExhibitors.size;
      const lastScannedAt =
        profileStamps
          .map((stamp) => stamp.scannedAt || stamp.createdAt)
          .filter(Boolean)
          .sort()
          .at(-1) ?? null;

      return {
        registrantId: registrant.id,
        name: formatRegistrantName(registrant),
        email: registrant.email,
        companyName: registrant.company?.name ?? null,
        attendeeType: registrant.attendeeType ?? null,
        status: registrant.status,
        userProfileId,
        completedCount,
        totalExhibitors,
        percentComplete:
          totalExhibitors > 0
            ? Math.round((completedCount / totalExhibitors) * 100)
            : 0,
        lastScannedAt,
      };
    }
  );

  registrantRows.sort((a, b) => {
    if (b.completedCount !== a.completedCount) {
      return b.completedCount - a.completedCount;
    }
    return a.name.localeCompare(b.name);
  });

  const eligibleRegistrants = registrantRows.filter(
    (registrant) => registrant.userProfileId
  ).length;
  const totalPossibleStamps = eligibleRegistrants * totalExhibitors;
  const totalStamps = registrantRows.reduce(
    (sum, registrant) => sum + registrant.completedCount,
    0
  );

  return {
    totalRegistrants: registrants.length,
    eligibleRegistrants,
    totalExhibitors,
    totalStamps,
    totalPossibleStamps,
    averageCompletionPercent:
      totalPossibleStamps > 0
        ? Math.round((totalStamps / totalPossibleStamps) * 100)
        : 0,
    completedRegistrants: registrantRows.filter(
      (registrant) =>
        totalExhibitors > 0 && registrant.completedCount >= totalExhibitors
    ).length,
    registrants: registrantRows,
    exhibitors: exhibitors
      .map((exhibitor) => ({
        exhibitorId: exhibitor.id,
        companyName: exhibitor.company?.name ?? exhibitor.companyId,
        boothNumber: exhibitor.boothNumber ?? null,
        stampCount: stampCountsByExhibitor.get(exhibitor.id) ?? 0,
      }))
      .sort((a, b) => {
        if (b.stampCount !== a.stampCount) return b.stampCount - a.stampCount;
        return a.companyName.localeCompare(b.companyName);
      }),
  };
}
