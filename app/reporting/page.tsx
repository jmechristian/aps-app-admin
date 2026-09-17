import Link from 'next/link';
import { fetchReportingDashboard } from '@/app/actions/reporting';
import ReportingDashboard from './reporting-dashboard';

export const dynamic = 'force-dynamic';
export const maxDuration = 120;

export default async function ReportingPage({
  searchParams,
}: {
  searchParams?: Promise<{ eventId?: string | string[] }>;
}) {
  const sp = searchParams ? await searchParams : undefined;
  const incoming = Array.isArray(sp?.eventId) ? sp.eventId[0] : sp?.eventId;

  let dashboard;
  try {
    dashboard = await fetchReportingDashboard(incoming);
  } catch (err) {
    if (err instanceof Error && err.name === 'AppSyncUnauthorizedError') {
      return (
        <div className='min-h-screen bg-[#041c2e] px-6 py-12 text-white'>
          <main className='page-container rounded-3xl border border-[#E4A800]/40 bg-white/5 p-8'>
            <h1 className='text-2xl font-black'>Session expired</h1>
            <p className='mt-2 text-sm text-white/75'>
              Sign in again to load reporting.
            </p>
            <Link
              href='/login?next=/reporting'
              className='mt-4 inline-flex rounded-xl bg-[#E4A800] px-4 py-2 text-sm font-bold text-[#041c2e]'
            >
              Sign in
            </Link>
          </main>
        </div>
      );
    }
    throw err;
  }

  if (dashboard.events.length === 0) {
    return (
      <div className='min-h-screen bg-[#041c2e] px-6 py-12 text-white'>
        <main className='page-container rounded-3xl border border-white/10 bg-white/5 p-8'>
          <h1 className='text-3xl font-black'>Reporting</h1>
          <p className='mt-2 text-white/75'>
            Create an APS event first, then this dashboard can score contact
            requests and app logins.
          </p>
          <Link
            href='/'
            className='mt-4 inline-flex rounded-xl bg-[#E4A800] px-4 py-2 text-sm font-bold text-[#041c2e]'
          >
            Back to events
          </Link>
        </main>
      </div>
    );
  }

  return (
    <ReportingDashboard
      events={dashboard.events}
      selectedEventId={dashboard.selectedEventId}
      selectedEventYear={dashboard.selectedEventYear}
      contactRequests={dashboard.contactRequests}
      logins={dashboard.logins}
      cognitoError={dashboard.cognitoError}
    />
  );
}
