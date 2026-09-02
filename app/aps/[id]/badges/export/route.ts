import QRCode from 'qrcode';
import { fetchFullRegistrantDetailsByApsId } from '@/app/actions/registrants';
import { renderBadgePdf, type BadgePdfPerson } from '@/lib/badge-pdf';
import {
  groupBadgePeople,
  isBadgeDesign,
  toBadgePerson,
  type BadgePerson,
} from '@/lib/badges';
import { generateVCard } from '@/lib/vcard';

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
  const vcard = generateVCard({
    firstName: person.firstName,
    lastName: person.lastName,
    email: person.email,
    phone: person.phone,
    company: person.company,
    jobTitle: person.jobTitle,
  });
  const qrDataUrl = await QRCode.toDataURL(vcard, {
    type: 'image/png',
    width: 384,
    margin: 1,
    errorCorrectionLevel: 'M',
  });
  return { ...person, qrDataUrl };
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const designParam = new URL(req.url).searchParams.get('design');
  const design = isBadgeDesign(designParam) ? designParam : 'classic';

  const registrants = await fetchFullRegistrantDetailsByApsId(id);
  const people = registrants
    .filter((registrant) => registrant.status === 'APPROVED')
    .map(toBadgePerson);

  if (people.length === 0) {
    return new Response('No approved registrants to print.', { status: 400 });
  }

  const ordered = groupBadgePeople(people).flatMap((group) => group.people);
  const pdfPeople = await mapPool(ordered, 8, toPdfPerson);
  const pdf = await renderBadgePdf({ people: pdfPeople, design });

  const body = new Uint8Array(pdf);
  return new Response(body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="aps-${id}-badges-${design}.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
}
