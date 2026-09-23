'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ensureAmplifyConfigured, graphqlClient } from '@/src/amplify-client';

type InvoiceFile = {
  key: string;
  registrantId: string;
  lastModified?: string;
  size?: number;
};

type RegistrantLabel = {
  id: string;
  apsID?: string | null;
  name: string;
  email?: string | null;
  companyName?: string | null;
  year?: string | null;
};

type RegistrantRecord = {
  id: string;
  apsID?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  company?: { name?: string | null } | null;
  aps?: { year?: string | number | null } | null;
};

const REGISTRANT_FIELDS = `
  id
  apsID
  firstName
  lastName
  email
  company {
    name
  }
  aps {
    year
  }
`;

const GET_INVOICE_REGISTRANT = /* GraphQL */ `
  query GetInvoiceRegistrant($id: ID!) {
    getApsRegistrant(id: $id) {
      ${REGISTRANT_FIELDS}
    }
  }
`;

const LIST_INVOICE_REGISTRANTS = /* GraphQL */ `
  query ListInvoiceRegistrants($limit: Int, $nextToken: String) {
    listApsRegistrants(limit: $limit, nextToken: $nextToken) {
      items {
        ${REGISTRANT_FIELDS}
      }
      nextToken
    }
  }
`;

function toRegistrantLabel(registrant: RegistrantRecord): RegistrantLabel {
  const name = [registrant.firstName, registrant.lastName].filter(Boolean).join(' ').trim();
  return {
    id: registrant.id,
    apsID: registrant.apsID,
    name: name || registrant.email || registrant.id,
    email: registrant.email,
    companyName: registrant.company?.name,
    year: registrant.aps?.year != null ? String(registrant.aps.year) : null,
  };
}

function toGuestKey(raw: string) {
  const trimmed = raw.replace(/^\/+/, '');
  if (trimmed.startsWith('public/')) return trimmed.slice('public/'.length);
  return trimmed;
}

function registrantIdFromKey(key: string) {
  const name = key.split('/').pop() ?? key;
  return name.replace(/\.pdf$/i, '');
}

