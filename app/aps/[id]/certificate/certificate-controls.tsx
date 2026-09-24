'use client';

import { useFormStatus } from 'react-dom';

function LockButtons() {
  const { pending } = useFormStatus();
  return (
    <div className='flex flex-wrap gap-3'>
      <button
        type='submit'
        name='open'
        value='true'
        disabled={pending}
        className='inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm disabled:opacity-60'
      >
        {pending ? 'Saving...' : 'Unlock'}
      </button>
      <button
        type='submit'
        name='open'
        value='false'
        disabled={pending}
        className='inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm disabled:opacity-60'
      >
        Lock
      </button>
    </div>
  );
}

export function CertificateControls({
  eventId,
  open,
  url,
  action,
}: {
  eventId: string;
  open: boolean;
  url: string;
  action: (formData: FormData) => void | Promise<void>;
}) {
  return (
    <form action={action} className='flex flex-col gap-4'>
      <input type='hidden' name='eventId' value={eventId} />
      <p className={open ? 'text-sm font-semibold text-emerald-700' : 'text-sm font-semibold text-amber-800'}>
        {open ? 'Unlocked for attendees' : 'Locked'}
      </p>
      <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
        Certificate page
        <input
          name='url'
          defaultValue={url}
          placeholder='https://'
          className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 font-normal text-slate-900 shadow-sm outline-none transition focus:border-slate-400'
        />
      </label>
      <LockButtons />
    </form>
  );
}
