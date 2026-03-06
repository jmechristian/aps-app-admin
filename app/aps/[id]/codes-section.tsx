'use client';

import { useState, useTransition } from 'react';
import type { APSCodeItem } from '@/app/actions/aps';

type CodesSectionProps = {
  eventId: string;
  codes: APSCodeItem[];
  onAddCode: (id: string, code: string) => Promise<void>;
  onAddCodes?: (id: string, codes: string[]) => Promise<void>;
  onUpdateCode: (
    eventId: string,
    codeId: string,
    updates: { code?: string; limit?: number | null }
  ) => Promise<void>;
  onRemoveCode: (id: string, codeId: string) => Promise<void>;
};

export default function CodesSection({
  eventId,
  codes,
  onAddCode,
  onAddCodes,
  onUpdateCode,
  onRemoveCode,
}: CodesSectionProps) {
  const [newCode, setNewCode] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCode, setEditCode] = useState('');
  const [editLimit, setEditLimit] = useState<string>('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const codeStrings = codes.map((c) => c.code);
  const existingSet = new Set(codeStrings);

  function startEditing(item: APSCodeItem) {
    setEditingId(item.id);
    setEditCode(item.code);
    setEditLimit(item.limit != null ? String(item.limit) : '');
    setError(null);
  }

  function cancelEditing() {
    setEditingId(null);
    setEditCode('');
    setEditLimit('');
    setError(null);
  }

  async function handleAddCode(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const normalizedInput = newCode.replace(/\r/g, '\n').trim();
    const matchedCodes = normalizedInput.match(/[A-Za-z][A-Za-z\-]*\d+/g) ?? [];
    const parsedCodes =
      matchedCodes.length > 0
        ? matchedCodes
        : normalizedInput
            .split(/[\n,]+/)
            .map((code) => code.trim())
            .filter(Boolean);
    if (parsedCodes.length === 0) {
      setError('Please enter a code');
      return;
    }

    const uniqueCodes = Array.from(new Set(parsedCodes));
    const duplicates = uniqueCodes.filter((code) => existingSet.has(code));
    const toAdd = uniqueCodes.filter((code) => !existingSet.has(code));

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

  async function handleSaveEdit() {
    if (!editingId) return;
    const codeTrimmed = editCode.trim();
    if (!codeTrimmed) {
      setError('Code cannot be empty');
      return;
    }
    const limitVal =
      editLimit.trim() === '' ? null : (isNaN(Number(editLimit)) ? null : Number(editLimit));

    startTransition(async () => {
      try {
        await onUpdateCode(eventId, editingId, {
          code: codeTrimmed,
          limit: limitVal,
        });
        cancelEditing();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update code');
      }
    });
  }

  async function handleRemoveCode(codeItem: APSCodeItem) {
    startTransition(async () => {
      try {
        await onRemoveCode(eventId, codeItem.id);
        if (editingId === codeItem.id) cancelEditing();
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to remove code');
      }
    });
  }

  return (
    <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
      <div className='mb-6 flex items-center justify-between'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
            Discount Codes
          </p>
          <h2 className='text-2xl font-bold text-slate-900'>Manage Codes</h2>
          <p className='mt-1 text-sm text-slate-600'>
            Create and manage discount codes for this event. Paste multiple codes
            (comma- or newline-separated) for bulk upload. Click a code to edit.
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
            rows={4}
            className='flex-1 resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md disabled:cursor-not-allowed disabled:opacity-50'
          />
          <button
            type='submit'
            disabled={isPending || !newCode.trim()}
            className='inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:hover:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50'
          >
            {isPending ? 'Adding...' : '+ Add Codes'}
          </button>
        </div>
        {error && <p className='mt-2 text-sm text-red-600'>{error}</p>}
      </form>

      {codes.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 p-8 text-center text-slate-600'>
          <p className='text-sm'>No codes have been added for this event.</p>
          <p className='mt-1 text-xs text-slate-500'>
            Add codes using the form above. You can paste multiple codes at once.
          </p>
        </div>
      ) : (
        <div className='flex flex-wrap gap-3'>
          {codes.map((codeItem) =>
            editingId === codeItem.id ? (
              <div
                key={codeItem.id}
                className='flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 p-3 shadow-sm'
              >
                <input
                  type='text'
                  value={editCode}
                  onChange={(e) => setEditCode(e.target.value)}
                  placeholder='Code'
                  disabled={isPending}
                  className='w-28 rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slate-900 outline-none transition focus:border-slate-400'
                />
                <input
                  type='number'
                  min={0}
                  value={editLimit}
                  onChange={(e) => setEditLimit(e.target.value)}
                  placeholder='Limit (optional)'
                  disabled={isPending}
                  className='w-20 rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slate-900 outline-none transition focus:border-slate-400 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                />
                <button
                  type='button'
                  onClick={handleSaveEdit}
                  disabled={isPending}
                  className='rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50'
                >
                  Save
                </button>
                <button
                  type='button'
                  onClick={cancelEditing}
                  disabled={isPending}
                  className='rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50'
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div
                key={codeItem.id}
                role='button'
                tabIndex={0}
                onClick={() => startEditing(codeItem)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    startEditing(codeItem);
                  }
                }}
                className='group relative flex cursor-pointer items-center gap-2 rounded-full bg-slate-100 px-4 py-2 pr-8 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
              >
                <span>{codeItem.code}</span>
                {(codeItem.limit != null || codeItem.used > 0) && (
                  <span className='text-xs text-slate-500'>
                    ({codeItem.used}
                    {codeItem.limit != null ? `/${codeItem.limit}` : ''})
                  </span>
                )}
                <button
                  type='button'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveCode(codeItem);
                  }}
                  disabled={isPending}
                  className='absolute right-1 flex h-5 w-5 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-300 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-slate-900 disabled:cursor-not-allowed disabled:opacity-50'
                  aria-label={`Remove ${codeItem.code}`}
                >
                  ×
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
