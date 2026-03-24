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
    if (!url.hostname.startsWith(`${bucket}.s3.`)) return null;

    const path = decodeURIComponent(url.pathname || '').replace(/^\/+/, '');
    if (!path) return null;
    if (path.startsWith('public/')) return path.slice('public/'.length);
    return path;
  } catch {
    return null;
  }
}

function isPdfUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.pathname.toLowerCase().endsWith('.pdf');
  } catch {
    return value.toLowerCase().includes('.pdf');
  }
}

export default function InvoicePreview({ invoice }: { invoice?: string | null }) {
  const raw = (invoice ?? '').trim();
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState<string | null>(null);
  const [pdfPreviewLoading, setPdfPreviewLoading] = useState(false);

  const extractedKey = useMemo(() => {
    if (!raw || !isProbablyUrl(raw)) return null;
    return tryExtractPublicKeyFromS3Url(raw);
  }, [raw]);

  const storageKey = extractedKey ?? (raw && !isProbablyUrl(raw) ? raw : null);
  const directUrl = useMemo(() => (raw && isProbablyUrl(raw) ? raw : null), [raw]);

  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    setResolvedUrl(null);
    setLoading(false);

    async function resolveUrl() {
      if (!storageKey) return;
      try {
        setLoading(true);
        ensureAmplifyConfigured();
        const { getUrl } = await import('aws-amplify/storage');
        const urlResult = await getUrl({
          key: storageKey,
          options: { accessLevel: 'guest', expiresIn: 3600 },
        });
        if (!cancelled) setResolvedUrl(urlResult.url.toString());
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void resolveUrl();
    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  if (!raw) {
    return (
      <p className='mt-1 text-sm text-slate-600'>
        No receipt attached for this registrant.
      </p>
    );
  }

  if (failed) {
    return (
      <p className='mt-1 text-sm text-rose-700'>
        Receipt is attached, but the file could not be loaded.
      </p>
    );
  }

  if (loading && !directUrl && !resolvedUrl) {
    return <p className='mt-1 text-sm text-slate-600'>Loading receipt preview...</p>;
  }

  const href = directUrl ?? resolvedUrl;
  if (!href) {
    return (
      <p className='mt-1 text-sm text-slate-600'>
        Receipt is attached but is not ready to preview yet.
      </p>
    );
  }

  const canEmbedPdf = isPdfUrl(href);

  useEffect(() => {
    let cancelled = false;
    let objectUrl: string | null = null;

    setPdfPreviewUrl(null);
    setPdfPreviewLoading(false);

    async function buildPdfPreview() {
      if (!href || !canEmbedPdf) return;
      try {
        setPdfPreviewLoading(true);
        const response = await fetch(href);
        if (!response.ok) {
          throw new Error(`Failed to load invoice PDF (${response.status})`);
        }
        const pdfBlob = await response.blob();
        objectUrl = URL.createObjectURL(pdfBlob);
        if (!cancelled) setPdfPreviewUrl(objectUrl);
      } catch {
        if (!cancelled) setPdfPreviewUrl(null);
      } finally {
        if (!cancelled) setPdfPreviewLoading(false);
      }
    }

    void buildPdfPreview();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [href, canEmbedPdf]);

  return (
    <div className='mt-3 space-y-3'>
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50'
      >
        Open receipt
      </a>
      {canEmbedPdf ? (
        pdfPreviewUrl ? (
          <iframe
            title='Receipt PDF preview'
            src={pdfPreviewUrl}
            className='h-[560px] w-full rounded-xl border border-slate-200 bg-white'
          />
        ) : pdfPreviewLoading ? (
          <p className='text-sm text-slate-600'>Loading receipt preview...</p>
        ) : (
          <p className='text-sm text-slate-600'>
            Inline preview is unavailable. Use &quot;Open receipt&quot; to view it.
          </p>
        )
      ) : (
        <p className='text-sm text-slate-600'>
          Receipt is attached as a file. Use &quot;Open receipt&quot; to view it.
        </p>
      )}
    </div>
  );
}
