'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAuthSession } from 'aws-amplify/auth';
import {
  approveRegistrant,
  regenerateRegistrantTempPassword,
  unapproveRegistrant,
} from '@/app/actions/registrants';
import {
  approveAddOnRequest,
  removeAddOnRequest,
  type AddOnRequestItem,
} from '@/app/actions/add-ons';

type RegistrantWorkflowPanelProps = {
  eventId: string;
  registrantId: string;
  status: string;
  addOnRequests: AddOnRequestItem[];
  existingTempPassword?: string | null;
};

function PreferencesCell({ preferences }: { preferences?: string | null }) {
  if (!preferences) return <span className='text-slate-500'>-</span>;
  let entries: Array<[string, unknown]> | null = null;
  try {
    const parsed = JSON.parse(preferences) as Record<string, unknown>;
    entries = Object.entries(parsed);
  } catch {
    entries = null;
  }

  if (!entries) {
    return <span className='font-mono text-xs text-slate-600'>{preferences}</span>;
  }

  if (entries.length === 0) return <span className='text-slate-500'>-</span>;

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
}

export default function RegistrantWorkflowPanel({
  eventId,
  registrantId,
  status,
  addOnRequests,
  existingTempPassword = null,
}: RegistrantWorkflowPanelProps) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tempPassword, setTempPassword] = useState<string | null>(
    existingTempPassword
  );
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle');

  const pendingRequests = useMemo(
    () => addOnRequests.filter((request) => request.status === 'PENDING'),
    [addOnRequests]
  );
  const approvedRequests = useMemo(
    () => addOnRequests.filter((request) => request.status === 'APPROVED'),
    [addOnRequests]
  );

  async function getJwt(): Promise<string | null> {
    const session = await fetchAuthSession();
    return (
      session.tokens?.accessToken?.toString() ??
      session.tokens?.idToken?.toString() ??
      null
    );
  }

  async function handleApproveRegistrant() {
    setBusy('approve-registrant');
    setMessage(null);
    setError(null);
    try {
      const jwt = await getJwt();
      const result = await approveRegistrant({ registrantId, eventId, jwt });
      if (!result.ok) {
        setError(result.message || 'Failed to approve registrant.');
        return;
      }
      if (result.tempPassword) {
        setTempPassword(result.tempPassword);
      }
      setMessage(result.message);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve registrant.');
    } finally {
      setBusy(null);
    }
  }

  async function handleUnapproveRegistrant() {
    setBusy('unapprove-registrant');
    setMessage(null);
    setError(null);
    try {
      const jwt = await getJwt();
      const result = await unapproveRegistrant({ registrantId, eventId, jwt });
      if (!result.ok) {
        setError(result.message || 'Failed to unapprove registrant.');
        return;
      }
      setMessage(result.message);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to move registrant to pending.'
      );
    } finally {
      setBusy(null);
    }
  }

  async function handleApproveAddOn(requestId: string, addOnId: string) {
    setBusy(`approve-addon-${requestId}`);
    setMessage(null);
    setError(null);
    try {
      await approveAddOnRequest(requestId, addOnId, eventId);
      setMessage('Add-on request approved.');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve add-on request.');
    } finally {
      setBusy(null);
    }
  }

  async function handleRegenerateTempPassword() {
    setBusy('regenerate-temp-password');
    setMessage(null);
    setError(null);
    try {
      const jwt = await getJwt();
      const result = await regenerateRegistrantTempPassword({
        registrantId,
        eventId,
        jwt,
      });
      if (!result.ok) {
        setError(result.message || 'Failed to regenerate temporary password.');
        return;
      }
      if (result.tempPassword) {
        setTempPassword(result.tempPassword);
      }
      setMessage(result.message);
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to regenerate temporary password.'
      );
    } finally {
      setBusy(null);
    }
  }

  async function handleRemoveAddOn(requestId: string, addOnId: string) {
    setBusy(`remove-addon-${requestId}`);
    setMessage(null);
    setError(null);
    try {
      await removeAddOnRequest(requestId, addOnId, eventId);
      setMessage('Add-on request removed.');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove add-on request.');
    } finally {
      setBusy(null);
    }
  }

  async function copyPassword() {
    if (!tempPassword) return;
    try {
      await navigator.clipboard.writeText(tempPassword);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 1200);
    } catch {
      setCopyState('failed');
      setTimeout(() => setCopyState('idle'), 1200);
    }
  }

  return (
    <div className='space-y-6'>
      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='flex flex-wrap items-start justify-between gap-3'>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>
              Registration Approval
            </h2>
            <p className='mt-1 text-slate-600'>
              Current status: <span className='font-semibold'>{status}</span>
            </p>
          </div>
          <div className='flex gap-2'>
            <button
              type='button'
              onClick={handleApproveRegistrant}
              disabled={busy !== null || status === 'APPROVED'}
              className='rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50'
            >
              {busy === 'approve-registrant' ? 'Approving...' : 'Approve'}
            </button>
            <button
              type='button'
              onClick={handleUnapproveRegistrant}
              disabled={busy !== null || status !== 'APPROVED'}
              className='rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50'
            >
              {busy === 'unapprove-registrant' ? 'Updating...' : 'Unapprove'}
            </button>
          </div>
        </div>

        <div className='mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4'>
          <div className='flex flex-wrap items-center justify-between gap-3'>
            <p className='text-xs font-semibold text-emerald-800'>
              Temporary password
            </p>
            <button
              type='button'
              onClick={handleRegenerateTempPassword}
              disabled={busy !== null}
              className='rounded-lg border border-emerald-300 bg-white px-3 py-2 text-xs font-semibold text-emerald-800 transition hover:bg-emerald-100 disabled:opacity-50'
            >
              {busy === 'regenerate-temp-password'
                ? 'Issuing...'
                : 'Reissue temporary password'}
            </button>
          </div>

          {tempPassword ? (
            <div className='mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              <code className='rounded-lg bg-emerald-100 px-3 py-2 text-sm font-semibold text-emerald-900'>
                {tempPassword}
              </code>
              <button
                type='button'
                onClick={copyPassword}
                className='rounded-lg bg-emerald-700 px-3 py-2 text-xs font-semibold text-white transition hover:bg-emerald-800'
              >
                {copyState === 'copied'
                  ? 'Copied!'
                  : copyState === 'failed'
                    ? 'Copy failed'
                    : 'Copy password'}
              </button>
            </div>
          ) : (
            <p className='mt-2 text-xs text-emerald-700'>
              No temporary password is stored yet. Use reissue to generate one.
            </p>
          )}
        </div>

        {message ? <p className='mt-4 text-sm text-emerald-700'>{message}</p> : null}
        {error ? <p className='mt-4 text-sm text-rose-700'>{error}</p> : null}
      </section>

      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <h2 className='text-xl font-bold text-slate-900'>
          Add-On Requests ({addOnRequests.length})
        </h2>
        <p className='mt-1 text-slate-600'>
          Manage this registrant&apos;s add-on approvals.
        </p>

        {addOnRequests.length === 0 ? (
          <div className='mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
            No add-on requests for this registrant.
          </div>
        ) : (
          <div className='mt-6 space-y-6'>
            <div>
              <h3 className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
                Requested ({pendingRequests.length})
              </h3>
              <div className='mt-3 overflow-x-auto rounded-2xl border border-slate-200'>
                <table className='w-full min-w-[560px] text-left text-sm'>
                  <thead className='bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
                    <tr>
                      <th className='px-4 py-3'>Add-On</th>
                      <th className='px-4 py-3'>Preferences</th>
                      <th className='px-4 py-3'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-200'>
                    {pendingRequests.length === 0 ? (
                      <tr>
                        <td className='px-4 py-3 text-slate-500' colSpan={3}>
                          No pending add-on requests.
                        </td>
                      </tr>
                    ) : (
                      pendingRequests.map((request) => (
                        <tr key={request.id} className='bg-white'>
                          <td className='px-4 py-3 font-semibold text-slate-900'>
                            {request.addOn?.title ?? request.addOnId}
                          </td>
                          <td className='px-4 py-3'>
                            <PreferencesCell preferences={request.preferences} />
                          </td>
                          <td className='px-4 py-3'>
                            <div className='flex gap-2'>
                              <button
                                type='button'
                                onClick={() =>
                                  handleApproveAddOn(request.id, request.addOnId)
                                }
                                disabled={busy !== null}
                                className='rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50'
                              >
                                {busy === `approve-addon-${request.id}`
                                  ? '...'
                                  : 'Approve'}
                              </button>
                              <button
                                type='button'
                                onClick={() =>
                                  handleRemoveAddOn(request.id, request.addOnId)
                                }
                                disabled={busy !== null}
                                className='rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50'
                              >
                                {busy === `remove-addon-${request.id}` ? '...' : 'Remove'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
                Approved ({approvedRequests.length})
              </h3>
              <div className='mt-3 overflow-x-auto rounded-2xl border border-slate-200'>
                <table className='w-full min-w-[560px] text-left text-sm'>
                  <thead className='bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
                    <tr>
                      <th className='px-4 py-3'>Add-On</th>
                      <th className='px-4 py-3'>Preferences</th>
                      <th className='px-4 py-3'>Actions</th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-slate-200'>
                    {approvedRequests.length === 0 ? (
                      <tr>
                        <td className='px-4 py-3 text-slate-500' colSpan={3}>
                          No approved add-ons yet.
                        </td>
                      </tr>
                    ) : (
                      approvedRequests.map((request) => (
                        <tr key={request.id} className='bg-white'>
                          <td className='px-4 py-3 font-semibold text-slate-900'>
                            {request.addOn?.title ?? request.addOnId}
                          </td>
                          <td className='px-4 py-3'>
                            <PreferencesCell preferences={request.preferences} />
                          </td>
                          <td className='px-4 py-3'>
                            <button
                              type='button'
                              onClick={() => handleRemoveAddOn(request.id, request.addOnId)}
                              disabled={busy !== null}
                              className='rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50'
                            >
                              {busy === `remove-addon-${request.id}` ? '...' : 'Remove'}
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
