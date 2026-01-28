'use client';

import { useMemo, useState } from 'react';
import SessionModal, {
  type AgendaSessionRow,
  type SpeakerOption,
  type SponsorOption,
} from './session-modal';

export default function SessionsTable({
  eventId,
  agendaId,
  sessions,
  speakers,
  sponsors,
}: {
  eventId: string;
  agendaId: string | null;
  sessions: AgendaSessionRow[];
  speakers: SpeakerOption[];
  sponsors: SponsorOption[];
}) {
  const [editing, setEditing] = useState<AgendaSessionRow | null>(null);

  const rows = useMemo(() => sessions, [sessions]);

  if (rows.length === 0) return null;

  return (
    <>
      <div className='mt-6 overflow-hidden rounded-2xl border border-slate-200'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
            <tr>
              <th className='px-4 py-3'>Title</th>
              <th className='px-4 py-3'>Date</th>
              <th className='px-4 py-3'>Time (EST)</th>
              <th className='px-4 py-3'>Speakers</th>
              <th className='px-4 py-3'>Sponsors</th>
              <th className='px-4 py-3'>Location</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {rows.map((s) => (
              <tr
                key={s.id}
                className='cursor-pointer bg-white hover:bg-slate-50'
                onClick={() => setEditing(s)}
              >
                <td className='px-4 py-3 font-semibold text-slate-900'>
                  {s.title || '—'}
                </td>
                <td className='px-4 py-3 text-slate-700'>{s.date || '—'}</td>
                <td className='px-4 py-3 text-slate-700'>
                  {s.startTime || s.endTime
                    ? `${s.startTime || '—'} – ${s.endTime || '—'}`
                    : '—'}
                </td>
                <td className='px-4 py-3 text-slate-700'>
                  <span className='block max-w-[22rem] truncate'>
                    {s.speakerNames?.length ? s.speakerNames.join(', ') : '—'}
                  </span>
                </td>
                <td className='px-4 py-3 text-slate-700'>
                  <span className='block max-w-[22rem] truncate'>
                    {s.sponsorNames?.length ? s.sponsorNames.join(', ') : '—'}
                  </span>
                </td>
                <td className='px-4 py-3 text-slate-700'>{s.location || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <SessionModal
        eventId={eventId}
        agendaId={agendaId}
        speakers={speakers}
        sponsors={sponsors}
        mode='edit'
        initialSession={editing}
        isOpen={!!editing}
        onClose={() => setEditing(null)}
      />
    </>
  );
}


