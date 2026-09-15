'use server';

import { requestGraphQL } from '@/lib/appsync';
import {
  assertEmailTemplate,
  listEmailTemplates,
  type EmailTemplateRecipient,
} from '@/lib/email-templates';
import {
  deleteEmailCampaignSchedule,
  upsertEmailCampaignSchedule,
} from '@/lib/email-scheduler';
import { sendHtmlEmail } from '@/lib/ses';
import { applyEmailTracking } from '@/lib/email-tracking';
import {
  fetchAddOnRequestsByAddOnId,
  fetchAddOnsByEventId,
} from '@/app/actions/add-ons';
import {
  fetchLatestTempCredentialByRegistrantId,
  fetchRegistrantById,
  fetchRegistrantsByApsId,
  markRegistrantAppEmailSent,
  type Registrant,
} from '@/app/actions/registrants';

export type EmailCampaignStatus =
  | 'DRAFT'
  | 'SCHEDULED'
  | 'SENDING'
  | 'SENT'
  | 'FAILED'
  | 'CANCELLED';

export type EmailSendStatus = 'PENDING' | 'SENT' | 'FAILED';

export type RegistrantStatusFilter =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED';

export type RegistrantTypeFilter =
  | 'OEM'
  | 'TIER1'
  | 'SOLUTIONPROVIDER'
  | 'SPONSOR'
  | 'SPEAKER'
  | 'STAFF'
  | 'EXHIBITOR';

export type AddOnRequestStatusFilter = 'PENDING' | 'APPROVED';

export type EmailCampaign = {
  id: string;
  eventId: string;
  name: string;
  templateKey: string;
  subject: string;
  audienceStatuses?: RegistrantStatusFilter[] | null;
  audienceTypes?: RegistrantTypeFilter[] | null;
  audienceAddOnIds?: string[] | null;
  audienceAddOnRequestStatuses?: AddOnRequestStatusFilter[] | null;
  status: EmailCampaignStatus;
  scheduledAt?: string | null;
  startedAt?: string | null;
  completedAt?: string | null;
  totalRecipients?: number | null;
  sentCount?: number | null;
  failedCount?: number | null;
  createdAt: string;
  updatedAt: string;
};

export type EmailSend = {
  id: string;
  campaignId: string;
  eventId: string;
  registrantId: string;
  email: string;
  status: EmailSendStatus;
  sesMessageId?: string | null;
  error?: string | null;
  sentAt?: string | null;
  openedAt?: string | null;
  openCount?: number | null;
  clickedAt?: string | null;
  clickCount?: number | null;
  lastClickedUrl?: string | null;
  createdAt: string;
  updatedAt: string;
};

const CAMPAIGN_FIELDS = `
  id
  eventId
  name
  templateKey
  subject
  audienceStatuses
  audienceTypes
  status
  scheduledAt
  startedAt
  completedAt
  totalRecipients
  sentCount
  failedCount
  createdAt
  updatedAt
`;

const CREATE_CAMPAIGN = /* GraphQL */ `
  mutation CreateApsEmailCampaign($input: CreateApsEmailCampaignInput!) {
    createApsEmailCampaign(input: $input) {
      ${CAMPAIGN_FIELDS}
    }
  }
`;

const DELETE_CAMPAIGN = /* GraphQL */ `
  mutation DeleteApsEmailCampaign($input: DeleteApsEmailCampaignInput!) {
    deleteApsEmailCampaign(input: $input) {
      id
    }
  }
`;

const DELETE_SEND = /* GraphQL */ `
  mutation DeleteApsEmailSend($input: DeleteApsEmailSendInput!) {
    deleteApsEmailSend(input: $input) {
      id
    }
  }
`;

const GET_CAMPAIGN = /* GraphQL */ `
  query GetApsEmailCampaign($id: ID!) {
    getApsEmailCampaign(id: $id) {
      ${CAMPAIGN_FIELDS}
    }
  }
`;

const LIST_CAMPAIGNS_BY_EVENT = /* GraphQL */ `
  query ApsEmailCampaignsByEventIdAndCreatedAt(
    $eventId: ID!
    $sortDirection: ModelSortDirection
    $limit: Int
    $nextToken: String
  ) {
    apsEmailCampaignsByEventIdAndCreatedAt(
      eventId: $eventId
      sortDirection: $sortDirection
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ${CAMPAIGN_FIELDS}
      }
      nextToken
    }
  }
`;

const LIST_SCHEDULED_CAMPAIGNS = /* GraphQL */ `
  query ListApsEmailCampaigns(
    $filter: ModelApsEmailCampaignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsEmailCampaigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        ${CAMPAIGN_FIELDS}
      }
      nextToken
    }
  }
`;

