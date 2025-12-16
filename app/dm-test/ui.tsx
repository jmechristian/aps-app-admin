'use client';

import { useEffect, useMemo, useState } from 'react';
import { graphqlClient as client } from '@/src/amplify-client';

type APS = { id: string; year: string };
type Registrant = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  appUserId?: string | null; // Cognito sub
};

type Thread = {
  id: string;
  dmKey: string;
  userAId: string;
  userBId: string;
  lastMessageAt?: string | null;
  lastMessagePreview?: string | null;
};

type Message = {
  id: string;
  threadId: string;
  senderUserId: string;
  body?: string | null;
  createdAt: string;
};

function dmKeyFor(a: string, b: string) {
  const [x, y] = [a, b].sort();
  return `u:${x}|u:${y}`;
}

const LIST_APS = /* GraphQL */ `
  query ListAPS($limit: Int) {
    listAPS(limit: $limit) {
      items {
        id
        year
      }
    }
  }
`;

const LIST_REGISTRANTS_BY_EVENT = /* GraphQL */ `
  query ListApsRegistrants($filter: ModelApsRegistrantFilterInput, $limit: Int) {
    listApsRegistrants(filter: $filter, limit: $limit) {
      items {
        id
        firstName
        lastName
        email
        appUserId
      }
    }
  }
`;

const THREAD_BY_DM_KEY = /* GraphQL */ `
  query ApsDmThreadsByDmKey($dmKey: String!, $limit: Int) {
    apsDmThreadsByDmKey(dmKey: $dmKey, limit: $limit) {
      items {
        id
        dmKey
        userAId
        userBId
        lastMessageAt
        lastMessagePreview
      }
    }
  }
`;

const CREATE_THREAD = /* GraphQL */ `
  mutation CreateApsDmThread($input: CreateApsDmThreadInput!) {
    createApsDmThread(input: $input) {
      id
      dmKey
      userAId
      userBId
    }
  }
`;

const CREATE_PARTICIPANT_STATE = /* GraphQL */ `
  mutation CreateApsDmParticipantState($input: CreateApsDmParticipantStateInput!) {
    createApsDmParticipantState(input: $input) {
      id
      userId
      threadId
      unreadCount
      lastReadAt
      lastMessageAt
    }
  }
`;

const STATE_BY_THREAD_AND_USER = /* GraphQL */ `
  query ApsDmParticipantStatesByThreadIdAndUserId(
    $threadId: ID!
    $userId: ModelIDKeyConditionInput
    $limit: Int
  ) {
    apsDmParticipantStatesByThreadIdAndUserId(
      threadId: $threadId
      userId: $userId
      limit: $limit
    ) {
      items {
        id
        userId
        unreadCount
        lastReadAt
        lastMessageAt
      }
    }
  }
`;

const UPDATE_STATE = /* GraphQL */ `
  mutation UpdateApsDmParticipantState($input: UpdateApsDmParticipantStateInput!) {
    updateApsDmParticipantState(input: $input) {
      id
      userId
      unreadCount
      lastReadAt
      lastMessageAt
    }
  }
`;

const CREATE_MESSAGE = /* GraphQL */ `
  mutation CreateApsDmMessage($input: CreateApsDmMessageInput!) {
    createApsDmMessage(input: $input) {
      id
      threadId
      senderUserId
      body
      createdAt
    }
  }
`;

const UPDATE_THREAD = /* GraphQL */ `
  mutation UpdateApsDmThread($input: UpdateApsDmThreadInput!) {
    updateApsDmThread(input: $input) {
      id
      lastMessageAt
      lastMessagePreview
    }
  }
`;

const LIST_MESSAGES = /* GraphQL */ `
  query ApsDmMessagesByThreadIdAndCreatedAt(
    $threadId: ID!
    $createdAt: ModelStringKeyConditionInput
    $limit: Int
    $sortDirection: ModelSortDirection
  ) {
    apsDmMessagesByThreadIdAndCreatedAt(
      threadId: $threadId
      createdAt: $createdAt
      sortDirection: $sortDirection
      limit: $limit
    ) {
      items {
        id
        threadId
        senderUserId
        body
        createdAt
      }
    }
  }
`;

