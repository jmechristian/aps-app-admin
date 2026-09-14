export const ATTENDEE_QR_WEB_BASE = 'https://autopacksummit.com/app/c';

/** Payload encoded in attendee badge / profile QR codes. */
export function attendeeQrPayload(registrantId: string) {
  return `${ATTENDEE_QR_WEB_BASE}/${encodeURIComponent(String(registrantId))}`;
}
