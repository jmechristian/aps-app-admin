'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import CompanyPicker, { type CompanyPickerItem } from '../company-picker';
import { createExhibitorProfile } from '@/app/actions/exhibitors';

type CreateExhibitorModalProps = {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  companies: CompanyPickerItem[];
};

export default function CreateExhibitorModal({
  eventId,
  isOpen,
  onClose,
  companies,
}: CreateExhibitorModalProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    companyId: '',
    boothNumber: '',
  });

  const selectedCompanyName = useMemo(
    () => companies.find((c) => c.id === formData.companyId)?.name ?? null,
    [companies, formData.companyId]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!formData.companyId) {
      setError('Please select a company');
      setSubmitting(false);
      return;
    }

    try {
      await createExhibitorProfile({
        eventId,
        companyId: formData.companyId,
        boothNumber: formData.boothNumber || null,
      });
      onClose();
      setFormData({ companyId: '', boothNumber: '' });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create exhibitor');
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
            <h2 className='text-2xl font-bold text-slate-900'>
              Create Exhibitor Profile
            </h2>
            <p className='mt-1 text-sm text-slate-600'>
              Choose a company (filtered to companies with registrants).
            </p>
          </div>
          <button
            onClick={onClose}
            className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'
            aria-label='Close'
          >
            <svg
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
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
                companies={companies}
                value={formData.companyId}
                onChange={(companyId) =>
                  setFormData((p) => ({ ...p, companyId }))
                }
                placeholder='Search companies...'
                disabled={submitting}
              />
              {selectedCompanyName && (
                <p className='mt-2 text-xs text-slate-500'>
                  Selected: <span className='font-semibold'>{selectedCompanyName}</span>
                </p>
              )}
            </div>

            <div>
              <label className='mb-1 block text-sm font-medium text-slate-700'>
                Booth number
              </label>
              <input
                value={formData.boothNumber}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, boothNumber: e.target.value }))
                }
                className='w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
              />
            </div>
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
              {submitting ? 'Creating…' : 'Create exhibitor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


