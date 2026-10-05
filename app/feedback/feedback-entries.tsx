import Link from 'next/link';
import StorageImage from '@/app/components/storage-image';
import type { FeedbackEntry } from '@/app/actions/feedback';

function formatWhen(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export default function FeedbackEntries({
  eventId,
  entries,
}: {
  eventId: string;
  entries: FeedbackEntry[];
}) {
  if (entries.length === 0) {
    return (
      <div className='rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center'>
        <p className='text-sm font-semibold text-slate-700'>No feedback yet</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {entries.map((entry) => {
        const profileHref = entry.author.registrantId
          ? `/aps/${eventId}/registrants/${entry.author.registrantId}`
          : null;
        return (
          <article
            key={entry.id}
            className='rounded-3xl border border-slate-200 bg-white p-6 shadow-sm'
          >
            <div className='flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between'>
              <div>
                {profileHref ? (
                  <Link
                    href={profileHref}
                    className='text-base font-semibold text-slate-900 hover:underline'
                  >
                    {entry.author.name}
                  </Link>
                ) : (
                  <p className='text-base font-semibold text-slate-900'>
                    {entry.author.name}
                  </p>
                )}
                <p className='text-sm text-slate-600'>
                  {[entry.author.email, entry.author.company]
                    .filter(Boolean)
                    .join(' · ') || 'No email on file'}
                </p>
              </div>
              <time
                dateTime={entry.createdAt}
                className='text-xs font-semibold uppercase tracking-wide text-slate-500'
              >
                {formatWhen(entry.createdAt)}
              </time>
            </div>
            <p className='mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-800'>
              {entry.message}
            </p>
            {entry.imageKeys.length > 0 ? (
              <div className='mt-4 flex flex-wrap gap-3'>
                {entry.imageKeys.map((key) => (
                  <StorageImage
                    key={key}
                    srcOrKey={key}
                    alt='Feedback screenshot'
                    className='max-h-48 max-w-full rounded-xl border border-slate-200 object-contain'
                  />
                ))}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
