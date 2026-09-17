'use server';

import {
  ListUsersCommand,
  CognitoIdentityProviderClient,
  type UserType,
} from '@aws-sdk/client-cognito-identity-provider';
import { requestGraphQL } from '@/lib/appsync';

export type ReportingEvent = {
  id: string;
  year: string;
};

export type ReportingPerson = {
  userId: string | null;
  registrantId: string | null;
  name: string;
  email: string | null;
  company: string | null;
  attendeeType: string | null;
};

export type ContactRequestRow = {
  id: string;
  eventId: string;
  eventYear: string | null;
  from: ReportingPerson;
  to: ReportingPerson;
  status: string;
  createdAt: string;
  resolvedAt: string | null;
};

export type LoginRow = {
  registrantId: string;
  userId: string | null;
  name: string;
  email: string;
  company: string | null;
  attendeeType: string;
  registrantStatus: string;
  hasAccount: boolean;
  hasLoggedIn: boolean;
  cognitoStatus: string | null;
  nativeApp: boolean;
  nativePlatform: string | null;
  accountUpdatedAt: string | null;
};

export type ReportingDashboard = {
  events: ReportingEvent[];
  selectedEventId: string;
  selectedEventYear: string;
  contactRequests: ContactRequestRow[];
  logins: LoginRow[];
  cognitoError: string | null;
};

type GraphQLPerson = {
  id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  attendeeType?: string | null;
  company?: { name?: string | null } | null;
};

type RegistrantItem = GraphQLPerson & {
  status?: string | null;
  appUser?: { id?: string | null } | null;
};

type ContactRequestItem = {
  id?: string | null;
  eventId?: string | null;
  userAId?: string | null;
  userBId?: string | null;
  requestedByUserId?: string | null;
  status?: string | null;
  acceptedAt?: string | null;
  declinedAt?: string | null;
  blockedAt?: string | null;
  createdAt?: string | null;
};

type AppUserParty = {
  id?: string | null;
  registrantId?: string | null;
  registrant?: GraphQLPerson | null;
  profile?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    company?: string | null;
    attendeeType?: string | null;
  } | null;
};

type PushTokenItem = {
  userId?: string | null;
  platform?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
};

const LIST_APS = /* GraphQL */ `
  query ListAPS($limit: Int, $nextToken: String) {
    listAPS(limit: $limit, nextToken: $nextToken) {
      items {
        id
        year
      }
      nextToken
    }
  }
`;

const REGISTRANTS_BY_EVENT = /* GraphQL */ `
  query ReportingRegistrantsByEvent(
    $apsID: ID!
    $limit: Int
    $nextToken: String
  ) {
    apsRegistrantsByApsID(apsID: $apsID, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        status
        company {
          name
        }
        appUser {
          id
        }
      }
      nextToken
    }
  }
`;

const LIST_CONTACT_REQUESTS = /* GraphQL */ `
  query ReportingListContactRequests($limit: Int, $nextToken: String) {
    listApsContactRequests(limit: $limit, nextToken: $nextToken) {
      items {
        id
        eventId
        userAId
        userBId
        requestedByUserId
        status
        acceptedAt
        declinedAt
        blockedAt
        createdAt
      }
      nextToken
    }
  }
`;

