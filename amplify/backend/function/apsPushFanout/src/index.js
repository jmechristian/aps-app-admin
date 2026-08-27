/* Amplify Params - DO NOT EDIT
	API_AUTOPACKSUMMITAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_AUTOPACKSUMMITAPP_GRAPHQLAPIIDOUTPUT
	API_AUTOPACKSUMMITAPP_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT *//**
 * DynamoDB Stream -> Expo push fanout (DM + contact requests).
 *
 * Amplify’s generated template uses `Handler: "index.handler"`, so this file
 * MUST export `exports.handler = ...` (CommonJS).
 *
 * @type {import('@types/aws-lambda').DynamoDBStreamHandler}
 */
const crypto = require('crypto');
const QRCode = require('qrcode');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const {
  SchedulerClient,
  CreateScheduleCommand,
  UpdateScheduleCommand,
  DeleteScheduleCommand,
  GetScheduleCommand,
} = require('@aws-sdk/client-scheduler');
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
} = require('@aws-sdk/lib-dynamodb');

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const s3 = new S3Client({});
const scheduler = new SchedulerClient({});

const EXPO_PUSH_URL =
  process.env.EXPO_PUSH_URL || 'https://exp.host/--/api/v2/push/send';
const EXPO_ACCESS_TOKEN = process.env.EXPO_ACCESS_TOKEN;

const PUSH_TOKEN_TABLE_NAME = process.env.PUSH_TOKEN_TABLE_NAME;
const PUSH_TOKEN_GSI_NAME = process.env.PUSH_TOKEN_GSI_NAME;
const APP_USER_TABLE_NAME = process.env.APP_USER_TABLE_NAME;
const APP_USER_CONTACT_TABLE_NAME = process.env.APP_USER_CONTACT_TABLE_NAME;
const APP_USER_PROFILE_TABLE_NAME = process.env.APP_USER_PROFILE_TABLE_NAME;
const APP_USER_PROFILE_GSI_NAME = process.env.APP_USER_PROFILE_GSI_NAME || 'byUser';
const CONTACT_REQUEST_TABLE_NAME = process.env.CONTACT_REQUEST_TABLE_NAME;
const DM_THREAD_TABLE_NAME = process.env.DM_THREAD_TABLE_NAME;
const DM_MESSAGE_TABLE_NAME = process.env.DM_MESSAGE_TABLE_NAME;
const DM_PARTICIPANT_STATE_TABLE_NAME = process.env.DM_PARTICIPANT_STATE_TABLE_NAME;
const EXHIBITOR_PROFILE_TABLE_NAME = process.env.EXHIBITOR_PROFILE_TABLE_NAME;
const ANNOUNCEMENT_TABLE_NAME = process.env.ANNOUNCEMENT_TABLE_NAME;
const ANNOUNCEMENT_SCHEDULED_GSI_NAME =
  process.env.ANNOUNCEMENT_SCHEDULED_GSI_NAME || 'byEventScheduled';
const APS_EVENT_ID = process.env.APS_EVENT_ID || '';
const ANNOUNCEMENT_SCHEDULER_GROUP = process.env.ANNOUNCEMENT_SCHEDULER_GROUP || '';
const ANNOUNCEMENT_SCHEDULER_ROLE_ARN = process.env.ANNOUNCEMENT_SCHEDULER_ROLE_ARN || '';

function getLambdaFunctionArn() {
  const region = process.env.AWS_REGION || process.env.REGION || 'us-east-1';
  const accountId = process.env.AWS_ACCOUNT_ID || '';
  const functionName = process.env.AWS_LAMBDA_FUNCTION_NAME || '';
  if (!accountId || !functionName) return '';
  return `arn:aws:lambda:${region}:${accountId}:function:${functionName}`;
}

const APPSYNC_ENDPOINT = process.env.API_AUTOPACKSUMMITAPP_GRAPHQLAPIENDPOINTOUTPUT;
const APPSYNC_API_KEY = process.env.API_AUTOPACKSUMMITAPP_GRAPHQLAPIKEYOUTPUT;
const THINKIFIC_ENROLLMENTS_URL =
  process.env.THINKIFIC_ENROLLMENTS_URL ||
  'https://api.thinkific.com/api/public/v1/enrollments';
const THINKIFIC_API_KEY = process.env.THINKIFIC_API_KEY || '';
const THINKIFIC_SUBDOMAIN = process.env.THINKIFIC_SUBDOMAIN || '';
const APC_TOTAL_COURSES = Number(process.env.APC_TOTAL_COURSES || '10') || 10;
function resolveExhibitorQrBucket() {
  const candidates = [
    'autopacksummitapp94b14feadba64f23aff0ed8deae77b99bc6-dev',
    process.env.STORAGE_APSAPP_BUCKETNAME,
    process.env.EXHIBITOR_QR_BUCKET,
    process.env.S3_BUCKET,
    'apsapp',
  ]
    .map((value) => String(value || '').trim())
    .filter(Boolean)
    .filter(
      (value) =>
        value !== 'storageapsappBucketName' &&
        value !== 'STORAGE_APSAPP_BUCKETNAME'
    );
  return candidates[0] || 'apsapp';
}
const EXHIBITOR_QR_BUCKET = resolveExhibitorQrBucket();
const EXHIBITOR_QR_SECRET =
  process.env.EXHIBITOR_QR_SECRET ||
  process.env.API_AUTOPACKSUMMITAPP_GRAPHQLAPIIDOUTPUT ||
  'aps-qr-secret';
const EXHIBITOR_QR_KEY_PREFIX = 'qrcodes/exhibitor-passport';

const APC_PRIORITY_PROGRESS_COURSE_ID = 699298;
const APC_COMPLETION_COURSE_IDS = new Set([591574]);
const APC_COMPLETION_COURSE_NAME_PATTERNS = ['APC FINAL ASSESSMENT'];

function safeSlice(str, n) {
  return String(str ?? '').slice(0, n);
}

function normalizePercentageToPercent(value) {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) return 0;
  return numeric <= 1 ? numeric * 100 : numeric;
}

function clampProgress(value) {
  return Math.min(100, Math.max(0, normalizePercentageToPercent(value)));
}

function uniqueStrings(values) {
  if (!Array.isArray(values)) return [];
  return Array.from(new Set(values.filter((x) => typeof x === 'string' && x.trim())));
}

function sortPair(a, b) {
  return a < b ? [a, b] : [b, a];
}

function requestKeyFor(eventId, a, b) {
  return `e:${eventId}|u:${a}|u:${b}`;
}

function dmKeyFor(a, b) {
  return `u:${a}|u:${b}`;
}

function dmThreadIdFor(eventId, a, b) {
  return `e:${eventId}|${dmKeyFor(a, b)}`;
}

function dmParticipantStateKey(eventId, threadId, userId) {
  return `e:${eventId}|t:${threadId}|u:${userId}`;
}

function getIdentitySub(event) {
  return (
    event?.identity?.sub ||
    event?.identity?.claims?.sub ||
    event?.identity?.username ||
    null
  );
}

function normalizeGroups(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item || '').trim().toLowerCase())
      .filter(Boolean);
  }
  if (typeof value === 'string' && value.trim()) {
    return [value.trim().toLowerCase()];
  }
  return [];
}

function isAdminIdentity(event) {
  const claims = event?.identity?.claims || {};
  const groups = normalizeGroups(claims['cognito:groups']);
  return groups.includes('admin');
}

