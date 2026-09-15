import { NextRequest, NextResponse } from 'next/server';
import {
  getEmailTrackingGif,
  getTrackedAssetUrl,
  recordEmailOpen,
  verifyOpenToken,
} from '@/lib/email-tracking';

export const dynamic = 'force-dynamic';

function gifFallback() {
  return new NextResponse(new Uint8Array(getEmailTrackingGif()), {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Content-Length': String(getEmailTrackingGif().length),
      'Cache-Control': 'no-store',
    },
  });
}

export async function GET(req: NextRequest) {
  const sendId = req.nextUrl.searchParams.get('s') || '';
  const token = req.nextUrl.searchParams.get('t') || '';
  const name = req.nextUrl.searchParams.get('n') || '';
  const assetUrl = getTrackedAssetUrl(name);

  if (!sendId || !token || !assetUrl || !verifyOpenToken(sendId, token)) {
    return gifFallback();
  }

  await recordEmailOpen(sendId);

  try {
    const upstream = await fetch(assetUrl, {
      headers: { Accept: 'image/*' },
      redirect: 'follow',
      cache: 'no-store',
    });
    if (!upstream.ok) return gifFallback();

    const contentType = upstream.headers.get('content-type') || 'image/png';
    if (!contentType.startsWith('image/')) return gifFallback();

    const bytes = Buffer.from(await upstream.arrayBuffer());
    return new NextResponse(bytes, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': String(bytes.length),
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch {
    return gifFallback();
  }
}
