import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  fetchLatestTempCredentialByRegistrantId,
  fetchRegistrantById,
} from '@/app/actions/registrants';
import { fetchAddOnRequestsByRegistrantId } from '@/app/actions/add-ons';
import { fetchAllCompanies } from '@/app/actions/companies';
import {
  getThinkificEnrollmentsByEmail,
  getThinkificUserIdByEmail,
  type ThinkificEnrollment,
} from '@/app/actions/thinkific';
import CompanyLogoForm from './company-logo-form';
import RegistrantEditForm from './registrant-edit-form';
import RegistrantQrCodePanel from './registrant-qr-code-panel';
import RegistrantWorkflowPanel from './registrant-workflow-panel';

type PageProps = {
  params: Promise<{ id: string; registrantId: string }>;
};

function buildVCardPreview(registrant: {
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  company?: { name: string } | null;
  jobTitle?: string | null;
}) {
  const lines: string[] = ['BEGIN:VCARD', 'VERSION:3.0'];
  const fullName =
    `${registrant.firstName ?? ''} ${registrant.lastName ?? ''}`.trim() ||
    registrant.email;
  lines.push(`FN:${fullName}`);
  if (registrant.firstName || registrant.lastName) {
    lines.push(`N:${registrant.lastName ?? ''};${registrant.firstName ?? ''};;;`);
  }
  lines.push(`EMAIL:${registrant.email}`);
  if (registrant.phone) lines.push(`TEL:${registrant.phone}`);
  if (registrant.company?.name) lines.push(`ORG:${registrant.company.name}`);
  if (registrant.jobTitle) lines.push(`TITLE:${registrant.jobTitle}`);
  lines.push('END:VCARD');
  return lines.join('\n');
}

function formatThinkificPercentage(value: string) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return value;

  const normalized = numeric <= 1 ? numeric * 100 : numeric;
  return `${normalized.toFixed(1)}%`;
}

