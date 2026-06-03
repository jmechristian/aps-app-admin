'use server';

import { requestGraphQL } from '@/lib/appsync';
import { revalidatePath } from 'next/cache';
import { fetchRegistrantById } from '@/app/actions/registrants';
import { fetchSpeakerProfileById } from '@/app/actions/event-content';

const CREATE_APS_SPEAKER = /* GraphQL */ `
  mutation CreateAPSSpeaker($input: CreateAPSSpeakerInput!) {
    createAPSSpeaker(input: $input) {
      id
      eventId
      profileId
      presentationTitle
      presentationSummary
    }
  }
`;

const UPDATE_APS_SPEAKER = /* GraphQL */ `
  mutation UpdateAPSSpeaker($input: UpdateAPSSpeakerInput!) {
    updateAPSSpeaker(input: $input) {
      id
      presentationTitle
      presentationSummary
    }
  }
`;

const UPDATE_APS_REGISTRANT = /* GraphQL */ `
  mutation UpdateApsRegistrant($input: UpdateApsRegistrantInput!) {
    updateApsRegistrant(input: $input) {
      id
      attendeeType
    }
  }
`;

const UPDATE_APP_USER_PROFILE = /* GraphQL */ `
  mutation UpdateApsAppUserProfile($input: UpdateApsAppUserProfileInput!) {
    updateApsAppUserProfile(input: $input) {
      id
      speakerId
    }
  }
`;

const LIST_APS_SPEAKERS = /* GraphQL */ `
  query ListAPSSpeakers($filter: ModelAPSSpeakerFilterInput, $limit: Int, $nextToken: String) {
    listAPSSpeakers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
      }
      nextToken
    }
  }
`;

const LIST_SESSION_SPEAKERS = /* GraphQL */ `
  query ListSessionSpeakers($filter: ModelSessionSpeakersFilterInput, $limit: Int, $nextToken: String) {
    listSessionSpeakers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        aPSSpeakerId
      }
      nextToken
    }
  }
`;

const DELETE_SESSION_SPEAKERS = /* GraphQL */ `
  mutation DeleteSessionSpeakers($input: DeleteSessionSpeakersInput!) {
    deleteSessionSpeakers(input: $input) {
      id
    }
  }
`;

const DELETE_APS_SPEAKER = /* GraphQL */ `
  mutation DeleteAPSSpeaker($input: DeleteAPSSpeakerInput!) {
    deleteAPSSpeaker(input: $input) {
      id
    }
  }
`;

