'use server';

import { revalidatePath } from 'next/cache';
import { requestGraphQL } from '@/lib/appsync';

const GET_CERTIFICATE = /* GraphQL */ `
  query GetCertificateOfCompletion($id: ID!) {
    getAPS(id: $id) {
      id
      certificateOfCompletionOpen
      certificateOfCompletionUrl
    }
  }
`;

const SET_CERTIFICATE = /* GraphQL */ `
  mutation SetCertificateOfCompletion($input: UpdateAPSInput!) {
    updateAPS(input: $input) {
      id
      certificateOfCompletionOpen
      certificateOfCompletionUrl
    }
  }
`;

export type CertificateGate = {
  open: boolean;
  url: string;
};

export async function fetchCertificateOfCompletion(eventId: string): Promise<CertificateGate> {
  const data = await requestGraphQL<{
    getAPS?: {
      certificateOfCompletionOpen?: boolean | null;
      certificateOfCompletionUrl?: string | null;
    } | null;
  }>(GET_CERTIFICATE, { id: eventId });
  return {
    open: !!data.getAPS?.certificateOfCompletionOpen,
    url: String(data.getAPS?.certificateOfCompletionUrl || ''),
  };
}

export async function saveCertificateOfCompletionAction(formData: FormData) {
  const eventId = String(formData.get('eventId') || '').trim();
  if (!eventId) throw new Error('Missing event id.');
  const open = String(formData.get('open') || '') === 'true';
  const url = String(formData.get('url') || '').trim();
  await requestGraphQL(SET_CERTIFICATE, {
    input: {
      id: eventId,
      certificateOfCompletionOpen: open,
      certificateOfCompletionUrl: url || null,
    },
  });
  revalidatePath(`/aps/${eventId}/certificate`);
}
