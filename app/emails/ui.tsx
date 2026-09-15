'use client';

import { useEffect, useMemo, useState } from 'react';
import { graphqlClient as client } from '@/src/amplify-client';
import {
  cancelEmailCampaignSchedule,
  createEmailCampaign,
  deleteEmailCampaign,
  getEmailTemplateOptions,
  listCampaignsByEventId,
  listSendsByCampaignId,
  previewCampaignAudience,
  previewEmailTemplate,
  scheduleEmailCampaign,
  sendEmailCampaignNow,
  sendTestEmail,
  listEmailAudienceAddOns,
  type EmailCampaign,
  type EmailSend,
  type RegistrantStatusFilter,
  type RegistrantTypeFilter,
  type AddOnRequestStatusFilter,
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

const COMPLETE_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function parseAudienceEmails(raw: string): string[] {
  const seen = new Set<string>();
  const emails: string[] = [];
  const matches = raw.toLowerCase().match(/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}/g) ?? [];
  for (const email of matches) {
    if (seen.has(email)) continue;
    seen.add(email);
    emails.push(email);
  }
  return emails;
}

const ADDON_STATUS_OPTIONS: Array<{
  id: AddOnRequestStatusFilter;
  label: string;
}> = [
  { id: 'APPROVED', label: 'Approved' },
  { id: 'PENDING', label: 'Requested (not yet approved)' },
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

function shortUrl(url?: string | null): string {
  if (!url) return '—';
  try {
    const parsed = new URL(url);
    const path = `${parsed.hostname}${parsed.pathname}`.replace(/\/$/, '');
    return path.length > 42 ? `${path.slice(0, 41)}…` : path;
  } catch {
    return url.length > 42 ? `${url.slice(0, 41)}…` : url;
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
  const [audienceAddOnIds, setAudienceAddOnIds] = useState<string[]>([]);
  const [audienceAddOnRequestStatuses, setAudienceAddOnRequestStatuses] =
    useState<AddOnRequestStatusFilter[]>(['APPROVED', 'PENDING']);
  const [audienceTestEmailsText, setAudienceTestEmailsText] = useState('');
  const [useTestGroup, setUseTestGroup] = useState(false);
  const audienceTestEmails = useMemo(
    () => parseAudienceEmails(audienceTestEmailsText),
    [audienceTestEmailsText],
  );
  const [eventAddOns, setEventAddOns] = useState<
    Array<{
      id: string;
      title: string;
      pendingCount: number;
      approvedCount: number;
    }>
  >([]);
  const [audienceCount, setAudienceCount] = useState<number | null>(null);
  const [audienceSample, setAudienceSample] = useState<
    Array<{ id: string; email: string; name: string }>
  >([]);
  const [audienceMissingEmails, setAudienceMissingEmails] = useState<string[]>(
    [],
  );
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduledAt, setScheduledAt] = useState('');

  const [previewEmail, setPreviewEmail] = useState('');
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [previewMeta, setPreviewMeta] = useState<{
    subject: string;
    recipientEmail: string;
    recipientName: string;
    usedPlaceholder: boolean;
    hasStoredTempPassword: boolean;
    tempPassword: string | null;
  } | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);
  const [testSending, setTestSending] = useState(false);

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

  const sendTrackingStats = useMemo(() => {
    const sent = sends.filter((s) => s.status === 'SENT');
    const opened = sent.filter((s) => Boolean(s.openedAt) || (s.openCount ?? 0) > 0);
    const clicked = sent.filter((s) => (s.clickCount ?? 0) > 0);
    return {
      sent: sent.length,
      opened: opened.length,
      clicked: clicked.length,
    };
  }, [sends]);

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
    setAudienceAddOnIds([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  useEffect(() => {
    if (!eventId) {
      setEventAddOns([]);
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const rows = await listEmailAudienceAddOns(eventId);
        if (!cancelled) setEventAddOns(rows);
      } catch {
        if (!cancelled) setEventAddOns([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [eventId]);

  useEffect(() => {
    if (!eventId) {
      setAudienceCount(null);
      setAudienceSample([]);
      setAudienceMissingEmails([]);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(() => {
      async function preview() {
        try {
          const result = await previewCampaignAudience({
            eventId,
            audienceStatuses,
            audienceTypes,
            audienceAddOnIds: audienceAddOnIds.length ? audienceAddOnIds : null,
            audienceAddOnRequestStatuses: audienceAddOnRequestStatuses.length
              ? audienceAddOnRequestStatuses
              : null,
            audienceTestEmails: audienceTestEmailsText || null,
            useTestGroup,
          });
          if (!cancelled) {
            setAudienceCount(result.count);
            setAudienceSample(result.sample);
            setAudienceMissingEmails(result.missingEmails ?? []);
          }
        } catch {
          if (!cancelled) {
            setAudienceCount(null);
            setAudienceSample([]);
            setAudienceMissingEmails([]);
          }
        }
      }
      void preview();
    }, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [
    eventId,
    audienceStatuses,
    audienceTypes,
    audienceAddOnIds,
    audienceAddOnRequestStatuses,
    audienceTestEmailsText,
    useTestGroup,
  ]);

  const previewLookupEmail = COMPLETE_EMAIL_RE.test(previewEmail.trim())
    ? previewEmail.trim()
    : '';

  useEffect(() => {
    if (!eventId || !templateKey) return;

    let cancelled = false;
    const timer = window.setTimeout(() => {
      void (async () => {
        setPreviewLoading(true);
        setPreviewError(null);
        try {
          const result = await previewEmailTemplate({
            eventId,
            templateKey,
            subject: subject.trim() || undefined,
            email: previewLookupEmail || undefined,
          });
          if (cancelled) return;
          setPreviewHtml(result.html);
          setPreviewMeta({
            subject: result.subject,
            recipientEmail: result.recipientEmail,
            recipientName: result.recipientName,
            usedPlaceholder: result.usedPlaceholder,
            hasStoredTempPassword: result.hasStoredTempPassword,
            tempPassword: result.tempPassword,
          });
        } catch (e) {
          if (cancelled) return;
          setPreviewError(
            e instanceof Error ? e.message : 'Failed to render preview',
          );
        } finally {
          if (!cancelled) setPreviewLoading(false);
        }
      })();
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [eventId, templateKey, subject, previewLookupEmail]);

  function toggleStatus(status: RegistrantStatusFilter) {
    setAudienceStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
  }

  function toggleTestGroup() {
    setUseTestGroup((on) => {
      if (on) {
        setAudienceStatuses(['APPROVED']);
        return false;
      }
      setAudienceStatuses([]);
      return true;
    });
  }

  function toggleType(type: RegistrantTypeFilter) {
    setAudienceTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }

  function toggleAddOn(addOnId: string) {
    setAudienceAddOnIds((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId],
    );
  }

  function toggleAddOnRequestStatus(status: AddOnRequestStatusFilter) {
    setAudienceAddOnRequestStatuses((prev) => {
      if (prev.includes(status)) {
        const next = prev.filter((s) => s !== status);
        return next.length ? next : prev;
      }
      return [...prev, status];
    });
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

    if (useTestGroup) {
      if (!audienceTestEmails.length) {
        throw new Error('Add at least one test-group email, or uncheck Test group.');
      }
      if ((audienceCount ?? 0) > audienceTestEmails.length) {
        throw new Error(
          'Test group still matches too many people. Refresh and confirm the recipient list before sending.',
        );
      }
    }

    const campaign = await createEmailCampaign({
      eventId,
      name: name.trim(),
      templateKey,
      subject: subject.trim() || undefined,
      audienceStatuses,
      audienceTypes: audienceTypes.length ? audienceTypes : null,
      audienceAddOnIds: audienceAddOnIds.length ? audienceAddOnIds : null,
      audienceAddOnRequestStatuses: audienceAddOnIds.length
        ? audienceAddOnRequestStatuses
        : null,
      audienceTestEmails: audienceTestEmailsText || null,
      useTestGroup,
    });

    if (scheduleEnabled) {
      const result = await scheduleEmailCampaign({
        campaignId: campaign.id,
        // datetime-local is the browser's local time; send UTC so Vercel
        // does not treat it as UTC and 500 on "must be in the future".
        scheduledAt: new Date(scheduledAt).toISOString(),
      });
      setStatusMessage(
        `Campaign scheduled. ${result.message} Recipients at send time will be resolved from current filters (${audienceCount ?? 0} now).`,
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

          <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:items-start">
          <form
            className="grid gap-4"
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
                onChange={(e) =>
                  setSubject(e.target.value.replace(/^\s*\[TEST\]\s*/i, ''))
                }
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
                Check Approved for the full list, or uncheck it and check Test
                group to send only to the emails you paste.
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
                  <label className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <input
                      type="checkbox"
                      checked={useTestGroup}
                      onChange={toggleTestGroup}
                    />
                    Test group
                  </label>
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

              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Add-ons
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Leave unchecked to ignore add-ons. Check one or more to limit
                  the audience to people with those add-on requests.
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  {ADDON_STATUS_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      className="inline-flex items-center gap-2 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={audienceAddOnRequestStatuses.includes(
                          option.id,
                        )}
                        onChange={() => toggleAddOnRequestStatus(option.id)}
                        disabled={audienceAddOnIds.length === 0}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                <div className="mt-3 max-h-48 space-y-2 overflow-y-auto">
                  {eventAddOns.length === 0 ? (
                    <p className="text-xs text-slate-500">
                      No add-ons found for this event.
                    </p>
                  ) : (
                    eventAddOns.map((addOn) => (
                      <label
                        key={addOn.id}
                        className="flex items-start gap-2 text-sm text-slate-700"
                      >
                        <input
                          type="checkbox"
                          className="mt-1"
                          checked={audienceAddOnIds.includes(addOn.id)}
                          onChange={() => toggleAddOn(addOn.id)}
                        />
                        <span>
                          <span className="font-medium text-slate-900">
                            {addOn.title}
                          </span>
                          <span className="mt-0.5 block text-xs text-slate-500">
                            {addOn.approvedCount} approved · {addOn.pendingCount}{' '}
                            requested
                          </span>
                        </span>
                      </label>
                    ))
                  )}
                </div>
              </div>

              {useTestGroup ? (
              <div className="mt-4">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Test group emails
                </div>
                <p className="mt-1 text-xs text-slate-600">
                  Only these registrant emails will be sent this campaign.
                </p>
                <textarea
                  className="mt-2 min-h-[88px] w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
                  value={audienceTestEmailsText}
                  onChange={(e) => setAudienceTestEmailsText(e.target.value)}
                  placeholder="one@company.com, two@company.com"
                />
                {audienceTestEmails.length ? (
                  <p className="mt-1 text-xs text-slate-500">
                    {audienceTestEmails.length} email
                    {audienceTestEmails.length === 1 ? '' : 's'} entered
                  </p>
                ) : null}
              </div>
              ) : null}

              <div
                className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
                  useTestGroup
                    ? 'border-orange-200 bg-orange-50 text-slate-800'
                    : 'border-slate-200 bg-white text-slate-700'
                }`}
              >
                <span className="font-semibold">
                  {audienceCount == null ? '…' : audienceCount}
                </span>{' '}
                {useTestGroup ? 'test-group recipient' : 'recipient'}
                {audienceCount === 1 ? '' : 's'}
                {useTestGroup ? ' will receive this send' : ' match'}
                {audienceSample.length ? (
                  <ul className="mt-2 max-h-48 space-y-1 overflow-y-auto text-xs text-slate-600">
                    {audienceSample.map((r) => (
                      <li key={r.id}>
                        <span className="font-medium text-slate-800">
                          {r.name || r.email}
                        </span>
                        {r.name ? (
                          <span className="text-slate-500"> · {r.email}</span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {audienceMissingEmails.length ? (
                  <p className="mt-2 text-xs text-rose-700">
                    Not on this event:{' '}
                    {audienceMissingEmails.join(', ')}
                  </p>
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
                        audienceAddOnIds: audienceAddOnIds.length
                          ? audienceAddOnIds
                          : null,
                        audienceAddOnRequestStatuses: audienceAddOnIds.length
                          ? audienceAddOnRequestStatuses
                          : null,
                        audienceTestEmails: audienceTestEmailsText || null,
                        useTestGroup,
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

          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Preview
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  {previewMeta
                    ? previewMeta.usedPlaceholder
                      ? 'Sample data — enter a registered email to preview as that attendee.'
                      : `Showing ${previewMeta.recipientName} (${previewMeta.recipientEmail})`
                    : 'Select a template to render a live preview.'}
                </p>
              </div>
              {previewLoading ? (
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-slate-500">
                  Updating…
                </span>
              ) : null}
            </div>

            {previewMeta && !previewMeta.usedPlaceholder ? (
              <div className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                {previewMeta.hasStoredTempPassword ? (
                  <>
                    Stored temp password:{' '}
                    <span className="font-mono text-sm font-semibold text-slate-900">
                      {previewMeta.tempPassword}
                    </span>
                    <span className="mt-1 block text-[11px] text-slate-500">
                      Same credential as this registrant&apos;s profile in
                      admin.
                    </span>
                  </>
                ) : (
                  <span>
                    No stored temp password on file for this registrant. The
                    email will tell them to use Forgot Password.
                  </span>
                )}
              </div>
            ) : null}

            {previewMeta?.subject ? (
              <p className="mt-3 truncate rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
                Subject:{' '}
                <span className="font-semibold text-slate-900">
                  {previewMeta.subject}
                </span>
              </p>
            ) : null}

            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white">
              {previewError ? (
                <div className="border-b border-rose-100 bg-rose-50 p-3 text-sm text-rose-700">
                  {previewError}
                </div>
              ) : null}
              {previewHtml ? (
                <iframe
                  key={`${templateKey}-${previewMeta?.recipientEmail ?? 'sample'}-${previewMeta?.tempPassword ?? 'none'}`}
                  title="Email preview"
                  sandbox=""
                  srcDoc={previewHtml}
                  className="h-[min(80vh,880px)] w-full bg-slate-100"
                />
              ) : (
                <div className="p-8 text-center text-sm text-slate-500">
                  {eventId
                    ? previewError
                      ? 'Enter a registered email or clear the field to preview sample data.'
                      : 'Rendering preview…'
                    : 'Choose an event to preview.'}
                </div>
              )}
            </div>

            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
              <div className="text-sm font-semibold text-slate-900">
                Send a test
              </div>
              <p className="mt-1 text-xs text-slate-600">
                Sends this template to one registered email on the selected
                event, using that attendee&apos;s real data. Campaigns and send
                logs are not updated.
              </p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <input
                  type="email"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
                  value={previewEmail}
                  onChange={(e) => setPreviewEmail(e.target.value)}
                  placeholder="registered@email.com"
                  autoComplete="email"
                />
                <button
                  type="button"
                  disabled={
                    testSending ||
                    !eventId ||
                    !templateKey ||
                    !COMPLETE_EMAIL_RE.test(previewEmail.trim())
                  }
                  className="shrink-0 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 disabled:opacity-60"
                  onClick={() => {
                    void (async () => {
                      const email = previewEmail.trim();
                      if (!COMPLETE_EMAIL_RE.test(email)) return;
                      if (
                        !window.confirm(
                          `Send a test of "${selectedTemplate?.label || templateKey}" to ${email}? This uses their registration data.`,
                        )
                      ) {
                        return;
                      }
                      setTestSending(true);
                      setError(null);
                      setStatusMessage(null);
                      try {
                        const result = await sendTestEmail({
                          eventId,
                          templateKey,
                          email,
                          subject: subject.trim() || undefined,
                        });
                        setStatusMessage(result.message);
                      } catch (err) {
                        setError(
                          err instanceof Error
                            ? err.message
                            : 'Test send failed',
                        );
                      } finally {
                        setTestSending(false);
                      }
                    })();
                  }}
                >
                  {testSending ? 'Sending…' : 'Send test'}
                </button>
              </div>
              {error ? (
                <p className="mt-2 text-xs text-rose-700">{error}</p>
              ) : null}
              {statusMessage ? (
                <p className="mt-2 text-xs text-slate-700">{statusMessage}</p>
              ) : null}
            </div>
          </aside>
          </div>
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
                          Template:{' '}
                          {
                            campaign.templateKey
                              .split('::addon::')[0]
                              .split('::test::')[0]
                          }
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

                      {campaign.status !== 'SENDING' && (
                        <button
                          type="button"
                          className="rounded-lg border border-rose-200 bg-white px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50"
                          disabled={loading}
                          onClick={async () => {
                            if (
                              !confirm(
                                `Delete "${campaign.name}" and its send log? This cannot be undone.`,
                              )
                            ) {
                              return;
                            }
                            setLoading(true);
                            setError(null);
                            try {
                              await deleteEmailCampaign({
                                campaignId: campaign.id,
                              });
                              if (selectedCampaignId === campaign.id) {
                                setSelectedCampaignId(null);
                                setSends([]);
                              }
                              setStatusMessage('Campaign deleted.');
                              await refreshCampaigns(eventId);
                            } catch (e) {
                              setError(
                                e instanceof Error
                                  ? e.message
                                  : 'Delete failed',
                              );
                            } finally {
                              setLoading(false);
                            }
                          }}
                        >
                          Delete
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
                {sends.length ? (
                  <p className="mt-2 text-xs text-slate-600">
                    Opened {sendTrackingStats.opened}/{sendTrackingStats.sent}
                    {sendTrackingStats.sent
                      ? ` (${Math.round(
                          (sendTrackingStats.opened / sendTrackingStats.sent) *
                            100,
                        )}%)`
                      : ''}
                    {' · '}
                    Clicked {sendTrackingStats.clicked}/{sendTrackingStats.sent}
                    {sendTrackingStats.sent
                      ? ` (${Math.round(
                          (sendTrackingStats.clicked / sendTrackingStats.sent) *
                            100,
                        )}%)`
                      : ''}
                  </p>
                ) : null}
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
                      <th className="px-3 py-2">Opened</th>
                      <th className="px-3 py-2">Clicks</th>
                      <th className="px-3 py-2">Last click</th>
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
                          {send.openedAt
                            ? new Date(send.openedAt).toLocaleString()
                            : '—'}
                        </td>
                        <td className="px-3 py-2 text-xs text-slate-500">
                          {send.clickCount ?? 0}
                        </td>
                        <td
                          className="max-w-[180px] truncate px-3 py-2 text-xs text-slate-500"
                          title={send.lastClickedUrl || ''}
                        >
                          {shortUrl(send.lastClickedUrl)}
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
