import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchExhibitorProfileById } from '@/app/actions/event-content';
import { fetchCompanyContacts } from '@/app/actions/companies';
import { updateExhibitorBoothNumber } from '@/app/actions/exhibitors';
import StorageImage from '@/app/components/storage-image';

type PageProps = {
  params: Promise<{ id: string; exhibitorId: string }>;
};

export default async function ExhibitorDetailPage({ params }: PageProps) {
  const { id: eventId, exhibitorId } = await params;
  const exhibitor = await fetchExhibitorProfileById(exhibitorId);

  if (!exhibitor) notFound();

  const contacts = exhibitor.company?.id
    ? await fetchCompanyContacts(exhibitor.company.id)
    : [];

  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Exhibitor
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>
              {exhibitor.company?.name ?? exhibitor.companyId}
            </h1>
            <p className='text-slate-600'>
              {exhibitor.boothNumber ? `Booth ${exhibitor.boothNumber}` : '—'}
            </p>
          </div>
          <div className='flex flex-wrap gap-3'>
            <Link
              href={`/aps/${eventId}/exhibitors`}
              className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
            >
              ← Back to exhibitors
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
                  {exhibitor.company?.name ?? exhibitor.companyId}
                </p>
                <p className='mt-1 text-sm text-slate-600'>
                  {exhibitor.company?.email ?? '—'}
                </p>
              </div>
              {exhibitor.company?.logo ? (
                <div className='flex items-center gap-4'>
                  <div className='h-20 w-20 overflow-hidden rounded-xl border border-slate-200 bg-white'>
                    <StorageImage
                      srcOrKey={exhibitor.company.logo}
                      alt={`${exhibitor.company?.name ?? 'Company'} logo`}
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
              {exhibitor.company?.description ? (
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Description
                  </p>
                  <p className='mt-1 text-slate-900'>
                    {exhibitor.company.description}
                  </p>
                </div>
              ) : null}
              <div className='grid gap-3 sm:grid-cols-2'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Phone
                  </p>
                  <p className='mt-1 text-slate-900'>
                    {exhibitor.company?.phone ?? '—'}
                  </p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Website
                  </p>
                  <p className='mt-1 text-slate-900'>
                    {exhibitor.company?.website ? (
                      <a
                        href={exhibitor.company.website}
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
                    Address
                  </p>
                  <p className='mt-1 text-slate-900'>
                    {[
                      exhibitor.company?.address,
                      exhibitor.company?.city,
                      exhibitor.company?.state,
                      exhibitor.company?.zip,
                      exhibitor.company?.country,
                    ]
                      .filter(Boolean)
                      .join(', ') || '—'}
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
              <form
                action={updateExhibitorBoothNumber}
                className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'
              >
                <div className='mb-4 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800'>
                  <span className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Booth
                  </span>
                  <div className='mt-1 text-lg font-semibold text-slate-900'>
                    {exhibitor.boothNumber ? `Booth ${exhibitor.boothNumber}` : '—'}
                  </div>
                </div>
                <input type='hidden' name='id' value={exhibitor.id} />
                <input type='hidden' name='eventId' value={eventId} />
                <label className='block text-sm font-semibold text-slate-700'>
                  Booth number
                  <input
                    name='boothNumber'
                    defaultValue={exhibitor.boothNumber ?? ''}
                    className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                  />
                </label>
                <button
                  type='submit'
                  className='mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md'
                >
                  Save booth number
                </button>
              </form>

              <div className='rounded-2xl border border-slate-200 bg-white p-6'>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Exhibitor ID
                </p>
                <p className='mt-1 font-mono text-xs text-slate-900'>
                  {exhibitor.id}
                </p>
              </div>
            </div>
          </div>

          {(exhibitor.video || exhibitor.videoCaption) && (
            <div className='mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6'>
              <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                Video
              </p>
              <p className='mt-2 text-slate-900'>{exhibitor.video || '—'}</p>
              {exhibitor.videoCaption && (
                <p className='mt-1 text-slate-700'>{exhibitor.videoCaption}</p>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}


