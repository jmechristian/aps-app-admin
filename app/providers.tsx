'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchAuthSession, getCurrentUser, signOut } from 'aws-amplify/auth';
import { ensureAmplifyConfigured } from '@/src/amplify-client';

const ADMIN_GROUP = 'Admin';

const NAV_LINKS = [
  { href: '/', label: 'Events', match: (pathname: string) => pathname === '/' },
  {
    href: '/companies',
    label: 'Companies',
    match: (pathname: string) => pathname.startsWith('/companies'),
  },
  {
    href: '/board',
    label: 'Board',
    match: (pathname: string) => pathname.startsWith('/board'),
  },
  {
    href: '/announcements',
    label: 'Announcements',
    match: (pathname: string) => pathname.startsWith('/announcements'),
  },
  {
    href: '/emails',
    label: 'Emails',
    match: (pathname: string) => pathname.startsWith('/emails'),
  },
  {
    href: '/invoices',
    label: 'Invoices',
    match: (pathname: string) =>
      pathname === '/invoices' || pathname.startsWith('/invoices/'),
  },
  {
    href: '/reporting',
    label: 'Reporting',
    match: (pathname: string) =>
      pathname === '/reporting' || pathname.startsWith('/reporting'),
  },
  {
    href: '/feedback',
    label: 'Feedback',
    match: (pathname: string) =>
      pathname === '/feedback' ||
      pathname.startsWith('/feedback/') ||
      pathname.endsWith('/feedback'),
  },
] as const;

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [deniedReason, setDeniedReason] = useState<string | null>(null);
  const [navOpen, setNavOpen] = useState(false);

  const isLoginRoute = useMemo(
    () => pathname === '/login' || pathname === '/change-password' || pathname === '/forgot-password',
    [pathname]
  );

  // Configure Amplify immediately (not in an effect) so downstream modules can safely
  // call Auth/API without racing configuration.
  ensureAmplifyConfigured();

  const setAuthCookie = (jwt: string) => {
    const secure = window.location.protocol === 'https:';
    document.cookie = [
      `apsAdminJwt=${encodeURIComponent(jwt)}`,
      'Path=/',
      'SameSite=Lax',
      secure ? 'Secure' : '',
    ]
      .filter(Boolean)
      .join('; ');
  };

  const clearAuthCookie = () => {
    const secure = window.location.protocol === 'https:';
    document.cookie = [
      'apsAdminJwt=',
      'Path=/',
      'Max-Age=0',
      'SameSite=Lax',
      secure ? 'Secure' : '',
    ]
      .filter(Boolean)
      .join('; ');
  };

  useEffect(() => {
    if (isLoginRoute) {
      setDeniedReason(null);
      setReady(true);
      return;
    }

    let cancelled = false;

    async function check() {
      try {
        await getCurrentUser();
        const session = await fetchAuthSession();
        const jwt = session.tokens?.idToken?.toString();
        if (jwt) setAuthCookie(jwt);
        const groups =
          (session.tokens?.idToken?.payload?.['cognito:groups'] as
            | string[]
            | undefined) ?? [];

        if (!groups.includes(ADMIN_GROUP)) {
          throw new Error(
            `Signed in, but missing required Cognito group: ${ADMIN_GROUP}`
          );
        }

        if (!cancelled) {
          setDeniedReason(null);
          setReady(true);
        }
      } catch (e) {
        if (cancelled) return;
        setDeniedReason(e instanceof Error ? e.message : 'Unauthorized');
        clearAuthCookie();
        setReady(false);
        const next = encodeURIComponent(pathname || '/');
        router.replace(`/login?next=${next}`);
      }
    }

    void check();

    return () => {
      cancelled = true;
    };
  }, [isLoginRoute, pathname, router]);

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  if (isLoginRoute) return children;

  if (!ready) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="page-container rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold text-slate-700">
            Checking admin access…
          </div>
          {deniedReason ? (
            <div className="mt-3 text-sm text-slate-600">{deniedReason}</div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
        <div className="page-container flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-4">
            <div className="text-sm font-semibold text-slate-800">APS Admin</div>
            <nav className="hidden items-center gap-3 text-xs font-semibold text-slate-600 md:flex">
              {NAV_LINKS.map((link) => {
                const active = link.match(pathname || '');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={active ? 'text-slate-900' : 'hover:text-slate-900'}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 md:hidden"
              aria-expanded={navOpen}
              aria-controls="admin-nav"
              onClick={() => setNavOpen((open) => !open)}
            >
              <span className="flex flex-col gap-1" aria-hidden="true">
                <span className="block h-0.5 w-3.5 bg-slate-700" />
                <span className="block h-0.5 w-3.5 bg-slate-700" />
                <span className="block h-0.5 w-3.5 bg-slate-700" />
              </span>
              {navOpen ? 'Close' : 'Menu'}
            </button>
            <button
              type="button"
              className="hidden rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 md:inline-flex"
              onClick={async () => {
                ensureAmplifyConfigured();
                await signOut();
                clearAuthCookie();
                router.replace('/login');
              }}
            >
              Sign out
            </button>
          </div>
        </div>
        {navOpen ? (
          <nav
            id="admin-nav"
            className="page-container mt-3 flex flex-col gap-1 border-t border-slate-100 pt-3 text-sm font-semibold text-slate-700 md:hidden"
          >
            {NAV_LINKS.map((link) => {
              const active = link.match(pathname || '');
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-2 py-2 hover:bg-slate-50 hover:text-slate-900 ${
                    active ? 'bg-slate-50 text-slate-900' : ''
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              type="button"
              className="mt-1 rounded-md border border-slate-200 bg-white px-3 py-2 text-left text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              onClick={async () => {
                ensureAmplifyConfigured();
                await signOut();
                clearAuthCookie();
                router.replace('/login');
              }}
            >
              Sign out
            </button>
          </nav>
        ) : null}
      </div>
      {children}
    </>
  );
}


