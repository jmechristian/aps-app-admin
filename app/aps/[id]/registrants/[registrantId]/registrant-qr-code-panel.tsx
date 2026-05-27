'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { regenerateRegistrantQRCode } from '@/app/actions/registrants';

type RegistrantQrCodePanelProps = {
  eventId: string;
  registrantId: string;
  qrCode: string | null;
  vCardPreview: string;
};

type ActionState = {
  ok: boolean;
  message: string;
};

const initialState: ActionState = { ok: false, message: '' };

function RegenerateButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60'
    >
      {pending ? 'Regenerating…' : 'Regenerate QR code'}
    </button>
  );
}

export default function RegistrantQrCodePanel({
  eventId,
  registrantId,
  qrCode,
  vCardPreview,
}: RegistrantQrCodePanelProps) {
  const router = useRouter();
  const [cacheKey, setCacheKey] = useState(0);
  const [state, action] = useActionState(
    regenerateRegistrantQRCode,
    initialState,
  );

  useEffect(() => {
    if (state.ok) {
      setCacheKey(Date.now());
      router.refresh();
    }
  }, [state.ok, router]);

  return (
    <div className='w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
      <div className='mb-4 flex flex-wrap items-start justify-between gap-3'>
        <h3 className='text-lg font-semibold text-slate-900'>QR Code</h3>
        <form action={action} className='flex items-center gap-3'>
          <input type='hidden' name='registrantId' value={registrantId} />
          <input type='hidden' name='eventId' value={eventId} />
          <RegenerateButton />
          {state.message ? (
            <p
              className={`text-sm ${
                state.ok ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {state.message}
            </p>
          ) : null}
        </form>
      </div>

      {qrCode ? (
        <div className='flex justify-center'>
          <img
            src={cacheKey ? `${qrCode}?v=${cacheKey}` : qrCode}
            alt='Registrant QR Code'
            width={256}
            height={256}
            className='rounded-lg'
          />
        </div>
      ) : (
        <div className='rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center'>
          <p className='text-sm font-semibold text-slate-700'>No QR code yet</p>
          <p className='mt-1 text-xs text-slate-500'>
            Click regenerate to create a QR code from the current registrant info.
          </p>
        </div>
      )}

      <div className='mt-6'>
        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
          Encoded vCard preview
        </p>
        <pre className='mt-2 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700'>
          {vCardPreview}
        </pre>
      </div>
    </div>
  );
}
