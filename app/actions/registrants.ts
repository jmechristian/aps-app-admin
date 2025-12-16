'use server';

import { requestGraphQL } from '@/lib/appsync';
import amplifyConfig from '@/src/amplifyconfiguration.json';
import {
  AdminCreateUserCommand,
  AdminGetUserCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider';

type CognitoAttr = { Name?: string; Value?: string };

async function ensureCognitoUserForRegistrantEmail(email: string): Promise<{
  sub: string;
  username: string;
}> {
  const region =
    process.env.AWS_REGION ||
    process.env.AWS_DEFAULT_REGION ||
    amplifyConfig.aws_project_region;

  const userPoolId = amplifyConfig.aws_user_pools_id;
  if (!userPoolId) {
    throw new Error(
      'Missing Cognito user pool id in amplifyconfiguration.json'
    );
  }

  // NOTE: This requires AWS credentials in the server environment
  // (AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY or an assumed role).
  // If running locally, your AWS CLI profile/credential chain is fine; if running
  // on a host, attach an IAM role. We intentionally do NOT require env creds here.

  const client = new CognitoIdentityProviderClient({ region });
  const username = email.trim().toLowerCase();
  const suppressInvite =
    process.env.APS_SUPPRESS_COGNITO_INVITES === 'true' ||
    process.env.NEXT_PUBLIC_APS_SUPPRESS_COGNITO_INVITES === 'true';

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
      })
    );

    const attrs = (created.User?.Attributes ?? []) as CognitoAttr[];
    const sub = attrs.find((a: CognitoAttr) => a.Name === 'sub')?.Value;
    if (!sub) throw new Error('Cognito AdminCreateUser did not return sub');
    return { sub, username };
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
        })
      );
      const existingAttrs = (existing.UserAttributes ?? []) as CognitoAttr[];
      const sub = existingAttrs.find(
        (a: CognitoAttr) => a.Name === 'sub'
      )?.Value;
      if (!sub) throw new Error('Cognito user exists but sub not found');
      return { sub, username };
    }
    throw e;
  }
}

