'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  approveAddOnRequest,
  removeAddOnRequest,
} from '@/app/actions/add-ons';
import type { AddOnRequestItem } from '@/app/actions/add-ons';

function displayName(r: AddOnRequestItem['registrant']) {
  if (!r) return '—';
  const name = `${r.firstName ?? ''} ${r.lastName ?? ''}`.trim();
  return name || r.email;
}

function PreferencesCell({ preferences }: { preferences?: string | null }) {
  if (!preferences) return <span className='text-slate-500'>—</span>;
  try {
    const parsed = JSON.parse(preferences) as Record<string, unknown>;
    const entries = Object.entries(parsed);
    if (entries.length === 0) return <span className='text-slate-500'>—</span>;
    return (
      <div className='space-y-1 text-xs'>
        {entries.map(([k, v]) => (
          <div key={k}>
            <span className='font-medium text-slate-600'>{k}:</span>{' '}
            <span className='text-slate-800'>{String(v)}</span>
          </div>
        ))}
      </div>
    );
  } catch {
    return <span className='font-mono text-xs text-slate-600'>{preferences}</span>;
  }
}

type AddOnRequestsTablesProps = {
  eventId: string;
  addOnId: string;
  requested: AddOnRequestItem[];
  approved: AddOnRequestItem[];
  addOnPreferenceSchema?: string | null;
};

export default function AddOnRequestsTables({
  eventId,
  addOnId,
  requested,
  approved,
}: AddOnRequestsTablesProps) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleApprove(requestId: string) {
    setBusyId(requestId);
    try {
      await approveAddOnRequest(requestId, addOnId, eventId);
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  async function handleRemove(requestId: string) {
    setBusyId(requestId);
    try {
      await removeAddOnRequest(requestId, addOnId, eventId);
      router.refresh();
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className='space-y-8'>
      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <h2 className='text-xl font-bold text-slate-900'>Requested ({requested.length})</h2>
        <p className='mt-1 text-slate-600'>
          Registrants who have requested this add-on. Approve or remove.
        </p>

        {requested.length === 0 ? (
          <div className='mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
            No pending requests.
          </div>
        ) : (
          <div className='mt-6 overflow-x-auto rounded-2xl border border-slate-200'>
            <table className='w-full min-w-[520px] text-left text-sm'>
              <thead className='bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
                <tr>
                  <th className='px-4 py-3'>Registrant</th>
                  <th className='px-4 py-3'>Email</th>
                  <th className='px-4 py-3'>Preferences</th>
                  <th className='px-4 py-3'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {requested.map((r) => (
                  <tr key={r.id} className='bg-white'>
                    <td className='px-4 py-3 font-semibold text-slate-900'>
                      {displayName(r.registrant)}
                    </td>
                    <td className='px-4 py-3 text-slate-700'>
                      {r.registrant?.email ?? '—'}
                    </td>
                    <td className='px-4 py-3'>
                      <PreferencesCell preferences={r.preferences} />
                    </td>
                    <td className='px-4 py-3'>
                      <div className='flex gap-2'>
                        <button
                          type='button'
                          onClick={() => handleApprove(r.id)}
                          disabled={busyId === r.id}
                          className='rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50'
                        >
                          {busyId === r.id ? '…' : 'Approve'}
                        </button>
                        <button
                          type='button'
                          onClick={() => handleRemove(r.id)}
                          disabled={busyId === r.id}
                          className='rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50'
                        >
                          {busyId === r.id ? '…' : 'Remove'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <h2 className='text-xl font-bold text-slate-900'>Approved ({approved.length})</h2>
        <p className='mt-1 text-slate-600'>
          Registrants with approved add-on access.
        </p>

        {approved.length === 0 ? (
          <div className='mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
            No approved registrants yet.
          </div>
        ) : (
          <div className='mt-6 overflow-x-auto rounded-2xl border border-slate-200'>
            <table className='w-full min-w-[520px] text-left text-sm'>
              <thead className='bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
                <tr>
                  <th className='px-4 py-3'>Registrant</th>
                  <th className='px-4 py-3'>Email</th>
                  <th className='px-4 py-3'>Preferences</th>
                  <th className='px-4 py-3'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {approved.map((r) => (
                  <tr key={r.id} className='bg-white'>
                    <td className='px-4 py-3 font-semibold text-slate-900'>
                      {displayName(r.registrant)}
                    </td>
                    <td className='px-4 py-3 text-slate-700'>
                      {r.registrant?.email ?? '—'}
                    </td>
                    <td className='px-4 py-3'>
                      <PreferencesCell preferences={r.preferences} />
                    </td>
                    <td className='px-4 py-3'>
                      <button
                        type='button'
                        onClick={() => handleRemove(r.id)}
                        disabled={busyId === r.id}
                        className='rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50'
                      >
                        {busyId === r.id ? '…' : 'Remove'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
