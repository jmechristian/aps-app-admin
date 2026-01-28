import { NextResponse } from 'next/server';
import { requestGraphQL } from '@/lib/appsync';

type PushTokenItem = {
  id: string;
  token?: string | null;
  userId?: string | null;
};

type DmParticipantStateItem = { unreadCount?: number | null };
type ContactRequestItem = {
  owners?: Array<string | null> | null;
  requestedByUserId?: string | null;
};

const LIST_PUSH_TOKENS = /* GraphQL */ `
  query ListApsPushTokens($limit: Int, $nextToken: String) {
    listApsPushTokens(limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        token
      }
      nextToken
    }
  }
`;

const GET_ENGAGE_STATE = /* GraphQL */ `
  query GetApsUserEngageState($id: ID!) {
    getApsUserEngageState(id: $id) {
      id
      lastSeenAnnouncementAt
    }
  }
`;

const ANNOUNCEMENTS_BY_EVENT_CREATED = /* GraphQL */ `
  query ApsAdminAnnouncementsByEventIdAndCreatedAt(
    $eventId: ID!
    $createdAt: ModelStringKeyConditionInput
    $limit: Int
    $nextToken: String
  ) {
    apsAdminAnnouncementsByEventIdAndCreatedAt(
      eventId: $eventId
      createdAt: $createdAt
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
      }
      nextToken
    }
  }
`;

const PARTICIPANT_STATES_BY_USER = /* GraphQL */ `
  query ApsDmParticipantStatesByUserIdAndLastMessageAt(
    $userId: ID!
    $filter: ModelApsDmParticipantStateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    apsDmParticipantStatesByUserIdAndLastMessageAt(
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: DESC
    ) {
      items {
        unreadCount
      }
      nextToken
    }
  }
`;

const CONTACT_REQUESTS_BY_STATUS = /* GraphQL */ `
  query ApsContactRequestsByStatusAndUpdatedAt(
    $status: String!
    $filter: ModelApsContactRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    apsContactRequestsByStatusAndUpdatedAt(
      status: $status
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: DESC
    ) {
      items {
        owners
        requestedByUserId
      }
      nextToken
    }
  }
`;

function decodeJwtPayload(jwt: string): Record<string, unknown> | null {
  const parts = jwt.split('.');
  if (parts.length < 2) return null;
  try {
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4);
    const json = Buffer.from(padded, 'base64').toString('utf8');
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function computeUnreadMessages({
  eventId,
  userId,
  jwt,
}: {
  eventId: string;
  userId: string;
  jwt: string;
}): Promise<number> {
  let nextToken: string | null | undefined = null;
  let total = 0;

  do {
    type Resp = {
      apsDmParticipantStatesByUserIdAndLastMessageAt?: {
        items?: DmParticipantStateItem[];
        nextToken?: string | null;
      } | null;
    };

    const data: Resp = await requestGraphQL<Resp>(
      PARTICIPANT_STATES_BY_USER,
      {
        userId,
        filter: { eventId: { eq: eventId } },
        limit: 1000,
        nextToken: nextToken || undefined,
      },
      { authMode: 'userPools', jwt }
    );

    const items =
      data.apsDmParticipantStatesByUserIdAndLastMessageAt?.items ?? [];
    for (const it of items) total += Number(it?.unreadCount ?? 0);
    nextToken = data.apsDmParticipantStatesByUserIdAndLastMessageAt?.nextToken;
  } while (nextToken);

  return total;
}

async function computeUnreadRequests({
  eventId,
  userId,
  jwt,
}: {
  eventId: string;
  userId: string;
  jwt: string;
}): Promise<number> {
  let nextToken: string | null | undefined = null;
  let total = 0;

  do {
    type Resp = {
      apsContactRequestsByStatusAndUpdatedAt?: {
        items?: ContactRequestItem[];
        nextToken?: string | null;
      } | null;
    };

    const data: Resp = await requestGraphQL<Resp>(
      CONTACT_REQUESTS_BY_STATUS,
      {
        status: 'PENDING',
        filter: { eventId: { eq: eventId } },
        limit: 1000,
        nextToken: nextToken || undefined,
      },
      { authMode: 'userPools', jwt }
    );

    const items = data.apsContactRequestsByStatusAndUpdatedAt?.items ?? [];
    for (const it of items) {
      const owners = (it?.owners ?? []).filter(Boolean) as string[];
      const requestedBy = it?.requestedByUserId ?? null;
      // "Incoming" for userId: they are one of the owners, but not the requester.
      if (requestedBy && requestedBy !== userId && owners.includes(userId))
        total += 1;
    }
    nextToken = data.apsContactRequestsByStatusAndUpdatedAt?.nextToken;
  } while (nextToken);

  return total;
}

async function computeUnreadAnnouncements({
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
    { authMode: 'userPools', jwt }
  );
  const lastSeen = engage.getApsUserEngageState?.lastSeenAnnouncementAt ?? null;

  let nextToken: string | null | undefined = null;
  let total = 0;

  do {
    type Resp = {
      apsAdminAnnouncementsByEventIdAndCreatedAt?: {
        items?: Array<{ id: string; createdAt: string }>;
        nextToken?: string | null;
      } | null;
    };

    const data: Resp = await requestGraphQL<Resp>(
      ANNOUNCEMENTS_BY_EVENT_CREATED,
      {
        eventId,
        createdAt: lastSeen ? { gt: lastSeen } : undefined,
        limit: 1000,
        nextToken: nextToken || undefined,
      },
      { authMode: 'userPools', jwt }
    );

    const items = data.apsAdminAnnouncementsByEventIdAndCreatedAt?.items ?? [];
    total += items.filter(Boolean).length;
    nextToken = data.apsAdminAnnouncementsByEventIdAndCreatedAt?.nextToken;
  } while (nextToken);

  return total;
}

async function sendExpo(messages: Array<Record<string, unknown>>) {
  if (!messages.length) return;

  const url =
    process.env.EXPO_PUSH_URL || 'https://exp.host/--/api/v2/push/send';
  const token = process.env.EXPO_ACCESS_TOKEN;

  const headers: Record<string, string> = {
    'content-type': 'application/json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  // Expo recommends <= 100 messages per request
  const chunkSize = 100;
  for (let i = 0; i < messages.length; i += chunkSize) {
    const chunk = messages.slice(i, i + chunkSize);
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(chunk),
      cache: 'no-store',
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `Expo push failed: ${res.status} ${res.statusText} ${text}`
      );
    }
  }
}