const SESSION_SPEAKERS_BY_SPEAKER_ID = /* GraphQL */ `
  query SessionSpeakersByAPSSpeakerId(
    $aPSSpeakerId: ID!
    $limit: Int
    $nextToken: String
  ) {
    sessionSpeakersByAPSSpeakerId(
      aPSSpeakerId: $aPSSpeakerId
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

const FAVORITE_SPEAKERS_BY_SPEAKER_ID = /* GraphQL */ `
  query ApsAppUserFavoriteSpeakersBySpeakerIdAndCreatedAt(
    $speakerId: ID!
    $limit: Int
    $nextToken: String
  ) {
    apsAppUserFavoriteSpeakersBySpeakerIdAndCreatedAt(
      speakerId: $speakerId
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

const DELETE_FAVORITE_SPEAKER = /* GraphQL */ `
  mutation DeleteApsAppUserFavoriteSpeaker(
    $input: DeleteApsAppUserFavoriteSpeakerInput!
  ) {
    deleteApsAppUserFavoriteSpeaker(input: $input) {
      id
    }
  }
`;

export async function updateSpeakerProfile(
  _prevState: { ok: boolean; message: string },
  formData: FormData
): Promise<{ ok: boolean; message: string }> {
  try {
    const id = formData.get('speakerId')?.toString();
    const eventId = formData.get('eventId')?.toString();
    const presentationTitle =
      formData.get('presentationTitle')?.toString().trim() || '';
    const presentationSummary =
      formData.get('presentationSummary')?.toString().trim() || '';

    if (!id) return { ok: false, message: 'Missing speaker id.' };
    if (!eventId) return { ok: false, message: 'Missing event id.' };

    const input = {
      id,
      presentationTitle: presentationTitle || null,
      presentationSummary: presentationSummary || null,
    };

    await requestGraphQL(UPDATE_APS_SPEAKER, { input });
    revalidatePath(`/aps/${eventId}/speakers/${id}`);
    return { ok: true, message: 'Speaker updated.' };
  } catch (error) {
    console.error('Failed to update speaker:', error);
    return { ok: false, message: 'Failed to update speaker.' };
  }
}

/**
 * Speakers are people: pick an existing registrant and promote them to an APSSpeaker.
 * (Also ensures registrant.attendeeType becomes SPEAKER.)
 */
export async function createSpeakerFromRegistrantId(input: {
  eventId: string;
  registrantId: string;
}) {
  const registrant = await fetchRegistrantById(input.registrantId);
  if (!registrant) throw new Error('Registrant not found');

  if (registrant.apsID !== input.eventId) {
    throw new Error('Registrant does not belong to this event');
  }

  const profileId = registrant.appUser?.profile?.id ?? null;
  if (!profileId) {
    throw new Error('Registrant must have a profile to be created as a speaker');
  }

  // Ensure the registrant is marked as a speaker (best-effort; used elsewhere in the app)
  if (registrant.attendeeType !== 'SPEAKER') {
    await requestGraphQL(UPDATE_APS_REGISTRANT, {
      input: { id: registrant.id, attendeeType: 'SPEAKER' },
    });
  }

  // Create APSSpeaker record (what the Speakers page lists)
  const speakerRes = await requestGraphQL<{
    createAPSSpeaker?: { id: string } | null;
  }>(CREATE_APS_SPEAKER, {
    input: {
      eventId: input.eventId,
      profileId,
      presentationTitle: registrant.presentationTitle ?? null,
      presentationSummary: registrant.presentationSummary ?? null,
    },
  });

  if (!speakerRes.createAPSSpeaker?.id) {
    throw new Error('Failed to create APSSpeaker');
  }

  await requestGraphQL(UPDATE_APP_USER_PROFILE, {
    input: { id: profileId, speakerId: speakerRes.createAPSSpeaker.id },
  });

  return speakerRes.createAPSSpeaker;
}

async function listSessionSpeakerJoinIdsBySpeakerId(
  speakerId: string,
): Promise<string[]> {
  const ids: string[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const response: {
      sessionSpeakersByAPSSpeakerId?: {
        items?: Array<{ id?: string | null } | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(SESSION_SPEAKERS_BY_SPEAKER_ID, {
      aPSSpeakerId: speakerId,
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const items = response.sessionSpeakersByAPSSpeakerId?.items ?? [];
    for (const item of items) {
      if (item?.id) ids.push(item.id);
    }
    nextToken = response.sessionSpeakersByAPSSpeakerId?.nextToken ?? null;
  } while (nextToken);

  return ids;
}

async function listFavoriteSpeakerIdsBySpeakerId(
  speakerId: string,
): Promise<string[]> {
  const ids: string[] = [];
  let nextToken: string | null | undefined = null;

  do {
    const response: {
      apsAppUserFavoriteSpeakersBySpeakerIdAndCreatedAt?: {
        items?: Array<{ id?: string | null } | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(FAVORITE_SPEAKERS_BY_SPEAKER_ID, {
      speakerId,
      limit: 1000,
      nextToken: nextToken || undefined,
    });

    const items =
      response.apsAppUserFavoriteSpeakersBySpeakerIdAndCreatedAt?.items ?? [];
    for (const item of items) {
      if (item?.id) ids.push(item.id);
    }
    nextToken =
      response.apsAppUserFavoriteSpeakersBySpeakerIdAndCreatedAt?.nextToken ??
      null;
  } while (nextToken);

  return ids;
}

/**
 * Removes an APSSpeaker from the event (and session links) without deleting
 * the registrant or app user profile.
 */
export async function deleteSpeaker(input: {
  speakerId: string;
  eventId: string;
}) {
  const speaker = await fetchSpeakerProfileById(input.speakerId);
  if (!speaker) {
    throw new Error('Speaker not found');
  }
  if (speaker.eventId !== input.eventId) {
    throw new Error('Speaker does not belong to this event');
  }

  const sessionSpeakerIds = await listSessionSpeakerJoinIdsBySpeakerId(
    input.speakerId,
  );
  for (const id of sessionSpeakerIds) {
    await requestGraphQL(DELETE_SESSION_SPEAKERS, { input: { id } });
  }

  const favoriteIds = await listFavoriteSpeakerIdsBySpeakerId(input.speakerId);
  for (const id of favoriteIds) {
    await requestGraphQL(DELETE_FAVORITE_SPEAKER, { input: { id } });
  }

  if (speaker.profileId) {
    await requestGraphQL(UPDATE_APP_USER_PROFILE, {
      input: { id: speaker.profileId, speakerId: null },
    });
  }

  await requestGraphQL(DELETE_APS_SPEAKER, { input: { id: input.speakerId } });

  revalidatePath(`/aps/${input.eventId}/speakers`);
  revalidatePath(`/aps/${input.eventId}/speakers/${input.speakerId}`);
  revalidatePath(`/aps/${input.eventId}/agenda`);
}

export async function cleanupOrphanedSessionSpeakers() {
  const speakerIds = new Set<string>();
  let nextToken: string | null | undefined = null;

  do {
    const response: {
      listAPSSpeakers?: {
        items?: Array<{ id?: string | null } | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(LIST_APS_SPEAKERS, {
      limit: 1000,
      nextToken: nextToken || undefined,
    });
    const items = response.listAPSSpeakers?.items ?? [];
    for (const item of items) {
      if (item?.id) speakerIds.add(item.id);
    }
    nextToken = response.listAPSSpeakers?.nextToken ?? null;
  } while (nextToken);

  let removed = 0;
  nextToken = null;
  do {
    const response: {
      listSessionSpeakers?: {
        items?: Array<{ id?: string | null; aPSSpeakerId?: string | null } | null>;
        nextToken?: string | null;
      } | null;
    } = await requestGraphQL(LIST_SESSION_SPEAKERS, {
      limit: 1000,
      nextToken: nextToken || undefined,
    });
    const items = response.listSessionSpeakers?.items ?? [];
    for (const item of items) {
      const speakerId = item?.aPSSpeakerId ?? null;
      if (!item?.id) continue;
      if (!speakerId || !speakerIds.has(speakerId)) {
        await requestGraphQL(DELETE_SESSION_SPEAKERS, {
          input: { id: item.id },
        });
        removed += 1;
      }
    }
    nextToken = response.listSessionSpeakers?.nextToken ?? null;
  } while (nextToken);

  return { removed };
}


