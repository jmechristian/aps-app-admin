'use server';

import { revalidatePath } from "next/cache";
import { requestGraphQL } from "@/lib/appsync";

type APSInput = {
  year: string;
  codes?: string[] | null;
  startDate?: string | null;
  endDate?: string | null;
  location?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  zip?: string | null;
  website?: string | null;
};

const CREATE_APS = /* GraphQL */ `
  mutation CreateAPS($input: CreateAPSInput!) {
    createAPS(input: $input) {
      id
    }
  }
`;

const UPDATE_APS = /* GraphQL */ `
  mutation UpdateAPS($input: UpdateAPSInput!) {
    updateAPS(input: $input) {
      id
      year
      codes
      startDate
      endDate
      location
      address
      city
      state
      zip
      website
    }
  }
`;

const DELETE_APS = /* GraphQL */ `
  mutation DeleteAPS($input: DeleteAPSInput!) {
    deleteAPS(input: $input) {
      id
    }
  }
`;

function parseCodes(raw: FormDataEntryValue | null): string[] | null {
  if (!raw) return null;
  return raw
    .toString()
    .split(",")
    .map((code) => code.trim())
    .filter(Boolean);
}

function parseString(raw: FormDataEntryValue | null): string | null {
  if (!raw) return null;
  const value = raw.toString().trim();
  return value ? value : null;
}

function buildInput(formData: FormData, includeCodes: boolean = false): APSInput {
  const year = formData.get("year")?.toString().trim() || "";
  if (!year) {
    throw new Error("Year is required");
  }

  const input: APSInput = {
    year,
    startDate: parseString(formData.get("startDate")),
    endDate: parseString(formData.get("endDate")),
    location: parseString(formData.get("location")),
    address: parseString(formData.get("address")),
    city: parseString(formData.get("city")),
    state: parseString(formData.get("state")),
    zip: parseString(formData.get("zip")),
    website: parseString(formData.get("website")),
  };

  if (includeCodes) {
    const codes = parseCodes(formData.get("codes"));
    input.codes = codes?.length ? codes : null;
  }

  return input;
}

export async function createAps(formData: FormData) {
  try {
    const input = buildInput(formData);
    await requestGraphQL(CREATE_APS, { input });
    revalidatePath("/");
  } catch (error) {
    console.error("Create APS failed", error);
    throw error;
  }
}

export async function updateAps(formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    if (!id) {
      throw new Error("Missing APS id");
    }
    const input = { id, ...buildInput(formData, false) };
    await requestGraphQL(UPDATE_APS, { input });
    revalidatePath("/");
    revalidatePath(`/aps/${id}`);
  } catch (error) {
    console.error("Update APS failed", error);
    throw error;
  }
}

const GET_APS_FOR_CODES = /* GraphQL */ `
  query GetAPS($id: ID!) {
    getAPS(id: $id) {
      id
      year
      codes
    }
  }
`;

export async function addCodeToAps(id: string, code: string) {
  try {
    // Fetch current APS to get existing codes and year
    const data = await requestGraphQL<{ getAPS?: { year: string; codes?: string[] | null } | null }>(GET_APS_FOR_CODES, { id });
    if (!data.getAPS) {
      throw new Error("APS not found");
    }
    
    const currentCodes = data.getAPS.codes ?? [];
    
    // Check if code already exists
    if (currentCodes.includes(code.trim())) {
      throw new Error("Code already exists");
    }

    // Add new code
    const updatedCodes = [...currentCodes, code.trim()];
    
    await requestGraphQL(UPDATE_APS, { 
      input: { 
        id, 
        year: data.getAPS.year,
        codes: updatedCodes 
      } 
    });
    revalidatePath(`/aps/${id}`);
  } catch (error) {
    console.error("Add code failed", error);
    throw error;
  }
}

export async function removeCodeFromAps(id: string, code: string) {
  try {
    // Fetch current APS to get existing codes and year
    const data = await requestGraphQL<{ getAPS?: { year: string; codes?: string[] | null } | null }>(GET_APS_FOR_CODES, { id });
    if (!data.getAPS) {
      throw new Error("APS not found");
    }
    
    const currentCodes = data.getAPS.codes ?? [];
    
    // Remove the code
    const updatedCodes = currentCodes.filter((c) => c !== code);
    
    await requestGraphQL(UPDATE_APS, { 
      input: { 
        id, 
        year: data.getAPS.year,
        codes: updatedCodes.length > 0 ? updatedCodes : null 
      } 
    });
    revalidatePath(`/aps/${id}`);
  } catch (error) {
    console.error("Remove code failed", error);
    throw error;
  }
}

export async function deleteAps(formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    if (!id) {
      throw new Error("Missing APS id");
    }
    await requestGraphQL(DELETE_APS, { input: { id } });
    revalidatePath("/");
  } catch (error) {
    console.error("Delete APS failed", error);
    throw error;
  }
}

