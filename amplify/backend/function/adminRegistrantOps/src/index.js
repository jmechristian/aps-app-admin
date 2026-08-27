/* Amplify Params - DO NOT EDIT
	API_AUTOPACKSUMMITAPP_GRAPHQLAPIENDPOINTOUTPUT
	API_AUTOPACKSUMMITAPP_GRAPHQLAPIIDOUTPUT
	API_AUTOPACKSUMMITAPP_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const crypto = require('crypto');
const QRCode = require('qrcode');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, QueryCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const {
  CognitoIdentityProviderClient,
  AdminGetUserCommand,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminDeleteUserCommand,
} = require('@aws-sdk/client-cognito-identity-provider');

const APPSYNC_ENDPOINT = process.env.API_AUTOPACKSUMMITAPP_GRAPHQLAPIENDPOINTOUTPUT;
const APPSYNC_API_KEY = process.env.API_AUTOPACKSUMMITAPP_GRAPHQLAPIKEYOUTPUT;
const USER_POOL_ID = process.env.AUTH_AUTOPACKSUMMITAPPFEFBE6F1_USERPOOLID;
const DEFAULT_EVENT_ID = process.env.DEFAULT_APS_ID || 'lkbfurpd5bhvtewpiqr5xhye6u';
const TEMP_CREDENTIAL_SECRET =
  process.env.TEMP_CREDENTIAL_SECRET ||
  process.env.AUTH_AUTOPACKSUMMITAPPFEFBE6F1_USERPOOLID ||
  'aps-temp-secret';
const APP_USER_TABLE_NAME = process.env.APP_USER_TABLE_NAME;
const APP_USER_PROFILE_TABLE_NAME = process.env.APP_USER_PROFILE_TABLE_NAME;
const APP_USER_BY_REGISTRANT_GSI = process.env.APP_USER_BY_REGISTRANT_GSI || 'byRegistrant';
const APP_USER_PROFILE_BY_USER_GSI = process.env.APP_USER_PROFILE_BY_USER_GSI || 'byUser';
const TEMP_CREDENTIAL_TABLE_NAME = process.env.TEMP_CREDENTIAL_TABLE_NAME;
const TEMP_CREDENTIAL_BY_REGISTRANT_GSI = process.env.TEMP_CREDENTIAL_BY_REGISTRANT_GSI || 'byRegistrant';
const SPEAKER_TABLE_NAME = process.env.SPEAKER_TABLE_NAME;
const EXHIBITOR_QR_BUCKET = process.env.EXHIBITOR_QR_BUCKET || process.env.STORAGE_APSAPP_BUCKETNAME || 'apsapp';
const EXHIBITOR_QR_SECRET = process.env.EXHIBITOR_QR_SECRET || TEMP_CREDENTIAL_SECRET;
const EXHIBITOR_QR_KEY_PREFIX = 'qrcodes/exhibitor-passport';

const cognito = new CognitoIdentityProviderClient({});
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const s3 = new S3Client({});

function nowIso() {
  return new Date().toISOString();
}

function normalizeGroups(value) {
  if (Array.isArray(value)) return value.map((v) => String(v || '').trim().toLowerCase()).filter(Boolean);
  if (typeof value === 'string' && value.trim()) return [value.trim().toLowerCase()];
  return [];
}

function isAdminIdentity(event) {
  const claims = event?.identity?.claims || {};
  const groups = normalizeGroups(claims['cognito:groups']);
  return groups.includes('admin');
}

function requireAdmin(event) {
  if (!isAdminIdentity(event)) {
    throw new Error('Unauthorized: admin group required');
  }
}

function safeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function generateTempPassword() {
  const base = crypto.randomBytes(12).toString('base64url');
  return `${base}Aa1!`;
}

function encryptTempPassword(plain) {
  const key = crypto.createHash('sha256').update(String(TEMP_CREDENTIAL_SECRET)).digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const encrypted = Buffer.concat([cipher.update(String(plain), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return {
    tempPasswordCiphertext: encrypted.toString('base64'),
    tempPasswordIv: iv.toString('base64'),
    tempPasswordTag: tag.toString('base64'),
  };
}

function decryptTempPassword({
  tempPasswordCiphertext,
  tempPasswordIv,
  tempPasswordTag,
}) {
  const key = crypto.createHash('sha256').update(String(TEMP_CREDENTIAL_SECRET)).digest();
  const iv = Buffer.from(String(tempPasswordIv || ''), 'base64');
  const tag = Buffer.from(String(tempPasswordTag || ''), 'base64');
  const ciphertext = Buffer.from(String(tempPasswordCiphertext || ''), 'base64');
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return plain.toString('utf8');
}

async function appsyncRequest(query, variables) {
  if (!APPSYNC_ENDPOINT || !APPSYNC_API_KEY) {
    throw new Error('Missing AppSync endpoint or API key env vars');
  }
  const res = await fetch(APPSYNC_ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': APPSYNC_API_KEY,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`AppSync HTTP error: ${res.status}`);
  if (json.errors?.length) throw new Error(`AppSync GraphQL error: ${JSON.stringify(json.errors)}`);
  return json.data;
}

function getIdentitySub(event) {
  return event?.identity?.sub || event?.identity?.claims?.sub || null;
}

function getIdentityEmail(event) {
  const claims = event?.identity?.claims || {};
  return safeEmail(claims.email || claims['cognito:username'] || event?.identity?.username || '');
}

async function paginateAndDeleteItems({
  listQuery,
  listVariables,
  listPath,
  deleteMutation,
}) {
  let nextToken = null;
  do {
    const data = await appsyncRequest(listQuery, {
      ...listVariables,
      limit: 200,
      nextToken,
    });
    const connection = listPath.reduce((acc, key) => acc?.[key], data) || {};
    const items = connection?.items || [];
    for (const item of items) {
      if (!item?.id) continue;
      await appsyncRequest(deleteMutation, { input: { id: item.id } });
    }
    nextToken = connection?.nextToken || null;
  } while (nextToken);
}

async function deleteSpeakerRecordIfPresent(profileId) {
  if (!profileId) return;
  const profileData = await appsyncRequest(
    /* GraphQL */ `
      query GetApsAppUserProfile($id: ID!) {
        getApsAppUserProfile(id: $id) {
          id
          speakerId
        }
      }
    `,
    { id: profileId },
  );
  const speakerId = profileData?.getApsAppUserProfile?.speakerId;
  if (!speakerId) return;

  await paginateAndDeleteItems({
    listQuery: /* GraphQL */ `
      query SessionSpeakersByAPSSpeakerId(
        $aPSSpeakerId: ID!
        $limit: Int
        $nextToken: String
      ) {
        sessionSpeakersByAPSSpeakerId(
          aPSSpeakerId: $aPSSpeakerId
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            id
          }
          nextToken
        }
      }
    `,
    listVariables: { aPSSpeakerId: speakerId },
    listPath: ['sessionSpeakersByAPSSpeakerId'],
    deleteMutation: /* GraphQL */ `
      mutation DeleteSessionSpeakers($input: DeleteSessionSpeakersInput!) {
        deleteSessionSpeakers(input: $input) {
          id
        }
      }
    `,
  });

  await paginateAndDeleteItems({
    listQuery: /* GraphQL */ `
      query ApsAppUserFavoriteSpeakersBySpeakerIdAndCreatedAt(
        $speakerId: ID!
        $limit: Int
        $nextToken: String
      ) {
        apsAppUserFavoriteSpeakersBySpeakerIdAndCreatedAt(
          speakerId: $speakerId
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            id
          }
          nextToken
        }
      }
    `,
    listVariables: { speakerId },
    listPath: ['apsAppUserFavoriteSpeakersBySpeakerIdAndCreatedAt'],
    deleteMutation: /* GraphQL */ `
      mutation DeleteApsAppUserFavoriteSpeaker($input: DeleteApsAppUserFavoriteSpeakerInput!) {
        deleteApsAppUserFavoriteSpeaker(input: $input) {
          id
        }
      }
    `,
  });

  await appsyncRequest(
    /* GraphQL */ `
      mutation UpdateApsAppUserProfile($input: UpdateApsAppUserProfileInput!) {
        updateApsAppUserProfile(input: $input) {
          id
        }
      }
    `,
    { input: { id: profileId, speakerId: null } },
  );

  await appsyncRequest(
    /* GraphQL */ `
      mutation DeleteAPSSpeaker($input: DeleteAPSSpeakerInput!) {
        deleteAPSSpeaker(input: $input) {
          id
        }
      }
    `,
    { input: { id: speakerId } },
  );
}

