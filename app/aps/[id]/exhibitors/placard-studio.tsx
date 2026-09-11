'use client';

import { useEffect, useState } from 'react';
import PlacardCard from './placard-card';
import type { PlacardExhibitor } from '@/lib/placards';

export default function PlacardStudio({
  eventId,
  exhibitors,
}: {
  eventId: string;
  exhibitors: PlacardExhibitor[];
}) {
  const [enlarged, setEnlarged] = useState<PlacardExhibitor | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const missingQr = exhibitors.filter(
    (exhibitor) => !exhibitor.qrCodeUrl || !exhibitor.passportQrPayload,
  ).length;

  async function handleExport() {
    if (exporting || exhibitors.length === 0) return;
    setExporting(true);
    setExportError(null);
    try {
      const response = await fetch(`/aps/${eventId}/exhibitors/export`);
      if (!response.ok) {
        const message = (await response.text()).trim();
        throw new Error(message || `Export failed (${response.status})`);
      }
      const blob = await response.blob();
      const header = response.headers.get('Content-Disposition') ?? '';
      const match = header.match(/filename="([^"]+)"/);
      const filename = match?.[1] ?? `aps-${eventId}-passport-placards.pdf`;
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
    <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
      <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between'>
        <div className='space-y-2'>
          <h2 className='text-xl font-bold text-slate-900'>
            Passport Challenge placards
          </h2>
          <p className='max-w-xl text-sm text-slate-600'>
            Letter PDF (8.5&quot; × 11&quot;) with the same face printed twice —
            top half upside down. Print, fold in the middle, and stand it on the
            booth table.
          </p>
          <div className='flex flex-wrap gap-2 pt-1'>
            <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>
              {exhibitors.length} placard
              {exhibitors.length === 1 ? '' : 's'}
            </span>
            {missingQr > 0 ? (
              <span className='rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800'>
                {missingQr} missing QR
              </span>
            ) : null}
          </div>
        </div>

        <div className='flex flex-col gap-1.5 sm:items-end'>
          {exhibitors.length > 0 ? (
            <>
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
                  Building {exhibitors.length} tent
                  {exhibitors.length === 1 ? '' : 's'} with QR codes. This can
                  take a moment.
                </p>
              ) : null}
              {exportError ? (
                <p className='max-w-xs text-xs font-semibold text-red-700'>
                  {exportError}
                </p>
              ) : null}
            </>
          ) : (
            <span className='inline-flex cursor-not-allowed items-center justify-center rounded-xl bg-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-500'>
              Export PDF
            </span>
          )}
        </div>
      </div>

      <p className='mt-4 text-xs text-slate-500'>
        Click a placard to enlarge. Dashed line is the fold. Each face shows
        Passport Challenge, company name, booth number, and the exhibitor QR.
      </p>

      {exhibitors.length === 0 ? (
        <div className='mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
          Add exhibitor profiles above to preview and print placards.
        </div>
      ) : (
        <div className='mt-6 flex flex-wrap gap-5'>
          {exhibitors.map((exhibitor) => (
            <button
              key={exhibitor.id}
              type='button'
              onClick={() => setEnlarged(exhibitor)}
              className='rounded-sm text-left transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
              aria-label={`Enlarge placard for ${exhibitor.companyName}`}
            >
              <PlacardCard exhibitor={exhibitor} />
            </button>
          ))}
        </div>
      )}

      {enlarged ? (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4'
          onClick={() => setEnlarged(null)}
          role='dialog'
          aria-modal='true'
          aria-label='Enlarged placard'
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
            <PlacardCard exhibitor={enlarged} width={420} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