function buildProfileQrUrl(profileId: string): string {
  // Preferred: explicit template
  // Example: https://app.autopacksummit.com/profile/{profileId}
  const template =
    process.env.APS_PROFILE_QR_URL_TEMPLATE ||
    process.env.NEXT_PUBLIC_APS_PROFILE_QR_URL_TEMPLATE;
  if (template?.includes('{profileId}')) {
    return template.replaceAll('{profileId}', profileId);
  }

  // Next: base URL + default path
  const base =
    process.env.APS_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  if (base) {
    return `${String(base).replace(/\/$/, '')}/profile/${profileId}`;
  }

  // Fallback: deep-link style URL (still a URL, works for app routing)
  return `aps://profile/${profileId}`;
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
      eventId
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

const LIST_COMPANIES_BY_EVENT = /* GraphQL */ `
  query ListAPSCompanies(
    $filter: ModelAPSCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAPSCompanies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        type
        eventId
      }
      nextToken
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
      }
      jobTitle
      attendeeType
      status
      termsAccepted
      interests
      otherInterest
      speedNetworking
      speedNetworkingStatus
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
      morrisetteTransportation
      morrisetteStatus
      aristoTransportation
      aristoStatus
      magnaTransportation
      magnaStatus
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

// Types for companies and addons
export type Company = {
  id: string;
  name: string;
  email: string;
  type: string | null;
  eventId: string;
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
  eventId: string
): Promise<Company[]> {
  const allCompanies: Company[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const response: {
      listAPSCompanies?: {
        items?: Company[];
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL<{
      listAPSCompanies?: {
        items?: Company[];
        nextToken?: string | null;
      } | null;
    }>(LIST_COMPANIES_BY_EVENT, {
      filter: { eventId: { eq: eventId } },
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const items = response.listAPSCompanies?.items || [];
    allCompanies.push(...items);
    nextToken = response.listAPSCompanies?.nextToken;

    if (nextToken) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  } while (nextToken);

  return allCompanies;
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
export async function createRegistrant(input: {
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
    | 'STAFF';
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
}): Promise<{ id: string; email: string; companyId: string | null }> {
  // First, create the registrant to get the ID
  const result = await requestGraphQL<{
    createApsRegistrant?: {
      id: string;
      email: string;
      companyId: string | null;
    };
  }>(CREATE_REGISTRANT, { input });

  if (!result.createApsRegistrant) {
    throw new Error('Failed to create registrant');
  }

  const registrantId = result.createApsRegistrant.id;

  // Create (or fetch) a Cognito user so ApsAppUser.id can be the stable Cognito sub.
  const { sub: appUserId } = await ensureCognitoUserForRegistrantEmail(
    input.email
  );

  // Create ApsAppUser for this registrant (strict; required for bidirectional querying)
  const appUserResult = await requestGraphQL<{
    createApsAppUser?: { id: string; registrantId: string };
  }>(CREATE_APP_USER, {
    input: {
      id: appUserId,
      registrantId,
    },
  });

  if (!appUserResult.createApsAppUser?.id) {
    throw new Error('Failed to create ApsAppUser for registrant');
  }

  // Link registrant -> appUser (strict; required for registrant.appUser resolver)
  const linkRegistrantResult = await requestGraphQL<{
    updateApsRegistrant?: { id: string; appUserId?: string | null };
  }>(UPDATE_REGISTRANT, {
    input: {
      id: registrantId,
      appUserId,
    },
  });

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
      }>(GET_COMPANY, { id: input.companyId });
      companyNameForProfile = companyResult.getAPSCompany?.name || null;
    } catch (error) {
      console.warn('Failed to fetch company name for profile:', error);
    }
  }

  const profileResult = await requestGraphQL<{
    createApsAppUserProfile?: { id: string; userId: string };
  }>(CREATE_APP_USER_PROFILE, {
    input: {
      userId: appUserId,
      firstName: input.firstName || null,
      lastName: input.lastName || null,
      email: input.email,
      phone: input.phone || null,
      company: companyNameForProfile || null,
      jobTitle: input.jobTitle || null,
      attendeeType: input.attendeeType || null,
      // Other fields will be filled in by the user later
    },
  });

  if (!profileResult.createApsAppUserProfile?.id) {
    throw new Error('Failed to create ApsAppUserProfile for app user');
  }

  const profileId = profileResult.createApsAppUserProfile.id;

  // Link appUser -> profile (strict; required for appUser.profile resolver)
  const linkUserResult = await requestGraphQL<{
    updateApsAppUser?: { id: string; profileId?: string | null };
  }>(UPDATE_APP_USER, {
    input: {
      id: appUserId,
      profileId,
    },
  });

  if (!linkUserResult.updateApsAppUser?.id) {
    throw new Error('Failed to attach profileId to app user');
  }

  // Generate and upload QR code (best-effort)
  try {
    // Import the QR code function
    const { generateAndUploadQRCodeFromText } = await import(
      '@/lib/qrcode-storage'
    );

    // Encode profile URL (created after profile is created/linked)
    const profileUrl = buildProfileQrUrl(profileId);

    // Generate and upload QR code image
    const qrCodeUrl = await generateAndUploadQRCodeFromText(
      registrantId,
      profileUrl
    );

    // Update the registrant with the QR code URL
    await requestGraphQL<{
      updateApsRegistrant?: { id: string; qrCode: string | null };
    }>(UPDATE_REGISTRANT, {
      input: {
        id: registrantId,
        qrCode: qrCodeUrl,
      },
    });
  } catch (error) {
    console.error('Failed to generate QR code for registrant:', error);
    // Don't fail the entire operation if QR code generation fails
    // The registrant + app user + profile are already created and linked
  }

  return result.createApsRegistrant;
}

/**
 * Fetch all registrants for an APS event
 */
export async function fetchRegistrantsByApsId(
  apsId: string
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

/**
 * Fetch a single registrant by ID
 */
export async function fetchRegistrantById(
  id: string
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
