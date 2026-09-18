'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAuthSession } from 'aws-amplify/auth';
import { ensureAmplifyConfigured, graphqlClient } from '@/src/amplify-client';
import WysiwygEditor, { sanitizeHtml } from '@/app/components/wysiwyg-editor';
import {
  isUnknownSpeakerOrderError,
  moveId,
  orderIds,
} from '@/lib/speaker-order';
import {
  createApsAgenda,
  createApsAppSession,
  createSessionSpeakers,
  createSessionSponsors,
  deleteApsAppSession,
  deleteApsAppSessionQuestion,
  deleteSessionSpeakers,
  deleteSessionSponsors,
  updateApsAppSession,
  updateAPS,
} from '@/src/graphql/mutations';
import {
  apsAppSessionQuestionsBySessionId,
  sessionSpeakersByApsAppSessionId,
  sessionSponsorsByApsAppSessionId,
} from '@/src/graphql/queries';

export type SpeakerOption = {
  id: string;
  profile?: { firstName?: string | null; lastName?: string | null; email?: string | null } | null;
};
export type SponsorOption = {
  id: string;
  companyId: string;
  company?: { id: string; name: string } | null;
};

export type AgendaSessionRow = {
  id: string;
  title?: string | null;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  location?: string | null;
  description?: string | null;
  embedUrl?: string | null;
  draft?: boolean | null;
  speakerNames?: string[] | null;
  sponsorNames?: string[] | null;
  speakerOrder?: string[] | null;
};

function displaySpeaker(s: SpeakerOption) {
  const name = `${s.profile?.firstName ?? ''} ${s.profile?.lastName ?? ''}`.trim();
  return name || s.profile?.email || s.id;
}

function displaySponsor(s: SponsorOption) {
  return s.company?.name ?? s.companyId ?? s.id;
}

function toggle(id: string, arr: string[]) {
  return arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];
}

async function mutateSessionRecord(
  query: string,
  input: Record<string, unknown>
) {
  const run = (nextInput: Record<string, unknown>) =>
    graphqlClient.graphql({
      query,
      variables: { input: nextInput },
      authMode: 'userPool',
    });

  try {
    const result = (await run(input)) as { errors?: Array<{ message?: string } | null> | null };
    if (result.errors?.length) {
      if (isUnknownSpeakerOrderError(result) && 'speakerOrder' in input) {
        const { speakerOrder: _ignored, ...rest } = input;
        return run(rest);
      }
      throw new Error(
        result.errors.map((item) => item?.message || 'GraphQL error').join(', ')
      );
    }
    return result;
  } catch (err) {
    if (!isUnknownSpeakerOrderError(err) || !('speakerOrder' in input)) {
      throw err;
    }
    const { speakerOrder: _ignored, ...rest } = input;
    return run(rest);
  }
}

async function ensureAgendaId(eventId: string, agendaId: string | null) {
  if (agendaId) return agendaId;

  ensureAmplifyConfigured();
  const created = await graphqlClient.graphql({
    query: createApsAgenda,
    variables: { input: { eventId } },
    authMode: 'userPool',
  });
  const newAgendaId = (created as any).data?.createApsAgenda?.id as
    | string
    | undefined;
  if (!newAgendaId) throw new Error('Failed to create agenda');

  await graphqlClient.graphql({
    query: updateAPS,
    variables: { input: { id: eventId, aPSAgendaId: newAgendaId } },
    authMode: 'userPool',
  });

  return newAgendaId;
}

