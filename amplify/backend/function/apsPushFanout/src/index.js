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
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
} = require('@aws-sdk/lib-dynamodb');

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const EXPO_PUSH_URL =
  process.env.EXPO_PUSH_URL || 'https://exp.host/--/api/v2/push/send';
const EXPO_ACCESS_TOKEN = process.env.EXPO_ACCESS_TOKEN;

const PUSH_TOKEN_TABLE_NAME = process.env.PUSH_TOKEN_TABLE_NAME;
const PUSH_TOKEN_GSI_NAME = process.env.PUSH_TOKEN_GSI_NAME;
const APP_USER_TABLE_NAME = process.env.APP_USER_TABLE_NAME;
const APP_USER_CONTACT_TABLE_NAME = process.env.APP_USER_CONTACT_TABLE_NAME;
const APP_USER_PROFILE_TABLE_NAME = process.env.APP_USER_PROFILE_TABLE_NAME;
const APP_USER_PROFILE_GSI_NAME = process.env.APP_USER_PROFILE_GSI_NAME || 'byUser';

const APPSYNC_ENDPOINT = process.env.API_AUTOPACKSUMMITAPP_GRAPHQLAPIENDPOINTOUTPUT;
const APPSYNC_API_KEY = process.env.API_AUTOPACKSUMMITAPP_GRAPHQLAPIKEYOUTPUT;

function safeSlice(str, n) {
  return String(str ?? '').slice(0, n);
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

async function sendExpoPush(messages) {
  if (!messages.length) return;

  const headers = { 'content-type': 'application/json' };
  if (EXPO_ACCESS_TOKEN) headers.Authorization = `Bearer ${EXPO_ACCESS_TOKEN}`;

  // Expo recommends <= 100 messages per request.
  const chunkSize = 100;
  for (let i = 0; i < messages.length; i += chunkSize) {
    const chunk = messages.slice(i, i + chunkSize);
    const res = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(chunk),
    });

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
    })
  );

  return (out.Items || []).map((x) => x?.token).filter(Boolean);
}

async function listAllTokens() {
  requireEnv('PUSH_TOKEN_TABLE_NAME');
  const out = await ddb.send(
    new ScanCommand({ TableName: PUSH_TOKEN_TABLE_NAME })
  );
  return (out.Items || []).map((x) => x?.token).filter(Boolean);
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

exports.handler = async (event) => {
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

    // Heuristic: DM messages have threadId + senderUserId
    if (r.eventName === 'INSERT' && threadId && getString(img.senderUserId)) {
      const owners = getStringList(img.owners);
      const senderUserId = getString(img.senderUserId);
      const recipients = owners.filter((x) => x && x !== senderUserId);

      for (const recipientUserId of recipients) {
        const tokens = await listTokensByUser(recipientUserId);
        for (const token of tokens) {
          expoMessages.push({
            to: token,
            title: 'New message',
            body:
              safeSlice(getString(img.body), 120) || 'You have a new message',
            data: { type: 'dm', eventId: eventId || null, threadId },
          });
        }
      }

      continue;
    }

    // Contact requests: have status + owners + requestedByUserId.
    // We push to the *other* owner(s) when the request is created in PENDING.
    const requestStatus = getString(img.status);
    const requestOwners = getStringList(img.owners);
    const requestedByUserId = getString(img.requestedByUserId);
    const requestId = getString(img.id);

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
      for (const recipientUserId of recipients) {
        const tokens = await listTokensByUser(recipientUserId);
        for (const token of tokens) {
          expoMessages.push({
            to: token,
            title: 'New request',
            body: 'You have a new contact request',
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

      // Notify requester that their request was accepted.
      const tokens = await listTokensByUser(requestedByUserId);
      for (const token of tokens) {
        expoMessages.push({
          to: token,
          title: 'Request accepted',
          body: 'Your contact request was accepted',
          data: { type: 'requestAccepted', eventId: eventId || null, otherUserId: acceptedBy },
        });
      }
      continue;
    }

    // Announcements: have body + eventId and no threadId
    if (r.eventName === 'INSERT' && announcementBody && getString(img.eventId) && !threadId) {
      const tokens = await listAllTokens();
      for (const token of tokens) {
        expoMessages.push({
          to: token,
          title: announcementTitle || 'New announcement',
          body: safeSlice(announcementBody, 180),
          data: { type: 'announcement', deepLink: deepLink || null },
        });
      }
    }
  }

  // Expo allows batch sends; keep it simple: single request
  await sendExpoPush(expoMessages);

  return { ok: true, sent: expoMessages.length };
};
