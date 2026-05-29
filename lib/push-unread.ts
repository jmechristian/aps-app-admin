import { requestGraphQL } from '@/lib/appsync';

const GET_ENGAGE_STATE = /* GraphQL */ `
  query GetApsUserEngageState($id: ID!) {
    getApsUserEngageState(id: $id) {
      id
      lastSeenAnnouncementAt
    }
  }
`;

const ANNOUNCEMENTS_BY_EVENT = /* GraphQL */ `
  query ApsAdminAnnouncementsByEventIdAndCreatedAt(
    $eventId: ID!
    $filter: ModelApsAdminAnnouncementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    apsAdminAnnouncementsByEventIdAndCreatedAt(
      eventId: $eventId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        scheduledAt
        publishedAt
      }
      nextToken
    }
  }
`;

type AnnouncementUnreadItem = {
  id: string;
  createdAt: string;
  scheduledAt?: string | null;
  publishedAt?: string | null;
};

function isVisibleAnnouncement(item: AnnouncementUnreadItem): boolean {
  if (item.publishedAt) return true;
  return !item.scheduledAt;
}

function visibleAt(item: AnnouncementUnreadItem): string {
  return item.publishedAt ?? item.createdAt;
}

function buildAnnouncementUnreadFilter(lastSeen: string | null) {
  if (!lastSeen) {
    return {
      or: [
        { publishedAt: { attributeExists: true } },
        {
          and: [
            { publishedAt: { attributeExists: false } },
            { scheduledAt: { attributeExists: false } },
          ],
        },
      ],
    };
  }

  return {
    or: [
      { publishedAt: { gt: lastSeen } },
      {
        and: [
          { publishedAt: { attributeExists: false } },
          { scheduledAt: { attributeExists: false } },
          { createdAt: { gt: lastSeen } },
        ],
      },
    ],
  };
}

export async function computeUnreadAnnouncements({
  eventId,
  userId,
  jwt,
}: {
  eventId: string;
  userId: string;
  jwt: string;
}): Promise<number> {
  const engageId = `e:${eventId}|u:${userId}`;

  type EngageResp = {
    getApsUserEngageState?: { lastSeenAnnouncementAt?: string | null } | null;
  };
  const engage: EngageResp = await requestGraphQL<EngageResp>(
    GET_ENGAGE_STATE,
    { id: engageId },
    { authMode: 'userPools', jwt },
  );
  const lastSeen = engage.getApsUserEngageState?.lastSeenAnnouncementAt ?? null;

  let nextToken: string | null | undefined = null;
  let total = 0;

  do {
    type Resp = {
      apsAdminAnnouncementsByEventIdAndCreatedAt?: {
        items?: AnnouncementUnreadItem[];
        nextToken?: string | null;
      } | null;
    };

    const data: Resp = await requestGraphQL<Resp>(
      ANNOUNCEMENTS_BY_EVENT,
      {
        eventId,
        filter: buildAnnouncementUnreadFilter(lastSeen),
        limit: 1000,
        nextToken: nextToken || undefined,
      },
      { authMode: 'userPools', jwt },
    );

    const items = data.apsAdminAnnouncementsByEventIdAndCreatedAt?.items ?? [];
    for (const item of items) {
      if (!item?.id || !isVisibleAnnouncement(item)) continue;
      if (lastSeen && visibleAt(item) <= lastSeen) continue;
      total += 1;
    }
    nextToken = data.apsAdminAnnouncementsByEventIdAndCreatedAt?.nextToken;
  } while (nextToken);

  return total;
}
