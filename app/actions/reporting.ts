'use server';

import {
  AdminGetUserCommand,
  ListUsersCommand,
  CognitoIdentityProviderClient,
  type UserType,
} from '@aws-sdk/client-cognito-identity-provider';
import { unstable_noStore as noStore } from 'next/cache';
import { requestGraphQL } from '@/lib/appsync';
import {
  cognitoStatusHasSignedIn,
  cognitoUserStatus,
} from '@/lib/cognito-login-status';

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

function isKnownAttendee(person: ReportingPerson): boolean {
  if (person.registrantId || person.email) return true;
  const name = person.name?.trim() ?? '';
  if (!name || name === 'Unknown attendee') return false;
  if (/^User [0-9a-f-]{8}/i.test(name)) return false;
  return true;
}

function attr(user: UserType, name: string) {
  return user.Attributes?.find((item) => item.Name === name)?.Value ?? null;
}

type CognitoIndex = {
  bySub: Map<string, UserType>;
  byEmail: Map<string, UserType[]>;
};

function indexCognitoUsers(users: UserType[]): CognitoIndex {
  const bySub = new Map<string, UserType>();
  const byEmail = new Map<string, UserType[]>();

  for (const user of users) {
    const sub = attr(user, 'sub');
    if (sub) bySub.set(sub, user);

    const emails = new Set<string>();
    const email = attr(user, 'email')?.trim().toLowerCase();
    if (email) emails.add(email);
    const username = user.Username?.trim().toLowerCase();
    if (username?.includes('@')) emails.add(username);

    for (const key of emails) {
      const list = byEmail.get(key) ?? [];
      list.push(user);
      byEmail.set(key, list);
    }
  }

  return { bySub, byEmail };
}

function cognitoUsersForRegistrant(
  index: CognitoIndex,
  userId: string | null,
  email: string,
): UserType[] {
  const found = new Map<string, UserType>();
  const add = (user?: UserType) => {
    if (!user) return;
    const key = user.Username || attr(user, 'sub') || '';
    if (!key || found.has(key)) return;
    found.set(key, user);
  };

  if (userId) add(index.bySub.get(userId));
  if (email) {
    for (const user of index.byEmail.get(email) ?? []) add(user);
  }
  return [...found.values()];
}

function loginStateForRegistrant(params: {
  userId: string | null;
  email: string;
  index: CognitoIndex;
  nativeUserIds: Set<string>;
}): {
  cognito: UserType | undefined;
  hasLoggedIn: boolean;
  cognitoStatus: string | null;
} {
  const matches = cognitoUsersForRegistrant(
    params.index,
    params.userId,
    params.email,
  );
  const signedIn = matches.find((user) =>
    cognitoStatusHasSignedIn(cognitoUserStatus(user)),
  );
  const cognito = signedIn ?? matches[0];
  const ids = new Set<string>();
  if (params.userId) ids.add(params.userId);
  for (const user of matches) {
    const sub = attr(user, 'sub');
    if (sub) ids.add(sub);
  }
  const hasNative = [...ids].some((id) => params.nativeUserIds.has(id));

  return {
    cognito,
    hasLoggedIn: Boolean(signedIn) || hasNative,
    cognitoStatus: cognito ? cognitoUserStatus(cognito) : null,
  };
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

function cognitoErrorName(error: unknown): string | null {
  return typeof error === 'object' && error && 'name' in error
    ? String((error as { name?: unknown }).name)
    : null;
}

/**
 * ListUsers is eventually consistent and can keep FORCE_CHANGE_PASSWORD long
 * after AdminGetUser (what the Cognito console shows) is CONFIRMED. Refresh
 * anyone the list still marks as not signed in before we report or email them.
 */
async function refreshStaleCognitoStatuses(
  registrants: RegistrantItem[],
  index: CognitoIndex,
): Promise<void> {
  const emails = new Set<string>();
  for (const registrant of registrants) {
    const email = (registrant.email ?? '').trim().toLowerCase();
    if (!email) continue;
    const login = loginStateForRegistrant({
      userId: registrant.appUser?.id ?? null,
      email,
      index,
      nativeUserIds: new Set(),
    });
    if (!login.cognito || cognitoStatusHasSignedIn(login.cognitoStatus)) continue;
    emails.add(email);
  }
  if (emails.size === 0) return;

  const { client, userPoolId } = cognitoClient();
  await mapPool([...emails], 5, async (email) => {
    try {
      const live = await readLiveCognitoUser(client, userPoolId, email);
      if (!live?.UserStatus) return;
      applyLiveCognitoUser(index, email, live);
    } catch (error) {
      console.error(`Could not refresh Cognito status for ${email}:`, error);
    }
  });
}

async function readLiveCognitoUser(
  client: CognitoIdentityProviderClient,
  userPoolId: string,
  email: string,
): Promise<UserType | null> {
  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const result = await client.send(
        new AdminGetUserCommand({
          UserPoolId: userPoolId,
          Username: email,
        }),
      );
      return {
        Username: result.Username,
        Attributes: result.UserAttributes,
        UserCreateDate: result.UserCreateDate,
        UserLastModifiedDate: result.UserLastModifiedDate,
        Enabled: result.Enabled,
        UserStatus: result.UserStatus,
      };
    } catch (error) {
      const name = cognitoErrorName(error);
      if (name === 'UserNotFoundException') return null;
      if (name === 'TooManyRequestsException' || name === 'ThrottlingException') {
        await new Promise((resolve) => setTimeout(resolve, 250 * (attempt + 1)));
        continue;
      }
      throw error;
    }
  }
  return null;
}

