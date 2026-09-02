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
  const groups = useMemo(() => groupBadgePeople(people), [people]);
  const missingQr = people.filter((person) => !person.qrCodeUrl).length;

  async function handleExport() {
    if (exporting || people.length === 0) return;
    setExporting(true);
    setExportError(null);
    try {
      const response = await fetch(
        `/aps/${eventId}/badges/export?design=${design}`,
      );
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
              Approved registrants only. Preview is grouped by attendee type.
              Export is a single PDF at 4.25&quot; × 5.25&quot; (4&quot; × 5&quot;
              trim with 0.125&quot; bleed).
            </p>
            <div className='flex flex-wrap gap-2 pt-1'>
              <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>
                {people.length} badge{people.length === 1 ? '' : 's'}
              </span>
              <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>
                {groups.length} type{groups.length === 1 ? '' : 's'}
              </span>
              {missingQr > 0 ? (
                <span className='rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800'>
                  {missingQr} missing QR — will generate on export
                </span>
              ) : null}
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
                  disabled={exporting}
                  className='inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:translate-y-0 disabled:cursor-wait disabled:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
                >
                  {exporting ? (
                    <>
                      <span
                        className='h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white'
                        aria-hidden
                      />
                      Generating PDF…
                    </>
                  ) : (
                    'Export PDF'
                  )}
                </button>
                {exporting ? (
                  <p className='text-xs text-slate-500'>
                    Building {people.length} badge
                    {people.length === 1 ? '' : 's'} with QR codes. This can take
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
        <p className='mt-4 text-xs text-slate-500'>
          Click a badge to enlarge. Dashed inner box is the trim. Circle at the
          top is the lanyard punch zone. Table numbers show # until seating is
          assigned.
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
      ) : (
        groups.map((group) => (
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
                    {group.people.length} badge
                    {group.people.length === 1 ? '' : 's'}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-wrap gap-5'>
              {group.people.map((person) => (
                <button
                  key={person.id}
                  type='button'
                  onClick={() => setEnlarged(person)}
                  className='rounded-sm text-left transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
                  aria-label={`Enlarge badge for ${person.firstName} ${person.lastName}`.trim()}
                >
                  <BadgeCard person={person} design={design} />
                </button>
              ))}
            </div>
          </section>
        ))
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
              className='absolute -right-3 -top-3 z-10 rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-700 shadow-md hover:bg-slate-50'
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
