import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchRegistrantById } from '@/app/actions/registrants';
import CompanyLogoForm from './company-logo-form';
import RegistrantEditForm from './registrant-edit-form';

type PageProps = {
  params: Promise<{ id: string; registrantId: string }>;
};

export default async function RegistrantProfile({ params }: PageProps) {
  const { id: eventId, registrantId } = await params;
  const registrant = await fetchRegistrantById(registrantId);

  if (!registrant) {
    notFound();
  }

  const fullName =
    `${registrant.firstName || ''} ${registrant.lastName || ''}`.trim() ||
    'N/A';

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex items-center justify-between gap-4'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Registrant Profile
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>{fullName}</h1>
            <p className='text-slate-600'>{registrant.email}</p>
          </div>
          <Link
            href={`/aps/${eventId}`}
            className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
          >
            ← Back to event
          </Link>
        </header>

        <RegistrantEditForm registrant={registrant} eventId={eventId} />

        <div className='grid gap-6 lg:grid-cols-3'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Bio */}
            {registrant.bio && (
              <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
                <h2 className='mb-6 text-xl font-bold text-slate-900'>Bio</h2>
                <p className='text-slate-700 whitespace-pre-wrap'>
                  {registrant.bio}
                </p>
              </div>
            )}

            {/* Billing Address */}
            {(registrant.billingAddressStreet ||
              registrant.billingAddressCity ||
              registrant.billingAddressState ||
              registrant.billingAddressZip) && (
              <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
                <h2 className='mb-6 text-xl font-bold text-slate-900'>
                  Billing Address
                </h2>
                <div className='space-y-2 text-slate-700'>
                  {registrant.billingAddressFirstName &&
                    registrant.billingAddressLastName && (
                      <p>
                        {registrant.billingAddressFirstName}{' '}
                        {registrant.billingAddressLastName}
                      </p>
                    )}
                  {registrant.billingAddressStreet && (
                    <p>{registrant.billingAddressStreet}</p>
                  )}
                  {(registrant.billingAddressCity ||
                    registrant.billingAddressState ||
                    registrant.billingAddressZip) && (
                    <p>
                      {[
                        registrant.billingAddressCity,
                        registrant.billingAddressState,
                        registrant.billingAddressZip,
                      ]
                        .filter(Boolean)
                        .join(', ')}
                    </p>
                  )}
                  {registrant.billingAddressEmail && (
                    <p>
                      <a
                        href={`mailto:${registrant.billingAddressEmail}`}
                        className='text-slate-900 hover:text-slate-700 hover:underline'
                      >
                        {registrant.billingAddressEmail}
                      </a>
                    </p>
                  )}
                  {registrant.billingAddressPhone && (
                    <p>
                      <a
                        href={`tel:${registrant.billingAddressPhone}`}
                        className='text-slate-900 hover:text-slate-700 hover:underline'
                      >
                        {registrant.billingAddressPhone}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className='lg:col-span-3 space-y-6'>
            <div className='grid gap-6 sm:grid-cols-[2fr_1fr]'>
              {/* Company Information */}
              {registrant.company && (
                <div className='w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
                  <h2 className='mb-6 text-xl font-bold text-slate-900'>
                    Company
                  </h2>
                  <div className='space-y-3'>
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                        Company Name
                      </p>
                      <p className='mt-1 text-slate-900'>
                        {registrant.company.name}
                      </p>
                    </div>
                    {registrant.company.email && (
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                          Company Email
                        </p>
                        <p className='mt-1 text-slate-900'>
                          <a
                            href={`mailto:${registrant.company.email}`}
                            className='text-slate-900 hover:text-slate-700 hover:underline'
                          >
                            {registrant.company.email}
                          </a>
                        </p>
                      </div>
                    )}
                    {registrant.company.website && (
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                          Website
                        </p>
                        <p className='mt-1 text-slate-900'>
                          <a
                            href={registrant.company.website}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-slate-900 hover:text-slate-700 hover:underline'
                          >
                            {registrant.company.website}
                          </a>
                        </p>
                      </div>
                    )}
                    {registrant.company.type && (
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                          Company Type
                        </p>
                        <p className='mt-1 text-slate-900'>
                          {registrant.company.type}
                        </p>
                      </div>
                    )}
                  </div>
                <CompanyLogoForm
                  companyId={registrant.company.id}
                  eventId={eventId}
                  registrantId={registrant.id}
                  logo={registrant.company.logo}
                />
                </div>
              )}

              {/* QR Code */}
              {registrant.qrCode && (
                <div className='w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
                  <h3 className='mb-4 text-lg font-semibold text-slate-900'>
                    QR Code
                  </h3>
                  <div className='flex justify-center'>
                    <img
                      src={registrant.qrCode}
                      alt='Registrant QR Code'
                      width={256}
                      height={256}
                      className='rounded-lg'
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