async function deleteProfileOwnedData(profileId) {
  if (!profileId) return;

  const favoriteQueries = [
    {
      listQuery: /* GraphQL */ `
        query ApsAppUserFavoriteExhibitorsByUserProfileIdAndCreatedAt(
          $userProfileId: ID!
          $limit: Int
          $nextToken: String
        ) {
          apsAppUserFavoriteExhibitorsByUserProfileIdAndCreatedAt(
            userProfileId: $userProfileId
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['apsAppUserFavoriteExhibitorsByUserProfileIdAndCreatedAt'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteApsAppUserFavoriteExhibitor($input: DeleteApsAppUserFavoriteExhibitorInput!) {
          deleteApsAppUserFavoriteExhibitor(input: $input) {
            id
          }
        }
      `,
    },
    {
      listQuery: /* GraphQL */ `
        query ApsAppUserFavoriteSpeakersByUserProfileIdAndCreatedAt(
          $userProfileId: ID!
          $limit: Int
          $nextToken: String
        ) {
          apsAppUserFavoriteSpeakersByUserProfileIdAndCreatedAt(
            userProfileId: $userProfileId
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['apsAppUserFavoriteSpeakersByUserProfileIdAndCreatedAt'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteApsAppUserFavoriteSpeaker($input: DeleteApsAppUserFavoriteSpeakerInput!) {
          deleteApsAppUserFavoriteSpeaker(input: $input) {
            id
          }
        }
      `,
    },
    {
      listQuery: /* GraphQL */ `
        query ApsAppUserFavoriteSponsorsByUserProfileIdAndCreatedAt(
          $userProfileId: ID!
          $limit: Int
          $nextToken: String
        ) {
          apsAppUserFavoriteSponsorsByUserProfileIdAndCreatedAt(
            userProfileId: $userProfileId
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['apsAppUserFavoriteSponsorsByUserProfileIdAndCreatedAt'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteApsAppUserFavoriteSponsor($input: DeleteApsAppUserFavoriteSponsorInput!) {
          deleteApsAppUserFavoriteSponsor(input: $input) {
            id
          }
        }
      `,
    },
    {
      listQuery: /* GraphQL */ `
        query ApsAppUserFavoriteSessionsByUserProfileIdAndCreatedAt(
          $userProfileId: ID!
          $limit: Int
          $nextToken: String
        ) {
          apsAppUserFavoriteSessionsByUserProfileIdAndCreatedAt(
            userProfileId: $userProfileId
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['apsAppUserFavoriteSessionsByUserProfileIdAndCreatedAt'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteApsAppUserFavoriteSession($input: DeleteApsAppUserFavoriteSessionInput!) {
          deleteApsAppUserFavoriteSession(input: $input) {
            id
          }
        }
      `,
    },
    {
      listQuery: /* GraphQL */ `
        query ApsAppUserFavoriteContactsByUserProfileIdAndCreatedAt(
          $userProfileId: ID!
          $limit: Int
          $nextToken: String
        ) {
          apsAppUserFavoriteContactsByUserProfileIdAndCreatedAt(
            userProfileId: $userProfileId
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['apsAppUserFavoriteContactsByUserProfileIdAndCreatedAt'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteApsAppUserFavoriteContact($input: DeleteApsAppUserFavoriteContactInput!) {
          deleteApsAppUserFavoriteContact(input: $input) {
            id
          }
        }
      `,
    },
  ];

  for (const favoriteQuery of favoriteQueries) {
    await paginateAndDeleteItems({
      listQuery: favoriteQuery.listQuery,
      listVariables: { userProfileId: profileId },
      listPath: favoriteQuery.listPath,
      deleteMutation: favoriteQuery.deleteMutation,
    });
  }

  await paginateAndDeleteItems({
    listQuery: /* GraphQL */ `
      query ApsAppUserPassportStampsByUserProfileIdAndCreatedAt(
        $userProfileId: ID!
        $limit: Int
        $nextToken: String
      ) {
        apsAppUserPassportStampsByUserProfileIdAndCreatedAt(
          userProfileId: $userProfileId
          limit: $limit
          nextToken: $nextToken
        ) {
          items {
            id
          }
          nextToken
        }
      }
    `,
    listVariables: { userProfileId: profileId },
    listPath: ['apsAppUserPassportStampsByUserProfileIdAndCreatedAt'],
    deleteMutation: /* GraphQL */ `
      mutation DeleteApsAppUserPassportStamp($input: DeleteApsAppUserPassportStampInput!) {
        deleteApsAppUserPassportStamp(input: $input) {
          id
        }
      }
    `,
  });

  const profileChildQueries = [
    {
      listQuery: /* GraphQL */ `
        query ProfileAffiliatesByProfileId($profileId: ID!, $limit: Int, $nextToken: String) {
          profileAffiliatesByProfileId(profileId: $profileId, limit: $limit, nextToken: $nextToken) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['profileAffiliatesByProfileId'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteProfileAffiliate($input: DeleteProfileAffiliateInput!) {
          deleteProfileAffiliate(input: $input) {
            id
          }
        }
      `,
    },
    {
      listQuery: /* GraphQL */ `
        query ProfileEducationsByProfileId($profileId: ID!, $limit: Int, $nextToken: String) {
          profileEducationsByProfileId(profileId: $profileId, limit: $limit, nextToken: $nextToken) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['profileEducationsByProfileId'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteProfileEducation($input: DeleteProfileEducationInput!) {
          deleteProfileEducation(input: $input) {
            id
          }
        }
      `,
    },
    {
      listQuery: /* GraphQL */ `
        query ProfileInterestsByProfileId($profileId: ID!, $limit: Int, $nextToken: String) {
          profileInterestsByProfileId(profileId: $profileId, limit: $limit, nextToken: $nextToken) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['profileInterestsByProfileId'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteProfileInterest($input: DeleteProfileInterestInput!) {
          deleteProfileInterest(input: $input) {
            id
          }
        }
      `,
    },
  ];

  for (const childQuery of profileChildQueries) {
    await paginateAndDeleteItems({
      listQuery: childQuery.listQuery,
      listVariables: { profileId },
      listPath: childQuery.listPath,
      deleteMutation: childQuery.deleteMutation,
    });
  }

  await deleteSpeakerRecordIfPresent(profileId);
}

