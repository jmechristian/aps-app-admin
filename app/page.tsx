import Link from 'next/link';
import { createAps, deleteAps, updateAps } from './actions/aps';
import { requestGraphQL } from '@/lib/appsync';

type APS = {
  id: string;
  year: string;
  codes?: string[] | null;
};

const LIST_APS = /* GraphQL */ `
  query ListAPS($limit: Int) {
    listAPS(limit: $limit) {
      items {
        id
        year
        codes
      }
    }
  }
`;

async function fetchEvents(): Promise<APS[]> {
  const data = await requestGraphQL<{
    listAPS?: { items?: APS[] | null } | null;
  }>(LIST_APS, { limit: 50 });

  return data.listAPS?.items?.filter(Boolean) ?? [];
}

export default async function Home() {
  const events = await fetchEvents();

  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='mx-auto flex w-full max-w-6xl flex-col gap-10'>
        <header className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Admin
            </p>
            <h1 className='text-4xl font-bold text-slate-900 sm:text-5xl'>
              APS Events
            </h1>
            <p className='text-slate-600'>
              Create, review, and manage summit events with quick actions.
            </p>
          </div>
        </header>

        <section className='rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-lg backdrop-blur'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <h2 className='text-xl font-semibold text-slate-900'>
                Create new event
              </h2>
              <p className='text-sm text-slate-600'>
                Add a new APS record with a year label and optional codes.
              </p>
            </div>
          </div>

          <form
            action={createAps}
            className='mt-6 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 shadow-inner sm:grid-cols-[1.2fr_1.2fr_auto]'
          >
            <label className='flex flex-col gap-2 text-sm font-medium text-slate-700'>
              Year
              <input
                name='year'
                placeholder='2025'
                required
                className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-0 transition focus:border-slate-400 focus:shadow-md'
              />
            </label>
            <label className='flex flex-col gap-2 text-sm font-medium text-slate-700'>
              Codes (comma separated)
              <input
                name='codes'
                placeholder='VIP, EARLY, PARTNER'
                className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none ring-0 transition focus:border-slate-400 focus:shadow-md'
              />
            </label>
            <div className='flex items-end'>
              <button
                type='submit'
                className='inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 sm:w-auto'
              >
                + Create event
              </button>
            </div>
          </form>
        </section>

        <section className='flex flex-col gap-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-slate-900'>
              Events overview
            </h2>
            <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
              {events.length} event{events.length === 1 ? '' : 's'}
            </span>
          </div>

          {events.length === 0 ? (
            <div className='rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm'>
              No events yet. Create your first APS event above.
            </div>
          ) : (
            <div className='grid gap-4 lg:grid-cols-2'>
              {events.map((event) => (
                <article
                  key={event.id}
                  className='group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl'
                >
                  <div className='absolute inset-0 bg-linear-to-br from-slate-50 via-white to-slate-100 opacity-0 transition duration-500 group-hover:opacity-100' />
                  <div className='relative flex flex-col gap-4'>
                    <div className='flex items-start justify-between gap-3'>
                      <div>
                        <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                          Year
                        </p>
                        <h3 className='text-2xl font-bold text-slate-900'>
                          {event.year}
                        </h3>
                        <p className='text-sm text-slate-600'>
                          Event ID:{' '}
                          <span className='font-mono text-slate-700'>
                            {event.id}
                          </span>
                        </p>
                      </div>
                      <Link
                        href={`/aps/${event.id}`}
                        className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
                      >
                        Details
                      </Link>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                      {(event.codes ?? []).length > 0 ? (
                        event.codes?.map((code) => (
                          <span
                            key={code}
                            className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'
                          >
                            {code}
                          </span>
                        ))
                      ) : (
                        <span className='text-sm text-slate-500'>
                          No codes added
                        </span>
                      )}
                    </div>

                    <div className='flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between'>
                      <details className='group w-full sm:w-auto'>
                        <summary className='flex cursor-pointer items-center justify-between gap-2 text-sm font-semibold text-slate-800'>
                          Edit event
                          <span className='text-xs text-slate-500 transition group-open:rotate-90'>
                            ▸
                          </span>
                        </summary>
                        <form
                          action={updateAps}
                          className='mt-3 grid gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-2'
                        >
                          <input type='hidden' name='id' value={event.id} />
                          <label className='flex flex-col gap-1 text-xs font-semibold text-slate-700'>
                            Year
                            <input
                              name='year'
                              defaultValue={event.year}
                              required
                              className='w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white'
                            />
                          </label>
                          <label className='flex flex-col gap-1 text-xs font-semibold text-slate-700 sm:col-span-2'>
                            Codes (comma separated)
                            <input
                              name='codes'
                              defaultValue={(event.codes ?? []).join(', ')}
                              className='w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white'
                            />
                          </label>
                          <div className='sm:col-span-2'>
                            <button
                              type='submit'
                              className='inline-flex w-full items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
                            >
                              Save changes
                            </button>
                          </div>
                        </form>
                      </details>

                      <form
                        action={deleteAps}
                        className='flex w-full justify-end sm:w-auto'
                      >
                        <input type='hidden' name='id' value={event.id} />
                        <button
                          type='submit'
                          className='inline-flex items-center justify-center rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500'
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
