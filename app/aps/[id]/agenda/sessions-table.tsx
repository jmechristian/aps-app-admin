'use client';

import { useMemo, useState } from 'react';
import SessionModal, {
  type AgendaSessionRow,
  type SpeakerOption,
  type SponsorOption,
} from './session-modal';

const EMBED_ROW_COLORS = [
  {
    code: 'al1854ha7xer',
    label: 'Part 1',
    row: 'bg-sky-100 hover:bg-sky-200',
    swatch: 'bg-sky-100',
  },
  {
    code: 'al46nabi75b1',
    label: 'Part 2',
    row: 'bg-amber-100 hover:bg-amber-200',
    swatch: 'bg-amber-100',
  },
  {
    code: 'al93b2x93cpp',
    label: 'Part 3',
    row: 'bg-emerald-100 hover:bg-emerald-200',
    swatch: 'bg-emerald-100',
  },
  {
    code: 'aldb1z413rzk',
    label: 'Part 4',
    row: 'bg-rose-100 hover:bg-rose-200',
    swatch: 'bg-rose-100',
  },
] as const;

function rowBackgroundForEmbed(embedUrl?: string | null) {
  const normalized = (embedUrl ?? '').trim().toLowerCase();
  return (
    EMBED_ROW_COLORS.find((color) => normalized.includes(color.code))?.row ??
    'bg-white hover:bg-slate-50'
  );
}

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
      <div className='mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-700'>
        <span className='font-semibold uppercase tracking-[0.16em] text-slate-500'>
          Embed session
        </span>
        {EMBED_ROW_COLORS.map((color) => (
          <span
            key={color.code}
            className='inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1'
          >
            <span
              className={`h-3 w-3 rounded-full ring-1 ring-slate-300 ${color.swatch}`}
            />
            <span className='font-medium text-slate-800'>{color.label}</span>
            <span className='font-mono text-[11px] text-slate-500'>
              {color.code}
            </span>
          </span>
        ))}
      </div>

      <div className='mt-3 overflow-hidden rounded-2xl border border-slate-200'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
            <tr>
              <th className='px-4 py-3'>Title</th>
              <th className='px-4 py-3'>Date</th>
              <th className='px-4 py-3'>Time (EST)</th>
              <th className='px-4 py-3'>Speakers</th>
              <th className='px-4 py-3'>Sponsors</th>
              <th className='px-4 py-3'>Location</th>
              <th className='px-4 py-3'>Embed URL</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {rows.map((s) => (
              <tr
                key={s.id}
                className={`cursor-pointer ${rowBackgroundForEmbed(s.embedUrl)}`}
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
                <td className='px-4 py-3 text-slate-700'>
                  {s.embedUrl ? (
                    <a
                      href={s.embedUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='block max-w-[18rem] truncate text-blue-700 underline decoration-blue-300 underline-offset-2 hover:text-blue-800'
                      onClick={(e) => e.stopPropagation()}
                    >
                      {s.embedUrl}
                    </a>
                  ) : (
                    '—'
                  )}
                </td>
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


