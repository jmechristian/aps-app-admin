"use server";

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

