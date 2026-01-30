'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchAuthSession } from 'aws-amplify/auth';
import CompanyPicker, { type CompanyPickerItem } from '../company-picker';
import { ensureAmplifyConfigured, graphqlClient } from '@/src/amplify-client';
import {
  createApsAppExhibitorProfile,
  createApsSponsor,
  createAPSCompany,
  updateApsAppExhibitorProfile,
} from '@/src/graphql/mutations';
import {
  apsAppExhibitorProfilesByCompanyId,
  apsSponsorsByCompanyId,
} from '@/src/graphql/queries';
import { CompanyType } from '@/src/API';

type CreateSponsorModalProps = {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  companies: CompanyPickerItem[];
};

export default function CreateSponsorModal({
  eventId,
  isOpen,
  onClose,
  companies,
}: CreateSponsorModalProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState('');
  const [companyOptions, setCompanyOptions] = useState<CompanyPickerItem[]>(companies);
  const [showNewCompany, setShowNewCompany] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCompanyEmail, setNewCompanyEmail] = useState('');
  const [newCompanyType, setNewCompanyType] = useState<CompanyType>(
    CompanyType.SPONSOR
  );
  const [alsoExhibitor, setAlsoExhibitor] = useState(false);

  const selectedCompanyName = useMemo(
    () => companyOptions.find((c) => c.id === companyId)?.name ?? null,
    [companyOptions, companyId]
  );

  useEffect(() => {
    if (!isOpen) return;
    setCompanyOptions(companies);
  }, [companies, isOpen]);

  async function handleCreateCompany(e?: React.SyntheticEvent) {
    e?.preventDefault();
    setSubmitting(true);
    setError(null);

    const name = newCompanyName.trim();
    const email = newCompanyEmail.trim();

    if (!name || !email) {
      setError('Company name and email are required');
      setSubmitting(false);
      return;
    }

    try {
      ensureAmplifyConfigured();
      await fetchAuthSession();

      const res = await graphqlClient.graphql({
        query: createAPSCompany,
        variables: {
          input: {
            name,
            email,
            type: newCompanyType,
            eventId,
          },
        },
        authMode: 'userPool',
      });

      const created = (res as any).data?.createAPSCompany as
        | { id: string; name: string }
        | undefined;
      if (!created?.id) throw new Error('Failed to create company');

      const nextCompany: CompanyPickerItem = {
        id: created.id,
        name: created.name,
      };
      setCompanyOptions((prev) => [nextCompany, ...prev]);
      setCompanyId(created.id);
      setShowNewCompany(false);
      setNewCompanyName('');
      setNewCompanyEmail('');
      setNewCompanyType(CompanyType.SPONSOR);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create company');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!companyId) {
      setError('Please select a company');
      setSubmitting(false);
      return;
    }

    try {
      ensureAmplifyConfigured();
      await fetchAuthSession();

      const existingSponsors = await graphqlClient.graphql({
        query: apsSponsorsByCompanyId,
        variables: { companyId, limit: 1 },
        authMode: 'userPool',
      });
      const sponsorItems =
        (existingSponsors as any).data?.apsSponsorsByCompanyId?.items ?? [];
      if (sponsorItems.length) {
        throw new Error('This company already has a sponsor.');
      }

      const res = await graphqlClient.graphql({
        query: createApsSponsor,
        variables: { input: { eventId, companyId } },
        authMode: 'userPool',
      });

      const id = (res as any).data?.createApsSponsor?.id as string | undefined;
      if (!id) throw new Error('Failed to create sponsor');

      if (alsoExhibitor) {
        const existingExhibitors = await graphqlClient.graphql({
          query: apsAppExhibitorProfilesByCompanyId,
          variables: { companyId, limit: 1 },
          authMode: 'userPool',
        });
        const exhibitorItems =
          (existingExhibitors as any).data?.apsAppExhibitorProfilesByCompanyId
            ?.items ?? [];
        const existing = exhibitorItems?.[0] ?? null;

        if (existing?.id) {
          await graphqlClient.graphql({
            query: updateApsAppExhibitorProfile,
            variables: { input: { id: existing.id, sponsorId: id } },
            authMode: 'userPool',
          });
        } else {
          await graphqlClient.graphql({
            query: createApsAppExhibitorProfile,
            variables: { input: { eventId, companyId, sponsorId: id } },
            authMode: 'userPool',
          });
        }
      }

      onClose();
      setCompanyId('');
      setAlsoExhibitor(false);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create sponsor');
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='relative page-container overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl'>
        <div className='flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4'>
          <div>
            <h2 className='text-2xl font-bold text-slate-900'>Create Sponsor</h2>
            <p className='mt-1 text-sm text-slate-600'>
              Choose a company or add a new one for this event.
            </p>
          </div>
          <button
            onClick={onClose}
            className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'
            aria-label='Close'
          >
            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6'>
          {error && (
            <div className='mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800'>
              {error}
            </div>
          )}

          <div className='space-y-4'>
            <div>
              <label className='mb-1 block text-sm font-medium text-slate-700'>
                Company <span className='text-red-500'>*</span>
              </label>
              <CompanyPicker
                companies={companyOptions}
                value={companyId}
                onChange={(id) => setCompanyId(id)}
                placeholder='Search companies...'
                disabled={submitting}
              />
              {selectedCompanyName && (
                <p className='mt-2 text-xs text-slate-500'>
                  Selected: <span className='font-semibold'>{selectedCompanyName}</span>
                </p>
              )}
              <label className='mt-4 flex items-center gap-2 text-sm font-semibold text-slate-700'>
                <input
                  type='checkbox'
                  checked={alsoExhibitor}
                  onChange={(e) => setAlsoExhibitor(e.target.checked)}
                  disabled={submitting}
                  className='h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900'
                />
                Also an Exhibitor?
              </label>
              <button
                type='button'
                className='mt-3 text-sm font-semibold text-slate-700 hover:text-slate-900'
                onClick={() => setShowNewCompany((v) => !v)}
                disabled={submitting}
              >
                {showNewCompany ? 'Cancel new company' : 'Add a new company'}
              </button>
            </div>

            {showNewCompany ? (
              <div className='rounded-xl border border-slate-200 bg-slate-50 p-4'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <label className='text-sm font-medium text-slate-700'>
                    Company name <span className='text-red-500'>*</span>
                    <input
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                      value={newCompanyName}
                      onChange={(e) => setNewCompanyName(e.target.value)}
                      disabled={submitting}
                    />
                  </label>
                  <label className='text-sm font-medium text-slate-700'>
                    Email <span className='text-red-500'>*</span>
                    <input
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                      value={newCompanyEmail}
                      onChange={(e) => setNewCompanyEmail(e.target.value)}
                      disabled={submitting}
                    />
                  </label>
                  <label className='text-sm font-medium text-slate-700'>
                    Company type
                    <select
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                      value={newCompanyType}
                      onChange={(e) =>
                        setNewCompanyType(e.target.value as CompanyType)
                      }
                      disabled={submitting}
                    >
                      <option value={CompanyType.SPONSOR}>SPONSOR</option>
                      <option value={CompanyType.OEMTIER1}>OEM/Tier 1</option>
                      <option value={CompanyType.SOLUTIONPROVIDER}>
                        Solution Provider
                      </option>
                    </select>
                  </label>
                </div>
                <div className='mt-4 flex justify-end'>
                  <button
                    type='button'
                    onClick={handleCreateCompany}
                    className='rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:opacity-60'
                    disabled={submitting}
                  >
                    {submitting ? 'Creating…' : 'Create company'}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div className='mt-6 flex items-center justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
              disabled={submitting}
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={submitting}
              className='rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:opacity-60'
            >
              {submitting ? 'Creating…' : 'Create sponsor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


