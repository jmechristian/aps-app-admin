import CategoryPageShell from '../category-page-shell';
import { fetchPostEventSurveyAdmin } from '@/app/actions/post-event-survey';
import { SurveyCompletions, SurveyLockControl } from './survey-controls';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostEventSurveyPage({ params }: PageProps) {
  const { id: eventId } = await params;
  const survey = await fetchPostEventSurveyAdmin(eventId);

  return (
    <CategoryPageShell
      eventId={eventId}
      title='Post-Event Survey'
      description='Unlock the in-app survey, review who finished, and reset a completion if someone needs to submit again.'
      activeCategory='post-event-survey'
    >
      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <h2 className='text-xl font-bold text-slate-900'>Survey lock</h2>
        <p className='mt-2 text-sm text-slate-600'>
          Attendees see a locked card on the hub until you unlock it. Each person can submit once,
          then their confirmation screen is what they show at the registration desk.
        </p>
        <div className='mt-6'>
          <SurveyLockControl eventId={eventId} open={survey.open} />
        </div>
      </section>

      <SurveyCompletions eventId={eventId} rows={survey.completions} />
    </CategoryPageShell>
  );
}
