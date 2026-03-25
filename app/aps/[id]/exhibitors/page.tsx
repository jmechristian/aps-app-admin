import CategoryPageShell from '../category-page-shell';
import {
  fetchApprovedRegistrantsByCompanyForEvent,
  fetchExhibitorProfilesByEventId,
} from '@/app/actions/event-content';
import { fetchCompaniesByEventId } from '@/app/actions/companies';
import Link from 'next/link';
import CreateExhibitorButton from './create-exhibitor-button';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ExhibitorsPage({ params }: PageProps) {
  const { id: eventId } = await params;
  const [exhibitors, companies, approvedByCompany] = await Promise.all([
    fetchExhibitorProfilesByEventId(eventId),
    fetchCompaniesByEventId(eventId),
    fetchApprovedRegistrantsByCompanyForEvent(eventId),
  ]);

  return (
    <CategoryPageShell
      eventId={eventId}
      title='Exhibitors'
      description='Exhibitors are backed by ApsAppExhibitorProfile records for this event.'
      activeCategory='exhibitors'
    >
      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>Exhibitors</h2>
            <p className='mt-1 text-slate-600'>
              {exhibitors.length} exhibitor{exhibitors.length === 1 ? '' : 's'}{' '}
              for this event.
            </p>
          </div>
          <CreateExhibitorButton eventId={eventId} companies={companies} />
        </div>

        {exhibitors.length === 0 ? (
          <div className='mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
            No exhibitor profiles found for this event yet.
          </div>
        ) : (
          <div className='mt-6 overflow-hidden rounded-2xl border border-slate-200'>
            <table className='w-full text-left text-sm'>
              <thead className='bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
                <tr>
                  <th className='px-4 py-3'>Company</th>
                  <th className='px-4 py-3'>Booth</th>
                  <th className='px-4 py-3'>Approved Registrants</th>
                  <th className='px-4 py-3'>Exhibitor ID</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {exhibitors.map((exhibitor) => {
                  const approved =
                    approvedByCompany[
                      exhibitor.company?.id ?? exhibitor.companyId ?? ''
                    ] ?? [];
                  const preview = approved.slice(0, 3);
                  const remaining = approved.length - preview.length;

                  return (
                    <tr key={exhibitor.id} className='bg-white'>
                      <td className='px-4 py-3 font-semibold text-slate-900'>
                        <Link
                          href={`/aps/${eventId}/exhibitors/${exhibitor.id}`}
                          className='hover:underline'
                        >
                          {exhibitor.company?.name ?? exhibitor.companyId}
                        </Link>
                      </td>
                      <td className='px-4 py-3 text-slate-700'>
                        {exhibitor.boothNumber || '—'}
                      </td>
                      <td className='px-4 py-3 text-slate-700'>
                        {approved.length === 0 ? (
                          '—'
                        ) : (
                          <div className='space-y-1'>
                            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                              {approved.length} approved
                            </p>
                            <div className='flex flex-wrap gap-2'>
                              {preview.map((registrant) => (
                                <Link
                                  key={registrant.id}
                                  href={`/aps/${eventId}/registrants/${registrant.id}`}
                                  className='rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100 hover:underline'
                                  title={registrant.email}
                                >
                                  {registrant.name}
                                </Link>
                              ))}
                              {remaining > 0 ? (
                                <span className='rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600'>
                                  +{remaining} more
                                </span>
                              ) : null}
                            </div>
                          </div>
                        )}
                      </td>
                      <td className='px-4 py-3 font-mono text-xs text-slate-700'>
                        {exhibitor.id}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </CategoryPageShell>
  );
}


