'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { type Registrant } from '@/app/actions/registrants';

type RegistrantsTableProps = {
  registrants: Registrant[];
  eventId: string;
  nextToken?: string | null;
  isFirstPage?: boolean;
  pageSize?: number;
};

export default function RegistrantsTable({
  registrants,
  eventId,
  nextToken = null,
  isFirstPage = true,
  pageSize = 50,
}: RegistrantsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRegistrants = useMemo(() => {
    if (!searchQuery.trim()) {
      return registrants;
    }

    const query = searchQuery.toLowerCase();
    return registrants.filter((registrant) => {
      const name = `${registrant.firstName || ''} ${registrant.lastName || ''}`.toLowerCase();
      const email = registrant.email.toLowerCase();
      const company = registrant.company?.name.toLowerCase() || '';
      const jobTitle = registrant.jobTitle?.toLowerCase() || '';
      const attendeeType = registrant.attendeeType.toLowerCase();
      const status = registrant.status.toLowerCase();

      return (
        name.includes(query) ||
        email.includes(query) ||
        company.includes(query) ||
        jobTitle.includes(query) ||
        attendeeType.includes(query) ||
        status.includes(query)
      );
    });
  }, [registrants, searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getAttendeeTypeLabel = (type: string) => {
    switch (type) {
      case 'OEM':
        return 'OEM';
      case 'TIER1':
        return 'Tier 1';
      case 'SOLUTIONPROVIDER':
        return 'Solution Provider';
      case 'SPONSOR':
        return 'Sponsor';
      case 'SPEAKER':
        return 'Speaker';
      case 'STAFF':
        return 'Staff';
      case 'EXHIBITOR':
        return 'Exhibitor';
      default:
        return type;
    }
  };

  return (
    <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-lg'>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h2 className='text-xl font-bold text-slate-900'>Registrants</h2>
          <p className='mt-1 text-sm text-slate-600'>
            Showing {filteredRegistrants.length} registrant
            {filteredRegistrants.length === 1 ? '' : 's'}
            {searchQuery.trim() ? ' (filtered on this page)' : ''}
          </p>
        </div>
        <div className='w-64'>
          <input
            type='text'
            placeholder='Search registrants...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
          />
        </div>
      </div>

      {filteredRegistrants.length === 0 ? (
        <div className='py-12 text-center'>
          <p className='text-slate-500'>
            {searchQuery ? 'No registrants match your search.' : 'No registrants found.'}
          </p>
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-slate-200'>
                <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Name
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Email
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Company
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Title
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Type
                </th>
                <th className='px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {filteredRegistrants.map((registrant) => {
                const name = `${registrant.firstName || ''} ${registrant.lastName || ''}`.trim() || 'N/A';
                return (
                  <tr
                    key={registrant.id}
                    className='transition hover:bg-slate-50'
                  >
                    <td className='px-4 py-3'>
                      <Link
                        href={`/aps/${eventId}/registrants/${registrant.id}`}
                        className='font-medium text-slate-900 hover:text-slate-700 hover:underline'
                      >
                        {name}
                      </Link>
                    </td>
                    <td className='px-4 py-3 text-sm text-slate-600'>{registrant.email}</td>
                    <td className='px-4 py-3 text-sm text-slate-600'>
                      {registrant.company?.name || '—'}
                    </td>
                    <td className='px-4 py-3 text-sm text-slate-600'>
                      {registrant.jobTitle || '—'}
                    </td>
                    <td className='px-4 py-3 text-sm text-slate-600'>
                      {getAttendeeTypeLabel(registrant.attendeeType)}
                    </td>
                    <td className='px-4 py-3'>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(registrant.status)}`}
                      >
                        {registrant.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {registrants.length > 0 ? (
        <div className='mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-xs text-slate-500'>
            Page size: {registrants.length}
            {typeof pageSize === 'number' ? ` / ${pageSize}` : ''}
          </p>
          <div className='flex items-center gap-2'>
            {!isFirstPage ? (
              <Link
                href={`/aps/${eventId}`}
                className='inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
              >
                ← First page
              </Link>
            ) : null}

            {nextToken ? (
              <Link
                href={`/aps/${eventId}?nextToken=${encodeURIComponent(nextToken)}`}
                className='inline-flex items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md'
              >
                Next {pageSize ?? 50} →
              </Link>
            ) : (
              <span className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500'>
                No more pages
              </span>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

