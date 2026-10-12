/** Matches the number in `SC-6-1280.jpg`. A bare `SC-1280.jpg` does not match. */
const GALLERY_PHOTO_NUMBER = /-(\d+)-1280\.jpe?g$/i;

export function isGalleryJpeg(key: string): boolean {
  const name = key.split('/').pop() ?? '';
  return name.length > 0 && /\.jpe?g$/i.test(name);
}

/**
 * Integer used by the public media page.
 * `SC-6-1280.jpg` is 6, `SC-10-1280.jpg` is 10, and a JPEG with no number sorts as 0.
 */
export function galleryPhotoNumber(key: string): number {
  const name = key.split('/').pop() ?? key;
  const match = name.match(GALLERY_PHOTO_NUMBER);
  if (!match) return 0;
  const value = Number(match[1]);
  return Number.isFinite(value) ? value : 0;
}

/** Numeric order, then the full object key when two files share a number. */
export function compareGalleryPhotos(a: string, b: string): number {
  const numberDelta = galleryPhotoNumber(a) - galleryPhotoNumber(b);
  if (numberDelta !== 0) return numberDelta;
  return a.localeCompare(b);
}
