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
      aria-label={`Delete ${filename}`}
      className='absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/65 text-sm font-semibold leading-none text-white shadow-sm transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-60'
    >
      {isPending ? '…' : '×'}
    </button>
  );
}