function normalizeForModeration(text) {
  const leetMap = {
    '@': 'a',
    '0': 'o',
    '1': 'i',
    '3': 'e',
    '4': 'a',
    '5': 's',
    '7': 't',
    '$': 's',
    '!': 'i',
  };
  const replaced = String(text || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .split('')
    .map((ch) => leetMap[ch] || ch)
    .join('')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Collapse very long repeated characters to reduce simple obfuscation.
  return replaced.replace(/(.)\1{2,}/g, '$1$1');
}

function includesTerm(normalized, term) {
  if (!term) return false;
  const t = normalizeForModeration(term);
  if (!t) return false;
  if (t.includes(' ')) return normalized.includes(t);
  const regex = new RegExp(`(^|\\s)${t}(\\s|$)`, 'i');
  return regex.test(normalized);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const PROFANITY_TERMS = [
  'fuck',
  'fucking',
  'shit',
  'bitch',
  'asshole',
  'motherfucker',
  'dick',
  'cunt',
  'bastard',
  'piss off',
];

const THREAT_TERMS = [
  'kill yourself',
  'i will kill you',
  'i am going to kill you',
  'you should die',
  'i will hurt you',
  'kys',
];

const HATE_TERMS = [
  'go back to your country',
  'you people are disgusting',
];

function scoreModeration(rawText) {
  const raw = String(rawText || '');
  const normalized = normalizeForModeration(raw);
  if (!normalized) {
    return {
      normalized,
      scores: {
        profanity: 0,
        threat: 0,
        identity_hate: 0,
        toxicity: 0,
      },
      decision: 'ALLOW',
      reasons: [],
      maskedText: raw,
    };
  }

  const profanityHits = PROFANITY_TERMS.filter((term) =>
    includesTerm(normalized, term)
  );
  const threatHits = THREAT_TERMS.filter((term) => includesTerm(normalized, term));
  const hateHits = HATE_TERMS.filter((term) => includesTerm(normalized, term));

  const letters = raw.replace(/[^a-z]/gi, '');
  const upperLetters = letters.replace(/[^A-Z]/g, '');
  const capsRatio = letters.length ? upperLetters.length / letters.length : 0;
  const exclamationBursts = (raw.match(/!{2,}/g) || []).length;
  const directInsult = /\b(you are|you're|ur)\b.{0,20}\b(stupid|idiot|moron|trash|loser)\b/i.test(
    raw
  );

  const profanity = Math.min(1, profanityHits.length * 0.35);
  const threat = Math.min(1, threatHits.length * 0.7);
  const identityHate = Math.min(1, hateHits.length * 0.7);
  let toxicity = Math.max(profanity * 0.65, threat * 0.9, identityHate * 0.9);
  if (capsRatio > 0.7 && raw.length >= 16) toxicity = Math.min(1, toxicity + 0.08);
  if (exclamationBursts >= 2) toxicity = Math.min(1, toxicity + 0.06);
  if (directInsult) toxicity = Math.min(1, toxicity + 0.2);

  const reasons = [];
  if (profanityHits.length) reasons.push(`profanity:${profanityHits.join(',')}`);
  if (threatHits.length) reasons.push(`threat:${threatHits.join(',')}`);
  if (hateHits.length) reasons.push(`hate:${hateHits.join(',')}`);
  if (directInsult) reasons.push('direct-insult');

  let decision = 'ALLOW';
  if (threat >= 0.6 || identityHate >= 0.55) {
    decision = 'BLOCK';
  } else if (toxicity >= 0.78) {
    decision = 'BLOCK';
  } else if (profanity >= 0.7 && toxicity < 0.6) {
    decision = 'MASK';
  }

  let maskedText = raw;
  if (decision === 'MASK') {
    for (const term of profanityHits) {
      const escaped = escapeRegExp(term);
      const rx = new RegExp(escaped, 'gi');
      maskedText = maskedText.replace(rx, '***');
    }
  }

  return {
    normalized,
    scores: {
      profanity: Number(profanity.toFixed(3)),
      threat: Number(threat.toFixed(3)),
      identity_hate: Number(identityHate.toFixed(3)),
      toxicity: Number(toxicity.toFixed(3)),
    },
    decision,
    reasons,
    maskedText,
  };
}

function requireEnv(name) {
  if (!process.env[name]) throw new Error(`Missing required env var: ${name}`);
  return process.env[name];
}

function unmarshallNewImage(record) {
  // DynamoDB Streams "NewImage" for @model tables is typically already JSON-ish when using Lambda triggers
  // but can also be AttributeValue maps depending on trigger wiring.
  return record?.dynamodb?.NewImage || null;
}

function unmarshallOldImage(record) {
  return record?.dynamodb?.OldImage || null;
}

function getString(attr) {
  if (attr == null) return null;
  if (typeof attr === 'string') return attr;
  if (attr.S != null) return attr.S;
  return null;
}

function getStringList(attr) {
  if (attr == null) return [];
  if (Array.isArray(attr)) return attr.filter((x) => typeof x === 'string');
  if (attr.L) return attr.L.map((x) => getString(x)).filter(Boolean);
  return [];
}

function parseIsoMs(value) {
  if (!value) return null;
  const ms = Date.parse(String(value));
  return Number.isFinite(ms) ? ms : null;
}

function isLegacyAnnouncement(img) {
  return !getString(img?.scheduledAt) && !getString(img?.publishedAt);
}

function shouldSendAnnouncementPush(img, oldImg, eventName) {
  const body = getString(img?.body);
  const eventId = getString(img?.eventId);
  const threadId = getString(img?.threadId);
  if (!body || !eventId || threadId) return false;

  const publishedAt = getString(img?.publishedAt);
  const scheduledAt = getString(img?.scheduledAt);
  const nowMs = Date.now();
  const scheduledMs = parseIsoMs(scheduledAt);

  if (eventName === 'INSERT') {
    if (isLegacyAnnouncement(img)) return true;
    if (!publishedAt) return false;
    if (scheduledMs != null && scheduledMs > nowMs) return false;
    return true;
  }

  if (eventName === 'MODIFY') {
    const oldPublishedAt = getString(oldImg?.publishedAt);
    if (oldPublishedAt || !publishedAt) return false;
    if (scheduledMs != null && scheduledMs > nowMs) return false;
    return true;
  }

  return false;
}

function buildAnnouncementPushMessages(announcement, tokens) {
  const announcementId = getString(announcement?.id);
  const title = getString(announcement?.title) || 'New announcement';
  const body = getString(announcement?.body) || '';
  const deepLink = getString(announcement?.deepLink);
  const defaultDeepLink = 'app://notifications';

  return tokens.map((token) => ({
    to: token,
    title,
    body: safeSlice(body, 180),
    badge: 1,
    data: {
      type: 'announcement',
      announcementId: announcementId || null,
      deepLink: deepLink || defaultDeepLink,
    },
  }));
}

const APS_REGISTRANTS_BY_EVENT = /* GraphQL */ `
  query ApsRegistrantsByApsID($apsID: ID!, $limit: Int, $nextToken: String) {
    apsRegistrantsByApsID(apsID: $apsID, limit: $limit, nextToken: $nextToken) {
      items {
        attendeeType
        appUserId
      }
      nextToken
    }
  }
`;

async function listAppUserIdsForEventTypes(eventId, audienceTypes) {
  const typeSet = new Set(
    (audienceTypes || []).map((type) => String(type || '').trim().toUpperCase()).filter(Boolean)
  );
  if (!eventId || !typeSet.size) return [];

  const userIds = [];
  let nextToken = null;
  do {
    const data = await appsyncRequest(APS_REGISTRANTS_BY_EVENT, {
      apsID: eventId,
      limit: 1000,
      nextToken: nextToken || undefined,
    });
    const page = data?.apsRegistrantsByApsID;
    for (const item of page?.items || []) {
      const type = String(item?.attendeeType || '').trim().toUpperCase();
      const userId = item?.appUserId;
      if (!userId || !typeSet.has(type)) continue;
      userIds.push(String(userId));
    }
    nextToken = page?.nextToken || null;
  } while (nextToken);

  return Array.from(new Set(userIds));
}

async function listTokensForUserIds(userIds) {
  const tokens = [];
  const concurrency = 8;
  for (let i = 0; i < userIds.length; i += concurrency) {
    const chunk = userIds.slice(i, i + concurrency);
    const nested = await Promise.all(chunk.map((userId) => listTokensByUser(userId)));
    for (const list of nested) tokens.push(...list);
  }
  return Array.from(new Set(tokens.filter(Boolean)));
}

async function listTokensForAnnouncement(announcement) {
  const audienceTypes = getStringList(announcement?.audienceTypes);
  if (!audienceTypes.length) {
    return listAllTokens();
  }

  const eventId = getString(announcement?.eventId);
  if (!eventId) {
    console.log('announcement audience skipped: missing eventId', {
      announcementId: getString(announcement?.id),
      audienceTypes,
    });
    return [];
  }

  try {
    const userIds = await listAppUserIdsForEventTypes(eventId, audienceTypes);
    const tokens = await listTokensForUserIds(userIds);
    console.log('announcement audience resolved', {
      announcementId: getString(announcement?.id),
      eventId,
      audienceTypes,
      userCount: userIds.length,
      tokenCount: tokens.length,
    });
    return tokens;
  } catch (error) {
    console.log('announcement audience resolve failed; skipping push', {
      announcementId: getString(announcement?.id),
      eventId,
      audienceTypes,
      error: error?.message || String(error),
    });
    return [];
  }
}

async function sendAnnouncementPush(announcement) {
  const tokens = await listTokensForAnnouncement(announcement);
  const messages = buildAnnouncementPushMessages(announcement, tokens);
  await sendExpoPush(messages);
  await recordAnnouncementSendStats(getString(announcement?.id), tokens.length);
  return messages.length;
}

async function recordAnnouncementSendStats(announcementId, sentCount) {
  if (!ANNOUNCEMENT_TABLE_NAME || !announcementId) return;
  try {
    await ddb.send(
      new UpdateCommand({
        TableName: ANNOUNCEMENT_TABLE_NAME,
        Key: { id: announcementId },
        UpdateExpression: 'SET sentCount = :sent, sentAt = :sentAt',
        ExpressionAttributeValues: {
          ':sent': Number(sentCount) || 0,
          ':sentAt': new Date().toISOString(),
        },
      })
    );
  } catch (error) {
    console.log('recordAnnouncementSendStats failed', {
      announcementId,
      sentCount,
      error: error?.message || String(error),
    });
  }
}

function announcementScheduleName(announcementId) {
  return `ann-${String(announcementId || '')
    .replace(/[^a-zA-Z0-9-_]/g, '')
    .slice(0, 56)}`;
}

function formatSchedulerAt(isoValue) {
  const ms = parseIsoMs(isoValue);
  if (ms == null) return null;
  return new Date(ms).toISOString().slice(0, 19);
}

function canUseAnnouncementScheduler() {
  return !!(
    ANNOUNCEMENT_SCHEDULER_GROUP &&
    ANNOUNCEMENT_SCHEDULER_ROLE_ARN &&
    getLambdaFunctionArn()
  );
}

async function deleteAnnouncementSchedule(announcementId) {
  if (!canUseAnnouncementScheduler()) return;
  try {
    await scheduler.send(
      new DeleteScheduleCommand({
        Name: announcementScheduleName(announcementId),
        GroupName: ANNOUNCEMENT_SCHEDULER_GROUP,
      })
    );
  } catch (error) {
    if (error?.name !== 'ResourceNotFoundException') {
      console.log('deleteAnnouncementSchedule failed', {
        announcementId,
        error: error?.message || String(error),
      });
    }
  }
}

async function publishAnnouncementById(announcementId) {
  if (!ANNOUNCEMENT_TABLE_NAME) {
    throw new Error('ANNOUNCEMENT_TABLE_NAME is not configured');
  }
  const nowIso = new Date().toISOString();
  await ddb.send(
    new UpdateCommand({
      TableName: ANNOUNCEMENT_TABLE_NAME,
      Key: { id: announcementId },
      UpdateExpression: 'SET publishedAt = :publishedAt, updatedAt = :updatedAt',
      ConditionExpression: 'attribute_not_exists(publishedAt)',
      ExpressionAttributeValues: {
        ':publishedAt': nowIso,
        ':updatedAt': nowIso,
      },
    })
  );
  return { published: true, announcementId };
}

async function upsertAnnouncementSchedule(announcementId, scheduledAt) {
  if (!canUseAnnouncementScheduler()) return;
  const atExpression = formatSchedulerAt(scheduledAt);
  const scheduledMs = parseIsoMs(scheduledAt);
  if (!atExpression || scheduledMs == null) return;

  if (scheduledMs <= Date.now()) {
    try {
      await publishAnnouncementById(announcementId);
    } catch (error) {
      if (error?.name !== 'ConditionalCheckFailedException') throw error;
    }
    await deleteAnnouncementSchedule(announcementId);
    return;
  }

  const scheduleName = announcementScheduleName(announcementId);
  const params = {
    Name: scheduleName,
    GroupName: ANNOUNCEMENT_SCHEDULER_GROUP,
    ScheduleExpression: `at(${atExpression})`,
    FlexibleTimeWindow: { Mode: 'OFF' },
    ActionAfterCompletion: 'DELETE',
    Target: {
      Arn: getLambdaFunctionArn(),
      RoleArn: ANNOUNCEMENT_SCHEDULER_ROLE_ARN,
      Input: JSON.stringify({
        action: 'publishAnnouncement',
        announcementId,
      }),
      RetryPolicy: {
        MaximumEventAgeInSeconds: 3600,
        MaximumRetryAttempts: 2,
      },
    },
  };

  try {
    await scheduler.send(
      new GetScheduleCommand({
        Name: scheduleName,
        GroupName: ANNOUNCEMENT_SCHEDULER_GROUP,
      })
    );
    await scheduler.send(new UpdateScheduleCommand(params));
  } catch (error) {
    if (error?.name === 'ResourceNotFoundException') {
      await scheduler.send(new CreateScheduleCommand(params));
    } else {
      throw error;
    }
  }
}

async function syncAnnouncementPublishSchedule({
  id,
  scheduledAt,
  publishedAt,
  eventName,
}) {
  if (!id) return;
  if (eventName === 'REMOVE' || publishedAt) {
    await deleteAnnouncementSchedule(id);
    return;
  }
  if (!scheduledAt) {
    await deleteAnnouncementSchedule(id);
    return;
  }
  await upsertAnnouncementSchedule(id, scheduledAt);
}

async function backfillUpcomingAnnouncementSchedules(eventId) {
  if (!canUseAnnouncementScheduler() || !ANNOUNCEMENT_TABLE_NAME) return;
  const nowIso = new Date().toISOString();
  let lastEvaluatedKey = undefined;

  do {
    const resp = await ddb.send(
      new QueryCommand({
        TableName: ANNOUNCEMENT_TABLE_NAME,
        IndexName: ANNOUNCEMENT_SCHEDULED_GSI_NAME,
        KeyConditionExpression: 'eventId = :eventId AND scheduledAt > :now',
        ExpressionAttributeValues: {
          ':eventId': eventId,
          ':now': nowIso,
        },
        ExclusiveStartKey: lastEvaluatedKey,
        Limit: 100,
      })
    );

    for (const item of resp.Items || []) {
      if (item?.id && item?.scheduledAt && !getString(item?.publishedAt)) {
        await upsertAnnouncementSchedule(String(item.id), String(item.scheduledAt));
      }
    }

    lastEvaluatedKey = resp.LastEvaluatedKey;
  } while (lastEvaluatedKey);
}

async function appsyncRequest(query, variables) {
  if (!APPSYNC_ENDPOINT || !APPSYNC_API_KEY) return null;
  const res = await fetch(APPSYNC_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': APPSYNC_API_KEY,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`AppSync error: ${res.status} ${res.statusText}`);
  }
  if (json.errors?.length) {
    throw new Error(`AppSync GraphQL errors: ${JSON.stringify(json.errors)}`);
  }
  return json.data || null;
}

const GET_PROFILE_ID_BY_USERID = /* GraphQL */ `
  query ApsAppUserProfilesByUserId($userId: ID!, $limit: Int) {
    apsAppUserProfilesByUserId(userId: $userId, limit: $limit) {
      items {
        id
      }
    }
  }
`;

const GET_PROFILE_LABEL_BY_USERID = /* GraphQL */ `
  query ApsAppUserProfilesByUserId($userId: ID!, $limit: Int) {
    apsAppUserProfilesByUserId(userId: $userId, limit: $limit) {
      items {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

const GET_CURRENT_APP_USER = /* GraphQL */ `
  query GetCurrentAppUser($id: ID!) {
    getApsAppUser(id: $id) {
      id
      registrant {
        id
        email
      }
      profile {
        id
        email
        thinkificId
        apcProgress
      }
    }
  }
`;

const UPDATE_PROFILE_PROGRESS = /* GraphQL */ `
  mutation UpdateProfileProgress($input: UpdateApsAppUserProfileInput!) {
    updateApsAppUserProfile(input: $input) {
      id
      thinkificId
      apcProgress
      updatedAt
    }
  }
`;

function isApcCompletionEnrollment(enrollment) {
  const normalizedCourseName = String(enrollment?.course_name || '').toUpperCase();
  const matchesCourseId = APC_COMPLETION_COURSE_IDS.has(Number(enrollment?.course_id));
  const matchesCourseNamePattern = APC_COMPLETION_COURSE_NAME_PATTERNS.some((pattern) =>
    normalizedCourseName.includes(pattern)
  );
  return matchesCourseId || matchesCourseNamePattern;
}

async function readErrorBody(res) {
  try {
    const text = await res.text();
    return text || res.statusText || 'Unknown error';
  } catch {
    return res.statusText || 'Unknown error';
  }
}

async function fetchThinkificWithAuth(url, mode = 'auto') {
  const primaryHeaders = {
    'X-Auth-API-Key': THINKIFIC_API_KEY,
    'X-Auth-Subdomain': THINKIFIC_SUBDOMAIN,
  };
  const fallbackHeaders = {
    Authorization: `Bearer ${THINKIFIC_API_KEY}`,
    'X-Auth-Subdomain': THINKIFIC_SUBDOMAIN,
  };

  if (mode === 'header') {
    const res = await fetch(url, { headers: primaryHeaders });
    return { res, mode: 'header' };
  }
  if (mode === 'bearer') {
    const res = await fetch(url, { headers: fallbackHeaders });
    return { res, mode: 'bearer' };
  }

  const firstTry = await fetch(url, { headers: primaryHeaders });
  if (firstTry.status !== 401) return { res: firstTry, mode: 'header' };

  const secondTry = await fetch(url, { headers: fallbackHeaders });
  return { res: secondTry, mode: 'bearer' };
}

async function getThinkificEnrollmentsByEmail(email) {
  if (!email) return [];
  if (!THINKIFIC_API_KEY || !THINKIFIC_SUBDOMAIN) {
    throw new Error('Thinkific credentials are missing in environment variables');
  }

  const buildUrl = (page) => {
    const url = new URL(THINKIFIC_ENROLLMENTS_URL);
    url.searchParams.set('page', String(page));
    url.searchParams.set('limit', '500');
    url.searchParams.set('query[email]', email);
    return url.toString();
  };

  const { res, mode } = await fetchThinkificWithAuth(buildUrl(1), 'auto');
  if (!res.ok) {
    const detail = await readErrorBody(res);
    throw new Error(`Thinkific enrollments fetch failed (${res.status}): ${detail}`);
  }

  const firstPageData = await res.json();
  const allItems = [...(firstPageData.items || [])];
  let nextPage = firstPageData?.meta?.pagination?.next_page || null;
  while (nextPage) {
    const { res: pageRes } = await fetchThinkificWithAuth(buildUrl(nextPage), mode);
    if (!pageRes.ok) {
      const detail = await readErrorBody(pageRes);
      throw new Error(`Thinkific enrollments page fetch failed (${pageRes.status}): ${detail}`);
    }
    const pageData = await pageRes.json();
    allItems.push(...(pageData.items || []));
    nextPage = pageData?.meta?.pagination?.next_page || null;
  }
  return allItems;
}

async function getThinkificRegistrantSummaryByEmail(email) {
  if (!email) return { thinkificUserId: null, apcProgramProgress: 0 };
  const enrollments = await getThinkificEnrollmentsByEmail(email);

  const priorityProgressEnrollment = enrollments.find(
    (enrollment) => Number(enrollment?.course_id) === APC_PRIORITY_PROGRESS_COURSE_ID
  );
  const priorityProgressPercent = priorityProgressEnrollment
    ? clampProgress(priorityProgressEnrollment.percentage_completed)
    : null;

  const apcEnrollments = enrollments.filter((enrollment) =>
    String(enrollment?.course_name || '')
      .toUpperCase()
      .includes('APC')
  );
  const completedFinalAssessment = apcEnrollments.some(
    (enrollment) =>
      isApcCompletionEnrollment(enrollment) &&
      clampProgress(enrollment.percentage_completed) >= 100
  );

  const bestProgressByApcCourse = new Map();
  for (const enrollment of apcEnrollments) {
    const courseId = Number(enrollment?.course_id);
    if (!Number.isFinite(courseId)) continue;
    const courseProgress = clampProgress(enrollment.percentage_completed);
    const existing = bestProgressByApcCourse.get(courseId) || 0;
    if (courseProgress > existing) bestProgressByApcCourse.set(courseId, courseProgress);
  }

  const apcProgressTotal = Array.from(bestProgressByApcCourse.values()).reduce(
    (sum, value) => sum + value,
    0
  );
  const apcProgramProgress = Math.min(100, apcProgressTotal / APC_TOTAL_COURSES);
  const thinkificUserId =
    enrollments.find((enrollment) => Number.isFinite(Number(enrollment?.user_id)))?.user_id ??
    null;

  return {
    thinkificUserId,
    apcProgramProgress:
      priorityProgressPercent != null
        ? priorityProgressPercent
        : completedFinalAssessment
          ? 100
          : apcProgramProgress,
  };
}

function mapThinkificEnrollment(item) {
  const percentageRaw = Number(item?.percentage_completed);
  const percentageCompleted = Number.isFinite(percentageRaw)
    ? clampProgress(percentageRaw)
    : null;
  return {
    enrollmentId: Number.isFinite(Number(item?.id)) ? Number(item.id) : null,
    courseId: Number.isFinite(Number(item?.course_id)) ? Number(item.course_id) : null,
    courseName: item?.course_name || null,
    percentageCompleted,
    completedAt: item?.completed_at || null,
    activatedAt: item?.activated_at || null,
  };
}

async function handleAdminGetThinkificByEmail(event) {
  if (!isAdminIdentity(event)) throw new Error('Unauthorized');
  const email = String(event?.arguments?.email || '')
    .trim()
    .toLowerCase();
  if (!email) throw new Error('email is required');

  const enrollments = await getThinkificEnrollmentsByEmail(email);
  const mapped = enrollments.map(mapThinkificEnrollment);
  const apcEnrollments = mapped.filter((item) =>
    String(item?.courseName || '')
      .toUpperCase()
      .includes('APC')
  );
  const otherEnrollments = mapped.filter((item) =>
    !String(item?.courseName || '')
      .toUpperCase()
      .includes('APC')
  );
  const thinkificUserId =
    enrollments.find((enrollment) => Number.isFinite(Number(enrollment?.user_id)))?.user_id ??
    null;

  return {
    email,
    thinkificUserId: thinkificUserId == null ? null : Number(thinkificUserId),
    apcEnrollments,
    otherEnrollments,
  };
}

async function handleSyncMyThinkificProgress(event) {
  const userSub = getIdentitySub(event);
  if (!userSub) throw new Error('Unauthorized');

  const now = new Date().toISOString();
  const inputEmail = String(event?.arguments?.input?.email || '')
    .trim()
    .toLowerCase();
  const appUserData = await appsyncRequest(GET_CURRENT_APP_USER, { id: userSub });
  const appUser = appUserData?.getApsAppUser;
  const profile = appUser?.profile;

  if (!profile?.id) {
    return {
      thinkificUserId: null,
      apcProgramProgress: 0,
      updated: false,
      syncedAt: now,
      message: 'Profile not found for current user',
    };
  }

  const registrantEmail = String(appUser?.registrant?.email || '')
    .trim()
    .toLowerCase();
  const profileEmail = String(profile?.email || '')
    .trim()
    .toLowerCase();
  const email = inputEmail || registrantEmail || profileEmail;
  if (!email) {
    return {
      thinkificUserId: profile.thinkificId ?? null,
      apcProgramProgress: profile.apcProgress ?? 0,
      updated: false,
      syncedAt: now,
      message: 'No email available to sync Thinkific progress',
    };
  }

  const summary = await getThinkificRegistrantSummaryByEmail(email);
  const nextThinkificId =
    summary.thinkificUserId == null ? null : Number(summary.thinkificUserId);
  const nextApcProgress = Number(summary.apcProgramProgress.toFixed(1));
  const currentThinkificId = profile.thinkificId ?? null;
  const currentApcProgress = profile.apcProgress ?? null;
  const changed =
    currentThinkificId !== nextThinkificId || currentApcProgress !== nextApcProgress;

  if (changed) {
    await appsyncRequest(UPDATE_PROFILE_PROGRESS, {
      input: {
        id: profile.id,
        thinkificId: nextThinkificId,
        apcProgress: nextApcProgress,
      },
    });
  }

  return {
    thinkificUserId: nextThinkificId,
    apcProgramProgress: nextApcProgress,
    updated: changed,
    syncedAt: now,
    message: changed ? 'Profile progress synced' : 'Profile progress unchanged',
  };
}

async function sendExpoPush(messages) {
  if (!messages.length) return;

  const authHeaders = { 'content-type': 'application/json' };
  if (EXPO_ACCESS_TOKEN) authHeaders.Authorization = `Bearer ${EXPO_ACCESS_TOKEN}`;
  const noAuthHeaders = { 'content-type': 'application/json' };

  // Expo recommends <= 100 messages per request.
  const chunkSize = 100;
  for (let i = 0; i < messages.length; i += chunkSize) {
    const chunk = messages.slice(i, i + chunkSize);
    let res = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(chunk),
    });

    // Account migration safety: if a stale Expo access token is configured, retry without auth.
    if ((res.status === 401 || res.status === 403) && EXPO_ACCESS_TOKEN) {
      const errText = await res.text().catch(() => '');
      console.log('expo-push auth failed, retrying without access token', {
        status: res.status,
        body: safeSlice(errText, 280),
      });
      res = await fetch(EXPO_PUSH_URL, {
        method: 'POST',
        headers: noAuthHeaders,
        body: JSON.stringify(chunk),
      });
    }

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(
        `Expo push failed: ${res.status} ${res.statusText} ${text}`
      );
    }
  }
}

async function listTokensByUser(userId) {
  requireEnv('PUSH_TOKEN_TABLE_NAME');
  requireEnv('PUSH_TOKEN_GSI_NAME');

  const out = await ddb.send(
    new QueryCommand({
      TableName: PUSH_TOKEN_TABLE_NAME,
      IndexName: PUSH_TOKEN_GSI_NAME,
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: { '#userId': 'userId' },
      ExpressionAttributeValues: { ':userId': userId },
      // Keep delivery path lean: most recent token records first.
      // Older tokens are commonly stale after reinstalls/device switches.
      ScanIndexForward: false,
      Limit: 5,
    })
  );

  return Array.from(new Set((out.Items || []).map((x) => x?.token).filter(Boolean)));
}

async function listAllTokens() {
  requireEnv('PUSH_TOKEN_TABLE_NAME');
  const out = await ddb.send(
    new ScanCommand({ TableName: PUSH_TOKEN_TABLE_NAME })
  );
  // Same physical device can register multiple user rows with the same Expo token.
  return Array.from(new Set((out.Items || []).map((x) => x?.token).filter(Boolean)));
}

async function getAppUserProfileId(userSub) {
  // 1) Try ApsAppUser.profileId (if table name is configured and id == userSub in this backend)
  if (APP_USER_TABLE_NAME) {
    try {
      const out = await ddb.send(
        new GetCommand({
          TableName: APP_USER_TABLE_NAME,
          Key: { id: userSub },
        })
      );
      const profileId = out?.Item?.profileId || null;
      if (profileId) return profileId;
    } catch {
      // ignore and fall back
    }
  }

  // 2) Try DynamoDB lookup on ApsAppUserProfile by GSI (userId -> profile id)
  if (APP_USER_PROFILE_TABLE_NAME) {
    try {
      const prof = await ddb.send(
        new QueryCommand({
          TableName: APP_USER_PROFILE_TABLE_NAME,
          IndexName: APP_USER_PROFILE_GSI_NAME,
          KeyConditionExpression: '#userId = :userId',
          ExpressionAttributeNames: { '#userId': 'userId' },
          ExpressionAttributeValues: { ':userId': userSub },
          Limit: 1,
        })
      );
      const item = (prof.Items || [])[0];
      if (item?.id) return item.id;
    } catch {
      // ignore and fall back
    }
  }

  // 3) Final fallback: AppSync query (public read models via API key)
  try {
    const data = await appsyncRequest(GET_PROFILE_ID_BY_USERID, { userId: userSub, limit: 1 });
    const item = data?.apsAppUserProfilesByUserId?.items?.find?.((x) => x?.id) || null;
    return item?.id || null;
  } catch {
    return null;
  }
}

async function getUserDisplayLabel(userSub) {
  try {
    const data = await appsyncRequest(GET_PROFILE_LABEL_BY_USERID, { userId: userSub, limit: 1 });
    const profile = data?.apsAppUserProfilesByUserId?.items?.find?.((x) => x?.id) || null;
    const first = String(profile?.firstName || '').trim();
    const last = String(profile?.lastName || '').trim();
    const fullName = `${first} ${last}`.trim();
    if (fullName) return fullName;
    if (profile?.email) return String(profile.email).trim();
  } catch {
    // best effort fallback below
  }
  return 'Community member';
}

async function putContact({ userSub, otherProfileId }) {
  requireEnv('APP_USER_CONTACT_TABLE_NAME');
  const id = `${userSub}:${otherProfileId}`;
  const now = new Date().toISOString();
  try {
    await ddb.send(
      new PutCommand({
      TableName: APP_USER_CONTACT_TABLE_NAME,
        // Include @model-managed timestamps so AppSync resolvers can return this row
        // without violating non-null GraphQL fields.
        Item: {
          id,
          userId: userSub,
          contactId: otherProfileId,
          favorite: false,
          createdAt: now,
          updatedAt: now,
        },
      ConditionExpression: 'attribute_not_exists(#id)',
      ExpressionAttributeNames: { '#id': 'id' },
    })
    );
  } catch (e) {
    // Ignore duplicates or best-effort failures; the UI can still function.
    if (e && e.name === 'ConditionalCheckFailedException') return;
    throw e;
  }
}

async function getThread(threadId) {
  requireEnv('DM_THREAD_TABLE_NAME');
  const out = await ddb.send(
    new GetCommand({
      TableName: DM_THREAD_TABLE_NAME,
      Key: { id: threadId },
    })
  );
  return out?.Item || null;
}

async function getContactRequest(eventId, userAId, userBId) {
  requireEnv('CONTACT_REQUEST_TABLE_NAME');
  const [a, b] = sortPair(userAId, userBId);
  const requestKey = requestKeyFor(eventId, a, b);

  const byId = await ddb.send(
    new GetCommand({
      TableName: CONTACT_REQUEST_TABLE_NAME,
      Key: { id: requestKey },
    })
  );
  if (byId?.Item?.id) return byId.Item;

  const byKey = await ddb.send(
    new QueryCommand({
      TableName: CONTACT_REQUEST_TABLE_NAME,
      IndexName: 'byRequestKey',
      KeyConditionExpression: '#requestKey = :requestKey',
      ExpressionAttributeNames: { '#requestKey': 'requestKey' },
      ExpressionAttributeValues: { ':requestKey': requestKey },
      Limit: 1,
    })
  );
  return (byKey.Items || [])[0] || null;
}

async function upsertParticipantState({
  eventId,
  threadId,
  userId,
  lastReadAt,
  unreadDelta,
  resetUnread,
  now,
}) {
  requireEnv('DM_PARTICIPANT_STATE_TABLE_NAME');
  const existing = await ddb.send(
    new QueryCommand({
      TableName: DM_PARTICIPANT_STATE_TABLE_NAME,
      IndexName: 'byThread',
      KeyConditionExpression: '#threadId = :threadId AND #userId = :userId',
      ExpressionAttributeNames: {
        '#threadId': 'threadId',
        '#userId': 'userId',
      },
      ExpressionAttributeValues: {
        ':threadId': threadId,
        ':userId': userId,
      },
      Limit: 1,
    })
  );
  const state = (existing.Items || [])[0] || null;

  if (state?.id) {
    if (resetUnread) {
      await ddb.send(
        new UpdateCommand({
          TableName: DM_PARTICIPANT_STATE_TABLE_NAME,
          Key: { id: state.id },
          UpdateExpression:
            'SET #lastReadAt = :lastReadAt, #unreadCount = :unreadCount, #lastMessageAt = :lastMessageAt, #updatedAt = :updatedAt',
          ExpressionAttributeNames: {
            '#lastReadAt': 'lastReadAt',
            '#unreadCount': 'unreadCount',
            '#lastMessageAt': 'lastMessageAt',
            '#updatedAt': 'updatedAt',
          },
          ExpressionAttributeValues: {
            ':lastReadAt': lastReadAt || now,
            ':unreadCount': 0,
            ':lastMessageAt': now,
            ':updatedAt': now,
          },
        })
      );
      return;
    }

    await ddb.send(
      new UpdateCommand({
        TableName: DM_PARTICIPANT_STATE_TABLE_NAME,
        Key: { id: state.id },
        UpdateExpression:
          'SET #lastMessageAt = :lastMessageAt, #updatedAt = :updatedAt, #unreadCount = if_not_exists(#unreadCount, :zero) + :delta',
        ExpressionAttributeNames: {
          '#lastMessageAt': 'lastMessageAt',
          '#updatedAt': 'updatedAt',
          '#unreadCount': 'unreadCount',
        },
        ExpressionAttributeValues: {
          ':lastMessageAt': now,
          ':updatedAt': now,
          ':zero': 0,
          ':delta': Math.max(0, unreadDelta || 0),
        },
      })
    );
    return;
  }

  await ddb.send(
    new PutCommand({
      TableName: DM_PARTICIPANT_STATE_TABLE_NAME,
      Item: {
        id: dmParticipantStateKey(eventId, threadId, userId),
        eventId,
        threadId,
        userId,
        lastReadAt: resetUnread ? lastReadAt || now : undefined,
        unreadCount: resetUnread ? 0 : Math.max(0, unreadDelta || 0),
        lastMessageAt: now,
        createdAt: now,
        updatedAt: now,
      },
    })
  );
}

async function handleSendModeratedDmMessage(event) {
  requireEnv('CONTACT_REQUEST_TABLE_NAME');
  requireEnv('DM_THREAD_TABLE_NAME');
  requireEnv('DM_MESSAGE_TABLE_NAME');
  requireEnv('DM_PARTICIPANT_STATE_TABLE_NAME');

  const input = event?.arguments?.input || {};
  const threadId = String(input.threadId || '').trim();
  const body = String(input.body || '').trim();
  const senderUserId = getIdentitySub(event);

  if (!senderUserId) throw new Error('Unauthorized');
  if (!threadId) throw new Error('threadId is required');
  if (!body) throw new Error('Message body is required');
  if (body.length > 2000) throw new Error('Message is too long');

  const thread = await getThread(threadId);
  if (!thread?.id || !thread?.eventId || !thread?.userAId || !thread?.userBId) {
    throw new Error('Conversation not found');
  }

  const owners = uniqueStrings(thread.owners);
  if (
    owners.length !== 2 ||
    !owners.includes(String(thread.userAId)) ||
    !owners.includes(String(thread.userBId))
  ) {
    throw new Error('Invalid conversation participants');
  }
  if (!owners.includes(senderUserId)) {
    throw new Error('You are not allowed in this conversation');
  }

  const recipientUserId =
    String(thread.userAId) === senderUserId
      ? String(thread.userBId)
      : String(thread.userAId);
  if (!recipientUserId || recipientUserId === senderUserId) {
    throw new Error('Invalid conversation pairing');
  }

  const request = await getContactRequest(
    String(thread.eventId),
    String(thread.userAId),
    String(thread.userBId)
  );
  if (!request?.id || request.status !== 'ACCEPTED') {
    throw new Error('Contact request must be accepted before messaging');
  }

  const moderation = scoreModeration(body);
  if (moderation.decision === 'BLOCK') {
    console.log('dm-moderation:block', {
      threadId: safeSlice(threadId, 64),
      senderTail: senderUserId.slice(-8),
      scores: moderation.scores,
      reasons: moderation.reasons,
    });
    throw new Error('Message violates community guidelines. Please edit and try again.');
  }

  const now = new Date().toISOString();
  const messageItem = {
    id: globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`,
    eventId: String(thread.eventId),
    threadId,
    senderUserId,
    owners: [String(thread.userAId), String(thread.userBId)],
    type: 'text',
    body: moderation.decision === 'MASK' ? moderation.maskedText : body,
    createdAt: now,
    updatedAt: now,
  };

  await ddb.send(
    new PutCommand({
      TableName: DM_MESSAGE_TABLE_NAME,
      Item: messageItem,
      ConditionExpression: 'attribute_not_exists(#id)',
      ExpressionAttributeNames: { '#id': 'id' },
    })
  );

  await ddb.send(
    new UpdateCommand({
      TableName: DM_THREAD_TABLE_NAME,
      Key: { id: threadId },
      UpdateExpression:
        'SET #lastMessageAt = :lastMessageAt, #lastMessagePreview = :lastMessagePreview, #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#lastMessageAt': 'lastMessageAt',
        '#lastMessagePreview': 'lastMessagePreview',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':lastMessageAt': now,
        ':lastMessagePreview': safeSlice(messageItem.body, 240),
        ':updatedAt': now,
      },
    })
  );

  await upsertParticipantState({
    eventId: String(thread.eventId),
    threadId,
    userId: senderUserId,
    lastReadAt: now,
    unreadDelta: 0,
    resetUnread: true,
    now,
  });
  await upsertParticipantState({
    eventId: String(thread.eventId),
    threadId,
    userId: recipientUserId,
    lastReadAt: null,
    unreadDelta: 1,
    resetUnread: false,
    now,
  });

  console.log('dm-moderation:allow', {
    threadId: safeSlice(threadId, 64),
    senderTail: senderUserId.slice(-8),
    decision: moderation.decision,
    scores: moderation.scores,
  });

  // Fast-path DM push (near-instant): send immediately from mutation path
  // instead of waiting for DynamoDB stream fanout latency.
  try {
    const recipientTokens = await listTokensByUser(recipientUserId);
    const dmPushMessages = recipientTokens.map((token) => ({
      to: token,
      title: 'New message',
      body: safeSlice(messageItem.body, 120) || 'You have a new message',
      priority: 'high',
      badge: 1,
      data: {
        type: 'dm',
        eventId: String(thread.eventId),
        threadId,
        senderUserId,
      },
    }));
    await sendExpoPush(dmPushMessages);
  } catch (pushError) {
    // Best-effort: never fail message send due to push issues.
    console.log('dm push send failed (non-blocking)', {
      threadId: safeSlice(threadId, 64),
      senderTail: senderUserId.slice(-8),
      recipientTail: recipientUserId.slice(-8),
      error: pushError?.message || String(pushError),
    });
  }

  return messageItem;
}

