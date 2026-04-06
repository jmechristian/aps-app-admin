import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { requestGraphQL } from '@/lib/appsync';
import {
  fetchRegistrantsByApsId,
} from '@/app/actions/registrants';
import { getThinkificRegistrantSummariesByEmails } from '@/app/actions/thinkific';
import ThinkificRegistrantsTable from './thinkific-registrants-table';

type APS = {
  id: string;
  year: string;
};

const GET_APS = /* GraphQL */ `
  query GetAPS($id: ID!) {
    getAPS(id: $id) {
      id
      year
    }
  }
`;

const UPDATE_APP_USER_PROFILE = /* GraphQL */ `
  mutation UpdateApsAppUserProfileFromThinkificPanel(
    $input: UpdateApsAppUserProfileInput!
  ) {
    updateApsAppUserProfile(input: $input) {
      id
    }
  }
`;

async function fetchAps(id: string): Promise<APS | null> {
  const data = await requestGraphQL<{ getAPS?: APS | null }>(GET_APS, { id });
  return data.getAPS ?? null;
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

export default async function ApsThinkificPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{
    page?: string | string[];
    sync?: string | string[];
    updated?: string | string[];
    unchanged?: string | string[];
    skipped?: string | string[];
    errors?: string | string[];
  }>;
}) {
  const { id: eventId } = await params;
  const sp = searchParams ? await searchParams : undefined;
  const incomingPage = Array.isArray(sp?.page) ? sp.page[0] : sp?.page;
  const syncFlag = Array.isArray(sp?.sync) ? sp.sync[0] : sp?.sync;
  const syncUpdated = Array.isArray(sp?.updated) ? sp.updated[0] : sp?.updated;
  const syncUnchanged = Array.isArray(sp?.unchanged) ? sp.unchanged[0] : sp?.unchanged;
  const syncSkipped = Array.isArray(sp?.skipped) ? sp.skipped[0] : sp?.skipped;
  const syncErrors = Array.isArray(sp?.errors) ? sp.errors[0] : sp?.errors;
  const parsedPage = Number.parseInt(incomingPage ?? '1', 10);
  const pageSize = 50;

  async function syncThinkificProfilesAction() {
    'use server';

    const registrants = await fetchRegistrantsByApsId(eventId);
    const summariesByEmail = await getThinkificRegistrantSummariesByEmails(
      registrants.map((registrant) => registrant.email),
    );

    let updated = 0;
    let unchanged = 0;
    let skipped = 0;
    let errors = 0;

    for (const registrant of registrants) {
      const profileId = registrant.appUser?.profile?.id;
      if (!profileId) {
        skipped += 1;
        continue;
      }

      const summary = summariesByEmail[registrant.email.toLowerCase()];
      if (!summary || summary.error) {
        errors += 1;
        continue;
      }

      const nextThinkificId = summary.thinkificUserId ?? null;
      const nextApcProgress = Number(summary.apcProgramProgress.toFixed(1));
      const currentThinkificId = registrant.appUser?.profile?.thinkificId ?? null;
      const currentApcProgress = registrant.appUser?.profile?.apcProgress ?? null;
      const changed =
        currentThinkificId !== nextThinkificId || currentApcProgress !== nextApcProgress;

      if (!changed) {
        unchanged += 1;
        continue;
      }

      await requestGraphQL(UPDATE_APP_USER_PROFILE, {
        input: {
          id: profileId,
          thinkificId: nextThinkificId,
          apcProgress: nextApcProgress,
        },
      });
      updated += 1;
    }

    revalidatePath(`/aps/${eventId}/thinkific`);
    redirect(
      `/aps/${eventId}/thinkific?sync=1&updated=${updated}&unchanged=${unchanged}&skipped=${skipped}&errors=${errors}`,
    );
  }

  const [aps, allRegistrants] = await Promise.all([
    fetchAps(eventId),
    fetchRegistrantsByApsId(eventId),
  ]);

  if (!aps) {
    notFound();
  }

  const thinkificSummariesByEmail = await getThinkificRegistrantSummariesByEmails(
    allRegistrants.map((registrant) => registrant.email),
  );

  const summariesByRegistrantId = Object.fromEntries(
    allRegistrants.map((registrant) => [
      registrant.id,
      {
        isThinkificUser: Boolean(
          thinkificSummariesByEmail[registrant.email.toLowerCase()]?.thinkificUserId ??
            registrant.appUser?.profile?.thinkificId,
        ),
        thinkificUserId:
          thinkificSummariesByEmail[registrant.email.toLowerCase()]?.thinkificUserId ??
          registrant.appUser?.profile?.thinkificId ??
          null,
        enrollmentCount:
          thinkificSummariesByEmail[registrant.email.toLowerCase()]?.enrollmentCount ??
          0,
        apcEnrollmentCount:
          thinkificSummariesByEmail[registrant.email.toLowerCase()]
            ?.apcEnrollmentCount ?? 0,
        apcProgramProgress:
          thinkificSummariesByEmail[registrant.email.toLowerCase()]?.apcProgramProgress ??
          0,
      },
    ]),
  );

  const orderedRegistrants = [...allRegistrants].sort((a, b) => {
    const progressA = summariesByRegistrantId[a.id]?.apcProgramProgress ?? 0;
    const progressB = summariesByRegistrantId[b.id]?.apcProgramProgress ?? 0;
    if (progressB !== progressA) return progressB - progressA;

    const nameA = `${a.firstName || ''} ${a.lastName || ''}`.trim();
    const nameB = `${b.firstName || ''} ${b.lastName || ''}`.trim();
    return nameA.localeCompare(nameB, undefined, { sensitivity: 'base' });
  });

  const totalPages = Math.max(1, Math.ceil(orderedRegistrants.length / pageSize));
  const currentPage = Number.isFinite(parsedPage)
    ? Math.min(Math.max(parsedPage, 1), totalPages)
    : 1;
  const start = (currentPage - 1) * pageSize;
  const pageRegistrants = orderedRegistrants.slice(start, start + pageSize);

  const totalRegistrants = allRegistrants.length;
  const thinkificUserCount = allRegistrants.filter((registrant) =>
    Boolean(summariesByRegistrantId[registrant.id]?.isThinkificUser),
  ).length;
  const apcCompleteCount = allRegistrants.filter((registrant) => {
    const progress = summariesByRegistrantId[registrant.id]?.apcProgramProgress ?? 0;
    return progress >= 100;
  }).length;
  const thinkificUserPercent =
    totalRegistrants > 0 ? (thinkificUserCount / totalRegistrants) * 100 : 0;
  const apcCompletePercent =
    totalRegistrants > 0 ? (apcCompleteCount / totalRegistrants) * 100 : 0;

  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex items-center justify-between gap-4'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Thinkific
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>
              Event {aps.year} Thinkific Overview
            </h1>
            <p className='text-slate-600'>
              View Thinkific user, enrollment, and APC progress data for registrants.
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <form action={syncThinkificProfilesAction}>
              <button
                type='submit'
                className='inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700'
              >
                Sync AppUserProfiles
              </button>
            </form>
            <Link
              href={`/aps/${eventId}`}
              className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
            >
              ← Back to event
            </Link>
          </div>
        </header>

        <section className='grid gap-4 md:grid-cols-2'>
          <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Registrants With Thinkific ID
            </p>
            <p className='mt-2 text-3xl font-bold text-slate-900'>
              {thinkificUserCount}
            </p>
            <p className='mt-1 text-sm text-slate-600'>
              {formatPercent(thinkificUserPercent)} of {totalRegistrants} registrants
            </p>
          </div>

          <div className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
            <p className='text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Registrants At 100% APC Progress
            </p>
            <p className='mt-2 text-3xl font-bold text-slate-900'>
              {apcCompleteCount}
            </p>
            <p className='mt-1 text-sm text-slate-600'>
              {formatPercent(apcCompletePercent)} of {totalRegistrants} registrants
            </p>
          </div>
        </section>

        {syncFlag === '1' ? (
          <section className='rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700'>
            Sync finished. Updated {syncUpdated ?? '0'}, unchanged {syncUnchanged ?? '0'},
            skipped {syncSkipped ?? '0'}, errors {syncErrors ?? '0'}.
          </section>
        ) : null}

        <ThinkificRegistrantsTable
          registrants={pageRegistrants}
          allRegistrants={allRegistrants}
          summariesByRegistrantId={summariesByRegistrantId}
          eventId={eventId}
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
        />
      </main>
    </div>
  );
}
