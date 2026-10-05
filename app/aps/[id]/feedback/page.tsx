import { notFound } from 'next/navigation';
import { requestGraphQL } from '@/lib/appsync';
import { fetchFeedbackForEvent } from '@/app/actions/feedback';
import CategoryPageShell from '../category-page-shell';
import FeedbackEntries from '@/app/feedback/feedback-entries';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventFeedbackPage({ params }: PageProps) {
  const { id: eventId } = await params;
  const eventResponse = await requestGraphQL<{
    getAPS?: { id?: string | null; year?: string | null } | null;
  }>(
    `query FeedbackEvent($id: ID!) { getAPS(id: $id) { id year } }`,
    { id: eventId },
  );

  if (!eventResponse.getAPS?.id) notFound();

  const entries = await fetchFeedbackForEvent(eventId);
  const year = eventResponse.getAPS.year ?? 'Event';

  return (
    <CategoryPageShell
      eventId={eventId}
      title={`${year} feedback`}
      description='In-app feedback submitted for this event.'
      activeCategory='feedback'
    >
      <FeedbackEntries eventId={eventId} entries={entries} />
    </CategoryPageShell>
  );
}
