import Link from 'next/link';
import { notFound } from 'next/navigation';
import CategoryPageShell from '../../category-page-shell';
import {
  fetchAddOnById,
  fetchAddOnRequestsByAddOnId,
} from '@/app/actions/add-ons';
import { fetchRegistrantsByApsId } from '@/app/actions/registrants';
import AddOnEditForm from './add-on-edit-form';
import AddRegistrantSection from './add-registrant-section';
import AddOnRequestsTables from './add-on-requests-tables';

type PageProps = {
  params: Promise<{ id: string; addOnId: string }>;
};

export default async function AddOnDetailPage({ params }: PageProps) {
  const { id: eventId, addOnId } = await params;
  const [addOn, requests, registrants] = await Promise.all([
    fetchAddOnById(addOnId),
    fetchAddOnRequestsByAddOnId(addOnId),
    fetchRegistrantsByApsId(eventId),
  ]);

  if (!addOn) notFound();

  const requested = requests.filter((r) => r.status === 'PENDING');
  const approved = requests.filter((r) => r.status === 'APPROVED');

  const registrantItems = registrants.map((r) => ({
    id: r.id,
    firstName: r.firstName ?? null,
    lastName: r.lastName ?? null,
    email: r.email,
    companyName: r.company?.name ?? null,
    attendeeType: r.attendeeType,
  }));

  return (
    <CategoryPageShell
      eventId={eventId}
      title={`Add-On: ${addOn.title}`}
      description='Edit add-on details and manage registrant requests.'
      activeCategory='add-ons'
    >
      <div className='flex flex-col gap-8'>
        <div className='flex flex-wrap gap-3'>
          <Link
            href={`/aps/${eventId}/add-ons`}
            className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
          >
            ← Back to add-ons
          </Link>
          <Link
            href={`/aps/${eventId}`}
            className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
          >
            ← Back to event
          </Link>
        </div>

        <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
          <h2 className='text-xl font-bold text-slate-900'>Edit Add-On</h2>
          <p className='mt-1 text-slate-600'>
            Update the add-on details below.
          </p>
          <AddOnEditForm addOn={addOn} eventId={eventId} />
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
          <h2 className='text-xl font-bold text-slate-900'>Add Registrant</h2>
          <p className='mt-1 text-slate-600'>
            Add a registrant to this add-on (as a request, then approve if desired).
          </p>
          <AddRegistrantSection
            eventId={eventId}
            addOnId={addOnId}
            addOn={addOn}
            registrants={registrantItems}
            existingRegistrantIds={requests.map((r) => r.registrantId)}
          />
        </section>

        <AddOnRequestsTables
          eventId={eventId}
          addOnId={addOnId}
          requested={requested}
          approved={approved}
          addOnPreferenceSchema={addOn.preferenceSchema}
        />
      </div>
    </CategoryPageShell>
  );
}
