import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requestGraphQL } from '@/lib/appsync';
import CodesSection from '../codes-section';
import { addCodeToAps, addCodesToAps, removeCodeFromAps } from '@/app/actions/aps';

type PageProps = {
  params: Promise<{ id: string }>;
};

type APSCodes = {
  id: string;
  year: string;
  codes?: string[] | null;
};

const GET_APS_CODES = /* GraphQL */ `
  query GetAPS($id: ID!) {
    getAPS(id: $id) {
      id
      year
      codes
    }
  }
`;

async function fetchApsCodes(id: string): Promise<APSCodes | null> {
  const data = await requestGraphQL<{ getAPS?: APSCodes | null }>(
    GET_APS_CODES,
    { id }
  );
  return data.getAPS ?? null;
}

export default async function CodesPage({ params }: PageProps) {
  const { id: eventId } = await params;
  const aps = await fetchApsCodes(eventId);

  if (!aps) {
    notFound();
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Event Management
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>
              Codes for APS {aps.year}
            </h1>
            <p className='text-slate-600'>
              Create, edit, and remove discount codes for this event.
            </p>
          </div>
          <Link
            href={`/aps/${eventId}`}
            className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
          >
            ← Back to event
          </Link>
        </header>

        <CodesSection
          eventId={eventId}
          codes={aps.codes ?? []}
          onAddCode={addCodeToAps}
          onAddCodes={addCodesToAps}
          onRemoveCode={removeCodeFromAps}
        />
      </main>
    </div>
  );
}
