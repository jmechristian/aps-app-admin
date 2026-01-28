import Link from 'next/link';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CodesPage({ params }: PageProps) {
  const { id: eventId } = await params;

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Event Management
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>Codes</h1>
            <p className='text-slate-600'>
              Placeholder page — we’ll move/manage event codes here later.
            </p>
          </div>
          <Link
            href={`/aps/${eventId}`}
            className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
          >
            ← Back to event
          </Link>
        </header>

        <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
          <h2 className='text-xl font-bold text-slate-900'>Coming soon</h2>
          <p className='mt-2 text-slate-600'>
            We removed the codes block from the event overview to keep that page
            focused. This is where we’ll build code management next.
          </p>
        </section>
      </main>
    </div>
  );
}


