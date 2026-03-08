'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import WysiwygEditor from '@/app/components/wysiwyg-editor';
import {
  updateAddOn,
  deleteAddOn,
} from '@/app/actions/add-ons';
import type { AddOnItem } from '@/app/actions/add-ons';

type AddOnEditFormProps = {
  addOn: AddOnItem;
  eventId: string;
};

export default function AddOnEditForm({ addOn, eventId }: AddOnEditFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: addOn.title,
    description: addOn.description,
    subheadline: addOn.subheadline ?? '',
    location: addOn.location,
    date: addOn.date,
    time: addOn.time,
    altLink: addOn.altLink ?? '',
    type: addOn.type ?? '',
    limit: addOn.limit != null ? String(addOn.limit) : '',
    price: addOn.price != null ? String(addOn.price) : '',
    preferenceSchema: addOn.preferenceSchema ?? '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const { title, description, location, date, time } = formData;
    if (!title || !description || !location || !date || !time) {
      setError('Please fill in all required fields');
      setSubmitting(false);
      return;
    }

    try {
      await updateAddOn(addOn.id, eventId, {
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
        preferenceSchema: formData.preferenceSchema.trim() || null,
      });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update add-on');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this add-on? This cannot be undone.')) return;
    setDeleting(true);
    setError(null);
    try {
      await deleteAddOn(addOn.id, eventId);
      router.push(`/aps/${eventId}/add-ons`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete add-on');
      setDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mt-6'>
      {error && (
        <div className='mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800'>
          {error}
        </div>
      )}

      <div className='grid gap-4 md:grid-cols-2'>
        <div className='md:col-span-2'>
          <label className='mb-1 block text-sm font-medium text-slate-700'>Title *</label>
          <input
            type='text'
            value={formData.title}
            onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
            required
            disabled={submitting}
          />
        </div>

        <div className='md:col-span-2'>
          <label className='mb-1 block text-sm font-medium text-slate-700'>Description *</label>
          <WysiwygEditor
            value={formData.description}
            onChange={(html) => setFormData((p) => ({ ...p, description: html }))}
            placeholder='Write add-on description…'
            disabled={submitting}
          />
        </div>

        <div className='md:col-span-2'>
          <label className='mb-1 block text-sm font-medium text-slate-700'>Subheadline</label>
          <input
            type='text'
            value={formData.subheadline}
            onChange={(e) => setFormData((p) => ({ ...p, subheadline: e.target.value }))}
            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
            disabled={submitting}
          />
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>Location *</label>
          <input
            type='text'
            value={formData.location}
            onChange={(e) => setFormData((p) => ({ ...p, location: e.target.value }))}
            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>Date *</label>
          <input
            type='text'
            value={formData.date}
            onChange={(e) => setFormData((p) => ({ ...p, date: e.target.value }))}
            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>Time *</label>
          <input
            type='text'
            value={formData.time}
            onChange={(e) => setFormData((p) => ({ ...p, time: e.target.value }))}
            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
            required
            disabled={submitting}
          />
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>Limit</label>
          <input
            type='number'
            min={1}
            value={formData.limit}
            onChange={(e) => setFormData((p) => ({ ...p, limit: e.target.value }))}
            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
            disabled={submitting}
          />
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>Price ($)</label>
          <input
            type='number'
            min={0}
            value={formData.price}
            onChange={(e) => setFormData((p) => ({ ...p, price: e.target.value }))}
            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
            disabled={submitting}
          />
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>Type</label>
          <input
            type='text'
            value={formData.type}
            onChange={(e) => setFormData((p) => ({ ...p, type: e.target.value }))}
            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
            disabled={submitting}
          />
        </div>

        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>Alt Link</label>
          <input
            type='url'
            value={formData.altLink}
            onChange={(e) => setFormData((p) => ({ ...p, altLink: e.target.value }))}
            className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
            disabled={submitting}
          />
        </div>

        <div className='md:col-span-2'>
          <label className='mb-1 block text-sm font-medium text-slate-700'>
            Preference Schema (JSON)
          </label>
          <textarea
            value={formData.preferenceSchema}
            onChange={(e) =>
              setFormData((p) => ({ ...p, preferenceSchema: e.target.value }))
            }
            rows={4}
            placeholder='[{"key":"field","label":"Label","type":"text"}]'
            className='w-full rounded-lg border border-slate-300 px-4 py-2 font-mono text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
            disabled={submitting}
          />
          <p className='mt-1 text-xs text-slate-500'>
            Optional. JSON array of preference fields for registrants.
          </p>
        </div>
      </div>

      <div className='mt-6 flex flex-wrap items-center gap-3'>
        <button
          type='submit'
          disabled={submitting}
          className='rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50'
        >
          {submitting ? 'Saving...' : 'Save changes'}
        </button>
        <button
          type='button'
          onClick={handleDelete}
          disabled={submitting || deleting}
          className='rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:opacity-50'
        >
          {deleting ? 'Deleting...' : 'Delete add-on'}
        </button>
      </div>
    </form>
  );
}