async function deleteAppUserOwnedData(appUserId, profileId) {
  const userChildQueries = [
    {
      listQuery: /* GraphQL */ `
        query ApsPushTokensByUserIdAndUpdatedAt($userId: ID!, $limit: Int, $nextToken: String) {
          apsPushTokensByUserIdAndUpdatedAt(userId: $userId, limit: $limit, nextToken: $nextToken) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['apsPushTokensByUserIdAndUpdatedAt'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteApsPushToken($input: DeleteApsPushTokenInput!) {
          deleteApsPushToken(input: $input) {
            id
          }
        }
      `,
    },
    {
      listQuery: /* GraphQL */ `
        query ApsAppUserContactsByUserId($userId: ID!, $limit: Int, $nextToken: String) {
          apsAppUserContactsByUserId(userId: $userId, limit: $limit, nextToken: $nextToken) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['apsAppUserContactsByUserId'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteApsAppUserContact($input: DeleteApsAppUserContactInput!) {
          deleteApsAppUserContact(input: $input) {
            id
          }
        }
      `,
    },
    {
      listQuery: /* GraphQL */ `
        query ApsAppUserLeadsByUserId($userId: ID!, $limit: Int, $nextToken: String) {
          apsAppUserLeadsByUserId(userId: $userId, limit: $limit, nextToken: $nextToken) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['apsAppUserLeadsByUserId'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteApsAppUserLead($input: DeleteApsAppUserLeadInput!) {
          deleteApsAppUserLead(input: $input) {
            id
          }
        }
      `,
    },
    {
      listQuery: /* GraphQL */ `
        query ApsAppUserNotesByUserId($userId: ID!, $limit: Int, $nextToken: String) {
          apsAppUserNotesByUserId(userId: $userId, limit: $limit, nextToken: $nextToken) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['apsAppUserNotesByUserId'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteApsAppUserNote($input: DeleteApsAppUserNoteInput!) {
          deleteApsAppUserNote(input: $input) {
            id
          }
        }
      `,
    },
    {
      listQuery: /* GraphQL */ `
        query ApsAppUserPhotosByUserId($userId: ID!, $limit: Int, $nextToken: String) {
          apsAppUserPhotosByUserId(userId: $userId, limit: $limit, nextToken: $nextToken) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['apsAppUserPhotosByUserId'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteApsAppUserPhoto($input: DeleteApsAppUserPhotoInput!) {
          deleteApsAppUserPhoto(input: $input) {
            id
          }
        }
      `,
    },
    {
      listQuery: /* GraphQL */ `
        query ApsAppSessionQuestionsByUserId($userId: ID!, $limit: Int, $nextToken: String) {
          apsAppSessionQuestionsByUserId(userId: $userId, limit: $limit, nextToken: $nextToken) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['apsAppSessionQuestionsByUserId'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteApsAppSessionQuestion($input: DeleteApsAppSessionQuestionInput!) {
          deleteApsAppSessionQuestion(input: $input) {
            id
          }
        }
      `,
    },
    {
      listQuery: /* GraphQL */ `
        query ApsAppExhibitorDealsByUserId($userId: ID!, $limit: Int, $nextToken: String) {
          apsAppExhibitorDealsByUserId(userId: $userId, limit: $limit, nextToken: $nextToken) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['apsAppExhibitorDealsByUserId'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteApsAppExhibitorDeal($input: DeleteApsAppExhibitorDealInput!) {
          deleteApsAppExhibitorDeal(input: $input) {
            id
          }
        }
      `,
    },
    {
      listQuery: /* GraphQL */ `
        query ApsContactRequestsByRequestedByUserIdAndCreatedAt(
          $requestedByUserId: ID!
          $limit: Int
          $nextToken: String
        ) {
          apsContactRequestsByRequestedByUserIdAndCreatedAt(
            requestedByUserId: $requestedByUserId
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['apsContactRequestsByRequestedByUserIdAndCreatedAt'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteApsContactRequest($input: DeleteApsContactRequestInput!) {
          deleteApsContactRequest(input: $input) {
            id
          }
        }
      `,
    },
    {
      listQuery: /* GraphQL */ `
        query ApsDmParticipantStatesByUserIdAndLastMessageAt(
          $userId: ID!
          $limit: Int
          $nextToken: String
        ) {
          apsDmParticipantStatesByUserIdAndLastMessageAt(
            userId: $userId
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              id
            }
            nextToken
          }
        }
      `,
      listPath: ['apsDmParticipantStatesByUserIdAndLastMessageAt'],
      deleteMutation: /* GraphQL */ `
        mutation DeleteApsDmParticipantState($input: DeleteApsDmParticipantStateInput!) {
          deleteApsDmParticipantState(input: $input) {
            id
          }
        }
      `,
    },
  ];

  for (const childQuery of userChildQueries) {
    await paginateAndDeleteItems({
      listQuery: childQuery.listQuery,
      listVariables: { userId: appUserId, requestedByUserId: appUserId },
      listPath: childQuery.listPath,
      deleteMutation: childQuery.deleteMutation,
    });
  }

  await deleteProfileOwnedData(profileId);
}