const GET_APP_USER_PARTY = /* GraphQL */ `
  query ReportingGetAppUserParty($id: ID!) {
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

const LIST_PUSH_TOKENS = /* GraphQL */ `
  query ReportingListPushTokens($limit: Int, $nextToken: String) {
    listApsPushTokens(limit: $limit, nextToken: $nextToken) {
      items {
        userId
        platform
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;

function displayName(
  firstName?: string | null,
  lastName?: string | null,
  email?: string | null,
  fallback = 'Unknown attendee',
) {
  const name = `${firstName ?? ''} ${lastName ?? ''}`.trim();
  return name || email || fallback;
}

function personFromRegistrant(
  registrant: RegistrantItem,
  userId: string | null,
): ReportingPerson {
  return {
    userId,
    registrantId: registrant.id ?? null,
    name: displayName(registrant.firstName, registrant.lastName, registrant.email),
    email: registrant.email ?? null,
    company: registrant.company?.name ?? null,
    attendeeType: registrant.attendeeType ?? null,
  };
}

function personFromAppUser(user: AppUserParty | null | undefined): ReportingPerson {
  const registrant = user?.registrant;
  const profile = user?.profile;
  return {
    userId: user?.id ?? null,
    registrantId: user?.registrantId ?? registrant?.id ?? null,
    name: displayName(
      registrant?.firstName ?? profile?.firstName,
      registrant?.lastName ?? profile?.lastName,
      registrant?.email ?? profile?.email,
      user?.id ? `User ${user.id.slice(0, 8)}` : 'Unknown attendee',
    ),
    email: registrant?.email ?? profile?.email ?? null,
    company: registrant?.company?.name ?? profile?.company ?? null,
    attendeeType: registrant?.attendeeType ?? profile?.attendeeType ?? null,
  };
}

function unknownPerson(userId: string | null): ReportingPerson {
  return {
    userId,
    registrantId: null,
    name: userId ? `User ${userId.slice(0, 8)}` : 'Unknown attendee',
    email: null,
    company: null,
    attendeeType: null,
  };
}

function hasLoggedInOnce(status?: string | null) {
  return (
    status === 'CONFIRMED' ||
    status === 'RESET_REQUIRED' ||
    status === 'COMPROMISED'
  );
}

function attr(user: UserType, name: string) {
  return user.Attributes?.find((item) => item.Name === name)?.Value ?? null;
}

function cognitoClient() {
  const region =
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION ||
    process.env.NEXT_PUBLIC_AWS_REGION;
  const userPoolId =
    process.env.AWS_USER_POOLS_ID || process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID;

  if (!userPoolId) {
    throw new Error('Missing Cognito user pool id (AWS_USER_POOLS_ID)');
  }
  if (!region) {
    throw new Error('Missing AWS region (AWS_REGION)');
  }

  return {
    client: new CognitoIdentityProviderClient({ region }),
    userPoolId,
  };
}

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index++;
      results[current] = await fn(items[current]);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, Math.max(items.length, 1)) },
    () => worker(),
  );
  await Promise.all(workers);
  return results;
}

type ListApsResponse = {
  listAPS?: {
    items?: Array<ReportingEvent | null> | null;
    nextToken?: string | null;
  } | null;
};

type RegistrantsByEventResponse = {
  apsRegistrantsByApsID?: {
    items?: Array<RegistrantItem | null> | null;
    nextToken?: string | null;
  } | null;
};

type ContactRequestsResponse = {
  listApsContactRequests?: {
    items?: Array<ContactRequestItem | null> | null;
    nextToken?: string | null;
  } | null;
};

type PushTokensResponse = {
  listApsPushTokens?: {
    items?: Array<PushTokenItem | null> | null;
    nextToken?: string | null;
  } | null;
};

type AppUserPartyResponse = {
  getApsAppUser?: AppUserParty | null;
};

async function fetchEvents(): Promise<ReportingEvent[]> {
  const events: ReportingEvent[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data: ListApsResponse = await requestGraphQL<ListApsResponse>(
      LIST_APS,
      { limit: 50, nextToken: nextToken || undefined },
    );

    for (const item of data.listAPS?.items ?? []) {
      if (item?.id && item.year) events.push({ id: item.id, year: item.year });
    }
    nextToken = data.listAPS?.nextToken ?? null;
  } while (nextToken);

  return events.sort((a, b) => b.year.localeCompare(a.year));
}

