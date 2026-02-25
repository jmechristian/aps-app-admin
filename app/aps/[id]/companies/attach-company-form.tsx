'use client';

import { useMemo, useState } from 'react';
import { attachCompanyToEvent } from '@/app/actions/companies';

type CompanyOption = {
  id: string;
  name: string;
  email: string;
  type?: string | null;
};

export default function AttachCompanyForm({
  eventId,
  companies,
}: {
  eventId: string;
  companies: CompanyOption[];
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return companies;
    return companies.filter((company) => {
      const haystack = [company.name, company.email, company.type ?? '']
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [companies, searchQuery]);

  if (companies.length === 0) {
    return (
      <div className='mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
        All companies are already attached to this event.
      </div>
    );
  }

  return (
    <div className='mt-4 space-y-3'>
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder='Search companies...'
        className='w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
      />

      {filtered.length === 0 ? (
        <div className='rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
          No matching companies found.
        </div>
      ) : (
        <div className='max-h-72 space-y-2 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2'>
          {filtered.map((company) => (
            <form
              key={company.id}
              action={attachCompanyToEvent}
              className='flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3'
            >
              <input type='hidden' name='eventId' value={eventId} />
              <input type='hidden' name='companyId' value={company.id} />
              <div>
                <p className='text-sm font-semibold text-slate-900'>
                  {company.name}
                </p>
                <p className='text-xs text-slate-600'>{company.email}</p>
              </div>
              <button
                type='submit'
                className='inline-flex items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
              >
                Attach
              </button>
            </form>
          ))}
        </div>
      )}
    </div>
  );
}
