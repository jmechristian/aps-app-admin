'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteExhibitorProfile } from '@/app/actions/event-content';

export default function DeleteExhibitorButton({
  exhibitorId,
  eventId,
  companyName,
}: {
  exhibitorId: string;
  eventId: string;
  companyName?: string | null;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type='button'
      onClick={() => {
        const confirmed = window.confirm(
          `Remove exhibitor ${companyName ?? 'profile'} from this event?`,
        );
        if (!confirmed) return;

        startTransition(async () => {
          await deleteExhibitorProfile({ exhibitorId, eventId });
          router.refresh();
        });
      }}
      disabled={isPending}
      className='inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60'
    >
      {isPending ? 'Removing...' : 'Remove'}
    </button>
  );
}
