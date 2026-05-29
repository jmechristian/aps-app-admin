'use client';

import { useEffect, useMemo, useState } from 'react';
import { graphqlClient as client } from '@/src/amplify-client';
import AnnouncementDeepLinkField, {
  type AgendaSessionOption,
} from './announcement-deep-link-field';
import {
  formatAnnouncementListMeta,
  getAnnouncementStatus,
  type AnnouncementStatus,
} from '@/lib/announcements';

type APS = { id: string; year: string };

type Announcement = {
  id: string;
  eventId: string;
  title?: string | null;
  body: string;
  deepLink?: string | null;
  scheduledAt?: string | null;
  publishedAt?: string | null;
  createdAt: string;
};

function getGraphQLData<T>(res: unknown): T {
  const data = (res as { data?: T }).data;
  if (!data) throw new Error('No data returned from GraphQL');
  return data;
}

function statusClassName(status: AnnouncementStatus) {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800';
    case 'scheduled':
      return 'bg-blue-100 text-blue-800';
    case 'ready':
      return 'bg-amber-100 text-amber-800';
  }
}

function sortAnnouncements(a: Announcement, b: Announcement) {
  const aTime = a.publishedAt ?? a.scheduledAt ?? a.createdAt;
  const bTime = b.publishedAt ?? b.scheduledAt ?? b.createdAt;
  return aTime < bTime ? 1 : -1;
}

function toDatetimeLocalValue(date: Date) {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function compactInput<T extends Record<string, unknown>>(input: T) {
  return Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== null && value !== undefined),
  ) as T;
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
  query ApsAdminAnnouncementsByEventIdAndCreatedAt(
    $eventId: ID!
    $sortDirection: ModelSortDirection
    $limit: Int
    $nextToken: String
  ) {
    apsAdminAnnouncementsByEventIdAndCreatedAt(
      eventId: $eventId
      sortDirection: $sortDirection
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        eventId
        title
        body
        deepLink
        scheduledAt
        publishedAt
        createdAt
      }
      nextToken
    }
  }
`;

const AGENDA_BY_EVENT = /* GraphQL */ `
  query ApsAgendaByEventId($eventId: ID!, $limit: Int) {
    apsAgendaByEventId(eventId: $eventId, limit: $limit) {
      items {
        id
      }
    }
  }
