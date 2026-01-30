"use server";

import { revalidatePath } from "next/cache";
import { requestGraphQL } from "@/lib/appsync";
import { readFile } from "fs/promises";
import { join } from "path";

type CompanyType = "OEMTIER1" | "SOLUTIONPROVIDER" | "SPONSOR" | null;

type CompanyInput = {
  id: string;
  name: string;
  email: string;
  type: CompanyType;
  eventId: string;
};

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
  eventId: string;
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
      eventId
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
      eventId
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

export async function updateCompany(formData: FormData) {
  const id = formData.get("id")?.toString();
  const eventId = formData.get("eventId")?.toString();
  const name = formData.get("name")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const type = parseCompanyType(formData.get("type")?.toString() || "");

  if (!id) throw new Error("Missing company id");
  if (!eventId) throw new Error("Missing event id");
  if (!name) throw new Error("Company name is required");
  if (!email) throw new Error("Company email is required");

  const input = {
    id,
    eventId,
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
  revalidatePath(`/aps/${eventId}/companies/${id}`);
  revalidatePath(`/aps/${eventId}/sponsors`);
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

            const input: CompanyInput = {
              id,
              name,
              email,
              type,
              eventId,
            };

            await requestGraphQL(CREATE_COMPANY, { input });
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

