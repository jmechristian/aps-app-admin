'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  buildSessionDeepLink,
  extractSessionIdFromDeepLink,
  isNotificationsDeepLink,
} from '@/lib/announcement-deep-links';

export type AgendaSessionOption = {
  id: string;
  title?: string | null;
  date?: string | null;
  startTime?: string | null;
  endTime?: string | null;
  location?: string | null;
};

type AnnouncementDeepLinkFieldProps = {
  sessions: AgendaSessionOption[];
  sessionsLoading?: boolean;
  sessionsError?: string | null;
  value: string;
  onChange: (value: string) => void;
};

function formatSessionMeta(session: AgendaSessionOption) {
  const start = session.startTime?.trim();
  const end = session.endTime?.trim();
  const timeWindow =
    start && end ? `${start} - ${end}` : start ? start : 'No time';
  return [session.date || 'No date', timeWindow, session.location || 'No location'].join(
    ' · ',
  );
}

export default function AnnouncementDeepLinkField({
  sessions,
  sessionsLoading = false,
  sessionsError = null,
  value,
  onChange,
}: AnnouncementDeepLinkFieldProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [search, setSearch] = useState('');

  const selectedSessionId = extractSessionIdFromDeepLink(value);
  const selectedSession = useMemo(
    () => sessions.find((session) => session.id === selectedSessionId) ?? null,
    [selectedSessionId, sessions],
  );

  const filteredSessions = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return sessions;
    return sessions.filter((session) => {
      const title = String(session.title || '').toLowerCase();
      const date = String(session.date || '').toLowerCase();
      const location = String(session.location || '').toLowerCase();
      return title.includes(q) || date.includes(q) || location.includes(q);
    });
  }, [search, sessions]);

  useEffect(() => {
    if (!showPicker) setSearch('');
  }, [showPicker]);

  return (
    <div className='space-y-3'>
      <div>
        <span className='text-sm font-semibold text-slate-700'>Tap destination</span>
        <p className='mt-1 text-xs text-slate-500'>
          Choose a session to open when someone taps the push notification. Leave unset
          to open Notifications.
        </p>
      </div>

      <div className='rounded-2xl border border-slate-200 bg-slate-50 p-4'>
        {selectedSession ? (
          <>
            <p className='text-sm font-semibold text-slate-900'>
              {selectedSession.title || 'Untitled session'}
            </p>
            <p className='mt-1 text-xs text-slate-600'>
              {formatSessionMeta(selectedSession)}
            </p>
            <p className='mt-2 font-mono text-xs text-slate-500'>
              {buildSessionDeepLink(selectedSession.id)}
            </p>
          </>
        ) : (
          <p className='text-sm text-slate-600'>Opens Notifications when tapped</p>
        )}

        <div className='mt-4 flex flex-wrap items-center gap-3'>
          <button
            type='button'
            onClick={() => setShowPicker(true)}
            className='rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50'
          >
            {selectedSession ? 'Change session' : 'Choose session'}
          </button>
          {selectedSession || (!isNotificationsDeepLink(value) && value.trim()) ? (
            <button
              type='button'
              onClick={() => {
                onChange('');
                setShowAdvanced(false);
              }}
              className='text-sm font-semibold text-rose-700 hover:text-rose-800'
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      <button
        type='button'
        onClick={() => setShowAdvanced((current) => !current)}
        className='text-sm font-semibold text-slate-700 hover:text-slate-900'
      >
        {showAdvanced ? 'Hide custom link' : 'Use custom link instead'}
      </button>

      {showAdvanced ? (
        <input
          value={isNotificationsDeepLink(value) ? '' : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder='Custom deep link (optional)'
          className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
        />
      ) : null}

      {sessionsError ? (
        <p className='text-xs text-rose-600'>{sessionsError}</p>
      ) : null}

      {showPicker ? (
        <div className='fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 p-4 sm:items-center'>
          <div className='flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl'>
            <div className='flex items-center justify-between border-b border-slate-200 px-5 py-4'>
              <h3 className='text-lg font-semibold text-slate-900'>Choose session</h3>
              <button
                type='button'
                onClick={() => setShowPicker(false)}
                className='rounded-lg px-3 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-100'
              >
                Close
              </button>
            </div>

            <div className='border-b border-slate-200 px-5 py-4'>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder='Search sessions'
                className='w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400'
              />
            </div>

            <div className='overflow-y-auto px-5 py-4'>
              {sessionsLoading ? (
                <p className='text-sm text-slate-500'>Loading sessions…</p>
              ) : filteredSessions.length === 0 ? (
                <p className='text-sm text-slate-500'>No sessions matched your search.</p>
              ) : (
                <ul className='space-y-2'>
                  {filteredSessions.map((session) => {
                    const selected = session.id === selectedSessionId;
                    return (
                      <li key={session.id}>
                        <button
                          type='button'
                          onClick={() => {
                            onChange(buildSessionDeepLink(session.id));
                            setShowPicker(false);
                          }}
                          className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                            selected
                              ? 'border-slate-900 bg-slate-50'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <p className='text-sm font-semibold text-slate-900'>
                            {session.title || 'Untitled session'}
                          </p>
                          <p className='mt-1 text-xs text-slate-600'>
                            {formatSessionMeta(session)}
                          </p>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
