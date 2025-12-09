'use server';

import { requestGraphQL } from '@/lib/appsync';
import { requestOldGraphQL } from '@/lib/old-appsync';

const EVENT_ID = 'ebc006dd-ac5d-4a0b-8362-5fe72c23eda8';

// Old API types
type OldRegistrant = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  jobTitle?: string | null;
  attendeeType?: string | null;
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
  status?: string | null;
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
  aPSCompanyAps25RegistrantsId?: string | null;
  aPSRegistrant2025SeatingChartRegistrantId?: string | null;
  createdAt: string;
  updatedAt: string;
};

type OldRegistrantsResponse = {
  listAPSRegistrant2025s?: {
    items?: OldRegistrant[];
    nextToken?: string | null;
  } | null;
};

// GraphQL queries and mutations
const LIST_OLD_REGISTRANTS = /* GraphQL */ `
  query ListAPSRegistrant2025s($limit: Int, $nextToken: String) {
    listAPSRegistrant2025s(limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        email
        phone
        jobTitle
        attendeeType
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
        status
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
        aPSCompanyAps25RegistrantsId
        aPSRegistrant2025SeatingChartRegistrantId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

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

const CREATE_SEATING_CHART_REGISTRANT = /* GraphQL */ `
  mutation CreateApsSeatingChartRegistrant($input: CreateApsSeatingChartRegistrantInput!) {
    createApsSeatingChartRegistrant(input: $input) {
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

const CREATE_ADD_ON = /* GraphQL */ `
  mutation CreateApsAddOn($input: CreateApsAddOnInput!) {
    createApsAddOn(input: $input) {
      id
      title
    }
  }
`;

const LIST_COMPANIES_BY_EVENT = /* GraphQL */ `
  query ListAPSCompanies($filter: ModelAPSCompanyFilterInput, $limit: Int, $nextToken: String) {
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
  query ListApsAddOns($filter: ModelApsAddOnFilterInput, $limit: Int, $nextToken: String) {
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
  query ListApsRegistrants($filter: ModelApsRegistrantFilterInput, $limit: Int, $nextToken: String) {
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

/**
 * Fetch all registrants from the old API with pagination
 */
async function fetchAllOldRegistrants(): Promise<OldRegistrant[]> {
  const allRegistrants: OldRegistrant[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const response = await requestOldGraphQL<OldRegistrantsResponse>(
      LIST_OLD_REGISTRANTS,
      {
        limit: 1000,
        nextToken: nextToken || undefined,
      }
    );

    const items = response.listAPSRegistrant2025s?.items || [];
    allRegistrants.push(...items);
    nextToken = response.listAPSRegistrant2025s?.nextToken;

    // Small delay to avoid rate limiting
    if (nextToken) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  } while (nextToken);

  return allRegistrants;
}

/**
 * Map old registrant to new registrant input
 */
function mapRegistrantToNew(
  oldRegistrant: OldRegistrant,
  companyId: string | null
): Record<string, unknown> {
  return {
    id: oldRegistrant.id,
    apsID: EVENT_ID,
    firstName: oldRegistrant.firstName || null,
    lastName: oldRegistrant.lastName || null,
    email: oldRegistrant.email,
    phone: oldRegistrant.phone || null,
    companyId: companyId || null,
    jobTitle: oldRegistrant.jobTitle || null,
    attendeeType: oldRegistrant.attendeeType || null,
    termsAccepted: oldRegistrant.termsAccepted || null,
    interests: oldRegistrant.interests || null,
    otherInterest: oldRegistrant.otherInterest || null,
    speedNetworking: oldRegistrant.speedNetworking || null,
    speedNetworkingStatus: oldRegistrant.speedNetworkingStatus || null,
    billingAddressFirstName: oldRegistrant.billingAddressFirstName || null,
    billingAddressLastName: oldRegistrant.billingAddressLastName || null,
    billingAddressEmail: oldRegistrant.billingAddressEmail || null,
    billingAddressPhone: oldRegistrant.billingAddressPhone || null,
    billingAddressStreet: oldRegistrant.billingAddressStreet || null,
    billingAddressCity: oldRegistrant.billingAddressCity || null,
    billingAddressState: oldRegistrant.billingAddressState || null,
    billingAddressZip: oldRegistrant.billingAddressZip || null,
    sameAsAttendee: oldRegistrant.sameAsAttendee || null,
    speakerTopic: oldRegistrant.speakerTopic || null,
    learningObjectives: oldRegistrant.learningObjectives || null,
    totalAmount: oldRegistrant.totalAmount || null,
    discountCode: oldRegistrant.discountCode || null,
    status: oldRegistrant.status || null,
    morrisetteTransportation: oldRegistrant.morrisetteTransportation || null,
    morrisetteStatus: oldRegistrant.morrisetteStatus || null,
    aristoTransportation: oldRegistrant.aristoTransportation || null,
    aristoStatus: oldRegistrant.aristoStatus || null,
    magnaTransportation: oldRegistrant.magnaTransportation || null,
    magnaStatus: oldRegistrant.magnaStatus || null,
    paymentConfirmation: oldRegistrant.paymentConfirmation || null,
    registrationEmailSent: oldRegistrant.registrationEmailSent || null,
    registrationEmailSentDate: oldRegistrant.registrationEmailSentDate || null,
    registrationEmailReceived: oldRegistrant.registrationEmailReceived || null,
    registrationEmailReceivedDate:
      oldRegistrant.registrationEmailReceivedDate || null,
    welcomeEmailSent: oldRegistrant.welcomeEmailSent || null,
    welcomeEmailSentDate: oldRegistrant.welcomeEmailSentDate || null,
    welcomeEmailReceived: oldRegistrant.welcomeEmailReceived || null,
    welcomeEmailReceivedDate: oldRegistrant.welcomeEmailReceivedDate || null,
    paymentMethod: oldRegistrant.paymentMethod || null,
    paymentLast4: oldRegistrant.paymentLast4 || null,
    approvedAt: oldRegistrant.approvedAt || null,
    headshot: oldRegistrant.headshot || null,
    presentation: oldRegistrant.presentation || null,
    presentationTitle: oldRegistrant.presentationTitle || null,
    presentationSummary: oldRegistrant.presentationSummary || null,
    bio: oldRegistrant.bio || null,
  };
}

/**
 * Migrate addOn if it doesn't exist
 * Returns the addOn ID
 */
const addOnsCache = new Map<string, string>(); // Map old addOn ID to new addOn ID

async function migrateAddOn(
  oldAddOn: NonNullable<
    NonNullable<OldRegistrant['addOns']>['items']
  >[0]['addOn']
): Promise<string | null> {
  if (!oldAddOn || !oldAddOn.id) return null;

  // Check cache first
  if (addOnsCache.has(oldAddOn.id)) {
    return addOnsCache.get(oldAddOn.id) || null;
  }

  try {
    const input: Record<string, unknown> = {
      id: oldAddOn.id,
      title: oldAddOn.title || '',
      description: oldAddOn.description || '',
      subheadline: oldAddOn.subheadline || null,
      location: oldAddOn.location || '',
      date: oldAddOn.date || '',
      time: oldAddOn.time || '',
      company: oldAddOn.company || '',
      altLink: oldAddOn.altLink || null,
      type: oldAddOn.type || null,
      limit: oldAddOn.limit || null,
    };

    await requestGraphQL(CREATE_ADD_ON, { input });
    addOnsCache.set(oldAddOn.id, oldAddOn.id);
    return oldAddOn.id;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : String(error);
    // If addOn already exists, that's fine - just cache it
    if (
      errorMessage.includes('already exists') ||
      errorMessage.includes('duplicate')
    ) {
      addOnsCache.set(oldAddOn.id, oldAddOn.id);
      return oldAddOn.id;
    }
    throw error;
  }
}

/**
 * Query addOns connection by registrant ID
 */
const LIST_REGISTRANT_ADDONS = /* GraphQL */ `
  query ListApsRegistrantAddOns25s($filter: ModelApsRegistrantAddOns25FilterInput, $limit: Int, $nextToken: String) {
    listApsRegistrantAddOns25s(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        aPSRegistrantAddOns25RegistrantId
        aPSRegistrantAddOns25AddOnId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

/**
 * Get addOn details
 */
const GET_ADD_ON = /* GraphQL */ `
  query GetApsAddOn25($id: ID!) {
    getApsAddOn25(id: $id) {
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
    }
  }
`;

/**
 * Get seating chart registrant details
 */
const GET_SEATING_CHART_REGISTRANT = /* GraphQL */ `
  query GetAPS2025SeatingChartRegistrant($id: ID!) {
    getAPS2025SeatingChartRegistrant(id: $id) {
      id
      category
      firstName
      lastName
      company
      email
      role
      tableNumber
      notes
      aPS2025SeatingChartRegistrantSeatingChartId
      createdAt
      updatedAt
    }
  }
`;

/**
 * Fetch all addOn connections for a registrant
 */
async function fetchRegistrantAddOns(
  registrantId: string
): Promise<Array<{ id: string; addOnId: string }>> {
  const allConnections: Array<{ id: string; addOnId: string }> = [];
  let nextToken: string | null | undefined = null;

  do {
    try {
      const response = await requestOldGraphQL<{
        listApsRegistrantAddOns25s?: {
          items?: Array<{
            id: string;
            aPSRegistrantAddOns25RegistrantId?: string | null;
            aPSRegistrantAddOns25AddOnId?: string | null;
          }>;
          nextToken?: string | null;
        } | null;
      }>(LIST_REGISTRANT_ADDONS, {
        filter: {
          aPSRegistrantAddOns25RegistrantId: { eq: registrantId },
        },
        limit: 1000,
        nextToken: nextToken || undefined,
      });

      const items = response.listApsRegistrantAddOns25s?.items || [];
      for (const connection of items) {
        if (connection.aPSRegistrantAddOns25AddOnId) {
          allConnections.push({
            id: connection.id,
            addOnId: connection.aPSRegistrantAddOns25AddOnId,
          });
        }
      }

      nextToken = response.listApsRegistrantAddOns25s?.nextToken;
      if (nextToken) {
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    } catch (error) {
      console.error(
        `Failed to fetch addOns for registrant ${registrantId}:`,
        error
      );
      break;
    }
  } while (nextToken);

  return allConnections;
}

/**
 * Fetch addOn details from old API
 */
async function fetchAddOnDetails(addOnId: string): Promise<{
  id: string;
  title?: string | null;
  description?: string | null;
  subheadline?: string | null;
  location?: string | null;
  date?: string | null;
  time?: string | null;
  company?: string | null;
  altLink?: string | null;
  type?: string | null;
  limit?: number | null;
} | null> {
  try {
    const response = await requestOldGraphQL<{
      getApsAddOn25?: {
        id: string;
        title?: string | null;
        description?: string | null;
        subheadline?: string | null;
        location?: string | null;
        date?: string | null;
        time?: string | null;
        company?: string | null;
        altLink?: string | null;
        type?: string | null;
        limit?: number | null;
      } | null;
    }>(GET_ADD_ON, { id: addOnId });

    return response.getApsAddOn25 || null;
  } catch (error) {
    console.error(`Failed to fetch addOn ${addOnId}:`, error);
    return null;
  }
}

/**
 * Migrate all addOns for a registrant (with pagination support)
 */
async function migrateRegistrantAddOns(
  oldRegistrant: OldRegistrant
): Promise<string[]> {
  const migratedAddOnIds: string[] = [];

  // Fetch all addOn connections for this registrant
  const connections = await fetchRegistrantAddOns(oldRegistrant.id);

  // For each connection, fetch the addOn details and migrate
  for (const connection of connections) {
    try {
      const addOnDetails = await fetchAddOnDetails(connection.addOnId);
      if (addOnDetails) {
        const addOnId = await migrateAddOn(addOnDetails);
        if (addOnId) {
          migratedAddOnIds.push(addOnId);
        }
      }
      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 50));
    } catch (error) {
      console.error(
        `Failed to migrate addOn ${connection.addOnId} for registrant ${oldRegistrant.id}:`,
        error
      );
      // Continue with other addOns
    }
  }

  return migratedAddOnIds;
}

/**
 * Fetch seating chart registrant details from old API
 */
async function fetchSeatingChartRegistrant(
  seatingChartRegistrantId: string
): Promise<{
  id: string;
  category?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  company?: string | null;
  email?: string | null;
  role?: string | null;
  tableNumber?: number | null;
  notes?: string | null;
  seatingChartId?: string | null;
} | null> {
  try {
    const response = await requestOldGraphQL<{
      getAPS2025SeatingChartRegistrant?: {
        id: string;
        category?: string | null;
        firstName?: string | null;
        lastName?: string | null;
        company?: string | null;
        email?: string | null;
        role?: string | null;
        tableNumber?: number | null;
        notes?: string | null;
        aPS2025SeatingChartRegistrantSeatingChartId?: string | null;
      } | null;
    }>(GET_SEATING_CHART_REGISTRANT, { id: seatingChartRegistrantId });

    if (!response.getAPS2025SeatingChartRegistrant) return null;

    const data = response.getAPS2025SeatingChartRegistrant;
    return {
      id: data.id,
      category: data.category,
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      email: data.email,
      role: data.role,
      tableNumber: data.tableNumber,
      notes: data.notes,
      seatingChartId: data.aPS2025SeatingChartRegistrantSeatingChartId,
    };
  } catch (error) {
    console.error(
      `Failed to fetch seating chart registrant ${seatingChartRegistrantId}:`,
      error
    );
    return null;
  }
}

/**
 * Migrate seating chart registrant
 */
async function migrateSeatingChartRegistrant(
  seatingChartRegistrantId: string | null | undefined,
  registrantId: string
): Promise<void> {
  if (!seatingChartRegistrantId) return;

  try {
    // Fetch seating chart registrant details from old API
    const seatingChartData = await fetchSeatingChartRegistrant(
      seatingChartRegistrantId
    );

    if (!seatingChartData) {
      throw new Error('Seating chart registrant not found in old API');
    }

    if (!seatingChartData.seatingChartId) {
      throw new Error('Missing seatingChartID from old data');
    }

    const input: Record<string, unknown> = {
      id: seatingChartData.id,
      registrantID: registrantId,
      seatingChartID: seatingChartData.seatingChartId,
      category: seatingChartData.category || null,
      firstName: seatingChartData.firstName || null,
      lastName: seatingChartData.lastName || null,
      company: seatingChartData.company || null,
      email: seatingChartData.email || null,
      role: seatingChartData.role || null,
      tableNumber: seatingChartData.tableNumber || null,
      notes: seatingChartData.notes || null,
    };

    await requestGraphQL(CREATE_SEATING_CHART_REGISTRANT, { input });
  } catch (error) {
    console.error(
      `Failed to migrate seating chart registrant ${seatingChartRegistrantId}:`,
      error
    );
    throw error;
  }
}

/**
 * Main migration function
 */
export async function migrateRegistrants(): Promise<{
  success: number;
  errors: Array<{ id: string; email: string; error: string }>;
  warnings: Array<{ id: string; email: string; warning: string }>;
  addOnsMigrated: number;
  registrantAddOns: Array<{ registrantId: string; addOnIds: string[] }>;
}> {
  const errors: Array<{ id: string; email: string; error: string }> = [];
  const warnings: Array<{ id: string; email: string; warning: string }> = [];
  const registrantAddOns: Array<{ registrantId: string; addOnIds: string[] }> =
    [];
  let success = 0;
  let addOnsMigrated = 0;

  try {
    // Fetch all registrants from old API
    console.log('Fetching registrants from old API...');
    const oldRegistrants = await fetchAllOldRegistrants();
    console.log(`Found ${oldRegistrants.length} registrants to migrate`);

    // Process in batches
    const batchSize = 10;
    for (let i = 0; i < oldRegistrants.length; i += batchSize) {
      const batch = oldRegistrants.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (oldRegistrant) => {
          try {
            // Resolve company ID - use the old company ID directly since companies were imported with same IDs
            let companyId: string | null = null;
            if (oldRegistrant.aPSCompanyAps25RegistrantsId) {
              const oldCompanyId = oldRegistrant.aPSCompanyAps25RegistrantsId;
              
              // Set companyId - we trust that companies were imported with same IDs
              companyId = oldCompanyId;
              
              // Optionally verify company exists (non-blocking)
              try {
                const companyCheck = await requestGraphQL<{
                  getAPSCompany?: { id: string; eventId: string } | null;
                }>(GET_COMPANY, { id: oldCompanyId });
                
                if (!companyCheck.getAPSCompany) {
                  warnings.push({
                    id: oldRegistrant.id,
                    email: oldRegistrant.email,
                    warning: `Company ${oldCompanyId} not found - companyId will be set but relationship may fail`,
                  });
                } else if (companyCheck.getAPSCompany.eventId !== EVENT_ID) {
                  warnings.push({
                    id: oldRegistrant.id,
                    email: oldRegistrant.email,
                    warning: `Company ${oldCompanyId} exists but is for a different event`,
                  });
                }
              } catch (error) {
                // Verification failed, but we'll still set companyId
                // This is non-blocking since companies should have been imported
                console.warn(
                  `Could not verify company ${oldCompanyId} for registrant ${oldRegistrant.id}:`,
                  error
                );
              }
            }

            // Map and create registrant
            const input = mapRegistrantToNew(oldRegistrant, companyId);
            
            // Debug: Log if companyId is being set
            if (oldRegistrant.aPSCompanyAps25RegistrantsId && !companyId) {
              console.warn(
                `Registrant ${oldRegistrant.id} (${oldRegistrant.email}) had company ${oldRegistrant.aPSCompanyAps25RegistrantsId} but it was not set`
              );
            }
            
            const result = await requestGraphQL<{
              createApsRegistrant?: { id: string; companyId: string | null };
            }>(CREATE_REGISTRANT, { input });
            
            // Verify companyId was set in the result
            if (
              oldRegistrant.aPSCompanyAps25RegistrantsId &&
              result.createApsRegistrant?.companyId !== companyId
            ) {
              warnings.push({
                id: oldRegistrant.id,
                email: oldRegistrant.email,
                warning: `CompanyId mismatch: expected ${companyId}, got ${result.createApsRegistrant?.companyId}`,
              });
            }

            // Migrate seating chart registrant if exists
            if (oldRegistrant.aPSRegistrant2025SeatingChartRegistrantId) {
              try {
                await migrateSeatingChartRegistrant(
                  oldRegistrant.aPSRegistrant2025SeatingChartRegistrantId,
                  oldRegistrant.id
                );
              } catch (error) {
                warnings.push({
                  id: oldRegistrant.id,
                  email: oldRegistrant.email,
                  warning: `Failed to migrate seating chart: ${
                    error instanceof Error ? error.message : String(error)
                  }`,
                });
              }
            }

            // Migrate addOns
            try {
              const migratedAddOnIds = await migrateRegistrantAddOns(
                oldRegistrant
              );
              if (migratedAddOnIds.length > 0) {
                registrantAddOns.push({
                  registrantId: oldRegistrant.id,
                  addOnIds: migratedAddOnIds,
                });
                addOnsMigrated += migratedAddOnIds.length;
              }
            } catch (error) {
              warnings.push({
                id: oldRegistrant.id,
                email: oldRegistrant.email,
                warning: `Failed to migrate addOns: ${
                  error instanceof Error ? error.message : String(error)
                }`,
              });
            }

            success++;
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : String(error);

            // Check if it's a duplicate error
            if (
              errorMessage.includes('already exists') ||
              errorMessage.includes('duplicate')
            ) {
              warnings.push({
                id: oldRegistrant.id,
                email: oldRegistrant.email,
                warning: 'Registrant already exists, skipped',
              });
            } else {
              errors.push({
                id: oldRegistrant.id,
                email: oldRegistrant.email,
                error: errorMessage,
              });
            }
          }
        })
      );

      // Small delay between batches
      if (i + batchSize < oldRegistrants.length) {
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }

    return {
      success,
      errors,
      warnings,
      addOnsMigrated,
      registrantAddOns,
    };
  } catch (error) {
    throw new Error(
      `Failed to migrate registrants: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

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
export async function fetchCompaniesByEventId(eventId: string): Promise<Company[]> {
  const allCompanies: Company[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const response = await requestGraphQL<{
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
    const response = await requestGraphQL<{
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
  attendeeType: 'OEM' | 'TIER1' | 'SOLUTIONPROVIDER' | 'SPONSOR' | 'SPEAKER' | 'STAFF';
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
    createApsRegistrant?: { id: string; email: string; companyId: string | null };
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
export async function fetchRegistrantsByApsId(apsId: string): Promise<Registrant[]> {
  const allRegistrants: Registrant[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const response = await requestGraphQL<{
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
export async function fetchRegistrantById(id: string): Promise<RegistrantDetail | null> {
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

