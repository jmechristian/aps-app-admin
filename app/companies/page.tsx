import Link from 'next/link';
import { fetchAllCompanies } from '@/app/actions/companies';
import CompaniesTable from './companies-table';
import DedupeCompaniesButton from './dedupe-companies-button';

export default async function CompaniesPage() {
  const companies = await fetchAllCompanies();

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Company Directory
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>Companies</h1>
            <p className='text-slate-600'>
              Manage the global company list used across events.
            </p>
          </div>
          <Link
            href='/'
            className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
          >
            ← Back to events
          </Link>
        </header>

        <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <h2 className='text-lg font-semibold text-slate-900'>
                Deduplicate companies
              </h2>
              <p className='text-sm text-slate-600'>
                Keeps the entry with an email containing @ and only removes
                duplicates that are not attached to any events.
              </p>
            </div>
            <DedupeCompaniesButton />
          </div>
        </section>

        <CompaniesTable companies={companies} />
      </main>
    </div>
  );
}
