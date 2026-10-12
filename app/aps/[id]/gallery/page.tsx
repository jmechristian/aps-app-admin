import Link from 'next/link';
import { notFound } from 'next/navigation';
import CategoryPageShell from '../category-page-shell';
import { listGalleryPhotos } from '@/app/actions/gallery';
import { requestGraphQL } from '@/lib/appsync';
import DeleteGalleryPhotoButton from './delete-gallery-photo-button';

export const dynamic = 'force-dynamic';

const COLUMNS = 5;
const PAGE_SIZE = COLUMNS * 5;

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ page?: string | string[] }>;
};

const GET_APS = /* GraphQL */ `
  query GetApsForGallery($id: ID!) {
    getAPS(id: $id) {
      id
    }
  }
`;

export default async function GalleryPage({ params, searchParams }: PageProps) {
  const { id: eventId } = await params;
  const event = await requestGraphQL<{ getAPS?: { id: string } | null }>(
    GET_APS,
    { id: eventId },
  );
  if (!event.getAPS) notFound();

  const gallery = await listGalleryPhotos(eventId);
  const sp = searchParams ? await searchParams : undefined;
  const incomingPage = Array.isArray(sp?.page) ? sp.page[0] : sp?.page;
  const parsedPage = Number.parseInt(incomingPage ?? '1', 10);
  const totalPages = Math.max(1, Math.ceil(gallery.photos.length / PAGE_SIZE));
  const currentPage = Number.isFinite(parsedPage)
    ? Math.min(Math.max(parsedPage, 1), totalPages)
    : 1;
  const start = (currentPage - 1) * PAGE_SIZE;
  const pagePhotos = gallery.photos.slice(start, start + PAGE_SIZE);
  const rangeEnd = Math.min(start + PAGE_SIZE, gallery.photos.length);

  return (
    <CategoryPageShell
      eventId={eventId}
      title='Gallery'
      description={`Photos in ${gallery.prefix}, in the same order the media page uses. Upload new files with the Bella Luna Photos Greenville SC-{n}-1280.jpg name. They show up here on refresh.`}
      activeCategory='gallery'
    >
      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>
              {gallery.photos.length} photo
              {gallery.photos.length === 1 ? '' : 's'}
            </h2>
            <p className='mt-2 max-w-2xl text-sm text-slate-600'>
              Ordered by the number in the filename. A file with no number
              comes first. Missing numbers are skipped. Delete is the only
              change this page makes.
            </p>
          </div>
          <a
            href={`https://packagingschool.com/events/aps-${gallery.year}`}
            className='inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
          >
            View media page
          </a>
        </div>

        {pagePhotos.length === 0 ? (
          <p className='mt-8 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-600'>
            No JPEG photos in {gallery.prefix} yet.
          </p>
        ) : (
          <ul className='mt-8 grid grid-cols-5 gap-4'>
            {pagePhotos.map((photo) => (
              <li
                key={photo.key}
                className='flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50'
              >
                <div className='relative'>
                  <a
                    href={photo.url}
                    target='_blank'
                    rel='noreferrer'
                    className='block aspect-square bg-slate-200'
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.url}
                      alt={photo.filename}
                      className='h-full w-full object-cover'
                    />
                  </a>
                  <DeleteGalleryPhotoButton
                    eventId={eventId}
                    objectKey={photo.key}
                    filename={photo.filename}
                  />
                  <p className='absolute bottom-2 left-2 rounded-full bg-black/65 px-2 py-0.5 text-[11px] font-semibold text-white'>
                    {photo.number}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {gallery.photos.length > 0 ? (
          <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-xs text-slate-500'>
              {start + 1}–{rangeEnd} of {gallery.photos.length}
              {' · '}
              {COLUMNS} across
              {' · '}
              Page {currentPage} of {totalPages}
            </p>
            <div className='flex items-center gap-2'>
              {currentPage > 1 ? (
                <Link
                  href={`/aps/${eventId}/gallery`}
                  className='inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
                >
                  ← First
                </Link>
              ) : null}
              {currentPage > 1 ? (
                <Link
                  href={`/aps/${eventId}/gallery?page=${currentPage - 1}`}
                  className='inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
                >
                  ← Prev
                </Link>
              ) : null}
              {currentPage < totalPages ? (
                <Link
                  href={`/aps/${eventId}/gallery?page=${currentPage + 1}`}
                  className='inline-flex items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md'
                >
                  Next {PAGE_SIZE} →
                </Link>
              ) : (
                <span className='rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500'>
                  No more pages
                </span>
              )}
            </div>
          </div>
        ) : null}
      </section>
    </CategoryPageShell>
  );
}
