import { NextRequest, NextResponse } from 'next/server';

const AUTH_COOKIE = 'apsAdminJwt';

function normalizeCookieToken(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

function readJwtPayload(token: string): { exp?: number } | null {
  const parts = token.split('.');
  if (parts.length < 2) return null;
  try {
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4);
    const json = Buffer.from(padded, 'base64').toString('utf8');
    return JSON.parse(json) as { exp?: number };
  } catch {
    return null;
  }
}

function loginRedirect(req: NextRequest) {
  const url = req.nextUrl.clone();
  const nextPath = `${req.nextUrl.pathname}${req.nextUrl.search}`;
  url.pathname = '/login';
  url.search = '';
  if (nextPath && nextPath !== '/' && !nextPath.startsWith('/login')) {
    url.searchParams.set('next', nextPath);
  }
  return NextResponse.redirect(url);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/login' ||
    pathname === '/change-password' ||
    pathname === '/forgot-password' ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const rawToken = req.cookies.get(AUTH_COOKIE)?.value ?? null;
  const token = rawToken ? normalizeCookieToken(rawToken) : null;
  const payload = token ? readJwtPayload(token) : null;
  const exp = payload?.exp ? Number(payload.exp) : 0;
  const isExpired = !token || !exp || exp * 1000 < Date.now();

  if (isExpired) {
    // Server Actions expect an RSC flight response. A login redirect becomes
    // HTML (after fetch follows it) and surfaces as:
    // "An unexpected response was received from the server."
    if (req.headers.has('next-action')) {
      return new NextResponse('Your session expired. Please log in again.', {
        status: 401,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    return loginRedirect(req);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
