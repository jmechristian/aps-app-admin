import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  fetchRegistrantListsForCompanyInEvent,
  fetchSponsorById,
} from '@/app/actions/event-content';
import { fetchCompanyContacts } from '@/app/actions/companies';
import SponsorTypeSelect from '../sponsor-type-select';
import StorageImage from '@/app/components/storage-image';

type PageProps = {
  params: Promise<{ id: string; sponsorId: string }>;
};

export default async function SponsorDetailPage({ params }: PageProps) {
  const { id: eventId, sponsorId } = await params;
  const sponsor = await fetchSponsorById(sponsorId);
  if (!sponsor) notFound();

  const contacts = sponsor.company?.id
    ? await fetchCompanyContacts(sponsor.company.id)
    : [];
  const registrantsByStatus = sponsor.company?.id
    ? await fetchRegistrantListsForCompanyInEvent({
        eventId,
        companyId: sponsor.company.id,
      })
    : { registered: [], approved: [] };

  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Sponsor
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>
              {sponsor.company?.name ?? sponsor.companyId}
            </h1>
            <p className='text-slate-600'>{sponsor.type ?? 'No sponsor type set'}</p>
          </div>
          <div className='flex flex-wrap gap-3'>
            <Link
              href={`/aps/${eventId}/sponsors`}
              className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
            >
              ← Back to sponsors
            </Link>
            <Link
              href={`/aps/${eventId}`}
              className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
            >
              ← Back to event
            </Link>
          </div>
        </header>

        <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
          <div className='grid gap-6 lg:grid-cols-[1.2fr_0.8fr]'>
            <div className='space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Company
                </p>
                <p className='mt-1 text-lg font-semibold text-slate-900'>
                  {sponsor.company?.name ?? sponsor.companyId}
                </p>
                <p className='mt-1 text-sm text-slate-600'>
                  {sponsor.company?.email ?? '—'}
                </p>
              </div>
              {sponsor.company?.logo ? (
                <div className='flex items-center gap-4'>
                  <div className='h-20 w-20 overflow-hidden rounded-xl border border-slate-200 bg-white'>
                    <StorageImage
                      srcOrKey={sponsor.company.logo}
                      alt={`${sponsor.company?.name ?? 'Company'} logo`}
                      className='h-full w-full object-contain'
                      accessLevel='guest'
                    />
                  </div>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                      Logo
                    </p>
                    <p className='mt-1 text-sm text-slate-600'>Display only</p>
                  </div>
                </div>
              ) : null}
              {sponsor.company?.description ? (
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Description
                  </p>
                  <p className='mt-1 text-slate-900'>{sponsor.company.description}</p>
                </div>
              ) : null}
              <div className='grid gap-3 sm:grid-cols-2'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Phone
                  </p>
                  <p className='mt-1 text-slate-900'>{sponsor.company?.phone ?? '—'}</p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Website
                  </p>
                  <p className='mt-1 text-slate-900'>
                    {sponsor.company?.website ? (
                      <a
                        href={sponsor.company.website}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:underline'
                      >
                        Visit
                      </a>
                    ) : (
                      '—'
                    )}
                  </p>
                </div>
                <div className='sm:col-span-2'>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Contacts
                  </p>
                  {contacts.length ? (
                    <div className='mt-2 space-y-2'>
                      {contacts.map((contact) => (
                        <div
                          key={contact.id}
                          className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800'
                        >
                          <div className='font-semibold'>
                            {contact.name || contact.email}
                          </div>
                          <div className='text-slate-600'>
                            {[contact.title, contact.email, contact.phone]
                              .filter(Boolean)
                              .join(' · ') || '—'}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='mt-1 text-slate-900'>—</p>
                  )}
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Sponsor Type
                </p>
                <div className='mt-2'>
                  <SponsorTypeSelect
                    sponsorId={sponsor.id}
                    eventId={eventId}
                    value={sponsor.type}
                  />
                </div>
              </div>

              <div className='rounded-2xl border border-slate-200 bg-white p-6'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Sponsor ID
                </p>
                <p className='mt-1 font-mono text-xs text-slate-900'>{sponsor.id}</p>
              </div>
            </div>
          </div>

          <div className='mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6'>
            <h3 className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Company Registrants
            </h3>
            <div className='mt-4 grid gap-6 md:grid-cols-2'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Registered ({registrantsByStatus.registered.length})
                </p>
                {registrantsByStatus.registered.length === 0 ? (
                  <p className='mt-2 text-sm text-slate-700'>—</p>
                ) : (
                  <div className='mt-2 flex flex-wrap gap-2'>
                    {registrantsByStatus.registered.map((registrant) => (
                      <Link
                        key={registrant.id}
                        href={`/aps/${eventId}/registrants/${registrant.id}`}
                        className='rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-100 hover:underline'
                        title={`${registrant.email} · ${registrant.status}`}
                      >
                        {registrant.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Approved ({registrantsByStatus.approved.length})
                </p>
                {registrantsByStatus.approved.length === 0 ? (
                  <p className='mt-2 text-sm text-slate-700'>—</p>
                ) : (
                  <div className='mt-2 flex flex-wrap gap-2'>
                    {registrantsByStatus.approved.map((registrant) => (
                      <Link
                        key={registrant.id}
                        href={`/aps/${eventId}/registrants/${registrant.id}`}
                        className='rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs text-emerald-800 hover:bg-emerald-100 hover:underline'
                        title={registrant.email}
                      >
                        {registrant.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
