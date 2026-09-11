import QRCode from 'qrcode';
import { fetchExhibitorProfilesByEventId } from '@/app/actions/event-content';
import { renderPlacardPdf, type PlacardPdfExhibitor } from '@/lib/placard-pdf';
import type { PlacardExhibitor } from '@/lib/placards';

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

function toPlacardExhibitor(item: {
  id: string;
  boothNumber?: string | null;
  qrCode?: string | null;
  passportQrPayload?: string | null;
  company?: { name?: string | null } | null;
}): PlacardExhibitor {
  return {
    id: item.id,
    companyName: item.company?.name?.trim() || 'Exhibitor',
    boothNumber: item.boothNumber?.trim() || null,
    qrCodeUrl: item.qrCode ?? null,
    passportQrPayload: item.passportQrPayload ?? null,
  };
}

async function toPdfExhibitor(
  exhibitor: PlacardExhibitor,
): Promise<PlacardPdfExhibitor> {
  if (!exhibitor.passportQrPayload) {
    return { ...exhibitor, qrDataUrl: '' };
  }
  const qrDataUrl = await QRCode.toDataURL(exhibitor.passportQrPayload, {
    type: 'image/png',
    width: 512,
    margin: 1,
    errorCorrectionLevel: 'M',
  });
  return { ...exhibitor, qrDataUrl };
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const exhibitors = (await fetchExhibitorProfilesByEventId(id))
    .map(toPlacardExhibitor)
    .sort((a, b) =>
      a.companyName.localeCompare(b.companyName, undefined, {
        sensitivity: 'base',
      }),
    );

  if (exhibitors.length === 0) {
    return new Response('No exhibitors to print.', { status: 400 });
  }

  const pdfExhibitors = await mapPool(exhibitors, 8, toPdfExhibitor);
  const pdf = await renderPlacardPdf({ exhibitors: pdfExhibitors });
  const body = new Uint8Array(pdf);

  return new Response(body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="aps-${id}-passport-placards.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
}
