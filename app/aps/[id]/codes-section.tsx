'use client';

import { useState, useTransition } from 'react';
import type { APSCodeItem, APSCodeRegistrantUsage } from '@/app/actions/aps';

type CodesSectionProps = {
  eventId: string;
  codes: APSCodeItem[];
  onAddCode: (id: string, code: string) => Promise<void>;
  onAddCodes?: (id: string, codes: string[]) => Promise<void>;
  onFetchCodeRegistrations: (
    eventId: string,
    code: string
  ) => Promise<APSCodeRegistrantUsage[]>;
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
  onFetchCodeRegistrations,
  onUpdateCode,
  onRemoveCode,
}: CodesSectionProps) {
  const [newCode, setNewCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCode, setEditCode] = useState('');
  const [editLimit, setEditLimit] = useState<string>('');
  const [selectedUsed, setSelectedUsed] = useState<number>(0);
  const [codeRegistrants, setCodeRegistrants] = useState<APSCodeRegistrantUsage[]>([]);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const codeStrings = codes.map((c) => c.code);
  const existingSet = new Set(codeStrings);

  function startEditing(item: APSCodeItem) {
    setIsModalOpen(true);
    setEditingId(item.id);
    setEditCode(item.code);
    setEditLimit(item.limit != null ? String(item.limit) : '');
    setSelectedUsed(item.used);
    setCodeRegistrants([]);
    setError(null);

    startTransition(async () => {
      try {
        const registrations = await onFetchCodeRegistrations(eventId, item.code);
        setCodeRegistrants(registrations);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load code usage details');
      }
    });
  }

  function cancelEditing() {
    setIsModalOpen(false);
    setEditingId(null);
    setEditCode('');
    setEditLimit('');
    setSelectedUsed(0);
    setCodeRegistrants([]);
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
            (comma- or newline-separated) for bulk upload. Click a code to view details.
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
          {codes.map((codeItem) => (
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
          ))}
        </div>
      )}

      {isModalOpen && editingId && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
          <div className='w-full max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl'>
            <div className='flex items-center justify-between border-b border-slate-200 px-6 py-4'>
              <div>
                <h3 className='text-xl font-bold text-slate-900'>Code details</h3>
                <p className='mt-1 text-sm text-slate-600'>
                  Edit limit and review who used this code.
                </p>
              </div>
              <button
                type='button'
                onClick={cancelEditing}
                className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'
                aria-label='Close code details'
              >
                ×
              </button>
            </div>

            <div className='space-y-6 p-6'>
              <div className='grid gap-4 sm:grid-cols-3'>
                <div className='sm:col-span-2'>
                  <label className='mb-1 block text-sm font-medium text-slate-700'>Code</label>
                  <input
                    type='text'
                    value={editCode}
                    onChange={(e) => setEditCode(e.target.value)}
                    disabled={isPending}
                    className='w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500'
                  />
                </div>
                <div>
                  <label className='mb-1 block text-sm font-medium text-slate-700'>Limit</label>
                  <input
                    type='number'
                    min={0}
                    value={editLimit}
                    onChange={(e) => setEditLimit(e.target.value)}
                    placeholder='No limit'
                    disabled={isPending}
                    className='w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none transition focus:border-slate-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                  />
                </div>
              </div>

              <div className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
                <p className='text-sm text-slate-700'>
                  <span className='font-semibold text-slate-900'>Usage:</span> {selectedUsed}
                  {editLimit.trim() ? ` / ${editLimit}` : ''}
                </p>
              </div>

              <div>
                <h4 className='mb-2 text-sm font-semibold uppercase tracking-wide text-slate-600'>
                  Registrations using this code
                </h4>
                {isPending && codeRegistrants.length === 0 ? (
                  <p className='text-sm text-slate-600'>Loading registrations...</p>
                ) : codeRegistrants.length === 0 ? (
                  <p className='text-sm text-slate-600'>No registrations found for this code.</p>
                ) : (
                  <div className='overflow-hidden rounded-xl border border-slate-200'>
                    <table className='min-w-full divide-y divide-slate-200 text-left text-sm'>
                      <thead className='bg-slate-50 text-xs uppercase tracking-wide text-slate-600'>
                        <tr>
                          <th className='px-3 py-2 font-semibold'>Name</th>
                          <th className='px-3 py-2 font-semibold'>Email</th>
                          <th className='px-3 py-2 font-semibold'>Company</th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-slate-100 bg-white text-slate-800'>
                        {codeRegistrants.map((registrant) => (
                          <tr key={`${registrant.email}-${registrant.name}`}>
                            <td className='px-3 py-2'>{registrant.name}</td>
                            <td className='px-3 py-2'>{registrant.email}</td>
                            <td className='px-3 py-2'>{registrant.company ?? '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className='flex items-center justify-end gap-3'>
                <button
                  type='button'
                  onClick={cancelEditing}
                  disabled={isPending}
                  className='rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={handleSaveEdit}
                  disabled={isPending}
                  className='rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50'
                >
                  {isPending ? 'Saving...' : 'Save changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
