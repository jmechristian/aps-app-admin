import Link from 'next/link';
import CategoryPageShell from '../category-page-shell';
import { fetchPassportChallengeTracker } from '@/app/actions/passport';

type PageProps = {
  params: Promise<{ id: string }>;
};

function formatDateTime(value: string | null) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function SummaryCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
      <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
        {label}
      </p>
      <p className='mt-2 text-3xl font-bold text-slate-900'>{value}</p>
      <p className='mt-1 text-sm text-slate-600'>{detail}</p>
    </div>
  );
}

export default async function PassportChallengePage({ params }: PageProps) {
  const { id: eventId } = await params;
  const tracker = await fetchPassportChallengeTracker(eventId);

  return (
    <CategoryPageShell
      eventId={eventId}
      title='Passport Challenge'
      description='Track attendee passport stamp progress across all exhibitors.'
      activeCategory='passport'
    >
      <section className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
        <SummaryCard
          label='Average completion'
          value={`${tracker.averageCompletionPercent}%`}
          detail={`${tracker.totalStamps} of ${tracker.totalPossibleStamps} possible stamps`}
        />
        <SummaryCard
          label='Completed passports'
          value={String(tracker.completedRegistrants)}
          detail={`${tracker.eligibleRegistrants} eligible registrants`}
        />
        <SummaryCard
          label='Exhibitors'
          value={String(tracker.totalExhibitors)}
          detail='Available passport stops'
        />
        <SummaryCard
          label='Registrants'
          value={String(tracker.totalRegistrants)}
          detail={`${tracker.eligibleRegistrants} with app profiles`}
        />
      </section>

      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>
              Registrant Progress
            </h2>
            <p className='mt-1 text-slate-600'>
              Sorted by most passport stamps collected.
            </p>
          </div>
          <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>
            {tracker.registrants.length} registrants
          </span>
        </div>

        <div className='mt-6 overflow-hidden rounded-2xl border border-slate-200'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
              <tr>
                <th className='px-4 py-3'>Registrant</th>
                <th className='px-4 py-3'>Company</th>
                <th className='px-4 py-3'>Status</th>
                <th className='px-4 py-3'>Progress</th>
                <th className='px-4 py-3'>Last Scan</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-slate-200'>
              {tracker.registrants.map((registrant) => (
                <tr key={registrant.registrantId} className='bg-white'>
                  <td className='px-4 py-3'>
                    <Link
                      href={`/aps/${eventId}/registrants/${registrant.registrantId}`}
                      className='font-semibold text-slate-900 hover:underline'
                    >
                      {registrant.name}
                    </Link>
                    <div className='mt-0.5 text-xs text-slate-500'>
                      {registrant.email}
                    </div>
                    {!registrant.userProfileId ? (
                      <div className='mt-1 text-xs font-semibold text-amber-700'>
                        No app profile
                      </div>
                    ) : null}
                  </td>
                  <td className='px-4 py-3 text-slate-700'>
                    {registrant.companyName ?? '—'}
                  </td>
                  <td className='px-4 py-3'>
                    <div className='flex flex-col gap-1'>
                      <span className='w-fit rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700'>
                        {registrant.status}
                      </span>
                      {registrant.attendeeType ? (
                        <span className='text-xs text-slate-500'>
                          {registrant.attendeeType}
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className='px-4 py-3'>
                    <div className='min-w-36'>
                      <div className='flex items-center justify-between gap-3 text-xs font-semibold text-slate-700'>
                        <span>
                          {registrant.completedCount}/{registrant.totalExhibitors}
                        </span>
                        <span>{registrant.percentComplete}%</span>
                      </div>
                      <div className='mt-2 h-2 overflow-hidden rounded-full bg-slate-100'>
                        <div
                          className='h-full rounded-full bg-slate-900'
                          style={{ width: `${registrant.percentComplete}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className='px-4 py-3 text-slate-700'>
                    {formatDateTime(registrant.lastScannedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>
              Exhibitor Stamp Counts
            </h2>
            <p className='mt-1 text-slate-600'>
              Shows which booths are collecting the most passport scans.
            </p>
          </div>
          <Link
            href={`/aps/${eventId}/exhibitors`}
            className='text-sm font-semibold text-slate-700 underline-offset-2 hover:text-slate-900 hover:underline'
          >
            Manage exhibitors →
          </Link>
        </div>

        <div className='mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3'>
          {tracker.exhibitors.map((exhibitor) => (
            <Link
              key={exhibitor.exhibitorId}
              href={`/aps/${eventId}/exhibitors/${exhibitor.exhibitorId}`}
              className='rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md'
            >
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <p className='font-semibold text-slate-900'>
                    {exhibitor.companyName}
                  </p>
                  <p className='mt-1 text-xs text-slate-500'>
                    {exhibitor.boothNumber
                      ? `Booth ${exhibitor.boothNumber}`
                      : 'No booth number'}
                  </p>
                </div>
                <span className='rounded-full bg-slate-900 px-2.5 py-1 text-xs font-semibold text-white'>
                  {exhibitor.stampCount}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </CategoryPageShell>
  );
}
