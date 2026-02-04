'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { confirmSignIn, fetchAuthSession } from 'aws-amplify/auth';
import { ensureAmplifyConfigured } from '@/src/amplify-client';

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

export default function ChangePasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = useMemo(
    () => searchParams.get('username') ?? '',
    [searchParams]
  );
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ensureAmplifyConfigured();
  }, []);

  async function finishSignIn() {
    const session = await fetchAuthSession();
    const jwt = session.tokens?.idToken?.toString();
    if (jwt) setAuthCookie(jwt);
    router.replace('/');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!username) {
      setError('Missing username. Please go back and sign in again.');
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      setError('New password and confirmation do not match.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setSubmitting(true);
    try {
      ensureAmplifyConfigured();
      const result = await confirmSignIn({
        challengeResponse: newPassword,
      });
      if (result.isSignedIn) {
        await finishSignIn();
        return;
      }
      setError('Password updated, but additional sign-in steps are required.');
    } catch (err) {
      const obj = err as { __type?: string; name?: string; message?: string };
      const msg =
        err instanceof Error
          ? err.message
          : typeof obj?.message === 'string'
            ? obj.message
            : String(err);
      if (
        msg.includes('Password reset required') ||
        msg.includes('PasswordResetRequired') ||
        obj?.__type === 'PasswordResetRequiredException' ||
        obj?.name === 'PasswordResetRequiredException'
      ) {
        router.replace(
          `/forgot-password?username=${encodeURIComponent(username)}`
        );
        return;
      }
      setError(
        err instanceof Error ? err.message : 'Failed to update password'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12 text-slate-900">
      <div className="page-container rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-bold text-slate-900">Set new password</h1>
        <p className="mt-2 text-sm text-slate-600">
          Your account requires a new password. Choose a password that is at
          least 8 characters.
        </p>
        {username ? (
          <p className="mt-1 text-sm text-slate-500">
            Signed in as <strong>{username}</strong>
          </p>
        ) : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              New password
            </span>
            <input
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700">
              Confirm new password
            </span>
            <input
              className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400"
              type="password"
              value={newPasswordConfirm}
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          {error ? (
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
              disabled={submitting}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
            >
              {submitting ? 'Updating…' : 'Set new password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
