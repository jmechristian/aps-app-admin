'use client';

import { useState } from 'react';
import CreateSpeakerModal from './create-speaker-modal';
import type { RegistrantPickerItem } from '../registrant-picker';

export default function CreateSpeakerButton({
  eventId,
  registrants,
}: {
  eventId: string;
  registrants: RegistrantPickerItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
      >
        + Add speaker
      </button>

      <CreateSpeakerModal
        eventId={eventId}
        registrants={registrants}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}


