'use client';

import { useMemo, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  resetPostEventSurveyAction,
  setPostEventSurveyOpenAction,
  type PostEventSurveyCompletion,
} from '@/app/actions/post-event-survey';

function text(value?: string | null) {
  const trimmed = String(value || '').trim();
  return trimmed || '—';
}

function formatWhen(value: string | null) {
  if (!value) return 'Completed';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function LockButton({ open }: { open: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60'
    >
      {pending ? 'Saving...' : open ? 'Lock survey' : 'Unlock survey'}
    </button>
  );
}

export function SurveyLockControl({
  eventId,
  open,
}: {
  eventId: string;
  open: boolean;
}) {
  return (
    <form
      action={setPostEventSurveyOpenAction}
      className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'
    >
      <input type='hidden' name='eventId' value={eventId} />
      <input type='hidden' name='open' value={open ? 'false' : 'true'} />
      <p
        className={
          open
            ? 'text-sm font-semibold text-emerald-700'
            : 'text-sm font-semibold text-amber-800'
        }
      >
        {open ? 'Unlocked for attendees' : 'Locked'}
      </p>
      <LockButton open={open} />
    </form>
  );
}

export function SurveyCompletions({
  eventId,
  rows,
}: {
  eventId: string;
  rows: PostEventSurveyCompletion[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [resettingId, setResettingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) =>
      [row.name, row.email, row.company, row.identityLabel]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q)),
    );
  }, [query, rows]);

  const reset = (row: PostEventSurveyCompletion) => {
    const confirmed = window.confirm(
      `Reset ${row.name}'s survey? They will be able to fill it out again, and the current answers will be deleted.`,
    );
    if (!confirmed) return;

    setResettingId(row.id);
    setError(null);
    void resetPostEventSurveyAction(row.id, eventId)
      .then(() => router.refresh())
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'Unable to reset that survey.');
      })
      .finally(() => setResettingId(null));
  };

  return (
    <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h2 className='text-xl font-bold text-slate-900'>
            Completions ({rows.length})
          </h2>
          <p className='mt-1 text-sm text-slate-600'>
            Reset a row if someone needs to submit again. That deletes their answers.
          </p>
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Search name, company, or email'
          className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md sm:max-w-xs'
        />
      </div>
      {error ? <p className='mt-4 text-sm font-semibold text-red-700'>{error}</p> : null}
      <div className='mt-6 flex flex-col gap-3'>
        {!filtered.length ? (
          <p className='text-sm text-slate-600'>
            {rows.length ? 'No matches.' : 'No one has submitted yet.'}
          </p>
        ) : (
          filtered.map((row) => (
            <article
              key={row.id}
              className='rounded-2xl border border-slate-200 bg-slate-50/70 p-4'
            >
              <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                <div>
                  <h3 className='text-base font-bold text-slate-900'>{row.name}</h3>
                  <p className='text-sm text-slate-600'>
                    {[row.company, row.email, row.identityLabel].filter(Boolean).join(' · ') ||
                      'No company on file'}
                  </p>
                  <p className='mt-1 text-xs font-semibold text-slate-800'>
                    {formatWhen(row.completedAt)}
                  </p>
                </div>
                <button
                  type='button'
                  onClick={() => reset(row)}
                  disabled={resettingId === row.id}
                  className='inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60'
                >
                  {resettingId === row.id ? 'Resetting...' : 'Reset'}
                </button>
              </div>
              <details className='mt-3'>
                <summary className='cursor-pointer text-sm font-semibold text-slate-700'>
                  Answers
                </summary>
                <dl className='mt-3 grid gap-3 text-sm'>
                  <div>
                    <dt className='font-semibold text-slate-500'>Summit stars</dt>
                    <dd className='text-slate-900'>{row.summitRating ?? '—'}</dd>
                  </div>
                  <div>
                    <dt className='font-semibold text-slate-500'>Most beneficial</dt>
                    <dd className='whitespace-pre-wrap text-slate-900'>{text(row.mostBeneficial)}</dd>
                  </div>
                  <div>
                    <dt className='font-semibold text-slate-500'>Least beneficial</dt>
                    <dd className='whitespace-pre-wrap text-slate-900'>{text(row.leastBeneficial)}</dd>
                  </div>
                  <div>
                    <dt className='font-semibold text-slate-500'>Gained value</dt>
                    <dd className='text-slate-900'>
                      {row.gainedValue == null ? '—' : row.gainedValue ? 'Yes' : 'No'}
                    </dd>
                  </div>
                  <div>
                    <dt className='font-semibold text-slate-500'>Comments</dt>
                    <dd className='whitespace-pre-wrap text-slate-900'>
                      {text(row.gainedValueComments)}
                    </dd>
                  </div>
                  <div>
                    <dt className='font-semibold text-slate-500'>Favorite presentation</dt>
                    <dd className='whitespace-pre-wrap text-slate-900'>
                      {text(row.favoritePresentation)}
                    </dd>
                  </div>
                  <div>
                    <dt className='font-semibold text-slate-500'>Network growth</dt>
                    <dd className='text-slate-900'>{row.networkGrowthRating ?? '—'}</dd>
                  </div>
                  {row.sessionRatings.length ? (
                    <div>
                      <dt className='font-semibold text-slate-500'>Session ratings</dt>
                      <dd className='mt-1 space-y-1 text-slate-900'>
                        {row.sessionRatings.map((session) => (
                          <p key={session.id}>
                            {session.rating} — {session.title}
                          </p>
                        ))}
                      </dd>
                    </div>
                  ) : null}
                  <div>
                    <dt className='font-semibold text-slate-500'>How we could improve</dt>
                    <dd className='whitespace-pre-wrap text-slate-900'>
                      {text(row.improvementSuggestions)}
                    </dd>
                  </div>
                  <div>
                    <dt className='font-semibold text-slate-500'>Who to invite next year</dt>
                    <dd className='text-slate-900'>
                      {[
                        row.recommendName,
                        row.recommendCompany,
                        row.recommendEmail,
                        row.recommendPhone,
                      ]
                        .map((part) => String(part || '').trim())
                        .filter(Boolean)
                        .join(' · ') || '—'}
                    </dd>
                  </div>
                </dl>
              </details>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
