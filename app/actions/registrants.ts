'use server';

import { requestGraphQL } from '@/lib/appsync';
import { ensureCompanyAttachedToEvent } from '@/app/actions/companies';
import {
  deleteAPSSpeaker,
  deleteApsAppExhibitorDeal,
  deleteApsAppSessionQuestion,
  deleteApsAppUser,
  deleteApsAppUserContact,
  deleteApsAppUserLead,
  deleteApsAppUserNote,
  deleteApsAppUserPhoto,
  deleteApsAppUserProfile,
  deleteApsDmMessage,
  deleteApsRegistrant,
  deleteRegistrantAddOnRequest,
  deleteSessionSpeakers,
  deleteProfileAffiliate,
  deleteProfileEducation,
  deleteProfileInterest,
} from '@/src/graphql/mutations';
import {
  AdminCreateUserCommand,
  AdminDeleteUserCommand,
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { render } from '@react-email/render';
import { WelcomeEmail } from '@/react-email-starter/emails/welcome-email';
import { revalidatePath } from 'next/cache';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { getThinkificRegistrantSummaryByEmail } from '@/app/actions/thinkific';

type CognitoAttr = { Name?: string; Value?: string };

function buildSesClient(): SESClient {
  const region =
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION ||
    process.env.NEXT_PUBLIC_AWS_REGION ||
    'us-east-1';

  const accessKeyId =
    process.env.AWSACCESSKEYID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey =
    process.env.AWSSECRETACCESSKEY || process.env.AWS_SECRET_ACCESS_KEY;

  if (accessKeyId && secretAccessKey) {
    return new SESClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  return new SESClient({ region });
}

async function sendWelcomeEmailAndMarkSent(params: {
  registrant: RegistrantDetail;
  eventId: string;
  jwt?: string | null;
}): Promise<{ ok: boolean; message: string }> {
  try {
    const fromAddress =
      process.env.APS_WELCOME_EMAIL_FROM ||
      process.env.APS_EMAIL_FROM ||
      'info@packagingschool.com';
    const apsYear = process.env.APS_EVENT_YEAR || '2026';

    const emailHtml = await render(
      WelcomeEmail({
        formData: {
          firstName: params.registrant.firstName ?? '',
          lastName: params.registrant.lastName ?? '',
          email: params.registrant.email,
          companyName: params.registrant.company?.name ?? '',
          jobTitle: params.registrant.jobTitle ?? '',
          phone: params.registrant.phone ?? '',
          attendeeType: params.registrant.attendeeType ?? '',
          billingAddress: {
            street: params.registrant.billingAddressStreet ?? '',
            city: params.registrant.billingAddressCity ?? '',
            state: params.registrant.billingAddressState ?? '',
            zip: params.registrant.billingAddressZip ?? '',
          },
          speedNetworking: Boolean(params.registrant.speedNetworking),
        },
        formDataId: params.registrant.id,
        totalAmount: params.registrant.totalAmount ?? 0,
        addOnsSelected: [],
      }),
    );

    const client = buildSesClient();
    await client.send(
      new SendEmailCommand({
        Destination: {
          ToAddresses: [params.registrant.email],
        },
        Message: {
          Body: {
            Html: {
              Data: emailHtml,
            },
            Text: {
              Charset: 'UTF-8',
              Data: `Welcome to Automotive Packaging Summit ${apsYear}. View your dashboard: https://www.autopacksummit.com/registrants/${params.registrant.id}`,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: `Automotive Packaging Summit ${apsYear} - Welcome`,
          },
        },
        Source: fromAddress,
        ReplyToAddresses: [],
      }),
    );

    const authOpts = params.jwt
      ? { authMode: 'userPools' as const, jwt: params.jwt }
      : undefined;

    await requestGraphQL(
      UPDATE_REGISTRANT,
      {
        input: {
          id: params.registrant.id,
          welcomeEmailSent: true,
          welcomeEmailSentDate: new Date().toISOString(),
        },
      },
      authOpts,
    );

    revalidatePath(`/aps/${params.eventId}`);
    revalidatePath(
      `/aps/${params.eventId}/registrants/${params.registrant.id}`,
    );
    return { ok: true, message: 'Welcome email sent.' };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { ok: false, message: 'Failed to send welcome email.' };
  }
}

async function ensureCognitoUserForRegistrantEmail(email: string): Promise<{
  sub: string;
  username: string;
  tempPassword: string | null;
}> {
  const region =
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION ||
    process.env.NEXT_PUBLIC_AWS_REGION;

  const userPoolId =
    process.env.AWS_USER_POOLS_ID || process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID;
  if (!userPoolId) {
    throw new Error('Missing Cognito user pool id (AWS_USER_POOLS_ID)');
  }

  if (!region) {
    throw new Error('Missing AWS region (AWS_REGION)');
  }

  // NOTE: This requires AWS credentials in the server environment
  // (AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY or an assumed role).
  // If running locally, your AWS CLI profile/credential chain is fine; if running
  // on a host, attach an IAM role. We intentionally do NOT require env creds here.

  const client = new CognitoIdentityProviderClient({ region });
  const username = email.trim().toLowerCase();
  const suppressInvite = true;

  const tempPassword = suppressInvite
    ? `Aps!${Math.random().toString(36).slice(2)}${Math.random()
        .toString(36)
        .slice(2)}9Z`
    : undefined;

  try {
    const created = await client.send(
      new AdminCreateUserCommand({
        UserPoolId: userPoolId,
        Username: username,
        UserAttributes: [
          { Name: 'email', Value: username },
          { Name: 'email_verified', Value: 'true' },
        ],
        // For dummy/test data we suppress the Cognito invite email to avoid spam.
        MessageAction: suppressInvite ? 'SUPPRESS' : undefined,
        TemporaryPassword: tempPassword,
        DesiredDeliveryMediums: suppressInvite ? undefined : ['EMAIL'],
      }),
    );

    const attrs = (created.User?.Attributes ?? []) as CognitoAttr[];
    const sub = attrs.find((a: CognitoAttr) => a.Name === 'sub')?.Value;
    if (!sub) throw new Error('Cognito AdminCreateUser did not return sub');
    return { sub, username, tempPassword: tempPassword ?? null };
  } catch (e: unknown) {
    // If user already exists, fetch their sub and proceed idempotently.
    const errName =
      typeof e === 'object' && e && 'name' in e
        ? String((e as { name?: unknown }).name)
        : null;

    if (errName === 'UsernameExistsException') {
      const existing = await client.send(
        new AdminGetUserCommand({
          UserPoolId: userPoolId,
          Username: username,
        }),
      );
      const existingAttrs = (existing.UserAttributes ?? []) as CognitoAttr[];
      const sub = existingAttrs.find(
        (a: CognitoAttr) => a.Name === 'sub',
      )?.Value;
      if (!sub) throw new Error('Cognito user exists but sub not found');
      return { sub, username, tempPassword: null };
    }
    throw e;
  }
}

async function deleteCognitoUserByEmail(email: string) {
  const region =
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION ||
    process.env.NEXT_PUBLIC_AWS_REGION;

  const userPoolId =
    process.env.AWS_USER_POOLS_ID || process.env.NEXT_PUBLIC_AWS_USER_POOLS_ID;

  if (!userPoolId || !region) {
    throw new Error('Missing Cognito user pool configuration');
  }

  const client = new CognitoIdentityProviderClient({ region });
  const username = email.trim().toLowerCase();

  try {
    await client.send(
      new AdminDeleteUserCommand({
        UserPoolId: userPoolId,
        Username: username,
      }),
    );
  } catch (e: unknown) {
    const errName =
      typeof e === 'object' && e && 'name' in e
        ? String((e as { name?: unknown }).name)
        : null;
    if (errName === 'UserNotFoundException') return;
    throw e;
  }
}

function getTempPasswordKey(): Buffer {
  const raw = process.env.APS_TEMP_PASSWORD_KEY;
  if (!raw) {
    throw new Error('Missing APS_TEMP_PASSWORD_KEY for temp password storage');
  }
  const key = Buffer.from(raw, 'base64');
  if (key.length !== 32) {
    throw new Error('APS_TEMP_PASSWORD_KEY must be 32 bytes base64-encoded');
  }
  return key;
}

function encryptTempPassword(plain: string) {
  const key = getTempPasswordKey();
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([
    cipher.update(plain, 'utf8'),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return {
    ciphertext: ciphertext.toString('base64'),
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
  };
}

function decryptTempPassword(payload: {
  tempPasswordCiphertext: string;
  tempPasswordIv: string;
  tempPasswordTag: string;
}) {
  const key = getTempPasswordKey();
  const iv = Buffer.from(payload.tempPasswordIv, 'base64');
  const tag = Buffer.from(payload.tempPasswordTag, 'base64');
  const decipher = createDecipheriv('aes-256-gcm', key, iv);
  decipher.setAuthTag(tag);
  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(payload.tempPasswordCiphertext, 'base64')),
    decipher.final(),
  ]);
  return plaintext.toString('utf8');
}

async function storeTempPassword(params: {
  apsID: string;
  registrantId: string;
  email: string;
  tempPassword: string | null;
  jwt?: string;
}) {
  if (!params.tempPassword) return;
  try {
    const encrypted = encryptTempPassword(params.tempPassword);
    await requestGraphQL(
      CREATE_TEMP_CREDENTIAL,
      {
        input: {
          apsID: params.apsID,
          registrantId: params.registrantId,
          email: params.email,
          tempPasswordCiphertext: encrypted.ciphertext,
          tempPasswordIv: encrypted.iv,
          tempPasswordTag: encrypted.tag,
        },
      },
      params.jwt ? { authMode: 'userPools', jwt: params.jwt } : undefined,
    );
  } catch (error) {
    console.error('Failed to store temp password for registrant:', error);
  }
}

const CREATE_REGISTRANT = /* GraphQL */ `
  mutation CreateApsRegistrant($input: CreateApsRegistrantInput!) {
    createApsRegistrant(input: $input) {
      id
      email
      companyId
    }
  }
`;

const GET_COMPANY = /* GraphQL */ `
  query GetAPSCompany($id: ID!) {
    getAPSCompany(id: $id) {
      id
      name
      email
      website
    }
  }
`;

const UPDATE_REGISTRANT = /* GraphQL */ `
  mutation UpdateApsRegistrant($input: UpdateApsRegistrantInput!) {
    updateApsRegistrant(input: $input) {
      id
      qrCode
      appUserId
    }
  }
`;

const UPDATE_APP_USER = /* GraphQL */ `
  mutation UpdateApsAppUser($input: UpdateApsAppUserInput!) {
    updateApsAppUser(input: $input) {
      id
      profileId
    }
  }
`;

const UPDATE_APP_USER_PROFILE = /* GraphQL */ `
  mutation UpdateApsAppUserProfile($input: UpdateApsAppUserProfileInput!) {
    updateApsAppUserProfile(input: $input) {
      id
    }
  }
`;

const CREATE_APP_USER = /* GraphQL */ `
  mutation CreateApsAppUser($input: CreateApsAppUserInput!) {
    createApsAppUser(input: $input) {
      id
      registrantId
    }
  }
`;

const CREATE_APP_USER_PROFILE = /* GraphQL */ `
  mutation CreateApsAppUserProfile($input: CreateApsAppUserProfileInput!) {
    createApsAppUserProfile(input: $input) {
      id
      userId
    }
  }
`;

const CREATE_TEMP_CREDENTIAL = /* GraphQL */ `
  mutation CreateApsTempCredential($input: CreateApsTempCredentialInput!) {
    createApsTempCredential(input: $input) {
      id
      apsID
      registrantId
      email
      expiresAt
      createdAt
    }
  }
`;

const TEMP_CREDENTIALS_BY_APS = /* GraphQL */ `
  query ListApsTempCredentials(
    $filter: ModelApsTempCredentialFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsTempCredentials(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        apsID
        registrantId
        email
        tempPasswordCiphertext
        tempPasswordIv
        tempPasswordTag
        expiresAt
        createdAt
      }
      nextToken
    }
  }
`;

const TEMP_CREDENTIALS_BY_REGISTRANT = /* GraphQL */ `
  query ApsTempCredentialsByRegistrantIdAndCreatedAt(
    $registrantId: ID!
    $sortDirection: ModelSortDirection
    $limit: Int
    $nextToken: String
  ) {
    apsTempCredentialsByRegistrantIdAndCreatedAt(
      registrantId: $registrantId
      sortDirection: $sortDirection
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        registrantId
        email
        tempPasswordCiphertext
        tempPasswordIv
        tempPasswordTag
        createdAt
        expiresAt
      }
      nextToken
    }
  }
`;

const GET_APS_COMPANIES = /* GraphQL */ `
  query GetAPS($id: ID!) {
    getAPS(id: $id) {
      id
      companies(limit: 1000) {
        items {
          id
          aPSCompany {
            id
            name
            email
            type
          }
        }
        nextToken
      }
    }
  }
`;

const LIST_ADDONS_BY_EVENT = /* GraphQL */ `
  query ListApsAddOns(
    $filter: ModelApsAddOnFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsAddOns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        subheadline
        location
        date
        time
        company
        altLink
        type
        limit
        eventId
      }
      nextToken
    }
  }
`;

const LIST_REGISTRANTS_BY_APS = /* GraphQL */ `
  query ListApsRegistrants(
    $filter: ModelApsRegistrantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsRegistrants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        phone
        companyId
        company {
          id
          name
        }
        jobTitle
        attendeeType
        status
        registrationEmailSent
        welcomeEmailSent
        appUser {
          id
          profile {
            id
            thinkificId
            apcProgress
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

const APS_REGISTRANTS_BY_APS_ID = /* GraphQL */ `
  query ApsRegistrantsByApsID($apsID: ID!, $limit: Int, $nextToken: String) {
    apsRegistrantsByApsID(apsID: $apsID, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        phone
        companyId
        company {
          id
          name
        }
        jobTitle
        attendeeType
        status
        registrationEmailSent
        welcomeEmailSent
        appUser {
          id
          profile {
            id
            thinkificId
            apcProgress
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

const GET_REGISTRANT = /* GraphQL */ `
  query GetApsRegistrant($id: ID!) {
    getApsRegistrant(id: $id) {
      id
      apsID
      firstName
      lastName
      email
      phone
      companyId
      company {
        id
        name
        email
        website
        type
        logo
      }
      jobTitle
      attendeeType
      status
      termsAccepted
      interests
      otherInterest
      buyerQuestion
      packagingChallenge
      certification
      billingAddressFirstName
      billingAddressLastName
      billingAddressEmail
      billingAddressPhone
      billingAddressStreet
      billingAddressCity
      billingAddressState
      billingAddressZip
      sameAsAttendee
      speakerTopic
      learningObjectives
      totalAmount
      discountCode
      paymentConfirmation
      registrationEmailSent
      registrationEmailSentDate
      registrationEmailReceived
      registrationEmailReceivedDate
      welcomeEmailSent
      welcomeEmailSentDate
      welcomeEmailReceived
      welcomeEmailReceivedDate
      paymentMethod
      paymentLast4
      invoice
      approvedAt
      headshot
      presentation
      presentationTitle
      presentationSummary
      bio
      qrCode
      createdAt
      updatedAt
      appUser {
        id
        registrantId
        profile {
          id
          userId
          firstName
          lastName
          email
          phone
          company
          jobTitle
          attendeeType
          profilePicture
          bio
          linkedin
          twitter
          facebook
          instagram
          youtube
          website
          location
          resume
        }
      }
    }
  }
`;

const LIST_PROFILE_AFFILIATES = /* GraphQL */ `
  query ListProfileAffiliates(
    $filter: ModelProfileAffiliateFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfileAffiliates(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        affiliate
        role
        startDate
        endDate
      }
      nextToken
    }
  }
`;

const LIST_PROFILE_EDUCATION = /* GraphQL */ `
  query ListProfileEducations(
    $filter: ModelProfileEducationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfileEducations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        school
        degree
        fieldOfStudy
      }
      nextToken
    }
  }
`;

const LIST_PROFILE_INTERESTS = /* GraphQL */ `
  query ListProfileInterests(
    $filter: ModelProfileInterestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfileInterests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        interest
      }
      nextToken
    }
  }
`;

const LIST_APP_USER_PHOTOS = /* GraphQL */ `
  query ListApsAppUserPhotos(
    $filter: ModelApsAppUserPhotoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsAppUserPhotos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
      }
      nextToken
    }
  }
`;

const LIST_APP_USER_NOTES = /* GraphQL */ `
  query ListApsAppUserNotes(
    $filter: ModelApsAppUserNoteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsAppUserNotes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
      }
      nextToken
    }
  }
`;

const LIST_APP_USER_CONTACTS = /* GraphQL */ `
  query ListApsAppUserContacts(
    $filter: ModelApsAppUserContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsAppUserContacts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
      }
      nextToken
    }
  }
`;

const LIST_APP_USER_LEADS = /* GraphQL */ `
  query ListApsAppUserLeads(
    $filter: ModelApsAppUserLeadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsAppUserLeads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
      }
      nextToken
    }
  }
`;

const LIST_APP_USER_SESSION_QUESTIONS = /* GraphQL */ `
  query ListApsAppSessionQuestions(
    $filter: ModelApsAppSessionQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsAppSessionQuestions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
      }
      nextToken
    }
  }
`;

const LIST_APP_USER_EXHIBITOR_DEALS = /* GraphQL */ `
  query ListApsAppExhibitorDeals(
    $filter: ModelApsAppExhibitorDealFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsAppExhibitorDeals(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
      }
      nextToken
    }
  }
`;

const LIST_DM_MESSAGES = /* GraphQL */ `
  query ListApsDmMessages(
    $filter: ModelApsDmMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApsDmMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
      }
      nextToken
    }
  }
`;

const LIST_REGISTRANT_ADDON_REQUESTS = /* GraphQL */ `
  query ListRegistrantAddOnRequests(
    $filter: ModelRegistrantAddOnRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRegistrantAddOnRequests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
      }
      nextToken
    }
  }
`;

const LIST_APS_SPEAKERS = /* GraphQL */ `
  query ListAPSSpeakers(
    $filter: ModelAPSSpeakerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAPSSpeakers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        profileId
      }
      nextToken
    }
  }
`;

const SESSION_SPEAKERS_BY_SPEAKER_ID = /* GraphQL */ `
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
`;

// Types for companies and addons
export type Company = {
  id: string;
  name: string;
  email: string;
  type: string | null;
};

export type Registrant = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  companyId?: string | null;
  company?: {
    id: string;
    name: string;
  } | null;
  jobTitle?: string | null;
  attendeeType: string;
  status: string;
  registrationEmailSent?: boolean | null;
  welcomeEmailSent?: boolean | null;
  appUser?: {
    id: string;
    profile?: {
      id: string;
      thinkificId?: number | null;
      apcProgress?: number | null;
    } | null;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type ProfileAffiliate = {
  id: string;
  affiliate?: string | null;
  role?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

export type ProfileEducation = {
  id: string;
  school?: string | null;
  degree?: string | null;
  fieldOfStudy?: string | null;
};

export type ProfileInterest = {
  id: string;
  interest?: string | null;
};

export type ApsAppUserProfile = {
  id: string;
  userId: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  jobTitle?: string | null;
  attendeeType?: string | null;
  profilePicture?: string | null;
  bio?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  youtube?: string | null;
  website?: string[] | null;
  location?: string | null;
  resume?: string | null;
  affiliates?: {
    items?: ProfileAffiliate[];
  } | null;
  education?: {
    items?: ProfileEducation[];
  } | null;
  interests?: {
    items?: ProfileInterest[];
  } | null;
};

export type ApsAppUser = {
  id: string;
  registrantId: string;
  profile?: ApsAppUserProfile | null;
};

export type RegistrantDetail = Registrant & {
  apsID: string;
  termsAccepted?: boolean | null;
  interests?: string[] | null;
  otherInterest?: string | null;
  buyerQuestion?: string | null;
  packagingChallenge?: string | null;
  certification?: string | null;
  speedNetworking?: boolean | null;
  speedNetworkingStatus?: string | null;
  billingAddressFirstName?: string | null;
  billingAddressLastName?: string | null;
  billingAddressEmail?: string | null;
  billingAddressPhone?: string | null;
  billingAddressStreet?: string | null;
  billingAddressCity?: string | null;
  billingAddressState?: string | null;
  billingAddressZip?: string | null;
  sameAsAttendee?: boolean | null;
  speakerTopic?: string | null;
  learningObjectives?: string | null;
  totalAmount?: number | null;
  discountCode?: string | null;
  morrisetteTransportation?: string | null;
  morrisetteStatus?: string | null;
  aristoTransportation?: string | null;
  aristoStatus?: string | null;
  magnaTransportation?: string | null;
  magnaStatus?: string | null;
  paymentConfirmation?: string | null;
  registrationEmailSent?: boolean | null;
  registrationEmailSentDate?: string | null;
  registrationEmailReceived?: boolean | null;
  registrationEmailReceivedDate?: string | null;
  welcomeEmailSent?: boolean | null;
  welcomeEmailSentDate?: string | null;
  welcomeEmailReceived?: boolean | null;
  welcomeEmailReceivedDate?: string | null;
  paymentMethod?: string | null;
  paymentLast4?: string | null;
  invoice?: string | null;
  approvedAt?: string | null;
  headshot?: string | null;
  presentation?: string | null;
  presentationTitle?: string | null;
  presentationSummary?: string | null;
  bio?: string | null;
  qrCode?: string | null;
  company?: {
    id: string;
    name: string;
    email: string;
    website?: string | null;
    type?: string | null;
    logo?: string | null;
  } | null;
  appUser?: ApsAppUser | null;
};

export type AddOn = {
  id: string;
  title: string;
  description: string;
  subheadline: string | null;
  location: string;
  date: string;
  time: string;
  company: string;
  altLink: string | null;
  type: string | null;
  limit: number | null;
  eventId: string;
};

/**
 * Fetch all companies for an event
 */
export async function fetchCompaniesByEventId(
  eventId: string,
): Promise<Company[]> {
  const response = await requestGraphQL<{
    getAPS?: {
      companies?: {
        items?: Array<{ aPSCompany?: Company | null } | null> | null;
      } | null;
    } | null;
  }>(GET_APS_COMPANIES, { id: eventId });

  const items = response.getAPS?.companies?.items ?? [];
  return items.map((item) => item?.aPSCompany).filter(Boolean) as Company[];
}

/**
 * Fetch all addons for an event
 */
export async function fetchAddOnsByEventId(eventId: string): Promise<AddOn[]> {
  const allAddOns: AddOn[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const response: {
      listApsAddOns?: {
        items?: AddOn[];
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL<{
      listApsAddOns?: {
        items?: AddOn[];
        nextToken?: string | null;
      } | null;
    }>(LIST_ADDONS_BY_EVENT, {
      filter: { eventId: { eq: eventId } },
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const items = response.listApsAddOns?.items || [];
    allAddOns.push(...items);
    nextToken = response.listApsAddOns?.nextToken;

    if (nextToken) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  } while (nextToken);

  return allAddOns;
}

/**
 * Create a new registrant
 */
export async function createRegistrant(
  input: {
    apsID: string;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    phone?: string | null;
    companyId?: string | null;
    jobTitle?: string | null;
    attendeeType:
      | 'OEM'
      | 'TIER1'
      | 'SOLUTIONPROVIDER'
      | 'SPONSOR'
      | 'SPEAKER'
      | 'STAFF'
      | 'EXHIBITOR';
    termsAccepted?: boolean | null;
    interests?: string[] | null;
    otherInterest?: string | null;
    speedNetworking?: boolean | null;
    speedNetworkingStatus?: string | null;
    billingAddressFirstName?: string | null;
    billingAddressLastName?: string | null;
    billingAddressEmail?: string | null;
    billingAddressPhone?: string | null;
    billingAddressStreet?: string | null;
    billingAddressCity?: string | null;
    billingAddressState?: string | null;
    billingAddressZip?: string | null;
    sameAsAttendee?: boolean | null;
    speakerTopic?: string | null;
    learningObjectives?: string | null;
    totalAmount?: number | null;
    discountCode?: string | null;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    morrisetteTransportation?: string | null;
    morrisetteStatus?: string | null;
    aristoTransportation?: string | null;
    aristoStatus?: string | null;
    magnaTransportation?: string | null;
    magnaStatus?: string | null;
    paymentConfirmation?: string | null;
    registrationEmailSent?: boolean | null;
    registrationEmailSentDate?: string | null;
    registrationEmailReceived?: boolean | null;
    registrationEmailReceivedDate?: string | null;
    welcomeEmailSent?: boolean | null;
    welcomeEmailSentDate?: string | null;
    welcomeEmailReceived?: boolean | null;
    welcomeEmailReceivedDate?: string | null;
    paymentMethod?: string | null;
    paymentLast4?: string | null;
    approvedAt?: string | null;
    headshot?: string | null;
    presentation?: string | null;
    presentationTitle?: string | null;
    presentationSummary?: string | null;
    bio?: string | null;
  },
  opts?: { jwt?: string },
): Promise<{
  id: string;
  email: string;
  companyId: string | null;
  tempPassword: string | null;
}> {
  // #region agent log (debug)
  fetch('http://127.0.0.1:7243/ingest/8e54769f-f43d-46b6-abd8-6d9007eecefc', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId: 'debug-session',
      runId: 'pre-fix',
      hypothesisId: 'A',
      location: 'app/actions/registrants.ts:createRegistrant:entry',
      message: 'createRegistrant called (server action)',
      data: {
        hasCompanyId: !!input.companyId,
        hasEmail: !!input.email,
        attendeeType: input.attendeeType,
        status: input.status,
      },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion agent log (debug)

  const authOpts = opts?.jwt
    ? { authMode: 'userPools' as const, jwt: opts.jwt }
    : undefined;

  // First, create the registrant to get the ID
  const result = await requestGraphQL<{
    createApsRegistrant?: {
      id: string;
      email: string;
      companyId: string | null;
    };
  }>(CREATE_REGISTRANT, { input }, authOpts);

  if (!result.createApsRegistrant) {
    throw new Error('Failed to create registrant');
  }

  const registrantId = result.createApsRegistrant.id;

  const { sub: appUserId, tempPassword } =
    await ensureCognitoUserForRegistrantEmail(input.email);

  if (input.companyId) {
    const attachedCompanies = await fetchCompaniesByEventId(input.apsID);
    const alreadyAttached = attachedCompanies.some(
      (company) => company.id === input.companyId,
    );
    if (!alreadyAttached) {
      await ensureCompanyAttachedToEvent({
        eventId: input.apsID,
        companyId: input.companyId,
        jwt: opts?.jwt ?? null,
      });
    }
  }

  // Create ApsAppUser for this registrant (strict; required for bidirectional querying)
  const appUserResult = await requestGraphQL<{
    createApsAppUser?: { id: string; registrantId: string };
  }>(
    CREATE_APP_USER,
    {
      input: {
        id: appUserId,
        registrantId,
      },
    },
    authOpts,
  );

  if (!appUserResult.createApsAppUser?.id) {
    throw new Error('Failed to create ApsAppUser for registrant');
  }

  // Link registrant -> appUser (strict; required for registrant.appUser resolver)
  const linkRegistrantResult = await requestGraphQL<{
    updateApsRegistrant?: { id: string; appUserId?: string | null };
  }>(
    UPDATE_REGISTRANT,
    {
      input: {
        id: registrantId,
        appUserId,
      },
    },
    authOpts,
  );

  if (!linkRegistrantResult.updateApsRegistrant?.id) {
    throw new Error('Failed to attach appUserId to registrant');
  }

  // Create ApsAppUserProfile with matching data from registrant (strict; required for user.profile resolver)
  // Get company name if companyId is provided
  let companyNameForProfile: string | null = null;
  if (input.companyId) {
    try {
      const companyResult = await requestGraphQL<{
        getAPSCompany?: { name: string };
      }>(GET_COMPANY, { id: input.companyId }, authOpts);
      companyNameForProfile = companyResult.getAPSCompany?.name || null;
    } catch (error) {
      console.warn('Failed to fetch company name for profile:', error);
    }
  }

  const locationParts = [
    input.billingAddressCity,
    input.billingAddressState,
    input.billingAddressZip,
  ]
    .map((value) => (typeof value === 'string' ? value.trim() : ''))
    .filter(Boolean);
  const profileLocation =
    locationParts.length > 0 ? locationParts.join(', ') : null;

  const profileResult = await requestGraphQL<{
    createApsAppUserProfile?: { id: string; userId: string };
  }>(
    CREATE_APP_USER_PROFILE,
    {
      input: {
        userId: appUserId,
        firstName: input.firstName || null,
        lastName: input.lastName || null,
        email: input.email,
        phone: input.phone || null,
        company: companyNameForProfile || null,
        jobTitle: input.jobTitle || null,
        attendeeType: input.attendeeType || null,
        location: profileLocation,
        // Other fields will be filled in by the user later
      },
    },
    authOpts,
  );

  if (!profileResult.createApsAppUserProfile?.id) {
    throw new Error('Failed to create ApsAppUserProfile for app user');
  }

  const profileId = profileResult.createApsAppUserProfile.id;

  // Link appUser -> profile (strict; required for appUser.profile resolver)
  const linkUserResult = await requestGraphQL<{
    updateApsAppUser?: { id: string; profileId?: string | null };
  }>(
    UPDATE_APP_USER,
    {
      input: {
        id: appUserId,
        profileId,
      },
    },
    authOpts,
  );

  if (!linkUserResult.updateApsAppUser?.id) {
    throw new Error('Failed to attach profileId to app user');
  }

  if (input.attendeeType === 'SPEAKER') {
    try {
      const { createSpeakerFromRegistrantId } =
        await import('@/app/actions/speakers');
      await createSpeakerFromRegistrantId({
        eventId: input.apsID,
        registrantId,
      });
    } catch (error) {
      console.error('Failed to create APSSpeaker for registrant:', error);
      throw error;
    }
  }

  await storeTempPassword({
    apsID: input.apsID,
    registrantId,
    email: input.email,
    tempPassword,
    jwt: opts?.jwt,
  });

  // Generate and upload QR code (best-effort)
  try {
    const { generateAndUploadQRCode } = await import('@/lib/qrcode-storage');
    const qrCodeUrl = await generateAndUploadQRCode(registrantId, {
      firstName: input.firstName ?? null,
      lastName: input.lastName ?? null,
      email: input.email,
      phone: input.phone ?? null,
      company: companyNameForProfile ?? null,
      jobTitle: input.jobTitle ?? null,
    });

    // Update the registrant with the QR code URL
    await requestGraphQL<{
      updateApsRegistrant?: { id: string; qrCode: string | null };
    }>(
      UPDATE_REGISTRANT,
      {
        input: {
          id: registrantId,
          qrCode: qrCodeUrl,
        },
      },
      authOpts,
    );
  } catch (error) {
    console.error('Failed to generate QR code for registrant:', error);
    // Don't fail the entire operation if QR code generation fails
    // The registrant + app user + profile are already created and linked
  }

  return {
    ...result.createApsRegistrant,
    tempPassword,
  };
}

export async function exportTempCredentialsByApsId(apsId: string): Promise<
  Array<{
    registrantId: string;
    email: string;
    tempPassword: string;
    createdAt?: string | null;
    expiresAt?: number | null;
  }>
> {
  const records: Array<{
    registrantId: string;
    email: string;
    tempPassword: string;
    createdAt?: string | null;
    expiresAt?: number | null;
  }> = [];
  let nextToken: string | null | undefined = null;
  do {
    const response: {
      listApsTempCredentials?: {
        items?: Array<{
          registrantId: string;
          email: string;
          tempPasswordCiphertext: string;
          tempPasswordIv: string;
          tempPasswordTag: string;
          expiresAt?: number | null;
          createdAt?: string | null;
        } | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(TEMP_CREDENTIALS_BY_APS, {
      filter: { apsID: { eq: apsId } },
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const items = response.listApsTempCredentials?.items ?? [];
    for (const item of items) {
      if (!item) continue;
      const tempPassword = decryptTempPassword({
        tempPasswordCiphertext: item.tempPasswordCiphertext,
        tempPasswordIv: item.tempPasswordIv,
        tempPasswordTag: item.tempPasswordTag,
      });
      records.push({
        registrantId: item.registrantId,
        email: item.email,
        tempPassword,
        createdAt: item.createdAt ?? null,
        expiresAt: item.expiresAt ?? null,
      });
    }

    nextToken = response.listApsTempCredentials?.nextToken ?? null;
  } while (nextToken);

  return records;
}

/**
 * Fetch all registrants for an APS event
 */
export async function fetchRegistrantsByApsId(
  apsId: string,
): Promise<Registrant[]> {
  const allRegistrants: Registrant[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const response: {
      listApsRegistrants?: {
        items?: Registrant[];
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL<{
      listApsRegistrants?: {
        items?: Registrant[];
        nextToken?: string | null;
      } | null;
    }>(LIST_REGISTRANTS_BY_APS, {
      filter: { apsID: { eq: apsId } },
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const items = response.listApsRegistrants?.items || [];
    allRegistrants.push(...items);
    nextToken = response.listApsRegistrants?.nextToken;

    if (nextToken) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  } while (nextToken);

  // Sort by createdAt descending (latest first)
  return allRegistrants.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });
}

export async function fetchRegistrantsByApsIdPage(
  apsId: string,
  opts?: { limit?: number; nextToken?: string | null },
): Promise<{ items: Registrant[]; nextToken?: string | null }> {
  const response = await requestGraphQL<{
    apsRegistrantsByApsID?: {
      items?: Array<Registrant | null> | null;
      nextToken?: string | null;
    } | null;
  }>(APS_REGISTRANTS_BY_APS_ID, {
    apsID: apsId,
    limit: opts?.limit ?? 50,
    nextToken: opts?.nextToken ?? undefined,
  });

  const items = (response.apsRegistrantsByApsID?.items ?? []).filter(
    Boolean,
  ) as Registrant[];

  // Best-effort: sort the page by createdAt descending.
  items.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  return {
    items,
    nextToken: response.apsRegistrantsByApsID?.nextToken ?? null,
  };
}

/**
 * Fetch a single registrant by ID
 */
export async function fetchRegistrantById(
  id: string,
): Promise<RegistrantDetail | null> {
  try {
    const response = await requestGraphQL<{
      getApsRegistrant?: RegistrantDetail | null;
    }>(GET_REGISTRANT, { id });

    const registrant = response.getApsRegistrant;
    if (!registrant) {
      return null;
    }

    // If there's an appUser with a profile, fetch the nested relationships
    if (registrant.appUser?.profile?.id) {
      const profileId = registrant.appUser.profile.id;

      // Fetch affiliates
      try {
        const affiliatesResponse = await requestGraphQL<{
          listProfileAffiliates?: {
            items?: ProfileAffiliate[];
            nextToken?: string | null;
          } | null;
        }>(LIST_PROFILE_AFFILIATES, {
          filter: { profileId: { eq: profileId } },
          limit: 1000,
        });

        if (registrant.appUser.profile) {
          registrant.appUser.profile.affiliates = {
            items: affiliatesResponse.listProfileAffiliates?.items || [],
          };
        }
      } catch (error) {
        console.error('Failed to fetch profile affiliates:', error);
      }

      // Fetch education
      try {
        const educationResponse = await requestGraphQL<{
          listProfileEducations?: {
            items?: ProfileEducation[];
            nextToken?: string | null;
          } | null;
        }>(LIST_PROFILE_EDUCATION, {
          filter: { profileId: { eq: profileId } },
          limit: 1000,
        });

        if (registrant.appUser.profile) {
          registrant.appUser.profile.education = {
            items: educationResponse.listProfileEducations?.items || [],
          };
        }
      } catch (error) {
        console.error('Failed to fetch profile education:', error);
      }

      // Fetch interests
      try {
        const interestsResponse = await requestGraphQL<{
          listProfileInterests?: {
            items?: ProfileInterest[];
            nextToken?: string | null;
          } | null;
        }>(LIST_PROFILE_INTERESTS, {
          filter: { profileId: { eq: profileId } },
          limit: 1000,
        });

        if (registrant.appUser.profile) {
          registrant.appUser.profile.interests = {
            items: interestsResponse.listProfileInterests?.items || [],
          };
        }
      } catch (error) {
        console.error('Failed to fetch profile interests:', error);
      }
    }

    return registrant;
  } catch (error) {
    console.error(`Failed to fetch registrant ${id}:`, error);
    return null;
  }
}

type ActionState = {
  ok: boolean;
  message: string;
};

function readStringField(
  formData: FormData,
  key: string,
): string | null | undefined {
  const value = formData.get(key);
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
}

function readStringArrayField(
  formData: FormData,
  key: string,
): string[] | null | undefined {
  const value = readStringField(formData, key);
  if (value === undefined) return undefined;
  if (value === null) return null;
  const list = value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
  return list.length > 0 ? list : null;
}

async function listAllIds(
  query: string,
  responseKey: string,
  filter: Record<string, unknown>,
): Promise<string[]> {
  const ids: string[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const response = await requestGraphQL<Record<string, unknown>>(query, {
      filter,
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const listResult = response?.[responseKey] as
      | {
          items?: Array<{ id?: string | null } | null> | null;
          nextToken?: string | null;
        }
      | null
      | undefined;

    const items = listResult?.items ?? [];
    for (const item of items) {
      if (item?.id) {
        ids.push(item.id);
      }
    }
    nextToken = listResult?.nextToken ?? null;

    if (nextToken) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  } while (nextToken);

  return ids;
}

async function listSessionSpeakerIdsBySpeakerId(
  speakerId: string,
): Promise<string[]> {
  const ids: string[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const response: {
      sessionSpeakersByAPSSpeakerId?: {
        items?: Array<{ id?: string | null } | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(SESSION_SPEAKERS_BY_SPEAKER_ID, {
      aPSSpeakerId: speakerId,
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const items = response.sessionSpeakersByAPSSpeakerId?.items ?? [];
    for (const item of items) {
      if (item?.id) ids.push(item.id);
    }
    nextToken = response.sessionSpeakersByAPSSpeakerId?.nextToken ?? null;

    if (nextToken) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  } while (nextToken);

  return ids;
}

async function findSpeakerIdForRegistrant(
  eventId: string,
  profileId: string,
): Promise<string | null> {
  let nextToken: string | null | undefined = null;

  do {
    const response: {
      listAPSSpeakers?: {
        items?: Array<{ id?: string | null; profileId?: string | null } | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(LIST_APS_SPEAKERS, {
      filter: { eventId: { eq: eventId } },
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const items = response.listAPSSpeakers?.items ?? [];
    for (const item of items) {
      if (!item?.id || !item.profileId) continue;
      if (item.profileId === profileId) {
        return item.id;
      }
    }

    nextToken = response.listAPSSpeakers?.nextToken ?? null;
  } while (nextToken);

  return null;
}

async function deleteIds(
  ids: Iterable<string>,
  mutation: string,
  label: string,
): Promise<void> {
  for (const id of ids) {
    try {
      await requestGraphQL(mutation, { input: { id } });
    } catch (error) {
      console.error(`Failed to delete ${label} ${id}:`, error);
      throw error;
    }
  }
}

async function ensureRegistrantIdentityArtifacts(params: {
  registrant: RegistrantDetail;
  jwt?: string;
}): Promise<{ tempPassword: string | null; profileId: string | null }> {
  const { registrant, jwt } = params;
  const authOpts = jwt ? { authMode: 'userPools' as const, jwt } : undefined;

  const { sub: cognitoSub, tempPassword } =
    await ensureCognitoUserForRegistrantEmail(registrant.email);

  if (registrant.companyId) {
    const attachedCompanies = await fetchCompaniesByEventId(registrant.apsID);
    const alreadyAttached = attachedCompanies.some(
      (company) => company.id === registrant.companyId,
    );
    if (!alreadyAttached) {
      await ensureCompanyAttachedToEvent({
        eventId: registrant.apsID,
        companyId: registrant.companyId,
        jwt: jwt ?? null,
      });
    }
  }

  const appUserId = registrant.appUser?.id ?? cognitoSub;

  if (!registrant.appUser?.id) {
    const appUserResult = await requestGraphQL<{
      createApsAppUser?: { id: string; registrantId: string };
    }>(
      CREATE_APP_USER,
      {
        input: {
          id: appUserId,
          registrantId: registrant.id,
        },
      },
      authOpts,
    );

    if (!appUserResult.createApsAppUser?.id) {
      throw new Error('Failed to create ApsAppUser for registrant');
    }

    const linkRegistrantResult = await requestGraphQL<{
      updateApsRegistrant?: { id: string; appUserId?: string | null };
    }>(
      UPDATE_REGISTRANT,
      {
        input: {
          id: registrant.id,
          appUserId,
        },
      },
      authOpts,
    );

    if (!linkRegistrantResult.updateApsRegistrant?.id) {
      throw new Error('Failed to attach appUserId to registrant');
    }
  }

  let profileId = registrant.appUser?.profile?.id ?? null;

  if (!profileId) {
    let companyNameForProfile: string | null = null;
    if (registrant.companyId) {
      try {
        const companyResult = await requestGraphQL<{
          getAPSCompany?: { name: string };
        }>(GET_COMPANY, { id: registrant.companyId }, authOpts);
        companyNameForProfile = companyResult.getAPSCompany?.name || null;
      } catch (error) {
        console.warn('Failed to fetch company name for profile:', error);
      }
    }

    const locationParts = [
      registrant.billingAddressCity,
      registrant.billingAddressState,
      registrant.billingAddressZip,
    ]
      .map((value) => (typeof value === 'string' ? value.trim() : ''))
      .filter(Boolean);
    const profileLocation =
      locationParts.length > 0 ? locationParts.join(', ') : null;

    const profileResult = await requestGraphQL<{
      createApsAppUserProfile?: { id: string; userId: string };
    }>(
      CREATE_APP_USER_PROFILE,
      {
        input: {
          userId: appUserId,
          firstName: registrant.firstName || null,
          lastName: registrant.lastName || null,
          email: registrant.email,
          phone: registrant.phone || null,
          company: companyNameForProfile || null,
          jobTitle: registrant.jobTitle || null,
          attendeeType: registrant.attendeeType || null,
          location: profileLocation,
        },
      },
      authOpts,
    );

    if (!profileResult.createApsAppUserProfile?.id) {
      throw new Error('Failed to create ApsAppUserProfile for app user');
    }

    profileId = profileResult.createApsAppUserProfile.id;

    const linkUserResult = await requestGraphQL<{
      updateApsAppUser?: { id: string; profileId?: string | null };
    }>(
      UPDATE_APP_USER,
      {
        input: {
          id: appUserId,
          profileId,
        },
      },
      authOpts,
    );

    if (!linkUserResult.updateApsAppUser?.id) {
      throw new Error('Failed to attach profileId to app user');
    }

    if (registrant.attendeeType === 'SPEAKER') {
      const { createSpeakerFromRegistrantId } =
        await import('@/app/actions/speakers');
      await createSpeakerFromRegistrantId({
        eventId: registrant.apsID,
        registrantId: registrant.id,
      });
    }
  }

  await storeTempPassword({
    apsID: registrant.apsID,
    registrantId: registrant.id,
    email: registrant.email,
    tempPassword,
    jwt,
  });

  if (!registrant.qrCode && profileId) {
    try {
      const { generateAndUploadQRCode } = await import('@/lib/qrcode-storage');
      const qrCodeUrl = await generateAndUploadQRCode(registrant.id, {
        firstName: registrant.firstName ?? null,
        lastName: registrant.lastName ?? null,
        email: registrant.email,
        phone: registrant.phone ?? null,
        company: registrant.company?.name ?? null,
        jobTitle: registrant.jobTitle ?? null,
      });
      await requestGraphQL(
        UPDATE_REGISTRANT,
        {
          input: {
            id: registrant.id,
            qrCode: qrCodeUrl,
          },
        },
        authOpts,
      );
    } catch (error) {
      console.error('Failed to generate QR code for registrant:', error);
    }
  }

  return { tempPassword, profileId };
}

export async function updateRegistrant(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const registrantId = readStringField(formData, 'registrantId');
    const eventId = readStringField(formData, 'eventId');
    if (!registrantId) {
      return { ok: false, message: 'Missing registrant id.' };
    }

    const input: Record<string, unknown> = { id: registrantId };
    const fields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'jobTitle',
      'attendeeType',
      'status',
      'bio',
      'billingAddressFirstName',
      'billingAddressLastName',
      'billingAddressEmail',
      'billingAddressPhone',
      'billingAddressStreet',
      'billingAddressCity',
      'billingAddressState',
      'billingAddressZip',
    ];

    for (const field of fields) {
      const value = readStringField(formData, field);
      if (value !== undefined) {
        input[field] = value;
      }
    }

    await requestGraphQL(UPDATE_REGISTRANT, { input });

    if (eventId) {
      revalidatePath(`/aps/${eventId}`);
      revalidatePath(`/aps/${eventId}/registrants/${registrantId}`);
    }

    return { ok: true, message: 'Registrant updated.' };
  } catch (error) {
    console.error('Failed to update registrant:', error);
    return { ok: false, message: 'Failed to update registrant.' };
  }
}

export async function updateAppUserProfile(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const profileId = readStringField(formData, 'profileId');
    const eventId = readStringField(formData, 'eventId');
    const registrantId = readStringField(formData, 'registrantId');
    const attendeeType = readStringField(formData, 'attendeeType');
    if (!profileId) {
      return { ok: false, message: 'Missing profile id.' };
    }

    const input: Record<string, unknown> = { id: profileId };
    const fields = [
      'firstName',
      'lastName',
      'phone',
      'company',
      'jobTitle',
      'attendeeType',
      'profilePicture',
      'bio',
      'linkedin',
      'twitter',
      'facebook',
      'instagram',
      'youtube',
      'location',
    ];

    for (const field of fields) {
      const value = readStringField(formData, field);
      if (value !== undefined) {
        input[field] = value;
      }
    }

    const website = readStringArrayField(formData, 'website');
    if (website !== undefined) {
      input.website = website;
    }

    await requestGraphQL(UPDATE_APP_USER_PROFILE, { input });

    // Keep registrant attendee type in sync when edited from profile form.
    if (registrantId && attendeeType) {
      await requestGraphQL(UPDATE_REGISTRANT, {
        input: {
          id: registrantId,
          attendeeType,
        },
      });
    }

    if (eventId && registrantId) {
      revalidatePath(`/aps/${eventId}`);
      revalidatePath(`/aps/${eventId}/registrants/${registrantId}`);
      revalidatePath(`/aps/${eventId}/speakers`);
    }

    return { ok: true, message: 'App user profile updated.' };
  } catch (error) {
    console.error('Failed to update app user profile:', error);
    return { ok: false, message: 'Failed to update app user profile.' };
  }
}

export async function sendWelcomeEmail(params: {
  registrantId: string;
  eventId: string;
  jwt?: string | null;
}): Promise<ActionState> {
  try {
    const registrant = await fetchRegistrantById(params.registrantId);
    if (!registrant) {
      return { ok: false, message: 'Registrant not found.' };
    }

    return await sendWelcomeEmailAndMarkSent({
      registrant,
      eventId: params.eventId,
      jwt: params.jwt ?? null,
    });
  } catch (error) {
    console.error('Failed to send welcome email action:', error);
    return { ok: false, message: 'Failed to send welcome email.' };
  }
}

export async function updateRegistrantEmailSync(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const registrantId = readStringField(formData, 'registrantId');
    const profileId = readStringField(formData, 'profileId');
    const eventId = readStringField(formData, 'eventId');
    const email = readStringField(formData, 'email');

    if (!registrantId) {
      return { ok: false, message: 'Missing registrant id.' };
    }

    if (!email) {
      return { ok: false, message: 'Email is required.' };
    }

    const normalizedEmail = email.trim().toLowerCase();

    await requestGraphQL(UPDATE_REGISTRANT, {
      input: {
        id: registrantId,
        email: normalizedEmail,
      },
    });

    if (profileId) {
      await requestGraphQL(UPDATE_APP_USER_PROFILE, {
        input: {
          id: profileId,
          email: normalizedEmail,
        },
      });
    }

    if (eventId) {
      revalidatePath(`/aps/${eventId}`);
      revalidatePath(`/aps/${eventId}/registrants/${registrantId}`);
      revalidatePath(`/aps/${eventId}/speakers`);
    }

    return {
      ok: true,
      message: profileId
        ? 'Email updated on registrant and app user profile.'
        : 'Registrant email updated.',
    };
  } catch (error) {
    console.error('Failed to update registrant/profile email:', error);
    return { ok: false, message: 'Failed to update email.' };
  }
}

export async function updateRegistrantCompanyAssignment(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const registrantId = readStringField(formData, 'registrantId');
    const eventId = readStringField(formData, 'eventId');

    if (!registrantId) {
      return { ok: false, message: 'Missing registrant id.' };
    }

    const registrant = await fetchRegistrantById(registrantId);
    if (!registrant) {
      return { ok: false, message: 'Registrant not found.' };
    }

    const companyId = readStringField(formData, 'companyId') ?? null;
    let companyNameForProfile: string | null = null;

    if (companyId) {
      await ensureCompanyAttachedToEvent({
        eventId: registrant.apsID,
        companyId,
      });

      try {
        const companyResult = await requestGraphQL<{
          getAPSCompany?: { name: string } | null;
        }>(GET_COMPANY, { id: companyId });
        companyNameForProfile = companyResult.getAPSCompany?.name ?? null;
      } catch (error) {
        console.warn('Failed to fetch company during registrant company update:', error);
      }
    }

    await requestGraphQL(UPDATE_REGISTRANT, {
      input: {
        id: registrantId,
        companyId,
      },
    });

    if (registrant.appUser?.profile?.id) {
      await requestGraphQL(UPDATE_APP_USER_PROFILE, {
        input: {
          id: registrant.appUser.profile.id,
          company: companyNameForProfile,
        },
      });
    }

    try {
      const { generateAndUploadQRCode } = await import('@/lib/qrcode-storage');
      const qrCodeUrl = await generateAndUploadQRCode(registrantId, {
        firstName: registrant.firstName ?? null,
        lastName: registrant.lastName ?? null,
        email: registrant.email,
        phone: registrant.phone ?? null,
        company: companyNameForProfile,
        jobTitle: registrant.jobTitle ?? null,
      });
      await requestGraphQL(UPDATE_REGISTRANT, {
        input: {
          id: registrantId,
          qrCode: qrCodeUrl,
        },
      });
    } catch (error) {
      console.error('Failed to refresh QR code during company update:', error);
    }

    const effectiveEventId = eventId ?? registrant.apsID;
    if (effectiveEventId) {
      revalidatePath(`/aps/${effectiveEventId}`);
      revalidatePath(`/aps/${effectiveEventId}/registrants/${registrantId}`);
      revalidatePath(`/aps/${effectiveEventId}/companies`);
    }

    return {
      ok: true,
      message: companyNameForProfile
        ? `Company updated to ${companyNameForProfile}.`
        : 'Company assignment cleared.',
    };
  } catch (error) {
    console.error('Failed to update registrant company assignment:', error);
    return { ok: false, message: 'Failed to update company assignment.' };
  }
}

export async function approveRegistrant(params: {
  registrantId: string;
  eventId: string;
  jwt?: string | null;
}): Promise<{ ok: boolean; message: string; tempPassword: string | null }> {
  try {
    const registrant = await fetchRegistrantById(params.registrantId);
    if (!registrant) {
      return {
        ok: false,
        message: 'Registrant not found.',
        tempPassword: null,
      };
    }

    const authOpts = params.jwt
      ? { authMode: 'userPools' as const, jwt: params.jwt }
      : undefined;
    const approvedAt = new Date().toISOString();

    const { tempPassword, profileId } = await ensureRegistrantIdentityArtifacts({
      registrant,
      jwt: params.jwt ?? undefined,
    });

    if (profileId) {
      try {
        const thinkificSummary = await getThinkificRegistrantSummaryByEmail(
          registrant.email,
        );

        if (thinkificSummary.error) {
          console.error(
            `Skipping Thinkific profile sync for registrant ${params.registrantId}: ${thinkificSummary.error}`,
          );
        } else {
          await requestGraphQL(
            UPDATE_APP_USER_PROFILE,
            {
              input: {
                id: profileId,
                thinkificId: thinkificSummary.thinkificUserId,
                apcProgress: Number(
                  thinkificSummary.apcProgramProgress.toFixed(1),
                ),
              },
            },
            authOpts,
          );
        }
      } catch (error) {
        console.error(
          `Failed to sync Thinkific data for registrant ${params.registrantId}:`,
          error,
        );
      }
    }

    await requestGraphQL(
      UPDATE_REGISTRANT,
      {
        input: {
          id: params.registrantId,
          status: 'APPROVED',
          approvedAt,
        },
      },
      authOpts,
    );

    const welcomeResult = await sendWelcomeEmailAndMarkSent({
      registrant: {
        ...registrant,
        status: 'APPROVED',
        approvedAt,
      },
      eventId: params.eventId,
      jwt: params.jwt ?? null,
    });

    revalidatePath(`/aps/${params.eventId}`);
    revalidatePath(`/aps/${params.eventId}/registrants/${params.registrantId}`);

    return {
      ok: true,
      message: welcomeResult.ok
        ? 'Registrant approved and welcome email sent.'
        : 'Registrant approved, but welcome email failed to send.',
      tempPassword,
    };
  } catch (error) {
    console.error('Failed to approve registrant:', error);
    return {
      ok: false,
      message: 'Failed to approve registrant.',
      tempPassword: null,
    };
  }
}

export async function unapproveRegistrant(params: {
  registrantId: string;
  eventId: string;
  jwt?: string | null;
}): Promise<ActionState> {
  try {
    const authOpts = params.jwt
      ? { authMode: 'userPools' as const, jwt: params.jwt }
      : undefined;

    await requestGraphQL(
      UPDATE_REGISTRANT,
      {
        input: {
          id: params.registrantId,
          status: 'PENDING',
          approvedAt: null,
        },
      },
      authOpts,
    );

    revalidatePath(`/aps/${params.eventId}`);
    revalidatePath(`/aps/${params.eventId}/registrants/${params.registrantId}`);
    return { ok: true, message: 'Registrant moved back to pending.' };
  } catch (error) {
    console.error('Failed to unapprove registrant:', error);
    return { ok: false, message: 'Failed to unapprove registrant.' };
  }
}

export async function fetchLatestTempCredentialByRegistrantId(
  registrantId: string,
): Promise<{
  id: string;
  email: string;
  tempPassword: string;
  createdAt?: string | null;
  expiresAt?: number | null;
} | null> {
  try {
    const response: {
      apsTempCredentialsByRegistrantIdAndCreatedAt?: {
        items?: Array<{
          id: string;
          email: string;
          tempPasswordCiphertext: string;
          tempPasswordIv: string;
          tempPasswordTag: string;
          createdAt?: string | null;
          expiresAt?: number | null;
        } | null>;
      } | null;
    } = await requestGraphQL(TEMP_CREDENTIALS_BY_REGISTRANT, {
      registrantId,
      sortDirection: 'DESC',
      limit: 1,
    });

    const item =
      response.apsTempCredentialsByRegistrantIdAndCreatedAt?.items?.[0] ?? null;
    if (!item) return null;

    return {
      id: item.id,
      email: item.email,
      tempPassword: decryptTempPassword({
        tempPasswordCiphertext: item.tempPasswordCiphertext,
        tempPasswordIv: item.tempPasswordIv,
        tempPasswordTag: item.tempPasswordTag,
      }),
      createdAt: item.createdAt ?? null,
      expiresAt: item.expiresAt ?? null,
    };
  } catch (error) {
    console.error(
      `Failed to fetch temp credential for registrant ${registrantId}:`,
      error,
    );
    return null;
  }
}

export async function deleteRegistrantCascade({
  registrantId,
  eventId,
}: {
  registrantId: string;
  eventId?: string | null;
}): Promise<ActionState> {
  try {
    if (!registrantId) {
      return { ok: false, message: 'Missing registrant id.' };
    }

    const registrant = await fetchRegistrantById(registrantId);
    if (!registrant) {
      return { ok: false, message: 'Registrant not found.' };
    }

    const appUserId = registrant.appUser?.id ?? null;
    const profileId = registrant.appUser?.profile?.id ?? null;

    if (profileId) {
      const affiliateIds = await listAllIds(
        LIST_PROFILE_AFFILIATES,
        'listProfileAffiliates',
        { profileId: { eq: profileId } },
      );
      await deleteIds(
        affiliateIds,
        deleteProfileAffiliate,
        'profile affiliate',
      );

      const educationIds = await listAllIds(
        LIST_PROFILE_EDUCATION,
        'listProfileEducations',
        { profileId: { eq: profileId } },
      );
      await deleteIds(
        educationIds,
        deleteProfileEducation,
        'profile education',
      );

      const interestIds = await listAllIds(
        LIST_PROFILE_INTERESTS,
        'listProfileInterests',
        { profileId: { eq: profileId } },
      );
      await deleteIds(interestIds, deleteProfileInterest, 'profile interest');
    }

    const noteIds = new Set<string>();
    if (appUserId) {
      const ids = await listAllIds(LIST_APP_USER_NOTES, 'listApsAppUserNotes', {
        userId: { eq: appUserId },
      });
      ids.forEach((id) => noteIds.add(id));
    }
    if (profileId) {
      const ids = await listAllIds(LIST_APP_USER_NOTES, 'listApsAppUserNotes', {
        profileId: { eq: profileId },
      });
      ids.forEach((id) => noteIds.add(id));
    }
    const registrantNoteIds = await listAllIds(
      LIST_APP_USER_NOTES,
      'listApsAppUserNotes',
      { registrantId: { eq: registrantId } },
    );
    registrantNoteIds.forEach((id) => noteIds.add(id));
    await deleteIds(noteIds, deleteApsAppUserNote, 'app user note');

    const addOnRequestIds = await listAllIds(
      LIST_REGISTRANT_ADDON_REQUESTS,
      'listRegistrantAddOnRequests',
      { registrantId: { eq: registrantId } },
    );
    await deleteIds(
      addOnRequestIds,
      deleteRegistrantAddOnRequest,
      'registrant add-on request',
    );

    const contactIds = new Set<string>();
    if (appUserId) {
      const ids = await listAllIds(
        LIST_APP_USER_CONTACTS,
        'listApsAppUserContacts',
        { userId: { eq: appUserId } },
      );
      ids.forEach((id) => contactIds.add(id));
    }
    if (profileId) {
      const ids = await listAllIds(
        LIST_APP_USER_CONTACTS,
        'listApsAppUserContacts',
        { contactId: { eq: profileId } },
      );
      ids.forEach((id) => contactIds.add(id));
    }
    await deleteIds(contactIds, deleteApsAppUserContact, 'app user contact');

    const leadIds = new Set<string>();
    if (appUserId) {
      const ids = await listAllIds(LIST_APP_USER_LEADS, 'listApsAppUserLeads', {
        userId: { eq: appUserId },
      });
      ids.forEach((id) => leadIds.add(id));
    }
    if (profileId) {
      const ids = await listAllIds(LIST_APP_USER_LEADS, 'listApsAppUserLeads', {
        contactId: { eq: profileId },
      });
      ids.forEach((id) => leadIds.add(id));
    }
    await deleteIds(leadIds, deleteApsAppUserLead, 'app user lead');

    if (appUserId) {
      const photoIds = await listAllIds(
        LIST_APP_USER_PHOTOS,
        'listApsAppUserPhotos',
        { userId: { eq: appUserId } },
      );
      await deleteIds(photoIds, deleteApsAppUserPhoto, 'app user photo');

      const sessionQuestionIds = await listAllIds(
        LIST_APP_USER_SESSION_QUESTIONS,
        'listApsAppSessionQuestions',
        { userId: { eq: appUserId } },
      );
      await deleteIds(
        sessionQuestionIds,
        deleteApsAppSessionQuestion,
        'app session question',
      );

      const exhibitorDealIds = await listAllIds(
        LIST_APP_USER_EXHIBITOR_DEALS,
        'listApsAppExhibitorDeals',
        { userId: { eq: appUserId } },
      );
      await deleteIds(
        exhibitorDealIds,
        deleteApsAppExhibitorDeal,
        'app exhibitor deal',
      );

      const messageIds = await listAllIds(
        LIST_DM_MESSAGES,
        'listApsDmMessages',
        { senderUserId: { eq: appUserId } },
      );
      await deleteIds(messageIds, deleteApsDmMessage, 'dm message');
    }

    const speakerProfileId = registrant.appUser?.profile?.id ?? null;
    const speakerId = speakerProfileId
      ? await findSpeakerIdForRegistrant(registrant.apsID, speakerProfileId)
      : null;
    if (speakerId) {
      const sessionSpeakerIds =
        await listSessionSpeakerIdsBySpeakerId(speakerId);
      await deleteIds(
        sessionSpeakerIds,
        deleteSessionSpeakers,
        'session speaker',
      );

      await requestGraphQL(deleteAPSSpeaker, { input: { id: speakerId } });
    }

    if (profileId) {
      await requestGraphQL(deleteApsAppUserProfile, {
        input: { id: profileId },
      });
    }
    if (appUserId) {
      await requestGraphQL(deleteApsAppUser, { input: { id: appUserId } });
    }

    await deleteCognitoUserByEmail(registrant.email);

    await requestGraphQL(deleteApsRegistrant, { input: { id: registrantId } });

    if (eventId) {
      revalidatePath(`/aps/${eventId}`);
      revalidatePath(`/aps/${eventId}/registrants/${registrantId}`);
    }

    return { ok: true, message: 'Registrant deleted.' };
  } catch (error) {
    console.error('Failed to delete registrant cascade:', error);
    return { ok: false, message: 'Failed to delete registrant.' };
  }
}
