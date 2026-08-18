'use client';

import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import {
  lookupRegistrantById,
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

export default function RegistrantLookup({
  eventId,
  registrants,
}: RegistrantLookupProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<RegistrantLookupResult | null>(null);
  const [remoteResult, setRemoteResult] = useState<RegistrantLookupResult | null>(
    null,
  );
  const [notFound, setNotFound] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [popoverStyle, setPopoverStyle] = useState<{
    left: number;
    top: number;
    width: number;
    maxHeight: number;
  } | null>(null);

  const localMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 4) return [];

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
    setMounted(true);
  }, []);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const el = containerRef.current;
      const pop = popoverRef.current;
      if (!el) return;
      if (
        e.target instanceof Node &&
        (el.contains(e.target) || pop?.contains(e.target))
      ) {
        return;
      }
      setOpen(false);
    }

    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, []);

  useEffect(() => {
    if (!open) return;

    function updatePosition() {
      const input = inputRef.current;
      if (!input) return;

      const rect = input.getBoundingClientRect();
      const padding = 8;
      const preferredMax = 288;
      const spaceBelow = window.innerHeight - rect.bottom - padding;
      const spaceAbove = rect.top - padding;
      const shouldFlip = spaceBelow < 160 && spaceAbove > spaceBelow;
      const maxHeight = Math.max(
        160,
        Math.min(preferredMax, shouldFlip ? spaceAbove : spaceBelow),
      );
      const width = rect.width;
      const left = Math.max(
        padding,
        Math.min(rect.left, window.innerWidth - width - padding),
      );
      const top = shouldFlip
        ? Math.max(padding, rect.top - padding - maxHeight)
        : rect.bottom + padding;

      setPopoverStyle({ left, top, width, maxHeight });
    }

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    const trimmed = query.trim();
    setNotFound(false);
    setRemoteResult(null);

    const exactLocal = localMatches.find(
      (match) => match.id === trimmed || match.appUserId === trimmed,
    );
    if (exactLocal) {
      setSelected(exactLocal);
      setOpen(false);
      return;
    }

    if (!UUID_RE.test(trimmed)) return;

    const handle = window.setTimeout(() => {
      startTransition(async () => {
        const result = await lookupRegistrantById(trimmed);
        if (query.trim() !== trimmed) return;
        setRemoteResult(result);
        setNotFound(!result);
        if (result) {
          setSelected(result);
          setOpen(false);
        }
      });
    }, 250);

    return () => window.clearTimeout(handle);
  }, [localMatches, query]);

  const dropdownMatches = useMemo(() => {
    if (remoteResult) {
      const alreadyListed = localMatches.some((match) => match.id === remoteResult.id);
      return alreadyListed ? localMatches : [remoteResult, ...localMatches];
    }
    return localMatches;
  }, [localMatches, remoteResult]);

  function selectMatch(match: RegistrantLookupResult) {
    setSelected(match);
    setQuery(match.id);
    setOpen(false);
    setNotFound(false);
  }

  return (
    <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-lg'>
      <div className='mb-4'>
        <h2 className='text-xl font-bold text-slate-900'>Registrant lookup</h2>
        <p className='mt-1 text-sm text-slate-600'>
          Search by Registrant ID or App User ID. Select a match to preview, then
          open their details.
        </p>
      </div>

      <div ref={containerRef} className='relative max-w-xl'>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder='Paste a Registrant ID or App User ID'
          className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
        />

        {mounted && open && popoverStyle
          ? createPortal(
              <div
                ref={popoverRef}
                className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl'
                style={{
                  position: 'fixed',
                  zIndex: 9999,
                  left: popoverStyle.left,
                  top: popoverStyle.top,
                  width: popoverStyle.width,
                }}
              >
                <div
                  style={{ maxHeight: popoverStyle.maxHeight }}
                  className='overflow-y-auto'
                >
                  {query.trim().length < 4 ? (
                    <div className='p-3 text-sm text-slate-600'>
                      Enter at least 4 characters of an ID.
                    </div>
                  ) : isPending ? (
                    <div className='p-3 text-sm text-slate-600'>Looking up…</div>
                  ) : dropdownMatches.length === 0 ? (
                    <div className='p-3 text-sm text-slate-600'>
                      {notFound
                        ? 'No registrant or app user found for that ID.'
                        : `No IDs match “${query.trim()}”.`}
                    </div>
                  ) : (
                    dropdownMatches.map((match) => (
                      <button
                        key={match.id}
                        type='button'
                        onClick={() => selectMatch(match)}
                        className='w-full px-3 py-2 text-left text-sm hover:bg-slate-50'
                      >
                        <div className='truncate font-semibold text-slate-900'>
                          {displayName(match)}
                        </div>
                        <div className='truncate text-xs text-slate-600'>
                          {[match.companyName, match.jobTitle, match.email]
                            .filter(Boolean)
                            .join(' · ')}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>,
              document.body,
            )
          : null}
      </div>

      {selected ? (
        <Link
          href={`/aps/${selected.eventId}/registrants/${selected.id}`}
          className='mt-4 block max-w-xl rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white hover:shadow-sm'
        >
          <p className='text-lg font-semibold text-slate-900'>
            {displayName(selected)}
          </p>
          <dl className='mt-3 grid gap-2 text-sm text-slate-700 sm:grid-cols-2'>
            <div>
              <dt className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                Company
              </dt>
              <dd className='mt-1'>{selected.companyName || '—'}</dd>
            </div>
            <div>
              <dt className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                Title
              </dt>
              <dd className='mt-1'>{selected.jobTitle || '—'}</dd>
            </div>
            <div className='sm:col-span-2'>
              <dt className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                Email
              </dt>
              <dd className='mt-1'>{selected.email}</dd>
            </div>
          </dl>
          <p className='mt-3 text-sm font-semibold text-slate-800'>
            Open details →
          </p>
        </Link>
      ) : null}
    </section>
  );
}
