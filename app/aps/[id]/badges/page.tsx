import CategoryPageShell from '../category-page-shell';
import BadgesStudio from './badges-studio';
import { fetchFullRegistrantDetailsByApsId } from '@/app/actions/registrants';
import { toBadgePerson } from '@/lib/badges';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function BadgesPage({ params }: PageProps) {
  const { id: eventId } = await params;
  const registrants = await fetchFullRegistrantDetailsByApsId(eventId);
  const people = registrants
    .filter((registrant) => registrant.status === 'APPROVED')
    .map(toBadgePerson);

  return (
    <CategoryPageShell
      eventId={eventId}
      title='Badges'
      description='Generate name badges for approved registrants, grouped by attendee type.'
      activeCategory='badges'
    >
      <BadgesStudio eventId={eventId} people={people} />
    </CategoryPageShell>
  );
}