function applyLiveCognitoUser(
  index: CognitoIndex,
  email: string,
  live: UserType,
) {
  const liveSub = attr(live, 'sub');
  const targets = index.byEmail.get(email) ?? [];
  let applied = false;

  for (const user of targets) {
    const sameUser =
      (live.Username && user.Username === live.Username) ||
      (liveSub !== null && attr(user, 'sub') === liveSub);
    if (!sameUser) continue;
    user.UserStatus = live.UserStatus;
    if (live.UserLastModifiedDate) {
      user.UserLastModifiedDate = live.UserLastModifiedDate;
    }
    if (live.Attributes?.length) user.Attributes = live.Attributes;
    if (liveSub) index.bySub.set(liveSub, user);
    applied = true;
  }

  if (applied) return;

  const list = index.byEmail.get(email) ?? [];
  list.unshift(live);
  index.byEmail.set(email, list);
  if (liveSub) index.bySub.set(liveSub, live);
}

/** Registrant ids the reporting dashboard counts as logged in at least once. */
export async function fetchLoggedInRegistrantIds(
  eventId: string,
): Promise<Set<string>> {
  noStore();
  const [registrants, pushTokens, users] = await Promise.all([
    fetchRegistrants(eventId),
    fetchPushTokens().catch(() => [] as PushTokenItem[]),
    fetchCognitoUsers(),
  ]);

  const cognitoIndex = indexCognitoUsers(users);
  await refreshStaleCognitoStatuses(registrants, cognitoIndex);
  const nativeUserIds = new Set<string>();
  for (const token of pushTokens) {
    if (token.userId) nativeUserIds.add(token.userId);
  }

  const loggedIn = new Set<string>();
  for (const registrant of registrants) {
    if (!registrant.id) continue;
    const userId = registrant.appUser?.id ?? null;
    const email = (registrant.email ?? '').trim().toLowerCase();
    const login = loginStateForRegistrant({
      userId,
      email,
      index: cognitoIndex,
      nativeUserIds,
    });
    if (login.hasLoggedIn) loggedIn.add(registrant.id);
  }
  return loggedIn;
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
  noStore();
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
    .filter((row) => isKnownAttendee(row.from) && isKnownAttendee(row.to))
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const cognitoIndex = indexCognitoUsers(cognitoResult.users);
  if (!cognitoResult.error) {
    await refreshStaleCognitoStatuses(registrants, cognitoIndex);
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

  const nativeUserIds = new Set(nativeByUserId.keys());
  const logins: LoginRow[] = registrants
    .map((registrant) => {
      const userId = registrant.appUser?.id ?? null;
      const email = (registrant.email ?? '').trim().toLowerCase();
      const login = loginStateForRegistrant({
        userId,
        email,
        index: cognitoIndex,
        nativeUserIds,
      });
      const cognito = login.cognito;
      const nativeIds = [
        userId,
        cognito ? attr(cognito, 'sub') : null,
      ].filter((id): id is string => Boolean(id));
      const native = nativeIds
        .map((id) => nativeByUserId.get(id))
        .find((item) => item);

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
        hasLoggedIn: login.hasLoggedIn,
        cognitoStatus: login.cognitoStatus,
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
