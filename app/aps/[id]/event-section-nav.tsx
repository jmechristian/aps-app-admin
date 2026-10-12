import Link from 'next/link';

const EVENT_SECTIONS = [
  {
    label: 'People',
    items: [
      { slug: 'companies', label: 'Companies' },
      { slug: 'exhibitors', label: 'Exhibitors' },
      { slug: 'sponsors', label: 'Sponsors' },
      { slug: 'speakers', label: 'Speakers' },
    ],
  },
  {
    label: 'Event',
    items: [
      { slug: 'agenda', label: 'Agenda' },
      { slug: 'add-ons', label: 'Add-Ons' },
      { slug: 'codes', label: 'Codes' },
      { slug: 'seating', label: 'Seating Chart' },
      { slug: 'badges', label: 'Badges' },
      { slug: 'passport', label: 'Passport' },
    ],
  },
  {
    label: 'Learning',
    items: [
      { slug: 'thinkific', label: 'Thinkific' },
      { slug: 'certificate', label: 'Certificate' },
    ],
  },
  {
    label: 'Follow-up',
    items: [
      { slug: 'gallery', label: 'Gallery' },
      { slug: 'feedback', label: 'Feedback' },
      { slug: 'post-event-survey', label: 'Post-Event Survey' },
    ],
  },
] as const;

export type EventSectionSlug = (typeof EVENT_SECTIONS)[number]['items'][number]['slug'];

export default function EventSectionNav({
  eventId,
  tone,
  activeSlug,
}: {
  eventId: string;
  tone: 'dark' | 'light';
  activeSlug?: EventSectionSlug;
}) {
  const dark = tone === 'dark';

  return (
    <nav
      className={dark ? 'flex flex-col gap-4' : 'grid gap-4 sm:grid-cols-2 xl:grid-cols-4'}
      aria-label='Event sections'
    >
      {EVENT_SECTIONS.map((section) => (
        <div key={section.label}>
          <p
            className={
              dark
                ? 'mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50'
                : 'mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500'
            }
          >
            {section.label}
          </p>
          <div className={dark ? 'grid grid-cols-2 gap-2' : 'flex flex-wrap gap-2'}>
            {section.items.map((item) => {
              const isActive = item.slug === activeSlug;
              return (
                <Link
                  key={item.slug}
                  href={`/aps/${eventId}/${item.slug}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={
                    dark
                      ? 'inline-flex min-h-10 items-center justify-center rounded-lg border border-white/20 px-2 py-2 text-center text-xs font-semibold leading-tight text-white transition hover:border-white/50 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80'
                      : isActive
                        ? 'inline-flex items-center justify-center rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
                        : 'inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}
