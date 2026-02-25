'use client';

import { useActionState } from 'react';
import { dedupeCompaniesByName } from '@/app/actions/companies';

type ActionState = {
  ok: boolean;
  message: string;
  removedCount?: number;
  skippedWithEvents?: number;
  processed?: number;
};

const initialState: ActionState = { ok: true, message: '' };

export default function DedupeCompaniesButton() {
  const [state, action, pending] = useActionState(dedupeCompaniesByName, initialState);

  return (
    <form action={action} className='flex flex-col gap-2 sm:flex-row sm:items-center'>
      <button
        type='submit'
        disabled={pending}
        className='inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60'
      >
        {pending ? 'Deduping…' : 'Dedupe by name'}
      </button>
      {state.message ? (
        <div
          className={
            state.ok
              ? 'text-xs font-semibold text-emerald-700'
              : 'text-xs font-semibold text-rose-600'
          }
        >
          {state.message}
        </div>
      ) : null}
    </form>
  );
}
