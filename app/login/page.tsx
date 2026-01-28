'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Amplify } from 'aws-amplify';
import { fetchAuthSession, getCurrentUser, signIn, signOut } from 'aws-amplify/auth';
import awsExports from '@/src/aws-exports';

let configured = false;
function ensureAmplifyConfigured() {
  if (configured) return;
  Amplify.configure(awsExports);
  configured = true;
}

function setAuthCookie(jwt: string) {
  const secure = window.location.protocol === 'https:';
  document.cookie = [
    `apsAdminJwt=${encodeURIComponent(jwt)}`,
    'Path=/',
    'SameSite=Lax',
    secure ? 'Secure' : '',
  ]
    .filter(Boolean)
    .join('; ');
}

function clearAuthCookie() {
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
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ensureAmplifyConfigured();
    (async () => {
      try {
        await getCurrentUser();
        router.replace('/');
      } catch {
        // no active session
      }
    })();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="page-container rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Admin sign in</h1>
        <p className="mt-2 text-sm text-slate-600">
          Use your Cognito admin credentials.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setSubmitting(true);
            setError(null);

            try {
              ensureAmplifyConfigured();
              const res = await signIn({
                username: email.trim(),
                password,
              });

              if (
                res.nextStep.signInStep &&
                res.nextStep.signInStep !== 'DONE'
              ) {
                throw new Error(
                  `Additional sign-in step required: ${res.nextStep.signInStep}`
                );
              }

              const session = await fetchAuthSession();
              const jwt = session.tokens?.idToken?.toString();
              if (jwt) setAuthCookie(jwt);

              router.replace('/');
            } catch (err) {
              const message =
                err instanceof Error ? err.message : 'Sign-in failed';
              if (message.includes('There is already a signed in user')) {
                try {
                  await signOut({ global: false });
                  clearAuthCookie();
                  const res = await signIn({
                    username: email.trim(),
                    password,
                  });
                  if (
                    res.nextStep.signInStep &&
                    res.nextStep.signInStep !== 'DONE'
                  ) {
                    throw new Error(
                      `Additional sign-in step required: ${res.nextStep.signInStep}`
                    );
                  }
                  const session = await fetchAuthSession();
                  const jwt = session.tokens?.idToken?.toString();
                  if (jwt) setAuthCookie(jwt);
                  router.replace('/');
                  return;
                } catch (retryErr) {
                  setError(
                    retryErr instanceof Error
                      ? retryErr.message
                      : 'Sign-in failed'
                  );
                  return;
                }
              }
              setError(message);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Email</span>
            <input
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              inputMode="email"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Password
            </span>
            <input
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          {error ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}


