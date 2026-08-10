'use client';

import { useEffect, useMemo, useState } from 'react';
import { graphqlClient as client } from '@/src/amplify-client';
import {
  cancelEmailCampaignSchedule,
  createEmailCampaign,
  getEmailTemplateOptions,
  listCampaignsByEventId,
  listSendsByCampaignId,
  previewCampaignAudience,
  scheduleEmailCampaign,
  sendEmailCampaignNow,
  type EmailCampaign,
  type EmailSend,
  type RegistrantStatusFilter,
  type RegistrantTypeFilter,
} from '@/app/actions/emails';

type APS = { id: string; year: string };

type TemplateOption = {
  key: string;
  label: string;
  description: string | null;
  defaultSubjectHint: string;
};

const STATUS_OPTIONS: RegistrantStatusFilter[] = [
  'APPROVED',
  'PENDING',
  'REJECTED',
];

const TYPE_OPTIONS: RegistrantTypeFilter[] = [
  'OEM',
  'TIER1',
  'SOLUTIONPROVIDER',
  'SPONSOR',
  'SPEAKER',
  'STAFF',
  'EXHIBITOR',
];

function getGraphQLData<T>(res: unknown): T {
  const data = (res as { data?: T }).data;
  if (!data) throw new Error('No data returned from GraphQL');
  return data;
}