async function handleStreamFanout(event) {
  // event.Records = DynamoDB Stream records
  const records = event?.Records || [];
  console.log('apsPushFanout invoked', { recordCount: records.length });

  const expoMessages = [];

  for (const r of records) {
    const img = unmarshallNewImage(r);
    if (!img) continue;

    const eventId = getString(img.eventId);

    const threadId = getString(img.threadId);
    const announcementBody = getString(img.body);
    const announcementTitle = getString(img.title);
    const deepLink = getString(img.deepLink);

    // DM pushes are sent inline in handleSendModeratedDmMessage for lower latency.
    // Keep stream fanout for requests + announcements only.

    // Contact requests: have status + owners + requestedByUserId.
    // We push to the *other* owner(s) when the request is created in PENDING.
    const requestStatus = getString(img.status);
    const requestOwners = getStringList(img.owners);
    const requestedByUserId = getString(img.requestedByUserId);
    const requestId = getString(img.id);
    const introMessage = getString(img.introMessage);
    const introDeliveredAt = getString(img.introDeliveredAt);

    if (requestId && r.eventName === 'MODIFY' && requestStatus) {
      const old = unmarshallOldImage(r);
      const oldStatus = getString(old?.status);
      console.log('contactRequest MODIFY', {
        requestId: safeSlice(requestId, 64),
        status: requestStatus,
        oldStatus: oldStatus || null,
        ownersLen: requestOwners.length,
        hasRequestedBy: !!requestedByUserId,
        eventSourceARN: safeSlice(r?.eventSourceARN, 120),
      });
    }

    if (
      requestId &&
      eventId &&
      r.eventName === 'INSERT' &&
      requestStatus === 'PENDING' &&
      requestOwners.length >= 2 &&
      requestedByUserId
    ) {
      const recipients = requestOwners.filter(
        (x) => x && x !== requestedByUserId
      );
      const requesterLabel = await getUserDisplayLabel(requestedByUserId);
      for (const recipientUserId of recipients) {
        const tokens = await listTokensByUser(recipientUserId);
        for (const token of tokens) {
          expoMessages.push({
            to: token,
            title: 'New request',
            body: `You have a contact request and message from ${requesterLabel}`,
            badge: 1,
            data: { type: 'request', eventId, requestId },
          });
        }
      }
      continue;
    }

    // Contact request acceptance (MODIFY): PENDING -> ACCEPTED
    if (
      requestId &&
      r.eventName === 'MODIFY' &&
      requestOwners.length >= 2 &&
      requestedByUserId &&
      requestStatus === 'ACCEPTED'
    ) {
      const old = unmarshallOldImage(r);
      const oldStatus = getString(old?.status);
      // If OldImage isn't present (or oldStatus missing), proceed anyway (idempotent writes).
      if (oldStatus && oldStatus !== 'PENDING') continue;

      const userA = requestOwners[0];
      const userB = requestOwners[1];
      const acceptedBy = userA === requestedByUserId ? userB : userA;

      // Create mutual contacts (best-effort).
      try {
        const [profileA, profileB] = await Promise.all([
          getAppUserProfileId(userA),
          getAppUserProfileId(userB),
        ]);
        console.log('acceptance: resolved profiles', {
          requestId: safeSlice(requestId, 64),
          hasProfileA: !!profileA,
          hasProfileB: !!profileB,
        });
        if (profileA && profileB) {
          const results = await Promise.allSettled([
            putContact({ userSub: userA, otherProfileId: profileB }),
            putContact({ userSub: userB, otherProfileId: profileA }),
          ]);
          const errors = results
            .map((r) => (r.status === 'rejected' ? r.reason : null))
            .filter(Boolean)
            .map((e) => (e && e.message ? e.message : String(e)));

          console.log('acceptance: contacts attempted', {
            table: APP_USER_CONTACT_TABLE_NAME || null,
            userA: safeSlice(userA, 12),
            userB: safeSlice(userB, 12),
            profileA: safeSlice(profileA, 12),
            profileB: safeSlice(profileB, 12),
            okCount: results.filter((r) => r.status === 'fulfilled').length,
            errCount: errors.length,
            errors: errors.slice(0, 3),
          });
        } else {
          console.log('acceptance: missing profile ids', {
            userA: userA?.slice?.(-6),
            userB: userB?.slice?.(-6),
            hasProfileA: !!profileA,
            hasProfileB: !!profileB,
            APP_USER_TABLE_NAME: APP_USER_TABLE_NAME || null,
            APP_USER_PROFILE_TABLE_NAME: APP_USER_PROFILE_TABLE_NAME || null,
            APP_USER_CONTACT_TABLE_NAME: APP_USER_CONTACT_TABLE_NAME || null,
            hasAppSyncEndpoint: !!APPSYNC_ENDPOINT,
          });
        }
      } catch (e) {
        console.log('acceptance: contact create failed', {
          error: e?.message || String(e),
          APP_USER_CONTACT_TABLE_NAME: APP_USER_CONTACT_TABLE_NAME || null,
        });
      }

      // Seed intro message into DM thread once, after acceptance.
      if (introMessage && !introDeliveredAt && eventId) {
        const [a, b] = sortPair(userA, userB);
        const threadIdForPair = dmThreadIdFor(eventId, a, b);
        const now = new Date().toISOString();

        try {
          let thread = await getThread(threadIdForPair);
          if (!thread?.id) {
            await ddb.send(
              new PutCommand({
                TableName: DM_THREAD_TABLE_NAME,
                Item: {
                  id: threadIdForPair,
                  eventId,
                  dmKey: dmKeyFor(a, b),
                  userAId: a,
                  userBId: b,
                  owners: [a, b],
                  lastMessageAt: null,
                  lastMessagePreview: null,
                  createdAt: now,
                  updatedAt: now,
                },
                ConditionExpression: 'attribute_not_exists(#id)',
                ExpressionAttributeNames: { '#id': 'id' },
              })
            );
            thread = await getThread(threadIdForPair);
          }

          const introMessageId = `intro:${requestId}`;
          const introItem = {
            id: introMessageId,
            eventId,
            threadId: threadIdForPair,
            senderUserId: requestedByUserId,
            owners: [a, b],
            type: 'text',
            body: safeSlice(introMessage, 2000),
            createdAt: getString(img.introSentAt) || now,
            updatedAt: now,
          };

          try {
            await ddb.send(
              new PutCommand({
                TableName: DM_MESSAGE_TABLE_NAME,
                Item: introItem,
                ConditionExpression: 'attribute_not_exists(#id)',
                ExpressionAttributeNames: { '#id': 'id' },
              })
            );
          } catch (e) {
            if (!(e && e.name === 'ConditionalCheckFailedException')) throw e;
          }

          await ddb.send(
            new UpdateCommand({
              TableName: DM_THREAD_TABLE_NAME,
              Key: { id: threadIdForPair },
              UpdateExpression:
                'SET #lastMessageAt = :lastMessageAt, #lastMessagePreview = :lastMessagePreview, #updatedAt = :updatedAt',
              ExpressionAttributeNames: {
                '#lastMessageAt': 'lastMessageAt',
                '#lastMessagePreview': 'lastMessagePreview',
                '#updatedAt': 'updatedAt',
              },
              ExpressionAttributeValues: {
                ':lastMessageAt': now,
                ':lastMessagePreview': safeSlice(introItem.body, 240),
                ':updatedAt': now,
              },
            })
          );

          await upsertParticipantState({
            eventId,
            threadId: threadIdForPair,
            userId: requestedByUserId,
            lastReadAt: now,
            unreadDelta: 0,
            resetUnread: true,
            now,
          });
          await upsertParticipantState({
            eventId,
            threadId: threadIdForPair,
            userId: acceptedBy,
            lastReadAt: null,
            unreadDelta: 1,
            resetUnread: false,
            now,
          });

          await ddb.send(
            new UpdateCommand({
              TableName: CONTACT_REQUEST_TABLE_NAME,
              Key: { id: requestId },
              UpdateExpression: 'SET #introDeliveredAt = :introDeliveredAt, #updatedAt = :updatedAt',
              ConditionExpression: 'attribute_not_exists(#introDeliveredAt)',
              ExpressionAttributeNames: {
                '#introDeliveredAt': 'introDeliveredAt',
                '#updatedAt': 'updatedAt',
              },
              ExpressionAttributeValues: {
                ':introDeliveredAt': now,
                ':updatedAt': now,
              },
            })
          );
        } catch (e) {
          console.log('acceptance: intro seed failed', {
            requestId: safeSlice(requestId, 64),
            error: e?.message || String(e),
          });
        }
      }

      // Notify requester that their request was accepted.
      const tokens = await listTokensByUser(requestedByUserId);
      for (const token of tokens) {
        expoMessages.push({
          to: token,
          title: 'Request accepted',
          body: 'Your contact request was accepted',
          badge: 1,
          data: {
            type: 'requestAccepted',
            eventId: eventId || null,
            requestId: requestId || null,
            otherUserId: acceptedBy,
          },
        });
      }
      continue;
    }

    // Announcements: have body + eventId and no threadId
    const announcementId = getString(img.id);
    const isAnnouncementRecord =
      announcementId && announcementBody && eventId && !threadId;

    if (isAnnouncementRecord) {
      if (r.eventName === 'REMOVE') {
        await syncAnnouncementPublishSchedule({
          id: announcementId,
          eventName: 'REMOVE',
        });
      } else {
        await syncAnnouncementPublishSchedule({
          id: announcementId,
          scheduledAt: getString(img.scheduledAt),
          publishedAt: getString(img.publishedAt),
          eventName: r.eventName,
        });
      }
    }

    if (
      announcementId &&
      shouldSendAnnouncementPush(img, unmarshallOldImage(r), r.eventName)
    ) {
      const tokens = await listTokensForAnnouncement({
        id: announcementId,
        eventId,
        audienceTypes: getStringList(img.audienceTypes),
      });
      for (const msg of buildAnnouncementPushMessages(
        {
          id: announcementId,
          title: announcementTitle,
          body: announcementBody,
          deepLink,
        },
        tokens
      )) {
        expoMessages.push(msg);
      }
      await recordAnnouncementSendStats(announcementId, tokens.length);
      continue;
    }
  }

  // Expo allows batch sends; keep it simple: single request
  await sendExpoPush(expoMessages);

  return { ok: true, sent: expoMessages.length };
}

