import { BRAND } from '@/lib/badges';

/** Letter page folded in half to stand as a 8.5" × 5.5" tent placard. */
export const PLACARD_PAGE = {
  pageIn: { w: 8.5, h: 11 },
  faceIn: { w: 8.5, h: 5.5 },
  pagePt: { w: 8.5 * 72, h: 11 * 72 },
  facePt: { w: 8.5 * 72, h: 5.5 * 72 },
} as const;

export const PLACARD_COLORS = {
  navy: BRAND.darkblue,
  blue: BRAND.blue,
  yellow: BRAND.yellow,
  ink: '#111111',
  mute: '#4b5563',
} as const;

export type PlacardExhibitor = {
  id: string;
  companyName: string;
  boothNumber: string | null;
  qrCodeUrl: string | null;
  passportQrPayload: string | null;
};

export function companyNameFontSizePt(name: string): number {
  const length = name.trim().length;
  if (length >= 36) return 20;
  if (length >= 28) return 24;
  if (length >= 20) return 28;
  if (length >= 14) return 34;
  if (length >= 8) return 40;
  return 46;
}

export function formatBoothLabel(boothNumber: string | null): string | null {
  const value = boothNumber?.trim();
  if (!value) return null;
  return /^booth\b/i.test(value) ? value : `Booth ${value}`;
}

export function previewPx(pt: number, cardWidth: number): number {
  return (pt / PLACARD_PAGE.pagePt.w) * cardWidth;
}
