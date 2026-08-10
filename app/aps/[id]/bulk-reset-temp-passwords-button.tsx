'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { regenerateApprovedTempPasswords } from '@/app/actions/registrants';

export default function BulkResetTempPasswordsButton({
  eventId,
  approvedCount,
}: {
  eventId: string;
  approvedCount: number;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [resultMessage, setResultMessage] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-stretch gap-2 sm:items-end">
      <button
        type="button"
        disabled={isPending || approvedCount === 0}
        onClick={() => {
          const confirmed = window.confirm(
            `Reset Cognito temporary passwords for all ${approvedCount} APPROVED registrant(s)?\n\n` +
              `• Cognito will NOT email anyone (AdminSetUserPassword / create with SUPPRESS).\n` +
              `• Anyone who already set their own password will be forced back to “change password on next sign-in”.\n` +
              `• New temps are stored for the app-access email campaign.\n\n` +
              `This can take a few minutes for large lists.`,
          );
          if (!confirmed) return;

          setResultMessage(null);
          startTransition(async () => {
            const result = await regenerateApprovedTempPasswords({ eventId });
            const detail =
              result.failed > 0 && result.errors.length
                ? `\n\nFirst failures:\n${result.errors
                    .slice(0, 8)
                    .map((e) => `• ${e.email}: ${e.error}`)
                    .join('\n')}`
                : '';
            setResultMessage(result.message);
            window.alert(`${result.message}${detail}`);
            router.refresh();
          });
        }}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-950 shadow-sm transition hover:bg-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending
          ? 'Resetting APPROVED temps…'
          : `Reset APPROVED temp passwords (${approvedCount})`}
      </button>
      {resultMessage ? (
        <p className="max-w-xs text-right text-xs text-slate-600">
          {resultMessage}
        </p>
      ) : null}
    </div>
  );
}
