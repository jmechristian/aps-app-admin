import { NextRequest, NextResponse } from 'next/server';
import {
  getEmailTrackingGif,
  recordEmailOpen,
  verifyOpenToken,
} from '@/lib/email-tracking';

export const dynamic = 'force-dynamic';

function gifResponse() {
  return new NextResponse(new Uint8Array(getEmailTrackingGif()), {
    status: 200,
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}

export async function GET(req: NextRequest) {
  const sendId = req.nextUrl.searchParams.get('s') || '';
  const token = req.nextUrl.searchParams.get('t') || '';

  if (sendId && token && verifyOpenToken(sendId, token)) {
    await recordEmailOpen(sendId);
  }

  return gifResponse();
}
