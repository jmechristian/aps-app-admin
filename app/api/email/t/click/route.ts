import { NextRequest, NextResponse } from 'next/server';
import {
  isAllowedRedirect,
  recordEmailClick,
  verifyClickToken,
} from '@/lib/email-tracking';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const sendId = req.nextUrl.searchParams.get('s') || '';
  const token = req.nextUrl.searchParams.get('t') || '';
  const destination = req.nextUrl.searchParams.get('u') || '';

  if (
    !sendId ||
    !token ||
    !destination ||
    !isAllowedRedirect(destination) ||
    !verifyClickToken(sendId, destination, token)
  ) {
    return NextResponse.json({ error: 'Invalid tracking link' }, { status: 400 });
  }

  await recordEmailClick(sendId, destination);
  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: destination,
      'Cache-Control': 'no-store',
    },
  });
}
