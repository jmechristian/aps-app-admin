'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { deleteCompany, detachCompanyFromEvent } from '@/app/actions/companies';

type CompanyRow = {
  id: string;
  name: string;
  email: string;
  type?: string | null;
  website?: string | null;
  phone?: string | null;
};

export default function CompaniesTable({
  eventId,
  companies,
}: {
  eventId: string;
  companies: CompanyRow[];
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const base = companies.slice().sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    if (!query) return base;
    return base.filter((company) => {
      const haystack = [
        company.name,
        company.email,
        company.type ?? '',
        company.website ?? '',
        company.phone ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [companies, searchQuery]);

  return (
    <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h2 className='text-xl font-bold text-slate-900'>Companies</h2>
          <p className='mt-1 text-sm text-slate-600'>
            {filtered.length} compan{filtered.length === 1 ? 'y' : 'ies'} found.
          </p>
        </div>
        <div className='w-full sm:w-72'>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search companies...'
            className='w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className='mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
          No companies match your search yet.
        </div>
      ) : (
        <div className='mt-6 overflow-hidden rounded-2xl border border-slate-200'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
              <tr>
                <th className='px-4 py-3'>Company</th>
                <th className='px-4 py-3'>Email</th>
                <th className='px-4 py-3'>Type</th>
                <th className='px-4 py-3'>Website</th>
                <th className='px-4 py-3'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200'>
              {filtered.map((company) => (
                <tr key={company.id} className='bg-white'>
                  <td className='px-4 py-3 font-semibold text-slate-900'>
                    <Link
                      href={`/aps/${eventId}/companies/${company.id}`}
                      className='hover:underline'
                    >
                      {company.name}
                    </Link>
                  </td>
                  <td className='px-4 py-3 text-slate-700'>
                    {company.email}
                  </td>
                  <td className='px-4 py-3 text-slate-700'>
                    {company.type ?? '—'}
                  </td>
                  <td className='px-4 py-3 text-slate-700'>
                    {company.website ?? '—'}
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex flex-col gap-2 sm:flex-row'>
                      <form
                        action={detachCompanyFromEvent}
                        onSubmit={(e) => {
                          if (
                            !window.confirm(
                              `Remove ${company.name} from this event?`
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <input type='hidden' name='companyId' value={company.id} />
                        <input type='hidden' name='eventId' value={eventId} />
                        <button
                          type='submit'
                          className='inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:shadow-md'
                        >
                          Remove from event
                        </button>
                      </form>
                      <form
                        action={deleteCompany}
                        onSubmit={(e) => {
                          if (
                            !window.confirm(
                              `Delete ${company.name}? This cannot be undone.`
                            )
                          ) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <input type='hidden' name='id' value={company.id} />
                        <input type='hidden' name='eventId' value={eventId} />
                        <button
                          type='submit'
                          className='inline-flex items-center justify-center rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50 hover:shadow-md'
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
