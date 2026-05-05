import CategoryPageShell from '../category-page-shell';
import SeatingChartManager from './seating-chart-manager';
import {
  fetchSeatingAssignments,
  fetchSeatingRegistrantOptions,
} from '@/app/actions/seating';
import { APS_SEATING_CHART_ID } from '@/lib/seating-chart';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function SeatingPage({ params }: PageProps) {
  const { id: eventId } = await params;
  const [assignments, registrants] = await Promise.all([
    fetchSeatingAssignments(),
    fetchSeatingRegistrantOptions(eventId),
  ]);

  return (
    <CategoryPageShell
      eventId={eventId}
      title='Seating Chart'
      description='Create tables and assign registrants to seats.'
      activeCategory='seating'
    >
      <section className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'>
        <p className='text-sm text-slate-600'>
          Chart ID:{' '}
          <span className='font-mono text-slate-800'>{APS_SEATING_CHART_ID}</span>
        </p>
      </section>

      <SeatingChartManager
        eventId={eventId}
        initialAssignments={assignments}
        registrants={registrants}
      />
    </CategoryPageShell>
  );
}