function buildExhibitorPassportPayload(eventId, exhibitorId) {
  const nonce = crypto.randomBytes(18).toString('base64url');
  const raw = `${eventId}:${exhibitorId}:${nonce}`;
  const signature = crypto
    .createHmac('sha256', String(EXHIBITOR_QR_SECRET))
    .update(raw)
    .digest('base64url');
  return `aps-passport:v1:${eventId}:${exhibitorId}:${nonce}:${signature}`;
}

function buildS3PublicUrl(bucket, key) {
  const region = process.env.REGION || process.env.AWS_REGION || 'us-east-1';
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

async function createExhibitorBase(input) {
  if (!EXHIBITOR_PROFILE_TABLE_NAME) throw new Error('Missing EXHIBITOR_PROFILE_TABLE_NAME');
  const now = new Date().toISOString();
  const created = {
    id: crypto.randomUUID(),
    companyId: input.companyId,
    eventId: input.eventId,
    boothNumber: input.boothNumber || null,
    createdAt: now,
    updatedAt: now,
  };
  await ddb.send(
    new PutCommand({
      TableName: EXHIBITOR_PROFILE_TABLE_NAME,
      Item: created,
      ConditionExpression: 'attribute_not_exists(#id)',
      ExpressionAttributeNames: { '#id': 'id' },
    })
  );
  return created;
}

async function uploadExhibitorQrPng({ exhibitorId, payload }) {
  const key = `${EXHIBITOR_QR_KEY_PREFIX}/${exhibitorId}.png`;
  const pngBuffer = await QRCode.toBuffer(payload, {
    type: 'png',
    width: 640,
    errorCorrectionLevel: 'M',
    margin: 1,
  });
  await s3.send(
    new PutObjectCommand({
      Bucket: EXHIBITOR_QR_BUCKET,
      Key: key,
      Body: pngBuffer,
      ContentType: 'image/png',
    })
  );
  return {
    key,
    publicUrl: buildS3PublicUrl(EXHIBITOR_QR_BUCKET, key),
  };
}

async function updateExhibitorQrFields({ exhibitorId, passportQrPayload, qrCode }) {
  if (!EXHIBITOR_PROFILE_TABLE_NAME) throw new Error('Missing EXHIBITOR_PROFILE_TABLE_NAME');
  await ddb.send(
    new UpdateCommand({
      TableName: EXHIBITOR_PROFILE_TABLE_NAME,
      Key: { id: exhibitorId },
      UpdateExpression:
        'SET #passportQrPayload = :passportQrPayload, #qrCode = :qrCode, #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#passportQrPayload': 'passportQrPayload',
        '#qrCode': 'qrCode',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':passportQrPayload': passportQrPayload,
        ':qrCode': qrCode,
        ':updatedAt': new Date().toISOString(),
      },
    })
  );
  const out = await ddb.send(
    new GetCommand({
      TableName: EXHIBITOR_PROFILE_TABLE_NAME,
      Key: { id: exhibitorId },
    })
  );
  return out?.Item || null;
}

