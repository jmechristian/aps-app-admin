'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WysiwygEditor from '@/app/components/wysiwyg-editor';
import { createAddOn } from '@/app/actions/add-ons';

type CreateAddOnModalProps = {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function CreateAddOnModal({
  eventId,
  isOpen,
  onClose,
}: CreateAddOnModalProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subheadline: '',
    location: '',
    date: '',
    time: '',
    altLink: '',
    type: '',
    limit: '',
    price: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { title, description, location, date, time } = formData;
    if (!title || !description || !location || !date || !time) {
      setError('Please fill in all required fields (Title, Description, Location, Date, Time)');
      setSubmitting(false);
      return;
    }

    try {
      await createAddOn(eventId, {
        title,
        description,
        subheadline: formData.subheadline || null,
        location,
        date,
        time,
        altLink: formData.altLink || null,
        type: formData.type || null,
        limit: formData.limit ? parseInt(formData.limit, 10) : null,
        price: formData.price ? parseInt(formData.price, 10) : null,
      });

      onClose();
      setFormData({
        title: '',
        description: '',
        subheadline: '',
        location: '',
        date: '',
        time: '',
        altLink: '',
        type: '',
        limit: '',
        price: '',
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create add-on');
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
            <h2 className='text-2xl font-bold text-slate-900'>Create Add-On</h2>
            <p className='mt-1 text-sm text-slate-600'>
              Add a new add-on for this event.
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
                  Title <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, title: e.target.value }))
                  }
                  className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
                  required
                  disabled={submitting}
                />
              </div>

              <div className='md:col-span-2'>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Description <span className='text-red-500'>*</span>
                </label>
                <WysiwygEditor
                  value={formData.description}
                  onChange={(html) =>
                    setFormData((p) => ({ ...p, description: html }))
                  }
                  placeholder='Write add-on description…'
                  disabled={submitting}
                />
              </div>

              <div className='md:col-span-2'>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Subheadline
                </label>
                <input
                  type='text'
                  value={formData.subheadline}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, subheadline: e.target.value }))
                  }
                  className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
                  disabled={submitting}
                />
              </div>

              <div>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Location <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, location: e.target.value }))
                  }
                  className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Date <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={formData.date}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, date: e.target.value }))
                  }
                  placeholder='e.g. Jan 15, 2025'
                  className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Time <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  value={formData.time}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, time: e.target.value }))
                  }
                  placeholder='e.g. 9:00 AM'
                  className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Limit
                </label>
                <input
                  type='number'
                  min={1}
                  value={formData.limit}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, limit: e.target.value }))
                  }
                  className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
                  disabled={submitting}
                />
              </div>

              <div>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Price ($)
                </label>
                <input
                  type='number'
                  min={0}
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, price: e.target.value }))
                  }
                  className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
                  disabled={submitting}
                />
              </div>

              <div>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Type
                </label>
                <input
                  type='text'
                  value={formData.type}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, type: e.target.value }))
                  }
                  placeholder='e.g. Workshop, Tour'
                  className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
                  disabled={submitting}
                />
              </div>

              <div>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Alt Link
                </label>
                <input
                  type='url'
                  value={formData.altLink}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, altLink: e.target.value }))
                  }
                  placeholder='https://...'
                  className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
                  disabled={submitting}
                />
              </div>
            </div>
          </div>

          <div className='mt-6 flex justify-end gap-3'>
            <button
              type='button'
              onClick={onClose}
              className='rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={submitting}
              className='rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 disabled:opacity-50'
            >
              {submitting ? 'Creating...' : 'Create Add-On'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