async function handleDeleteMyAccount(event) {
  const cognitoSub = getIdentitySub(event);
  const email = getIdentityEmail(event);
  if (!cognitoSub) throw new Error('Unauthorized: missing authenticated user');
  if (!email) throw new Error('Unable to resolve account email for deletion');

  const appUserData = await appsyncRequest(
    /* GraphQL */ `
      query GetApsAppUser($id: ID!) {
        getApsAppUser(id: $id) {
          id
          registrantId
          profileId
        }
      }
    `,
    { id: cognitoSub },
  );
  const appUser = appUserData?.getApsAppUser || null;
  const profileId = appUser?.profileId ? String(appUser.profileId) : null;
  const registrantId = appUser?.registrantId ? String(appUser.registrantId) : null;

  if (appUser?.id) {
    await deleteAppUserOwnedData(String(appUser.id), profileId);

    if (profileId) {
      await appsyncRequest(
        /* GraphQL */ `
          mutation DeleteApsAppUserProfile($input: DeleteApsAppUserProfileInput!) {
            deleteApsAppUserProfile(input: $input) {
              id
            }
          }
        `,
        { input: { id: profileId } },
      );
    }

    await appsyncRequest(
      /* GraphQL */ `
        mutation DeleteApsAppUser($input: DeleteApsAppUserInput!) {
          deleteApsAppUser(input: $input) {
            id
          }
        }
      `,
      { input: { id: String(appUser.id) } },
    );
  }

  if (registrantId) {
    await appsyncRequest(
      /* GraphQL */ `
        mutation UpdateApsRegistrant($input: UpdateApsRegistrantInput!) {
          updateApsRegistrant(input: $input) {
            id
          }
        }
      `,
      { input: { id: registrantId, appUserId: null } },
    );
  }

  if (USER_POOL_ID) {
    await cognito.send(
      new AdminDeleteUserCommand({
        UserPoolId: USER_POOL_ID,
        Username: email,
      }),
    );
  }

  return {
    success: true,
    message: 'Your account and app profile data were deleted. Your event registration record was kept.',
  };
}

