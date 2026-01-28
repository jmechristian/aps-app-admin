import { NextResponse } from 'next/server';
import { requestGraphQL } from '@/lib/appsync';

type PushTokenItem = { token?: string | null };
type DmParticipantStateItem = { unreadCount?: number | null };
type ContactRequestItem = {
  owners?: Array<string | null> | null;
  requestedByUserId?: string | null;
};

const PUSH_TOKENS_BY_USER = /* GraphQL */ `
  query ApsPushTokensByUserIdAndUpdatedAt(
    $userId: ID!
    $limit: Int
    $nextToken: String
  ) {
    apsPushTokensByUserIdAndUpdatedAt(
      userId: $userId
      sortDirection: DESC
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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

async function sendExpo(messages: Array<Record<string, unknown>>) {
  if (!messages.length) return;

  const url = process.env.EXPO_PUSH_URL || 'https://exp.host/--/api/v2/push/send';
  const token = process.env.EXPO_ACCESS_TOKEN;

  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

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
      throw new Error(`Expo push failed: ${res.status} ${res.statusText} ${text}`);
    }
  }
}

async function listTokensForUser({
  userId,
  jwt,
}: {
  userId: string;
  jwt: string;
}): Promise<string[]> {
  let nextToken: string | null | undefined = null;
  const tokens: string[] = [];

  do {
    type Resp = {
      apsPushTokensByUserIdAndUpdatedAt?: {
        items?: PushTokenItem[];
        nextToken?: string | null;
      } | null;
    };
    const data: Resp = await requestGraphQL<Resp>(
      PUSH_TOKENS_BY_USER,
      { userId, limit: 1000, nextToken: nextToken || undefined },
      { authMode: 'userPools', jwt }
    );
    const items = data.apsPushTokensByUserIdAndUpdatedAt?.items ?? [];
    for (const it of items) {
      const t = it?.token;
      if (t) tokens.push(t);
    }
    nextToken = data.apsPushTokensByUserIdAndUpdatedAt?.nextToken;
  } while (nextToken);

  return tokens;
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

export async function POST(req: Request) {
  const auth = req.headers.get('authorization') || req.headers.get('Authorization');
  const jwt = auth?.startsWith('Bearer ') ? auth.slice('Bearer '.length) : auth;
  if (!jwt) {
    return NextResponse.json({ error: 'Missing Authorization JWT' }, { status: 401 });
  }

  const payload = decodeJwtPayload(jwt);
  const groups = (payload?.['cognito:groups'] as string[] | undefined) ?? [];
  if (!groups.includes('Admin')) {
    return NextResponse.json({ error: 'Admin group required' }, { status: 403 });
  }

  const body = (await req.json().catch(() => null)) as
    | {
        eventId?: string;
        recipientUserId?: string;
        threadId?: string | null;
        title?: string;
        body?: string;
      }
    | null;

  const eventId = body?.eventId?.trim();
  const recipientUserId = body?.recipientUserId?.trim();
  const threadId = body?.threadId?.trim() || null;
  const title = body?.title?.trim() || 'New message';
  const msg = body?.body?.trim() || 'You have a new message';

  if (!eventId) return NextResponse.json({ error: 'Missing eventId' }, { status: 400 });
  if (!recipientUserId)
    return NextResponse.json({ error: 'Missing recipientUserId' }, { status: 400 });

  const [unreadAnnouncements, unreadMessages, unreadRequests, tokens] =
    await Promise.all([
      computeUnreadAnnouncements({ eventId, userId: recipientUserId, jwt }),
      computeUnreadMessages({ eventId, userId: recipientUserId, jwt }),
      computeUnreadRequests({ eventId, userId: recipientUserId, jwt }),
      listTokensForUser({ userId: recipientUserId, jwt }),
    ]);

  const badge = unreadAnnouncements + unreadMessages + unreadRequests;

  const messages = tokens.map((to) => ({
    to,
    title,
    body: msg.slice(0, 180),
    badge,
    data: { type: 'dm', eventId, threadId },
  }));

  await sendExpo(messages);
  return NextResponse.json({ ok: true, sent: messages.length, badge });
}


