import Link from 'next/link';
import { notFound } from 'next/navigation';
import { requestGraphQL } from '@/lib/appsync';
import CreateRegistrantButton from './create-registrant-button';
import RegistrantsTable from './registrants-table';
import { fetchRegistrantsByApsId } from '@/app/actions/registrants';
import { updateAps, addCodeToAps, removeCodeFromAps } from '@/app/actions/aps';
import CodesSection from './codes-section';

type APS = {
  id: string;
  year: string;
  codes?: string[] | null;
  startDate?: string | null;
  endDate?: string | null;
  location?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  website?: string | null;
};

const GET_APS = /* GraphQL */ `
  query GetAPS($id: ID!) {
    getAPS(id: $id) {
      id
      year
      codes
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
    }
  }
`;

async function fetchAps(id: string): Promise<APS | null> {
  const data = await requestGraphQL<{ getAPS?: APS | null }>(GET_APS, { id });
  return data.getAPS ?? null;
}

export default async function ApsDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [aps, registrants] = await Promise.all([
    fetchAps(id),
    fetchRegistrantsByApsId(id),
  ]);

  if (!aps) {
    notFound();
  }

  return <ApsDetailClient aps={aps} eventId={id} registrants={registrants} />;
}

// Client component wrapper
function ApsDetailClient({
  aps,
  eventId,
  registrants,
}: {
  aps: APS;
  eventId: string;
  registrants: Awaited<ReturnType<typeof fetchRegistrantsByApsId>>;
}) {
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='mx-auto flex w-full max-w-5xl flex-col gap-10'>
        <header className='flex items-center justify-between gap-4'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              APS Detail
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>
              Event {aps.year}
            </h1>
            <p className='text-slate-600'>
              Review the core properties for this APS event.
            </p>
          </div>
          <div className='flex items-center gap-3'>
            <CreateRegistrantButton eventId={eventId} />
            <Link
              href='/'
              className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
            >
              ← Back to events
            </Link>
          </div>
        </header>

        <section className='grid gap-6 lg:grid-cols-[1.2fr_0.8fr]'>
          <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Primary
                </p>
                <h2 className='text-2xl font-bold text-slate-900'>
                  APS #{aps.year}
                </h2>
              </div>
              <span className='rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white'>
                ID
              </span>
            </div>
            <div className='mt-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 font-mono text-sm text-slate-800'>
              {aps.id}
            </div>

            <form
              action={updateAps}
              className='mt-8 grid gap-4 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 shadow-inner sm:grid-cols-2'
            >
              <input type='hidden' name='id' value={aps.id} />
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                Year
                <input
                  name='year'
                  defaultValue={aps.year}
                  required
                  className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md'
                />
              </label>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                Start date
                <input
                  name='startDate'
                  defaultValue={aps.startDate ?? ''}
                  placeholder='YYYY-MM-DD'
                  className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md'
                />
              </label>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                End date
                <input
                  name='endDate'
                  defaultValue={aps.endDate ?? ''}
                  placeholder='YYYY-MM-DD'
                  className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md'
                />
              </label>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700 sm:col-span-2'>
                Location name
                <input
                  name='location'
                  defaultValue={aps.location ?? ''}
                  placeholder='Venue or facility'
                  className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md'
                />
              </label>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700 sm:col-span-2'>
                Address
                <input
                  name='address'
                  defaultValue={aps.address ?? ''}
                  placeholder='Street address'
                  className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md'
                />
              </label>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                City
                <input
                  name='city'
                  defaultValue={aps.city ?? ''}
                  className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md'
                />
              </label>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                State
                <input
                  name='state'
                  defaultValue={aps.state ?? ''}
                  className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md'
                />
              </label>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                ZIP
                <input
                  name='zip'
                  defaultValue={aps.zip ?? ''}
                  className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md'
                />
              </label>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                Website
                <input
                  name='website'
                  defaultValue={aps.website ?? ''}
                  placeholder='https://example.com'
                  className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md'
                />
              </label>
              <div className='sm:col-span-2'>
                <button
                  type='submit'
                  className='inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
                >
                  Save APS details
                </button>
              </div>
            </form>
          </div>

          <div className='flex flex-col gap-4 rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-900 to-slate-800 p-8 text-white shadow-lg'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>Quick links</h3>
              <span className='rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90'>
                Actions
              </span>
            </div>
            <p className='text-sm text-white/80'>
              Continue managing this APS from the overview page—edit details,
              add codes, or remove the event entirely.
            </p>
            <div className='mt-2 flex flex-col gap-3'>
              <Link
                href='/'
                className='inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
              >
                Manage events
              </Link>
              <a
                href='mailto:ops@autopacksummit.com'
                className='inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80'
              >
                Contact support
              </a>
            </div>
          </div>
        </section>

        <section>
          <CodesSection
            eventId={eventId}
            codes={aps.codes ?? []}
            onAddCode={addCodeToAps}
            onRemoveCode={removeCodeFromAps}
          />
        </section>

        <section>
          <RegistrantsTable registrants={registrants} eventId={eventId} />
        </section>
      </main>
    </div>
  );
}
