import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchSpeakerProfileById } from '@/app/actions/event-content';
import {
  fetchRegistrantById,
  fetchRegistrantsByApsId,
} from '@/app/actions/registrants';
import SpeakerEditForm from './speaker-edit-form';
import CompanyLogoForm from '../../registrants/[registrantId]/company-logo-form';

type PageProps = {
  params: Promise<{ id: string; speakerId: string }>;
};

export default async function SpeakerDetailPage({ params }: PageProps) {
  const { id: eventId, speakerId } = await params;
  const [speaker, registrants] = await Promise.all([
    fetchSpeakerProfileById(speakerId),
    fetchRegistrantsByApsId(eventId),
  ]);

  if (!speaker) notFound();

  const speakerEmail = speaker.profile?.email?.trim().toLowerCase() ?? '';
  const linkedRegistrant = registrants.find(
    (registrant) => registrant.email.trim().toLowerCase() === speakerEmail
  );
  const registrantDetail = linkedRegistrant
    ? await fetchRegistrantById(linkedRegistrant.id)
    : null;
  const company = registrantDetail?.company ?? null;
  const companyName = company?.name || speaker.profile?.company || '—';

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Speaker
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>
              {speaker.profile?.firstName ?? '—'}{' '}
              {speaker.profile?.lastName ?? ''}
            </h1>
            <p className='text-slate-600'>
              {companyName}
              {speaker.profile?.jobTitle ? ` · ${speaker.profile.jobTitle}` : ''}
            </p>
          </div>
          <div className='flex flex-wrap gap-3'>
            <Link
              href={`/aps/${eventId}/speakers`}
              className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
            >
              ← Back to speakers
            </Link>
            <Link
              href={`/aps/${eventId}`}
              className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
            >
              ← Back to event
            </Link>
          </div>
        </header>

        <SpeakerEditForm speaker={speaker} eventId={eventId} />

        {company ? (
          <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
            <h2 className='mb-6 text-xl font-bold text-slate-900'>Company</h2>
            <div className='space-y-3'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Company Name
                </p>
                <p className='mt-1 text-slate-900'>{company.name}</p>
              </div>
              {company.email && (
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Company Email
                  </p>
                  <p className='mt-1 text-slate-900'>
                    <a
                      href={`mailto:${company.email}`}
                      className='text-slate-900 hover:text-slate-700 hover:underline'
                    >
                      {company.email}
                    </a>
                  </p>
                </div>
              )}
              {company.website && (
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Website
                  </p>
                  <p className='mt-1 text-slate-900'>
                    <a
                      href={company.website}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='text-slate-900 hover:text-slate-700 hover:underline'
                    >
                      {company.website}
                    </a>
                  </p>
                </div>
              )}
              {company.type && (
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Company Type
                  </p>
                  <p className='mt-1 text-slate-900'>{company.type}</p>
                </div>
              )}
            </div>
            {linkedRegistrant ? (
              <CompanyLogoForm
                companyId={company.id}
                eventId={eventId}
                registrantId={linkedRegistrant.id}
                logo={company.logo}
              />
            ) : null}
          </section>
        ) : null}
      </main>
    </div>
  );
}


