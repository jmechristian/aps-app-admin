import CategoryPageShell from '../../category-page-shell';
import Link from 'next/link';
import {
  createCompanyContact,
  deleteCompanyContact,
  fetchCompanyById,
  fetchCompanyContacts,
  updateCompany,
  updateCompanyContact,
} from '@/app/actions/companies';
import CompanyLogoField from './company-logo-field';

type PageProps = {
  params: Promise<{ id: string; companyId: string }>;
};

export default async function CompanyDetailPage({ params }: PageProps) {
  const { id: eventId, companyId } = await params;
  const company = await fetchCompanyById(companyId);
  const contacts = await fetchCompanyContacts(companyId);

  if (company.eventId !== eventId) {
    throw new Error('Company does not belong to this event');
  }

  return (
    <CategoryPageShell
      eventId={eventId}
      title='Edit Company'
      description='Update APS company details for this event.'
      activeCategory='sponsors'
    >
      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>{company.name}</h2>
            <p className='mt-1 text-sm text-slate-600'>Company ID: {company.id}</p>
          </div>
          <Link
            href={`/aps/${eventId}/sponsors`}
            className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
          >
            ← Back to sponsors
          </Link>
        </div>

        <form action={updateCompany} className='mt-6 grid gap-6'>
          <input type='hidden' name='id' value={company.id} />
          <input type='hidden' name='eventId' value={company.eventId} />

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

        <div className='mt-10 border-t border-slate-200 pt-6'>
          <h3 className='text-lg font-semibold text-slate-900'>Contacts</h3>
          <p className='mt-1 text-sm text-slate-600'>
            Add one or more contacts for this company.
          </p>

          <form
            action={createCompanyContact}
            className='mt-4 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-2'
          >
            <input type='hidden' name='companyId' value={company.id} />
            <input type='hidden' name='eventId' value={company.eventId} />
            <label className='text-sm font-medium text-slate-700'>
              Contact name
              <input
                name='name'
                className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
              />
            </label>
            <label className='text-sm font-medium text-slate-700'>
              Contact title
              <input
                name='title'
                className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
              />
            </label>
            <label className='text-sm font-medium text-slate-700'>
              Contact email <span className='text-red-500'>*</span>
              <input
                name='email'
                type='text'
                required
                placeholder='@example.com'
                className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
              />
            </label>
            <label className='text-sm font-medium text-slate-700'>
              Contact phone
              <input
                name='phone'
                className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
              />
            </label>
            <div className='md:col-span-2 flex justify-end'>
              <button
                type='submit'
                className='rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md'
              >
                Add contact
              </button>
            </div>
          </form>

          {contacts.length === 0 ? (
            <div className='mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600'>
              No contacts yet.
            </div>
          ) : (
            <div className='mt-4 space-y-3'>
              {contacts.map((contact) => (
                <form
                  key={contact.id}
                  action={updateCompanyContact}
                  className='grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-2'
                >
                  <input type='hidden' name='id' value={contact.id} />
                  <input type='hidden' name='companyId' value={company.id} />
                  <input type='hidden' name='eventId' value={company.eventId} />
                  <label className='text-sm font-medium text-slate-700'>
                    Contact name
                    <input
                      name='name'
                      defaultValue={contact.name ?? ''}
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    />
                  </label>
                  <label className='text-sm font-medium text-slate-700'>
                    Contact title
                    <input
                      name='title'
                      defaultValue={contact.title ?? ''}
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    />
                  </label>
                  <label className='text-sm font-medium text-slate-700'>
                    Contact email <span className='text-red-500'>*</span>
                    <input
                      name='email'
                      type='text'
                      required
                      defaultValue={contact.email}
                      placeholder='@example.com'
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    />
                  </label>
                  <label className='text-sm font-medium text-slate-700'>
                    Contact phone
                    <input
                      name='phone'
                      defaultValue={contact.phone ?? ''}
                      className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                    />
                  </label>
                  <div className='md:col-span-2 flex items-center justify-between'>
                    <button
                      type='submit'
                      className='rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md'
                    >
                      Save contact
                    </button>
                    <button
                      type='submit'
                      formAction={deleteCompanyContact}
                      formNoValidate
                      className='rounded-xl border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-600 shadow-sm transition hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50 hover:shadow-md'
                    >
                      Delete
                    </button>
                  </div>
                </form>
              ))}
            </div>
          )}
        </div>
      </section>
    </CategoryPageShell>
  );
}
