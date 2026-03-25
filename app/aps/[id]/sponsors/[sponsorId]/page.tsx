import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  fetchRegistrantListsForCompanyInEvent,
  fetchSponsorById,
} from '@/app/actions/event-content';
import {
  fetchCompanyContacts,
  updateCompany,
} from '@/app/actions/companies';
import SponsorTypeSelect from '../sponsor-type-select';
import CompanyLogoField from '../../companies/[companyId]/company-logo-field';

type PageProps = {
  params: Promise<{ id: string; sponsorId: string }>;
};

export default async function SponsorDetailPage({ params }: PageProps) {
  const { id: eventId, sponsorId } = await params;
  const sponsor = await fetchSponsorById(sponsorId);
  if (!sponsor) notFound();
  if (!sponsor.company?.id) notFound();

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
              {sponsor.company.name}
            </h1>
            <p className='text-slate-600'>{sponsor.type ?? 'No sponsor type set'}</p>
            <p className='font-mono text-xs text-slate-600'>
              Sponsor ID: {sponsor.id} · Company ID: {sponsor.company.id}
            </p>
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
              <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Company
                  </p>
                  <p className='mt-1 font-mono text-xs text-slate-600'>
                    Company ID: {sponsor.company.id}
                  </p>
                </div>
                <Link
                  href={`/aps/${eventId}/companies/${sponsor.company.id}`}
                  className='shrink-0 text-sm font-semibold text-slate-700 underline-offset-2 hover:text-slate-900 hover:underline'
                >
                  Manage contacts →
                </Link>
              </div>

              <form action={updateCompany} className='grid gap-4'>
                <input type='hidden' name='id' value={sponsor.company.id} />
                <input type='hidden' name='eventId' value={eventId} />
                <input type='hidden' name='sponsorId' value={sponsorId} />

                <div className='grid gap-4 md:grid-cols-2'>
                  <label className='text-sm font-medium text-slate-700'>
                    Company name <span className='text-red-500'>*</span>
                    <input
                      name='name'
                      defaultValue={sponsor.company.name}
                      required
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    />
                  </label>
                  <label className='text-sm font-medium text-slate-700'>
                    Email <span className='text-red-500'>*</span>
                    <input
                      name='email'
                      type='text'
                      defaultValue={sponsor.company.email || '@'}
                      placeholder='@example.com'
                      required
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    />
                  </label>
                  <label className='text-sm font-medium text-slate-700'>
                    Company type
                    <select
                      name='type'
                      defaultValue={sponsor.company.type ?? ''}
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    >
                      <option value=''>None</option>
                      <option value='SPONSOR'>SPONSOR</option>
                      <option value='OEMTIER1'>OEM/Tier 1</option>
                      <option value='SOLUTIONPROVIDER'>Solution Provider</option>
                    </select>
                  </label>
                  <label className='text-sm font-medium text-slate-700'>
                    Website
                    <input
                      name='website'
                      defaultValue={sponsor.company.website ?? ''}
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    />
                  </label>
                  <label className='text-sm font-medium text-slate-700'>
                    Phone
                    <input
                      name='phone'
                      defaultValue={sponsor.company.phone ?? ''}
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    />
                  </label>
                  <label className='text-sm font-medium text-slate-700'>
                    Address
                    <input
                      name='address'
                      defaultValue={sponsor.company.address ?? ''}
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    />
                  </label>
                  <label className='text-sm font-medium text-slate-700'>
                    City
                    <input
                      name='city'
                      defaultValue={sponsor.company.city ?? ''}
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    />
                  </label>
                  <label className='text-sm font-medium text-slate-700'>
                    State
                    <input
                      name='state'
                      defaultValue={sponsor.company.state ?? ''}
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    />
                  </label>
                  <label className='text-sm font-medium text-slate-700'>
                    Zip
                    <input
                      name='zip'
                      defaultValue={sponsor.company.zip ?? ''}
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    />
                  </label>
                  <label className='text-sm font-medium text-slate-700'>
                    Country
                    <input
                      name='country'
                      defaultValue={sponsor.company.country ?? ''}
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    />
                  </label>
                  <div className='md:col-span-2'>
                    <CompanyLogoField
                      companyId={sponsor.company.id}
                      initialValue={sponsor.company.logo}
                    />
                  </div>
                </div>

                <label className='text-sm font-medium text-slate-700'>
                  Description
                  <textarea
                    name='description'
                    defaultValue={sponsor.company.description ?? ''}
                    rows={4}
                    className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                  />
                </label>

                <div className='flex justify-end'>
                  <button
                    type='submit'
                    className='rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md'
                  >
                    Save company
                  </button>
                </div>
              </form>

              <div className='border-t border-slate-200 pt-4'>
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
                  <p className='mt-2 text-sm text-slate-700'>—</p>
                )}
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