export default function DmTestClient() {
  const [events, setEvents] = useState<APS[]>([]);
  const [eventId, setEventId] = useState('');
  const [registrants, setRegistrants] = useState<Registrant[]>([]);

  const [userA, setUserA] = useState<string>('');
  const [userB, setUserB] = useState<string>('');

  const [thread, setThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [sender, setSender] = useState<'A' | 'B'>('A');
  const [body, setBody] = useState('');

  const userAName = useMemo(() => {
    const r = registrants.find((x) => x.appUserId === userA);
    return r ? `${r.firstName ?? ''} ${r.lastName ?? ''}`.trim() || r.email : '';
  }, [registrants, userA]);

  const userBName = useMemo(() => {
    const r = registrants.find((x) => x.appUserId === userB);
    return r ? `${r.firstName ?? ''} ${r.lastName ?? ''}`.trim() || r.email : '';
  }, [registrants, userB]);

  useEffect(() => {
    let cancelled = false;
    async function loadEvents() {
      try {
        const res = await client.graphql({
          query: LIST_APS,
          variables: { limit: 50 },
          authMode: 'apiKey',
        });
        const data = (res as any).data;
        const items = (data?.listAPS?.items ?? []).filter(Boolean);
        const ev: APS[] = items
          .map((x: any) => ({ id: x.id, year: x.year }))
          .sort((a: APS, b: APS) => Number(b.year) - Number(a.year));
        if (!cancelled) {
          setEvents(ev);
          if (!eventId && ev.length) {
            const preferred = ev.find((e) => e.year === '2026') ?? ev[0];
            setEventId(preferred.id);
          }
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load events');
      }
    }
    void loadEvents();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!eventId) return;
    let cancelled = false;

    async function loadRegistrants() {
      setLoading(true);
      setError(null);
      setThread(null);
      setMessages([]);
      try {
        const res = await client.graphql({
          query: LIST_REGISTRANTS_BY_EVENT,
          variables: { filter: { apsID: { eq: eventId } }, limit: 2000 },
          authMode: 'apiKey',
        });
        const data = (res as any).data;
        const items: Registrant[] = (data?.listApsRegistrants?.items ?? [])
          .filter(Boolean)
          .filter((r: any) => r.appUserId);

        if (!cancelled) {
          setRegistrants(items);
          // auto-select first two users for convenience
          if (!userA && items[0]?.appUserId) setUserA(items[0].appUserId!);
          if (!userB && items[1]?.appUserId) setUserB(items[1].appUserId!);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load registrants');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadRegistrants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  async function loadThreadAndMessages(threadId: string) {
    const res = await client.graphql({
      query: LIST_MESSAGES,
      variables: {
        threadId,
        sortDirection: 'DESC',
        limit: 30,
      },
      authMode: 'userPool',
    });
    const data = (res as any).data;
    const items: Message[] = (data?.apsDmMessagesByThreadIdAndCreatedAt?.items ?? []).filter(Boolean);
    setMessages(items);
  }

  async function ensureThread() {
    if (!eventId) throw new Error('Pick an event');
    if (!userA || !userB) throw new Error('Pick two users');
    if (userA === userB) throw new Error('Users must be different');

    const key = dmKeyFor(userA, userB);
    const [a, b] = [userA, userB].sort();

    const existing = await client.graphql({
      query: THREAD_BY_DM_KEY,
      variables: { dmKey: key, limit: 1 },
      authMode: 'userPool',
    });
    const existingItems = (existing as any).data?.apsDmThreadsByDmKey?.items ?? [];
    const t = existingItems?.[0] as Thread | undefined;

    if (t?.id) {
      setThread(t);
      await loadThreadAndMessages(t.id);
      return t.id;
    }

    const created = await client.graphql({
      query: CREATE_THREAD,
      variables: {
        input: {
          eventId,
          dmKey: key,
          userAId: a,
          userBId: b,
          owners: [a, b],
        },
      },
      authMode: 'userPool',
    });
    const newThread = (created as any).data?.createApsDmThread as Thread | undefined;
    if (!newThread?.id) throw new Error('Failed to create thread');

    // Create participant states for inbox/unread tracking
    const now = new Date().toISOString();
    await Promise.all([
      client.graphql({
        query: CREATE_PARTICIPANT_STATE,
        variables: { input: { eventId, threadId: newThread.id, userId: a, unreadCount: 0, lastReadAt: now, lastMessageAt: now } },
        authMode: 'userPool',
      }),
      client.graphql({
        query: CREATE_PARTICIPANT_STATE,
        variables: { input: { eventId, threadId: newThread.id, userId: b, unreadCount: 0, lastReadAt: now, lastMessageAt: now } },
        authMode: 'userPool',
      }),
    ]);

    setThread({ ...newThread, lastMessageAt: now, lastMessagePreview: null });
    setMessages([]);
    return newThread.id;
  }

  async function sendMessage() {
    const threadId = thread?.id ?? (await ensureThread());

    const a = userA;
    const b = userB;
    const senderUserId = sender === 'A' ? a : b;
    const recipientUserId = sender === 'A' ? b : a;
    const now = new Date().toISOString();
    const msgBody = body.trim();
    if (!msgBody) throw new Error('Message body required');

    const created = await client.graphql({
      query: CREATE_MESSAGE,
      variables: {
        input: {
          eventId,
          threadId,
          senderUserId,
          owners: [a, b],
          type: 'text',
          body: msgBody,
        },
      },
      authMode: 'userPool',
    });
    const msg = (created as any).data?.createApsDmMessage as Message | undefined;
    if (!msg?.id) throw new Error('Failed to create message');

    await client.graphql({
      query: UPDATE_THREAD,
      variables: {
        input: {
          id: threadId,
          lastMessageAt: now,
          lastMessagePreview: msgBody.slice(0, 120),
        },
      },
      authMode: 'userPool',
    });

    // Update participant states (simple unread logic)
    const [senderStateRes, recipientStateRes] = await Promise.all([
      client.graphql({
        query: STATE_BY_THREAD_AND_USER,
        variables: { threadId, userId: { eq: senderUserId }, limit: 1 },
        authMode: 'userPool',
      }),
      client.graphql({
        query: STATE_BY_THREAD_AND_USER,
        variables: { threadId, userId: { eq: recipientUserId }, limit: 1 },
        authMode: 'userPool',
      }),
    ]);
    const senderState = (senderStateRes as any).data?.apsDmParticipantStatesByThreadIdAndUserId?.items?.[0];
    const recipientState = (recipientStateRes as any).data?.apsDmParticipantStatesByThreadIdAndUserId?.items?.[0];

    await Promise.all([
      senderState?.id
        ? client.graphql({
            query: UPDATE_STATE,
            variables: {
              input: {
                id: senderState.id,
                unreadCount: 0,
                lastReadAt: now,
                lastMessageAt: now,
              },
            },
            authMode: 'userPool',
          })
        : Promise.resolve(),
      recipientState?.id
        ? client.graphql({
            query: UPDATE_STATE,
            variables: {
              input: {
                id: recipientState.id,
                unreadCount: (recipientState.unreadCount ?? 0) + 1,
                lastMessageAt: now,
              },
            },
            authMode: 'userPool',
          })
        : Promise.resolve(),
    ]);

    setBody('');
    await loadThreadAndMessages(threadId);
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Admin
          </p>
          <h1 className="text-4xl font-bold text-slate-900">DM Test</h1>
          <p className="text-slate-600">
            Create a thread + send messages between two users (as Admin) to verify
            schema/auth and realtime behavior.
          </p>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold text-slate-900">Setup</div>
            <select
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
            >
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.year} ({e.id.slice(0, 6)}…)
                </option>
              ))}
            </select>
          </div>

          {error ? (
            <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">User A</span>
              <select
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                value={userA}
                onChange={(e) => setUserA(e.target.value)}
                disabled={loading}
              >
                {registrants.map((r) => (
                  <option key={r.id} value={r.appUserId ?? ''}>
                    {(r.firstName || r.lastName)
                      ? `${r.firstName ?? ''} ${r.lastName ?? ''}`.trim()
                      : r.email}{' '}
                    · {String(r.appUserId).slice(0, 10)}…
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">User B</span>
              <select
                className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
                value={userB}
                onChange={(e) => setUserB(e.target.value)}
                disabled={loading}
              >
                {registrants.map((r) => (
                  <option key={r.id} value={r.appUserId ?? ''}>
                    {(r.firstName || r.lastName)
                      ? `${r.firstName ?? ''} ${r.lastName ?? ''}`.trim()
                      : r.email}{' '}
                    · {String(r.appUserId).slice(0, 10)}…
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50 disabled:opacity-60"
              disabled={sending || !userA || !userB}
              onClick={async () => {
                setSending(true);
                setError(null);
                try {
                  const id = await ensureThread();
                  await loadThreadAndMessages(id);
                } catch (e) {
                  setError(e instanceof Error ? e.message : 'Failed to ensure thread');
                } finally {
                  setSending(false);
                }
              }}
            >
              Ensure thread
            </button>

            <div className="text-sm text-slate-600">
              {thread ? (
                <>
                  Thread: <span className="font-mono">{thread.id}</span> ({thread.dmKey})
                </>
              ) : (
                'No thread yet'
              )}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-slate-900">Send message</div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <select
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              value={sender}
              onChange={(e) => setSender(e.target.value as any)}
            >
              <option value="A">Send as A ({userAName || 'User A'})</option>
              <option value="B">Send as B ({userBName || 'User B'})</option>
            </select>
            <input
              className="min-w-[240px] flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Type a message..."
            />
            <button
              type="button"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
              disabled={sending || !userA || !userB}
              onClick={async () => {
                setSending(true);
                setError(null);
                try {
                  await sendMessage();
                } catch (e) {
                  setError(e instanceof Error ? e.message : 'Send failed');
                } finally {
                  setSending(false);
                }
              }}
            >
              Send
            </button>
          </div>

          {messages.length ? (
            <div className="mt-6 rounded-2xl border border-slate-200">
              <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600">
                Latest 30 messages (DESC)
              </div>
              <ul className="divide-y divide-slate-100">
                {messages.map((m) => (
                  <li key={m.id} className="px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-xs font-semibold text-slate-700">
                        {m.senderUserId === userA ? 'A' : m.senderUserId === userB ? 'B' : 'Other'} ·{' '}
                        <span className="font-mono">{m.senderUserId.slice(0, 10)}…</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(m.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="mt-1 whitespace-pre-wrap text-sm text-slate-900">
                      {m.body}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-6 text-sm text-slate-600">No messages yet.</div>
          )}
        </section>
      </main>
    </div>
  );
}


