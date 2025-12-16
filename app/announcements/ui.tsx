'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { graphqlClient as client } from '@/src/amplify-client';

type APS = { id: string; year: string };
type Announcement = {
  id: string;
  eventId: string;
  title?: string | null;
  body: string;
  deepLink?: string | null;
  createdAt: string;
};

function getGraphQLData<T>(res: unknown): T {
  // Amplify's client.graphql() is typed as a union that includes subscription results,
  // but for string queries/mutations we expect a GraphQLResult with a `data` field.
  const data = (res as { data?: T }).data;
  if (!data) throw new Error('No data returned from GraphQL');
  return data;
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

const LIST_ANNOUNCEMENTS = /* GraphQL */ `
  query ListApsAdminAnnouncements(
    $filter: ModelApsAdminAnnouncementFilterInput
    $limit: Int
  ) {
    listApsAdminAnnouncements(filter: $filter, limit: $limit) {
      items {
        id
        eventId
        title
        body
        deepLink
        createdAt
      }
    }
  }
`;

const CREATE_ANNOUNCEMENT = /* GraphQL */ `
  mutation CreateApsAdminAnnouncement($input: CreateApsAdminAnnouncementInput!) {
    createApsAdminAnnouncement(input: $input) {
      id
      eventId
      title
      body
      deepLink
      createdAt
    }
  }
`;

const DELETE_ANNOUNCEMENT = /* GraphQL */ `
  mutation DeleteApsAdminAnnouncement($input: DeleteApsAdminAnnouncementInput!) {
    deleteApsAdminAnnouncement(input: $input) {
      id
    }
  }
`;

export default function AnnouncementsClient() {
  const [events, setEvents] = useState<APS[]>([]);
  const [eventId, setEventId] = useState<string>('');
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [deepLink, setDeepLink] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pushStatus, setPushStatus] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadEvents() {
      try {
        // Existing models are currently public; we keep API_KEY auth for them.
        const res = await client.graphql({
          query: LIST_APS,
          variables: { limit: 50 },
          authMode: 'apiKey',
        });
        const data = getGraphQLData<any>(res);
        const ev: APS[] = (data?.listAPS?.items ?? [])
          .filter(Boolean)
          .map((x: any) => ({
            id: x.id,
            year: x.year,
          }))
          .sort((a: APS, b: APS) => Number(b.year) - Number(a.year));
        if (!cancelled) {
          setEvents(ev);
          if (!eventId && ev.length) {
            const preferred = ev.find((e) => e.year === '2026') ?? ev[0];
            setEventId(preferred.id);
          }
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load events');
        }
      }
    }
    void loadEvents();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const eventLabel = useMemo(() => {
    const ev = events.find((e) => e.id === eventId);
    return ev ? `Event ${ev.year}` : eventId ? 'Selected event' : 'No event';
  }, [events, eventId]);

  async function refreshAnnouncements(selectedEventId: string) {
    if (!selectedEventId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await client.graphql({
        query: LIST_ANNOUNCEMENTS,
        variables: {
          limit: 50,
          filter: { eventId: { eq: selectedEventId } },
        },
        authMode: 'userPool',
      });
      const data = getGraphQLData<any>(res);
      const anns = (data?.listApsAdminAnnouncements?.items ?? []).filter(Boolean);
      setItems(anns);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load announcements');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshAnnouncements(eventId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Admin
            </p>
            <h1 className="text-4xl font-bold text-slate-900">
              Announcements
            </h1>
            <p className="text-slate-600">
              Create announcements and push them to the app.
            </p>
          </div>

          <div className="flex items-center gap-3">
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
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50"
              onClick={() => void refreshAnnouncements(eventId)}
              disabled={!eventId || loading}
            >
              Refresh
            </button>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                New announcement
              </h2>
              <p className="text-sm text-slate-600">{eventLabel}</p>
            </div>
          </div>

          <form
            className="mt-6 grid gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!eventId) return;
              setLoading(true);
              setError(null);
              setPushStatus(null);
              try {
                const res = await client.graphql({
                  query: CREATE_ANNOUNCEMENT,
                  variables: {
                    input: {
                      eventId,
                      title: title.trim() ? title.trim() : null,
                      body: body.trim(),
                      deepLink: deepLink.trim() ? deepLink.trim() : null,
                    },
                  },
                  authMode: 'userPool',
                });

                const created = (res as any).data?.createApsAdminAnnouncement;
                const createdId = created?.id as string | undefined;

                // Fire push fanout from the admin portal server route (no AWS Lambda needed).
                try {
                  const session = await fetchAuthSession();
                  const jwt = session.tokens?.idToken?.toString();
                  if (!jwt) throw new Error('Missing id token');

                  const pushRes = await fetch('/api/push/announcement', {
                    method: 'POST',
                    headers: {
                      'content-type': 'application/json',
                      Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({
                      title: title.trim() || 'New announcement',
                      body: body.trim(),
                      deepLink:
                        deepLink.trim() ||
                        (createdId ? `aps://announcements/${createdId}` : null),
                    }),
                  });
                  const pushJson = await pushRes.json().catch(() => null);
                  if (!pushRes.ok) {
                    throw new Error(
                      pushJson?.error || `Push failed (${pushRes.status})`
                    );
                  }
                  setPushStatus(
                    `Push sent to ${pushJson?.sent ?? pushJson?.tokens ?? 0} device(s)`
                  );
                } catch (pushErr) {
                  setPushStatus(
                    `Announcement saved, but push failed: ${
                      pushErr instanceof Error ? pushErr.message : 'Unknown error'
                    }`
                  );
                }

                setTitle('');
                setBody('');
                setDeepLink('');
                await refreshAnnouncements(eventId);
              } catch (err) {
                setError(
                  err instanceof Error ? err.message : 'Create failed'
                );
              } finally {
                setLoading(false);
              }
            }}
          >
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Title</span>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Optional"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Body</span>
              <textarea
                className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-400"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Required"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Deep link
              </span>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-400"
                value={deepLink}
                onChange={(e) => setDeepLink(e.target.value)}
                placeholder="Optional (e.g. aps://announcements/<id>)"
              />
            </label>

            {error ? (
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}
            {pushStatus ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                {pushStatus}
              </div>
            ) : null}

            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={loading || !eventId}
                className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60"
              >
                Publish announcement
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Recent announcements
            </h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {items.length}
            </span>
          </div>

          {items.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              No announcements yet.
            </div>
          ) : (
            <ul className="mt-6 space-y-3">
              {items
                .slice()
                .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                .map((a) => (
                  <li
                    key={a.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-slate-900">
                          {a.title || '(No title)'}
                        </div>
                        <div className="mt-1 whitespace-pre-wrap text-sm text-slate-700">
                          {a.body}
                        </div>
                        <div className="mt-2 text-xs text-slate-500">
                          {new Date(a.createdAt).toLocaleString()} · {a.id}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="shrink-0 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                        onClick={async () => {
                          if (!confirm('Delete this announcement?')) return;
                          setLoading(true);
                          setError(null);
                          try {
                            await client.graphql({
                              query: DELETE_ANNOUNCEMENT,
                              variables: { input: { id: a.id } },
                              authMode: 'userPool',
                            });
                            await refreshAnnouncements(eventId);
                          } catch (e) {
                            setError(
                              e instanceof Error ? e.message : 'Delete failed'
                            );
                          } finally {
                            setLoading(false);
                          }
                        }}
                        disabled={loading}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}


