'use client';

import { useState } from 'react';
import SessionModal, { type SpeakerOption, type SponsorOption } from './session-modal';

export default function CreateSessionButton({
  eventId,
  agendaId,
  speakers,
  sponsors,
}: {
  eventId: string;
  agendaId: string | null;
  speakers: SpeakerOption[];
  sponsors: SponsorOption[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        className='inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
      >
        + Create session
      </button>

      <SessionModal
        eventId={eventId}
        agendaId={agendaId}
        speakers={speakers}
        sponsors={sponsors}
        mode='create'
        initialSession={null}
        isOpen={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}


