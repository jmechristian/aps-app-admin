import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchSpeakerProfileById } from '@/app/actions/event-content';
import { syncSpeakerHeadshotFromRegistrant } from '@/app/actions/speakers';
import StorageImage from '@/app/components/storage-image';

type PageProps = {
  params: Promise<{ id: string; speakerId: string }>;
};

export default async function SpeakerDetailPage({ params }: PageProps) {
  const { id: eventId, speakerId } = await params;
  const speaker = await fetchSpeakerProfileById(speakerId);

  if (!speaker) notFound();

  // Best-effort: sync headshot from the matching registrant's profile picture.
  // This updates APSSpeaker.headshot only when it's missing/placeholder.
  const synced = await syncSpeakerHeadshotFromRegistrant({
    eventId,
    speakerId,
  });
  const speakerForDisplay = synced ?? speaker;
  const speakerName = `${speaker.firstName} ${speaker.lastName}`;

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Speaker
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>
              {speaker.firstName} {speaker.lastName}
            </h1>
            <p className='text-slate-600'>
              {speaker.company}
              {speaker.title ? ` · ${speaker.title}` : ''}
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

        <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
          <div className='grid gap-6 md:grid-cols-[180px_1fr]'>
            <div className='overflow-hidden rounded-2xl border border-slate-200 bg-slate-50'>
              {speakerForDisplay.headshot ? (
                <StorageImage
                  srcOrKey={speakerForDisplay.headshot}
                  alt={speakerName}
                  className='h-[180px] w-[180px] object-cover'
                  width={180}
                  height={180}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src='/images/hub-mock.png'
                  alt={speakerName}
                  className='h-[180px] w-[180px] object-cover'
                />
              )}
            </div>

            <div className='space-y-4'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Email
                  </p>
                  <p className='mt-1 text-slate-900'>{speakerForDisplay.email}</p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Phone
                  </p>
                  <p className='mt-1 text-slate-900'>{speaker.phone || '—'}</p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    LinkedIn
                  </p>
                  <p className='mt-1 text-slate-900'>
                    {speaker.linkedin ? (
                      <a
                        href={speaker.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:underline'
                      >
                        View
                      </a>
                    ) : (
                      '—'
                    )}
                  </p>
                </div>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Speaker ID
                  </p>
                  <p className='mt-1 font-mono text-xs text-slate-900'>
                    {speaker.id}
                  </p>
                </div>
              </div>

              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Bio
                </p>
                <p className='mt-2 whitespace-pre-wrap text-slate-700'>
                  {speaker.bio || '—'}
                </p>
              </div>

              {(speaker.presentationTitle || speaker.presentationSummary) && (
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                    Presentation
                  </p>
                  <p className='mt-2 font-semibold text-slate-900'>
                    {speaker.presentationTitle || '—'}
                  </p>
                  {speaker.presentationSummary && (
                    <p className='mt-1 whitespace-pre-wrap text-slate-700'>
                      {speaker.presentationSummary}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