async function handleAdminCreateExhibitor(event) {
  if (!isAdminIdentity(event)) throw new Error('Unauthorized');
  const input = event?.arguments?.input || {};
  const companyId = String(input.companyId || '').trim();
  const eventId = String(input.eventId || '').trim();
  const boothNumber = String(input.boothNumber || '').trim();
  if (!companyId) throw new Error('companyId is required');
  if (!eventId) throw new Error('eventId is required');

  let exhibitor = null;
  try {
    exhibitor = await createExhibitorBase({
      companyId,
      eventId,
      boothNumber: boothNumber || null,
    });
  } catch (error) {
    throw new Error(`adminCreateExhibitor:create profile failed: ${error?.message || String(error)}`);
  }
  if (!exhibitor?.id) throw new Error('adminCreateExhibitor:create profile returned no id');

  const payload = buildExhibitorPassportPayload(eventId, exhibitor.id);

  let uploaded = null;
  try {
    uploaded = await uploadExhibitorQrPng({
      exhibitorId: exhibitor.id,
      payload,
    });
  } catch (error) {
    throw new Error(
      `adminCreateExhibitor:upload qr failed (bucket=${EXHIBITOR_QR_BUCKET}): ${error?.message || String(error)}`
    );
  }

  let updated = null;
  try {
    updated = await updateExhibitorQrFields({
      exhibitorId: exhibitor.id,
      passportQrPayload: payload,
      qrCode: uploaded.publicUrl,
    });
  } catch (error) {
    throw new Error(
      `adminCreateExhibitor:update qr fields failed: ${error?.message || String(error)}`
    );
  }
  if (!updated?.id) throw new Error('adminCreateExhibitor:update qr fields returned no id');

  return {
    id: String(updated.id),
    companyId: String(updated.companyId || companyId),
    eventId: String(updated.eventId || eventId),
    boothNumber: updated.boothNumber || null,
    passportQrPayload: String(updated.passportQrPayload || payload),
    qrCode: String(updated.qrCode || uploaded.publicUrl),
  };
}