const CREATE_SEND = /* GraphQL */ `
  mutation CreateApsEmailSend($input: CreateApsEmailSendInput!) {
    createApsEmailSend(input: $input) {
      id
      campaignId
      eventId
      registrantId
      email
      status
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_SEND = /* GraphQL */ `
  mutation UpdateApsEmailSend($input: UpdateApsEmailSendInput!) {
    updateApsEmailSend(input: $input) {
      id
      status
      sesMessageId
      error
      sentAt
    }
  }
`;

const SEND_FIELDS = `
  id
  campaignId
  eventId
  registrantId
  email
  status
  sesMessageId
  error
  sentAt
  createdAt
  updatedAt
`;

const SEND_TRACKING_FIELDS = `
  openedAt
  openCount
  clickedAt
  clickCount
  lastClickedUrl
`;

const LIST_SENDS_BY_CAMPAIGN = /* GraphQL */ `
  query ApsEmailSendsByCampaignIdAndCreatedAt(
    $campaignId: ID!
    $sortDirection: ModelSortDirection
    $limit: Int
    $nextToken: String
  ) {
    apsEmailSendsByCampaignIdAndCreatedAt(
      campaignId: $campaignId
      sortDirection: $sortDirection
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ${SEND_FIELDS}
      }
      nextToken
    }
  }
`;

const LIST_SENDS_BY_CAMPAIGN_WITH_TRACKING = /* GraphQL */ `
  query ApsEmailSendsByCampaignIdAndCreatedAt(
    $campaignId: ID!
    $sortDirection: ModelSortDirection
    $limit: Int
    $nextToken: String
  ) {
    apsEmailSendsByCampaignIdAndCreatedAt(
      campaignId: $campaignId
      sortDirection: $sortDirection
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ${SEND_FIELDS}
        ${SEND_TRACKING_FIELDS}
      }
      nextToken
    }
  }
`;

const GET_APS_YEAR = /* GraphQL */ `
  query GetAPS($id: ID!) {
    getAPS(id: $id) {
      id
      year
    }
  }
