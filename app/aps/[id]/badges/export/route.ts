import QRCode from 'qrcode';
import { fetchFullRegistrantDetailsByApsId } from '@/app/actions/registrants';
import { renderBadgePdf, type BadgePdfPerson } from '@/lib/badge-pdf';
import {
  createBlankBadgePeople,
  groupBadgePeople,
  isBadgeDesign,
  toBadgePerson,
  type BadgeDesign,
  type BadgePerson,
} from '@/lib/badges';
import { attendeeQrPayload } from '@/lib/attendee-qr';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

async function mapPool<T, R>(
  items: T[],
  limit: number,
  mapper: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const current = nextIndex;
      nextIndex += 1;
      results[current] = await mapper(items[current]);
    }
  }

  const workers = Array.from({ length: Math.min(limit, items.length) }, () =>
    worker(),
  );
  await Promise.all(workers);
  return results;
}

async function toPdfPerson(person: BadgePerson): Promise<BadgePdfPerson> {
  const qrDataUrl = await QRCode.toDataURL(attendeeQrPayload(person.id), {
    type: 'image/png',
    width: 384,
    margin: 1,
    errorCorrectionLevel: 'M',
  });
  return { ...person, qrDataUrl };
}

function parseIds(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((id) => String(id).trim()).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value
      .split(',')
      .map((id) => id.trim())
      .filter(Boolean);
  }
  return [];
}

async function exportBadges(params: {
  eventId: string;
  design: BadgeDesign;
  ids: string[];
}) {
  const registrants = await fetchFullRegistrantDetailsByApsId(params.eventId);
  const approved = registrants
    .filter((registrant) => registrant.status === 'APPROVED')
    .map(toBadgePerson);

  if (approved.length === 0) {
    return new Response('No approved registrants to print.', { status: 400 });
  }

  const allow = new Set(params.ids);
  const selected =
    params.ids.length > 0
      ? approved.filter((person) => allow.has(person.id))
      : approved;

  if (selected.length === 0) {
    return new Response('No matching approved registrants to print.', {
      status: 400,
    });
  }

  const ordered = groupBadgePeople(selected).flatMap((group) => group.people);
  const includeBlanks = selected.length === approved.length;
  const pdfPeople = [
    ...(await mapPool(ordered, 8, toPdfPerson)),
    ...(includeBlanks
      ? createBlankBadgePeople().map((person) => ({
          ...person,
          qrDataUrl: '',
        }))
      : []),
  ];
  const pdf = await renderBadgePdf({ people: pdfPeople, design: params.design });
  const body = new Uint8Array(pdf);
  const subset = includeBlanks ? '' : `-${selected.length}`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="aps-${params.eventId}-badges-${params.design}${subset}.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const url = new URL(req.url);
  const designParam = url.searchParams.get('design');
  const design = isBadgeDesign(designParam) ? designParam : 'classic';
  return exportBadges({
    eventId: id,
    design,
    ids: parseIds(url.searchParams.get('ids')),
  });
}

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const body = (await req.json().catch(() => null)) as {
    design?: string;
    ids?: unknown;
  } | null;
  const design = isBadgeDesign(body?.design) ? body.design : 'classic';
  return exportBadges({
    eventId: id,
    design,
    ids: parseIds(body?.ids),
  });
}