`;

const LIST_SESSIONS_BY_AGENDA = /* GraphQL */ `
  query ApsAppSessionsByAgendaId($agendaId: ID!, $limit: Int) {
    apsAppSessionsByAgendaId(agendaId: $agendaId, limit: $limit) {
      items {
        id
        title
        date
        startTime
        endTime
        location
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
      scheduledAt
      publishedAt
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
  const [sessions, setSessions] = useState<AgendaSessionOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [deepLink, setDeepLink] = useState('');
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduledAt, setScheduledAt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [sessionsError, setSessionsError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadEvents() {
      try {
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

  const minScheduleValue = useMemo(() => toDatetimeLocalValue(new Date()), []);

  const readyCount = useMemo(
    () =>
      items.filter((item) => getAnnouncementStatus(item).status === 'ready').length,
    [items],
  );

  async function refreshAnnouncements(selectedEventId: string) {
    if (!selectedEventId) return;
    setLoading(true);
    setError(null);
    try {
      const rows: Announcement[] = [];
      let nextToken: string | null | undefined = null;
      do {
        const res: unknown = await client.graphql({
          query: LIST_ANNOUNCEMENTS,
          variables: {
            eventId: selectedEventId,
            sortDirection: 'DESC',
            limit: 200,
            nextToken: nextToken || undefined,
          },
          authMode: 'userPool',
        });
        const data = getGraphQLData<{
          apsAdminAnnouncementsByEventIdAndCreatedAt?: {
            items?: Announcement[];
            nextToken?: string | null;
          } | null;
        }>(res);
        const page = data.apsAdminAnnouncementsByEventIdAndCreatedAt;
        rows.push(...(page?.items ?? []).filter(Boolean));
        nextToken = page?.nextToken;
      } while (nextToken);
      setItems(rows);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load announcements');
    } finally {
      setLoading(false);
    }
  }

  async function refreshSessions(selectedEventId: string) {
    if (!selectedEventId) {
      setSessions([]);
      return;
    }
    setSessionsLoading(true);
    setSessionsError(null);
    try {
      const agendaRes = await client.graphql({
        query: AGENDA_BY_EVENT,
        variables: { eventId: selectedEventId, limit: 1 },
        authMode: 'userPool',
      });
      const agendaData = getGraphQLData<any>(agendaRes);
      const agendaId = agendaData?.apsAgendaByEventId?.items?.[0]?.id as
        | string
        | undefined;
      if (!agendaId) {
        setSessions([]);
        return;
      }

      const sessionsRes = await client.graphql({
        query: LIST_SESSIONS_BY_AGENDA,
        variables: { agendaId, limit: 500 },
        authMode: 'userPool',
      });
      const sessionsData = getGraphQLData<any>(sessionsRes);
      const nextSessions = (sessionsData?.apsAppSessionsByAgendaId?.items ?? [])
        .filter(Boolean)
        .map((session: AgendaSessionOption) => ({
          id: session.id,
          title: session.title ?? null,
          date: session.date ?? null,
          startTime: session.startTime ?? null,
          endTime: session.endTime ?? null,
          location: session.location ?? null,
        }));
      setSessions(nextSessions);
    } catch (e) {
      setSessions([]);
      setSessionsError(
        e instanceof Error ? e.message : 'Failed to load agenda sessions',
      );
    } finally {
      setSessionsLoading(false);
    }
  }

  useEffect(() => {
    void refreshAnnouncements(eventId);
    void refreshSessions(eventId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  async function createAnnouncement() {
    if (!eventId) return;

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();
    const trimmedDeepLink = deepLink.trim();

    if (!trimmedBody) {
      throw new Error('Body is required.');
    }

    if (scheduleEnabled) {
      if (!scheduledAt) {
        throw new Error('Choose a schedule date and time.');
      }
      const scheduledDate = new Date(scheduledAt);
      if (Number.isNaN(scheduledDate.getTime())) {
        throw new Error('Invalid schedule date and time.');
      }
      if (scheduledDate.getTime() <= Date.now()) {
        throw new Error('Schedule time must be in the future.');
      }
    }

    const input = compactInput({
      eventId,
      title: trimmedTitle || null,
      body: trimmedBody,
      deepLink: trimmedDeepLink || null,
      ...(scheduleEnabled
        ? { scheduledAt: new Date(scheduledAt).toISOString() }
        : { publishedAt: new Date().toISOString() }),
    });

    await client.graphql({
      query: CREATE_ANNOUNCEMENT,
      variables: { input },
      authMode: 'userPool',
    });

    setStatusMessage(
      scheduleEnabled
        ? `Announcement scheduled for ${new Date(scheduledAt).toLocaleString()}. It will publish automatically at that time.`
        : 'Announcement published. Push notifications will be sent by apsPushFanout.',
    );

    setTitle('');
    setBody('');
    setDeepLink('');
    setScheduledAt('');
    setScheduleEnabled(false);
    await refreshAnnouncements(eventId);
  }

  return (
    <div className='min-h-screen bg-slate-50 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Admin
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>Announcements</h1>
            <p className='max-w-2xl text-slate-600'>
              Send push notifications to everyone with notifications enabled.
              Scheduled announcements publish automatically in the background at
              the scheduled time.
            </p>
          </div>

          <div className='flex flex-wrap items-center gap-3'>
            <select
              className='rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm'
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
              type='button'
              className='rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50'
              onClick={() => {
                void refreshAnnouncements(eventId);
                void refreshSessions(eventId);
              }}
              disabled={!eventId || loading}
            >
              Refresh
            </button>
          </div>
        </header>

        {readyCount > 0 ? (
          <div className='rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900'>
            {readyCount} announcement{readyCount === 1 ? '' : 's'} past due and
            waiting for the background publisher. They should go live within about
            a minute.
          </div>
        ) : null}

        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-lg'>
          <div>
            <h2 className='text-xl font-semibold text-slate-900'>
              New announcement
            </h2>
            <p className='text-sm text-slate-600'>{eventLabel}</p>
          </div>

          <form
            className='mt-6 grid gap-4'
            onSubmit={(e) => {
              e.preventDefault();
              if (!eventId) return;

              const runCreate = async () => {
                setLoading(true);
                setError(null);
                setStatusMessage(null);
                try {
                  await createAnnouncement();
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Create failed');
                } finally {
                  setLoading(false);
                }
              };

              if (scheduleEnabled) {
                void runCreate();
                return;
              }

              const confirmed = window.confirm(
                'Publish immediately? This will go live right away and send a push notification to all users with notifications enabled. This cannot be undone.',
              );
              if (confirmed) {
                void runCreate();
              }
            }}
          >
            <label className='block'>
              <span className='text-sm font-semibold text-slate-700'>Title</span>
              <input
                className='mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-400'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError(null);
                }}
                placeholder='Optional'
              />
            </label>

            <label className='block'>
              <span className='text-sm font-semibold text-slate-700'>Body</span>
              <textarea
                className='mt-2 min-h-28 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-400'
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                  if (error) setError(null);
                }}
                placeholder='Required'
                required
              />
            </label>

            <AnnouncementDeepLinkField
              sessions={sessions}
              sessionsLoading={sessionsLoading}
              sessionsError={sessionsError}
              value={deepLink}
              onChange={(value) => {
                setDeepLink(value);
                if (error) setError(null);
              }}
            />

            <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
              <label className='flex items-start gap-3'>
                <input
                  type='checkbox'
                  checked={scheduleEnabled}
                  onChange={(e) => {
                    setScheduleEnabled(e.target.checked);
                    if (error) setError(null);
                  }}
                  className='mt-1'
                />
                <span>
                  <span className='block text-sm font-semibold text-slate-900'>
                    Schedule for later
                  </span>
                  <span className='mt-1 block text-xs text-slate-600'>
                    {scheduleEnabled
                      ? 'The announcement stays hidden until the scheduled time.'
                      : 'Publish now sends immediately with a push notification.'}
                  </span>
                </span>
              </label>

              {!scheduleEnabled ? (
                <div className='mt-4 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-900'>
                  Publish now will go live instantly and notify all users with
                  push notifications enabled.
                </div>
              ) : null}

              {scheduleEnabled ? (
                <label className='mt-4 block'>
                  <span className='text-sm font-semibold text-slate-700'>
                    Scheduled time
                  </span>
                  <input
                    type='datetime-local'
                    min={minScheduleValue}
                    className='mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    value={scheduledAt}
                    onChange={(e) => {
                      setScheduledAt(e.target.value);
                      if (error) setError(null);
                    }}
                    required
                  />
                </label>
              ) : null}
            </div>

            {error ? (
              <div className='flex items-start justify-between gap-3 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700'>
                <p>{error}</p>
                <button
                  type='button'
                  onClick={() => setError(null)}
                  className='shrink-0 font-semibold text-rose-800 hover:text-rose-900'
                  aria-label='Dismiss error'
                >
                  ×
                </button>
              </div>
            ) : null}
            {statusMessage ? (
              <div className='flex items-start justify-between gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700'>
                <p>{statusMessage}</p>
                <button
                  type='button'
                  onClick={() => setStatusMessage(null)}
                  className='shrink-0 font-semibold text-slate-500 hover:text-slate-700'
                  aria-label='Dismiss message'
                >
                  ×
                </button>
              </div>
            ) : null}

            <div className='flex items-center justify-end'>
              <button
                type='submit'
                disabled={loading || !eventId}
                className={`rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60 ${
                  scheduleEnabled ? 'bg-slate-900' : 'bg-orange-700 hover:bg-orange-800'
                }`}
              >
                {loading
                  ? 'Saving…'
                  : scheduleEnabled
                    ? 'Schedule announcement'
                    : 'Publish now'}
              </button>
            </div>
          </form>
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-lg'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-slate-900'>History</h2>
            <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
              {items.length}
            </span>
          </div>

          {items.length === 0 ? (
            <div className='mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600'>
              No announcements yet.
            </div>
          ) : (
            <ul className='mt-6 space-y-3'>
              {items.slice().sort(sortAnnouncements).map((a) => {
                const { status, statusLabel } = getAnnouncementStatus(a);
                return (
                  <li
                    key={a.id}
                    className='rounded-2xl border border-slate-200 bg-white p-4'
                  >
                    <div className='flex items-start justify-between gap-4'>
                      <div className='min-w-0'>
                        <div className='flex flex-wrap items-center gap-2'>
                          <div className='text-sm font-semibold text-slate-900'>
                            {a.title?.trim() || 'Untitled announcement'}
                          </div>
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClassName(status)}`}
                          >
                            {statusLabel}
                          </span>
                        </div>
                        <div className='mt-1 whitespace-pre-wrap text-sm text-slate-700'>
                          {a.body}
                        </div>
                        <div className='mt-2 space-y-1 text-xs text-slate-500'>
                          <div>
                            {formatAnnouncementListMeta({
                              status,
                              scheduledAt: a.scheduledAt,
                              publishedAt: a.publishedAt,
                              createdAt: a.createdAt,
                            })}
                          </div>
                          {a.deepLink ? (
                            <div className='font-mono break-all'>{a.deepLink}</div>
                          ) : null}
                          <div className='font-mono'>{a.id}</div>
                        </div>
                      </div>
                      <button
                        type='button'
                        className='shrink-0 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100'
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
                              e instanceof Error ? e.message : 'Delete failed',
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
                );
              })}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
