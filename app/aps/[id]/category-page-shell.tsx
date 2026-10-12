import Link from 'next/link';
import type { ReactNode } from 'react';
import EventSectionNav, { type EventSectionSlug } from './event-section-nav';

export default function CategoryPageShell({
  eventId,
  title,
  description,
  activeCategory,
  children,
}: {
  eventId: string;
  title: string;
  description: string;
  activeCategory: EventSectionSlug;
  children: ReactNode;
}) {
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Event Management
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>{title}</h1>
            <p className='text-slate-600'>{description}</p>
          </div>
          <Link
            href={`/aps/${eventId}`}
            className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
          >
            ← Back to event
          </Link>
        </header>

        <div className='rounded-3xl border border-slate-200 bg-white p-5 shadow-sm'>
          <EventSectionNav
            eventId={eventId}
            tone='light'
            activeSlug={activeCategory}
          />
        </div>

        {children}
      </main>
    </div>
  );
}
