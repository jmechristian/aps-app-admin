import Link from 'next/link';
import { fetchCompanyById, updateCompany } from '@/app/actions/companies';
import CompanyLogoField from '@/app/aps/[id]/companies/[companyId]/company-logo-field';

type PageProps = {
  params: Promise<{ companyId: string }>;
};

export default async function GlobalCompanyDetailPage({ params }: PageProps) {
  const { companyId } = await params;
  const company = await fetchCompanyById(companyId);

  return (
    <div className='min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Global Company
            </p>
            <h1 className='text-3xl font-bold text-slate-900'>{company.name}</h1>
            <p className='text-slate-600'>Company ID: {company.id}</p>
          </div>
          <Link
            href='/companies'
            className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
          >
            ← Back to companies
          </Link>
        </header>

        <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
          <form action={updateCompany} className='grid gap-6'>
            <input type='hidden' name='id' value={company.id} />

            <div className='grid gap-4 md:grid-cols-2'>
              <label className='text-sm font-medium text-slate-700'>
                Company name <span className='text-red-500'>*</span>
                <input
                  name='name'
                  defaultValue={company.name}
                  required
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                />
              </label>
              <label className='text-sm font-medium text-slate-700'>
                Email <span className='text-red-500'>*</span>
                <input
                  name='email'
                  type='text'
                  defaultValue={company.email || '@'}
                  placeholder='@example.com'
                  required
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                />
              </label>
              <label className='text-sm font-medium text-slate-700'>
                Company type
                <select
                  name='type'
                  defaultValue={company.type ?? ''}
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                >
                  <option value=''>None</option>
                  <option value='SPONSOR'>SPONSOR</option>
                  <option value='OEMTIER1'>OEM/Tier 1</option>
                  <option value='SOLUTIONPROVIDER'>Solution Provider</option>
                </select>
              </label>
              <label className='text-sm font-medium text-slate-700'>
                Website
                <input
                  name='website'
                  defaultValue={company.website ?? ''}
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                />
              </label>
              <label className='text-sm font-medium text-slate-700'>
                Phone
                <input
                  name='phone'
                  defaultValue={company.phone ?? ''}
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                />
              </label>
              <label className='text-sm font-medium text-slate-700'>
                Address
                <input
                  name='address'
                  defaultValue={company.address ?? ''}
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                />
              </label>
              <label className='text-sm font-medium text-slate-700'>
                City
                <input
                  name='city'
                  defaultValue={company.city ?? ''}
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                />
              </label>
              <label className='text-sm font-medium text-slate-700'>
                State
                <input
                  name='state'
                  defaultValue={company.state ?? ''}
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                />
              </label>
              <label className='text-sm font-medium text-slate-700'>
                Zip
                <input
                  name='zip'
                  defaultValue={company.zip ?? ''}
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                />
              </label>
              <label className='text-sm font-medium text-slate-700'>
                Country
                <input
                  name='country'
                  defaultValue={company.country ?? ''}
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                />
              </label>
              <div className='md:col-span-2'>
                <CompanyLogoField companyId={company.id} initialValue={company.logo} />
              </div>
            </div>

            <label className='text-sm font-medium text-slate-700'>
              Description
              <textarea
                name='description'
                defaultValue={company.description ?? ''}
                rows={4}
                className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
              />
            </label>

            <div className='flex justify-end'>
              <button
                type='submit'
                className='rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md'
              >
                Save changes
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
