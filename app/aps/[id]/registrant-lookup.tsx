'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import {
  lookupRegistrantsByQuery,
  type RegistrantLookupResult,
} from '@/app/actions/registrants';

type LocalRegistrant = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  jobTitle?: string | null;
  company?: { name: string } | null;
  appUser?: { id: string } | null;
};

type RegistrantLookupProps = {
  eventId: string;
  registrants: LocalRegistrant[];
};

const UUID_RE =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;
const UUID_EXACT_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function displayName(result: RegistrantLookupResult) {
  return `${result.firstName ?? ''} ${result.lastName ?? ''}`.trim() || result.email;
}

function toLookupResult(
  registrant: LocalRegistrant,
  eventId: string,
): RegistrantLookupResult {
  return {
    id: registrant.id,
    eventId,
    firstName: registrant.firstName,
    lastName: registrant.lastName,
    email: registrant.email,
    jobTitle: registrant.jobTitle,
    companyName: registrant.company?.name ?? null,
    appUserId: registrant.appUser?.id ?? null,
  };
}

function extractIds(query: string): string[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const preferred: string[] = [];
      for (const key of ['userAId', 'userBId', 'requestedByUserId']) {
        const value = parsed[key];
        if (typeof value === 'string' && UUID_EXACT_RE.test(value)) {
          preferred.push(value);
        }
      }
      if (Array.isArray(parsed.owners)) {
        for (const owner of parsed.owners) {
          if (typeof owner === 'string' && UUID_EXACT_RE.test(owner)) {
            preferred.push(owner);
          }
        }
      }
      if (preferred.length > 0) return [...new Set(preferred)];
    }
  } catch {
    // Not JSON.
  }

  if (UUID_EXACT_RE.test(trimmed)) return [trimmed];
  return [...new Set(trimmed.match(UUID_RE) ?? [])];
}

export default function RegistrantLookup({
  eventId,
  registrants,
}: RegistrantLookupProps) {
  const [query, setQuery] = useState('');
  const [matches, setMatches] = useState<RegistrantLookupResult[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [isPending, startTransition] = useTransition();

  const localMatches = useMemo(() => {
    const trimmed = query.trim();
    const ids = extractIds(trimmed).map((id) => id.toLowerCase());

    if (ids.length > 0) {
      return registrants
        .filter((registrant) => {
          const registrantId = registrant.id.toLowerCase();
          const appUserId = registrant.appUser?.id?.toLowerCase() ?? '';
          return ids.includes(registrantId) || (appUserId && ids.includes(appUserId));
        })
        .map((registrant) => toLookupResult(registrant, eventId));
    }

    if (trimmed.length < 4) return [];
    const q = trimmed.toLowerCase();
    return registrants
      .filter((registrant) => {
        const registrantId = registrant.id.toLowerCase();
        const appUserId = registrant.appUser?.id?.toLowerCase() ?? '';
        return registrantId.includes(q) || (appUserId && appUserId.includes(q));
      })
      .slice(0, 12)
      .map((registrant) => toLookupResult(registrant, eventId));
  }, [eventId, query, registrants]);

  useEffect(() => {
    const trimmed = query.trim();
    const ids = extractIds(trimmed);
    setNotFound(false);

    if (localMatches.length > 0) {
      setMatches(localMatches);
      return;
    }

    if (ids.length === 0) {
      setMatches([]);
      return;
    }

    const handle = window.setTimeout(() => {
      startTransition(async () => {
        const results = await lookupRegistrantsByQuery(trimmed);
        if (query.trim() !== trimmed) return;
        setMatches(results);
        setNotFound(results.length === 0);
      });
    }, 250);

    return () => window.clearTimeout(handle);
  }, [localMatches, query]);

  return (
    <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-lg'>
      <div className='mb-4'>
        <h2 className='text-xl font-bold text-slate-900'>Registrant lookup</h2>
        <p className='mt-1 text-sm text-slate-600'>
          Paste a Registrant ID, App User ID (Cognito sub), or a contact request
          JSON blob. Matching people show below; click to open details.
        </p>
      </div>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Paste an ID or ApsContactRequest JSON'
        rows={4}
        className='w-full max-w-2xl rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
      />

      {isPending ? (
        <p className='mt-4 text-sm text-slate-600'>Looking up…</p>
      ) : null}

      {!isPending && query.trim() && matches.length === 0 ? (
        <p className='mt-4 text-sm text-slate-600'>
          {notFound
            ? 'No registrant or app user found for those IDs.'
            : query.trim().length < 4
              ? 'Enter at least 4 characters of an ID, or paste JSON.'
              : 'No IDs match yet.'}
        </p>
      ) : null}

      {matches.length > 0 ? (
        <div className='mt-4 grid gap-4 md:grid-cols-2'>
          {matches.map((match) => (
            <Link
              key={match.id}
              href={`/aps/${match.eventId}/registrants/${match.id}`}
              className='block rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white hover:shadow-sm'
            >
              <p className='text-lg font-semibold text-slate-900'>
                {displayName(match)}
              </p>
              <dl className='mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2'>
                <div>
                  <dt className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Company
                  </dt>
                  <dd className='mt-1'>{match.companyName || '—'}</dd>
                </div>
                <div>
                  <dt className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Title
                  </dt>
                  <dd className='mt-1'>{match.jobTitle || '—'}</dd>
                </div>
                <div className='sm:col-span-2'>
                  <dt className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Email
                  </dt>
                  <dd className='mt-1'>{match.email || '—'}</dd>
                </div>
              </dl>
              <p className='mt-3 text-sm font-semibold text-slate-800'>
                Open details →
              </p>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
