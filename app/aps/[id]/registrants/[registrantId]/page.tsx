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

  const fullName =
    `${registrant.firstName || ''} ${registrant.lastName || ''}`.trim() ||
    'N/A';

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
              <h2 className='mb-6 text-xl font-bold text-slate-900'>
                Basic Information
              </h2>
              <div className='grid gap-4 md:grid-cols-2'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    First Name
                  </p>
                  <p className='mt-1 text-slate-900'>
                    {registrant.firstName || '—'}
                  </p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Last Name
                  </p>
                  <p className='mt-1 text-slate-900'>
                    {registrant.lastName || '—'}
                  </p>
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
                  <p className='mt-1 text-slate-900'>
                    {registrant.jobTitle || '—'}
                  </p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Attendee Type
                  </p>
                  <p className='mt-1 text-slate-900'>
                    {getAttendeeTypeLabel(registrant.attendeeType)}
                  </p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Status
                  </p>
                  <p className='mt-1'>
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusColor(
                        registrant.status
                      )}`}
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
              </div>
            )}

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

            {/* Debug: Show appUser status */}
            {process.env.NODE_ENV === 'development' && (
              <div className='rounded-3xl border border-blue-200 bg-blue-50 p-8 shadow-lg'>
                <h2 className='mb-6 text-xl font-bold text-slate-900'>
                  Debug Info
                </h2>
                <div className='space-y-2 text-sm'>
                  <p>
                    <strong>Has appUser:</strong>{' '}
                    {registrant.appUser ? 'Yes' : 'No'}
                  </p>
                  {registrant.appUser && (
                    <>
                      <p>
                        <strong>App User ID:</strong> {registrant.appUser.id}
                      </p>
                      <p>
                        <strong>Has profile:</strong>{' '}
                        {registrant.appUser.profile ? 'Yes' : 'No'}
                      </p>
                      {registrant.appUser.profile && (
                        <>
                          <p>
                            <strong>Profile ID:</strong>{' '}
                            {registrant.appUser.profile.id}
                          </p>
                          <p>
                            <strong>Profile firstName:</strong>{' '}
                            {registrant.appUser.profile.firstName || 'null'}
                          </p>
                          <p>
                            <strong>Has affiliates:</strong>{' '}
                            {registrant.appUser.profile.affiliates?.items
                              ?.length || 0}
                          </p>
                          <p>
                            <strong>Has education:</strong>{' '}
                            {registrant.appUser.profile.education?.items
                              ?.length || 0}
                          </p>
                          <p>
                            <strong>Has interests:</strong>{' '}
                            {registrant.appUser.profile.interests?.items
                              ?.length || 0}
                          </p>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* App User Profile */}
            {registrant.appUser?.profile && (
              <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
                <h2 className='mb-6 text-xl font-bold text-slate-900'>
                  App User Profile
                </h2>
                <div className='space-y-6'>
                  {/* Profile Picture */}
                  {registrant.appUser.profile.profilePicture && (
                    <div className='flex justify-center'>
                      <img
                        src={registrant.appUser.profile.profilePicture}
                        alt='Profile Picture'
                        className='h-32 w-32 rounded-full object-cover'
                      />
                    </div>
                  )}

                  {/* Basic Profile Info */}
                  <div className='grid gap-4 md:grid-cols-2'>
                    {registrant.appUser.profile.firstName && (
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                          First Name
                        </p>
                        <p className='mt-1 text-slate-900'>
                          {registrant.appUser.profile.firstName}
                        </p>
                      </div>
                    )}
                    {registrant.appUser.profile.lastName && (
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                          Last Name
                        </p>
                        <p className='mt-1 text-slate-900'>
                          {registrant.appUser.profile.lastName}
                        </p>
                      </div>
                    )}
                    {registrant.appUser.profile.email && (
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                          Email
                        </p>
                        <p className='mt-1 text-slate-900'>
                          <a
                            href={`mailto:${registrant.appUser.profile.email}`}
                            className='text-slate-900 hover:text-slate-700 hover:underline'
                          >
                            {registrant.appUser.profile.email}
                          </a>
                        </p>
                      </div>
                    )}
                    {registrant.appUser.profile.phone && (
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                          Phone
                        </p>
                        <p className='mt-1 text-slate-900'>
                          <a
                            href={`tel:${registrant.appUser.profile.phone}`}
                            className='text-slate-900 hover:text-slate-700 hover:underline'
                          >
                            {registrant.appUser.profile.phone}
                          </a>
                        </p>
                      </div>
                    )}
                    {registrant.appUser.profile.company && (
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                          Company
                        </p>
                        <p className='mt-1 text-slate-900'>
                          {registrant.appUser.profile.company}
                        </p>
                      </div>
                    )}
                    {registrant.appUser.profile.jobTitle && (
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                          Job Title
                        </p>
                        <p className='mt-1 text-slate-900'>
                          {registrant.appUser.profile.jobTitle}
                        </p>
                      </div>
                    )}
                    {registrant.appUser.profile.attendeeType && (
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                          Attendee Type
                        </p>
                        <p className='mt-1 text-slate-900'>
                          {getAttendeeTypeLabel(
                            registrant.appUser.profile.attendeeType
                          )}
                        </p>
                      </div>
                    )}
                    {registrant.appUser.profile.location && (
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                          Location
                        </p>
                        <p className='mt-1 text-slate-900'>
                          {registrant.appUser.profile.location}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  {registrant.appUser.profile.bio && (
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2'>
                        Bio
                      </p>
                      <p className='text-slate-700 whitespace-pre-wrap'>
                        {registrant.appUser.profile.bio}
                      </p>
                    </div>
                  )}

                  {/* Social Links */}
                  {(registrant.appUser.profile.linkedin ||
                    registrant.appUser.profile.twitter ||
                    registrant.appUser.profile.facebook ||
                    registrant.appUser.profile.instagram ||
                    registrant.appUser.profile.youtube ||
                    registrant.appUser.profile.website?.length) && (
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3'>
                        Social Links
                      </p>
                      <div className='flex flex-wrap gap-3'>
                        {registrant.appUser.profile.linkedin && (
                          <a
                            href={registrant.appUser.profile.linkedin}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-slate-900 hover:text-slate-700 hover:underline'
                          >
                            LinkedIn
                          </a>
                        )}
                        {registrant.appUser.profile.twitter && (
                          <a
                            href={registrant.appUser.profile.twitter}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-slate-900 hover:text-slate-700 hover:underline'
                          >
                            Twitter
                          </a>
                        )}
                        {registrant.appUser.profile.facebook && (
                          <a
                            href={registrant.appUser.profile.facebook}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-slate-900 hover:text-slate-700 hover:underline'
                          >
                            Facebook
                          </a>
                        )}
                        {registrant.appUser.profile.instagram && (
                          <a
                            href={registrant.appUser.profile.instagram}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-slate-900 hover:text-slate-700 hover:underline'
                          >
                            Instagram
                          </a>
                        )}
                        {registrant.appUser.profile.youtube && (
                          <a
                            href={registrant.appUser.profile.youtube}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-slate-900 hover:text-slate-700 hover:underline'
                          >
                            YouTube
                          </a>
                        )}
                        {registrant.appUser.profile.website?.map(
                          (url, index) => (
                            <a
                              key={index}
                              href={url}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-slate-900 hover:text-slate-700 hover:underline'
                            >
                              Website {index + 1}
                            </a>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Resume */}
                  {registrant.appUser.profile.resume && (
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-2'>
                        Resume
                      </p>
                      <a
                        href={registrant.appUser.profile.resume}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-slate-900 hover:text-slate-700 hover:underline'
                      >
                        View Resume
                      </a>
                    </div>
                  )}

                  {/* Affiliates */}
                  {registrant.appUser.profile.affiliates?.items &&
                    registrant.appUser.profile.affiliates.items.length > 0 && (
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3'>
                          Affiliates
                        </p>
                        <div className='space-y-3'>
                          {registrant.appUser.profile.affiliates.items.map(
                            (affiliate) => (
                              <div
                                key={affiliate.id}
                                className='border-l-4 border-slate-300 pl-4'
                              >
                                {affiliate.affiliate && (
                                  <p className='font-semibold text-slate-900'>
                                    {affiliate.affiliate}
                                  </p>
                                )}
                                {affiliate.role && (
                                  <p className='text-slate-700'>
                                    {affiliate.role}
                                  </p>
                                )}
                                {(affiliate.startDate || affiliate.endDate) && (
                                  <p className='text-sm text-slate-600'>
                                    {affiliate.startDate || '—'} -{' '}
                                    {affiliate.endDate || 'Present'}
                                  </p>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* Education */}
                  {registrant.appUser.profile.education?.items &&
                    registrant.appUser.profile.education.items.length > 0 && (
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3'>
                          Education
                        </p>
                        <div className='space-y-3'>
                          {registrant.appUser.profile.education.items.map(
                            (edu) => (
                              <div
                                key={edu.id}
                                className='border-l-4 border-slate-300 pl-4'
                              >
                                {edu.school && (
                                  <p className='font-semibold text-slate-900'>
                                    {edu.school}
                                  </p>
                                )}
                                {edu.degree && (
                                  <p className='text-slate-700'>{edu.degree}</p>
                                )}
                                {edu.fieldOfStudy && (
                                  <p className='text-sm text-slate-600'>
                                    {edu.fieldOfStudy}
                                  </p>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* Interests */}
                  {registrant.appUser.profile.interests?.items &&
                    registrant.appUser.profile.interests.items.length > 0 && (
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3'>
                          Interests
                        </p>
                        <div className='flex flex-wrap gap-2'>
                          {registrant.appUser.profile.interests.items.map(
                            (interest) => (
                              <span
                                key={interest.id}
                                className='rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800'
                              >
                                {interest.interest}
                              </span>
                            )
                          )}
                        </div>
                      </div>
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

            {/* Additional Info */}
            <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
              <h3 className='mb-4 text-lg font-semibold text-slate-900'>
                Additional Information
              </h3>
              <div className='space-y-3 text-sm'>
                {registrant.totalAmount !== null &&
                  registrant.totalAmount !== undefined && (
                    <div>
                      <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                        Total Amount
                      </p>
                      <p className='mt-1 text-slate-900'>
                        ${registrant.totalAmount.toLocaleString()}
                      </p>
                    </div>
                  )}
                {registrant.discountCode && (
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                      Discount Code
                    </p>
                    <p className='mt-1 text-slate-900'>
                      {registrant.discountCode}
                    </p>
                  </div>
                )}
                {registrant.paymentMethod && (
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                      Payment Method
                    </p>
                    <p className='mt-1 text-slate-900'>
                      {registrant.paymentMethod}
                    </p>
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
