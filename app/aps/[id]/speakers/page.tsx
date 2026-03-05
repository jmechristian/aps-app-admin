import CategoryPageShell from '../category-page-shell';
import Link from 'next/link';
import {
  fetchSpeakerProfilesByEventId,
} from '@/app/actions/event-content';
import CreateSpeakerButton from './create-speaker-button';
import { fetchRegistrantsByApsId } from '@/app/actions/registrants';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SpeakersPage({ params }: PageProps) {
  const { id: eventId } = await params;
  const [speakerProfiles, registrants] = await Promise.all([
    fetchSpeakerProfilesByEventId(eventId),
    fetchRegistrantsByApsId(eventId),
  ]);

  return (
    <CategoryPageShell
      eventId={eventId}
      title='Speakers'
      description='Speakers are backed by APSSpeaker records for this event.'
      activeCategory='speakers'
    >
      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>
              Speakers
            </h2>
            <p className='mt-1 text-slate-600'>
              {speakerProfiles.length} speaker
              {speakerProfiles.length === 1 ? '' : 's'} for this event.
            </p>
          </div>
          <CreateSpeakerButton
            eventId={eventId}
            registrants={registrants.map((r) => ({
              id: r.id,
              firstName: r.firstName ?? null,
              lastName: r.lastName ?? null,
              email: r.email,
              companyName: r.company?.name ?? null,
              attendeeType: r.attendeeType,
            }))}
          />
        </div>

        {speakerProfiles.length === 0 ? (
          <div className='mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
            No APSSpeaker records found yet.
          </div>
        ) : (
          <div className='mt-6 overflow-hidden rounded-2xl border border-slate-200'>
            <table className='w-full text-left text-sm'>
              <thead className='bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
                <tr>
                  <th className='px-4 py-3'>Name</th>
                  <th className='px-4 py-3'>Email</th>
                  <th className='px-4 py-3'>Company</th>
                  <th className='px-4 py-3'>Title</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {speakerProfiles.map((s) => (
                  <tr key={s.id} className='bg-white'>
                    <td className='px-4 py-3 font-semibold text-slate-900'>
                      <Link
                        href={`/aps/${eventId}/speakers/${s.id}`}
                        className='hover:underline'
                      >
                        {s.profile?.firstName ?? '—'} {s.profile?.lastName ?? ''}
                      </Link>
                    </td>
                    <td className='px-4 py-3 text-slate-700'>
                      {s.profile?.email ?? '—'}
                    </td>
                    <td className='px-4 py-3 text-slate-700'>
                      {s.profile?.company ?? '—'}
                    </td>
                    <td className='px-4 py-3 text-slate-700'>
                      {s.profile?.jobTitle ?? '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </CategoryPageShell>
  );
}