async function adminGetUser(email) {
  return cognito.send(
    new AdminGetUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
    }),
  );
}

async function ensureCognitoUser(email) {
  if (!USER_POOL_ID) throw new Error('Missing Cognito UserPool id env var');
  try {
    const existing = await adminGetUser(email);
    const subAttr = (existing.UserAttributes || []).find((attr) => attr.Name === 'sub');
    return { cognitoSub: subAttr?.Value || null, tempPassword: null, created: false };
  } catch (error) {
    const isNotFound =
      error?.name === 'UserNotFoundException' ||
      String(error?.message || '').includes('UserNotFoundException');
    if (!isNotFound) throw error;
  }

  const tempPassword = generateTempPassword();
  const created = await cognito.send(
    new AdminCreateUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
      MessageAction: 'SUPPRESS',
      TemporaryPassword: tempPassword,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'email_verified', Value: 'true' },
      ],
    }),
  );
  const subAttr = (created.User?.Attributes || []).find((attr) => attr.Name === 'sub');
  return { cognitoSub: subAttr?.Value || null, tempPassword, created: true };
}

async function reissueTempPassword(email) {
  const ensured = await ensureCognitoUser(email);
  if (ensured.created) return ensured;
  const tempPassword = generateTempPassword();
  await cognito.send(
    new AdminSetUserPasswordCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
      Password: tempPassword,
      Permanent: false,
    }),
  );
  return {
    cognitoSub: ensured.cognitoSub,
    tempPassword,
    created: false,
  };
}

async function attachCompanyToEventIfNeeded(companyId, apsID) {
  if (!companyId) return;
  try {
    const existing = await appsyncRequest(
      /* GraphQL */ `
        query APSCompanyEventsByAPSCompanyId($aPSCompanyId: ID!, $filter: ModelAPSCompanyEventsFilterInput, $limit: Int) {
          aPSCompanyEventsByAPSCompanyId(aPSCompanyId: $aPSCompanyId, filter: $filter, limit: $limit) {
            items {
              id
            }
          }
        }
      `,
      { aPSCompanyId: companyId, filter: { aPSId: { eq: apsID } }, limit: 1 },
    );
    const items = existing?.aPSCompanyEventsByAPSCompanyId?.items || [];
    if (items.length) return;
    await appsyncRequest(
      /* GraphQL */ `
        mutation CreateAPSCompanyEvents($input: CreateAPSCompanyEventsInput!) {
          createAPSCompanyEvents(input: $input) {
            id
          }
        }
      `,
      { input: { aPSCompanyId: companyId, aPSId: apsID } },
    );
  } catch (error) {
    console.log('best-effort company attach failed', { companyId, apsID, message: error?.message || String(error) });
  }
}

