import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';
import { fetchFeedbackEventCards } from '@/app/actions/feedback';

export const dynamic = 'force-dynamic';

export default async function FeedbackPage() {
  noStore();

  let cards;
  try {
    cards = await fetchFeedbackEventCards();
  } catch (error) {
    if (error instanceof Error && error.name === 'AppSyncUnauthorizedError') {
      return (
        <div className='min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
          <main className='page-container rounded-3xl border border-amber-200 bg-amber-50 p-8 shadow-sm'>
            <h1 className='text-2xl font-bold text-amber-900'>Session expired</h1>
            <p className='mt-2 text-sm text-amber-800'>
              Sign in again to load app feedback.
            </p>
            <Link
              href='/login?next=/feedback'
              className='mt-4 inline-flex rounded-lg bg-amber-900 px-4 py-2 text-sm font-semibold text-white'
            >
              Sign in
            </Link>
          </main>
        </div>
      );
    }
    throw error;
  }

  const total = cards.reduce((sum, card) => sum + card.count, 0);

  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-10'>
        <header className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              App
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>Feedback</h1>
            <p className='text-slate-600'>
              Choose an event to review its in-app feedback.
            </p>
          </div>
          <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
            {total} submission{total === 1 ? '' : 's'}
          </span>
        </header>

        {cards.length === 0 ? (
          <div className='rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center'>
            <p className='text-sm font-semibold text-slate-700'>No events yet</p>
          </div>
        ) : (
          <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-3'>
            {cards.map((card) => (
              <Link
                key={card.event.id}
                href={`/aps/${card.event.id}/feedback`}
                className='group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
              >
                <div className='absolute inset-0 bg-linear-to-br from-slate-50 via-white to-slate-100 opacity-0 transition duration-500 group-hover:opacity-100' />
                <div className='relative flex flex-col gap-4'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                      Event
                    </p>
                    <h2 className='text-3xl font-bold text-slate-900'>
                      {card.event.year}
                    </h2>
                  </div>
                  <div className='flex items-center justify-between gap-3'>
                    <p className='text-sm text-slate-600'>
                      {card.count}{' '}
                      {card.count === 1 ? 'submission' : 'submissions'}
                    </p>
                    <span className='text-sm font-semibold text-slate-800'>
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