async function publishDueAnnouncements(eventId) {
  if (!ANNOUNCEMENT_TABLE_NAME) {
    throw new Error('ANNOUNCEMENT_TABLE_NAME is not configured');
  }

  const nowIso = new Date().toISOString();
  const due = [];
  let lastEvaluatedKey = undefined;

  do {
    const resp = await ddb.send(
      new QueryCommand({
        TableName: ANNOUNCEMENT_TABLE_NAME,
        IndexName: ANNOUNCEMENT_SCHEDULED_GSI_NAME,
        KeyConditionExpression: 'eventId = :eventId AND scheduledAt <= :now',
        ExpressionAttributeValues: {
          ':eventId': eventId,
          ':now': nowIso,
        },
        ExclusiveStartKey: lastEvaluatedKey,
        Limit: 100,
      })
    );
    due.push(
      ...(resp.Items || []).filter((item) => item?.id && !getString(item?.publishedAt))
    );
    lastEvaluatedKey = resp.LastEvaluatedKey;
  } while (lastEvaluatedKey);

  const publishedIds = [];
  for (const item of due) {
    try {
      await ddb.send(
        new UpdateCommand({
          TableName: ANNOUNCEMENT_TABLE_NAME,
          Key: { id: String(item.id) },
          UpdateExpression: 'SET publishedAt = :publishedAt, updatedAt = :updatedAt',
          ConditionExpression: 'attribute_not_exists(publishedAt)',
          ExpressionAttributeValues: {
            ':publishedAt': nowIso,
            ':updatedAt': nowIso,
          },
        })
      );
      publishedIds.push(String(item.id));
    } catch (error) {
      if (error?.name !== 'ConditionalCheckFailedException') {
        throw error;
      }
    }
  }

  console.log('publishDueAnnouncements', {
    eventId,
    dueCount: due.length,
    publishedCount: publishedIds.length,
    publishedIds,
  });

  await backfillUpcomingAnnouncementSchedules(eventId);

  return {
    publishedCount: publishedIds.length,
    publishedIds,
  };
}

