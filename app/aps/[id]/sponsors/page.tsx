import CategoryPageShell from '../category-page-shell';
import Link from 'next/link';
import {
  fetchApprovedRegistrantsByCompanyForEvent,
  fetchSponsorsByEventId,
} from '@/app/actions/event-content';
import { fetchCompaniesByEventId } from '@/app/actions/registrants';
import CreateSponsorButton from './create-sponsor-button';
import SponsorTypeSelect from './sponsor-type-select';
import StorageImage from '@/app/components/storage-image';
import DeleteSponsorButton from './delete-sponsor-button';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SponsorsPage({ params }: PageProps) {
  const { id: eventId } = await params;
  const [sponsors, companies, approvedByCompany] = await Promise.all([
    fetchSponsorsByEventId(eventId),
    fetchCompaniesByEventId(eventId),
    fetchApprovedRegistrantsByCompanyForEvent(eventId),
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
                  <th className='px-4 py-3'>Type</th>
                  <th className='px-4 py-3'>Approved Registrants</th>
                  <th className='px-4 py-3'>Sponsor ID</th>
                  <th className='px-4 py-3'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {sponsors.map((sponsor) => {
                  const approved =
                    approvedByCompany[sponsor.company?.id ?? sponsor.companyId ?? ''] ?? [];
                  const preview = approved.slice(0, 3);
                  const remaining = approved.length - preview.length;

                  return (
                    <tr key={sponsor.id} className='bg-white'>
                      <td className='px-4 py-3 font-semibold text-slate-900'>
                        <div className='flex items-center gap-3'>
                          {sponsor.company?.logo ? (
                            <StorageImage
                              srcOrKey={sponsor.company.logo}
                              alt={`${sponsor.company?.name ?? 'Sponsor'} logo`}
                              className='h-8 w-8 rounded-full border border-slate-200 bg-white object-contain'
                              accessLevel='guest'
                            />
                          ) : (
                            <div
                              className='h-8 w-8 rounded-full bg-slate-200'
                              aria-label='No sponsor logo'
                            />
                          )}
                          <Link
                            href={`/aps/${eventId}/sponsors/${sponsor.id}`}
                            className='hover:underline'
                          >
                            <span className='block'>
                              {sponsor.company?.name ?? sponsor.companyId ?? 'Unknown company'}
                            </span>
                            <span className='mt-0.5 block font-mono text-xs font-normal text-slate-500'>
                              {sponsor.company?.id ?? sponsor.companyId}
                            </span>
                          </Link>
                        </div>
                      </td>
                      <td className='px-4 py-3'>
                        <SponsorTypeSelect
                          sponsorId={sponsor.id}
                          eventId={eventId}
                          value={sponsor.type}
                        />
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
                        <Link
                          href={`/aps/${eventId}/sponsors/${sponsor.id}`}
                          className='hover:underline'
                        >
                          {sponsor.id}
                        </Link>
                      </td>
                      <td className='px-4 py-3'>
                        <DeleteSponsorButton
                          sponsorId={sponsor.id}
                          eventId={eventId}
                          companyName={sponsor.company?.name}
                        />
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