`;

const SEND_CONCURRENCY = 3;
const SES_MAX_PER_SECOND = 10;

function createSesRateLimiter(perSecond: number) {
  const gapMs = Math.ceil(1000 / Math.max(1, perSecond));
  let nextAllowed = 0;
  return async function waitForSesSlot() {
    const now = Date.now();
    const scheduled = Math.max(nextAllowed, now);
    nextAllowed = scheduled + gapMs;
    const wait = scheduled - now;
    if (wait > 0) {
      await new Promise((resolve) => setTimeout(resolve, wait));
    }
  };
}

function normalizeStatuses(
  statuses?: RegistrantStatusFilter[] | null,
): RegistrantStatusFilter[] {
  if (statuses == null) return ['APPROVED'];
  return statuses;
}

function normalizeAddOnRequestStatuses(
  statuses?: AddOnRequestStatusFilter[] | null,
): AddOnRequestStatusFilter[] {
  if (!statuses || statuses.length === 0) return ['PENDING', 'APPROVED'];
  return statuses;
}

function filterAudience(
  registrants: Registrant[],
  statuses?: RegistrantStatusFilter[] | null,
  types?: RegistrantTypeFilter[] | null,
): Registrant[] {
  const statusSet = new Set(normalizeStatuses(statuses));
  const typeSet =
    types && types.length > 0 ? new Set(types.map(String)) : null;

  const seenEmails = new Set<string>();
  const result: Registrant[] = [];

  for (const r of registrants) {
    const email = (r.email || '').trim().toLowerCase();
    if (!email) continue;
    if (!statusSet.has(r.status as RegistrantStatusFilter)) continue;
    if (typeSet && !typeSet.has(r.attendeeType)) continue;
    if (seenEmails.has(email)) continue;
    seenEmails.add(email);
    result.push(r);
  }

  return result;
}

const EMAIL_EXTRACT_RE = /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}/gi;

function normalizeAudienceEmails(
  emails?: string[] | string | null,
): string[] {
  if (!emails) return [];
  const chunks = Array.isArray(emails) ? emails : [emails];
  const seen = new Set<string>();
  const result: string[] = [];
  for (const chunk of chunks) {
    const matches = String(chunk).toLowerCase().match(EMAIL_EXTRACT_RE) ?? [];
    for (const email of matches) {
      if (seen.has(email)) continue;
      seen.add(email);
      result.push(email);
    }
  }
  return result;
}

function encodeCampaignTemplateKey(
  templateKey: string,
  addOnIds?: string[] | null,
  requestStatuses?: AddOnRequestStatusFilter[] | null,
  testEmails?: string[] | string | null,
  useTestGroup?: boolean,
) {
  let encoded = templateKey;
  if (addOnIds?.length && !useTestGroup) {
    const statuses = normalizeAddOnRequestStatuses(requestStatuses).join(',');
    encoded = `${encoded}::addon::${addOnIds.join(',')}::${statuses}`;
  }
  if (useTestGroup) {
    encoded = `${encoded}::test::${normalizeAudienceEmails(testEmails).join(',')}`;
  }
  return encoded;
}

function decodeCampaignTemplateKey(raw: string): {
  templateKey: string;
  audienceAddOnIds: string[] | null;
  audienceAddOnRequestStatuses: AddOnRequestStatusFilter[] | null;
  audienceTestEmails: string[] | null;
  useTestGroup: boolean;
} {
  let working = raw;
  let audienceTestEmails: string[] | null = null;
  let useTestGroup = false;
  const testMarker = '::test::';
  const testIdx = working.indexOf(testMarker);
  if (testIdx !== -1) {
    useTestGroup = true;
    audienceTestEmails = normalizeAudienceEmails(
      working.slice(testIdx + testMarker.length).split(','),
    );
    working = working.slice(0, testIdx);
  }

  const marker = '::addon::';
  const idx = working.indexOf(marker);
  if (idx === -1) {
    return {
      templateKey: working,
      audienceAddOnIds: null,
      audienceAddOnRequestStatuses: null,
      audienceTestEmails: audienceTestEmails?.length ? audienceTestEmails : null,
      useTestGroup,
    };
  }
  const templateKey = working.slice(0, idx);
  const rest = working.slice(idx + marker.length);
  const [idsPart, statusesPart] = rest.split('::');
  const audienceAddOnIds = (idsPart || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);
  const audienceAddOnRequestStatuses = (statusesPart || '')
    .split(',')
    .map((s) => s.trim())
    .filter((s): s is AddOnRequestStatusFilter => s === 'PENDING' || s === 'APPROVED');
  return {
    templateKey,
    audienceAddOnIds: audienceAddOnIds.length ? audienceAddOnIds : null,
    audienceAddOnRequestStatuses: audienceAddOnRequestStatuses.length
      ? audienceAddOnRequestStatuses
      : null,
    audienceTestEmails: audienceTestEmails?.length ? audienceTestEmails : null,
    useTestGroup,
  };
}

async function applyAddOnAudienceFilter(
  registrants: Registrant[],
  addOnIds?: string[] | null,
  requestStatuses?: AddOnRequestStatusFilter[] | null,
): Promise<Registrant[]> {
  if (!addOnIds?.length) return registrants;

  const statusSet = new Set(normalizeAddOnRequestStatuses(requestStatuses));
  const matchingIds = new Set<string>();

  for (const addOnId of addOnIds) {
    const requests = await fetchAddOnRequestsByAddOnId(addOnId);
    for (const request of requests) {
      if (!statusSet.has(request.status as AddOnRequestStatusFilter)) continue;
      if (request.registrantId) matchingIds.add(request.registrantId);
    }
  }

  return registrants.filter((r) => matchingIds.has(r.id));
}

function applyTestEmailFilter(
  registrants: Registrant[],
  emails?: string[] | string | null,
): { matches: Registrant[]; missingEmails: string[] } {
  const allow = normalizeAudienceEmails(emails);
  if (!allow.length) return { matches: [], missingEmails: [] };

  const byEmail = new Map<string, Registrant>();
  for (const r of registrants) {
    const email = (r.email || '').trim().toLowerCase();
    if (email && !byEmail.has(email)) byEmail.set(email, r);
  }

  const matches: Registrant[] = [];
  const missingEmails: string[] = [];
  for (const email of allow) {
    const registrant = byEmail.get(email);
    if (registrant) matches.push(registrant);
    else missingEmails.push(email);
  }
  return { matches, missingEmails };
}

async function resolveCampaignAudience(params: {
  eventId: string;
  audienceStatuses?: RegistrantStatusFilter[] | null;
  audienceTypes?: RegistrantTypeFilter[] | null;
  audienceAddOnIds?: string[] | null;
  audienceAddOnRequestStatuses?: AddOnRequestStatusFilter[] | null;
  audienceTestEmails?: string[] | string | null;
  useTestGroup?: boolean;
}): Promise<{ matches: Registrant[]; missingEmails: string[] }> {
  const all = await fetchRegistrantsByApsId(params.eventId);
  if (params.useTestGroup) {
    return applyTestEmailFilter(all, params.audienceTestEmails);
  }

  const byRegistrant = filterAudience(
    all,
    params.audienceStatuses,
    params.audienceTypes,
  );
  const byAddOn = await applyAddOnAudienceFilter(
    byRegistrant,
    params.audienceAddOnIds,
    params.audienceAddOnRequestStatuses,
  );
  return { matches: byAddOn, missingEmails: [] };
}

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const current = nextIndex;
      nextIndex += 1;
      results[current] = await fn(items[current], current);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => worker(),
  );
  await Promise.all(workers);
  return results;
}

async function getEventYear(eventId: string): Promise<string> {
  const data = await requestGraphQL<{
    getAPS?: { id: string; year: string } | null;
  }>(GET_APS_YEAR, { id: eventId });
  return data.getAPS?.year || process.env.APS_EVENT_YEAR || '2026';
}

async function toTemplateRecipient(
  registrant: Registrant,
  opts?: { includeTempPassword?: boolean },
): Promise<EmailTemplateRecipient> {
  // Welcome (and richer templates) benefit from billing fields when available.
  const detail = await fetchRegistrantById(registrant.id);
  const base: EmailTemplateRecipient = detail
    ? {
        id: detail.id,
        firstName: detail.firstName,
        lastName: detail.lastName,
        email: detail.email,
        phone: detail.phone,
        jobTitle: detail.jobTitle,
        attendeeType: detail.attendeeType,
        companyName: detail.company?.name ?? null,
        speedNetworking: detail.speedNetworking,
        totalAmount: detail.totalAmount,
        billingAddressStreet: detail.billingAddressStreet,
        billingAddressCity: detail.billingAddressCity,
        billingAddressState: detail.billingAddressState,
        billingAddressZip: detail.billingAddressZip,
      }
    : {
        id: registrant.id,
        firstName: registrant.firstName,
        lastName: registrant.lastName,
        email: registrant.email,
        phone: registrant.phone,
        jobTitle: registrant.jobTitle,
        attendeeType: registrant.attendeeType,
        companyName: registrant.company?.name ?? null,
      };

  if (opts?.includeTempPassword) {
    const cred = await fetchLatestTempCredentialByRegistrantId(registrant.id);
    base.tempPassword = cred?.tempPassword ?? null;
  }

  return base;
}

const PREVIEW_PLACEHOLDER_RECIPIENT: EmailTemplateRecipient = {
  id: 'preview',
  firstName: 'Jamie',
  lastName: 'Christian',
  email: 'preview@autopacksummit.com',
  phone: '(864) 412-5000',
  jobTitle: 'Attendee',
  attendeeType: 'OEM',
  companyName: 'Packaging School',
  speedNetworking: true,
  totalAmount: 499,
  billingAddressStreet: '220 North Main Street',
  billingAddressCity: 'Greenville',
  billingAddressState: 'SC',
  billingAddressZip: '29601',
  tempPassword: null,
};

function recipientDisplayName(recipient: EmailTemplateRecipient) {
  return (
    [recipient.firstName, recipient.lastName].filter(Boolean).join(' ').trim() ||
    recipient.email
  );
}

function findRegistrantByEmail(
  registrants: Registrant[],
  email: string,
): Registrant | null {
  const needle = email.trim().toLowerCase();
  if (!needle) return null;
  return (
    registrants.find((r) => (r.email || '').trim().toLowerCase() === needle) ??
    null
  );
}

async function resolveTemplateSubject(params: {
  templateKey: string;
  eventId: string;
  subject?: string;
}) {
  const template = assertEmailTemplate(params.templateKey);
  const eventYear = await getEventYear(params.eventId);
  const subject = params.subject?.trim() || template.defaultSubject({ eventYear });
  return { template, eventYear, subject };
}

async function resolveRecipientForPreview(params: {
  eventId: string;
  email?: string;
  includeTempPassword?: boolean;
}): Promise<{
  recipient: EmailTemplateRecipient;
  usedPlaceholder: boolean;
}> {
  const all = await fetchRegistrantsByApsId(params.eventId);
  const requested = params.email?.trim();

  if (requested) {
    const match = findRegistrantByEmail(all, requested);
    if (!match) {
      throw new Error(
        `No registrant with email ${requested} on this event.`,
      );
    }
    return {
      recipient: await toTemplateRecipient(match, {
        includeTempPassword: params.includeTempPassword,
      }),
      usedPlaceholder: false,
    };
  }

  const fallback =
    all.find((r) => r.status === 'APPROVED' && r.email) ??
    all.find((r) => r.email) ??
    null;

  if (!fallback) {
    return {
      recipient: PREVIEW_PLACEHOLDER_RECIPIENT,
      usedPlaceholder: true,
    };
  }

  return {
    recipient: await toTemplateRecipient(fallback, {
      includeTempPassword: params.includeTempPassword,
    }),
    usedPlaceholder: false,
  };
}

export async function getEmailTemplateOptions() {
  return listEmailTemplates().map((t) => ({
    key: t.key,
    label: t.label,
    description: t.description ?? null,
    defaultSubjectHint: t.defaultSubject({
      eventYear: process.env.APS_EVENT_YEAR || '2026',
    }),
  }));
}

export async function previewEmailTemplate(params: {
  eventId: string;
  templateKey: string;
  subject?: string;
  email?: string;
}): Promise<{
  html: string;
  subject: string;
  recipientEmail: string;
  recipientName: string;
  usedPlaceholder: boolean;
  hasStoredTempPassword: boolean;
  tempPassword: string | null;
}> {
  const { template, eventYear, subject } = await resolveTemplateSubject(params);
  const { recipient, usedPlaceholder } = await resolveRecipientForPreview({
    eventId: params.eventId,
    email: params.email,
    includeTempPassword: Boolean(template.requiresTempPassword),
  });

  const html = await template.renderHtml({
    recipient,
    eventYear,
    subject,
  });

  const storedPassword =
    !usedPlaceholder && template.requiresTempPassword
      ? recipient.tempPassword ?? null
      : null;

  return {
    html,
    subject,
    recipientEmail: recipient.email,
    recipientName: recipientDisplayName(recipient),
    usedPlaceholder,
    hasStoredTempPassword: Boolean(storedPassword),
    tempPassword: storedPassword,
  };
}

export async function sendTestEmail(params: {
  eventId: string;
  templateKey: string;
  email: string;
  subject?: string;
}): Promise<{ ok: true; message: string; to: string; subject: string }> {
  const to = params.email.trim().toLowerCase();
  if (!to || !to.includes('@')) {
    throw new Error('Enter a registered email address.');
  }

  const { template, eventYear, subject } = await resolveTemplateSubject(params);
  const all = await fetchRegistrantsByApsId(params.eventId);
  const match = findRegistrantByEmail(all, to);
  if (!match) {
    throw new Error(`No registrant with email ${params.email.trim()} on this event.`);
  }

  const recipient = await toTemplateRecipient(match, {
    includeTempPassword: Boolean(template.requiresTempPassword),
  });
  const html = await template.renderHtml({
    recipient,
    eventYear,
    subject,
  });
  const text = template.renderText?.({
    recipient,
    eventYear,
    subject,
  });

  const testSubject = subject.startsWith('[TEST]')
    ? subject
    : `[TEST] ${subject}`;

  await sendHtmlEmail({
    to: recipient.email.trim(),
    subject: testSubject,
    html,
    text,
  });

  return {
    ok: true,
    to: recipient.email.trim(),
    subject: testSubject,
    message: `Test sent to ${recipient.email.trim()} as ${recipientDisplayName(recipient)}.`,
  };
}

export async function listEmailAudienceAddOns(eventId: string): Promise<
  Array<{
    id: string;
    title: string;
    pendingCount: number;
    approvedCount: number;
  }>
> {
  const addOns = await fetchAddOnsByEventId(eventId);
  return Promise.all(
    addOns.map(async (addOn) => {
      const requests = await fetchAddOnRequestsByAddOnId(addOn.id);
      return {
        id: addOn.id,
        title: addOn.title,
        pendingCount: requests.filter((r) => r.status === 'PENDING').length,
        approvedCount: requests.filter((r) => r.status === 'APPROVED').length,
      };
    }),
  );
}

export async function previewCampaignAudience(params: {
  eventId: string;
  audienceStatuses?: RegistrantStatusFilter[] | null;
  audienceTypes?: RegistrantTypeFilter[] | null;
  audienceAddOnIds?: string[] | null;
  audienceAddOnRequestStatuses?: AddOnRequestStatusFilter[] | null;
  audienceTestEmails?: string[] | string | null;
  useTestGroup?: boolean;
}): Promise<{
  count: number;
  sample: Array<{ id: string; email: string; name: string }>;
  missingEmails: string[];
  testGroupActive: boolean;
}> {
  const { matches, missingEmails } = await resolveCampaignAudience(params);
  const testGroupActive = Boolean(params.useTestGroup);
  const listed = testGroupActive ? matches : matches.slice(0, 8);

  return {
    count: matches.length,
    sample: listed.map((r) => ({
      id: r.id,
      email: r.email,
      name: [r.firstName, r.lastName].filter(Boolean).join(' ') || r.email,
    })),
    missingEmails,
    testGroupActive,
  };
}

type CampaignListPage = {
  apsEmailCampaignsByEventIdAndCreatedAt?: {
    items?: Array<EmailCampaign | null> | null;
    nextToken?: string | null;
  } | null;
};

type SendListPage = {
  apsEmailSendsByCampaignIdAndCreatedAt?: {
    items?: Array<EmailSend | null> | null;
    nextToken?: string | null;
  } | null;
};

type DueCampaignListPage = {
  listApsEmailCampaigns?: {
    items?: Array<EmailCampaign | null> | null;
    nextToken?: string | null;
  } | null;
};

export async function listCampaignsByEventId(
  eventId: string,
): Promise<EmailCampaign[]> {
  const rows: EmailCampaign[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data: CampaignListPage = await requestGraphQL<CampaignListPage>(
      LIST_CAMPAIGNS_BY_EVENT,
      {
        eventId,
        sortDirection: 'DESC',
        limit: 200,
        nextToken: nextToken || undefined,
      },
    );

    const page = data.apsEmailCampaignsByEventIdAndCreatedAt;
    rows.push(...((page?.items ?? []).filter(Boolean) as EmailCampaign[]));
    nextToken = page?.nextToken;
  } while (nextToken);

  return rows;
}

export async function listSendsByCampaignId(
  campaignId: string,
): Promise<EmailSend[]> {
  const rows: EmailSend[] = [];
  let nextToken: string | null | undefined = null;
  let query = LIST_SENDS_BY_CAMPAIGN_WITH_TRACKING;

  do {
    try {
      const data: SendListPage = await requestGraphQL<SendListPage>(query, {
        campaignId,
        sortDirection: 'DESC',
        limit: 200,
        nextToken: nextToken || undefined,
      });

      const page = data.apsEmailSendsByCampaignIdAndCreatedAt;
      rows.push(...((page?.items ?? []).filter(Boolean) as EmailSend[]));
      nextToken = page?.nextToken;
    } catch (error) {
      const message = error instanceof Error ? error.message : '';
      if (query === LIST_SENDS_BY_CAMPAIGN_WITH_TRACKING) {
        query = LIST_SENDS_BY_CAMPAIGN;
        nextToken = null;
        rows.length = 0;
        continue;
      }
      throw error instanceof Error ? error : new Error(message);
    }
  } while (nextToken);

  return rows;
}

export async function createEmailCampaign(input: {
  eventId: string;
  name: string;
  templateKey: string;
  subject?: string;
  audienceStatuses?: RegistrantStatusFilter[] | null;
  audienceTypes?: RegistrantTypeFilter[] | null;
  audienceAddOnIds?: string[] | null;
  audienceAddOnRequestStatuses?: AddOnRequestStatusFilter[] | null;
  audienceTestEmails?: string[] | string | null;
  useTestGroup?: boolean;
}): Promise<EmailCampaign> {
  const template = assertEmailTemplate(input.templateKey);
  const eventYear = await getEventYear(input.eventId);
  const subject =
    input.subject?.trim() ||
    template.defaultSubject({ eventYear });

  const data = await requestGraphQL<{
    createApsEmailCampaign?: EmailCampaign | null;
  }>(CREATE_CAMPAIGN, {
    input: {
      eventId: input.eventId,
      name: input.name.trim(),
      templateKey: encodeCampaignTemplateKey(
        input.templateKey,
        input.audienceAddOnIds,
        input.audienceAddOnRequestStatuses,
        input.audienceTestEmails,
        input.useTestGroup,
      ),
      subject,
      audienceStatuses: normalizeStatuses(input.audienceStatuses),
      audienceTypes: input.audienceTypes?.length
        ? input.audienceTypes
        : null,
      status: 'DRAFT',
      totalRecipients: 0,
      sentCount: 0,
      failedCount: 0,
    },
  });

  const campaign = data.createApsEmailCampaign;
  if (!campaign) throw new Error('Failed to create campaign');
  return campaign;
}

export async function updateEmailCampaign(input: {
  id: string;
  name?: string;
  templateKey?: string;
  subject?: string;
  audienceStatuses?: RegistrantStatusFilter[] | null;
  audienceTypes?: RegistrantTypeFilter[] | null;
}): Promise<EmailCampaign> {
  const existing = await getCampaignOrThrow(input.id);
  if (existing.status !== 'DRAFT' && existing.status !== 'CANCELLED') {
    throw new Error('Only draft or cancelled campaigns can be edited');
  }

  if (input.templateKey) assertEmailTemplate(input.templateKey);

  const data = await requestGraphQL<{
    updateApsEmailCampaign?: EmailCampaign | null;
  }>(UPDATE_CAMPAIGN, {
    input: {
      id: input.id,
      ...(input.name != null ? { name: input.name.trim() } : {}),
      ...(input.templateKey != null ? { templateKey: input.templateKey } : {}),
      ...(input.subject != null ? { subject: input.subject.trim() } : {}),
      ...(input.audienceStatuses !== undefined
        ? { audienceStatuses: normalizeStatuses(input.audienceStatuses) }
        : {}),
      ...(input.audienceTypes !== undefined
        ? {
            audienceTypes: input.audienceTypes?.length
              ? input.audienceTypes
              : null,
          }
        : {}),
      status: 'DRAFT',
      scheduledAt: null,
    },
  });

  const campaign = data.updateApsEmailCampaign;
  if (!campaign) throw new Error('Failed to update campaign');
  return campaign;
}

async function getCampaignOrThrow(id: string): Promise<EmailCampaign> {
  const data = await requestGraphQL<{
    getApsEmailCampaign?: EmailCampaign | null;
  }>(GET_CAMPAIGN, { id });
  const campaign = data.getApsEmailCampaign;
  if (!campaign) throw new Error('Campaign not found');
  return campaign;
}

export async function scheduleEmailCampaign(params: {
  campaignId: string;
  scheduledAt: string;
}): Promise<{ campaign: EmailCampaign; message: string; scheduleOk: boolean }> {
  const campaign = await getCampaignOrThrow(params.campaignId);
  if (
    campaign.status !== 'DRAFT' &&
    campaign.status !== 'CANCELLED' &&
    campaign.status !== 'SCHEDULED'
  ) {
    throw new Error('Campaign cannot be scheduled in its current status');
  }

  const scheduledDate = new Date(params.scheduledAt);
  if (Number.isNaN(scheduledDate.getTime())) {
    throw new Error('Invalid schedule date');
  }
  if (scheduledDate.getTime() <= Date.now()) {
    throw new Error('Schedule time must be in the future');
  }

  const scheduledAt = scheduledDate.toISOString();

  const data = await requestGraphQL<{
    updateApsEmailCampaign?: EmailCampaign | null;
  }>(UPDATE_CAMPAIGN, {
    input: {
      id: campaign.id,
      status: 'SCHEDULED',
      scheduledAt,
    },
  });

  const updated = data.updateApsEmailCampaign;
  if (!updated) throw new Error('Failed to schedule campaign');

  let scheduleResult: {
    ok: boolean;
    configured: boolean;
    message: string;
  };
  try {
    scheduleResult = await upsertEmailCampaignSchedule({
      campaignId: campaign.id,
      scheduledAt,
    });
  } catch (error) {
    scheduleResult = {
      ok: false,
      configured: true,
      message:
        error instanceof Error
          ? `Campaign saved as scheduled, but EventBridge did not create the fire time. ${error.message}`
          : 'Campaign saved as scheduled, but EventBridge did not create the fire time.',
    };
  }

  // If schedule time is effectively "now" per scheduler helper, send immediately.
  if (
    scheduleResult.ok &&
    scheduleResult.configured &&
    scheduleResult.message.includes('past')
  ) {
    const sent = await runEmailCampaign(campaign.id);
    return {
      campaign: sent.campaign,
      message: 'Schedule was due immediately; campaign send started.',
      scheduleOk: true,
    };
  }

  return {
    campaign: updated,
    message: scheduleResult.message || 'It will send at the scheduled time.',
    scheduleOk: true,
  };
}

export async function cancelEmailCampaignSchedule(params: {
  campaignId: string;
}): Promise<EmailCampaign> {
  const campaign = await getCampaignOrThrow(params.campaignId);
  if (campaign.status !== 'SCHEDULED') {
    throw new Error('Only scheduled campaigns can be cancelled');
  }

  await deleteEmailCampaignSchedule(campaign.id);

  const data = await requestGraphQL<{
    updateApsEmailCampaign?: EmailCampaign | null;
  }>(UPDATE_CAMPAIGN, {
    input: {
      id: campaign.id,
      status: 'CANCELLED',
      scheduledAt: null,
    },
  });

  const updated = data.updateApsEmailCampaign;
  if (!updated) throw new Error('Failed to cancel campaign');
  return updated;
}

export async function deleteEmailCampaign(params: {
  campaignId: string;
}): Promise<void> {
  const campaign = await getCampaignOrThrow(params.campaignId);
  if (campaign.status === 'SENDING' || campaign.status === 'SENT') {
    throw new Error('Sent or in-progress campaigns cannot be deleted.');
  }

  try {
    await deleteEmailCampaignSchedule(campaign.id);
  } catch {
    // ignore missing EventBridge schedule
  }

  const sends = await listSendsByCampaignId(campaign.id);
  for (const send of sends) {
    try {
      await requestGraphQL(DELETE_SEND, { input: { id: send.id } });
    } catch {
      // keep going so the campaign can still be removed
    }
  }

  await requestGraphQL(DELETE_CAMPAIGN, { input: { id: campaign.id } });
}

export async function sendEmailCampaignNow(params: {
  campaignId: string;
}): Promise<{
  campaign: EmailCampaign;
  sentCount: number;
  failedCount: number;
}> {
  return runEmailCampaign(params.campaignId);
}

/**
 * Core send pipeline used by "Send now" and the scheduled API route.
 */
export async function runEmailCampaign(campaignId: string): Promise<{
  campaign: EmailCampaign;
  sentCount: number;
  failedCount: number;
}> {
  const campaign = await getCampaignOrThrow(campaignId);

  if (campaign.status === 'SENDING') {
    throw new Error('Campaign is already sending');
  }
  if (campaign.status === 'SENT') {
    throw new Error('Campaign has already been sent');
  }

  const decoded = decodeCampaignTemplateKey(campaign.templateKey);
  const template = assertEmailTemplate(decoded.templateKey);
  const eventYear = await getEventYear(campaign.eventId);
  const { matches: audience } = await resolveCampaignAudience({
    eventId: campaign.eventId,
    audienceStatuses: campaign.audienceStatuses,
    audienceTypes: campaign.audienceTypes,
    audienceAddOnIds: decoded.audienceAddOnIds,
    audienceAddOnRequestStatuses: decoded.audienceAddOnRequestStatuses,
    audienceTestEmails: decoded.audienceTestEmails,
    useTestGroup: decoded.useTestGroup,
  });

  if (audience.length === 0) {
    throw new Error('No recipients match the campaign audience filters');
  }

  const startedAt = new Date().toISOString();
  await requestGraphQL(UPDATE_CAMPAIGN, {
    input: {
      id: campaign.id,
      status: 'SENDING',
      startedAt,
      totalRecipients: audience.length,
      sentCount: 0,
      failedCount: 0,
      scheduledAt: campaign.scheduledAt ?? null,
    },
  });

  // Best-effort: remove any one-shot schedule once send starts.
  try {
    await deleteEmailCampaignSchedule(campaign.id);
  } catch {
    // ignore
  }

  const sendRecords = await mapWithConcurrency(
    audience,
    SEND_CONCURRENCY,
    async (registrant) => {
      const created = await requestGraphQL<{
        createApsEmailSend?: EmailSend | null;
      }>(CREATE_SEND, {
        input: {
          campaignId: campaign.id,
          eventId: campaign.eventId,
          registrantId: registrant.id,
          email: registrant.email.trim(),
          status: 'PENDING',
        },
      });
      return {
        registrant,
        send: created.createApsEmailSend,
      };
    },
  );

  let sentCount = 0;
  let failedCount = 0;
  const waitForSesSlot = createSesRateLimiter(SES_MAX_PER_SECOND);

  await mapWithConcurrency(sendRecords, SEND_CONCURRENCY, async (record) => {
    if (!record.send) {
      failedCount += 1;
      return;
    }

    try {
      await waitForSesSlot();
      const recipient = await toTemplateRecipient(record.registrant, {
        includeTempPassword: Boolean(template.requiresTempPassword),
      });
      const html = applyEmailTracking(
        await template.renderHtml({
          recipient,
          eventYear,
          subject: campaign.subject,
        }),
        record.send.id,
      );
      const text = template.renderText?.({
        recipient,
        eventYear,
        subject: campaign.subject,
      });

      const result = await sendHtmlEmail({
        to: recipient.email,
        subject: campaign.subject,
        html,
        text,
      });

      await requestGraphQL(UPDATE_SEND, {
        input: {
          id: record.send.id,
          status: 'SENT',
          sesMessageId: result.messageId ?? null,
          sentAt: new Date().toISOString(),
          error: null,
        },
      });

      if (template.requiresTempPassword || template.key === 'app-access-email') {
        try {
          await markRegistrantAppEmailSent({
            registrantId: record.registrant.id,
          });
        } catch (markError) {
          console.error(
            'Failed to mark registrant app email sent:',
            markError,
          );
        }
      }

      sentCount += 1;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to send email';
      await requestGraphQL(UPDATE_SEND, {
        input: {
          id: record.send.id,
          status: 'FAILED',
          error: message.slice(0, 1000),
          sentAt: new Date().toISOString(),
        },
      });
      failedCount += 1;
    }
  });

  const finalStatus: EmailCampaignStatus =
    failedCount > 0 && sentCount === 0
      ? 'FAILED'
      : failedCount > 0
        ? 'SENT'
        : 'SENT';

  const data = await requestGraphQL<{
    updateApsEmailCampaign?: EmailCampaign | null;
  }>(UPDATE_CAMPAIGN, {
    input: {
      id: campaign.id,
      status: finalStatus,
      completedAt: new Date().toISOString(),
      sentCount,
      failedCount,
      totalRecipients: audience.length,
    },
  });

  const updated = data.updateApsEmailCampaign;
  if (!updated) throw new Error('Failed to finalize campaign');

  return { campaign: updated, sentCount, failedCount };
}

export async function processDueEmailCampaigns(): Promise<{
  processed: string[];
  errors: Array<{ campaignId: string; error: string }>;
}> {
  const nowIso = new Date().toISOString();
  const due: EmailCampaign[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data: DueCampaignListPage = await requestGraphQL<DueCampaignListPage>(
      LIST_SCHEDULED_CAMPAIGNS,
      {
        filter: {
          status: { eq: 'SCHEDULED' },
          scheduledAt: { le: nowIso },
        },
        limit: 50,
        nextToken: nextToken || undefined,
      },
    );

    const page = data.listApsEmailCampaigns;
    due.push(...((page?.items ?? []).filter(Boolean) as EmailCampaign[]));
    nextToken = page?.nextToken;
  } while (nextToken);

  const processed: string[] = [];
  const errors: Array<{ campaignId: string; error: string }> = [];

  for (const campaign of due) {
    try {
      await runEmailCampaign(campaign.id);
      processed.push(campaign.id);
    } catch (error) {
      errors.push({
        campaignId: campaign.id,
        error: error instanceof Error ? error.message : 'Send failed',
      });
    }
  }

  return { processed, errors };
}
