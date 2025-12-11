'use server';

import { requestGraphQL } from '@/lib/appsync';

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

  // Generate and upload QR code
  try {
    // Fetch company details if companyId is provided
    let companyName: string | null = null;
    let companyWebsite: string | null = null;

    if (input.companyId) {
      try {
        const companyResult = await requestGraphQL<{
          getAPSCompany?: { name: string; website?: string | null };
        }>(GET_COMPANY, { id: input.companyId });

        if (companyResult.getAPSCompany) {
          companyName = companyResult.getAPSCompany.name;
          companyWebsite = companyResult.getAPSCompany.website || null;
        }
      } catch (error) {
        console.warn('Failed to fetch company details for QR code:', error);
      }
    }

    // Import the QR code function
    const { generateAndUploadQRCode } = await import('@/lib/qrcode-storage');

    // Generate and upload QR code
    const qrCodeUrl = await generateAndUploadQRCode(registrantId, {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phone: input.phone,
      company: companyName,
      jobTitle: input.jobTitle,
      website: companyWebsite,
    });

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
    // The registrant is already created, we just log the error
  }

  // Create ApsAppUser for this registrant
  let appUserId: string | null = null;
  try {
    const appUserResult = await requestGraphQL<{
      createApsAppUser?: { id: string; registrantId: string };
    }>(CREATE_APP_USER, {
      input: {
        registrantId,
      },
    });

    if (appUserResult.createApsAppUser) {
      appUserId = appUserResult.createApsAppUser.id;

      // Create ApsAppUserProfile with matching data from registrant
      try {
        // Get company name if companyId is provided
        let companyName: string | null = null;
        if (input.companyId) {
          try {
            const companyResult = await requestGraphQL<{
              getAPSCompany?: { name: string };
            }>(GET_COMPANY, { id: input.companyId });
            companyName = companyResult.getAPSCompany?.name || null;
          } catch (error) {
            console.warn('Failed to fetch company name for profile:', error);
          }
        }

        await requestGraphQL<{
          createApsAppUserProfile?: { id: string; userId: string };
        }>(CREATE_APP_USER_PROFILE, {
          input: {
            userId: appUserId,
            firstName: input.firstName || null,
            lastName: input.lastName || null,
            email: input.email,
            phone: input.phone || null,
            company: companyName || null,
            jobTitle: input.jobTitle || null,
            attendeeType: input.attendeeType || null,
            // Other fields will be filled in by the user later
          },
        });
      } catch (error) {
        console.error('Failed to create ApsAppUserProfile:', error);
        // Don't fail the entire operation if profile creation fails
      }
    }
  } catch (error) {
    console.error('Failed to create ApsAppUser for registrant:', error);
    // Don't fail the entire operation if ApsAppUser creation fails
    // The registrant is already created, we just log the error
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

    return response.getApsRegistrant || null;
  } catch (error) {
    console.error(`Failed to fetch registrant ${id}:`, error);
    return null;
  }
}
