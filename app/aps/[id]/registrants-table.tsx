'use client';

import { useState, useMemo, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  approveRegistrant,
  deleteRegistrantCascade,
  sendAppAccessEmail,
  sendWelcomeEmail,
  updateRegistrantAttendeeType,
  type Registrant,
} from '@/app/actions/registrants';

type RegistrantsTableProps = {
  registrants: Registrant[];
  allRegistrants: Registrant[];
  eventId: string;
  currentPage?: number;
  totalPages?: number;
  pageSize?: number;
};

export default function RegistrantsTable({
  registrants,
  allRegistrants,
  eventId,
  currentPage = 1,
  totalPages,
  pageSize = 50,
}: RegistrantsTableProps) {
  type SortField = 'name' | 'createdAt';

  const ATTENDEE_TYPE_OPTIONS = [
    'OEM',
    'TIER1',
    'SOLUTIONPROVIDER',
    'SPONSOR',
    'SPEAKER',
    'STAFF',
    'EXHIBITOR',
  ] as const;

  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [emailingId, setEmailingId] = useState<string | null>(null);
  const [appEmailingId, setAppEmailingId] = useState<string | null>(null);
  const [approvingId, setApprovingId] = useState<string | null>(null);
  const [savingTypeId, setSavingTypeId] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<Record<string, string>>({});
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const computedTotalPages = Math.max(
    1,
    Math.ceil(allRegistrants.length / (pageSize && pageSize > 0 ? pageSize : 50))
  );
  const effectiveTotalPages = totalPages ?? computedTotalPages;

  const filteredRegistrants = useMemo(() => {
    if (!searchQuery.trim()) {
      return registrants;
    }

    const query = searchQuery.toLowerCase();
    return allRegistrants.filter((registrant) => {
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
  }, [allRegistrants, registrants, searchQuery]);

  const sortedRegistrants = useMemo(() => {
    const items = [...filteredRegistrants];
    items.sort((a, b) => {
      const pendingRankA = a.status === 'PENDING' ? 0 : 1;
      const pendingRankB = b.status === 'PENDING' ? 0 : 1;
      if (pendingRankA !== pendingRankB) {
        return pendingRankA - pendingRankB;
      }

      if (sortField === 'name') {
        const nameA = `${a.firstName || ''} ${a.lastName || ''}`
          .trim()
          .toLowerCase();
        const nameB = `${b.firstName || ''} ${b.lastName || ''}`
          .trim()
          .toLowerCase();
        const compare = nameA.localeCompare(nameB, undefined, {
          sensitivity: 'base',
        });
        return sortDirection === 'asc' ? compare : -compare;
      }

      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      const compare = dateA - dateB;
      return sortDirection === 'asc' ? compare : -compare;
    });
    return items;
  }, [filteredRegistrants, sortDirection, sortField]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortField(field);
    setSortDirection(field === 'name' ? 'asc' : 'desc');
  };

  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

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

  const getBooleanIndicator = (value?: boolean | null) => {
    if (value) {
      return <span className='text-sm font-semibold text-green-700'>✓</span>;
    }
    return <span className='text-sm font-semibold text-red-600'>✕</span>;
  };

  const handleDelete = (registrantId: string, name: string) => {
    const confirmed = window.confirm(
      `Delete ${name || 'this registrant'}? This will remove their app user and profile data.`
    );
    if (!confirmed) return;

    setDeletingId(registrantId);
    startTransition(async () => {
      const result = await deleteRegistrantCascade({
        registrantId,
        eventId,
      });
      if (!result.ok) {
        window.alert(result.message || 'Failed to delete registrant.');
      }
      setDeletingId(null);
      router.refresh();
    });
  };

  const handleWelcomeEmailClick = (registrantId: string) => {
    setEmailingId(registrantId);
    startTransition(async () => {
      const result = await sendWelcomeEmail({
        registrantId,
        eventId,
      });
      if (!result.ok) {
        window.alert(result.message || 'Failed to send welcome email.');
      } else {
        window.alert('Welcome email sent.');
      }
      setEmailingId(null);
      router.refresh();
    });
  };

  const handleAppEmailClick = (registrantId: string) => {
    setAppEmailingId(registrantId);
    startTransition(async () => {
      const result = await sendAppAccessEmail({
        registrantId,
        eventId,
      });
      if (!result.ok) {
        window.alert(result.message || 'Failed to send app access email.');
      } else {
        window.alert('App access email sent.');
      }
      setAppEmailingId(null);
      router.refresh();
    });
  };

  const handleApprove = (registrantId: string) => {
    setApprovingId(registrantId);
    startTransition(async () => {
      const result = await approveRegistrant({
        registrantId,
        eventId,
      });
      if (!result.ok) {
        window.alert(result.message || 'Failed to approve registrant.');
      } else {
        window.alert(result.message || 'Registrant approved.');
      }
      setApprovingId(null);
      router.refresh();
    });
  };

  const handleAttendeeTypeSelect = (registrantId: string, attendeeType: string) => {
    setSelectedTypes((prev) => ({
      ...prev,
      [registrantId]: attendeeType,
    }));
  };

  const handleSaveAttendeeType = (
    registrantId: string,
    currentAttendeeType: string,
  ) => {
    const nextAttendeeType = selectedTypes[registrantId] ?? currentAttendeeType;
    if (nextAttendeeType === currentAttendeeType) {
      return;
    }

    setSavingTypeId(registrantId);
    startTransition(async () => {
      const result = await updateRegistrantAttendeeType({
        registrantId,
        eventId,
        attendeeType: nextAttendeeType as
          | 'OEM'
          | 'TIER1'
          | 'SOLUTIONPROVIDER'
          | 'SPONSOR'
          | 'SPEAKER'
          | 'STAFF'
          | 'EXHIBITOR',
      });

      if (!result.ok) {
        window.alert(result.message || 'Failed to update registrant type.');
      } else {
        setSelectedTypes((prev) => {
          const next = { ...prev };
          delete next[registrantId];
          return next;
        });
      }

      setSavingTypeId(null);
      router.refresh();
    });
  };

  return (
    <div className='rounded-3xl border border-slate-200 bg-white p-6 shadow-lg'>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h2 className='flex items-center gap-2 text-xl font-bold text-slate-900'>
            Registrants
            <span className='rounded-full bg-slate-100 px-2.5 py-0.5 text-sm font-semibold text-slate-700'>
              {allRegistrants.length}
            </span>
          </h2>
          <p className='mt-1 text-sm text-slate-600'>
            Showing {filteredRegistrants.length} registrant
            {filteredRegistrants.length === 1 ? '' : 's'}
            {searchQuery.trim() ? ' (filtered across all registrants)' : ''}
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
                <th className='px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  <button
                    type='button'
                    onClick={() => toggleSort('name')}
                    className='inline-flex items-center gap-1 hover:text-slate-900'
                  >
                    Name
                    <span className='text-[10px]'>{getSortIndicator('name')}</span>
                  </button>
                </th>
                <th className='px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  <button
                    type='button'
                    onClick={() => toggleSort('createdAt')}
                    className='inline-flex items-center gap-1 hover:text-slate-900'
                  >
                    Created
                    <span className='text-[10px]'>{getSortIndicator('createdAt')}</span>
                  </button>
                </th>
                <th className='px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Company / Title
                </th>
                <th className='px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Type
                </th>
                <th className='px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Status
                </th>
                <th className='px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Reg Email Sent
                </th>
                <th className='px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Welcome Email Sent
                </th>
                <th className='px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Welcome Email
                </th>
                <th className='px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  App Email Sent
                </th>
                <th className='px-2 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  App Email
                </th>
                <th className='px-2 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-100'>
              {sortedRegistrants.map((registrant) => {
                const name = `${registrant.firstName || ''} ${registrant.lastName || ''}`.trim() || 'N/A';
                const selectedType =
                  selectedTypes[registrant.id] ?? registrant.attendeeType;
                const hasTypeChanged = selectedType !== registrant.attendeeType;
                const isSendingAppEmail = appEmailingId === registrant.id;
                return (
                  <tr
                    key={registrant.id}
                    className='transition hover:bg-slate-50'
                  >
                    <td className='px-2 py-3'>
                      <div className='flex flex-col gap-0.5'>
                        <Link
                          href={`/aps/${eventId}/registrants/${registrant.id}`}
                          className='font-medium text-slate-900 hover:text-slate-700 hover:underline'
                        >
                          {name}
                        </Link>
                        <span className='text-xs text-slate-500'>{registrant.email}</span>
                      </div>
                    </td>
                    <td className='px-2 py-3 text-sm text-slate-600'>
                      {new Date(registrant.createdAt).toLocaleDateString()}
                    </td>
                    <td className='px-2 py-3 text-sm'>
                      <div className='flex flex-col gap-0.5'>
                        <span className='text-slate-700'>{registrant.company?.name || '—'}</span>
                        <span className='text-xs text-slate-500'>{registrant.jobTitle || '—'}</span>
                      </div>
                    </td>
                    <td className='px-2 py-3 text-sm text-slate-600'>
                      <div className='flex min-w-[150px] flex-col gap-2'>
                        <select
                          value={selectedType}
                          onChange={(e) =>
                            handleAttendeeTypeSelect(registrant.id, e.target.value)
                          }
                          className='rounded-md border border-slate-300 px-2 py-1 text-xs text-slate-900 focus:border-slate-900 focus:outline-none'
                        >
                          {ATTENDEE_TYPE_OPTIONS.map((option) => (
                            <option key={option} value={option}>
                              {getAttendeeTypeLabel(option)}
                            </option>
                          ))}
                        </select>
                        <button
                          type='button'
                          onClick={() =>
                            handleSaveAttendeeType(
                              registrant.id,
                              registrant.attendeeType,
                            )
                          }
                          disabled={
                            !hasTypeChanged ||
                            (isPending && savingTypeId === registrant.id)
                          }
                          className='inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50'
                        >
                          {isPending && savingTypeId === registrant.id
                            ? 'Saving...'
                            : 'Save type'}
                        </button>
                      </div>
                    </td>
                    <td className='px-2 py-3'>
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(registrant.status)}`}
                      >
                        {registrant.status}
                      </span>
                    </td>
                    <td className='px-2 py-3 text-center'>
                      {getBooleanIndicator(registrant.registrationEmailSent)}
                    </td>
                    <td className='px-2 py-3 text-center'>
                      {getBooleanIndicator(registrant.welcomeEmailSent)}
                    </td>
                    <td className='px-2 py-3 text-center'>
                      <button
                        type='button'
                        onClick={() => handleWelcomeEmailClick(registrant.id)}
                        disabled={isPending && emailingId === registrant.id}
                        className='inline-flex h-12 w-12 items-center justify-center rounded-lg border border-black bg-white text-black transition hover:bg-slate-100'
                        aria-label={`Send welcome email to ${name}`}
                        title={
                          registrant.welcomeEmailSent
                            ? 'Resend welcome email'
                            : 'Send welcome email'
                        }
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='1.8'
                          className='h-7 w-7'
                          aria-hidden='true'
                        >
                          <rect x='3.5' y='5.5' width='17' height='13' rx='2' />
                          <path d='M4 7l8 6 8-6' />
                        </svg>
                      </button>
                    </td>
                    <td className='px-2 py-3 text-center'>
                      {getBooleanIndicator(registrant.appEmailSent)}
                    </td>
                    <td className='px-2 py-3 text-center'>
                      <button
                        type='button'
                        onClick={() => handleAppEmailClick(registrant.id)}
                        disabled={isSendingAppEmail}
                        aria-busy={isSendingAppEmail}
                        className={`inline-flex h-12 w-12 items-center justify-center rounded-lg border transition ${
                          isSendingAppEmail
                            ? 'cursor-wait border-slate-700 bg-slate-700 text-white ring-2 ring-slate-400 ring-offset-1'
                            : 'border-slate-900 bg-slate-900 text-white hover:bg-slate-800'
                        } disabled:opacity-90`}
                        aria-label={
                          isSendingAppEmail
                            ? `Sending app access email to ${name}`
                            : `Send app access email to ${name}`
                        }
                        title={
                          isSendingAppEmail
                            ? 'Sending app access email…'
                            : registrant.appEmailSent
                              ? 'Resend app access email'
                              : 'Send app access email'
                        }
                      >
                        {isSendingAppEmail ? (
                          <svg
                            className='h-6 w-6 animate-spin'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            aria-hidden='true'
                          >
                            <circle
                              className='opacity-25'
                              cx='12'
                              cy='12'
                              r='10'
                              stroke='currentColor'
                              strokeWidth='3'
                            />
                            <path
                              className='opacity-90'
                              fill='currentColor'
                              d='M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z'
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='1.8'
                            className='h-7 w-7'
                            aria-hidden='true'
                          >
                            <rect
                              x='6'
                              y='2.5'
                              width='12'
                              height='19'
                              rx='2'
                            />
                            <path d='M10 18.5h4' />
                          </svg>
                        )}
                      </button>
                    </td>
                    <td className='px-2 py-3'>
                      <div className='flex flex-wrap items-center gap-2'>
                        <button
                          type='button'
                          onClick={() => handleApprove(registrant.id)}
                          disabled={
                            registrant.status === 'APPROVED' ||
                            (isPending && approvingId === registrant.id)
                          }
                          className='inline-flex w-24 items-center justify-center rounded-lg border border-green-700 bg-green-700 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60'
                        >
                          {isPending && approvingId === registrant.id
                            ? 'Approving...'
                            : registrant.status === 'APPROVED'
                              ? 'Approved'
                              : 'Approve'}
                        </button>
                        <button
                          type='button'
                          onClick={() => handleDelete(registrant.id, name)}
                          disabled={isPending && deletingId === registrant.id}
                          className='inline-flex w-24 items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60'
                        >
                          {isPending && deletingId === registrant.id ? 'Deleting...' : 'Delete'}
                        </button>
                      </div>
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
                href={`/aps/${eventId}`}
                className='inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
              >
                ← First page
              </Link>
            ) : null}

            {currentPage > 1 ? (
              <Link
                href={
                  currentPage - 1 === 1
                    ? `/aps/${eventId}`
                    : `/aps/${eventId}?page=${currentPage - 1}`
                }
                className='inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
              >
                ← Prev
              </Link>
            ) : null}

            {currentPage < effectiveTotalPages ? (
              <Link
                href={`/aps/${eventId}?page=${currentPage + 1}`}
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

