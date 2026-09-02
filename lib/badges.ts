export const BRAND = {
  yellow: '#E4A800',
  darkblue: '#005892',
  blue: '#0873B8',
  red: '#E43A00',
} as const;

export const TYPE_ORDER = [
  'OEM',
  'TIER1',
  'SPONSOR',
  'SPEAKER',
  'EXHIBITOR',
  'STAFF',
  'SOLUTIONPROVIDER',
] as const;

export type BadgeAttendeeType = (typeof TYPE_ORDER)[number];

export const TYPE_LABELS: Record<BadgeAttendeeType, string> = {
  OEM: 'OEM',
  TIER1: 'Tier 1',
  SPONSOR: 'Sponsor',
  SPEAKER: 'Speaker',
  EXHIBITOR: 'Exhibitor Staff',
  STAFF: 'Event Staff',
  SOLUTIONPROVIDER: 'Solution Provider',
};

export const TYPE_COLORS: Record<BadgeAttendeeType, string> = {
  OEM: BRAND.darkblue,
  TIER1: BRAND.blue,
  SPONSOR: '#076D32',
  SPEAKER: '#FF8000',
  EXHIBITOR: '#7F3F98',
  STAFF: BRAND.red,
  SOLUTIONPROVIDER: BRAND.yellow,
};

export const BADGE_DESIGNS = ['classic', 'rail', 'signal'] as const;
export type BadgeDesign = (typeof BADGE_DESIGNS)[number];

export const BADGE_DESIGN_LABELS: Record<BadgeDesign, string> = {
  classic: 'Classic',
  rail: 'Rail',
  signal: 'Signal',
};

/** Print page includes 0.125" bleed on every side around a 4" x 5" trim. */
export const BADGE_PAGE = {
  trimIn: { w: 4, h: 5 },
  bleedIn: 0.125,
  pageIn: { w: 4.25, h: 5.25 },
  pagePt: { w: 4.25 * 72, h: 5.25 * 72 },
  bleedPt: 0.125 * 72,
  trimPt: { w: 4 * 72, h: 5 * 72 },
} as const;

/** Color band starts at ~64.5% of trim height, matching the sample PDF. */
export const CLASSIC_SPLIT = 0.645;

export const APS_LOGO_SVG = '/images/AutoPackSummit-Color-Vector.svg';

export type BadgePerson = {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  attendeeType: string;
  tableNumber: number | null;
  qrCodeUrl: string | null;
  email: string;
  phone?: string | null;
  jobTitle?: string | null;
};

export function isBadgeDesign(value: string | null | undefined): value is BadgeDesign {
  return BADGE_DESIGNS.includes(value as BadgeDesign);
}

export function isBadgeAttendeeType(value: string): value is BadgeAttendeeType {
  return (TYPE_ORDER as readonly string[]).includes(value);
}

export function getTypeLabel(type: string): string {
  if (isBadgeAttendeeType(type)) return TYPE_LABELS[type];
  return type || 'Attendee';
}

export function getTypeColor(type: string): string {
  if (isBadgeAttendeeType(type)) return TYPE_COLORS[type];
  return BRAND.darkblue;
}

export function getPackIqVariant(type: string): 'white' | 'black' {
  return type === 'SPEAKER' || type === 'STAFF' || type === 'SOLUTIONPROVIDER'
    ? 'black'
    : 'white';
}

export function formatTableLabel(tableNumber: number | null): string {
  return tableNumber == null ? '#' : String(tableNumber);
}

export function firstNameFontSizePt(name: string): number {
  const length = name.trim().length;
  if (length >= 16) return 20;
  if (length >= 12) return 24;
  if (length >= 9) return 28;
  return 32;
}

export function typeLabelFontSizePt(label: string): number {
  if (label.length >= 18) return 16;
  if (label.length >= 12) return 20;
  if (label.length >= 8) return 24;
  return 28;
}

export function previewPx(pt: number, cardWidth: number): number {
  return (pt / BADGE_PAGE.pagePt.w) * cardWidth;
}

export function toBadgePerson(input: {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email: string;
  phone?: string | null;
  jobTitle?: string | null;
  attendeeType?: string | null;
  qrCode?: string | null;
  company?: { name?: string | null } | null;
  seatingChartRegistrant?: { tableNumber?: number | null } | null;
}): BadgePerson {
  return {
    id: input.id,
    firstName: input.firstName?.trim() || '',
    lastName: input.lastName?.trim() || '',
    company: input.company?.name?.trim() || '',
    attendeeType: input.attendeeType || 'OEM',
    tableNumber: input.seatingChartRegistrant?.tableNumber ?? null,
    qrCodeUrl: input.qrCode ?? null,
    email: input.email,
    phone: input.phone,
    jobTitle: input.jobTitle,
  };
}

export function groupBadgePeople(people: BadgePerson[]): Array<{
  type: string;
  label: string;
  people: BadgePerson[];
}> {
  const byType = new Map<string, BadgePerson[]>();
  for (const person of people) {
    const key = person.attendeeType || 'OTHER';
    const list = byType.get(key) ?? [];
    list.push(person);
    byType.set(key, list);
  }

  const sortPeople = (a: BadgePerson, b: BadgePerson) => {
    const last = a.lastName.localeCompare(b.lastName, undefined, {
      sensitivity: 'base',
    });
    if (last !== 0) return last;
    return a.firstName.localeCompare(b.firstName, undefined, {
      sensitivity: 'base',
    });
  };

  const groups: Array<{ type: string; label: string; people: BadgePerson[] }> =
    [];

  for (const type of TYPE_ORDER) {
    const list = byType.get(type);
    if (!list?.length) continue;
    groups.push({
      type,
      label: getTypeLabel(type),
      people: [...list].sort(sortPeople),
    });
    byType.delete(type);
  }

  for (const [type, list] of byType) {
    groups.push({
      type,
      label: getTypeLabel(type),
      people: [...list].sort(sortPeople),
    });
  }

  return groups;
}
