'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type {
  ContactRequestRow,
  LoginRow,
  ReportingEvent,
} from '@/app/actions/reporting';

type ReportingDashboardProps = {
  events: ReportingEvent[];
  selectedEventId: string;
  selectedEventYear: string;
  contactRequests: ContactRequestRow[];
  logins: LoginRow[];
  cognitoError: string | null;
};

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-[#E4A800]/20 text-[#8A6400] ring-[#E4A800]/40',
  ACCEPTED: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
  DECLINED: 'bg-[#E43A00]/15 text-[#E43A00] ring-[#E43A00]/25',
  BLOCKED: 'bg-slate-200 text-slate-700 ring-slate-300',
};

function formatDate(value?: string | null) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function typeLabel(value?: string | null) {
  if (!value) return '';
  if (value === 'SOLUTIONPROVIDER') return 'Solution Provider';
  if (value === 'TIER1') return 'Tier 1';
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function RequestsIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' className='h-8 w-8' aria-hidden='true'>
      <circle cx='8' cy='8' r='3.25' stroke='currentColor' strokeWidth='1.8' />
      <circle cx='16.5' cy='9' r='2.75' stroke='currentColor' strokeWidth='1.8' />
      <path
        d='M3.5 18.5c.6-3 2.6-4.7 4.5-4.7s3.9 1.7 4.5 4.7'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
      />
      <path
        d='M13.2 18.5c.4-2.3 1.9-3.6 3.3-3.6 1.5 0 2.9 1.3 3.3 3.6'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
      />
    </svg>
  );
}

function LoginsIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' className='h-8 w-8' aria-hidden='true'>
      <rect
        x='7'
        y='2.75'
        width='10'
        height='18.5'
        rx='2.2'
        stroke='currentColor'
        strokeWidth='1.8'
      />
      <path
        d='M11 6.5h2'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
      />
      <circle cx='12' cy='16.25' r='1' fill='currentColor' />
    </svg>
  );
}