async function getCompanyName(companyId) {
  if (!companyId) return '';
  const data = await appsyncRequest(
    /* GraphQL */ `
      query GetAPSCompany($id: ID!) {
        getAPSCompany(id: $id) {
          id
          name
        }
      }
    `,
    { id: companyId },
  );
  return data?.getAPSCompany?.name || '';
}

async function createRegistrantBase(input, apsID) {
  const data = await appsyncRequest(
    /* GraphQL */ `
      mutation CreateApsRegistrant($input: CreateApsRegistrantInput!) {
        createApsRegistrant(input: $input) {
          id
          email
          companyId
          apsID
        }
      }
    `,
    {
      input: {
        apsID,
        firstName: input.firstName,
        lastName: input.lastName,
        email: safeEmail(input.email),
        phone: input.phone || null,
        companyId: input.companyId || null,
        jobTitle: input.jobTitle || null,
        attendeeType: input.attendeeType,
        status: input.status,
      },
    },
  );
  return data?.createApsRegistrant;
}

async function getRegistrantById(registrantId) {
  const data = await appsyncRequest(
    /* GraphQL */ `
      query GetApsRegistrant($id: ID!) {
        getApsRegistrant(id: $id) {
          id
          apsID
          email
        }
      }
    `,
    { id: registrantId },
  );
  return data?.getApsRegistrant || null;
}

async function ensureAppUserForRegistrant(cognitoSub, registrantId) {
  if (!APP_USER_TABLE_NAME) throw new Error('Missing APP_USER_TABLE_NAME');
  const existing = await ddb.send(
    new QueryCommand({
      TableName: APP_USER_TABLE_NAME,
      IndexName: APP_USER_BY_REGISTRANT_GSI,
      KeyConditionExpression: '#registrantId = :registrantId',
      ExpressionAttributeNames: { '#registrantId': 'registrantId' },
      ExpressionAttributeValues: { ':registrantId': registrantId },
      Limit: 1,
    }),
  );
  const item = existing?.Items?.[0] || null;
  if (item?.id) return item;

  const now = nowIso();
  const created = {
    id: cognitoSub,
    registrantId,
    profileId: null,
    createdAt: now,
    updatedAt: now,
  };
  await ddb.send(
    new PutCommand({
      TableName: APP_USER_TABLE_NAME,
      Item: created,
      ConditionExpression: 'attribute_not_exists(#id)',
      ExpressionAttributeNames: { '#id': 'id' },
    }),
  );
  return created;
}

async function ensureProfileForUser(input, appUserId, companyName) {
  if (!APP_USER_PROFILE_TABLE_NAME) throw new Error('Missing APP_USER_PROFILE_TABLE_NAME');
  const existing = await ddb.send(
    new QueryCommand({
      TableName: APP_USER_PROFILE_TABLE_NAME,
      IndexName: APP_USER_PROFILE_BY_USER_GSI,
      KeyConditionExpression: '#userId = :userId',
      ExpressionAttributeNames: { '#userId': 'userId' },
      ExpressionAttributeValues: { ':userId': appUserId },
      Limit: 1,
    }),
  );
  const item = existing?.Items?.[0] || null;
  if (item?.id) return item;

  const now = nowIso();
  const created = {
    id: `profile:${appUserId}`,
    userId: appUserId,
    firstName: input.firstName || null,
    lastName: input.lastName || null,
    email: safeEmail(input.email),
    phone: input.phone || null,
    company: companyName || '',
    jobTitle: input.jobTitle || null,
    attendeeType: input.attendeeType || null,
    createdAt: now,
    updatedAt: now,
  };
  await ddb.send(
    new PutCommand({
      TableName: APP_USER_PROFILE_TABLE_NAME,
      Item: created,
      ConditionExpression: 'attribute_not_exists(#id)',
      ExpressionAttributeNames: { '#id': 'id' },
    }),
  );
  return created;
}

async function ensureSpeakerIfNeeded(attendeeType, profileId, apsID) {
  if (String(attendeeType || '').toUpperCase() !== 'SPEAKER' || !profileId || !SPEAKER_TABLE_NAME) return;
  const now = nowIso();
  const speakerId = `speaker:${apsID}:${profileId}`;
  try {
    await ddb.send(
      new PutCommand({
        TableName: SPEAKER_TABLE_NAME,
        Item: {
          id: speakerId,
          profileId,
          eventId: apsID,
          presentationTitle: null,
          presentationSummary: null,
          createdAt: now,
          updatedAt: now,
        },
        ConditionExpression: 'attribute_not_exists(#id)',
        ExpressionAttributeNames: { '#id': 'id' },
      }),
    );
  } catch (error) {
    const conditional = error?.name === 'ConditionalCheckFailedException';
    if (!conditional) throw error;
  }
}

