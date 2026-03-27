import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requestGraphQL } from '@/lib/appsync';
import {
  fetchRegistrantsByApsId,
  fetchRegistrantsByApsIdPage,
} from '@/app/actions/registrants';
import { getThinkificEnrollmentCountsByEmails } from '@/app/actions/thinkific';
import ThinkificRegistrantsTable from './thinkific-registrants-table';

type APS = {
  id: string;
  year: string;
};

const GET_APS = /* GraphQL */ `
  query GetAPS($id: ID!) {
    getAPS(id: $id) {
      id
      year
    }
  }
`;

async function fetchAps(id: string): Promise<APS | null> {
  const data = await requestGraphQL<{ getAPS?: APS | null }>(GET_APS, { id });
  return data.getAPS ?? null;
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

export default async function ApsThinkificPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ nextToken?: string | string[] }>;
}) {
  const { id: eventId } = await params;
  const sp = searchParams ? await searchParams : undefined;
  const incomingNextToken = Array.isArray(sp?.nextToken)
    ? sp?.nextToken?.[0]
    : sp?.nextToken;

  const [aps, registrantsPage, allRegistrants] = await Promise.all([
    fetchAps(eventId),
    fetchRegistrantsByApsIdPage(eventId, {
      limit: 50,
      nextToken: incomingNextToken ?? null,
    }),
    fetchRegistrantsByApsId(eventId),
  ]);

  if (!aps) {
    notFound();
  }

  const enrollmentCountsByEmail = await getThinkificEnrollmentCountsByEmails(
    allRegistrants.map((registrant) => registrant.email),
  );

  const summariesByRegistrantId = Object.fromEntries(
    allRegistrants.map((registrant) => [
      registrant.id,
      {
        isThinkificUser: Boolean(registrant.appUser?.profile?.thinkificId),
        thinkificUserId: registrant.appUser?.profile?.thinkificId ?? null,
        enrollmentCount:
          enrollmentCountsByEmail[registrant.email.toLowerCase()]?.enrollmentCount ??
          0,
        apcEnrollmentCount:
          enrollmentCountsByEmail[registrant.email.toLowerCase()]
            ?.apcEnrollmentCount ?? 0,
        apcProgramProgress: registrant.appUser?.profile?.apcProgress ?? 0,
      },
    ]),
  );

  const totalRegistrants = allRegistrants.length;
  const thinkificUserCount = allRegistrants.filter((registrant) =>
    Boolean(registrant.appUser?.profile?.thinkificId),
  ).length;
  const apcCompleteCount = allRegistrants.filter(
    (registrant) => (registrant.appUser?.profile?.apcProgress ?? 0) >= 100,
  ).length;
  const thinkificUserPercent =
    totalRegistrants > 0 ? (thinkificUserCount / totalRegistrants) * 100 : 0;
  const apcCompletePercent =
    totalRegistrants > 0 ? (apcCompleteCount / totalRegistrants) * 100 : 0;

  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex items-center justify-between gap-4'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Thinkific
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>
              Event {aps.year} Thinkific Overview
            </h1>
            <p className='text-slate-600'>
              View Thinkific user, enrollment, and APC progress data for registrants.
            </p>
          </div>
          <Link
            href={`/aps/${eventId}`}
            className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
          >
            ← Back to event
          </Link>
        </header>

        <section className='grid gap-4 md:grid-cols-2'>
          <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Registrants With Thinkific ID
            </p>
            <p className='mt-2 text-3xl font-bold text-slate-900'>
              {thinkificUserCount}
            </p>
            <p className='mt-1 text-sm text-slate-600'>
              {formatPercent(thinkificUserPercent)} of {totalRegistrants} registrants
            </p>
          </div>

          <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Registrants At 100% APC Progress
            </p>
            <p className='mt-2 text-3xl font-bold text-slate-900'>
              {apcCompleteCount}
            </p>
            <p className='mt-1 text-sm text-slate-600'>
              {formatPercent(apcCompletePercent)} of {totalRegistrants} registrants
            </p>
          </div>
        </section>

        <ThinkificRegistrantsTable
          registrants={registrantsPage.items}
          allRegistrants={allRegistrants}
          summariesByRegistrantId={summariesByRegistrantId}
          eventId={eventId}
          nextToken={registrantsPage.nextToken ?? null}
          isFirstPage={!incomingNextToken}
          pageSize={50}
        />
      </main>
    </div>
  );
}
