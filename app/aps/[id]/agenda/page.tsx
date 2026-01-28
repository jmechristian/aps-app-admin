import CategoryPageShell from '../category-page-shell';
import {
  fetchAgendaByEventId,
  fetchAgendaSessionsByAgendaId,
} from '@/app/actions/event-content';
import { fetchSpeakerProfilesByEventId } from '@/app/actions/event-content';
import { fetchSponsorsByEventId } from '@/app/actions/event-content';
import CreateSessionButton from './create-session-button';
import SessionsTable from './sessions-table';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AgendaPage({ params }: PageProps) {
  const { id: eventId } = await params;
  const agenda = await fetchAgendaByEventId(eventId);
  const sessions = agenda ? await fetchAgendaSessionsByAgendaId(agenda.id) : [];
  const [speakers, sponsors] = await Promise.all([
    fetchSpeakerProfilesByEventId(eventId),
    fetchSponsorsByEventId(eventId),
  ]);

  return (
    <CategoryPageShell
      eventId={eventId}
      title='Agenda'
      description='Agenda is backed by ApsAgenda + ApsAppSession records for this event.'
      activeCategory='agenda'
    >
      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>Agenda</h2>
            <p className='mt-1 text-slate-600'>
              {agenda ? (
                <>
                  Agenda ID: <span className='font-mono text-xs'>{agenda.id}</span>
                  {' · '}
                  {sessions.length} session{sessions.length === 1 ? '' : 's'}
                </>
              ) : (
                'No agenda record exists for this event yet.'
              )}
            </p>
          </div>
          <CreateSessionButton
            eventId={eventId}
            agendaId={agenda?.id ?? null}
            speakers={speakers}
            sponsors={sponsors}
          />
        </div>

        {!agenda ? (
          <div className='mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
            Create an `ApsAgenda` for this event first; then we can add
            `ApsAppSession` items under it.
          </div>
        ) : sessions.length === 0 ? (
          <div className='mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
            Agenda exists, but no sessions found yet.
          </div>
        ) : (
          <SessionsTable
            eventId={eventId}
            agendaId={agenda?.id ?? null}
            sessions={sessions}
            speakers={speakers}
            sponsors={sponsors}
          />
        )}
      </section>
    </CategoryPageShell>
  );
}