async function linkRegistrantAndAppUser(registrantId, appUserId) {
  await appsyncRequest(
    /* GraphQL */ `
      mutation UpdateApsRegistrant($input: UpdateApsRegistrantInput!) {
        updateApsRegistrant(input: $input) {
          id
        }
      }
    `,
    { input: { id: registrantId, appUserId } },
  );
}

async function linkAppUserAndProfile(appUserId, profileId) {
  if (!APP_USER_TABLE_NAME) return;
  await ddb.send(
    new UpdateCommand({
      TableName: APP_USER_TABLE_NAME,
      Key: { id: appUserId },
      UpdateExpression: 'SET #profileId = :profileId, #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#profileId': 'profileId',
        '#updatedAt': 'updatedAt',
      },
      ExpressionAttributeValues: {
        ':profileId': profileId,
        ':updatedAt': nowIso(),
      },
    }),
  );
}

async function storeTempCredential({ apsID, registrantId, email, tempPassword }) {
  if (!TEMP_CREDENTIAL_TABLE_NAME || !tempPassword) return;
  const encrypted = encryptTempPassword(tempPassword);
  const now = nowIso();
  const expiresAt = Math.floor((Date.now() + 14 * 24 * 60 * 60 * 1000) / 1000);
  await ddb.send(
    new PutCommand({
      TableName: TEMP_CREDENTIAL_TABLE_NAME,
      Item: {
        id: crypto.randomUUID(),
        apsID,
        registrantId,
        email,
        expiresAt,
        ...encrypted,
        createdAt: now,
        updatedAt: now,
      },
    }),
  );
}

async function bestEffortSetRegistrantQrCode(registrantId, apsID) {
  try {
    const qrCode = `aps:${apsID}:registrant:${registrantId}`;
    await appsyncRequest(
      /* GraphQL */ `
        mutation UpdateApsRegistrant($input: UpdateApsRegistrantInput!) {
          updateApsRegistrant(input: $input) {
            id
          }
        }
      `,
      { input: { id: registrantId, qrCode } },
    );
  } catch (error) {
    console.log('best-effort qrCode update failed', {
      registrantId,
      message: error?.message || String(error),
    });
  }
}

function buildExhibitorPassportPayload(eventId, exhibitorId) {
  const nonce = crypto.randomBytes(18).toString('base64url');
  const message = `${eventId}:${exhibitorId}:${nonce}`;
  const signature = crypto.createHmac('sha256', String(EXHIBITOR_QR_SECRET)).update(message).digest('base64url');
  return `aps-passport:v1:${eventId}:${exhibitorId}:${nonce}:${signature}`;
}

function buildS3PublicUrl(bucket, key) {
  const region = process.env.REGION || process.env.AWS_REGION || 'us-east-1';
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

async function createExhibitorBase(input) {
  const data = await appsyncRequest(
    /* GraphQL */ `
      mutation CreateApsAppExhibitorProfile($input: CreateApsAppExhibitorProfileInput!) {
        createApsAppExhibitorProfile(input: $input) {
          id
          companyId
          eventId
          boothNumber
        }
      }
    `,
    {
      input: {
        companyId: input.companyId,
        eventId: input.eventId,
        boothNumber: input.boothNumber || null,
      },
    },
  );
  return data?.createApsAppExhibitorProfile || null;
}

async function updateExhibitorQrFields({ exhibitorId, passportQrPayload, qrCode }) {
  const data = await appsyncRequest(
    /* GraphQL */ `
      mutation UpdateApsAppExhibitorProfile($input: UpdateApsAppExhibitorProfileInput!) {
        updateApsAppExhibitorProfile(input: $input) {
          id
          companyId
          eventId
          boothNumber
          passportQrPayload
          qrCode
        }
      }
    `,
    {
      input: {
        id: exhibitorId,
        passportQrPayload,
        qrCode,
      },
    },
  );
  return data?.updateApsAppExhibitorProfile || null;
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
    }),
  );
  return {
    key,
    publicUrl: buildS3PublicUrl(EXHIBITOR_QR_BUCKET, key),
  };
}

async function handleAdminCreateRegistrant(event) {
  requireAdmin(event);
  const sub = getIdentitySub(event);
  if (!sub) throw new Error('Unauthorized');

  const input = event?.arguments?.input || {};
  const email = safeEmail(input.email);
  if (!email) throw new Error('Email is required');
  if (!input.firstName || !input.lastName) throw new Error('First and last name are required');
  if (!input.attendeeType) throw new Error('Attendee type is required');
  if (!input.status) throw new Error('Status is required');

  const apsID = input.apsID || DEFAULT_EVENT_ID;
  const registrant = await createRegistrantBase(input, apsID);
  if (!registrant?.id) throw new Error('Failed to create registrant base record');

  const ensured = await ensureCognitoUser(email);
  if (!ensured.cognitoSub) throw new Error('Failed to resolve Cognito sub for registrant');

  if (input.companyId) {
    await attachCompanyToEventIfNeeded(input.companyId, apsID);
  }
  const companyName = await getCompanyName(input.companyId || null);

  const appUser = await ensureAppUserForRegistrant(ensured.cognitoSub, registrant.id);
  await linkRegistrantAndAppUser(registrant.id, appUser.id);

  const profile = await ensureProfileForUser(input, appUser.id, companyName);
  await linkAppUserAndProfile(appUser.id, profile.id);
  await ensureSpeakerIfNeeded(input.attendeeType, profile.id, apsID);
  await storeTempCredential({
    apsID,
    registrantId: registrant.id,
    email,
    tempPassword: ensured.tempPassword,
  });
  await bestEffortSetRegistrantQrCode(registrant.id, apsID);

  return {
    id: registrant.id,
    email: registrant.email || email,
    companyId: registrant.companyId || null,
    tempPassword: ensured.tempPassword || null,
  };
}

