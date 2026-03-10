export default function ApsEventLoading() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
          <div className='flex items-center gap-3'>
            <div className='h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900' />
            <p className='text-sm font-semibold text-slate-700'>
              Loading section...
            </p>
          </div>
        </div>

        <header className='space-y-3'>
          <div className='h-3 w-40 animate-pulse rounded bg-slate-200' />
          <div className='h-10 w-72 animate-pulse rounded bg-slate-200' />
          <div className='h-4 w-96 max-w-full animate-pulse rounded bg-slate-200' />
        </header>

        <nav className='flex flex-wrap gap-3'>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className='h-10 w-28 animate-pulse rounded-xl bg-slate-200'
            />
          ))}
        </nav>

        <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
          <div className='space-y-4'>
            <div className='h-6 w-56 animate-pulse rounded bg-slate-200' />
            <div className='h-4 w-full animate-pulse rounded bg-slate-100' />
            <div className='h-4 w-11/12 animate-pulse rounded bg-slate-100' />
            <div className='h-4 w-2/3 animate-pulse rounded bg-slate-100' />
          </div>
        </section>
      </main>
    </div>
  );
}