function formatBytes(size?: number) {
  if (size == null) return '';
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function formatModified(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString();
}

function fileLabel(file: InvoiceFile, registrant?: RegistrantLabel) {
  if (registrant?.name) return registrant.name;
  return file.registrantId;
}

export default function InvoiceBrowser() {
  const [files, setFiles] = useState<InvoiceFile[]>([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [labels, setLabels] = useState<Record<string, RegistrantLabel | null>>({});
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadInvoices() {
      setListLoading(true);
      setListError(null);
      try {
        ensureAmplifyConfigured();
        const { list } = await import('aws-amplify/storage');
        const result = await list({
          prefix: 'invoices/',
          options: {
            accessLevel: 'guest',
            listAll: true,
          },
        });

        const invoices = result.items.flatMap((item) => {
          const raw = 'key' in item ? item.key : '';
          if (!raw) return [];
          const key = toGuestKey(raw);
          if (!key.startsWith('invoices/') || !key.toLowerCase().endsWith('.pdf')) {
            return [];
          }
          return [
            {
              key,
              registrantId: registrantIdFromKey(key),
              lastModified: item.lastModified?.toISOString(),
              size: item.size,
            } satisfies InvoiceFile,
          ];
        });

        invoices.sort((a, b) => {
          const aTime = a.lastModified ? Date.parse(a.lastModified) : 0;
          const bTime = b.lastModified ? Date.parse(b.lastModified) : 0;
          return bTime - aTime;
        });

        if (!cancelled) {
          setFiles(invoices);
          setSelectedKey((current) => {
            if (current && invoices.some((file) => file.key === current)) return current;
            return invoices[0]?.key ?? null;
          });
        }
      } catch (error) {
        if (!cancelled) {
          setListError(
            error instanceof Error ? error.message : 'Could not list invoices.',
          );
        }
      } finally {
        if (!cancelled) setListLoading(false);
      }
    }

    void loadInvoices();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return files;
    return files.filter((file) => {
      const label = labels[file.registrantId];
      const haystack = [
        file.registrantId,
        file.key,
        label?.name,
        label?.email,
        label?.companyName,
        label?.year,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [files, labels, query]);

  const selectedIndex = filtered.findIndex((file) => file.key === selectedKey);
  const selected = selectedIndex >= 0 ? filtered[selectedIndex] : null;

  useEffect(() => {
    if (filtered.length === 0) return;
    if (!selectedKey || !filtered.some((file) => file.key === selectedKey)) {
      setSelectedKey(filtered[0].key);
    }
  }, [filtered, selectedKey]);

  useEffect(() => {
    if (!selected) return;
    const registrantId = selected.registrantId;
    let cancelled = false;

    async function loadSelectedRegistrant() {
      try {
        ensureAmplifyConfigured();
        const res = await graphqlClient.graphql({
          query: GET_INVOICE_REGISTRANT,
          variables: { id: registrantId },
          authMode: 'userPool',
        });
        const registrant = (res as { data?: { getApsRegistrant?: RegistrantRecord | null } })
          .data?.getApsRegistrant;
        if (cancelled || !registrant) return;
        setLabels((current) => ({
          ...current,
          [registrantId]: toRegistrantLabel(registrant),
        }));
      } catch {
        // The paged lookup below still fills names when this single read fails.
      }
    }

    void loadSelectedRegistrant();
    return () => {
      cancelled = true;
    };
  }, [selected]);

  useEffect(() => {
    if (files.length === 0) return;
    let cancelled = false;
    const wanted = new Set(files.map((file) => file.registrantId));

    async function loadNames() {
      ensureAmplifyConfigured();
      let nextToken: string | null = null;
      const found = new Set<string>();
      let pages = 0;

      do {
        pages += 1;
        if (pages > 100) break;
        const res = (await graphqlClient.graphql({
          query: LIST_INVOICE_REGISTRANTS,
          variables: { limit: 200, nextToken },
          authMode: 'userPool',
        })) as {
          data?: {
            listApsRegistrants?: {
              items?: Array<RegistrantRecord | null> | null;
              nextToken?: string | null;
            } | null;
          };
        };
        const page = res.data?.listApsRegistrants;

        const updates: Record<string, RegistrantLabel> = {};
        for (const item of page?.items ?? []) {
          if (!item?.id || !wanted.has(item.id) || found.has(item.id)) continue;
          updates[item.id] = toRegistrantLabel(item);
          found.add(item.id);
        }

        if (!cancelled && Object.keys(updates).length > 0) {
          setLabels((current) => ({ ...current, ...updates }));
        }

        nextToken = page?.nextToken ?? null;
        if (found.size >= wanted.size) break;
      } while (nextToken && !cancelled);

      if (cancelled) return;
      setLabels((current) => {
        let changed = false;
        const next = { ...current };
        for (const id of wanted) {
          if (!Object.prototype.hasOwnProperty.call(next, id)) {
            next[id] = null;
            changed = true;
          }
        }
        return changed ? next : current;
      });
    }

    void loadNames().catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [files]);

  useEffect(() => {
    if (!selected) {
      setPdfUrl(null);
      setPdfError(null);
      setPdfLoading(false);
      return;
    }

    let cancelled = false;
    let objectUrl: string | null = null;
    const key = selected.key;

    setPdfUrl(null);
    setPdfError(null);
    setPdfLoading(true);

    async function loadPdf() {
      try {
        ensureAmplifyConfigured();
        const { downloadData } = await import('aws-amplify/storage');
        const result = await downloadData({
          key,
          options: { accessLevel: 'guest' },
        }).result;
        const blob = await result.body.blob();
        const pdfBlob =
          blob.type === 'application/pdf'
            ? blob
            : new Blob([blob], { type: 'application/pdf' });
        objectUrl = URL.createObjectURL(pdfBlob);
        if (cancelled) {
          URL.revokeObjectURL(objectUrl);
          return;
        }
        setPdfUrl(objectUrl);
      } catch (error) {
        if (!cancelled) {
          setPdfError(
            error instanceof Error ? error.message : 'Could not load this invoice.',
          );
        }
      } finally {
        if (!cancelled) setPdfLoading(false);
      }
    }

    void loadPdf();
    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [selected]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (filtered.length === 0) return;
      event.preventDefault();
      const current = Math.max(selectedIndex, 0);
      const next =
        event.key === 'ArrowRight'
          ? Math.min(current + 1, filtered.length - 1)
          : Math.max(current - 1, 0);
      const file = filtered[next];
      if (file) setSelectedKey(file.key);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filtered, selectedIndex]);

  const namedCount = files.filter((file) =>
    Object.prototype.hasOwnProperty.call(labels, file.registrantId),
  ).length;
  const label = selected ? labels[selected.registrantId] : undefined;
  const title = selected ? fileLabel(selected, label ?? undefined) : 'Invoices';
  const position =
    selected && selectedIndex >= 0
      ? `${selectedIndex + 1} of ${filtered.length}`
      : filtered.length
        ? `${filtered.length} invoices`
        : '';

  function step(delta: number) {
    if (filtered.length === 0) return;
    const current = Math.max(selectedIndex, 0);
    const next = Math.min(Math.max(current + delta, 0), filtered.length - 1);
    const file = filtered[next];
    if (file) setSelectedKey(file.key);
  }

  return (
    <div className='min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-100 px-6 py-8 text-slate-900'>
      <main className='page-container flex flex-col gap-6'>
        <header className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
          <div className='space-y-2'>
            <p className='text-sm font-semibold uppercase tracking-[0.2em] text-slate-500'>
              Receipts
            </p>
            <h1 className='text-4xl font-bold text-slate-900'>Invoices</h1>
            <p className='text-slate-600'>
              Browse PDFs stored in the invoices folder. Use the list, the
              arrows, or the left and right keys to move through them.
            </p>
          </div>
          <Link
            href='/'
            className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
          >
            ← Back to events
          </Link>
        </header>

        <div className='grid gap-4 lg:h-[calc(100vh-13rem)] lg:grid-cols-[22rem_minmax(0,1fr)]'>
          <aside className='flex min-h-80 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg'>
            <div className='border-b border-slate-200 p-4'>
              <label className='block text-xs font-semibold uppercase tracking-wide text-slate-500'>
                Search invoices
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder='Name, email, or id'
                  className='mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal normal-case tracking-normal text-slate-900 outline-none focus:border-slate-400'
                />
              </label>
              <p className='mt-2 text-xs text-slate-500'>
                {listLoading
                  ? 'Loading invoices…'
                  : `${filtered.length} shown${
                      files.length !== filtered.length ? ` of ${files.length}` : ''
                    }${
                      namedCount < files.length ? ' · matching names…' : ''
                    }`}
              </p>
            </div>
            <div className='min-h-0 flex-1 overflow-y-auto'>
              {listError ? (
                <p className='p-4 text-sm text-rose-700'>{listError}</p>
              ) : null}
              {!listLoading && !listError && filtered.length === 0 ? (
                <p className='p-4 text-sm text-slate-600'>
                  {files.length === 0
                    ? 'No invoice PDFs were found in public/invoices/.'
                    : 'No invoices match that search.'}
                </p>
              ) : null}
              <ul>
                {filtered.map((file) => {
                  const itemLabel = labels[file.registrantId];
                  const active = file.key === selected?.key;
                  return (
                    <li key={file.key}>
                      <button
                        type='button'
                        onClick={() => setSelectedKey(file.key)}
                        className={`w-full border-b border-slate-100 px-4 py-3 text-left transition ${
                          active ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div className='truncate text-sm font-semibold'>
                          {fileLabel(file, itemLabel ?? undefined)}
                        </div>
                        <div
                          className={`mt-1 truncate text-xs ${
                            active ? 'text-slate-300' : 'text-slate-500'
                          }`}
                        >
                          {[
                            itemLabel?.companyName,
                            itemLabel?.year ? String(itemLabel.year) : null,
                            formatModified(file.lastModified),
                            formatBytes(file.size),
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <section className='flex min-h-[70vh] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg lg:min-h-0'>
            <div className='flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='min-w-0'>
                <h2 className='truncate text-lg font-semibold text-slate-900'>{title}</h2>
                <p className='truncate text-sm text-slate-600'>
                  {[
                    position,
                    label?.email,
                    label?.companyName,
                    selected?.registrantId,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </div>
              <div className='flex flex-wrap items-center gap-2'>
                <button
                  type='button'
                  onClick={() => step(-1)}
                  disabled={selectedIndex <= 0}
                  className='rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
                >
                  Previous
                </button>
                <button
                  type='button'
                  onClick={() => step(1)}
                  disabled={selectedIndex < 0 || selectedIndex >= filtered.length - 1}
                  className='rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40'
                >
                  Next
                </button>
                {label?.apsID && selected ? (
                  <Link
                    href={`/aps/${label.apsID}/registrants/${selected.registrantId}`}
                    className='rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50'
                  >
                    Registrant
                  </Link>
                ) : null}
                {pdfUrl ? (
                  <a
                    href={pdfUrl}
                    download={`${selected?.registrantId ?? 'invoice'}.pdf`}
                    className='rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50'
                  >
                    Download
                  </a>
                ) : null}
              </div>
            </div>
            <div className='relative min-h-0 flex-1 bg-slate-100'>
              {pdfLoading ? (
                <p className='p-6 text-sm text-slate-600'>Loading invoice…</p>
              ) : null}
              {pdfError ? (
                <p className='p-6 text-sm text-rose-700'>{pdfError}</p>
              ) : null}
              {!selected && !listLoading && !listError ? (
                <p className='p-6 text-sm text-slate-600'>Select an invoice to preview it.</p>
              ) : null}
              {pdfUrl ? (
                <iframe
                  title={title}
                  src={pdfUrl}
                  className='h-full min-h-[70vh] w-full bg-white lg:min-h-full'
                />
              ) : null}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
