import { requestGraphQL } from '@/lib/appsync';

function escapeCsv(value: string): string {
  if (value.includes('"')) {
    value = value.replaceAll('"', '""');
  }
  if (/[",\n\r]/.test(value)) {
    return `"${value}"`;
  }
  return value;
}

function text(value: string | null | undefined): string {
  return value?.trim() ?? '';
}

type ContactUser = {
  profile?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
    company?: string | null;
    jobTitle?: string | null;
  } | null;
  registrant?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
    jobTitle?: string | null;
    company?: { name?: string | null } | null;
  } | null;
};

type ContactRequestItem = {
  userAId?: string | null;
  userBId?: string | null;
  status?: string | null;
  eventId?: string | null;
};

const GET_REGISTRANT_APP_USER = /* GraphQL */ `
  query GetRegistrantAppUser($id: ID!) {
    getApsRegistrant(id: $id) {
      id
      apsID
      firstName
      lastName
      appUser {
        id
      }
    }
  }
`;

const REQUESTS_BY_USER_A = /* GraphQL */ `
  query AcceptedRequestsByUserA(
    $userAId: ID!
    $eventId: ID!
    $limit: Int
    $nextToken: String
  ) {
    apsContactRequestsByUserAIdAndCreatedAt(
      userAId: $userAId
      filter: { status: { eq: "ACCEPTED" }, eventId: { eq: $eventId } }
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userAId
        userBId
        status
        eventId
      }
      nextToken
    }
  }
`;

const REQUESTS_BY_USER_B = /* GraphQL */ `
  query AcceptedRequestsByUserB(
    $userBId: ID!
    $eventId: ID!
    $limit: Int
    $nextToken: String
  ) {
    apsContactRequestsByUserBIdAndCreatedAt(
      userBId: $userBId
      filter: { status: { eq: "ACCEPTED" }, eventId: { eq: $eventId } }
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        userAId
        userBId
        status
        eventId
      }
      nextToken
    }
  }
`;

const GET_CONTACT_USER = /* GraphQL */ `
  query GetContactUser($id: ID!) {
    getApsAppUser(id: $id) {
      profile {
        firstName
        lastName
        email
        phone
        company
        jobTitle
      }
      registrant {
        firstName
        lastName
        email
        phone
        jobTitle
        company {
          name
        }
      }
    }
  }
`;

async function listAcceptedRequests(
  query: string,
  connectionName:
    | 'apsContactRequestsByUserAIdAndCreatedAt'
    | 'apsContactRequestsByUserBIdAndCreatedAt',
  variables: { userAId?: string; userBId?: string; eventId: string },
): Promise<ContactRequestItem[]> {
  const items: ContactRequestItem[] = [];
  let nextToken: string | null | undefined = null;
  do {
    const page = await requestGraphQL<{
      [key: string]: {
        items?: Array<ContactRequestItem | null> | null;
        nextToken?: string | null;
      } | null;
    }>(
      query,
      { ...variables, limit: 200, nextToken: nextToken || undefined },
      { authMode: 'userPools' },
    );
    const connection = page[connectionName];
    for (const item of connection?.items ?? []) {
      if (item) items.push(item);
    }
    nextToken = connection?.nextToken ?? null;
  } while (nextToken);
  return items;
}

export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string; registrantId: string }> },
) {
  const { id: eventId, registrantId } = await context.params;

  const registrantResponse = await requestGraphQL<{
    getApsRegistrant?: {
      id: string;
      apsID: string;
      firstName?: string | null;
      lastName?: string | null;
      appUser?: { id: string } | null;
    } | null;
  }>(GET_REGISTRANT_APP_USER, { id: registrantId }, { authMode: 'apiKey' });

  const registrant = registrantResponse.getApsRegistrant;
  if (!registrant || registrant.apsID !== eventId) {
    return new Response('Registrant not found', { status: 404 });
  }

  const userId = registrant.appUser?.id;
  const otherUserIds = new Set<string>();
  if (userId) {
    const [asUserA, asUserB] = await Promise.all([
      listAcceptedRequests(REQUESTS_BY_USER_A, 'apsContactRequestsByUserAIdAndCreatedAt', {
        userAId: userId,
        eventId,
      }),
      listAcceptedRequests(REQUESTS_BY_USER_B, 'apsContactRequestsByUserBIdAndCreatedAt', {
        userBId: userId,
        eventId,
      }),
    ]);

    for (const request of [...asUserA, ...asUserB]) {
      if ((request.status ?? '').toUpperCase() !== 'ACCEPTED') continue;
      if (request.eventId && request.eventId !== eventId) continue;
      const otherId =
        request.userAId === userId ? request.userBId : request.userAId;
      if (otherId && otherId !== userId) otherUserIds.add(otherId);
    }
  }

  const contacts: ContactUser[] = [];
  const ids = [...otherUserIds];
  for (let index = 0; index < ids.length; index += 20) {
    const chunk = ids.slice(index, index + 20);
    const loaded = await Promise.all(
      chunk.map(async (id) => {
        const response = await requestGraphQL<{
          getApsAppUser?: ContactUser | null;
        }>(GET_CONTACT_USER, { id }, { authMode: 'apiKey' });
        return response.getApsAppUser ?? null;
      }),
    );
    for (const contact of loaded) {
      if (contact) contacts.push(contact);
    }
  }

  const rows = contacts
    .map((contact) => {
      const profile = contact.profile;
      const person = contact.registrant;
      const name = text(
        `${text(profile?.firstName) || text(person?.firstName)} ${text(profile?.lastName) || text(person?.lastName)}`,
      );
      return {
        name,
        email: text(profile?.email) || text(person?.email),
        phone: text(profile?.phone) || text(person?.phone),
        company: text(profile?.company) || text(person?.company?.name),
        title: text(profile?.jobTitle) || text(person?.jobTitle),
      };
    })
    .sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
    );

  const header = ['Name', 'Email', 'Phone', 'Company', 'Title'].join(',');
  const body = rows
    .map((row) =>
      [row.name, row.email, row.phone, row.company, row.title]
        .map((value) => escapeCsv(value))
        .join(','),
    )
    .join('\n');
  const csv = [header, body].filter(Boolean).join('\n');

  const fullName =
    `${registrant.firstName ?? ''} ${registrant.lastName ?? ''}`.trim();
  const slug = (fullName || registrant.id)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const filename = `${slug || 'registrant'}-contacts.csv`;

  return new Response(csv, {
    status: 200,
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': `attachment; filename="${filename}"`,
      'cache-control': 'no-store',
    },
  });
}
