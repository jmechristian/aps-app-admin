'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import RegistrantPicker, {
  type RegistrantPickerItem,
} from '../registrant-picker';
import { createSpeakerFromRegistrantId } from '@/app/actions/speakers';

type CreateSpeakerModalProps = {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  registrants: RegistrantPickerItem[];
};

export default function CreateSpeakerModal({
  eventId,
  isOpen,
  onClose,
  registrants,
}: CreateSpeakerModalProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    registrantId: '',
  });

  const selectedRegistrant = useMemo(
    () => registrants.find((r) => r.id === formData.registrantId) ?? null,
    [registrants, formData.registrantId]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!formData.registrantId) {
      setError('Please select a registrant');
      setSubmitting(false);
      return;
    }

    try {
      await createSpeakerFromRegistrantId({
        eventId,
        registrantId: formData.registrantId,
      });

      onClose();
      setFormData({ registrantId: '' });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create speaker');
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <div className='relative page-container max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl'>
        <div className='sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4'>
          <div>
            <h2 className='text-2xl font-bold text-slate-900'>Create Speaker</h2>
            <p className='mt-1 text-sm text-slate-600'>
              Choose a registrant (person) to create an{' '}
              <span className='font-semibold'>APSSpeaker</span>.
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

          <div className='space-y-6'>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='md:col-span-2'>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Registrant <span className='text-red-500'>*</span>
                </label>
                <RegistrantPicker
                  registrants={registrants}
                  value={formData.registrantId}
                  onChange={(registrantId) =>
                    setFormData((p) => ({ ...p, registrantId }))
                  }
                  placeholder='Search registrants...'
                  disabled={submitting}
                />
                {selectedRegistrant && (
                  <p className='mt-2 text-xs text-slate-500'>
                    Selected:{' '}
                    <span className='font-semibold'>
                      {`${selectedRegistrant.firstName ?? ''} ${selectedRegistrant.lastName ?? ''}`.trim() ||
                        selectedRegistrant.email}
                    </span>
                  </p>
                )}
              </div>
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
              {submitting ? 'Creating…' : 'Create speaker'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


