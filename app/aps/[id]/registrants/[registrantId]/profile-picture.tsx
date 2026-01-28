'use client';

import { useEffect, useMemo, useState } from 'react';
import { ensureAmplifyConfigured } from '@/src/amplify-client';

function isProbablyUrl(value: string) {
  return (
    value.startsWith('http://') ||
    value.startsWith('https://') ||
    value.startsWith('data:') ||
    value.startsWith('blob:')
  );
}

export default function ProfilePicture({
  storageKey,
  alt = 'Profile picture',
  size = 128,
}: {
  storageKey?: string | null;
  alt?: string;
  size?: number;
}) {
  const key = (storageKey ?? '').trim();
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  const directUrl = useMemo(() => {
    if (!key) return null;
    if (isProbablyUrl(key)) return key;
    return null;
  }, [key]);

  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    setResolvedUrl(null);

    async function run() {
      if (!key || directUrl) return;
      try {
        ensureAmplifyConfigured();
        const { getUrl } = await import('aws-amplify/storage');
        const urlResult = await getUrl({
          key,
          options: { accessLevel: 'guest', expiresIn: 3600 },
        });
        if (!cancelled) setResolvedUrl(urlResult.url.toString());
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [key, directUrl]);

  const src = directUrl ?? resolvedUrl;

  if (!key || failed) {
    return (
      <div
        className='flex items-center justify-center rounded-full bg-slate-100 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500'
        style={{ width: size, height: size }}
      >
        No Photo
      </div>
    );
  }

  if (!src) {
    return (
      <div
        className='animate-pulse rounded-full bg-slate-100'
        style={{ width: size, height: size }}
      />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className='rounded-full object-cover'
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
    />
  );
}