function ThinkificEnrollmentsTable({
  enrollments,
}: {
  enrollments: ThinkificEnrollment[];
}) {
  return (
    <div className='overflow-x-auto'>
      <table className='w-full'>
        <thead>
          <tr className='border-b border-slate-200'>
            <th className='px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
              Course Name
            </th>
            <th className='px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
              Course ID
            </th>
            <th className='px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
              Percentage Completed
            </th>
            <th className='px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-700'>
              Expired
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-slate-100'>
          {enrollments.map((enrollment) => (
            <tr key={enrollment.id} className='hover:bg-slate-50'>
              <td className='px-3 py-2 text-sm text-slate-800'>
                {enrollment.course_name}
              </td>
              <td className='px-3 py-2 text-sm text-slate-600'>
                {enrollment.course_id}
              </td>
              <td className='px-3 py-2 text-sm text-slate-600'>
                {formatThinkificPercentage(enrollment.percentage_completed)}
              </td>
              <td className='px-3 py-2 text-sm'>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    enrollment.expired
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {enrollment.expired ? 'Yes' : 'No'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function RegistrantProfile({ params }: PageProps) {
  const { id: eventId, registrantId } = await params;
  const [registrant, addOnRequests, latestCredential, companies] = await Promise.all([
    fetchRegistrantById(registrantId),
    fetchAddOnRequestsByRegistrantId(registrantId),
    fetchLatestTempCredentialByRegistrantId(registrantId),
    fetchAllCompanies(),
  ]);

  if (!registrant) {
    notFound();
  }

  let thinkificEnrollments: ThinkificEnrollment[] = [];
  let thinkificUserId: number | null = null;
  let thinkificError: string | null = null;

  const sortByCourseName = (a: ThinkificEnrollment, b: ThinkificEnrollment) =>
    a.course_name.localeCompare(b.course_name, undefined, {
      sensitivity: 'base',
    });

  try {
    thinkificEnrollments = await getThinkificEnrollmentsByEmail(registrant.email);
  } catch (error) {
    console.error('Failed to fetch Thinkific enrollments:', error);
    thinkificError =
      error instanceof Error
        ? error.message
        : 'Could not load Thinkific enrollments right now.';
  }
  try {
    thinkificUserId = await getThinkificUserIdByEmail(registrant.email);
  } catch (error) {
    console.error('Failed to fetch Thinkific user id:', error);
  }

  const apcEnrollments = thinkificEnrollments
    .filter((enrollment) => enrollment.course_name.toUpperCase().includes('APC'))
    .sort(sortByCourseName);
  const otherThinkificEnrollments = thinkificEnrollments
    .filter((enrollment) => !enrollment.course_name.toUpperCase().includes('APC'))
    .sort(sortByCourseName);

  const fullName =
    `${registrant.firstName || ''} ${registrant.lastName || ''}`.trim() ||
    'N/A';
  const vCardPreview = buildVCardPreview(registrant);

  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex items-center justify-between gap-4'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Registrant Profile
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>{fullName}</h1>
            <p className='text-slate-600'>{registrant.email}</p>
            <div className='flex flex-col gap-1 pt-1 font-mono text-xs text-slate-600'>
              <span>Registrant ID: {registrant.id}</span>
              <span>
                Profile ID: {registrant.appUser?.profile?.id ?? '—'}
              </span>
            </div>
          </div>
          <Link
            href={`/aps/${eventId}`}
            className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
          >
            ← Back to event
          </Link>
        </header>

        <RegistrantEditForm
          registrant={registrant}
          eventId={eventId}
          companies={companies}
        />

        <RegistrantWorkflowPanel
          eventId={eventId}
          registrantId={registrant.id}
          status={registrant.status}
          addOnRequests={addOnRequests.filter(
            (request) => request.addOn?.eventId === eventId
          )}
          existingTempPassword={latestCredential?.tempPassword ?? null}
        />

        <div className='space-y-6'>
          <div className='w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
            <div className='mb-2 flex items-start justify-between gap-3'>
              <h2 className='text-xl font-bold text-slate-900'>
                Thinkific Enrollments
              </h2>
              <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'>
                Thinkific ID: {thinkificUserId ?? 'No ID found'}
              </span>
            </div>
            <p className='mb-6 text-sm text-slate-600'>
              Matching enrollments for {registrant.email}
            </p>

            {thinkificError ? (
              <p className='text-sm font-medium text-red-700'>{thinkificError}</p>
            ) : thinkificEnrollments.length === 0 ? (
              <div className='rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center'>
                <p className='text-sm font-semibold text-slate-700'>
                  No Thinkific enrollments found
                </p>
                <p className='mt-1 text-xs text-slate-500'>
                  No enrollment records were returned for this registrant email.
                </p>
              </div>
            ) : (
              <div className='space-y-5'>
                <section>
                  <h3 className='mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    APC Enrollments
                  </h3>
                  {apcEnrollments.length > 0 ? (
                    <ThinkificEnrollmentsTable enrollments={apcEnrollments} />
                  ) : (
                    <p className='text-sm text-slate-500'>No APC enrollments found.</p>
                  )}
                </section>

                <details className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
                  <summary className='cursor-pointer list-none text-sm font-semibold text-slate-800'>
                    Other Thinkific Enrollments ({otherThinkificEnrollments.length})
                  </summary>
                  <div className='mt-4'>
                    {otherThinkificEnrollments.length > 0 ? (
                      <ThinkificEnrollmentsTable
                        enrollments={otherThinkificEnrollments}
                      />
                    ) : (
                      <p className='text-sm text-slate-500'>
                        No non-APC enrollments found.
                      </p>
                    )}
                  </div>
                </details>
              </div>
            )}
          </div>

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
            <RegistrantQrCodePanel
              eventId={eventId}
              registrantId={registrant.id}
              qrCode={registrant.qrCode ?? null}
              vCardPreview={vCardPreview}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
