export default function ReportingLoading() {
  return (
    <div className='min-h-screen bg-[#041c2e] px-6 py-12 text-white'>
      <main className='page-container flex flex-col gap-8'>
        <div className='h-2 w-full rounded-full bg-linear-to-r from-[#E4A800] via-white to-[#0873B8]' />
        <div className='space-y-3'>
          <div className='h-4 w-40 animate-pulse rounded bg-white/20' />
          <div className='h-12 w-64 animate-pulse rounded bg-white/20' />
          <div className='h-4 w-96 max-w-full animate-pulse rounded bg-white/10' />
        </div>
        <div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className='h-32 animate-pulse rounded-2xl bg-white/10'
            />
          ))}
        </div>
        <div className='h-80 animate-pulse rounded-3xl bg-white/10' />
      </main>
    </div>
  );
}
