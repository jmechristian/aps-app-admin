import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const EXPO_PUSH_URL = process.env.EXPO_PUSH_URL || 'https://exp.host/--/api/v2/push/send';
const EXPO_ACCESS_TOKEN = process.env.EXPO_ACCESS_TOKEN;

const PUSH_TOKEN_TABLE_NAME = process.env.PUSH_TOKEN_TABLE_NAME;
const PUSH_TOKEN_GSI_NAME = process.env.PUSH_TOKEN_GSI_NAME;

function requireEnv(name) {
  if (!process.env[name]) throw new Error(`Missing required env var: ${name}`);
  return process.env[name];
}

function unmarshallNewImage(record) {
  // DynamoDB Streams "NewImage" for @model tables is typically already JSON-ish when using Lambda triggers
  // but can also be AttributeValue maps depending on trigger wiring.
  return record?.dynamodb?.NewImage || null;
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

async function sendExpoPush(messages) {
  if (!messages.length) return;

  const headers = { 'content-type': 'application/json' };
  if (EXPO_ACCESS_TOKEN) headers.Authorization = `Bearer ${EXPO_ACCESS_TOKEN}`;

  const res = await fetch(EXPO_PUSH_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(messages),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Expo push failed: ${res.status} ${res.statusText} ${text}`);
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

  return (out.Items || []).map((x) => x.token).filter(Boolean);
}

async function listAllTokens() {
  requireEnv('PUSH_TOKEN_TABLE_NAME');
  const out = await ddb.send(new ScanCommand({ TableName: PUSH_TOKEN_TABLE_NAME }));
  return (out.Items || []).map((x) => x.token).filter(Boolean);
}

export async function handler(event) {
  // event.Records = DynamoDB Stream records
  const records = event?.Records || [];

  // Only process INSERT events
  const inserts = records.filter((r) => r.eventName === 'INSERT');

  const expoMessages = [];

  for (const r of inserts) {
    const img = unmarshallNewImage(r);
    if (!img) continue;

    const threadId = getString(img.threadId);
    const announcementBody = getString(img.body);
    const announcementTitle = getString(img.title);
    const deepLink = getString(img.deepLink);

    // Heuristic: DM messages have threadId + senderUserId
    if (threadId && getString(img.senderUserId)) {
      const owners = getStringList(img.owners);
      const senderUserId = getString(img.senderUserId);
      const recipients = owners.filter((x) => x && x !== senderUserId);

      for (const recipientUserId of recipients) {
        const tokens = await listTokensByUser(recipientUserId);
        for (const token of tokens) {
          expoMessages.push({
            to: token,
            title: 'New message',
            body: (getString(img.body) || '').slice(0, 120) || 'You have a new message',
            data: { type: 'dm', threadId },
          });
        }
      }

      continue;
    }

    // Announcements: have body + eventId and no threadId
    if (announcementBody && getString(img.eventId) && !threadId) {
      const tokens = await listAllTokens();
      for (const token of tokens) {
        expoMessages.push({
          to: token,
          title: announcementTitle || 'New announcement',
          body: announcementBody.slice(0, 180),
          data: { type: 'announcement', deepLink: deepLink || null },
        });
      }
    }
  }

  // Expo allows batch sends; keep it simple: single request
  await sendExpoPush(expoMessages);

  return { ok: true, sent: expoMessages.length };
}


