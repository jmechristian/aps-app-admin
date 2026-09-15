import { NextRequest, NextResponse } from 'next/server';
import {
  getEmailTrackingGif,
  isAllowedTrackingImage,
  recordEmailOpen,
  verifyImageToken,
} from '@/lib/email-tracking';

export const dynamic = 'force-dynamic';

function gifFallback() {
  return new NextResponse(new Uint8Array(getEmailTrackingGif()), {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store',
    },
  });
}

export async function GET(req: NextRequest) {
  const sendId = req.nextUrl.searchParams.get('s') || '';
  const token = req.nextUrl.searchParams.get('t') || '';
  const destination = req.nextUrl.searchParams.get('u') || '';

  if (
    !sendId ||
    !token ||
    !destination ||
    !isAllowedTrackingImage(destination) ||
    !verifyImageToken(sendId, destination, token)
  ) {
    return gifFallback();
  }

  await recordEmailOpen(sendId);

  try {
    const upstream = await fetch(destination, {
      headers: { Accept: 'image/*' },
      redirect: 'follow',
      cache: 'no-store',
    });
    if (!upstream.ok) return gifFallback();

    const contentType = upstream.headers.get('content-type') || 'image/png';
    if (!contentType.startsWith('image/')) return gifFallback();

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=300',
      },
    });
  } catch {
    return gifFallback();
  }
}
