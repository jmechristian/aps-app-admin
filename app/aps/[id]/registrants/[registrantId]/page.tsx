import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchRegistrantById } from '@/app/actions/registrants';

type PageProps = {
  params: Promise<{ id: string; registrantId: string }>;
};

export default async function RegistrantProfile({ params }: PageProps) {
  const { id: eventId, registrantId } = await params;
  const registrant = await fetchRegistrantById(registrantId);

  if (!registrant) {
    notFound();
  }

  const fullName = `${registrant.firstName || ''} ${registrant.lastName || ''}`.trim() || 'N/A';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getAttendeeTypeLabel = (type: string) => {
    switch (type) {
      case 'OEM':
        return 'OEM';
      case 'TIER1':
        return 'Tier 1';
      case 'SOLUTIONPROVIDER':
        return 'Solution Provider';
      case 'SPONSOR':
        return 'Sponsor';
      case 'SPEAKER':
        return 'Speaker';
      case 'STAFF':
        return 'Staff';
      default:
        return type;
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='mx-auto flex w-full max-w-6xl flex-col gap-8'>
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

        <div className='grid gap-6 lg:grid-cols-3'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Basic Information */}
            <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
              <h2 className='mb-6 text-xl font-bold text-slate-900'>Basic Information</h2>
              <div className='grid gap-4 md:grid-cols-2'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    First Name
                  </p>
                  <p className='mt-1 text-slate-900'>{registrant.firstName || '—'}</p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Last Name
                  </p>
                  <p className='mt-1 text-slate-900'>{registrant.lastName || '—'}</p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Email
                  </p>
                  <p className='mt-1 text-slate-900'>
                    <a
                      href={`mailto:${registrant.email}`}
                      className='text-slate-900 hover:text-slate-700 hover:underline'
                    >
                      {registrant.email}
                    </a>
                  </p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Phone
                  </p>
                  <p className='mt-1 text-slate-900'>
                    {registrant.phone ? (
                      <a
                        href={`tel:${registrant.phone}`}
                        className='text-slate-900 hover:text-slate-700 hover:underline'
                      >
                        {registrant.phone}
                      </a>
                    ) : (
                      '—'
                    )}
                  </p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Job Title
                  </p>
                  <p className='mt-1 text-slate-900'>{registrant.jobTitle || '—'}</p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Attendee Type
                  </p>
                  <p className='mt-1 text-slate-900'>{getAttendeeTypeLabel(registrant.attendeeType)}</p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Status
                  </p>
                  <p className='mt-1'>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(registrant.status)}`}
                    >
                      {registrant.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Company Information */}
            {registrant.company && (
              <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
                <h2 className='mb-6 text-xl font-bold text-slate-900'>Company</h2>
                <div className='space-y-3'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                      Company Name
                    </p>
                    <p className='mt-1 text-slate-900'>{registrant.company.name}</p>
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
                      <p className='mt-1 text-slate-900'>{registrant.company.type}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bio */}
            {registrant.bio && (
              <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
                <h2 className='mb-6 text-xl font-bold text-slate-900'>Bio</h2>
                <p className='text-slate-700 whitespace-pre-wrap'>{registrant.bio}</p>
              </div>
            )}

            {/* Billing Address */}
            {(registrant.billingAddressStreet ||
              registrant.billingAddressCity ||
              registrant.billingAddressState ||
              registrant.billingAddressZip) && (
              <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
                <h2 className='mb-6 text-xl font-bold text-slate-900'>Billing Address</h2>
                <div className='space-y-2 text-slate-700'>
                  {registrant.billingAddressFirstName && registrant.billingAddressLastName && (
                    <p>
                      {registrant.billingAddressFirstName} {registrant.billingAddressLastName}
                    </p>
                  )}
                  {registrant.billingAddressStreet && <p>{registrant.billingAddressStreet}</p>}
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
          <div className='space-y-6'>
            {/* QR Code */}
            {registrant.qrCode && (
              <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
                <h3 className='mb-4 text-lg font-semibold text-slate-900'>QR Code</h3>
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

            {/* Additional Info */}
            <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
              <h3 className='mb-4 text-lg font-semibold text-slate-900'>Additional Information</h3>
              <div className='space-y-3 text-sm'>
                {registrant.totalAmount !== null && registrant.totalAmount !== undefined && (
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                      Total Amount
                    </p>
                    <p className='mt-1 text-slate-900'>${registrant.totalAmount.toLocaleString()}</p>
                  </div>
                )}
                {registrant.discountCode && (
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                      Discount Code
                    </p>
                    <p className='mt-1 text-slate-900'>{registrant.discountCode}</p>
                  </div>
                )}
                {registrant.paymentMethod && (
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                      Payment Method
                    </p>
                    <p className='mt-1 text-slate-900'>{registrant.paymentMethod}</p>
                  </div>
                )}
                {registrant.approvedAt && (
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                      Approved At
                    </p>
                    <p className='mt-1 text-slate-900'>
                      {new Date(registrant.approvedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Created
                  </p>
                  <p className='mt-1 text-slate-900'>
                    {new Date(registrant.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