async function fetchRegistrants(eventId: string): Promise<RegistrantItem[]> {
  const items: RegistrantItem[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data: RegistrantsByEventResponse =
      await requestGraphQL<RegistrantsByEventResponse>(REGISTRANTS_BY_EVENT, {
        apsID: eventId,
        limit: 1000,
        nextToken: nextToken || undefined,
      });

    for (const item of data.apsRegistrantsByApsID?.items ?? []) {
      if (item?.id) items.push(item);
    }
    nextToken = data.apsRegistrantsByApsID?.nextToken ?? null;
    if (nextToken) await new Promise((resolve) => setTimeout(resolve, 40));
  } while (nextToken);

  return items;
}

async function fetchContactRequests(): Promise<ContactRequestItem[]> {
  const items: ContactRequestItem[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data: ContactRequestsResponse =
      await requestGraphQL<ContactRequestsResponse>(LIST_CONTACT_REQUESTS, {
        limit: 1000,
        nextToken: nextToken || undefined,
      });

    for (const item of data.listApsContactRequests?.items ?? []) {
      if (item?.id) items.push(item);
    }
    nextToken = data.listApsContactRequests?.nextToken ?? null;
    if (nextToken) await new Promise((resolve) => setTimeout(resolve, 40));
  } while (nextToken);

  return items;
}

async function fetchPushTokens(): Promise<PushTokenItem[]> {
  const items: PushTokenItem[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data: PushTokensResponse = await requestGraphQL<PushTokensResponse>(
      LIST_PUSH_TOKENS,
      {
        limit: 1000,
        nextToken: nextToken || undefined,
      },
    );

    for (const item of data.listApsPushTokens?.items ?? []) {
      if (item?.userId) items.push(item);
    }
    nextToken = data.listApsPushTokens?.nextToken ?? null;
    if (nextToken) await new Promise((resolve) => setTimeout(resolve, 40));
  } while (nextToken);

  return items;
}

async function fetchCognitoUsers(): Promise<UserType[]> {
  const { client, userPoolId } = cognitoClient();
  const users: UserType[] = [];
  let paginationToken: string | undefined;

  do {
    const result = await client.send(
      new ListUsersCommand({
        UserPoolId: userPoolId,
        Limit: 60,
        PaginationToken: paginationToken,
      }),
    );
    users.push(...(result.Users ?? []));
    paginationToken = result.PaginationToken;
  } while (paginationToken);

  return users;
}

async function resolveMissingPeople(
  userIds: string[],
  known: Map<string, ReportingPerson>,
) {
  const missing = userIds.filter((id) => id && !known.has(id));
  if (missing.length === 0) return;

  await mapPool(missing, 8, async (id) => {
    try {
      const data: AppUserPartyResponse =
        await requestGraphQL<AppUserPartyResponse>(GET_APP_USER_PARTY, { id });
      known.set(id, personFromAppUser(data.getApsAppUser));
    } catch {
      known.set(id, unknownPerson(id));
    }
  });
}

