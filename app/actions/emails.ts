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

export type EmailCampaign = {
  id: string;
  eventId: string;
  name: string;
  templateKey: string;
  subject: string;
  audienceStatuses?: RegistrantStatusFilter[] | null;
  audienceTypes?: RegistrantTypeFilter[] | null;
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

const UPDATE_CAMPAIGN = /* GraphQL */ `
  mutation UpdateApsEmailCampaign($input: UpdateApsEmailCampaignInput!) {
    updateApsEmailCampaign(input: $input) {
      ${CAMPAIGN_FIELDS}
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

const SEND_CONCURRENCY = 5;

function normalizeStatuses(
  statuses?: RegistrantStatusFilter[] | null,
): RegistrantStatusFilter[] {
  if (!statuses || statuses.length === 0) return ['APPROVED'];
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

export async function previewCampaignAudience(params: {
  eventId: string;
  audienceStatuses?: RegistrantStatusFilter[] | null;
  audienceTypes?: RegistrantTypeFilter[] | null;
}): Promise<{ count: number; sample: Array<{ id: string; email: string; name: string }> }> {
  const all = await fetchRegistrantsByApsId(params.eventId);
  const filtered = filterAudience(
    all,
    params.audienceStatuses,
    params.audienceTypes,
  );

  return {
    count: filtered.length,
    sample: filtered.slice(0, 8).map((r) => ({
      id: r.id,
      email: r.email,
      name: [r.firstName, r.lastName].filter(Boolean).join(' ') || r.email,
    })),
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

  do {
    const data: SendListPage = await requestGraphQL<SendListPage>(
      LIST_SENDS_BY_CAMPAIGN,
      {
        campaignId,
        sortDirection: 'DESC',
        limit: 200,
        nextToken: nextToken || undefined,
      },
    );

    const page = data.apsEmailSendsByCampaignIdAndCreatedAt;
    rows.push(...((page?.items ?? []).filter(Boolean) as EmailSend[]));
    nextToken = page?.nextToken;
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
      templateKey: input.templateKey,
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
}): Promise<{ campaign: EmailCampaign; message: string }> {
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

  const scheduleResult = await upsertEmailCampaignSchedule({
    campaignId: campaign.id,
    scheduledAt,
  });

  // If schedule time is effectively "now" per scheduler helper, send immediately.
  if (
    scheduleResult.configured &&
    scheduleResult.message.includes('past')
  ) {
    const sent = await runEmailCampaign(campaign.id);
    return {
      campaign: sent.campaign,
      message: 'Schedule was due immediately; campaign send started.',
    };
  }

  return {
    campaign: updated,
    message: scheduleResult.message,
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

  const template = assertEmailTemplate(campaign.templateKey);
  const eventYear = await getEventYear(campaign.eventId);
  const all = await fetchRegistrantsByApsId(campaign.eventId);
  const audience = filterAudience(
    all,
    campaign.audienceStatuses,
    campaign.audienceTypes,
  );

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

  await mapWithConcurrency(sendRecords, SEND_CONCURRENCY, async (record) => {
    if (!record.send) {
      failedCount += 1;
      return;
    }

    try {
      const recipient = await toTemplateRecipient(record.registrant, {
        includeTempPassword: Boolean(template.requiresTempPassword),
      });
      const html = await template.renderHtml({
        recipient,
        eventYear,
        subject: campaign.subject,
      });
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
