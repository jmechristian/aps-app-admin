import CategoryPageShell from '../category-page-shell';
import {
  createCompany,
  fetchAllCompanies,
  fetchCompaniesByEventId,
} from '@/app/actions/companies';
import AttachCompanyForm from './attach-company-form';
import CompaniesTable from './companies-table';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CompaniesPage({ params }: PageProps) {
  const { id: eventId } = await params;
  const [companies, allCompanies] = await Promise.all([
    fetchCompaniesByEventId(eventId),
    fetchAllCompanies(),
  ]);
  const attachedIds = new Set(companies.map((c) => c.id));
  const attachable = allCompanies.filter((c) => !attachedIds.has(c.id));

  return (
    <CategoryPageShell
      eventId={eventId}
      title='Companies'
      description='Create and manage APS companies for this event.'
      activeCategory='companies'
    >
      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>Add Company</h2>
            <p className='mt-1 text-sm text-slate-600'>
              Create a company record independent of sponsors or exhibitors.
            </p>
          </div>
        </div>

        <form action={createCompany} className='mt-6 grid gap-4 sm:grid-cols-2'>
          <input type='hidden' name='eventId' value={eventId} />
          <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
            Company name
            <input
              name='name'
              required
              className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md'
            />
          </label>
          <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
            Email
            <input
              name='email'
              type='text'
              required
              placeholder='@example.com'
              className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md'
            />
          </label>
          <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
            Company type
            <select
              name='type'
              className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:shadow-md'
            >
              <option value=''>None</option>
              <option value='SPONSOR'>SPONSOR</option>
              <option value='OEMTIER1'>OEM/Tier 1</option>
              <option value='SOLUTIONPROVIDER'>Solution Provider</option>
            </select>
          </label>
          <div className='flex items-end'>
            <button
              type='submit'
              className='inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
            >
              Add company
            </button>
          </div>
        </form>

        <div className='mt-8 border-t border-slate-200 pt-6'>
          <h3 className='text-lg font-semibold text-slate-900'>
            Attach Existing Company
          </h3>
          <p className='mt-1 text-sm text-slate-600'>
            Link an existing company to this event without duplicating it.
          </p>
          <AttachCompanyForm eventId={eventId} companies={attachable} />
        </div>
      </section>

      <CompaniesTable eventId={eventId} companies={companies} />
    </CategoryPageShell>
  );
}