async function handleAdminPublishDueAnnouncements(event) {
  if (!isAdminIdentity(event)) throw new Error('Unauthorized');
  const eventId = String(event?.arguments?.eventId || '').trim();
  if (!eventId) throw new Error('eventId is required');
  return publishDueAnnouncements(eventId);
}

function isScheduledPublishInvocation(event) {
  if (event?.action === 'publishDueAnnouncements') return true;
  if (event?.action === 'publishAnnouncement') return false;
  if (event?.source === 'aws.events') return true;
  return event?.['detail-type'] === 'Scheduled Event';
}

exports.handler = async (event) => {
  const isStream = Array.isArray(event?.Records);
  if (isStream) return handleStreamFanout(event);

  if (event?.action === 'publishAnnouncement') {
    const announcementId = String(event?.announcementId || '').trim();
    if (!announcementId) throw new Error('announcementId is required');
    try {
      return await publishAnnouncementById(announcementId);
    } catch (error) {
      if (error?.name === 'ConditionalCheckFailedException') {
        return { published: false, announcementId, reason: 'already-published' };
      }
      throw error;
    }
  }

  if (isScheduledPublishInvocation(event)) {
    const eventId = String(APS_EVENT_ID || event?.eventId || '').trim();
    if (!eventId) throw new Error('APS_EVENT_ID is required for scheduled publish');
    return publishDueAnnouncements(eventId);
  }

  if (event?.typeName === 'Query' && event?.fieldName === 'adminGetThinkificByEmail') {
    return handleAdminGetThinkificByEmail(event);
  }

  if (event?.typeName === 'Mutation' && event?.fieldName === 'syncMyThinkificProgress') {
    return handleSyncMyThinkificProgress(event);
  }

  if (event?.typeName === 'Mutation' && event?.fieldName === 'sendModeratedDmMessage') {
    return handleSendModeratedDmMessage(event);
  }

  if (event?.typeName === 'Mutation' && event?.fieldName === 'adminCreateExhibitor') {
    return handleAdminCreateExhibitor(event);
  }

  if (event?.typeName === 'Mutation' && event?.fieldName === 'adminPublishDueAnnouncements') {
    return handleAdminPublishDueAnnouncements(event);
  }

  throw new Error('Unsupported invocation');
};
