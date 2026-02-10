'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import StorageImage from '@/app/components/storage-image';
import CompanyLogoField from '../../companies/[companyId]/company-logo-field';
import { updateCompanyLogo } from '@/app/actions/companies';

type CompanyLogoFormProps = {
  companyId: string;
  eventId: string;
  registrantId: string;
  logo?: string | null;
};

type ActionState = { ok: boolean; message: string };

const initialState: ActionState = { ok: false, message: '' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='inline-flex items-center justify-center rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60'
    >
      {pending ? 'Saving...' : 'Save logo'}
    </button>
  );
}

export default function CompanyLogoForm({
  companyId,
  eventId,
  registrantId,
  logo,
}: CompanyLogoFormProps) {
  const [state, action] = useActionState(updateCompanyLogo, initialState);

  if (logo) {
    return (
      <div className='mt-4 flex items-center gap-3'>
        <div className='h-16 w-16 overflow-hidden rounded-xl border border-slate-200 bg-slate-50'>
          <StorageImage
            srcOrKey={logo}
            alt='Company logo'
            className='h-full w-full object-contain'
            accessLevel='guest'
          />
        </div>
        <p className='text-sm text-slate-600'>Logo on file</p>
      </div>
    );
  }

  return (
    <form action={action} className='mt-4 space-y-3'>
      <input type='hidden' name='id' value={companyId} />
      <input type='hidden' name='eventId' value={eventId} />
      <input type='hidden' name='registrantId' value={registrantId} />
      <CompanyLogoField companyId={companyId} />
      <div className='flex items-center justify-between'>
        <SubmitButton />
        {state.message ? (
          <p
            className={`text-xs ${
              state.ok ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
