import CategoryPageShell from '../category-page-shell';
import Link from 'next/link';
import { fetchSponsorsByEventId } from '@/app/actions/event-content';
import { fetchCompaniesByEventId } from '@/app/actions/registrants';
import CreateSponsorButton from './create-sponsor-button';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SponsorsPage({ params }: PageProps) {
  const { id: eventId } = await params;
  const [sponsors, companies] = await Promise.all([
    fetchSponsorsByEventId(eventId),
    fetchCompaniesByEventId(eventId),
  ]);

  return (
    <CategoryPageShell
      eventId={eventId}
      title='Sponsors'
      description='Sponsors are backed by ApsSponsor records for this event.'
      activeCategory='sponsors'
    >
      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>Sponsors</h2>
            <p className='mt-1 text-slate-600'>
              {sponsors.length} sponsor{sponsors.length === 1 ? '' : 's'} for
              this event.
            </p>
          </div>
          <CreateSponsorButton eventId={eventId} companies={companies} />
        </div>

        {sponsors.length === 0 ? (
          <div className='mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
            No sponsors found for this event yet.
          </div>
        ) : (
          <div className='mt-6 overflow-hidden rounded-2xl border border-slate-200'>
            <table className='w-full text-left text-sm'>
              <thead className='bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
                <tr>
                  <th className='px-4 py-3'>Company</th>
                  <th className='px-4 py-3'>Sponsor ID</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {sponsors.map((sponsor) => (
                  <tr key={sponsor.id} className='bg-white'>
                    <td className='px-4 py-3 font-semibold text-slate-900'>
                      {sponsor.companyId ? (
                        <Link
                          href={`/aps/${eventId}/companies/${sponsor.companyId}`}
                          className='hover:underline'
                        >
                          {sponsor.company?.name ?? sponsor.companyId}
                        </Link>
                      ) : (
                        sponsor.company?.name ?? 'Unknown company'
                      )}
                    </td>
                    <td className='px-4 py-3 font-mono text-xs text-slate-700'>
                      {sponsor.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </CategoryPageShell>
  );
}


