# Passport Challenge

Exhibitor passport QR codes encode an opaque payload in this format:

```text
aps-passport:v1:<eventId>:<exhibitorId>:<nonce>:<signature>
```

The attendee app should treat the full scanned string as the lookup key. Do not
derive stamp completion from the exhibitor ID inside the payload alone.

## App Scan Flow

After Amplify push and codegen, the attendee app can complete a scan with the
generated AppSync model API:

1. Scan the QR code and read the full payload string.
2. Query `apsAppExhibitorProfilesByPassportQrPayload` with
   `passportQrPayload` equal to the scanned string.
3. Reject the scan if no exhibitor is found or if the returned `eventId` does
   not match the active event.
4. Build a duplicate-safe stamp key:

```ts
const stampKey = `${eventId}#${userProfileId}#${exhibitorId}`;
```

5. Query `apsAppUserPassportStampsByStampKey` with that key.
6. If a stamp already exists, return the existing stamp as an idempotent
   success.
7. Otherwise create `ApsAppUserPassportStamp`:

```ts
{
  id: stampKey,
  userProfileId,
  exhibitorId,
  eventId,
  stampKey,
  scannedAt: new Date().toISOString(),
}
```

## Notes

- The QR payload is intentionally long and opaque so users cannot complete
  stamps by guessing raw exhibitor IDs.
- Use `id: stampKey` on create. That makes duplicate scans naturally
  idempotent at the record level, even if two scan requests happen at almost the
  same time.
- Direct generated AppSync model mutations cannot verify the signature with a
  server-side secret. If we need stricter enforcement later, move the scan
  completion into a custom AppSync resolver or Lambda function.
- `ApsAppUserPassportStamp` uses owner auth, so users can manage their own
  stamps while Admin group users can inspect records.
