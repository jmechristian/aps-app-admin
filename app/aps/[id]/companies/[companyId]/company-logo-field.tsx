'use client';

import { useMemo, useState } from 'react';
import { uploadData } from 'aws-amplify/storage';
import { ensureAmplifyConfigured } from '@/src/amplify-client';
import StorageImage from '@/app/components/storage-image';

type UploadState = 'idle' | 'uploading' | 'error';

export default function CompanyLogoField({
  companyId,
  initialValue,
}: {
  companyId: string;
  initialValue?: string | null;
}) {
  const [value, setValue] = useState(initialValue ?? '');
  const [status, setStatus] = useState<UploadState>('idle');
  const [error, setError] = useState<string | null>(null);

  const previewValue = useMemo(() => value.trim(), [value]);

  async function handleFileChange(file: File | null) {
    if (!file) return;
    setStatus('uploading');
    setError(null);

    try {
      ensureAmplifyConfigured();
      const ext = file.name.split('.').pop() || 'png';
      const key = `company-logos/${companyId}/${Date.now()}.${ext}`;

      const result = await uploadData({
        key,
        data: file,
        options: {
          accessLevel: 'guest',
          contentType: file.type || 'image/png',
        },
      }).result;

      setValue(result.key);
      setStatus('idle');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Upload failed');
    }
  }

  return (
    <div className='space-y-3'>
      <div className='flex items-center gap-4'>
        <div className='h-20 w-20 overflow-hidden rounded-xl border border-slate-200 bg-slate-50'>
          {previewValue ? (
            <StorageImage
              srcOrKey={previewValue}
              alt='Company logo'
              className='h-full w-full object-contain'
              accessLevel='guest'
            />
          ) : null}
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-sm font-medium text-slate-700'>
            Upload logo
            <input
              type='file'
              accept='image/*'
              onChange={(e) => {
                void handleFileChange(e.target.files?.[0] ?? null);
                e.currentTarget.value = '';
              }}
              disabled={status === 'uploading'}
              className='mt-2 block w-full text-sm text-slate-600'
            />
          </label>
          {status === 'uploading' ? (
            <div className='text-xs text-slate-500'>Uploading…</div>
          ) : null}
          {status === 'error' && error ? (
            <div className='text-xs text-rose-600'>{error}</div>
          ) : null}
        </div>
      </div>

      <label className='text-sm font-medium text-slate-700'>
        Logo key or URL
        <input
          name='logo'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='Paste a URL or use upload'
          className='mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none focus:border-slate-400'
        />
      </label>
    </div>
  );
}
