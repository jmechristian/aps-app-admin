'use client';

import { useState } from 'react';
import CreateExhibitorModal from './create-exhibitor-modal';
import type { CompanyPickerItem } from '../company-picker';

export default function CreateExhibitorButton({
  eventId,
  companies,
}: {
  eventId: string;
  companies: CompanyPickerItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
      >
        + Add exhibitor
      </button>

      <CreateExhibitorModal
        eventId={eventId}
        companies={companies}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}


