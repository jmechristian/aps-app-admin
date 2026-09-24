import CategoryPageShell from '../category-page-shell';
import {
  fetchCertificateOfCompletion,
  saveCertificateOfCompletionAction,
} from '@/app/actions/certificate-of-completion';
import { CertificateControls } from './certificate-controls';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CertificatePage({ params }: PageProps) {
  const { id: eventId } = await params;
  const certificate = await fetchCertificateOfCompletion(eventId);

  return (
    <CategoryPageShell
      eventId={eventId}
      title='Certificate of Completion'
      description='Unlock the hub card and set the external page it opens. Completions are not tracked.'
      activeCategory='certificate'
    >
      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <h2 className='text-xl font-bold text-slate-900'>Certificate lock</h2>
        <p className='mt-2 text-sm text-slate-600'>
          Attendees see a locked card until you unlock it. The card opens this page in the browser.
        </p>
        <div className='mt-6'>
          <CertificateControls
            eventId={eventId}
            open={certificate.open}
            url={certificate.url}
            action={saveCertificateOfCompletionAction}
          />
        </div>
      </section>
    </CategoryPageShell>
  );
}
