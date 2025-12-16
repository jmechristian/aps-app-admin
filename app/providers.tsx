'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchAuthSession, getCurrentUser, signOut } from 'aws-amplify/auth';
import { ensureAmplifyConfigured } from '@/src/amplify-client';

const ADMIN_GROUP = 'Admin';

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [deniedReason, setDeniedReason] = useState<string | null>(null);

  const isLoginRoute = useMemo(() => pathname === '/login', [pathname]);

  // Configure Amplify immediately (not in an effect) so downstream modules can safely
  // call Auth/API without racing configuration.
  ensureAmplifyConfigured();

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
        setReady(false);
        router.replace('/login');
      }
    }

    void check();

    return () => {
      cancelled = true;
    };
  }, [isLoginRoute, router]);

  if (isLoginRoute) return children;

  if (!ready) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
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
      <div className="border-b border-slate-200 bg-white px-6 py-3">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-sm font-semibold text-slate-800">APS Admin</div>
            <nav className="flex items-center gap-3 text-xs font-semibold text-slate-600">
              <Link className="hover:text-slate-900" href="/">
                Events
              </Link>
              <Link className="hover:text-slate-900" href="/announcements">
                Announcements
              </Link>
              <Link className="hover:text-slate-900" href="/dm-test">
                DM Test
              </Link>
            </nav>
          </div>
          <button
            type="button"
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            onClick={async () => {
              ensureAmplifyConfigured();
              await signOut();
              router.replace('/login');
            }}
          >
            Sign out
          </button>
        </div>
      </div>
      {children}
    </>
  );
}


