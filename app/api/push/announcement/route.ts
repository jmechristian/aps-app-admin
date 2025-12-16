import { NextResponse } from 'next/server';
import { requestGraphQL } from '@/lib/appsync';

type PushTokenItem = { id: string; token?: string | null; userId?: string | null };

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
      throw new Error(`Expo push failed: ${res.status} ${res.statusText} ${text}`);
    }
  }
}

export async function POST(req: Request) {
  const auth = req.headers.get('authorization') || req.headers.get('Authorization');
  const jwt = auth?.startsWith('Bearer ') ? auth.slice('Bearer '.length) : auth;
  if (!jwt) {
    return NextResponse.json({ error: 'Missing Authorization JWT' }, { status: 401 });
  }

  // Lightweight group gate (real enforcement happens via AppSync when listing push tokens)
  const payload = decodeJwtPayload(jwt);
  const groups = (payload?.['cognito:groups'] as string[] | undefined) ?? [];
  if (!groups.includes('Admin')) {
    return NextResponse.json({ error: 'Admin group required' }, { status: 403 });
  }

  const body = (await req.json().catch(() => null)) as
    | { title?: string; body?: string; deepLink?: string | null }
    | null;
  const title = body?.title?.trim() || 'New announcement';
  const msg = body?.body?.trim();
  const deepLink = body?.deepLink ?? null;

  if (!msg) {
    return NextResponse.json({ error: 'Missing announcement body' }, { status: 400 });
  }

  // List all tokens via AppSync (Admin group is authorized by schema)
  let nextToken: string | null | undefined = null;
  const tokens: string[] = [];

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
      const t = it?.token;
      if (t) tokens.push(t);
    }
    nextToken = data.listApsPushTokens?.nextToken;
  } while (nextToken);

  const messages = tokens.map((to) => ({
    to,
    title,
    body: msg.slice(0, 180),
    data: { type: 'announcement', deepLink },
  }));

  await sendExpo(messages);

  return NextResponse.json({ ok: true, tokens: tokens.length, sent: messages.length });
}


