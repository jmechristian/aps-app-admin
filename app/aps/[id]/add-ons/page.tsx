import CategoryPageShell from '../category-page-shell';
import Link from 'next/link';
import { fetchAddOnsByEventId, fetchAddOnRequestsByAddOnId } from '@/app/actions/add-ons';
import CreateAddOnButton from './create-add-on-button';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AddOnsPage({ params }: PageProps) {
  const { id: eventId } = await params;
  const addOns = await fetchAddOnsByEventId(eventId);

  const addOnsWithCounts = await Promise.all(
    addOns.map(async (addOn) => {
      const requests = await fetchAddOnRequestsByAddOnId(addOn.id);
      const requested = requests.filter((r) => r.status === 'PENDING').length;
      const approved = requests.filter((r) => r.status === 'APPROVED').length;
      return { addOn, requested, approved };
    })
  );

  return (
    <CategoryPageShell
      eventId={eventId}
      title='Add-Ons'
      description='Manage add-ons and their requests for this event.'
      activeCategory='add-ons'
    >
      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h2 className='text-xl font-bold text-slate-900'>Add-Ons</h2>
            <p className='mt-1 text-slate-600'>
              {addOns.length} add-on{addOns.length === 1 ? '' : 's'} for this event.
            </p>
          </div>
          <CreateAddOnButton eventId={eventId} />
        </div>

        {addOns.length === 0 ? (
          <div className='mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
            No add-ons found yet. Create one to get started.
          </div>
        ) : (
          <div className='mt-6 overflow-x-auto rounded-2xl border border-slate-200'>
            <table className='w-full min-w-[720px] text-left text-sm'>
              <thead className='bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
                <tr>
                  <th className='px-4 py-3'>Title</th>
                  <th className='px-4 py-3'>Date</th>
                  <th className='px-4 py-3'>Time</th>
                  <th className='px-4 py-3'>Location</th>
                  <th className='px-4 py-3'>Limit</th>
                  <th className='px-4 py-3'>Price</th>
                  <th className='px-4 py-3'>Requested</th>
                  <th className='px-4 py-3'>Approved</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200'>
                {addOnsWithCounts.map(({ addOn, requested, approved }) => (
                  <tr key={addOn.id} className='bg-white'>
                    <td className='px-4 py-3 font-semibold text-slate-900'>
                      <Link
                        href={`/aps/${eventId}/add-ons/${addOn.id}`}
                        className='hover:underline'
                      >
                        {addOn.title}
                      </Link>
                    </td>
                    <td className='px-4 py-3 text-slate-700'>{addOn.date}</td>
                    <td className='px-4 py-3 text-slate-700'>{addOn.time}</td>
                    <td className='px-4 py-3 text-slate-700'>{addOn.location}</td>
                    <td className='px-4 py-3 text-slate-700'>
                      {addOn.limit ?? '—'}
                    </td>
                    <td className='px-4 py-3 text-slate-700'>
                      {addOn.price != null ? `$${addOn.price}` : '—'}
                    </td>
                    <td className='px-4 py-3 text-slate-700'>{requested}</td>
                    <td className='px-4 py-3 text-slate-700'>{approved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </CategoryPageShell>
  );
}
