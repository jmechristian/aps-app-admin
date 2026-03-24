'use client';

import { useActionState, useEffect, useMemo, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { uploadData } from 'aws-amplify/storage';
import heic2any from 'heic2any';
import { ensureAmplifyConfigured } from '@/src/amplify-client';
import StorageImage from '@/app/components/storage-image';
import CompanyPicker from '../../company-picker';
import InvoicePreview from './invoice-preview';
import {
  updateAppUserProfile,
  updateRegistrantCompanyAssignment,
  updateRegistrantEmailSync,
  type RegistrantDetail,
} from '@/app/actions/registrants';

type RegistrantEditFormProps = {
  registrant: RegistrantDetail;
  eventId: string;
  companies: Array<{ id: string; name: string; email: string }>;
};

type ActionState = {
  ok: boolean;
  message: string;
};

const initialState: ActionState = { ok: false, message: '' };

function displayText(value?: string | null) {
  const text = value?.trim();
  return text && text.length > 0 ? text : '—';
}

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      disabled={pending}
      className='inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60'
    >
      {pending ? 'Saving...' : label}
    </button>
  );
}

export default function RegistrantEditForm({
  registrant,
  eventId,
  companies,
}: RegistrantEditFormProps) {
  const router = useRouter();
  const [profileState, profileAction] = useActionState(
    updateAppUserProfile,
    initialState,
  );
  const [emailState, emailAction] = useActionState(
    updateRegistrantEmailSync,
    initialState,
  );
  const [companyState, companyAction] = useActionState(
    updateRegistrantCompanyAssignment,
    initialState,
  );
  const [selectedCompanyId, setSelectedCompanyId] = useState(
    registrant.company?.id ?? registrant.companyId ?? '',
  );

  useEffect(() => {
    setSelectedCompanyId(registrant.company?.id ?? registrant.companyId ?? '');
  }, [registrant.company?.id, registrant.companyId]);

  useEffect(() => {
    if (profileState.ok || emailState.ok || companyState.ok) {
      router.refresh();
    }
  }, [profileState.ok, emailState.ok, companyState.ok, router]);

  const profile = registrant.appUser?.profile ?? null;
  const [profilePicture, setProfilePicture] = useState(
    profile?.profilePicture ?? ''
  );
  const [uploadStatus, setUploadStatus] = useState<
    'idle' | 'uploading' | 'error'
  >('idle');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const previewValue = useMemo(() => profilePicture.trim(), [profilePicture]);
  const selectedCompany = useMemo(
    () => companies.find((company) => company.id === selectedCompanyId) ?? null,
    [companies, selectedCompanyId],
  );

  function isHeicFile(file: File) {
    const lowerName = file.name.toLowerCase();
    return (
      file.type === 'image/heic' ||
      file.type === 'image/heif' ||
      lowerName.endsWith('.heic') ||
      lowerName.endsWith('.heif')
    );
  }

  async function handleProfilePictureUpload(file: File | null) {
    if (!file || !profile) return;
    setUploadStatus('uploading');
    setUploadError(null);

    try {
      ensureAmplifyConfigured();
      let uploadFile = file;
      if (isHeicFile(file)) {
        const converted = (await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 0.9,
        })) as Blob;
        uploadFile = new File(
          [converted],
          file.name.replace(/\.(heic|heif)$/i, '.jpg'),
          { type: 'image/jpeg' }
        );
      }

      const ext = uploadFile.name.split('.').pop() || 'jpg';
      const key = `profile-pictures/${profile.id}/${Date.now()}.${ext}`;
      const result = await uploadData({
        key,
        data: uploadFile,
        options: {
          accessLevel: 'guest',
          contentType: uploadFile.type || 'image/jpeg',
        },
      }).result;
      setProfilePicture(result.key);
      setUploadStatus('idle');
    } catch (err) {
      setUploadStatus('error');
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    }
  }

  return (
    <div className='space-y-6'>
      <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-slate-900'>Registrant Email</h2>
          {emailState.message ? (
            <p
              className={`text-sm ${
                emailState.ok ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {emailState.message}
            </p>
          ) : null}
        </div>
        <form action={emailAction} className='space-y-4'>
          <input type='hidden' name='registrantId' value={registrant.id} />
          <input type='hidden' name='eventId' value={eventId} />
          <input type='hidden' name='profileId' value={profile?.id ?? ''} />
          <label className='space-y-1 text-sm text-slate-700'>
            <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
              Email
            </span>
            <input
              name='email'
              type='email'
              required
              defaultValue={registrant.email ?? profile?.email ?? ''}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
            />
          </label>
          <SubmitButton label='Save email' />
        </form>
      </div>

      <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-slate-900'>Company Assignment</h2>
          {companyState.message ? (
            <p
              className={`text-sm ${
                companyState.ok ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {companyState.message}
            </p>
          ) : null}
        </div>

        <form action={companyAction} className='space-y-4'>
          <input type='hidden' name='registrantId' value={registrant.id} />
          <input type='hidden' name='eventId' value={eventId} />
          <input type='hidden' name='companyId' value={selectedCompanyId} />

          <div className='grid gap-4 md:grid-cols-[2fr_1fr]'>
            <label className='space-y-1 text-sm text-slate-700'>
              <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                Company
              </span>
              <CompanyPicker
                companies={companies.map((company) => ({
                  id: company.id,
                  name: `${company.name} (${company.email}) · ${company.id.slice(0, 8)}`,
                }))}
                value={selectedCompanyId}
                onChange={setSelectedCompanyId}
                placeholder='Select company'
              />
              <p className='text-xs text-slate-600'>
                Selected ID:{' '}
                <span className='font-mono text-slate-800'>
                  {selectedCompany?.id ?? '—'}
                </span>
              </p>
            </label>

            <div className='rounded-2xl border border-slate-100 bg-slate-50 p-4'>
              <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                Current
              </p>
              <p className='mt-1 text-sm font-semibold text-slate-900'>
                {registrant.company?.name ?? 'No company'}
              </p>
              <p className='mt-1 text-xs text-slate-600'>
                {registrant.company?.email ?? '—'}
              </p>
              <p className='mt-2 text-xs text-slate-600'>
                Company ID:{' '}
                <span className='font-mono text-slate-800'>
                  {registrant.company?.id ?? registrant.companyId ?? '—'}
                </span>
              </p>
            </div>
          </div>

          <div className='flex items-center gap-3'>
            <SubmitButton label='Save company assignment' />
            {selectedCompanyId ? (
              <button
                type='button'
                onClick={() => setSelectedCompanyId('')}
                className='inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50'
              >
                Clear
              </button>
            ) : null}
          </div>
        </form>
      </div>

      <section className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <h2 className='mb-6 text-xl font-bold text-slate-900'>
          Registration & Payment
        </h2>
        <div className='grid gap-6 lg:grid-cols-2'>
          <div className='rounded-2xl border border-slate-200 bg-slate-50 p-5'>
            <h3 className='mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Registration Questions
            </h3>
            <div className='space-y-4 text-sm text-slate-900'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Terms Accepted
                </p>
                <p className='mt-1'>
                  {registrant.termsAccepted === null ||
                  registrant.termsAccepted === undefined
                    ? '—'
                    : registrant.termsAccepted
                      ? 'Yes'
                      : 'No'}
                </p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Interests
                </p>
                <p className='mt-1'>
                  {registrant.interests && registrant.interests.length > 0
                    ? registrant.interests.join(', ')
                    : '—'}
                </p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Other Interest
                </p>
                <p className='mt-1'>{displayText(registrant.otherInterest)}</p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Buyer Question
                </p>
                <p className='mt-1 whitespace-pre-wrap'>
                  {displayText(registrant.buyerQuestion)}
                </p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Packaging Challenge
                </p>
                <p className='mt-1 whitespace-pre-wrap'>
                  {displayText(registrant.packagingChallenge)}
                </p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Certification
                </p>
                <p className='mt-1'>
                  {displayText(registrant.certification) === 'true'
                    ? 'Yes'
                    : displayText(registrant.certification) === 'false'
                      ? 'No'
                      : displayText(registrant.certification)}
                </p>
              </div>
            </div>
          </div>

          <div className='rounded-2xl border border-slate-200 bg-slate-50 p-5'>
            <h3 className='mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Payment Details
            </h3>
            <div className='space-y-4 text-sm text-slate-900'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Total Amount
                </p>
                <p className='mt-1'>
                  {registrant.totalAmount === null ||
                  registrant.totalAmount === undefined
                    ? '—'
                    : `$${registrant.totalAmount.toLocaleString()}`}
                </p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Discount Code
                </p>
                <p className='mt-1'>{displayText(registrant.discountCode)}</p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Payment Confirmation
                </p>
                <p className='mt-1'>{displayText(registrant.paymentConfirmation)}</p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Status
                </p>
                <p className='mt-1'>{displayText(registrant.status)}</p>
              </div>
              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
                  Receipt
                </p>
                <InvoicePreview invoice={registrant.invoice} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-slate-900'>
            Edit App User Profile
          </h2>
          {profileState.message ? (
            <p
              className={`text-sm ${
                profileState.ok ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {profileState.message}
            </p>
          ) : null}
        </div>

        {!profile ? (
          <p className='text-sm text-slate-600'>
            No app user profile is attached to this registrant.
          </p>
        ) : (
          <form action={profileAction} className='space-y-6'>
            <input type='hidden' name='profileId' value={profile.id} />
            <input type='hidden' name='eventId' value={eventId} />
            <input type='hidden' name='registrantId' value={registrant.id} />

            <div className='rounded-2xl border border-slate-100 bg-slate-50 p-5'>
              <h3 className='mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
                Profile Picture
              </h3>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                <div className='h-24 w-24 overflow-hidden rounded-2xl border border-slate-200 bg-white'>
                  {previewValue ? (
                    <StorageImage
                      srcOrKey={previewValue}
                      alt='Profile picture'
                      className='h-full w-full object-cover'
                      accessLevel='guest'
                    />
                  ) : null}
                </div>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium text-slate-700'>
                    Upload image
                    <input
                      type='file'
                      accept='image/*,.heic,.heif'
                      onChange={(e) => {
                        void handleProfilePictureUpload(
                          e.target.files?.[0] ?? null
                        );
                        e.currentTarget.value = '';
                      }}
                      disabled={uploadStatus === 'uploading'}
                      className='mt-2 block w-full text-sm text-slate-600'
                    />
                  </label>
                  {uploadStatus === 'uploading' ? (
                    <div className='text-xs text-slate-500'>Uploading…</div>
                  ) : null}
                  {uploadStatus === 'error' && uploadError ? (
                    <div className='text-xs text-rose-600'>{uploadError}</div>
                  ) : null}
                </div>
              </div>
              <label className='mt-4 block text-sm font-medium text-slate-700'>
                Profile picture key or URL
                <input
                  name='profilePicture'
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                  placeholder='Paste a URL or use upload'
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                />
              </label>
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  First Name
                </span>
                <input
                  name='firstName'
                  defaultValue={profile.firstName ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  Last Name
                </span>
                <input
                  name='lastName'
                  defaultValue={profile.lastName ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  Phone
                </span>
                <input
                  name='phone'
                  defaultValue={profile.phone ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  Job Title
                </span>
                <input
                  name='jobTitle'
                  defaultValue={profile.jobTitle ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  Attendee Type
                </span>
                <select
                  key={`attendee-type-${registrant.attendeeType ?? profile.attendeeType ?? ''}`}
                  name='attendeeType'
                  defaultValue={registrant.attendeeType ?? profile.attendeeType ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                >
                  <option value=''>Select type</option>
                  <option value='OEM'>OEM</option>
                  <option value='TIER1'>Tier 1</option>
                  <option value='SOLUTIONPROVIDER'>Solution Provider</option>
                  <option value='SPONSOR'>Sponsor</option>
                  <option value='SPEAKER'>Speaker</option>
                  <option value='STAFF'>Staff</option>
                  <option value='EXHIBITOR'>Exhibitor</option>
                </select>
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  Location
                </span>
                <input
                  name='location'
                  defaultValue={profile.location ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
            </div>

            <label className='space-y-1 text-sm text-slate-700'>
              <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                Bio
              </span>
              <textarea
                name='bio'
                rows={4}
                defaultValue={profile.bio ?? ''}
                className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
              />
            </label>

            <div className='grid gap-4 md:grid-cols-2'>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  LinkedIn
                </span>
                <input
                  name='linkedin'
                  defaultValue={profile.linkedin ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  Twitter
                </span>
                <input
                  name='twitter'
                  defaultValue={profile.twitter ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  Facebook
                </span>
                <input
                  name='facebook'
                  defaultValue={profile.facebook ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  Instagram
                </span>
                <input
                  name='instagram'
                  defaultValue={profile.instagram ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  YouTube
                </span>
                <input
                  name='youtube'
                  defaultValue={profile.youtube ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700 md:col-span-2'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  Website(s) (comma-separated)
                </span>
                <input
                  name='website'
                  defaultValue={profile.website?.join(', ') ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
            </div>

            <SubmitButton label='Save profile' />
          </form>
        )}
      </div>
    </div>
  );
}
