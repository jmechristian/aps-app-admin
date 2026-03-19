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

function tryExtractPublicKeyFromS3Url(urlString: string): string | null {
  try {
    const url = new URL(urlString);
    const bucket =
      process.env.NEXT_PUBLIC_AWS_USER_FILES_S3_BUCKET ||
      process.env.NEXT_PUBLIC_AWS_S3_BUCKET;
    if (!bucket) return null;

    // Only handle our own bucket URLs.
    if (!url.hostname.startsWith(`${bucket}.s3.`)) return null;

    // Example pathname: /public/profile-pictures/abc.jpg
    const path = decodeURIComponent(url.pathname || '').replace(/^\/+/, '');
    if (!path) return null;

    // If the URL includes the public prefix, strip it because getUrl({accessLevel:'public'})
    // expects the key without "public/".
    if (path.startsWith('public/')) return path.slice('public/'.length);

    // Otherwise, treat full path as the key.
    return path;
  } catch {
    return null;
  }
}

export default function StorageImage({
  srcOrKey,
  alt,
  className,
  width,
  height,
  accessLevel = 'guest',
}: {
  srcOrKey?: string | null;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  accessLevel?: 'guest' | 'protected' | 'private';
}) {
  const raw = (srcOrKey ?? '').trim();
  const [resolved, setResolved] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [useStorageFallback, setUseStorageFallback] = useState(false);

  const extractedKey = useMemo(() => {
    if (!raw || !isProbablyUrl(raw)) return null;
    return tryExtractPublicKeyFromS3Url(raw);
  }, [raw]);

  const effectiveKey = extractedKey ?? (raw && !isProbablyUrl(raw) ? raw : null);
  const directUrl = useMemo(() => (raw && isProbablyUrl(raw) ? raw : null), [raw]);

  useEffect(() => {
    let cancelled = false;
    setResolved(null);
    setFailed(false);
    setUseStorageFallback(false);
  }, [raw]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const shouldResolveFromStorage =
        !!effectiveKey && (!directUrl || useStorageFallback);
      if (!shouldResolveFromStorage) return;

      try {
        ensureAmplifyConfigured();
        const { getUrl } = await import('aws-amplify/storage');
        const urlResult = await getUrl({
          key: effectiveKey,
          // NOTE: With Amplify Gen2 typings, "public" access maps to accessLevel: "guest".
          // See @aws-amplify/storage ReadOptions: 'guest' | 'private' | 'protected'.
          options: { accessLevel, expiresIn: 3600 },
        });
        if (!cancelled) setResolved(urlResult.url.toString());
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [effectiveKey, directUrl, accessLevel, useStorageFallback]);

  const src = useStorageFallback ? resolved : directUrl ?? resolved;
  if (!raw || failed || !src) return null;

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      onError={() => {
        if (effectiveKey && !useStorageFallback) {
          setUseStorageFallback(true);
          return;
        }
        setFailed(true);
      }}
    />
  );
}


