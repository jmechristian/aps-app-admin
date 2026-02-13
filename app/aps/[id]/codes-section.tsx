'use client';

import { useState, useTransition } from 'react';

type CodesSectionProps = {
  eventId: string;
  codes: string[];
  onAddCode: (id: string, code: string) => Promise<void>;
  onAddCodes?: (id: string, codes: string[]) => Promise<void>;
  onRemoveCode: (id: string, code: string) => Promise<void>;
};

export default function CodesSection({
  eventId,
  codes,
  onAddCode,
  onAddCodes,
  onRemoveCode,
}: CodesSectionProps) {
  const [newCode, setNewCode] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  async function handleAddCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const normalizedInput = newCode
      .replace(/\r/g, '\n')
      .replace(/\n+/g, '\n')
      .replace(/,\s*/g, '\n')
      .replace(/\s+/g, ' ')
      .replace(/([A-Za-z])\s+(\d)/g, '$1\n$2')
      .replace(/([A-Za-z])(\d)/g, '$1\n$2')
      .replace(/\n{2,}/g, '\n')
      .trim();

    const parsedCodes = normalizedInput
      .split(/[\n]+/)
      .map((code) => code.trim())
      .filter(Boolean);
    if (parsedCodes.length === 0) {
      setError('Please enter a code');
      return;
    }

    const uniqueCodes = Array.from(new Set(parsedCodes));
    const duplicates = uniqueCodes.filter((code) => codes.includes(code));
    const toAdd = uniqueCodes.filter((code) => !codes.includes(code));

    startTransition(async () => {
      try {
        if (toAdd.length === 0) {
          setError(
            duplicates.length > 0
              ? 'All provided codes already exist'
              : 'No valid codes to add'
          );
          return;
        }

        if (onAddCodes && toAdd.length > 1) {
          await onAddCodes(eventId, toAdd);
        } else {
          for (const code of toAdd) {
            await onAddCode(eventId, code);
          }
        }
        setNewCode('');
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add code');
      }
    });
  }

  async function handleRemoveCode(code: string) {
    startTransition(async () => {
      try {
        await onRemoveCode(eventId, code);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to remove code');
      }
    });
  }

  return (
    <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
      <div className='flex items-center justify-between mb-6'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
            Discount Codes
          </p>
          <h2 className='text-2xl font-bold text-slate-900'>
            Manage Codes
          </h2>
          <p className='text-sm text-slate-600 mt-1'>
            Create and manage discount codes for this event.
          </p>
        </div>
        <span className='rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white'>
          {codes.length} {codes.length === 1 ? 'code' : 'codes'}
        </span>
      </div>

      <form onSubmit={handleAddCode} className='mb-6'>
        <div className='flex flex-col gap-3 sm:flex-row'>
          <textarea
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            placeholder='Enter one or more codes, separated by commas or new lines'
            disabled={isPending}
            rows={2}
            className='flex-1 resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
          />
          <button
            type='submit'
            disabled={isPending || !newCode.trim()}
            className='inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0'
          >
            {isPending ? 'Adding...' : '+ Add Codes'}
          </button>
        </div>
        {error && (
          <p className='mt-2 text-sm text-red-600'>{error}</p>
        )}
      </form>

      {codes.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-8 text-center text-slate-600'>
          <p className='text-sm'>No codes have been added for this event.</p>
          <p className='text-xs mt-1 text-slate-500'>
            Add your first code using the form above.
          </p>
        </div>
      ) : (
        <div className='flex flex-wrap gap-3'>
          {codes.map((code) => (
            <div
              key={code}
              className='group relative flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 pr-8 text-sm font-semibold text-slate-700 transition hover:bg-slate-200'
            >
              <span>{code}</span>
              <button
                type='button'
                onClick={() => handleRemoveCode(code)}
                disabled={isPending}
                className='absolute right-1 flex h-5 w-5 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-300 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-slate-900 disabled:opacity-50 disabled:cursor-not-allowed'
                aria-label={`Remove ${code}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