function PersonCell({
  person,
  role,
}: {
  person: ContactRequestRow['from'];
  role: string;
}) {
  return (
    <div className='min-w-[12rem]'>
      <p className='text-[10px] font-bold uppercase tracking-[0.16em] text-[#0873B8]'>
        {role}
      </p>
      <p className='font-semibold text-[#005892]'>{person.name}</p>
      <p className='text-xs text-slate-600'>
        {[person.company, typeLabel(person.attendeeType)]
          .filter(Boolean)
          .join(' · ') || person.email || '—'}
      </p>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string | number;
  hint: string;
  accent: 'gold' | 'blue' | 'navy' | 'red';
}) {
  const accents = {
    gold: 'from-[#E4A800] to-[#f3c84a]',
    blue: 'from-[#0873B8] to-[#3aa0e0]',
    navy: 'from-[#005892] to-[#0873B8]',
    red: 'from-[#E43A00] to-[#ff7a4d]',
  };

  return (
    <article className='relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-5 text-white shadow-lg backdrop-blur'>
      <div
        className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-linear-to-br ${accents[accent]} opacity-80`}
      />
      <p className='text-xs font-bold uppercase tracking-[0.18em] text-[#E4A800]'>
        {label}
      </p>
      <p className='mt-2 text-4xl font-black tabular-nums'>{value}</p>
      <p className='mt-1 text-sm text-white/75'>{hint}</p>
    </article>
  );
}

export default function ReportingDashboard({
  events,
  selectedEventId,
  selectedEventYear,
  contactRequests,
  logins,
  cognitoError,
}: ReportingDashboardProps) {
  const [requestQuery, setRequestQuery] = useState('');
  const [requestStatus, setRequestStatus] = useState('ALL');
  const [loginQuery, setLoginQuery] = useState('');
  const [loginFilter, setLoginFilter] = useState('ALL');

  const requestStatuses = useMemo(() => {
    const values = new Set(contactRequests.map((row) => row.status));
    return ['ALL', ...[...values].sort()];
  }, [contactRequests]);

  const filteredRequests = useMemo(() => {
    const query = requestQuery.trim().toLowerCase();
    return contactRequests.filter((row) => {
      if (requestStatus !== 'ALL' && row.status !== requestStatus) return false;
      if (!query) return true;
      const haystack = [
        row.from.name,
        row.from.email,
        row.from.company,
        row.to.name,
        row.to.email,
        row.to.company,
        row.status,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [contactRequests, requestQuery, requestStatus]);

  const filteredLogins = useMemo(() => {
    const query = loginQuery.trim().toLowerCase();
    return logins.filter((row) => {
      if (loginFilter === 'IN' && !row.hasLoggedIn) return false;
      if (loginFilter === 'OUT' && row.hasLoggedIn) return false;
      if (loginFilter === 'NATIVE' && !row.nativeApp) return false;
      if (!query) return true;
      const haystack = [
        row.name,
        row.email,
        row.company,
        row.attendeeType,
        row.cognitoStatus,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [logins, loginQuery, loginFilter]);

  const loggedInCount = logins.filter((row) => row.hasLoggedIn).length;
  const nativeCount = logins.filter((row) => row.nativeApp).length;
  const acceptedCount = contactRequests.filter(
    (row) => row.status === 'ACCEPTED',
  ).length;
  const loginRate =
    logins.length === 0 ? 0 : Math.round((loggedInCount / logins.length) * 100);

  return (
    <div className='relative min-h-screen overflow-hidden bg-[#041c2e] text-white'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#0873B8]/30 blur-3xl' />
        <div className='absolute right-0 top-24 h-96 w-96 rounded-full bg-[#E4A800]/20 blur-3xl' />
        <div className='absolute inset-x-0 top-0 h-2 bg-linear-to-r from-[#E4A800] via-white to-[#0873B8]' />
      </div>

      <main className='page-container relative flex flex-col gap-8 px-6 py-10'>
        <header className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
          <div className='space-y-4'>
            <div className='inline-flex items-center gap-3 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-[#E4A800] ring-1 ring-white/15'>
              App benchmarks
            </div>
            <div className='flex items-center gap-4'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src='/images/AutoPackSummit-Color-Vector.svg'
                alt='Automotive Packaging Summit'
                className='h-12 w-auto max-w-[240px] rounded-lg bg-white px-3 py-2'
              />
            </div>
            <div>
              <h1 className='text-4xl font-black tracking-tight sm:text-5xl'>
                Reporting
              </h1>
              <p className='mt-2 max-w-2xl text-sm leading-6 text-white/75 sm:text-base'>
                Contact requests plus who has actually signed into the event app.
                Apple and Google keep named download lists in their own
                dashboards — we can see first login and native-app opens from
                our side.
              </p>
            </div>
          </div>

          <div className='flex flex-wrap gap-2'>
            {events.map((event) => {
              const active = event.id === selectedEventId;
              return (
                <Link
                  key={event.id}
                  href={`/reporting?eventId=${event.id}`}
                  className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                    active
                      ? 'bg-[#E4A800] text-[#041c2e] shadow-lg'
                      : 'bg-white/10 text-white ring-1 ring-white/15 hover:bg-white/20'
                  }`}
                >
                  {event.year}
                </Link>
              );
            })}
          </div>
        </header>

        <nav
          aria-label='Jump to report'
          className='grid gap-3 sm:grid-cols-2'
        >
          <a
            href='#contact-requests'
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('contact-requests');
            }}
            className='group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:border-[#E4A800]/60 hover:bg-white/15'
          >
            <span className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E4A800] text-[#041c2e] shadow-md transition group-hover:scale-105'>
              <RequestsIcon />
            </span>
            <span>
              <span className='block text-lg font-black'>Requests</span>
              <span className='text-sm text-white/70'>
                {contactRequests.length} contact requests
              </span>
            </span>
          </a>
          <a
            href='#app-logins'
            onClick={(event) => {
              event.preventDefault();
              scrollToSection('app-logins');
            }}
            className='group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:border-[#E4A800]/60 hover:bg-white/15'
          >
            <span className='flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0873B8] text-white shadow-md transition group-hover:scale-105'>
              <LoginsIcon />
            </span>
            <span>
              <span className='block text-lg font-black'>Logins</span>
              <span className='text-sm text-white/70'>
                {loggedInCount} signed in at least once
              </span>
            </span>
          </a>
        </nav>

        <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          <StatCard
            label='Contact requests'
            value={contactRequests.length}
            hint={`${acceptedCount} accepted in ${selectedEventYear}`}
            accent='gold'
          />
          <StatCard
            label='Logged in'
            value={loggedInCount}
            hint={`${loginRate}% of ${logins.length} registrants`}
            accent='blue'
          />
          <StatCard
            label='Native app'
            value={nativeCount}
            hint='Opened iOS or Android at least once'
            accent='navy'
          />
          <StatCard
            label='Still waiting'
            value={logins.length - loggedInCount}
            hint='Have an invite, no first login yet'
            accent='red'
          />
        </section>

        <section
          id='contact-requests'
          className='scroll-mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white text-slate-900 shadow-2xl'
        >
          <div className='flex flex-col gap-4 border-b border-slate-100 bg-linear-to-r from-[#005892] to-[#0873B8] px-6 py-5 text-white sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <p className='text-xs font-bold uppercase tracking-[0.2em] text-[#E4A800]'>
                Networking
              </p>
              <h2 className='text-2xl font-black'>Contact requests</h2>
              <p className='mt-1 text-sm text-white/80'>
                Both parties, status, and the date the request was sent.
                Showing {filteredRequests.length} of {contactRequests.length}.
              </p>
            </div>
            <div className='flex flex-col gap-2 sm:flex-row'>
              <input
                value={requestQuery}
                onChange={(event) => setRequestQuery(event.target.value)}
                placeholder='Search people, companies…'
                className='rounded-xl border-0 bg-white/15 px-4 py-2 text-sm text-white outline-none ring-1 ring-white/20 placeholder:text-white/60 focus:bg-white/20 focus:ring-[#E4A800]'
              />
              <select
                value={requestStatus}
                onChange={(event) => setRequestStatus(event.target.value)}
                className='rounded-xl border-0 bg-white/15 px-3 py-2 text-sm font-semibold text-white outline-none ring-1 ring-white/20 focus:ring-[#E4A800]'
              >
                {requestStatuses.map((status) => (
                  <option key={status} value={status} className='text-slate-900'>
                    {status === 'ALL' ? 'All statuses' : status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredRequests.length === 0 ? (
            <div className='px-6 py-12 text-center text-slate-500'>
              No contact requests match this view yet. Once attendees start
              connecting in the app, they will land here.
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full text-left text-sm'>
                <thead className='bg-[#041c2e] text-xs font-bold uppercase tracking-[0.14em] text-[#E4A800]'>
                  <tr>
                    <th className='px-6 py-3'>From</th>
                    <th className='px-6 py-3'>To</th>
                    <th className='px-6 py-3'>Status</th>
                    <th className='px-6 py-3'>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((row, index) => (
                    <tr
                      key={row.id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                    >
                      <td className='px-6 py-4 align-top'>
                        <PersonCell person={row.from} role='Requester' />
                      </td>
                      <td className='px-6 py-4 align-top'>
                        <PersonCell person={row.to} role='Recipient' />
                      </td>
                      <td className='px-6 py-4 align-top'>
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-black tracking-wide ring-1 ${
                            STATUS_STYLES[row.status] ??
                            'bg-slate-100 text-slate-700 ring-slate-200'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className='px-6 py-4 align-top text-slate-700'>
                        <p className='font-semibold'>{formatDate(row.createdAt)}</p>
                        {row.resolvedAt ? (
                          <p className='text-xs text-slate-500'>
                            Updated {formatDate(row.resolvedAt)}
                          </p>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section
          id='app-logins'
          className='scroll-mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white text-slate-900 shadow-2xl'
        >
          <div className='flex flex-col gap-4 border-b border-slate-100 bg-linear-to-r from-[#041c2e] via-[#005892] to-[#E4A800] px-6 py-5 text-white sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <p className='text-xs font-bold uppercase tracking-[0.2em] text-[#E4A800]'>
                Adoption
              </p>
              <h2 className='text-2xl font-black'>App logins</h2>
              <p className='mt-1 max-w-xl text-sm text-white/85'>
                First Cognito login after the temp password. A native-app badge
                means they registered a push token on iOS or Android. Showing{' '}
                {filteredLogins.length} of {logins.length}.
              </p>
            </div>
            <div className='flex flex-col gap-2 sm:flex-row'>
              <input
                value={loginQuery}
                onChange={(event) => setLoginQuery(event.target.value)}
                placeholder='Search attendees…'
                className='rounded-xl border-0 bg-white/15 px-4 py-2 text-sm text-white outline-none ring-1 ring-white/20 placeholder:text-white/60 focus:bg-white/20 focus:ring-[#E4A800]'
              />
              <select
                value={loginFilter}
                onChange={(event) => setLoginFilter(event.target.value)}
                className='rounded-xl border-0 bg-white/15 px-3 py-2 text-sm font-semibold text-white outline-none ring-1 ring-white/20 focus:ring-[#E4A800]'
              >
                <option value='ALL' className='text-slate-900'>
                  All attendees
                </option>
                <option value='IN' className='text-slate-900'>
                  Logged in
                </option>
                <option value='OUT' className='text-slate-900'>
                  Not yet
                </option>
                <option value='NATIVE' className='text-slate-900'>
                  Native app
                </option>
              </select>
            </div>
          </div>

          {cognitoError ? (
            <div className='border-b border-amber-200 bg-amber-50 px-6 py-3 text-sm text-amber-900'>
              Cognito login status could not be loaded ({cognitoError}). Native
              app opens from push tokens are still shown when available.
            </div>
          ) : null}

          {filteredLogins.length === 0 ? (
            <div className='px-6 py-12 text-center text-slate-500'>
              No attendees match this login view.
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full text-left text-sm'>
                <thead className='bg-[#041c2e] text-xs font-bold uppercase tracking-[0.14em] text-[#E4A800]'>
                  <tr>
                    <th className='px-6 py-3'>Attendee</th>
                    <th className='px-6 py-3'>Company</th>
                    <th className='px-6 py-3'>Logged in</th>
                    <th className='px-6 py-3'>Native app</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogins.map((row, index) => (
                    <tr
                      key={row.registrantId}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                    >
                      <td className='px-6 py-4'>
                        <p className='font-semibold text-[#005892]'>{row.name}</p>
                        <p className='text-xs text-slate-500'>{row.email}</p>
                        <p className='text-[11px] font-semibold uppercase tracking-wide text-[#0873B8]'>
                          {typeLabel(row.attendeeType)}
                        </p>
                      </td>
                      <td className='px-6 py-4 text-slate-700'>
                        {row.company || '—'}
                      </td>
                      <td className='px-6 py-4'>
                        {row.hasLoggedIn ? (
                          <span className='inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-800 ring-1 ring-emerald-200'>
                            Yes
                          </span>
                        ) : row.hasAccount ? (
                          <span className='inline-flex rounded-full bg-[#E4A800]/20 px-3 py-1 text-xs font-black text-[#8A6400] ring-1 ring-[#E4A800]/40'>
                            Not yet
                          </span>
                        ) : (
                          <span className='inline-flex rounded-full bg-slate-200 px-3 py-1 text-xs font-black text-slate-700'>
                            No account
                          </span>
                        )}
                        {row.cognitoStatus ? (
                          <p className='mt-1 text-[11px] text-slate-500'>
                            {row.cognitoStatus.replaceAll('_', ' ')}
                          </p>
                        ) : null}
                        {row.hasLoggedIn && row.accountUpdatedAt ? (
                          <p className='mt-1 text-[11px] text-slate-500'>
                            {formatDate(row.accountUpdatedAt)}
                          </p>
                        ) : null}
                      </td>
                      <td className='px-6 py-4'>
                        {row.nativeApp ? (
                          <div>
                            <span className='inline-flex rounded-full bg-[#005892] px-3 py-1 text-xs font-black text-white'>
                              Opened app
                            </span>
                            {row.nativePlatform ? (
                              <p className='mt-1 text-[11px] uppercase tracking-wide text-slate-500'>
                                {row.nativePlatform}
                              </p>
                            ) : null}
                          </div>
                        ) : (
                          <span className='text-slate-400'>—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
