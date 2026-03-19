'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import StorageImage from '@/app/components/storage-image';
import {
  deleteBoardMember,
  type BoardMember,
  updateBoardMember,
} from '@/app/actions/board';

type BoardMembersTableProps = {
  members: BoardMember[];
};

type EditFormState = {
  id: string;
  name: string;
  title: string;
  bio: string;
  company: string;
  email: string;
  linkedin: string;
  profilePic: string;
};

function toEditFormState(member: BoardMember): EditFormState {
  return {
    id: member.id,
    name: member.name,
    title: member.title ?? '',
    bio: member.bio ?? '',
    company: member.company,
    email: member.email,
    linkedin: member.linkedin ?? '',
    profilePic: member.profilePic ?? '',
  };
}

function Avatar({ member }: { member: BoardMember }) {
  if (member.profilePic) {
    return (
      <StorageImage
        srcOrKey={member.profilePic}
        alt={`${member.name} avatar`}
        className='h-10 w-10 rounded-full border border-slate-200 bg-white object-cover'
        accessLevel='guest'
      />
    );
  }

  return (
    <div
      className='flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-200 text-sm font-bold text-slate-700'
      aria-label='No profile picture'
    >
      {member.name.charAt(0).toUpperCase() || '?'}
    </div>
  );
}

export default function BoardMembersTable({ members }: BoardMembersTableProps) {
  const router = useRouter();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EditFormState | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editingMember = useMemo(
    () => members.find((m) => m.id === editingId) ?? null,
    [members, editingId]
  );

  const openEditor = (member: BoardMember) => {
    setEditingId(member.id);
    setForm(toEditFormState(member));
    setError(null);
  };

  const closeEditor = () => {
    setEditingId(null);
    setForm(null);
    setError(null);
    setBusy(false);
  };

  const handleSave = async () => {
    if (!form) return;
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set('id', form.id);
      fd.set('name', form.name);
      fd.set('title', form.title);
      fd.set('bio', form.bio);
      fd.set('company', form.company);
      fd.set('email', form.email);
      fd.set('linkedin', form.linkedin);
      fd.set('profilePic', form.profilePic);
      await updateBoardMember(fd);
      closeEditor();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update member.');
      setBusy(false);
    }
  };

  const handleDelete = async () => {
    if (!form) return;
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set('id', form.id);
      await deleteBoardMember(fd);
      closeEditor();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete member.');
      setBusy(false);
    }
  };

  if (!members.length) {
    return (
      <div className='mt-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-700'>
        No board members found.
      </div>
    );
  }

  return (
    <>
      <div className='mt-4 overflow-hidden rounded-2xl border border-slate-200'>
        <table className='w-full text-left text-sm'>
          <thead className='bg-slate-50 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600'>
            <tr>
              <th className='px-4 py-3'>Profile</th>
              <th className='px-4 py-3'>Name</th>
              <th className='px-4 py-3'>Title</th>
              <th className='px-4 py-3'>Company</th>
              <th className='px-4 py-3 text-right'>Edit</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-slate-200'>
            {members.map((member) => (
              <tr key={member.id} className='bg-white'>
                <td className='px-4 py-3'>
                  <Avatar member={member} />
                </td>
                <td className='px-4 py-3 font-semibold text-slate-900'>
                  {member.name}
                </td>
                <td className='px-4 py-3 text-slate-700'>
                  {member.title || '—'}
                </td>
                <td className='px-4 py-3 text-slate-700'>
                  {member.company}
                </td>
                <td className='px-4 py-3 text-right'>
                  <button
                    type='button'
                    onClick={() => openEditor(member)}
                    className='inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
                    aria-label={`Edit ${member.name}`}
                  >
                    <svg
                      className='h-4 w-4'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path d='M17.414 2.586a2 2 0 010 2.828l-8.95 8.95a1 1 0 01-.45.263l-3.2.914a1 1 0 01-1.237-1.237l.914-3.2a1 1 0 01.263-.45l8.95-8.95a2 2 0 012.828 0zm-9.62 9.035l7.536-7.535-1.414-1.414L6.38 10.207l-.51 1.786 1.786-.51z' />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingMember && form ? (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
          <div className='relative page-container max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl'>
            <div className='sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4'>
              <div>
                <h2 className='text-2xl font-bold text-slate-900'>
                  Edit Board Member
                </h2>
                <p className='mt-1 text-sm text-slate-600'>
                  Update details or remove this member.
                </p>
              </div>
              <button
                onClick={closeEditor}
                className='rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900'
                aria-label='Close'
                disabled={busy}
              >
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <div className='p-6'>
              {error ? (
                <div className='mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800'>
                  {error}
                </div>
              ) : null}

              <div className='mb-5 flex items-center gap-3'>
                <Avatar member={{ ...editingMember, profilePic: form.profilePic, name: form.name }} />
                <div>
                  <p className='text-sm font-semibold text-slate-900'>
                    {form.name || 'Unnamed member'}
                  </p>
                  <p className='text-xs text-slate-600'>
                    {form.title || 'Board Member'}
                  </p>
                </div>
              </div>

              <div className='grid gap-4 sm:grid-cols-2'>
                <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                  Name *
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => (prev ? { ...prev, name: e.target.value } : prev))
                    }
                    required
                    className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400'
                  />
                </label>
                <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                  Company *
                  <input
                    value={form.company}
                    onChange={(e) =>
                      setForm((prev) =>
                        prev ? { ...prev, company: e.target.value } : prev
                      )
                    }
                    required
                    className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400'
                  />
                </label>
                <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                  Title
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm((prev) => (prev ? { ...prev, title: e.target.value } : prev))
                    }
                    className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400'
                  />
                </label>
                <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700'>
                  Email *
                  <input
                    value={form.email}
                    onChange={(e) =>
                      setForm((prev) => (prev ? { ...prev, email: e.target.value } : prev))
                    }
                    type='email'
                    required
                    className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400'
                  />
                </label>
                <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700 sm:col-span-2'>
                  LinkedIn
                  <input
                    value={form.linkedin}
                    onChange={(e) =>
                      setForm((prev) =>
                        prev ? { ...prev, linkedin: e.target.value } : prev
                      )
                    }
                    className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400'
                  />
                </label>
                <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700 sm:col-span-2'>
                  Profile picture URL/key
                  <input
                    value={form.profilePic}
                    onChange={(e) =>
                      setForm((prev) =>
                        prev ? { ...prev, profilePic: e.target.value } : prev
                      )
                    }
                    className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400'
                  />
                </label>
                <label className='flex flex-col gap-2 text-sm font-semibold text-slate-700 sm:col-span-2'>
                  Bio
                  <textarea
                    rows={4}
                    value={form.bio}
                    onChange={(e) =>
                      setForm((prev) => (prev ? { ...prev, bio: e.target.value } : prev))
                    }
                    className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400'
                  />
                </label>
              </div>

              <div className='mt-6 flex flex-wrap items-center justify-between gap-3'>
                <button
                  type='button'
                  onClick={handleDelete}
                  disabled={busy}
                  className='rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:opacity-60'
                >
                  {busy ? 'Working…' : 'Delete member'}
                </button>
                <div className='flex items-center gap-3'>
                  <button
                    type='button'
                    onClick={closeEditor}
                    disabled={busy}
                    className='rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60'
                  >
                    Cancel
                  </button>
                  <button
                    type='button'
                    onClick={handleSave}
                    disabled={busy}
                    className='rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md disabled:opacity-60'
                  >
                    {busy ? 'Saving…' : 'Save changes'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
