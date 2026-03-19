'use server';

import { requestGraphQL } from '@/lib/appsync';
import { revalidatePath } from 'next/cache';

export type BoardMember = {
  id: string;
  name: string;
  title?: string | null;
  bio?: string | null;
  company: string;
  email: string;
  linkedin?: string | null;
  profilePic?: string | null;
};

type ListBoardsResponse = {
  listAPSBoards?: {
    items?: Array<BoardMember | null> | null;
    nextToken?: string | null;
  } | null;
};

const LIST_APS_BOARDS = /* GraphQL */ `
  query ListAPSBoards($limit: Int, $nextToken: String) {
    listAPSBoards(limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        title
        bio
        company
        email
        linkedin
        profilePic
      }
      nextToken
    }
  }
`;

const CREATE_APS_BOARD = /* GraphQL */ `
  mutation CreateAPSBoard($input: CreateAPSBoardInput!) {
    createAPSBoard(input: $input) {
      id
    }
  }
`;

const UPDATE_APS_BOARD = /* GraphQL */ `
  mutation UpdateAPSBoard($input: UpdateAPSBoardInput!) {
    updateAPSBoard(input: $input) {
      id
    }
  }
`;

const DELETE_APS_BOARD = /* GraphQL */ `
  mutation DeleteAPSBoard($input: DeleteAPSBoardInput!) {
    deleteAPSBoard(input: $input) {
      id
    }
  }
`;

function normalizeOptionalString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const normalized = value.trim();
  return normalized.length ? normalized : null;
}

function normalizeRequiredString(value: unknown, fieldName: string): string {
  const normalized = normalizeOptionalString(value);
  if (!normalized) {
    throw new Error(`Missing required field: ${fieldName}`);
  }
  return normalized;
}

export async function fetchBoardMembers(): Promise<BoardMember[]> {
  const all: BoardMember[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const data = await requestGraphQL<ListBoardsResponse>(LIST_APS_BOARDS, {
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const page = data.listAPSBoards;
    const items = page?.items ?? [];
    for (const item of items) {
      if (item?.id) all.push(item);
    }

    nextToken = page?.nextToken ?? null;
  } while (nextToken);

  return all.sort((a, b) => a.name.localeCompare(b.name));
}

export async function createBoardMember(formData: FormData) {
  const name = normalizeRequiredString(formData.get('name'), 'name');
  const company = normalizeRequiredString(formData.get('company'), 'company');
  const email = normalizeRequiredString(formData.get('email'), 'email');
  const title = normalizeOptionalString(formData.get('title'));
  const bio = normalizeOptionalString(formData.get('bio'));
  const linkedin = normalizeOptionalString(formData.get('linkedin'));
  const profilePic = normalizeOptionalString(formData.get('profilePic'));

  await requestGraphQL(CREATE_APS_BOARD, {
    input: {
      name,
      company,
      email,
      title,
      bio,
      linkedin,
      profilePic,
    },
  });

  revalidatePath('/board');
}

export async function updateBoardMember(formData: FormData) {
  const id = normalizeRequiredString(formData.get('id'), 'id');
  const name = normalizeRequiredString(formData.get('name'), 'name');
  const company = normalizeRequiredString(formData.get('company'), 'company');
  const email = normalizeRequiredString(formData.get('email'), 'email');
  const title = normalizeOptionalString(formData.get('title'));
  const bio = normalizeOptionalString(formData.get('bio'));
  const linkedin = normalizeOptionalString(formData.get('linkedin'));
  const profilePic = normalizeOptionalString(formData.get('profilePic'));

  await requestGraphQL(UPDATE_APS_BOARD, {
    input: {
      id,
      name,
      company,
      email,
      title,
      bio,
      linkedin,
      profilePic,
    },
  });

  revalidatePath('/board');
}

export async function deleteBoardMember(formData: FormData) {
  const id = normalizeRequiredString(formData.get('id'), 'id');
  await requestGraphQL(DELETE_APS_BOARD, { input: { id } });
  revalidatePath('/board');
}
