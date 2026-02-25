import Link from 'next/link';
import type { ReactNode } from 'react';

type CategoryKey = 'exhibitors' | 'sponsors' | 'speakers' | 'agenda' | 'companies';

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  companies: 'Companies',
  exhibitors: 'Exhibitors',
  sponsors: 'Sponsors',
  speakers: 'Speakers',
  agenda: 'Agenda',
};

function CategoryNavLink({
  eventId,
  category,
  activeCategory,
}: {
  eventId: string;
  category: CategoryKey;
  activeCategory: CategoryKey;
}) {
  const isActive = category === activeCategory;

  return (
    <Link
      href={`/aps/${eventId}/${category}`}
      className={
        isActive
          ? 'inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
          : 'inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
      }
    >
      {CATEGORY_LABELS[category]}
    </Link>
  );
}

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
  activeCategory: CategoryKey;
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

        <nav className='flex flex-wrap gap-3'>
          <CategoryNavLink
            eventId={eventId}
            category='companies'
            activeCategory={activeCategory}
          />
          <CategoryNavLink
            eventId={eventId}
            category='exhibitors'
            activeCategory={activeCategory}
          />
          <CategoryNavLink
            eventId={eventId}
            category='sponsors'
            activeCategory={activeCategory}
          />
          <CategoryNavLink
            eventId={eventId}
            category='speakers'
            activeCategory={activeCategory}
          />
          <CategoryNavLink
            eventId={eventId}
            category='agenda'
            activeCategory={activeCategory}
          />
        </nav>

        {children}
      </main>
    </div>
  );
}