export async function fetchReportingDashboard(
  requestedEventId?: string | null,
): Promise<ReportingDashboard> {
  const events = await fetchEvents();
  if (events.length === 0) {
    return {
      events: [],
      selectedEventId: '',
      selectedEventYear: '',
      contactRequests: [],
      logins: [],
      cognitoError: null,
    };
  }

  const selected =
    events.find((event) => event.id === requestedEventId) ?? events[0];

  const [registrants, allRequests, pushTokens, cognitoResult] =
    await Promise.all([
      fetchRegistrants(selected.id),
      fetchContactRequests(),
      fetchPushTokens().catch(() => [] as PushTokenItem[]),
      fetchCognitoUsers()
        .then((users) => ({ users, error: null as string | null }))
        .catch((error: unknown) => ({
          users: [] as UserType[],
          error:
            error instanceof Error
              ? error.message
              : 'Could not read Cognito login status',
        })),
    ]);

  const peopleByUserId = new Map<string, ReportingPerson>();

  for (const registrant of registrants) {
    const userId = registrant.appUser?.id ?? null;
    const person = personFromRegistrant(registrant, userId);
    if (userId) peopleByUserId.set(userId, person);
  }

  const eventRequests = allRequests.filter(
    (request) => request.eventId === selected.id,
  );
  const requestUserIds = new Set<string>();
  for (const request of eventRequests) {
    if (request.userAId) requestUserIds.add(request.userAId);
    if (request.userBId) requestUserIds.add(request.userBId);
    if (request.requestedByUserId) requestUserIds.add(request.requestedByUserId);
  }
  await resolveMissingPeople([...requestUserIds], peopleByUserId);

  const contactRequests: ContactRequestRow[] = eventRequests
    .map((request) => {
      const requesterId = request.requestedByUserId ?? null;
      const otherId =
        requesterId && request.userAId === requesterId
          ? request.userBId ?? null
          : requesterId && request.userBId === requesterId
            ? request.userAId ?? null
            : request.userBId ?? request.userAId ?? null;

      const resolvedAt =
        request.acceptedAt || request.declinedAt || request.blockedAt || null;

      return {
        id: request.id as string,
        eventId: request.eventId ?? selected.id,
        eventYear: selected.year,
        from: peopleByUserId.get(requesterId ?? '') ?? unknownPerson(requesterId),
        to: peopleByUserId.get(otherId ?? '') ?? unknownPerson(otherId),
        status: (request.status ?? 'PENDING').toUpperCase(),
        createdAt: request.createdAt ?? new Date(0).toISOString(),
        resolvedAt,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const cognitoBySub = new Map<string, UserType>();
  const cognitoByEmail = new Map<string, UserType>();
  for (const user of cognitoResult.users) {
    const sub = attr(user, 'sub');
    const email = attr(user, 'email')?.trim().toLowerCase();
    if (sub) cognitoBySub.set(sub, user);
    if (email) cognitoByEmail.set(email, user);
  }

  const nativeByUserId = new Map<
    string,
    { platform: string | null; at: string | null }
  >();
  for (const token of pushTokens) {
    if (!token.userId) continue;
    const at = token.updatedAt ?? token.createdAt ?? null;
    const existing = nativeByUserId.get(token.userId);
    if (
      !existing ||
      (at && existing.at && new Date(at).getTime() > new Date(existing.at).getTime()) ||
      !existing.at
    ) {
      nativeByUserId.set(token.userId, {
        platform: token.platform ?? null,
        at,
      });
    }
  }

  const logins: LoginRow[] = registrants
    .map((registrant) => {
      const userId = registrant.appUser?.id ?? null;
      const email = (registrant.email ?? '').trim().toLowerCase();
      const cognito =
        (userId ? cognitoBySub.get(userId) : undefined) ??
        (email ? cognitoByEmail.get(email) : undefined);
      const native = userId ? nativeByUserId.get(userId) : undefined;
      const cognitoStatus = cognito?.UserStatus ?? null;
      const loggedIn = hasLoggedInOnce(cognitoStatus) || Boolean(native);

      return {
        registrantId: registrant.id as string,
        userId,
        name: displayName(
          registrant.firstName,
          registrant.lastName,
          registrant.email,
        ),
        email: registrant.email ?? '',
        company: registrant.company?.name ?? null,
        attendeeType: registrant.attendeeType ?? '',
        registrantStatus: registrant.status ?? '',
        hasAccount: Boolean(cognito || userId),
        hasLoggedIn: loggedIn,
        cognitoStatus,
        nativeApp: Boolean(native),
        nativePlatform: native?.platform ?? null,
        accountUpdatedAt: cognito?.UserLastModifiedDate
          ? cognito.UserLastModifiedDate.toISOString()
          : native?.at ?? null,
      };
    })
    .sort((a, b) => {
      if (a.hasLoggedIn !== b.hasLoggedIn) return a.hasLoggedIn ? -1 : 1;
      return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
    });

  return {
    events,
    selectedEventId: selected.id,
    selectedEventYear: selected.year,
    contactRequests,
    logins,
    cognitoError: cognitoResult.error,
  };
}
