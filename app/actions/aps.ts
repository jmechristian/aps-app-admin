'use server';

import { revalidatePath } from "next/cache";
import { requestGraphQL } from "@/lib/appsync";

type APSInput = {
  year: string;
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

const CREATE_APS_CODE = /* GraphQL */ `
  mutation CreateAPSCode($input: CreateAPSCodeInput!) {
    createAPSCode(input: $input) {
      id
      code
      eventId
      limit
      used
    }
  }
`;

const UPDATE_APS_CODE = /* GraphQL */ `
  mutation UpdateAPSCode($input: UpdateAPSCodeInput!) {
    updateAPSCode(input: $input) {
      id
      code
      eventId
      limit
      used
    }
  }
`;

const DELETE_APS_CODE = /* GraphQL */ `
  mutation DeleteAPSCode($input: DeleteAPSCodeInput!) {
    deleteAPSCode(input: $input) {
      id
    }
  }
`;

const APS_CODES_BY_EVENT = /* GraphQL */ `
  query APSCodesByEventId($eventId: ID!, $limit: Int, $nextToken: String) {
    aPSCodesByEventId(eventId: $eventId, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        eventId
        limit
        used
      }
      nextToken
    }
  }
`;

function parseString(raw: FormDataEntryValue | null): string | null {
  if (!raw) return null;
  const value = raw.toString().trim();
  return value ? value : null;
}

function buildInput(formData: FormData): Omit<APSInput, 'year'> & { year?: string } {
  const year = formData.get("year")?.toString().trim() || "";

  return {
    year: year || undefined,
    startDate: parseString(formData.get("startDate")),
    endDate: parseString(formData.get("endDate")),
    location: parseString(formData.get("location")),
    address: parseString(formData.get("address")),
    city: parseString(formData.get("city")),
    state: parseString(formData.get("state")),
    zip: parseString(formData.get("zip")),
    website: parseString(formData.get("website")),
  };
}

export type APSCodeItem = {
  id: string;
  code: string;
  eventId: string;
  limit?: number | null;
  used: number;
};

type ApsCodesResponse = {
  aPSCodesByEventId?: {
    items?: Array<APSCodeItem | null>;
    nextToken?: string | null;
  } | null;
};

export async function fetchCodesByEventId(eventId: string): Promise<APSCodeItem[]> {
  const items: APSCodeItem[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data: ApsCodesResponse = await requestGraphQL<ApsCodesResponse>(APS_CODES_BY_EVENT, {
      eventId,
      limit: 500,
      nextToken: nextToken || undefined,
    });

    const page = data.aPSCodesByEventId?.items ?? [];
    items.push(...(page.filter(Boolean) as APSCodeItem[]));
    nextToken = data.aPSCodesByEventId?.nextToken ?? null;
  } while (nextToken);

  return items;
}

export async function createAps(formData: FormData) {
  try {
    const year = formData.get("year")?.toString().trim();
    if (!year) throw new Error("Year is required");
    const input = { year, ...buildInput(formData) };
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
    if (!id) throw new Error("Missing APS id");
    const year = formData.get("year")?.toString().trim();
    if (!year) throw new Error("Year is required");
    const input = { id, year, ...buildInput(formData) };
    await requestGraphQL(UPDATE_APS, { input });
    revalidatePath("/");
    revalidatePath(`/aps/${id}`);
  } catch (error) {
    console.error("Update APS failed", error);
    throw error;
  }
}

export async function addCodeToAps(id: string, code: string) {
  try {
    const trimmed = code.trim();
    if (!trimmed) throw new Error("Code is required");

    const existing = await fetchCodesByEventId(id);
    if (existing.some((c) => c.code === trimmed)) {
      throw new Error("Code already exists");
    }

    await requestGraphQL(CREATE_APS_CODE, {
      input: {
        code: trimmed,
        eventId: id,
        used: 0,
      },
    });
    revalidatePath(`/aps/${id}`);
    revalidatePath(`/aps/${id}/codes`);
  } catch (error) {
    console.error("Add code failed", error);
    throw error;
  }
}

export async function addCodesToAps(id: string, codes: string[]) {
  try {
    const normalized = codes.map((c) => c.trim()).filter(Boolean);
    if (normalized.length === 0) throw new Error("No codes provided");

    const existing = await fetchCodesByEventId(id);
    const existingSet = new Set(existing.map((c) => c.code));

    for (const code of normalized) {
      if (existingSet.has(code)) continue;
      await requestGraphQL(CREATE_APS_CODE, {
        input: { code, eventId: id, used: 0 },
      });
      existingSet.add(code);
    }
    revalidatePath(`/aps/${id}`);
    revalidatePath(`/aps/${id}/codes`);
  } catch (error) {
    console.error("Add codes failed", error);
    throw error;
  }
}

export async function updateCode(
  eventId: string,
  codeId: string,
  updates: { code?: string; limit?: number | null | string }
) {
  try {
    const input: { id: string; code?: string; limit?: number | null } = {
      id: codeId,
    };
    if (updates.code != null) {
      const trimmed = String(updates.code).trim();
      if (!trimmed) throw new Error("Code cannot be empty");
      const existing = await fetchCodesByEventId(eventId);
      const duplicate = existing.find((c) => c.id !== codeId && c.code === trimmed);
      if (duplicate) throw new Error("That code already exists");
      input.code = trimmed;
    }
    if (updates.limit !== undefined) {
      const v = updates.limit;
      input.limit =
        v === null || v === '' || (typeof v === 'string' && v.trim() === '')
          ? null
          : isNaN(Number(v))
            ? null
            : Number(v);
    }
    await requestGraphQL(UPDATE_APS_CODE, { input });
    revalidatePath(`/aps/${eventId}`);
    revalidatePath(`/aps/${eventId}/codes`);
  } catch (error) {
    console.error("Update code failed", error);
    throw error;
  }
}

export async function removeCodeFromAps(id: string, codeId: string) {
  try {
    await requestGraphQL(DELETE_APS_CODE, { input: { id: codeId } });
    revalidatePath(`/aps/${id}`);
    revalidatePath(`/aps/${id}/codes`);
  } catch (error) {
    console.error("Remove code failed", error);
    throw error;
  }
}

export async function deleteAps(formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    if (!id) throw new Error("Missing APS id");
    await requestGraphQL(DELETE_APS, { input: { id } });
    revalidatePath("/");
  } catch (error) {
    console.error("Delete APS failed", error);
    throw error;
  }
}
