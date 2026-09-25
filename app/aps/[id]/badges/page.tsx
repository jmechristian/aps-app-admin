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
      description='Print sticker badges for approved registrants. Search by name, email, or company.'
      activeCategory='badges'
    >
      <BadgesStudio eventId={eventId} people={people} />
    </CategoryPageShell>
  );
}
