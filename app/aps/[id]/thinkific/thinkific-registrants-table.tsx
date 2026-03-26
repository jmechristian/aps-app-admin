'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Registrant } from '@/app/actions/registrants';
import type { ThinkificRegistrantSummary } from '@/app/actions/thinkific';

type ThinkificRegistrantsTableProps = {
  registrants: Registrant[];
  allRegistrants: Registrant[];
  summariesByRegistrantId: Record<string, ThinkificRegistrantSummary>;
  eventId: string;
  nextToken?: string | null;
  isFirstPage?: boolean;
  pageSize?: number;
};

function formatProgress(value: number) {
  return `${value.toFixed(1)}%`;
}

export default function ThinkificRegistrantsTable({
  registrants,
  allRegistrants,
  summariesByRegistrantId,
  eventId,
  nextToken = null,
  isFirstPage = true,
  pageSize = 50,
}: ThinkificRegistrantsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const totalPages = Math.max(
    1,
    Math.ceil(allRegistrants.length / (pageSize && pageSize > 0 ? pageSize : 50)),
  );

  const filteredRegistrants = useMemo(() => {
    const sortByApcProgressDesc = (a: Registrant, b: Registrant) => {
      const summaryA = summariesByRegistrantId[a.id];
      const summaryB = summariesByRegistrantId[b.id];
      const progressA = summaryA?.apcProgramProgress ?? 0;
      const progressB = summaryB?.apcProgramProgress ?? 0;

      if (progressB !== progressA) {
        return progressB - progressA;
      }

      const nameA = `${a.firstName || ''} ${a.lastName || ''}`.trim();
      const nameB = `${b.firstName || ''} ${b.lastName || ''}`.trim();
      return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
    };

    if (!searchQuery.trim()) {
      return [...registrants].sort(sortByApcProgressDesc);
    }

    const query = searchQuery.toLowerCase();
    return allRegistrants
      .filter((registrant) => {
        const name =
          `${registrant.firstName || ''} ${registrant.lastName || ''}`.toLowerCase();
        const email = registrant.email.toLowerCase();
        const company = registrant.company?.name.toLowerCase() || '';
        const jobTitle = registrant.jobTitle?.toLowerCase() || '';
        return (
          name.includes(query) ||
          email.includes(query) ||
          company.includes(query) ||
          jobTitle.includes(query)
        );
      })
      .sort(sortByApcProgressDesc);
  }, [allRegistrants, registrants, searchQuery, summariesByRegistrantId]);

  return (
    <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-lg'>
      <div className='mb-4 flex items-center justify-between gap-4'>
        <div>
          <h2 className='text-xl font-bold text-slate-900'>Thinkific Registrants</h2>
          <p className='mt-1 text-sm text-slate-600'>
            Showing {filteredRegistrants.length} registrant
            {filteredRegistrants.length === 1 ? '' : 's'}
            {searchQuery.trim() ? ' (filtered across all registrants)' : ''}
          </p>
        </div>
        <div className='w-72'>
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
        <div className='py-12 text-center text-slate-500'>
          {searchQuery
            ? 'No registrants match your search.'
            : 'No registrants found for Thinkific reporting.'}
        </div>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-slate-200'>
                <th className='px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Name
                </th>
                <th className='px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Email
                </th>
                <th className='px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Company / Title
                </th>
                <th className='px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Thinkific User
                </th>
                <th className='px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Thinkific ID
                </th>
                <th className='px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  # of Enrollments
                </th>
                <th className='px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  # APC Enrollments
                </th>
                <th className='px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  APC Progress
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {filteredRegistrants.map((registrant) => {
                const name =
                  `${registrant.firstName || ''} ${registrant.lastName || ''}`.trim() ||
                  'N/A';
                const summary = summariesByRegistrantId[registrant.id] ?? {
                  isThinkificUser: false,
                  thinkificUserId: null,
                  enrollmentCount: 0,
                  apcEnrollmentCount: 0,
                  apcProgramProgress: 0,
                };
                return (
                  <tr key={registrant.id} className='hover:bg-slate-50'>
                    <td className='px-3 py-3'>
                      <Link
                        href={`/aps/${eventId}/registrants/${registrant.id}`}
                        className='font-medium text-slate-900 hover:text-slate-700 hover:underline'
                      >
                        {name}
                      </Link>
                    </td>
                    <td className='px-3 py-3 text-sm text-slate-600'>{registrant.email}</td>
                    <td className='px-3 py-3 text-sm'>
                      <div className='flex flex-col gap-0.5'>
                        <span className='text-slate-700'>{registrant.company?.name || '—'}</span>
                        <span className='text-xs text-slate-500'>{registrant.jobTitle || '—'}</span>
                      </div>
                    </td>
                    <td className='px-3 py-3 text-sm'>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          summary.isThinkificUser
                            ? 'bg-green-100 text-green-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {summary.isThinkificUser ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className='px-3 py-3 text-sm text-slate-700'>
                      {summary.thinkificUserId ?? 'No ID found'}
                    </td>
                    <td className='px-3 py-3 text-sm text-slate-700'>
                      {summary.enrollmentCount}
                    </td>
                    <td className='px-3 py-3 text-sm text-slate-700'>
                      {summary.apcEnrollmentCount}
                    </td>
                    <td className='px-3 py-3 text-sm text-slate-700'>
                      {formatProgress(summary.apcProgramProgress)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {registrants.length > 0 && !searchQuery.trim() ? (
        <div className='mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <p className='text-xs text-slate-500'>
            Page size: {registrants.length}
            {typeof pageSize === 'number' ? ` / ${pageSize}` : ''}
            {' • '}
            Total pages: {totalPages}
          </p>
          <div className='flex items-center gap-2'>
            {!isFirstPage ? (
              <Link
                href={`/aps/${eventId}/thinkific`}
                className='inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
              >
                ← First page
              </Link>
            ) : null}

            {nextToken ? (
              <Link
                href={`/aps/${eventId}/thinkific?nextToken=${encodeURIComponent(nextToken)}`}
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
