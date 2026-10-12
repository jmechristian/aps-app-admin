'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteGalleryPhoto } from '@/app/actions/gallery';

export default function DeleteGalleryPhotoButton({
  eventId,
  objectKey,
  filename,
}: {
  eventId: string;
  objectKey: string;
  filename: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <button
      type='button'
      disabled={isPending}
      onClick={() => {
        const confirmed = window.confirm(
          `Delete ${filename} from the gallery? It will leave the media page on the next refresh. This cannot be undone.`,
        );
        if (!confirmed) return;

        startTransition(async () => {
          await deleteGalleryPhoto({ eventId, key: objectKey });
          router.refresh();
        });
      }}
      className='inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60'
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}
