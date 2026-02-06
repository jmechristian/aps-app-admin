'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import {
  updateAppUserProfile,
  updateRegistrant,
  type RegistrantDetail,
} from '@/app/actions/registrants';

type RegistrantEditFormProps = {
  registrant: RegistrantDetail;
  eventId: string;
};

type ActionState = {
  ok: boolean;
  message: string;
};

const initialState: ActionState = { ok: false, message: '' };

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
}: RegistrantEditFormProps) {
  const router = useRouter();
  const [registrantState, registrantAction] = useFormState(
    updateRegistrant,
    initialState
  );
  const [profileState, profileAction] = useFormState(
    updateAppUserProfile,
    initialState
  );

  useEffect(() => {
    if (registrantState.ok || profileState.ok) {
      router.refresh();
    }
  }, [registrantState.ok, profileState.ok, router]);

  const profile = registrant.appUser?.profile ?? null;

  return (
    <div className='space-y-6'>
      <div className='rounded-3xl border border-slate-200 bg-white p-8 shadow-lg'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-xl font-bold text-slate-900'>Edit Registrant</h2>
          {registrantState.message ? (
            <p
              className={`text-sm ${
                registrantState.ok ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {registrantState.message}
            </p>
          ) : null}
        </div>

        <form action={registrantAction} className='space-y-6'>
          <input type='hidden' name='registrantId' value={registrant.id} />
          <input type='hidden' name='eventId' value={eventId} />

          <div className='grid gap-4 md:grid-cols-2'>
            <label className='space-y-1 text-sm text-slate-700'>
              <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                First Name
              </span>
              <input
                name='firstName'
                defaultValue={registrant.firstName ?? ''}
                className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
              />
            </label>
            <label className='space-y-1 text-sm text-slate-700'>
              <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                Last Name
              </span>
              <input
                name='lastName'
                defaultValue={registrant.lastName ?? ''}
                className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
              />
            </label>
            <label className='space-y-1 text-sm text-slate-700'>
              <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                Email
              </span>
              <input
                name='email'
                type='email'
                required
                defaultValue={registrant.email ?? ''}
                className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
              />
            </label>
            <label className='space-y-1 text-sm text-slate-700'>
              <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                Phone
              </span>
              <input
                name='phone'
                defaultValue={registrant.phone ?? ''}
                className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
              />
            </label>
            <label className='space-y-1 text-sm text-slate-700'>
              <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                Job Title
              </span>
              <input
                name='jobTitle'
                defaultValue={registrant.jobTitle ?? ''}
                className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
              />
            </label>
            <label className='space-y-1 text-sm text-slate-700'>
              <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                Attendee Type
              </span>
              <select
                name='attendeeType'
                defaultValue={registrant.attendeeType ?? ''}
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
                Status
              </span>
              <select
                name='status'
                defaultValue={registrant.status ?? ''}
                className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
              >
                <option value=''>Select status</option>
                <option value='PENDING'>Pending</option>
                <option value='APPROVED'>Approved</option>
                <option value='REJECTED'>Rejected</option>
              </select>
            </label>
          </div>

          <label className='space-y-1 text-sm text-slate-700'>
            <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
              Bio
            </span>
            <textarea
              name='bio'
              rows={4}
              defaultValue={registrant.bio ?? ''}
              className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
            />
          </label>

          <div className='rounded-2xl border border-slate-100 bg-slate-50 p-5'>
            <h3 className='mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Billing Address
            </h3>
            <div className='grid gap-4 md:grid-cols-2'>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  First Name
                </span>
                <input
                  name='billingAddressFirstName'
                  defaultValue={registrant.billingAddressFirstName ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  Last Name
                </span>
                <input
                  name='billingAddressLastName'
                  defaultValue={registrant.billingAddressLastName ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  Email
                </span>
                <input
                  name='billingAddressEmail'
                  type='email'
                  defaultValue={registrant.billingAddressEmail ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  Phone
                </span>
                <input
                  name='billingAddressPhone'
                  defaultValue={registrant.billingAddressPhone ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700 md:col-span-2'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  Street
                </span>
                <input
                  name='billingAddressStreet'
                  defaultValue={registrant.billingAddressStreet ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  City
                </span>
                <input
                  name='billingAddressCity'
                  defaultValue={registrant.billingAddressCity ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  State
                </span>
                <input
                  name='billingAddressState'
                  defaultValue={registrant.billingAddressState ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
              <label className='space-y-1 text-sm text-slate-700'>
                <span className='font-semibold uppercase tracking-[0.2em] text-xs text-slate-500'>
                  ZIP
                </span>
                <input
                  name='billingAddressZip'
                  defaultValue={registrant.billingAddressZip ?? ''}
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                />
              </label>
            </div>
          </div>

          <SubmitButton label='Save registrant' />
        </form>
      </div>

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
                  Email
                </span>
                <input
                  name='email'
                  type='email'
                  defaultValue={profile.email ?? ''}
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
                  Company
                </span>
                <input
                  name='company'
                  defaultValue={profile.company ?? ''}
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
                  name='attendeeType'
                  defaultValue={profile.attendeeType ?? ''}
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
