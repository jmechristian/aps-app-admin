import Link from 'next/link';
import {
  createBoardMember,
  fetchBoardMembers,
} from '@/app/actions/board';
import BoardMembersTable from './board-members-table';
export default async function BoardPage() {
  const members = await fetchBoardMembers();

  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-6 py-12 text-slate-900'>
      <main className='page-container flex flex-col gap-8'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Global Content
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>Board</h1>
            <p className='text-slate-600'>
              Manage APS board members globally (not tied to a specific event).
            </p>
          </div>
          <Link
            href='/'
            className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900'
          >
            ← Back to events
          </Link>
        </header>

        <section>
          <form
            action={createBoardMember}
            className='rounded-3xl border border-slate-200 bg-white p-6 shadow-lg'
          >
            <h2 className='text-xl font-bold text-slate-900'>
              Create board member
            </h2>
            <p className='mt-1 text-sm text-slate-600'>
              Add a single board member record.
            </p>

            <div className='mt-4 grid gap-4 sm:grid-cols-2'>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                Name *
                <input
                  name='name'
                  required
                  className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400'
                />
              </label>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                Company *
                <input
                  name='company'
                  required
                  className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400'
                />
              </label>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                Email *
                <input
                  name='email'
                  type='email'
                  required
                  className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400'
                />
              </label>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                Title
                <input
                  name='title'
                  className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400'
                />
              </label>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700 sm:col-span-2'>
                LinkedIn
                <input
                  name='linkedin'
                  className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400'
                />
              </label>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700 sm:col-span-2'>
                Profile picture URL/key
                <input
                  name='profilePic'
                  className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400'
                />
              </label>
              <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700 sm:col-span-2'>
                Bio
                <textarea
                  name='bio'
                  rows={4}
                  className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400'
                />
              </label>
            </div>

            <button
              type='submit'
              className='mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800'
            >
              Create member
            </button>
          </form>
        </section>

        <section className='rounded-3xl border border-slate-200 bg-white p-6 shadow-lg'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-bold text-slate-900'>Existing members</h2>
            <span className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600'>
              {members.length} member{members.length === 1 ? '' : 's'}
            </span>
          </div>
          <BoardMembersTable members={members} />
        </section>
      </main>
    </div>
  );
}
