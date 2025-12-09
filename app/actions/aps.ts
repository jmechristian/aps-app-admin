'use server';

import { revalidatePath } from "next/cache";
import { requestGraphQL } from "@/lib/appsync";

type APSInput = {
  year: string;
  codes?: string[] | null;
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

function buildInput(formData: FormData): APSInput {
  const year = formData.get("year")?.toString().trim() || "";
  if (!year) {
    throw new Error("Year is required");
  }

  const codes = parseCodes(formData.get("codes"));
  return { year, codes: codes?.length ? codes : null };
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
    const input = { id, ...buildInput(formData) };
    await requestGraphQL(UPDATE_APS, { input });
    revalidatePath("/");
    revalidatePath(`/aps/${id}`);
  } catch (error) {
    console.error("Update APS failed", error);
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

