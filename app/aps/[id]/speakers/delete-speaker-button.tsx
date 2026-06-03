'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteSpeaker } from '@/app/actions/speakers';

export default function DeleteSpeakerButton({
  speakerId,
  eventId,
  speakerName,
  redirectToListOnSuccess = false,
}: {
  speakerId: string;
  eventId: string;
  speakerName?: string | null;
  redirectToListOnSuccess?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type='button'
      onClick={() => {
        const label = speakerName?.trim() || 'this speaker';
        const confirmed = window.confirm(
          `Remove ${label} from the speakers list? They will be unlinked from all agenda sessions. Their registrant and app profile will not be deleted.`,
        );
        if (!confirmed) return;

        startTransition(async () => {
          await deleteSpeaker({ speakerId, eventId });
          if (redirectToListOnSuccess) {
            router.push(`/aps/${eventId}/speakers`);
          } else {
            router.refresh();
          }
        });
      }}
      disabled={isPending}
      className='inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60'
    >
      {isPending ? 'Removing...' : 'Remove speaker'}
    </button>
  );
}
