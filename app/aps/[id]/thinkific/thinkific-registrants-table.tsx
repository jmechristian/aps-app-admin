'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Registrant } from '@/app/actions/registrants';

export type ThinkificSortField = 'progress' | 'thinkificId';
export type ThinkificSortDirection = 'asc' | 'desc';

type ThinkificRegistrantSnapshot = {
  isThinkificUser: boolean;
  thinkificUserId: number | null;
  enrollmentCount: number | null;
  apcEnrollmentCount: number | null;
  apcProgramProgress: number;
};

type ThinkificRegistrantsTableProps = {
  registrants: Registrant[];
  allRegistrants: Registrant[];
  summariesByRegistrantId: Record<string, ThinkificRegistrantSnapshot>;
  eventId: string;
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
  sortField?: ThinkificSortField;
  sortDirection?: ThinkificSortDirection;
};

function formatProgress(value: number) {
  return `${value.toFixed(1)}%`;
}

function registrantName(registrant: Registrant) {
  return `${registrant.firstName || ''} ${registrant.lastName || ''}`.trim();
}

function compareThinkificRegistrants(
  a: Registrant,
  b: Registrant,
  summariesByRegistrantId: Record<string, ThinkificRegistrantSnapshot>,
  sortField: ThinkificSortField,
  sortDirection: ThinkificSortDirection,
) {
  const nameCompare = registrantName(a).localeCompare(
    registrantName(b),
    undefined,
    { sensitivity: 'base' },
  );
  const summaryA = summariesByRegistrantId[a.id];
  const summaryB = summariesByRegistrantId[b.id];

  if (sortField === 'thinkificId') {
    const hasA = summaryA?.thinkificUserId != null ? 1 : 0;
    const hasB = summaryB?.thinkificUserId != null ? 1 : 0;
    if (hasA !== hasB) {
      return sortDirection === 'desc' ? hasB - hasA : hasA - hasB;
    }

    const idA = summaryA?.thinkificUserId ?? 0;
    const idB = summaryB?.thinkificUserId ?? 0;
    if (idA !== idB) {
      return sortDirection === 'desc' ? idB - idA : idA - idB;
    }

    return nameCompare;
  }

  const progressA = summaryA?.apcProgramProgress ?? 0;
  const progressB = summaryB?.apcProgramProgress ?? 0;
  if (progressA !== progressB) {
    return sortDirection === 'desc' ? progressB - progressA : progressA - progressB;
  }

  return nameCompare;
}

export function buildThinkificListHref(
  eventId: string,
  options: {
    page?: number;
    sort?: ThinkificSortField;
    dir?: ThinkificSortDirection;
  } = {},
) {
  const params = new URLSearchParams();
  const sort = options.sort ?? 'progress';
  const dir = options.dir ?? 'desc';
  const page = options.page ?? 1;

  if (sort !== 'progress') params.set('sort', sort);
  if (dir !== 'desc') params.set('dir', dir);
  if (page > 1) params.set('page', String(page));

  const query = params.toString();
  return query ? `/aps/${eventId}/thinkific?${query}` : `/aps/${eventId}/thinkific`;
}

export default function ThinkificRegistrantsTable({
  registrants,
  allRegistrants,
  summariesByRegistrantId,
  eventId,
  currentPage = 1,
  totalPages,
  pageSize = 50,
  sortField = 'progress',
  sortDirection = 'desc',
}: ThinkificRegistrantsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const computedTotalPages = Math.max(
    1,
    Math.ceil(allRegistrants.length / (pageSize && pageSize > 0 ? pageSize : 50)),
  );
  const effectiveTotalPages = totalPages ?? computedTotalPages;

  const filteredRegistrants = useMemo(() => {
    if (!searchQuery.trim()) {
      return registrants;
    }

    const query = searchQuery.toLowerCase();
    return allRegistrants
      .filter((registrant) => {
        const name = registrantName(registrant).toLowerCase();
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
      .sort((a, b) =>
        compareThinkificRegistrants(
          a,
          b,
          summariesByRegistrantId,
          sortField,
          sortDirection,
        ),
      );
  }, [
    allRegistrants,
    registrants,
    searchQuery,
    sortDirection,
    sortField,
    summariesByRegistrantId,
  ]);

  const nextSortDirection = (field: ThinkificSortField): ThinkificSortDirection => {
    if (sortField === field) {
      return sortDirection === 'asc' ? 'desc' : 'asc';
    }
    return 'desc';
  };

  const getSortIndicator = (field: ThinkificSortField) => {
    if (sortField !== field) return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-lg'>
      <div className='mb-4 flex items-center justify-between gap-4'>
        <div>
          <h2 className='text-xl font-bold text-slate-900'>Thinkific Registrants</h2>
          <p className='mt-1 text-sm text-slate-600'>
            Showing {filteredRegistrants.length} registrant
            {filteredRegistrants.length === 1 ? '' : 's'}
            {searchQuery.trim()
              ? ' (filtered across all registrants)'
              : ` of ${allRegistrants.length} total`}
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
                  <Link
                    href={buildThinkificListHref(eventId, {
                      sort: 'thinkificId',
                      dir: nextSortDirection('thinkificId'),
                    })}
                    className='inline-flex items-center gap-1 hover:text-slate-900'
                  >
                    Thinkific User
                    <span className='text-[10px]'>{getSortIndicator('thinkificId')}</span>
                  </Link>
                </th>
                <th className='px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  <Link
                    href={buildThinkificListHref(eventId, {
                      sort: 'thinkificId',
                      dir: nextSortDirection('thinkificId'),
                    })}
                    className='inline-flex items-center gap-1 hover:text-slate-900'
                  >
                    Thinkific ID
                    <span className='text-[10px]'>{getSortIndicator('thinkificId')}</span>
                  </Link>
                </th>
                <th className='px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  # of Enrollments
                </th>
                <th className='px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  # APC Enrollments
                </th>
                <th className='px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  <Link
                    href={buildThinkificListHref(eventId, {
                      sort: 'progress',
                      dir: nextSortDirection('progress'),
                    })}
                    className='inline-flex items-center gap-1 hover:text-slate-900'
                  >
                    APC Progress
                    <span className='text-[10px]'>{getSortIndicator('progress')}</span>
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {filteredRegistrants.map((registrant) => {
                const name = registrantName(registrant) || 'N/A';
                const summary = summariesByRegistrantId[registrant.id] ?? {
                  isThinkificUser: false,
                  thinkificUserId: null,
                  enrollmentCount: null,
                  apcEnrollmentCount: null,
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
                      {summary.enrollmentCount ?? '—'}
                    </td>
                    <td className='px-3 py-3 text-sm text-slate-700'>
                      {summary.apcEnrollmentCount ?? '—'}
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
            Total pages: {effectiveTotalPages}
          </p>
          <div className='flex items-center gap-2'>
            {currentPage > 1 ? (
              <Link
                href={buildThinkificListHref(eventId, {
                  sort: sortField,
                  dir: sortDirection,
                })}
                className='inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
              >
                ← First page
              </Link>
            ) : null}

            {currentPage > 1 ? (
              <Link
                href={buildThinkificListHref(eventId, {
                  page: currentPage - 1,
                  sort: sortField,
                  dir: sortDirection,
                })}
                className='inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
              >
                ← Prev
              </Link>
            ) : null}

            {currentPage < effectiveTotalPages ? (
              <Link
                href={buildThinkificListHref(eventId, {
                  page: currentPage + 1,
                  sort: sortField,
                  dir: sortDirection,
                })}
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
