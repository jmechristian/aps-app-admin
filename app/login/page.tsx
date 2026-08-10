'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  confirmResetPassword,
  confirmSignIn,
  fetchAuthSession,
  getCurrentUser,
  resetPassword,
  signIn,
  signOut,
} from 'aws-amplify/auth';
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

const NEW_PASSWORD_REQUIRED_STEP = 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED';
const RESET_PASSWORD_STEP = 'RESET_PASSWORD';

function isPasswordResetRequiredError(err: unknown): boolean {
  const obj = err as { __type?: string; name?: string; message?: string };
  const msg =
    err instanceof Error
      ? err.message
      : typeof obj?.message === 'string'
        ? obj.message
        : String(err);
  const isPasswordResetMessage =
    msg.includes('Password reset required') ||
    msg.includes('PasswordResetRequired');
  return (
    isPasswordResetMessage ||
    obj?.__type === 'PasswordResetRequiredException' ||
    obj?.name === 'PasswordResetRequiredException' ||
    (obj?.__type === 'InvalidParameterException' && isPasswordResetMessage) ||
    (obj?.name === 'InvalidParameterException' && isPasswordResetMessage)
  );
}

function safeNextPath(raw: string | null): string {
  if (!raw) return '/';
  if (!raw.startsWith('/') || raw.startsWith('//')) return '/';
  if (raw.startsWith('/login')) return '/';
  return raw;
}

