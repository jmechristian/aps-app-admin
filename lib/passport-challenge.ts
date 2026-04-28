export type ExhibitorPassportPayload = {
  eventId: string;
  exhibitorId: string;
  nonce: string;
  signature: string;
};

export function buildPassportStampKey(params: {
  eventId: string;
  userProfileId: string;
  exhibitorId: string;
}) {
  return `${params.eventId}#${params.userProfileId}#${params.exhibitorId}`;
}

export function parseExhibitorPassportPayload(
  payload: string
): ExhibitorPassportPayload | null {
  const parts = payload.split(':');
  if (parts.length !== 6) return null;

  const [prefix, version, eventId, exhibitorId, nonce, signature] = parts;
  if (prefix !== 'aps-passport' || version !== 'v1') return null;
  if (!eventId || !exhibitorId || !nonce || !signature) return null;

  return { eventId, exhibitorId, nonce, signature };
}
