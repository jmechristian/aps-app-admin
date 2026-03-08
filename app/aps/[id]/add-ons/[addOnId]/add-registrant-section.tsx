'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import RegistrantPicker, {
  type RegistrantPickerItem,
} from '../../registrant-picker';
import { requestAddOn } from '@/app/actions/add-ons';
import type { AddOnItem } from '@/app/actions/add-ons';

type PrefField = {
  key: string;
  label?: string;
  type?: string;
  options?: string[];
};

type AddRegistrantSectionProps = {
  eventId: string;
  addOnId: string;
  addOn: AddOnItem;
  registrants: RegistrantPickerItem[];
  existingRegistrantIds: string[];
};

function parsePreferenceSchema(schema: string | null | undefined): PrefField[] {
  if (!schema || !schema.trim()) return [];
  try {
    const parsed = JSON.parse(schema) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is PrefField =>
        item && typeof item === 'object' && typeof (item as PrefField).key === 'string'
    );
  } catch {
    return [];
  }
}

export default function AddRegistrantSection({
  eventId,
  addOnId,
  addOn,
  registrants,
  existingRegistrantIds,
}: AddRegistrantSectionProps) {
  const router = useRouter();
  const [registrantId, setRegistrantId] = useState('');
  const [preferences, setPreferences] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schemaFields = useMemo(
    () => parsePreferenceSchema(addOn.preferenceSchema ?? null),
    [addOn.preferenceSchema]
  );

  const availableRegistrants = useMemo(
    () =>
      registrants.filter((r) => !existingRegistrantIds.includes(r.id)),
    [registrants, existingRegistrantIds]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!registrantId) {
      setError('Please select a registrant');
      return;
    }
    setSubmitting(true);
    setError(null);

    try {
      const prefs: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(preferences)) {
        if (v != null && String(v).trim() !== '') prefs[k] = v;
      }
      await requestAddOn(
        addOnId,
        registrantId,
        eventId,
        Object.keys(prefs).length > 0 ? prefs : null
      );
      setRegistrantId('');
      setPreferences({});
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add registrant');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mt-6'>
      {error && (
        <div className='mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800'>
          {error}
        </div>
      )}

      <div className='space-y-4'>
        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>
            Registrant <span className='text-red-500'>*</span>
          </label>
          <RegistrantPicker
            registrants={availableRegistrants}
            value={registrantId}
            onChange={setRegistrantId}
            placeholder='Select a registrant...'
            disabled={submitting}
          />
          {availableRegistrants.length === 0 && (
            <p className='mt-2 text-sm text-slate-600'>
              All registrants have already been added to this add-on.
            </p>
          )}
        </div>

        {schemaFields.length > 0 && (
          <div className='space-y-3'>
            <label className='block text-sm font-medium text-slate-700'>
              Preferences
            </label>
            {schemaFields.map((field) => (
              <div key={field.key}>
                <label className='mb-1 block text-xs text-slate-600'>
                  {field.label ?? field.key}
                </label>
                {field.type === 'select' && field.options?.length ? (
                  <select
                    value={preferences[field.key] ?? ''}
                    onChange={(e) =>
                      setPreferences((p) => ({
                        ...p,
                        [field.key]: e.target.value,
                      }))
                    }
                    className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
                    disabled={submitting}
                  >
                    <option value=''>—</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type='text'
                    value={preferences[field.key] ?? ''}
                    onChange={(e) =>
                      setPreferences((p) => ({
                        ...p,
                        [field.key]: e.target.value,
                      }))
                    }
                    className='w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400'
                    disabled={submitting}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <button
          type='submit'
          disabled={submitting || availableRegistrants.length === 0}
          className='rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50'
        >
          {submitting ? 'Adding...' : 'Add registrant'}
        </button>
      </div>
    </form>
  );
}