function toDatetimeLocalValue(date: Date) {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function statusClassName(status: EmailCampaign['status']) {
  switch (status) {
    case 'SENT':
      return 'bg-green-100 text-green-800';
    case 'SCHEDULED':
      return 'bg-blue-100 text-blue-800';
    case 'SENDING':
      return 'bg-amber-100 text-amber-800';
    case 'FAILED':
      return 'bg-rose-100 text-rose-800';
    case 'CANCELLED':
      return 'bg-slate-100 text-slate-600';
    default:
      return 'bg-slate-100 text-slate-700';
  }
}

function sendStatusClassName(status: EmailSend['status']) {
  switch (status) {
    case 'SENT':
      return 'bg-green-100 text-green-800';
    case 'FAILED':
      return 'bg-rose-100 text-rose-800';
    default:
      return 'bg-slate-100 text-slate-700';
  }
}

const LIST_APS = /* GraphQL */ `
  query ListAPS($limit: Int) {
    listAPS(limit: $limit) {
      items {
        id
        year
      }
    }
  }
`;

export default function EmailsClient() {
  const [events, setEvents] = useState<APS[]>([]);
  const [eventId, setEventId] = useState('');
  const [templates, setTemplates] = useState<TemplateOption[]>([]);
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [templateKey, setTemplateKey] = useState('welcome-email');
  const [subject, setSubject] = useState('');
  const [audienceStatuses, setAudienceStatuses] = useState<
    RegistrantStatusFilter[]
  >(['APPROVED']);
  const [audienceTypes, setAudienceTypes] = useState<RegistrantTypeFilter[]>(
    [],
  );
  const [audienceCount, setAudienceCount] = useState<number | null>(null);
  const [audienceSample, setAudienceSample] = useState<
    Array<{ id: string; email: string; name: string }>
  >([]);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduledAt, setScheduledAt] = useState('');

  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null,
  );
  const [sends, setSends] = useState<EmailSend[]>([]);
  const [sendsLoading, setSendsLoading] = useState(false);

  const minScheduleValue = useMemo(() => toDatetimeLocalValue(new Date()), []);

  const eventLabel = useMemo(() => {
    const ev = events.find((e) => e.id === eventId);
    return ev ? `Event ${ev.year}` : eventId ? 'Selected event' : 'No event';
  }, [events, eventId]);

  const selectedTemplate = useMemo(
    () => templates.find((t) => t.key === templateKey),
    [templates, templateKey],
  );

  useEffect(() => {
    let cancelled = false;
    async function loadBootstrap() {
      try {
        const [templateOptions, eventsRes] = await Promise.all([
          getEmailTemplateOptions(),
          client.graphql({
            query: LIST_APS,
            variables: { limit: 50 },
            authMode: 'apiKey',
          }),
        ]);

        if (cancelled) return;

        setTemplates(templateOptions);
        if (templateOptions[0] && !templateKey) {
          setTemplateKey(templateOptions[0].key);
        }

        const data = getGraphQLData<{
          listAPS?: { items?: Array<APS | null> | null };
        }>(eventsRes);
        const ev = (data.listAPS?.items ?? [])
          .filter(Boolean)
          .map((x) => ({ id: x!.id, year: x!.year }))
          .sort((a, b) => Number(b.year) - Number(a.year));
        setEvents(ev);
        if (!eventId && ev.length) {
          const preferred = ev.find((e) => e.year === '2026') ?? ev[0];
          setEventId(preferred.id);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load emails');
        }
      }
    }
    void loadBootstrap();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function refreshCampaigns(selectedEventId: string) {
    if (!selectedEventId) return;
    setLoading(true);
    setError(null);
    try {
      const rows = await listCampaignsByEventId(selectedEventId);
      setCampaigns(rows);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load campaigns');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshCampaigns(eventId);
    setSelectedCampaignId(null);
    setSends([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  useEffect(() => {
    if (!eventId) {
      setAudienceCount(null);
      setAudienceSample([]);
      return;
    }

    let cancelled = false;
    async function preview() {
      try {
        const result = await previewCampaignAudience({
          eventId,
          audienceStatuses,
          audienceTypes,
        });
        if (!cancelled) {
          setAudienceCount(result.count);
          setAudienceSample(result.sample);
        }
      } catch {
        if (!cancelled) {
          setAudienceCount(null);
          setAudienceSample([]);
        }
      }
    }
    void preview();
    return () => {
      cancelled = true;
    };
  }, [eventId, audienceStatuses, audienceTypes]);

  function toggleStatus(status: RegistrantStatusFilter) {
    setAudienceStatuses((prev) => {
      if (prev.includes(status)) {
        const next = prev.filter((s) => s !== status);
        return next.length ? next : prev;
      }
      return [...prev, status];
    });
  }

  function toggleType(type: RegistrantTypeFilter) {
    setAudienceTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }

  async function openSendLog(campaignId: string) {
    setSelectedCampaignId(campaignId);
    setSendsLoading(true);
    setError(null);
    try {
      const rows = await listSendsByCampaignId(campaignId);
      setSends(rows);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load send log');
    } finally {
      setSendsLoading(false);
    }
  }

  async function handleCreateAndMaybeSend() {
    if (!eventId) return;
    if (!name.trim()) throw new Error('Campaign name is required.');
    if (!templateKey) throw new Error('Choose a template.');

    if (scheduleEnabled) {
      if (!scheduledAt) throw new Error('Choose a schedule date and time.');
      const scheduledDate = new Date(scheduledAt);
      if (Number.isNaN(scheduledDate.getTime())) {
        throw new Error('Invalid schedule date and time.');
      }
      if (scheduledDate.getTime() <= Date.now()) {
        throw new Error('Schedule time must be in the future.');
      }
    }

    const campaign = await createEmailCampaign({
      eventId,
      name: name.trim(),
      templateKey,
      subject: subject.trim() || undefined,
      audienceStatuses,
      audienceTypes: audienceTypes.length ? audienceTypes : null,
    });

    if (scheduleEnabled) {
      const result = await scheduleEmailCampaign({
        campaignId: campaign.id,
        scheduledAt,
      });
      setStatusMessage(
        `Campaign scheduled. ${result.message} Recipients at schedule time will be resolved from current filters (${audienceCount ?? 0} now).`,
      );
    } else {
      const confirmed = window.confirm(
        `Send "${campaign.name}" now to ${audienceCount ?? 0} recipient(s)? This cannot be undone.`,
      );
      if (!confirmed) {
        setStatusMessage(
          `Draft saved as "${campaign.name}". You can send or schedule it from the list.`,
        );
        await refreshCampaigns(eventId);
        return;
      }
      const result = await sendEmailCampaignNow({ campaignId: campaign.id });
      setStatusMessage(
        `Campaign sent. ${result.sentCount} delivered, ${result.failedCount} failed.`,
      );
      await openSendLog(campaign.id);
    }

    setName('');
    setSubject('');
    setScheduleEnabled(false);
    setScheduledAt('');
    await refreshCampaigns(eventId);
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <main className="page-container flex flex-col gap-8">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Admin
            </p>
            <h1 className="text-4xl font-bold text-slate-900">Emails</h1>
            <p className="max-w-2xl text-slate-600">
              Design campaigns from React Email templates, target an event
              registrant list, send now or schedule, and track each delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
            >
              {events.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.year} ({e.id.slice(0, 6)}…)
                </option>
              ))}
            </select>
            <button
              type="button"
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-slate-50"
              onClick={() => void refreshCampaigns(eventId)}
              disabled={!eventId || loading}
            >
              Refresh
            </button>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              New campaign
            </h2>
            <p className="text-sm text-slate-600">{eventLabel}</p>
          </div>

          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!eventId) return;
              void (async () => {
                setLoading(true);
                setError(null);
                setStatusMessage(null);
                try {
                  await handleCreateAndMaybeSend();
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Save failed');
                } finally {
                  setLoading(false);
                }
              })();
            }}
          >
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">Name</span>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Pre-event reminder"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Template
              </span>
              <select
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-400"
                value={templateKey}
                onChange={(e) => {
                  setTemplateKey(e.target.value);
                  setSubject('');
                }}
              >
                {templates.map((t) => (
                  <option key={t.key} value={t.key}>
                    {t.label}
                  </option>
                ))}
              </select>
              {selectedTemplate?.description ? (
                <span className="mt-1 block text-xs text-slate-500">
                  {selectedTemplate.description}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Subject
              </span>
              <input
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-400"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={
                  selectedTemplate?.defaultSubjectHint || 'Email subject'
                }
              />
            </label>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900">
                Audience
              </div>
              <p className="mt-1 text-xs text-slate-600">
                Defaults to APPROVED registrants for the selected event. Leave
                types unchecked to include all attendee types.
              </p>

              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </div>
                <div className="mt-2 flex flex-wrap gap-3">
                  {STATUS_OPTIONS.map((status) => (
                    <label
                      key={status}
                      className="inline-flex items-center gap-2 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={audienceStatuses.includes(status)}
                        onChange={() => toggleStatus(status)}
                      />
                      {status}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Attendee type
                </div>
                <div className="mt-2 flex flex-wrap gap-3">
                  {TYPE_OPTIONS.map((type) => (
                    <label
                      key={type}
                      className="inline-flex items-center gap-2 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={audienceTypes.includes(type)}
                        onChange={() => toggleType(type)}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700">
                <span className="font-semibold">
                  {audienceCount == null ? '…' : audienceCount}
                </span>{' '}
                recipient{audienceCount === 1 ? '' : 's'} match
                {audienceSample.length ? (
                  <span className="mt-1 block text-xs text-slate-500">
                    Sample:{' '}
                    {audienceSample
                      .map((r) => r.name || r.email)
                      .join(', ')}
                    {audienceCount != null && audienceCount > audienceSample.length
                      ? '…'
                      : ''}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={scheduleEnabled}
                  onChange={(e) => setScheduleEnabled(e.target.checked)}
                  className="mt-1"
                />
                <span>
                  <span className="block text-sm font-semibold text-slate-900">
                    Schedule for later
                  </span>
                  <span className="mt-1 block text-xs text-slate-600">
                    {scheduleEnabled
                      ? 'Campaign stays scheduled until the send time.'
                      : 'Send now delivers immediately via SES.'}
                  </span>
                </span>
              </label>

              {scheduleEnabled ? (
                <label className="mt-4 block">
                  <span className="text-sm font-semibold text-slate-700">
                    Scheduled time
                  </span>
                  <input
                    type="datetime-local"
                    min={minScheduleValue}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none focus:border-slate-400"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    required
                  />
                </label>
              ) : null}
            </div>

            {error ? (
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}
            {statusMessage ? (
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                {statusMessage}
              </div>
            ) : null}

            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                disabled={loading || !eventId}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-60"
                onClick={() => {
                  if (!eventId) return;
                  void (async () => {
                    setLoading(true);
                    setError(null);
                    setStatusMessage(null);
                    try {
                      if (!name.trim()) {
                        throw new Error('Campaign name is required.');
                      }
                      await createEmailCampaign({
                        eventId,
                        name: name.trim(),
                        templateKey,
                        subject: subject.trim() || undefined,
                        audienceStatuses,
                        audienceTypes: audienceTypes.length
                          ? audienceTypes
                          : null,
                      });
                      setStatusMessage('Draft saved.');
                      setName('');
                      setSubject('');
                      await refreshCampaigns(eventId);
                    } catch (err) {
                      setError(
                        err instanceof Error ? err.message : 'Save failed',
                      );
                    } finally {
                      setLoading(false);
                    }
                  })();
                }}
              >
                Save draft
              </button>
              <button
                type="submit"
                disabled={loading || !eventId}
                className={`rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-lg disabled:opacity-60 ${
                  scheduleEnabled
                    ? 'bg-slate-900'
                    : 'bg-orange-700 hover:bg-orange-800'
                }`}
              >
                {loading
                  ? 'Working…'
                  : scheduleEnabled
                    ? 'Schedule campaign'
                    : 'Create & send'}
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Campaigns</h2>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
              {campaigns.length}
            </span>
          </div>

          {campaigns.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
              No campaigns yet for this event.
            </div>
          ) : (
            <ul className="mt-6 space-y-3">
              {campaigns.map((campaign) => (
                <li
                  key={campaign.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="text-sm font-semibold text-slate-900">
                          {campaign.name}
                        </div>
                        <span
                          className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClassName(campaign.status)}`}
                        >
                          {campaign.status}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-slate-700">
                        {campaign.subject}
                      </div>
                      <div className="mt-2 space-y-1 text-xs text-slate-500">
                        <div>
                          Template: {campaign.templateKey}
                          {' · '}
                          Recipients: {campaign.totalRecipients ?? '—'}
                          {' · '}
                          Sent: {campaign.sentCount ?? 0}
                          {' · '}
                          Failed: {campaign.failedCount ?? 0}
                        </div>
                        {campaign.scheduledAt ? (
                          <div>
                            Scheduled:{' '}
                            {new Date(campaign.scheduledAt).toLocaleString()}
                          </div>
                        ) : null}
                        {campaign.completedAt ? (
                          <div>
                            Completed:{' '}
                            {new Date(campaign.completedAt).toLocaleString()}
                          </div>
                        ) : null}
                        <div className="font-mono">{campaign.id}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {(campaign.status === 'DRAFT' ||
                        campaign.status === 'CANCELLED') && (
                        <button
                          type="button"
                          className="rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-800 hover:bg-orange-100"
                          disabled={loading}
                          onClick={async () => {
                            if (
                              !confirm(
                                `Send "${campaign.name}" now? This cannot be undone.`,
                              )
                            ) {
                              return;
                            }
                            setLoading(true);
                            setError(null);
                            setStatusMessage(null);
                            try {
                              const result = await sendEmailCampaignNow({
                                campaignId: campaign.id,
                              });
                              setStatusMessage(
                                `Sent ${result.sentCount}, failed ${result.failedCount}.`,
                              );
                              await refreshCampaigns(eventId);
                              await openSendLog(campaign.id);
                            } catch (e) {
                              setError(
                                e instanceof Error ? e.message : 'Send failed',
                              );
                            } finally {
                              setLoading(false);
                            }
                          }}
                        >
                          Send now
                        </button>
                      )}

                      {campaign.status === 'SCHEDULED' && (
                        <button
                          type="button"
                          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                          disabled={loading}
                          onClick={async () => {
                            if (!confirm('Cancel this scheduled send?')) return;
                            setLoading(true);
                            setError(null);
                            try {
                              await cancelEmailCampaignSchedule({
                                campaignId: campaign.id,
                              });
                              setStatusMessage('Schedule cancelled.');
                              await refreshCampaigns(eventId);
                            } catch (e) {
                              setError(
                                e instanceof Error
                                  ? e.message
                                  : 'Cancel failed',
                              );
                            } finally {
                              setLoading(false);
                            }
                          }}
                        >
                          Cancel schedule
                        </button>
                      )}

                      <button
                        type="button"
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                        disabled={sendsLoading}
                        onClick={() => void openSendLog(campaign.id)}
                      >
                        View sends
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {selectedCampaignId ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Send log
                </h2>
                <p className="font-mono text-xs text-slate-500">
                  {selectedCampaignId}
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                onClick={() => {
                  setSelectedCampaignId(null);
                  setSends([]);
                }}
              >
                Close
              </button>
            </div>

            {sendsLoading ? (
              <div className="mt-6 text-sm text-slate-600">Loading sends…</div>
            ) : sends.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
                No send records yet for this campaign.
              </div>
            ) : (
              <div className="mt-6 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead className="text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Status</th>
                      <th className="px-3 py-2">Sent at</th>
                      <th className="px-3 py-2">SES / Error</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sends.map((send) => (
                      <tr
                        key={send.id}
                        className="border-t border-slate-100 text-slate-700"
                      >
                        <td className="px-3 py-2 font-mono text-xs">
                          {send.email}
                        </td>
                        <td className="px-3 py-2">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${sendStatusClassName(send.status)}`}
                          >
                            {send.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-xs text-slate-500">
                          {send.sentAt
                            ? new Date(send.sentAt).toLocaleString()
                            : '—'}
                        </td>
                        <td className="px-3 py-2 text-xs text-slate-500">
                          {send.error || send.sesMessageId || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        ) : null}
      </main>
    </div>
  );
}
