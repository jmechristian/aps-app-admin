type GraphQLError = { message: string };

const OLD_ENDPOINT =
  process.env.OLD_APPSYNC_GRAPHQL_ENDPOINT ??
  process.env.NEXT_PUBLIC_OLD_APPSYNC_GRAPHQL_ENDPOINT;
const OLD_API_KEY =
  process.env.OLD_APPSYNC_API_KEY ?? process.env.NEXT_PUBLIC_OLD_APPSYNC_API_KEY;

/**
 * Client for the old Amplify AppSync API
 * Used for migrating data from the old system
 */
export async function requestOldGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!OLD_ENDPOINT || !OLD_API_KEY) {
    throw new Error('Missing old AppSync configuration');
  }

  const res = await fetch(OLD_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': OLD_API_KEY,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  const json = (await res.json()) as {
    data?: T;
    errors?: GraphQLError[];
  };

  if (!res.ok) {
    throw new Error(`Old AppSync request failed: ${res.statusText}`);
  }

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(', '));
  }

  if (!json.data) {
    throw new Error('No data returned from old AppSync');
  }

  return json.data;
}