export default function SessionModal({
  eventId,
  agendaId,
  speakers,
  sponsors,
  mode,
  initialSession,
  isOpen,
  onClose,
}: {
  eventId: string;
  agendaId: string | null;
  speakers: SpeakerOption[];
  sponsors: SponsorOption[];
  mode: 'create' | 'edit';
  initialSession?: AgendaSessionRow | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [loadingLinks, setLoadingLinks] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const descriptionRef = useRef('');
  const skipLinksLoadRef = useRef(false);

  const [form, setForm] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    description: '',
    embedUrl: '',
    draft: false,
    speakerQuery: '',
    sponsorQuery: '',
    speakerIds: [] as string[],
    sponsorIds: [] as string[],
  });

  // On first open in edit mode, load existing links so checkboxes prefill.
  // (Kept minimal: loads once per open)
  const sessionId = activeSessionId ?? initialSession?.id ?? null;
  const isNew = !sessionId;

  const filteredSpeakers = useMemo(() => {
    const q = form.speakerQuery.trim().toLowerCase();
    if (!q) return speakers;
    return speakers.filter((s) => {
      const name = displaySpeaker(s).toLowerCase();
      const email = s.profile?.email?.toLowerCase() ?? '';
      return name.includes(q) || email.includes(q);
    });
  }, [form.speakerQuery, speakers]);

  const filteredSponsors = useMemo(() => {
    const q = form.sponsorQuery.trim().toLowerCase();
    if (!q) return sponsors;
    return sponsors.filter((s) => displaySponsor(s).toLowerCase().includes(q));
  }, [form.sponsorQuery, sponsors]);

  // Sync form values whenever we open the modal or switch which session we're editing.
  useEffect(() => {
    if (!isOpen) {
      setActiveSessionId(null);
      setMessage(null);
      setError(null);
      return;
    }

    setError(null);
    setMessage(null);
    setActiveSessionId(mode === 'edit' ? initialSession?.id ?? null : null);

    if (mode === 'create') {
      descriptionRef.current = '';
      setForm({
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        description: '',
        embedUrl: '',
        draft: false,
        speakerQuery: '',
        sponsorQuery: '',
        speakerIds: [],
        sponsorIds: [],
      });
      return;
    }

    const description = sanitizeHtml(initialSession?.description ?? '');
    descriptionRef.current = description;
    setForm({
      title: initialSession?.title ?? '',
      date: initialSession?.date ?? '',
      startTime: initialSession?.startTime ?? '',
      endTime: initialSession?.endTime ?? '',
      location: initialSession?.location ?? '',
      description,
      embedUrl: initialSession?.embedUrl ?? '',
      draft: initialSession?.draft ?? false,
      speakerQuery: '',
      sponsorQuery: '',
      speakerIds: [],
      sponsorIds: [],
    });
  }, [isOpen, mode, initialSession?.id]);

  // Load speakers/sponsors joins for the active session whenever it changes.
  useEffect(() => {
    if (!isOpen) return;
    if (!sessionId) return;
    if (skipLinksLoadRef.current) {
      skipLinksLoadRef.current = false;
      return;
    }

    let cancelled = false;

    (async () => {
      setLoadingLinks(true);
      try {
        ensureAmplifyConfigured();
        await fetchAuthSession();

        const [speakerLinks, sponsorLinks] = await Promise.all([
          graphqlClient.graphql({
            query: sessionSpeakersByApsAppSessionId,
            variables: { apsAppSessionId: sessionId, limit: 1000 },
            authMode: 'userPool',
          }),
          graphqlClient.graphql({
            query: sessionSponsorsByApsAppSessionId,
            variables: { apsAppSessionId: sessionId, limit: 1000 },
            authMode: 'userPool',
          }),
        ]);

        const speakerItems =
          (speakerLinks as any).data?.sessionSpeakersByApsAppSessionId?.items ??
          [];
        const sponsorItems =
          (sponsorLinks as any).data?.sessionSponsorsByApsAppSessionId?.items ??
          [];

        const rawSpeakerIds = speakerItems
          .map((x: any) => x?.aPSSpeakerId)
          .filter(Boolean) as string[];
        const sponsorIds = sponsorItems
          .map((x: any) => x?.apsSponsorId)
          .filter(Boolean);

        if (cancelled) return;
        setForm((p) => ({
          ...p,
          speakerIds: orderIds(rawSpeakerIds, initialSession?.speakerOrder),
          sponsorIds,
        }));
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (cancelled) return;
        setLoadingLinks(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, mode, sessionId, initialSession?.speakerOrder]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);

    const description = sanitizeHtml(descriptionRef.current);

    try {
      ensureAmplifyConfigured();
      await fetchAuthSession();

      const actualAgendaId = await ensureAgendaId(eventId, agendaId);

      const sessionFields = {
        title: form.title || null,
        date: form.date || null,
        startTime: form.startTime || null,
        endTime: form.endTime || null,
        location: form.location || null,
        description: description || null,
        embedUrl: form.embedUrl || null,
        draft: form.draft,
        speakerOrder: form.speakerIds,
      };

      let effectiveSessionId: string;

      if (!sessionId) {
        const createdSession = await mutateSessionRecord(createApsAppSession, {
          agendaId: actualAgendaId,
          ...sessionFields,
        });

        const id = (createdSession as any).data?.createApsAppSession?.id as
          | string
          | undefined;
        if (!id) throw new Error('Failed to create session');
        effectiveSessionId = id;
      } else {
        await mutateSessionRecord(updateApsAppSession, {
          id: sessionId,
          ...sessionFields,
        });
        effectiveSessionId = sessionId;

        const [speakerLinks, sponsorLinks] = await Promise.all([
          graphqlClient.graphql({
            query: sessionSpeakersByApsAppSessionId,
            variables: { apsAppSessionId: sessionId, limit: 1000 },
            authMode: 'userPool',
          }),
          graphqlClient.graphql({
            query: sessionSponsorsByApsAppSessionId,
            variables: { apsAppSessionId: sessionId, limit: 1000 },
            authMode: 'userPool',
          }),
        ]);

        const speakerItems =
          (speakerLinks as any).data?.sessionSpeakersByApsAppSessionId?.items ?? [];
        const sponsorItems =
          (sponsorLinks as any).data?.sessionSponsorsByApsAppSessionId?.items ?? [];

        await Promise.all([
          ...speakerItems
            .map((x: any) => x?.id)
            .filter(Boolean)
            .map((id: string) =>
              graphqlClient.graphql({
                query: deleteSessionSpeakers,
                variables: { input: { id } },
                authMode: 'userPool',
              })
            ),
          ...sponsorItems
            .map((x: any) => x?.id)
            .filter(Boolean)
            .map((id: string) =>
              graphqlClient.graphql({
                query: deleteSessionSponsors,
                variables: { input: { id } },
                authMode: 'userPool',
              })
            ),
        ]);
      }

      await Promise.all([
        ...form.speakerIds.map((speakerId) =>
          graphqlClient.graphql({
            query: createSessionSpeakers,
            variables: {
              input: { apsAppSessionId: effectiveSessionId, aPSSpeakerId: speakerId },
            },
            authMode: 'userPool',
          })
        ),
        ...form.sponsorIds.map((sponsorId) =>
          graphqlClient.graphql({
            query: createSessionSponsors,
            variables: {
              input: { apsAppSessionId: effectiveSessionId, apsSponsorId: sponsorId },
            },
            authMode: 'userPool',
          })
        ),
      ]);

      skipLinksLoadRef.current = true;
      if (!sessionId) {
        setActiveSessionId(effectiveSessionId);
      }
      setMessage('Saved.');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!sessionId) return;
    const confirmed = window.confirm(
      'Delete this session? This will remove its speaker/sponsor links and questions.'
    );
    if (!confirmed) return;

    setSubmitting(true);
    setError(null);

    try {
      ensureAmplifyConfigured();
      await fetchAuthSession();

      const [speakerLinks, sponsorLinks, questions] = await Promise.all([
        graphqlClient.graphql({
          query: sessionSpeakersByApsAppSessionId,
          variables: { apsAppSessionId: sessionId, limit: 1000 },
          authMode: 'userPool',
        }),
        graphqlClient.graphql({
          query: sessionSponsorsByApsAppSessionId,
          variables: { apsAppSessionId: sessionId, limit: 1000 },
          authMode: 'userPool',
        }),
        graphqlClient.graphql({
          query: apsAppSessionQuestionsBySessionId,
          variables: { sessionId, limit: 1000 },
          authMode: 'userPool',
        }),
      ]);

      const speakerItems =
        (speakerLinks as any).data?.sessionSpeakersByApsAppSessionId?.items ?? [];
      const sponsorItems =
        (sponsorLinks as any).data?.sessionSponsorsByApsAppSessionId?.items ?? [];
      const questionItems =
        (questions as any).data?.apsAppSessionQuestionsBySessionId?.items ?? [];

      await Promise.all([
        ...speakerItems
          .map((x: any) => x?.id)
          .filter(Boolean)
          .map((id: string) =>
            graphqlClient.graphql({
              query: deleteSessionSpeakers,
              variables: { input: { id } },
              authMode: 'userPool',
            })
          ),
        ...sponsorItems
          .map((x: any) => x?.id)
          .filter(Boolean)
          .map((id: string) =>
            graphqlClient.graphql({
              query: deleteSessionSponsors,
              variables: { input: { id } },
              authMode: 'userPool',
            })
          ),
        ...questionItems
          .map((x: any) => x?.id)
          .filter(Boolean)
          .map((id: string) =>
            graphqlClient.graphql({
              query: deleteApsAppSessionQuestion,
              variables: { input: { id } },
              authMode: 'userPool',
            })
          ),
      ]);

      await graphqlClient.graphql({
        query: deleteApsAppSession,
        variables: { input: { id: sessionId } },
        authMode: 'userPool',
      });

      onClose();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='relative page-container max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl'>
        <div className='sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4'>
          <div>
            <h2 className='text-2xl font-bold text-slate-900'>
              {isNew ? 'Create session' : 'Edit session'}
            </h2>
            <p className='mt-1 text-sm text-slate-600'>
              Time fields are stored as strings and treated as{' '}
              <span className='font-semibold'>EST</span>.
            </p>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'
            aria-label='Close'
          >
            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        <form onSubmit={save} className='p-6'>
          {error && (
            <div className='mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800'>
              {error}
            </div>
          )}
          {message ? (
            <div className='mb-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800'>
              {message}
            </div>
          ) : null}

          {loadingLinks ? (
            <div className='rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700'>
              Loading speakers/sponsors…
            </div>
          ) : null}

          <div className='space-y-6'>
            <div className='space-y-4'>
              <div>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Title
                </label>
                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </div>
              <div className='grid gap-4 sm:grid-cols-2'>
                <div>
                  <label className='mb-1 block text-sm font-medium text-slate-700'>
                    Date (YYYY-MM-DD)
                  </label>
                  <input
                    value={form.date}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, date: e.target.value }))
                    }
                    placeholder='2026-01-15'
                    className='w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                  />
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium text-slate-700'>
                    Start time (HH:MM)
                  </label>
                  <input
                    value={form.startTime}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, startTime: e.target.value }))
                    }
                    placeholder='09:30'
                    className='w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                  />
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium text-slate-700'>
                    End time (HH:MM)
                  </label>
                  <input
                    value={form.endTime}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, endTime: e.target.value }))
                    }
                    placeholder='10:15'
                    className='w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                  />
                </div>
              </div>
              <div>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Location
                </label>
                <input
                  value={form.location}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, location: e.target.value }))
                  }
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </div>
              <div>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Description
                </label>
                <WysiwygEditor
                  value={form.description}
                  onChange={(html) => {
                    descriptionRef.current = html;
                    setForm((p) => ({ ...p, description: html }));
                  }}
                  placeholder='Write session description…'
                  disabled={submitting}
                />
                <p className='mt-2 text-xs text-slate-500'>
                  Stored as HTML. Use <span className='font-semibold'>Clear format</span>{' '}
                  to strip hidden paste styles. Rendering elsewhere should use{' '}
                  <span className='font-mono'>dangerouslySetInnerHTML</span>.
                </p>
              </div>
              <div>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Embed URL
                </label>
                <input
                  value={form.embedUrl}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, embedUrl: e.target.value }))
                  }
                  placeholder='https://...'
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </div>
              <label className='inline-flex items-center gap-3 text-sm font-medium text-slate-700'>
                <input
                  type='checkbox'
                  checked={form.draft}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, draft: e.target.checked }))
                  }
                  className='h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900'
                />
                Draft
              </label>
            </div>

            <div className='grid gap-6 lg:grid-cols-2'>
              <div className='space-y-6'>
                <div>
                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium text-slate-700'>
                    Speakers
                  </label>
                  <span className='text-xs text-slate-500'>
                    {form.speakerIds.length} selected
                  </span>
                </div>
                {form.speakerIds.length > 0 ? (
                  <div className='mt-2 rounded-xl border border-slate-200'>
                    <div className='border-b border-slate-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500'>
                      Display order
                    </div>
                    <p className='border-b border-slate-100 px-3 py-2 text-xs text-slate-500'>
                      First in this list is shown first in the app.
                    </p>
                    {form.speakerIds.map((id, index) => {
                      const speaker = speakers.find((s) => s.id === id);
                      return (
                        <div
                          key={id}
                          className='flex items-center gap-3 border-b border-slate-100 px-3 py-2 last:border-b-0'
                        >
                          <span className='w-6 shrink-0 text-xs font-semibold text-slate-500'>
                            {index + 1}
                          </span>
                          <span className='min-w-0 flex-1 truncate text-sm font-semibold text-slate-900'>
                            {speaker ? displaySpeaker(speaker) : id}
                          </span>
                          <div className='flex shrink-0 items-center gap-1'>
                            <button
                              type='button'
                              aria-label='Move speaker up'
                              disabled={index === 0 || submitting}
                              onClick={() =>
                                setForm((p) => ({
                                  ...p,
                                  speakerIds: moveId(p.speakerIds, id, -1),
                                }))
                              }
                              className='rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40'
                            >
                              Up
                            </button>
                            <button
                              type='button'
                              aria-label='Move speaker down'
                              disabled={
                                index === form.speakerIds.length - 1 ||
                                submitting
                              }
                              onClick={() =>
                                setForm((p) => ({
                                  ...p,
                                  speakerIds: moveId(p.speakerIds, id, 1),
                                }))
                              }
                              className='rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-40'
                            >
                              Down
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                <input
                  value={form.speakerQuery}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, speakerQuery: e.target.value }))
                  }
                  placeholder='Search speakers...'
                  className='mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
                <div className='mt-2 max-h-56 overflow-y-auto rounded-xl border border-slate-200'>
                  {filteredSpeakers.length === 0 ? (
                    <div className='p-3 text-sm text-slate-600'>No matches.</div>
                  ) : (
                    filteredSpeakers.map((s) => (
                      <label
                        key={s.id}
                        className='flex cursor-pointer items-center gap-3 border-b border-slate-100 px-3 py-2 text-sm last:border-b-0 hover:bg-slate-50'
                      >
                        <input
                          type='checkbox'
                          checked={form.speakerIds.includes(s.id)}
                          onChange={() =>
                            setForm((p) => ({
                              ...p,
                              speakerIds: toggle(s.id, p.speakerIds),
                            }))
                          }
                        />
                        <span className='truncate font-semibold text-slate-900'>
                          {displaySpeaker(s)}
                        </span>
                        <span className='truncate text-xs text-slate-600'>
                          {s.profile?.email ?? '—'}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>
              </div>

              <div className='space-y-6'>
                <div>
                <div className='flex items-center justify-between'>
                  <label className='text-sm font-medium text-slate-700'>
                    Sponsors
                  </label>
                  <span className='text-xs text-slate-500'>
                    {form.sponsorIds.length} selected
                  </span>
                </div>
                <input
                  value={form.sponsorQuery}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, sponsorQuery: e.target.value }))
                  }
                  placeholder='Search sponsors...'
                  className='mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
                <div className='mt-2 max-h-56 overflow-y-auto rounded-xl border border-slate-200'>
                  {filteredSponsors.length === 0 ? (
                    <div className='p-3 text-sm text-slate-600'>No matches.</div>
                  ) : (
                    filteredSponsors.map((s) => (
                      <label
                        key={s.id}
                        className='flex cursor-pointer items-center gap-3 border-b border-slate-100 px-3 py-2 text-sm last:border-b-0 hover:bg-slate-50'
                      >
                        <input
                          type='checkbox'
                          checked={form.sponsorIds.includes(s.id)}
                          onChange={() =>
                            setForm((p) => ({
                              ...p,
                              sponsorIds: toggle(s.id, p.sponsorIds),
                            }))
                          }
                        />
                        <span className='truncate font-semibold text-slate-900'>
                          {displaySponsor(s)}
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-between gap-3'>
            {sessionId ? (
              <button
                type='button'
                onClick={handleDelete}
                disabled={submitting}
                className='rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-red-100 hover:shadow-md disabled:opacity-60'
              >
                {submitting ? 'Deleting…' : 'Delete session'}
              </button>
            ) : (
              <span />
            )}
            <div className='flex items-center justify-end gap-3'>
              <button
                type='button'
                onClick={onClose}
                className='rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
                disabled={submitting}
              >
                Close
              </button>
              <button
                type='submit'
                disabled={submitting}
                className='rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:opacity-60'
              >
                {submitting ? 'Saving…' : isNew ? 'Create session' : 'Save changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}