export async function POST(req: Request) {
  const auth =
    req.headers.get('authorization') || req.headers.get('Authorization');
  const jwt = auth?.startsWith('Bearer ') ? auth.slice('Bearer '.length) : auth;
  if (!jwt) {
    return NextResponse.json(
      { error: 'Missing Authorization JWT' },
      { status: 401 }
    );
  }

  // Lightweight group gate (real enforcement happens via AppSync when listing push tokens)
  const payload = decodeJwtPayload(jwt);
  const groups = (payload?.['cognito:groups'] as string[] | undefined) ?? [];
  if (!groups.includes('Admin')) {
    return NextResponse.json(
      { error: 'Admin group required' },
      { status: 403 }
    );
  }

  const body = (await req.json().catch(() => null)) as {
    title?: string;
    body?: string;
    eventId?: string;
    deepLink?: string | null;
    announcementId?: string | null;
  } | null;
  const title = body?.title?.trim() || 'New announcement';
  const msg = body?.body?.trim();
  const eventId = body?.eventId?.trim();
  const deepLink = body?.deepLink ?? null;
  const announcementId = body?.announcementId?.trim() || null;

  if (!msg) {
    return NextResponse.json(
      { error: 'Missing announcement body' },
      { status: 400 }
    );
  }
  if (!eventId) {
    return NextResponse.json({ error: 'Missing eventId' }, { status: 400 });
  }

  // List all tokens via AppSync (Admin group is authorized by schema)
  let nextToken: string | null | undefined = null;
  const tokensByUser = new Map<string, Set<string>>();

  do {
    type ListTokensResponse = {
      listApsPushTokens?: {
        items?: PushTokenItem[];
        nextToken?: string | null;
      } | null;
    };

    const data: ListTokensResponse = await requestGraphQL<ListTokensResponse>(
      LIST_PUSH_TOKENS,
      { limit: 1000, nextToken: nextToken || undefined },
      { authMode: 'userPools', jwt }
    );

    const items = data.listApsPushTokens?.items ?? [];
    for (const it of items) {
      const t = it?.token ?? null;
      const userId = it?.userId ?? null;
      if (!t || !userId) continue;
      const set = tokensByUser.get(userId) ?? new Set<string>();
      set.add(t);
      tokensByUser.set(userId, set);
    }
    nextToken = data.listApsPushTokens?.nextToken;
  } while (nextToken);

  // Compute badge per user and apply to all their tokens.
  const messages: Array<Record<string, unknown>> = [];
  for (const [userId, tokenSet] of tokensByUser.entries()) {
    const [unreadAnnouncements, unreadMessages, unreadRequests] =
      await Promise.all([
        computeUnreadAnnouncements({ eventId, userId, jwt }),
        computeUnreadMessages({ eventId, userId, jwt }),
        computeUnreadRequests({ eventId, userId, jwt }),
      ]);
    const badge =
      Number(unreadAnnouncements) +
      Number(unreadMessages) +
      Number(unreadRequests);

    for (const to of tokenSet.values()) {
      messages.push({
        to,
        title,
        body: msg.slice(0, 180),
        badge,
        // The app uses this payload to navigate on tap.
        data: { type: 'announcement', announcementId, eventId, deepLink },
      });
    }
  }

  await sendExpo(messages);

  return NextResponse.json({
    ok: true,
    users: tokensByUser.size,
    tokens: messages.length,
    sent: messages.length,
  });
}
