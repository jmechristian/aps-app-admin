'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { clearAllSeatingAssignments } from '@/app/actions/seating';

const CONFIRMATION_TEXT = 'DELETE ALL TABLES';

type SeatingClearAllProps = {
  eventId: string;
  assignmentCount: number;
};

export default function SeatingClearAll({
  eventId,
  assignmentCount,
}: SeatingClearAllProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleClear() {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        const result = await clearAllSeatingAssignments({
          eventId,
          confirmation,
        });
        setConfirmation('');
        setMessage(
          result.failed.length
            ? `Deleted ${result.deleted} assignments. ${result.failed.length} failed.`
            : `Deleted ${result.deleted} table assignments. Registrants were not removed.`
        );
        if (result.failed.length) {
          setError(result.failed.slice(0, 8).join('\n'));
        }
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to clear table assignments.');
      }
    });
  }

  return (
    <section className='rounded-3xl border border-rose-200 bg-rose-50 p-8 shadow-sm'>
      <h2 className='text-xl font-bold text-rose-950'>Reset seating chart</h2>
      <p className='mt-1 text-sm text-rose-900'>
        This deletes table assignment records only. It does not delete registrants, companies,
        badges, or the empty seating chart. Current assignments: {assignmentCount}.
      </p>
      <div className='mt-5 flex flex-wrap items-center gap-3'>
        <input
          type='text'
          value={confirmation}
          onChange={(event) => setConfirmation(event.target.value)}
          placeholder={CONFIRMATION_TEXT}
          disabled={isPending || assignmentCount === 0}
          className='w-full max-w-xs rounded-lg border border-rose-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-900 disabled:opacity-50'
        />
        <button
          type='button'
          onClick={handleClear}
          disabled={isPending || confirmation.trim() !== CONFIRMATION_TEXT || assignmentCount === 0}
          className='rounded-lg bg-rose-800 px-3 py-2 text-xs font-semibold text-white transition hover:bg-rose-900 disabled:opacity-50'
        >
          {isPending ? 'Deleting…' : 'Delete all table assignments'}
        </button>
      </div>
      {message ? <p className='mt-3 text-sm text-emerald-800'>{message}</p> : null}
      {error ? (
        <pre className='mt-3 whitespace-pre-wrap text-sm text-rose-800'>{error}</pre>
      ) : null}
    </section>
  );
}