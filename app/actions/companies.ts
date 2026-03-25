"use server";

import { revalidatePath } from "next/cache";
import { requestGraphQL } from "@/lib/appsync";
import { readFile } from "fs/promises";
import { join } from "path";

type CompanyType = "OEMTIER1" | "SOLUTIONPROVIDER" | "SPONSOR" | null;

type Company = {
  id: string;
  name: string;
  email: string;
  type: CompanyType;
  description?: string | null;
  website?: string | null;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  country?: string | null;
  logo?: string | null;
};

type CompanyContact = {
  id: string;
  companyId: string;
  name?: string | null;
  email: string;
  phone?: string | null;
  title?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type ActionState = { ok: boolean; message: string; removedCount?: number; skippedWithEvents?: number; processed?: number };
type CompanyEventLink = { id: string; aPSCompanyId?: string | null; aPSId?: string | null };

const CREATE_COMPANY = /* GraphQL */ `
  mutation CreateAPSCompany($input: CreateAPSCompanyInput!) {
    createAPSCompany(input: $input) {
      id
      name
      email
      type
    }
  }
`;

const UPDATE_COMPANY = /* GraphQL */ `
  mutation UpdateAPSCompany($input: UpdateAPSCompanyInput!) {
    updateAPSCompany(input: $input) {
      id
      name
      email
      type
      description
      website
      phone
      address
      city
      state
      zip
      country
      logo
    }
  }
`;

const GET_COMPANY = /* GraphQL */ `
  query GetAPSCompany($id: ID!) {
    getAPSCompany(id: $id) {
      id
      name
      email
      type
      description
      website
      phone
      address
      city
      state
      zip
      country
      logo
    }
  }
`;

const LIST_COMPANIES = /* GraphQL */ `
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
        website
        phone
        logo
      }
      nextToken
    }
  }
`;

const GET_APS_COMPANIES = /* GraphQL */ `
  query GetAPS($id: ID!) {
    getAPS(id: $id) {
      id
      year
      companies(limit: 1000) {
        items {
          id
          aPSCompany {
            id
            name
            email
            type
            website
            phone
            logo
          }
        }
        nextToken
      }
    }
  }
`;

const CREATE_APS_COMPANY_EVENT = /* GraphQL */ `
  mutation CreateAPSCompanyEvents($input: CreateAPSCompanyEventsInput!) {
    createAPSCompanyEvents(input: $input) {
      id
    }
  }
`;

const APS_COMPANY_EVENTS_BY_APS_ID = /* GraphQL */ `
  query APSCompanyEventsByAPSId(
    $aPSId: ID!
    $filter: ModelAPSCompanyEventsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    aPSCompanyEventsByAPSId(
      aPSId: $aPSId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aPSCompanyId
        aPSId
      }
      nextToken
    }
  }
`;

const APS_COMPANY_EVENTS_BY_COMPANY = /* GraphQL */ `
  query APSCompanyEventsByAPSCompanyId(
    $aPSCompanyId: ID!
    $limit: Int
    $nextToken: String
  ) {
    aPSCompanyEventsByAPSCompanyId(
      aPSCompanyId: $aPSCompanyId
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

const DELETE_APS_COMPANY_EVENT = /* GraphQL */ `
  mutation DeleteAPSCompanyEvents($input: DeleteAPSCompanyEventsInput!) {
    deleteAPSCompanyEvents(input: $input) {
      id
    }
  }
`;

const DELETE_COMPANY = /* GraphQL */ `
  mutation DeleteAPSCompany($input: DeleteAPSCompanyInput!) {
    deleteAPSCompany(input: $input) {
      id
    }
  }
`;

const LIST_COMPANY_CONTACTS = /* GraphQL */ `
  query ListAPSCompanyContacts(
    $filter: ModelAPSCompanyContactFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAPSCompanyContacts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        companyId
        name
        email
        phone
        title
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

const CREATE_COMPANY_CONTACT = /* GraphQL */ `
  mutation CreateAPSCompanyContact($input: CreateAPSCompanyContactInput!) {
    createAPSCompanyContact(input: $input) {
      id
      companyId
      name
      email
      phone
      title
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_COMPANY_CONTACT = /* GraphQL */ `
  mutation UpdateAPSCompanyContact($input: UpdateAPSCompanyContactInput!) {
    updateAPSCompanyContact(input: $input) {
      id
      companyId
      name
      email
      phone
      title
      createdAt
      updatedAt
    }
  }
`;

const DELETE_COMPANY_CONTACT = /* GraphQL */ `
  mutation DeleteAPSCompanyContact($input: DeleteAPSCompanyContactInput!) {
    deleteAPSCompanyContact(input: $input) {
      id
    }
  }
`;

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        current += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      // End of field
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current); // Push last field
  return result;
}

function cleanEmail(email: string): string {
  // Remove leading single quote and @ if present, or just leading single quote
  return email.replace(/^'@?/, "").trim();
}

function parseCompanyType(type: string): CompanyType {
  const upperType = type.toUpperCase().trim();
  if (upperType === "OEMTIER1" || upperType === "SOLUTIONPROVIDER" || upperType === "SPONSOR") {
    return upperType as CompanyType;
  }
  return null;
}

function parseNullableString(raw: FormDataEntryValue | null): string | null {
  if (!raw) return null;
  const value = raw.toString().trim();
  return value ? value : null;
}

export async function fetchCompanyById(companyId: string): Promise<Company> {
  const data = await requestGraphQL<{ getAPSCompany?: Company | null }>(
    GET_COMPANY,
    { id: companyId }
  );
  if (!data.getAPSCompany) {
    throw new Error("Company not found");
  }
  return data.getAPSCompany;
}

export async function fetchCompaniesByEventId(
  eventId: string
): Promise<Company[]> {
  const data = await requestGraphQL<{
    getAPS?: {
      companies?: {
        items?: Array<{ id?: string | null; aPSCompany?: Company | null } | null> | null;
      } | null;
    } | null;
  }>(GET_APS_COMPANIES, { id: eventId });

  const items = data.getAPS?.companies?.items ?? [];
  const dedupedCompanies: Company[] = [];
  const seenCompanyIds = new Set<string>();
  const duplicateLinkIds: string[] = [];

  for (const item of items) {
    const company = item?.aPSCompany;
    if (!company?.id) continue;

    if (seenCompanyIds.has(company.id)) {
      if (item?.id) duplicateLinkIds.push(item.id);
      continue;
    }

    seenCompanyIds.add(company.id);
    dedupedCompanies.push(company);
  }

  // Self-heal duplicate link rows so they stop reappearing.
  if (duplicateLinkIds.length > 0) {
    for (const id of duplicateLinkIds) {
      try {
        await requestGraphQL(DELETE_APS_COMPANY_EVENT, { input: { id } });
      } catch (error) {
        console.error(`Failed to delete duplicate APSCompanyEvents row ${id}:`, error);
      }
    }
  }

  return dedupedCompanies;
}

export async function fetchAllCompanies(): Promise<Company[]> {
  const allCompanies: Company[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data: {
      listAPSCompanies?: {
        items?: Company[];
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(LIST_COMPANIES, {
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const items = data.listAPSCompanies?.items || [];
    allCompanies.push(...items.filter(Boolean));
    nextToken = data.listAPSCompanies?.nextToken;

    if (nextToken) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  } while (nextToken);

  return allCompanies;
}

async function companyHasEvents(companyId: string): Promise<boolean> {
  let nextToken: string | null | undefined = null;
  do {
    const data: {
      aPSCompanyEventsByAPSCompanyId?: {
        items?: Array<{ id?: string | null } | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(APS_COMPANY_EVENTS_BY_COMPANY, {
      aPSCompanyId: companyId,
      limit: 1,
      nextToken: nextToken || undefined,
    });

    const items = data.aPSCompanyEventsByAPSCompanyId?.items ?? [];
    if (items.length > 0) return true;
    nextToken = data.aPSCompanyEventsByAPSCompanyId?.nextToken ?? null;
  } while (nextToken);

  return false;
}

function normalizeCompanyName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

export async function dedupeCompaniesByName(
  _prevState: ActionState,
  _formData: FormData
): Promise<ActionState> {
  try {
    const companies = await fetchAllCompanies();
    const groups = new Map<string, Company[]>();

    for (const company of companies) {
      const key = normalizeCompanyName(company.name || '');
      if (!key) continue;
      const bucket = groups.get(key) ?? [];
      bucket.push(company);
      groups.set(key, bucket);
    }

    let removedCount = 0;
    let skippedWithEvents = 0;
    let processed = 0;

    for (const bucket of groups.values()) {
      if (bucket.length < 2) continue;
      processed += 1;

      const withAt = bucket.filter((company) =>
        (company.email ?? '').includes('@')
      );
      const keep = (withAt[0] ?? bucket[0]) as Company;

      for (const company of bucket) {
        if (company.id === keep.id) continue;
        const hasEvents = await companyHasEvents(company.id);
        if (hasEvents) {
          skippedWithEvents += 1;
          continue;
        }
        const formData = new FormData();
        formData.set('id', company.id);
        await deleteCompany(formData);
        removedCount += 1;
      }
    }

    revalidatePath('/companies');

    return {
      ok: true,
      message: `Removed ${removedCount} duplicate compan${
        removedCount === 1 ? 'y' : 'ies'
      }. Skipped ${skippedWithEvents} with events.`,
      removedCount,
      skippedWithEvents,
      processed,
    };
  } catch (error) {
    console.error('Failed to dedupe companies:', error);
    return { ok: false, message: 'Failed to dedupe companies.' };
  }
}

export async function attachCompanyToEvent(formData: FormData) {
  const eventId = formData.get("eventId")?.toString();
  const companyId = formData.get("companyId")?.toString();

  if (!eventId) throw new Error("Missing event id");
  if (!companyId) throw new Error("Missing company id");

  const existingLinks = await listCompanyEventLinksByEventAndCompany({ eventId, companyId });
  if (existingLinks.length > 0) {
    // Keep one link and clean up accidental duplicates.
    for (const duplicate of existingLinks.slice(1)) {
      await requestGraphQL(DELETE_APS_COMPANY_EVENT, { input: { id: duplicate.id } });
    }
    revalidatePath(`/aps/${eventId}/companies`);
    revalidatePath(`/aps/${eventId}/sponsors`);
    return;
  }

  await requestGraphQL(CREATE_APS_COMPANY_EVENT, {
    input: {
      aPSId: eventId,
      aPSCompanyId: companyId,
    },
  });

  revalidatePath(`/aps/${eventId}/companies`);
  revalidatePath(`/aps/${eventId}/sponsors`);
}

export async function ensureCompanyAttachedToEvent(input: {
  eventId: string;
  companyId: string;
  jwt?: string | null;
}) {
  const { eventId, companyId, jwt } = input;
  if (!eventId) throw new Error("Missing event id");
  if (!companyId) throw new Error("Missing company id");

  const existingLinks = await listCompanyEventLinksByEventAndCompany({
    eventId,
    companyId,
    jwt,
  });
  if (existingLinks.length > 0) {
    // Keep one link and clean up accidental duplicates.
    for (const duplicate of existingLinks.slice(1)) {
      await requestGraphQL(
        DELETE_APS_COMPANY_EVENT,
        { input: { id: duplicate.id } },
        jwt ? { authMode: "userPools", jwt } : undefined
      );
    }
    return;
  }

  await requestGraphQL(
    CREATE_APS_COMPANY_EVENT,
    {
      input: {
        aPSId: eventId,
        aPSCompanyId: companyId,
      },
    },
    jwt ? { authMode: "userPools", jwt } : undefined
  );

  revalidatePath(`/aps/${eventId}/companies`);
  revalidatePath(`/aps/${eventId}/sponsors`);
}

async function listCompanyEventLinksByEventAndCompany(input: {
  eventId: string;
  companyId: string;
  jwt?: string | null;
}): Promise<CompanyEventLink[]> {
  const links: CompanyEventLink[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data: {
      aPSCompanyEventsByAPSId?: {
        items?: Array<CompanyEventLink | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(
      APS_COMPANY_EVENTS_BY_APS_ID,
      {
        aPSId: input.eventId,
        filter: { aPSCompanyId: { eq: input.companyId } },
        limit: 1000,
        nextToken: nextToken || undefined,
      },
      input.jwt ? { authMode: "userPools", jwt: input.jwt } : undefined
    );

    for (const item of data.aPSCompanyEventsByAPSId?.items ?? []) {
      if (item?.id) links.push(item);
    }

    nextToken = data.aPSCompanyEventsByAPSId?.nextToken ?? null;
    if (nextToken) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  } while (nextToken);

  return links;
}

export async function detachCompanyFromEvent(formData: FormData) {
  const eventId = formData.get("eventId")?.toString();
  const companyId = formData.get("companyId")?.toString();

  if (!eventId) throw new Error("Missing event id");
  if (!companyId) throw new Error("Missing company id");

  let nextToken: string | null | undefined = null;
  do {
    const data: {
      aPSCompanyEventsByAPSId?: {
        items?: Array<{ id?: string | null; aPSCompanyId?: string | null } | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(APS_COMPANY_EVENTS_BY_APS_ID, {
      aPSId: eventId,
      filter: { aPSCompanyId: { eq: companyId } },
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const items = data.aPSCompanyEventsByAPSId?.items ?? [];
    for (const item of items) {
      if (!item?.id) continue;
      await requestGraphQL(DELETE_APS_COMPANY_EVENT, { input: { id: item.id } });
    }
    nextToken = data.aPSCompanyEventsByAPSId?.nextToken ?? null;
  } while (nextToken);

  revalidatePath(`/aps/${eventId}/companies`);
  revalidatePath(`/aps/${eventId}/sponsors`);
}

export async function createCompany(formData: FormData) {
  const eventId = formData.get("eventId")?.toString();
  const name = formData.get("name")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const type = parseCompanyType(formData.get("type")?.toString() || "");

  if (!name) throw new Error("Company name is required");
  if (!email) throw new Error("Company email is required");

  const result = await requestGraphQL<{ createAPSCompany?: { id: string } | null }>(
    CREATE_COMPANY,
    {
      input: {
        name,
        email,
        type,
      },
    }
  );

  if (!result.createAPSCompany?.id) {
    throw new Error("Failed to create company");
  }

  if (eventId) {
    revalidatePath(`/aps/${eventId}/companies`);
    revalidatePath(`/aps/${eventId}/sponsors`);
  }
}

export async function deleteCompany(formData: FormData) {
  const id = formData.get("id")?.toString();
  const eventId = formData.get("eventId")?.toString();

  if (!id) throw new Error("Missing company id");

  const contacts = await fetchCompanyContacts(id);
  if (contacts.length > 0) {
    await Promise.all(
      contacts.map((contact) =>
        requestGraphQL(DELETE_COMPANY_CONTACT, { input: { id: contact.id } })
      )
    );
  }

  let nextToken: string | null | undefined = null;
  do {
    const data: {
      aPSCompanyEventsByAPSCompanyId?: {
        items?: Array<{ id?: string | null } | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(APS_COMPANY_EVENTS_BY_COMPANY, {
      aPSCompanyId: id,
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const items = data.aPSCompanyEventsByAPSCompanyId?.items ?? [];
    for (const item of items) {
      if (!item?.id) continue;
      await requestGraphQL(DELETE_APS_COMPANY_EVENT, { input: { id: item.id } });
    }
    nextToken = data.aPSCompanyEventsByAPSCompanyId?.nextToken ?? null;
  } while (nextToken);

  await requestGraphQL(DELETE_COMPANY, { input: { id } });
  if (eventId) {
    revalidatePath(`/aps/${eventId}/companies`);
    revalidatePath(`/aps/${eventId}/sponsors`);
  }
  revalidatePath("/companies");
}

export async function updateCompany(formData: FormData) {
  const id = formData.get("id")?.toString();
  const eventId = formData.get("eventId")?.toString();
  const exhibitorId = formData.get("exhibitorId")?.toString();
  const sponsorId = formData.get("sponsorId")?.toString();
  const name = formData.get("name")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const type = parseCompanyType(formData.get("type")?.toString() || "");

  if (!id) throw new Error("Missing company id");
  if (!name) throw new Error("Company name is required");
  if (!email) throw new Error("Company email is required");

  const input = {
    id,
    name,
    email,
    type,
    description: parseNullableString(formData.get("description")),
    website: parseNullableString(formData.get("website")),
    phone: parseNullableString(formData.get("phone")),
    address: parseNullableString(formData.get("address")),
    city: parseNullableString(formData.get("city")),
    state: parseNullableString(formData.get("state")),
    zip: parseNullableString(formData.get("zip")),
    country: parseNullableString(formData.get("country")),
    logo: parseNullableString(formData.get("logo")),
  };

  await requestGraphQL(UPDATE_COMPANY, { input });
  if (eventId) {
    revalidatePath(`/aps/${eventId}/companies/${id}`);
    revalidatePath(`/aps/${eventId}/sponsors`);
    if (exhibitorId) {
      revalidatePath(`/aps/${eventId}/exhibitors/${exhibitorId}`);
      revalidatePath(`/aps/${eventId}/exhibitors`);
    }
    if (sponsorId) {
      revalidatePath(`/aps/${eventId}/sponsors/${sponsorId}`);
      revalidatePath(`/aps/${eventId}/sponsors`);
    }
  }
  if (id) {
    revalidatePath(`/companies/${id}`);
  }
  revalidatePath("/companies");
}

// reuse ActionState definition above

export async function updateCompanyLogo(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    const id = formData.get("id")?.toString();
    const eventId = formData.get("eventId")?.toString();
    const registrantId = formData.get("registrantId")?.toString();
    const logo = parseNullableString(formData.get("logo"));

    if (!id) {
      return { ok: false, message: "Missing company id" };
    }

    await requestGraphQL(UPDATE_COMPANY, {
      input: {
        id,
        logo,
      },
    });

    if (eventId) {
      revalidatePath(`/aps/${eventId}`);
      revalidatePath(`/aps/${eventId}/companies/${id}`);
      if (registrantId) {
        revalidatePath(`/aps/${eventId}/registrants/${registrantId}`);
      }
    }

    return { ok: true, message: "Company logo updated." };
  } catch (error) {
    console.error("Failed to update company logo:", error);
    return { ok: false, message: "Failed to update company logo." };
  }
}

export async function fetchCompanyContacts(
  companyId: string
): Promise<CompanyContact[]> {
  let nextToken: string | null | undefined = null;
  const contacts: CompanyContact[] = [];

  do {
    const data: {
      listAPSCompanyContacts?: {
        items?: CompanyContact[] | null;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(LIST_COMPANY_CONTACTS, {
      filter: { companyId: { eq: companyId } },
      limit: 1000,
      nextToken,
    });

    const items = data.listAPSCompanyContacts?.items ?? [];
    contacts.push(...items.filter(Boolean));
    nextToken = data.listAPSCompanyContacts?.nextToken ?? null;
  } while (nextToken);

  return contacts;
}

export async function createCompanyContact(formData: FormData) {
  const companyId = formData.get("companyId")?.toString();
  const eventId = formData.get("eventId")?.toString();
  const email = formData.get("email")?.toString().trim() || "";
  const name = parseNullableString(formData.get("name"));
  const phone = parseNullableString(formData.get("phone"));
  const title = parseNullableString(formData.get("title"));

  if (!companyId) throw new Error("Missing company id");
  if (!eventId) throw new Error("Missing event id");
  if (!email) throw new Error("Contact email is required");

  await requestGraphQL(CREATE_COMPANY_CONTACT, {
    input: {
      companyId,
      email,
      name,
      phone,
      title,
    },
  });

  revalidatePath(`/aps/${eventId}/companies/${companyId}`);
}

export async function updateCompanyContact(formData: FormData) {
  const id = formData.get("id")?.toString();
  const companyId = formData.get("companyId")?.toString();
  const eventId = formData.get("eventId")?.toString();
  const email = formData.get("email")?.toString().trim() || "";
  const name = parseNullableString(formData.get("name"));
  const phone = parseNullableString(formData.get("phone"));
  const title = parseNullableString(formData.get("title"));

  if (!id) throw new Error("Missing contact id");
  if (!companyId) throw new Error("Missing company id");
  if (!eventId) throw new Error("Missing event id");
  if (!email) throw new Error("Contact email is required");

  await requestGraphQL(UPDATE_COMPANY_CONTACT, {
    input: {
      id,
      companyId,
      email,
      name,
      phone,
      title,
    },
  });

  revalidatePath(`/aps/${eventId}/companies/${companyId}`);
}

export async function deleteCompanyContact(formData: FormData) {
  const id = formData.get("id")?.toString();
  const companyId = formData.get("companyId")?.toString();
  const eventId = formData.get("eventId")?.toString();

  if (!id) throw new Error("Missing contact id");
  if (!companyId) throw new Error("Missing company id");
  if (!eventId) throw new Error("Missing event id");

  await requestGraphQL(DELETE_COMPANY_CONTACT, { input: { id } });
  revalidatePath(`/aps/${eventId}/companies/${companyId}`);
}

export async function importCompaniesFromCSV(eventId: string): Promise<{
  success: number;
  errors: Array<{ id: string; name: string; error: string }>;
}> {
  const errors: Array<{ id: string; name: string; error: string }> = [];
  let success = 0;

  try {
    // Read the CSV file
    const filePath = join(process.cwd(), "data", "apsComanies.csv");
    const fileContent = await readFile(filePath, "utf-8");
    const lines = fileContent.split("\n").filter((line) => line.trim());

    // Skip header row
    const dataLines = lines.slice(1);

    // Process in batches to avoid overwhelming the API
    const batchSize = 10;
    for (let i = 0; i < dataLines.length; i += batchSize) {
      const batch = dataLines.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (line) => {
          if (!line.trim()) return;

          try {
            const fields = parseCSVLine(line);
            if (fields.length < 6) {
              return; // Skip invalid lines
            }

            const id = fields[0]?.replace(/^"|"$/g, "").trim();
            const email = cleanEmail(fields[3]?.replace(/^"|"$/g, "") || "");
            const name = fields[4]?.replace(/^"|"$/g, "").trim() || "";
            const type = parseCompanyType(fields[5]?.replace(/^"|"$/g, "") || "");

            if (!id || !name || !email) {
              errors.push({
                id: id || "unknown",
                name: name || "unknown",
                error: "Missing required fields (id, name, or email)",
              });
              return;
            }

            await requestGraphQL(CREATE_COMPANY, {
              input: {
                id,
                name,
                email,
                type,
              },
            });

            await requestGraphQL(CREATE_APS_COMPANY_EVENT, {
              input: {
                aPSId: eventId,
                aPSCompanyId: id,
              },
            });
            success++;
          } catch (error) {
            const fields = parseCSVLine(line);
            const id = fields[0]?.replace(/^"|"$/g, "").trim() || "unknown";
            const name = fields[4]?.replace(/^"|"$/g, "").trim() || "unknown";
            errors.push({
              id,
              name,
              error: error instanceof Error ? error.message : String(error),
            });
          }
        })
      );

      // Small delay between batches to avoid rate limiting
      if (i + batchSize < dataLines.length) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    return { success, errors };
  } catch (error) {
    throw new Error(
      `Failed to import companies: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