function readNextPathFromLocation(): string {
  if (typeof window === 'undefined') return '/';
  return safeNextPath(new URLSearchParams(window.location.search).get('next'));
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'signIn' | 'newPassword' | 'forgotPassword'>(
    'signIn',
  );

  useEffect(() => {
    ensureAmplifyConfigured();
    (async () => {
      try {
        await getCurrentUser();
        // Amplify session can still be valid after the middleware cookie expires.
        // Refresh the cookie before leaving /login or middleware will bounce us
        // right back here (login ↔ home loop).
        const session = await fetchAuthSession();
        const jwt = session.tokens?.idToken?.toString();
        if (jwt) setAuthCookie(jwt);
        router.replace(readNextPathFromLocation());
      } catch {
        // no active session
      }
    })();
  }, [router]);

  async function finishSignIn() {
    const session = await fetchAuthSession();
    const jwt = session.tokens?.idToken?.toString();
    if (jwt) setAuthCookie(jwt);
    router.replace(readNextPathFromLocation());
  }

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      ensureAmplifyConfigured();

      // Clear any existing session to avoid "already signed in" issues.
      try {
        await getCurrentUser();
        await signOut({ global: false });
        clearAuthCookie();
      } catch {
        // no existing session, ignore
      }

      const res = await signIn({
        username: email.trim(),
        password,
      });

      if (res.isSignedIn) {
        await finishSignIn();
        return;
      }

      const signInStep = res.nextStep?.signInStep;
      if (signInStep === NEW_PASSWORD_REQUIRED_STEP) {
        setStep('newPassword');
        setSubmitting(false);
        return;
      }

      if (signInStep === RESET_PASSWORD_STEP) {
        setStep('forgotPassword');
        setSubmitting(false);
        return;
      }

      if (signInStep && signInStep !== 'DONE') {
        setError(`Additional sign-in step required: ${signInStep}`);
        setSubmitting(false);
        return;
      }

      await finishSignIn();
    } catch (err) {
      if (isPasswordResetRequiredError(err)) {
        setStep('forgotPassword');
        setSubmitting(false);
        return;
      }
      const message = err instanceof Error ? err.message : 'Sign-in failed';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleNewPasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

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
      const result = await confirmSignIn({
        challengeResponse: newPassword,
      });
      if (result.isSignedIn) {
        await finishSignIn();
        return;
      }
      setError('Password updated, but additional sign-in steps are required.');
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof (err as { message?: string })?.message === 'string'
            ? (err as { message?: string }).message!
            : String(err);
      if (
        msg.includes('signIn was not called before confirmSignIn') ||
        msg.includes('session has expired')
      ) {
        setError('Session expired. Please sign in again.');
        setStep('signIn');
        return;
      }
      if (isPasswordResetRequiredError(err)) {
        setStep('forgotPassword');
        return;
      }
      setError(
        err instanceof Error ? err.message : 'Failed to update password',
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleForgotPasswordSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!resetCode.trim()) {
      setError('Enter the verification code from your email.');
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
      await confirmResetPassword({
        username: email.trim(),
        confirmationCode: resetCode.trim(),
        newPassword,
      });
      const res = await signIn({
        username: email.trim(),
        password: newPassword,
      });
      if (res.isSignedIn) {
        await finishSignIn();
        return;
      }
      const signInStep = res.nextStep?.signInStep;
      if (
        signInStep === NEW_PASSWORD_REQUIRED_STEP ||
        signInStep === RESET_PASSWORD_STEP
      ) {
        setStep('newPassword');
        setSubmitting(false);
        return;
      }
      if (signInStep && signInStep !== 'DONE') {
        setError(`Additional sign-in step required: ${signInStep}`);
        setSubmitting(false);
        return;
      }
      await finishSignIn();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResendResetCode() {
    setSubmitting(true);
    setError(null);
    try {
      await resetPassword({ username: email.trim() });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to resend reset code',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className='min-h-screen bg-slate-50 px-6 py-12 text-slate-900'>
      <div className='max-w-md mx-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
        {step === 'signIn' ? (
          <>
            <h1 className='text-xl font-bold text-slate-900'>Admin sign in</h1>
            <p className='mt-2 text-sm text-slate-600'>
              Use your Cognito admin credentials.
            </p>

            <form className='mt-6 space-y-4' onSubmit={handleSignIn}>
              <label className='block'>
                <span className='text-sm font-semibold text-slate-700'>
                  Email
                </span>
                <input
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete='username'
                  inputMode='email'
                  required
                />
              </label>

              <label className='block'>
                <span className='text-sm font-semibold text-slate-700'>
                  Password
                </span>
                <input
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete='current-password'
                  required
                />
              </label>

              {error ? (
                <div className='rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700'>
                  {error}
                </div>
              ) : null}

              <button
                type='submit'
                disabled={submitting}
                className='w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-60'
              >
                {submitting ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </>
        ) : step === 'forgotPassword' ? (
          <>
            <h1 className='text-xl font-bold text-slate-900'>Reset password</h1>
            <p className='mt-2 text-sm text-slate-600'>
              Enter the code you already have and choose a new password.
            </p>
            <p className='mt-1 text-sm text-slate-500'>
              Email: <strong>{email}</strong>
            </p>

            <form
              className='mt-6 space-y-4'
              onSubmit={handleForgotPasswordSubmit}
            >
              <label className='block'>
                <span className='text-sm font-semibold text-slate-700'>
                  Code from email
                </span>
                <input
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400 font-mono'
                  type='text'
                  inputMode='numeric'
                  autoComplete='one-time-code'
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  placeholder='e.g. 123456'
                  required
                />
              </label>
              <div className='text-sm text-slate-600'>
                Need a new code?{' '}
                <button
                  type='button'
                  onClick={handleResendResetCode}
                  className='font-semibold text-slate-900 hover:underline'
                  disabled={submitting}
                >
                  Resend code
                </button>
              </div>

              <label className='block'>
                <span className='text-sm font-semibold text-slate-700'>
                  New password
                </span>
                <input
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete='new-password'
                  minLength={8}
                  required
                />
              </label>

              <label className='block'>
                <span className='text-sm font-semibold text-slate-700'>
                  Confirm new password
                </span>
                <input
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                  type='password'
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  autoComplete='new-password'
                  minLength={8}
                  required
                />
              </label>

              {error ? (
                <div className='rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700'>
                  {error}
                </div>
              ) : null}

              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={() => {
                    setStep('signIn');
                    setResetCode('');
                    setNewPassword('');
                    setNewPasswordConfirm('');
                    setError(null);
                  }}
                  className='rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50'
                >
                  Back
                </button>
                <button
                  type='submit'
                  disabled={submitting}
                  className='flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-60'
                >
                  {submitting ? 'Updating…' : 'Set new password'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h1 className='text-xl font-bold text-slate-900'>
              Set new password
            </h1>
            <p className='mt-2 text-sm text-slate-600'>
              Your account requires a new password. Choose a password that is at
              least 8 characters.
            </p>
            <p className='mt-1 text-sm text-slate-500'>
              Signed in as <strong>{email}</strong>
            </p>

            <form className='mt-6 space-y-4' onSubmit={handleNewPasswordSubmit}>
              <label className='block'>
                <span className='text-sm font-semibold text-slate-700'>
                  New password
                </span>
                <input
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                  type='password'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete='new-password'
                  minLength={8}
                  required
                />
              </label>

              <label className='block'>
                <span className='text-sm font-semibold text-slate-700'>
                  Confirm new password
                </span>
                <input
                  className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
                  type='password'
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  autoComplete='new-password'
                  minLength={8}
                  required
                />
              </label>

              {error ? (
                <div className='rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700'>
                  {error}
                </div>
              ) : null}

              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={() => {
                    setStep('signIn');
                    setPassword('');
                    setNewPassword('');
                    setNewPasswordConfirm('');
                    setError(null);
                  }}
                  className='rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50'
                >
                  Back
                </button>
                <button
                  type='submit'
                  disabled={submitting}
                  className='flex-1 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-60'
                >
                  {submitting ? 'Updating…' : 'Set new password'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
