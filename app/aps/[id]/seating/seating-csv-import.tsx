'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  applySeatingImportBatch,
  previewSeatingCsvImport,
  type SeatingCsvImportPreview,
} from '@/app/actions/seating';

type SeatingCsvImportProps = {
  eventId: string;
};

export default function SeatingCsvImport({ eventId }: SeatingCsvImportProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [preview, setPreview] = useState<SeatingCsvImportPreview | null>(null);
  const [progress, setProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handlePreview(csvText?: string) {
    setError(null);
    setProgress(null);
    startTransition(async () => {
      try {
        const next = await previewSeatingCsvImport({ eventId, csvText });
        setPreview(next);
        setProgress(
          next.changes.length
            ? `Ready to assign ${next.changes.length} registrants.`
            : 'No new table assignments to write.'
        );
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to match seating CSV.');
      }
    });
  }

  function handleFileChange(file: File | null) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      handlePreview(typeof reader.result === 'string' ? reader.result : undefined);
    };
    reader.readAsText(file);
  }

  function handleApply() {
    if (!preview?.changes.length) return;
    setError(null);
    startTransition(async () => {
      try {
        let created = 0;
        let updated = 0;
        const failed: string[] = [];
        const batchSize = 15;
        for (let i = 0; i < preview.changes.length; i += batchSize) {
          const batch = preview.changes.slice(i, i + batchSize).map((item) => ({
            registrantId: item.registrantId,
            tableNumber: item.tableNumber,
          }));
          setProgress(`Applying ${Math.min(i + batch.length, preview.changes.length)} of ${preview.changes.length}…`);
          const result = await applySeatingImportBatch({ eventId, items: batch });
          created += result.created;
          updated += result.updated;
          failed.push(...result.failed);
        }

        setPreview(null);
        setProgress(
          failed.length
            ? `Created ${created}, updated ${updated}, failed ${failed.length}.`
            : `Imported seating. Created ${created}, updated ${updated}.`
        );
        if (failed.length) {
          setError(failed.slice(0, 8).join('\n'));
        }
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to import seating assignments.');
      }
    });
  }

  return (
    <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
      <h2 className='text-xl font-bold text-slate-900'>Import table assignments</h2>
      <p className='mt-1 text-sm text-slate-600'>
        Match the seating CSV to registrants by name, company, and attendee type, then upsert table numbers.
      </p>

      <div className='mt-5 flex flex-wrap items-center gap-3'>
        <button
          type='button'
          onClick={() => handlePreview()}
          disabled={isPending}
          className='rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50'
        >
          Preview APS 2026 CSV
        </button>
        <label className='rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50'>
          Upload CSV
          <input
            type='file'
            accept='.csv,text/csv'
            className='hidden'
            disabled={isPending}
            onChange={(event) => handleFileChange(event.target.files?.[0] ?? null)}
          />
        </label>
        <button
          type='button'
          onClick={handleApply}
          disabled={isPending || !preview?.changes.length}
          className='rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50'
        >
          Apply {preview?.changes.length ?? 0} assignments
        </button>
      </div>

      {progress ? <p className='mt-3 text-sm text-emerald-700'>{progress}</p> : null}
      {error ? (
        <pre className='mt-3 whitespace-pre-wrap text-sm text-rose-700'>{error}</pre>
      ) : null}

      {preview ? (
        <div className='mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-3'>
          <p>
            <span className='font-semibold text-slate-900'>{preview.changes.length}</span> to assign
          </p>
          <p>
            <span className='font-semibold text-slate-900'>{preview.alreadyCorrect}</span> already correct
          </p>
          <p>
            <span className='font-semibold text-slate-900'>
              {preview.unmatched.length + preview.conflicts.length}
            </span>{' '}
            unmatched / conflicts
          </p>
          {preview.unmatched.length ? (
            <p className='sm:col-span-3 text-xs text-slate-600'>
              Unmatched: {preview.unmatched.map((item) => item.name).join(', ')}
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}