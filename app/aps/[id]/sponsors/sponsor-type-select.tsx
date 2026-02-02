'use client';

import { useTransition } from 'react';
import { updateSponsorType, type SponsorTypeValue } from '@/app/actions/event-content';

type SponsorTypeSelectProps = {
  sponsorId: string;
  eventId: string;
  value: string | null | undefined;
  disabled?: boolean;
};

const OPTIONS: { value: '' | SponsorTypeValue; label: string }[] = [
  { value: '', label: '—' },
  { value: 'BOOTH', label: 'Booth' },
  { value: 'TABLE', label: 'Table' },
  { value: 'NONE', label: 'None' },
];

export default function SponsorTypeSelect({
  sponsorId,
  eventId,
  value,
  disabled,
}: SponsorTypeSelectProps) {
  const [pending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const raw = e.target.value;
    const type: SponsorTypeValue | null = raw === '' ? null : (raw as SponsorTypeValue);
    startTransition(async () => {
      try {
        await updateSponsorType(sponsorId, eventId, type);
      } catch (err) {
        console.error('Failed to update sponsor type', err);
      }
    });
  }

  return (
    <select
      value={value ?? ''}
      onChange={handleChange}
      disabled={disabled || pending}
      className='w-full min-w-24 rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400 disabled:opacity-60'
      aria-label='Sponsor type'
    >
      {OPTIONS.map((opt) => (
        <option key={opt.value || '_'} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
