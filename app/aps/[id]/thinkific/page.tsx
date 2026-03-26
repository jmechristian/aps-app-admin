import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requestGraphQL } from '@/lib/appsync';
import {
  fetchRegistrantsByApsId,
  fetchRegistrantsByApsIdPage,
} from '@/app/actions/registrants';
import { getThinkificRegistrantSummariesByEmails } from '@/app/actions/thinkific';
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

  const summariesByEmail = await getThinkificRegistrantSummariesByEmails(
    allRegistrants.map((registrant) => registrant.email),
  );

  const summariesByRegistrantId = Object.fromEntries(
    allRegistrants.map((registrant) => [
      registrant.id,
      summariesByEmail[registrant.email.toLowerCase()] ?? {
        isThinkificUser: false,
        thinkificUserId: null,
        enrollmentCount: 0,
        apcEnrollmentCount: 0,
        apcProgramProgress: 0,
      },
    ]),
  );

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
