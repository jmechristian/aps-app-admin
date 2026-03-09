import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  fetchLatestTempCredentialByRegistrantId,
  fetchRegistrantById,
} from '@/app/actions/registrants';
import { fetchAddOnRequestsByRegistrantId } from '@/app/actions/add-ons';
import CompanyLogoForm from './company-logo-form';
import RegistrantEditForm from './registrant-edit-form';
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

export default async function RegistrantProfile({ params }: PageProps) {
  const { id: eventId, registrantId } = await params;
  const [registrant, addOnRequests, latestCredential] = await Promise.all([
    fetchRegistrantById(registrantId),
    fetchAddOnRequestsByRegistrantId(registrantId),
    fetchLatestTempCredentialByRegistrantId(registrantId),
  ]);

  if (!registrant) {
    notFound();
  }

  const fullName =
    `${registrant.firstName || ''} ${registrant.lastName || ''}`.trim() ||
    'N/A';
  const vCardPreview = buildVCardPreview(registrant);

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
                <div className='mt-6'>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Encoded vCard preview
                  </p>
                  <pre className='mt-2 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700'>
                    {vCardPreview}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
