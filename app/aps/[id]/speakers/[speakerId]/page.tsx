import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchSpeakerProfileById } from '@/app/actions/event-content';
import SpeakerEditForm from './speaker-edit-form';

type PageProps = {
  params: Promise<{ id: string; speakerId: string }>;
};

export default async function SpeakerDetailPage({ params }: PageProps) {
  const { id: eventId, speakerId } = await params;
  const speaker = await fetchSpeakerProfileById(speakerId);

  if (!speaker) notFound();


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
              {speaker.profile?.company ?? '—'}
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
      </main>
    </div>
  );
}


