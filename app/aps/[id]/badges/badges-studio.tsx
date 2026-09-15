'use client';

import { useEffect, useMemo, useState } from 'react';
import BadgeCard from './badge-card';
import {
  BADGE_DESIGN_LABELS,
  BADGE_DESIGNS,
  getTypeColor,
  groupBadgePeople,
  type BadgeDesign,
  type BadgePerson,
} from '@/lib/badges';

function personName(person: BadgePerson) {
  return `${person.firstName} ${person.lastName}`.trim() || person.email;
}

export default function BadgesStudio({
  eventId,
  people,
}: {
  eventId: string;
  people: BadgePerson[];
}) {
  const [design, setDesign] = useState<BadgeDesign>('classic');
  const [enlarged, setEnlarged] = useState<BadgePerson | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    () => new Set(people.map((person) => person.id)),
  );
  const groups = useMemo(() => groupBadgePeople(people), [people]);
  const missingQrPeople = useMemo(
    () => people.filter((person) => !person.qrCodeUrl),
    [people],
  );
  const selectedCount = selectedIds.size;
  const allSelected = people.length > 0 && selectedCount === people.length;

  const visibleGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((group) => ({
        ...group,
        people: group.people.filter((person) => {
          const haystack = [
            person.firstName,
            person.lastName,
            person.company,
            person.email,
            person.attendeeType,
          ]
            .join(' ')
            .toLowerCase();
          return haystack.includes(q);
        }),
      }))
      .filter((group) => group.people.length > 0);
  }, [groups, query]);

  function togglePerson(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function selectAll() {
    setSelectedIds(new Set(people.map((person) => person.id)));
  }

  function clearSelected() {
    setSelectedIds(new Set());
  }

  function toggleGroup(ids: string[]) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      const allOn = ids.every((id) => next.has(id));
      for (const id of ids) {
        if (allOn) next.delete(id);
        else next.add(id);
      }
      return next;
    });
  }

  async function handleExport() {
    if (exporting || selectedCount === 0) return;
    setExporting(true);
    setExportError(null);
    try {
      const response = await fetch(`/aps/${eventId}/badges/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          design,
          ids: Array.from(selectedIds),
        }),
      });
      if (!response.ok) {
        const message = (await response.text()).trim();
        throw new Error(message || `Export failed (${response.status})`);
      }
      const blob = await response.blob();
      const header = response.headers.get('Content-Disposition') ?? '';
      const match = header.match(/filename="([^"]+)"/);
      const filename = match?.[1] ?? `aps-${eventId}-badges-${design}.pdf`;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      setExportError(
        error instanceof Error ? error.message : 'Could not generate the PDF.',
      );
    } finally {
      setExporting(false);
    }
  }

  useEffect(() => {
    if (!enlarged) return undefined;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setEnlarged(null);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [enlarged]);

  return (
    <div className='flex flex-col gap-6'>
      <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8'>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
          <div className='space-y-2'>
            <h2 className='text-xl font-bold text-slate-900'>Print studio</h2>
            <p className='max-w-xl text-sm text-slate-600'>
              Approved registrants only. Check the badges you want to print.
              Export is a single PDF at 4.25&quot; × 5.25&quot; (4&quot; × 5&quot;
              trim with 0.125&quot; bleed).
            </p>
            <div className='flex flex-wrap gap-2 pt-1'>
              <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>
                {selectedCount} selected
              </span>
              <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>
                {people.length} badge{people.length === 1 ? '' : 's'}
              </span>
              <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>
                {groups.length} type{groups.length === 1 ? '' : 's'}
              </span>
              {missingQrPeople.length > 0 ? (
                <span className='rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800'>
                  {missingQrPeople.length} missing QR — will generate on export
                </span>
              ) : null}
            </div>
            {missingQrPeople.length > 0 ? (
              <ul className='space-y-0.5 pt-1 text-xs text-amber-800'>
                {missingQrPeople.map((person) => (
                  <li key={person.id}>{personName(person)}</li>
                ))}
              </ul>
            ) : null}
            <div className='flex flex-wrap gap-2 pt-2'>
              <button
                type='button'
                onClick={selectAll}
                disabled={exporting || allSelected || people.length === 0}
                className='rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50'
              >
                Select all
              </button>
              <button
                type='button'
                onClick={clearSelected}
                disabled={exporting || selectedCount === 0}
                className='rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50'
              >
                Clear
              </button>
            </div>
          </div>

          <div className='flex flex-col gap-3 sm:items-end'>
            <div className='inline-flex rounded-2xl border border-slate-200 bg-slate-50 p-1'>
              {BADGE_DESIGNS.map((value) => {
                const active = design === value;
                return (
                  <button
                    key={value}
                    type='button'
                    onClick={() => setDesign(value)}
                    disabled={exporting}
                    className={
                      active
                        ? 'rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-80'
                        : 'rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 disabled:opacity-60'
                    }
                  >
                    {BADGE_DESIGN_LABELS[value]}
                  </button>
                );
              })}
            </div>
            {people.length > 0 ? (
              <div className='flex flex-col items-stretch gap-1.5 sm:items-end'>
                <button
                  type='button'
                  onClick={handleExport}
                  disabled={exporting || selectedCount === 0}
                  className='inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
                >
                  {exporting ? (
                    <>
                      <span
                        className='h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white'
                        aria-hidden
                      />
                      Generating PDF…
                    </>
                  ) : selectedCount === people.length ? (
                    'Export PDF'
                  ) : (
                    `Export ${selectedCount} badge${selectedCount === 1 ? '' : 's'}`
                  )}
                </button>
                {exporting ? (
                  <p className='text-xs text-slate-500'>
                    Building {selectedCount} badge
                    {selectedCount === 1 ? '' : 's'} with QR codes. This can take
                    a moment.
                  </p>
                ) : null}
                {exportError ? (
                  <p className='max-w-xs text-xs font-semibold text-red-700'>
                    {exportError}
                  </p>
                ) : null}
              </div>
            ) : (
              <span className='inline-flex cursor-not-allowed items-center justify-center rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500'>
                Export PDF
              </span>
            )}
          </div>
        </div>
        <div className='mt-5'>
          <label className='sr-only' htmlFor='badge-search'>
            Search registrants
          </label>
          <input
            id='badge-search'
            type='search'
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='Search name, company, or email'
            className='w-full rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 sm:max-w-md'
          />
        </div>
        <p className='mt-4 text-xs text-slate-500'>
          Check badges to include them. Click a badge to enlarge. Dashed inner
          box is the trim. Circle at the top is the lanyard punch zone. Table
          numbers print only when seating is assigned. Full exports still end
          with one blank write-in badge per attendee type.
        </p>
      </section>

      {people.length === 0 ? (
        <section className='rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg'>
          <p className='font-semibold text-slate-900'>No approved registrants</p>
          <p className='mt-1 text-sm text-slate-600'>
            Approve attendees on the event page, then return here to print
            badges.
          </p>
        </section>
      ) : visibleGroups.length === 0 ? (
        <section className='rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg'>
          <p className='font-semibold text-slate-900'>No matching badges</p>
          <p className='mt-1 text-sm text-slate-600'>
            Try a different name, company, or email.
          </p>
        </section>
      ) : (
        visibleGroups.map((group) => {
          const groupIds = group.people.map((person) => person.id);
          const selectedInGroup = groupIds.filter((id) =>
            selectedIds.has(id),
          ).length;
          const groupAllSelected =
            groupIds.length > 0 && selectedInGroup === groupIds.length;

          return (
            <section
              key={group.type}
              className='rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8'
            >
              <div className='sticky top-3 z-10 mb-5 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 px-4 py-3 backdrop-blur'>
                <div className='flex items-center gap-3'>
                  <span
                    className='h-3 w-3 shrink-0 rounded-full'
                    style={{ backgroundColor: getTypeColor(group.type) }}
                  />
                  <div>
                    <h3 className='text-lg font-bold text-slate-900'>
                      {group.label}
                    </h3>
                    <p className='text-xs font-semibold uppercase tracking-[0.16em] text-slate-500'>
                      {selectedInGroup}/{group.people.length} selected
                    </p>
                  </div>
                </div>
                <button
                  type='button'
                  onClick={() => toggleGroup(groupIds)}
                  disabled={exporting}
                  className='rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50'
                >
                  {groupAllSelected ? 'Clear group' : 'Select group'}
                </button>
              </div>
              <div className='flex flex-wrap gap-5'>
                {group.people.map((person) => {
                  const selected = selectedIds.has(person.id);
                  return (
                    <div key={person.id} className='relative'>
                      <label className='absolute top-2 left-2 z-10 flex cursor-pointer items-center rounded-md bg-white/95 p-1 shadow-sm'>
                        <input
                          type='checkbox'
                          checked={selected}
                          onChange={() => togglePerson(person.id)}
                          disabled={exporting}
                          className='h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900'
                          aria-label={`Select ${personName(person)}`}
                        />
                      </label>
                      <button
                        type='button'
                        onClick={() => setEnlarged(person)}
                        className={`rounded-sm text-left transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 ${
                          selected ? 'ring-2 ring-slate-900 ring-offset-2' : 'opacity-70'
                        }`}
                        aria-label={`Enlarge badge for ${personName(person)}`}
                      >
                        <BadgeCard person={person} design={design} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })
      )}

      {enlarged ? (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4'
          onClick={() => setEnlarged(null)}
          role='dialog'
          aria-modal='true'
          aria-label='Enlarged badge'
        >
          <div
            className='relative'
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type='button'
              onClick={() => setEnlarged(null)}
              className='absolute -top-3 -right-3 z-10 rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-md hover:bg-slate-50'
            >
              Close
            </button>
            <BadgeCard person={enlarged} design={design} width={420} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
