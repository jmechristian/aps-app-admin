'use server';

import { requestGraphQL } from '@/lib/appsync';

export type FeedbackEvent = {
  id: string;
  year: string;
};

export type FeedbackAuthor = {
  name: string;
  email: string | null;
  company: string | null;
  registrantId: string | null;
};

export type FeedbackEntry = {
  id: string;
  message: string;
  imageKeys: string[];
  createdAt: string;
  author: FeedbackAuthor;
};

export type FeedbackEventCard = {
  event: FeedbackEvent;
  count: number;
};

type FeedbackItem = {
  id?: string | null;
  userId?: string | null;
  eventId?: string | null;
  message?: string | null;
  imageKeys?: Array<string | null> | null;
  createdAt?: string | null;
};

type FeedbackConnection = {
  items?: Array<FeedbackItem | null> | null;
  nextToken?: string | null;
};

type FeedbackByEventResponse = {
  apsAppFeedbacksByEventIdAndCreatedAt?: FeedbackConnection | null;
};

type ListEventsResponse = {
  listAPS?: {
    items?: Array<{ id?: string | null; year?: string | null } | null> | null;
    nextToken?: string | null;
  } | null;
};

type AppUserResponse = {
  getApsAppUser?: {
    id?: string | null;
    registrantId?: string | null;
    registrant?: {
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      company?: { name?: string | null } | null;
    } | null;
    profile?: {
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      company?: string | null;
    } | null;
  } | null;
};

const LIST_EVENTS = /* GraphQL */ `
  query FeedbackListEvents($limit: Int, $nextToken: String) {
    listAPS(limit: $limit, nextToken: $nextToken) {
      items {
        id
        year
      }
      nextToken
    }
  }
`;

const FEEDBACK_BY_EVENT = /* GraphQL */ `
  query FeedbackByEvent($eventId: ID!, $limit: Int, $nextToken: String) {
    apsAppFeedbacksByEventIdAndCreatedAt(
      eventId: $eventId
      sortDirection: DESC
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        eventId
        message
        imageKeys
        createdAt
      }
      nextToken
    }
  }
`;

const FEEDBACK_COUNT_BY_EVENT = /* GraphQL */ `
  query FeedbackCountByEvent($eventId: ID!, $limit: Int, $nextToken: String) {
    apsAppFeedbacksByEventIdAndCreatedAt(
      eventId: $eventId
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
      }
      nextToken
    }
  }
`;

const GET_APP_USER = /* GraphQL */ `
  query FeedbackGetAppUser($id: ID!) {
    getApsAppUser(id: $id) {
      id
      registrantId
      registrant {
        id
        firstName
        lastName
        email
        company {
          name
        }
      }
      profile {
        firstName
        lastName
        email
        company
      }
    }
  }
`;

const USER_POOLS = { authMode: 'userPools' as const };

async function fetchEvents(): Promise<FeedbackEvent[]> {
  const events: FeedbackEvent[] = [];
  let nextToken: string | null = null;

  do {
    const page: ListEventsResponse = await requestGraphQL<ListEventsResponse>(
      LIST_EVENTS,
      { limit: 50, nextToken: nextToken || undefined },
    );
    for (const item of page.listAPS?.items ?? []) {
      if (item?.id && item.year) events.push({ id: item.id, year: item.year });
    }
    nextToken = page.listAPS?.nextToken ?? null;
  } while (nextToken);

  return events.sort((a, b) => b.year.localeCompare(a.year));
}

async function fetchFeedbackItems(eventId: string): Promise<FeedbackItem[]> {
  const items: FeedbackItem[] = [];
  let nextToken: string | null = null;

  do {
    const page: FeedbackByEventResponse =
      await requestGraphQL<FeedbackByEventResponse>(
        FEEDBACK_BY_EVENT,
        { eventId, limit: 100, nextToken: nextToken || undefined },
        USER_POOLS,
      );
    const connection = page.apsAppFeedbacksByEventIdAndCreatedAt;
    for (const item of connection?.items ?? []) {
      if (item?.id) items.push(item);
    }
    nextToken = connection?.nextToken ?? null;
  } while (nextToken);

  return items;
}

function authorFromUser(
  user: AppUserResponse['getApsAppUser'],
  userId: string,
): FeedbackAuthor {
  const registrant = user?.registrant;
  const profile = user?.profile;
  const name = `${registrant?.firstName ?? profile?.firstName ?? ''} ${
    registrant?.lastName ?? profile?.lastName ?? ''
  }`.trim();

  return {
    name:
      name ||
      registrant?.email ||
      profile?.email ||
      (userId ? `User ${userId.slice(0, 8)}` : 'Unknown attendee'),
    email: registrant?.email ?? profile?.email ?? null,
    company: registrant?.company?.name ?? profile?.company ?? null,
    registrantId: registrant?.id ?? user?.registrantId ?? null,
  };
}

async function fetchAuthors(
  userIds: string[],
): Promise<Map<string, FeedbackAuthor>> {
  const authors = new Map<string, FeedbackAuthor>();
  const ids = [...new Set(userIds.filter(Boolean))];

  for (let index = 0; index < ids.length; index += 10) {
    const chunk = ids.slice(index, index + 10);
    const loaded = await Promise.all(
      chunk.map(async (id) => {
        try {
          const response: AppUserResponse =
            await requestGraphQL<AppUserResponse>(GET_APP_USER, { id });
          return [id, authorFromUser(response.getApsAppUser, id)] as const;
        } catch {
          return [id, authorFromUser(null, id)] as const;
        }
      }),
    );
    for (const [id, author] of loaded) authors.set(id, author);
  }

  return authors;
}

function toEntry(
  item: FeedbackItem,
  authors: Map<string, FeedbackAuthor>,
): FeedbackEntry | null {
  if (!item.id || !item.createdAt) return null;
  const userId = item.userId ?? '';
  return {
    id: item.id,
    message: item.message ?? '',
    imageKeys: (item.imageKeys ?? []).filter((key): key is string =>
      Boolean(key),
    ),
    createdAt: item.createdAt,
    author: authors.get(userId) ?? authorFromUser(null, userId),
  };
}

export async function fetchFeedbackForEvent(
  eventId: string,
): Promise<FeedbackEntry[]> {
  const items = await fetchFeedbackItems(eventId);
  const authors = await fetchAuthors(
    items.map((item) => item.userId ?? '').filter(Boolean),
  );
  return items
    .map((item) => toEntry(item, authors))
    .filter((entry): entry is FeedbackEntry => entry !== null);
}

async function countFeedbackForEvent(eventId: string): Promise<number> {
  let count = 0;
  let nextToken: string | null = null;

  do {
    const page: FeedbackByEventResponse =
      await requestGraphQL<FeedbackByEventResponse>(
        FEEDBACK_COUNT_BY_EVENT,
        { eventId, limit: 200, nextToken: nextToken || undefined },
        USER_POOLS,
      );
    const connection = page.apsAppFeedbacksByEventIdAndCreatedAt;
    count += (connection?.items ?? []).filter((item) => item?.id).length;
    nextToken = connection?.nextToken ?? null;
  } while (nextToken);

  return count;
}

export async function fetchFeedbackEventCards(): Promise<FeedbackEventCard[]> {
  const events = await fetchEvents();
  return Promise.all(
    events.map(async (event) => ({
      event,
      count: await countFeedbackForEvent(event.id),
    })),
  );
}