async function handleAdminReissueRegistrantTempPassword(event) {
  requireAdmin(event);
  const sub = getIdentitySub(event);
  if (!sub) throw new Error('Unauthorized');

  const input = event?.arguments?.input || {};
  const registrantId = String(input.registrantId || '').trim();
  if (!registrantId) throw new Error('registrantId is required');

  const registrant = await getRegistrantById(registrantId);
  if (!registrant?.id) throw new Error('Registrant not found');
  const email = safeEmail(input.email || registrant.email);
  if (!email) throw new Error('Email is required');
  const apsID = registrant.apsID || DEFAULT_EVENT_ID;

  const reissued = await reissueTempPassword(email);
  await storeTempCredential({
    apsID,
    registrantId,
    email,
    tempPassword: reissued.tempPassword,
  });

  return {
    registrantId,
    email,
    tempPassword: reissued.tempPassword,
  };
}

async function handleAdminGetLatestRegistrantTempCredential(event) {
  requireAdmin(event);
  const sub = getIdentitySub(event);
  if (!sub) throw new Error('Unauthorized');

  const registrantId = String(event?.arguments?.registrantId || '').trim();
  if (!registrantId) throw new Error('registrantId is required');
  if (!TEMP_CREDENTIAL_TABLE_NAME) throw new Error('Missing TEMP_CREDENTIAL_TABLE_NAME');

  const resp = await ddb.send(
    new QueryCommand({
      TableName: TEMP_CREDENTIAL_TABLE_NAME,
      IndexName: TEMP_CREDENTIAL_BY_REGISTRANT_GSI,
      KeyConditionExpression: '#registrantId = :registrantId',
      ExpressionAttributeNames: { '#registrantId': 'registrantId' },
      ExpressionAttributeValues: { ':registrantId': registrantId },
      ScanIndexForward: false,
      Limit: 1,
    }),
  );
  const item = resp?.Items?.[0];
  if (!item) return null;

  const tempPassword = decryptTempPassword({
    tempPasswordCiphertext: item.tempPasswordCiphertext,
    tempPasswordIv: item.tempPasswordIv,
    tempPasswordTag: item.tempPasswordTag,
  });

  return {
    registrantId,
    email: String(item.email || ''),
    tempPassword,
    createdAt: item.createdAt || nowIso(),
  };
}

async function handleAdminCreateExhibitor(event) {
  requireAdmin(event);
  const sub = getIdentitySub(event);
  if (!sub) throw new Error('Unauthorized');

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
      `adminCreateExhibitor:upload qr failed (bucket=${EXHIBITOR_QR_BUCKET}): ${error?.message || String(error)}`,
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
    throw new Error(`adminCreateExhibitor:update qr fields failed: ${error?.message || String(error)}`);
  }
  if (!updated?.id) throw new Error('adminCreateExhibitor:update qr fields returned no id');

  return {
    id: String(updated.id),
    companyId: String(updated.companyId || companyId),
    eventId: String(updated.eventId || eventId),
    boothNumber: updated.boothNumber || null,
    passportQrPayload: String(updated.passportQrPayload || payload),
    qrCode: String(updated.qrCode || uploaded?.publicUrl || ''),
  };
}

exports.handler = async (event) => {
  if (event?.typeName === 'Mutation' && event?.fieldName === 'adminCreateRegistrant') {
    return handleAdminCreateRegistrant(event);
  }
  if (event?.typeName === 'Mutation' && event?.fieldName === 'adminReissueRegistrantTempPassword') {
    return handleAdminReissueRegistrantTempPassword(event);
  }
  if (event?.typeName === 'Query' && event?.fieldName === 'adminGetLatestRegistrantTempCredential') {
    return handleAdminGetLatestRegistrantTempCredential(event);
  }
  if (event?.typeName === 'Mutation' && event?.fieldName === 'adminCreateExhibitor') {
    return handleAdminCreateExhibitor(event);
  }
  if (event?.typeName === 'Mutation' && event?.fieldName === 'deleteMyAccount') {
    return handleDeleteMyAccount(event);
  }
  throw new Error(`Unsupported invocation: ${event?.typeName}.${event?.fieldName}`);
};

