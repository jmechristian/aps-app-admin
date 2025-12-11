type GraphQLError = { message: string };

const endpoint =
  process.env.AWS_APPSYNC_GRAPHQL_ENDPOINT ||
  process.env.NEXT_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT;

const apiKey =
  process.env.AWS_APPSYNC_API_KEY ||
  process.env.NEXT_PUBLIC_AWS_APPSYNC_API_KEY;

/**
 * Small helper to talk to the AppSync API using the generated endpoint + API key.
 * Kept server-side only by importing it from server components/actions.
 */
export async function requestGraphQL<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!endpoint || !apiKey) {
    throw new Error("Missing AppSync configuration");
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  const json = (await res.json()) as {
    data?: T;
    errors?: GraphQLError[];
  };

  if (!res.ok) {
    throw new Error(`AppSync request failed: ${res.statusText}`);
  }

  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }

  if (!json.data) {
    throw new Error("No data returned from AppSync");
  }

  return json.data;
}

