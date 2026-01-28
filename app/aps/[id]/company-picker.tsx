'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type CompanyPickerItem = {
  id: string;
  name: string;
  registrantCount?: number;
};

export default function CompanyPicker({
  companies,
  value,
  onChange,
  placeholder = 'Select a company',
  disabled,
}: {
  companies: CompanyPickerItem[];
  value: string;
  onChange: (companyId: string) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [popoverStyle, setPopoverStyle] = useState<{
    left: number;
    top: number;
    width: number;
    maxHeight: number;
  } | null>(null);

  const selected = useMemo(
    () => companies.find((c) => c.id === value) ?? null,
    [companies, value]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) => c.name.toLowerCase().includes(q));
  }, [companies, query]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const el = containerRef.current;
      const pop = popoverRef.current;
      if (!el) return;
      if (e.target instanceof Node && (el.contains(e.target) || pop?.contains(e.target))) {
        return;
      }
      setOpen(false);
    }

    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, []);

  useEffect(() => {
    if (!open) return;

    function updatePosition() {
      const btn = buttonRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      const padding = 8;
      const preferredMax = 288; // ~ max-h-72
      const spaceBelow = window.innerHeight - rect.bottom - padding;
      const spaceAbove = rect.top - padding;

      const shouldFlip = spaceBelow < 160 && spaceAbove > spaceBelow;
      const maxHeight = Math.max(
        160,
        Math.min(preferredMax, shouldFlip ? spaceAbove : spaceBelow)
      );

      const width = rect.width;
      const left = Math.max(padding, Math.min(rect.left, window.innerWidth - width - padding));
      const top = shouldFlip
        ? Math.max(padding, rect.top - padding - maxHeight - 44 /* search row */)
        : rect.bottom + padding;

      setPopoverStyle({ left, top, width, maxHeight });
    }

    updatePosition();
    window.addEventListener('resize', updatePosition);
    // capture=true so scrolling inside modal updates positioning too
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  return (
    <div ref={containerRef} className='relative'>
      <button
        type='button'
        ref={buttonRef}
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className='flex w-full items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2 text-left text-slate-900 shadow-sm focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500'
      >
        <span className='truncate'>
          {selected ? selected.name : placeholder}
        </span>
        <span className='text-slate-500'>▾</span>
      </button>

      {mounted && open && !disabled && popoverStyle
        ? createPortal(
            <div
              ref={popoverRef}
              className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl'
              style={{
                position: 'fixed',
                zIndex: 9999,
                left: popoverStyle.left,
                top: popoverStyle.top,
                width: popoverStyle.width,
              }}
            >
              <div className='border-b border-slate-200 p-2'>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder='Search companies...'
                  className='w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900'
                  autoFocus
                />
              </div>
              <div style={{ maxHeight: popoverStyle.maxHeight }} className='overflow-y-auto'>
                {filtered.length === 0 ? (
                  <div className='p-3 text-sm text-slate-600'>
                    No companies match “{query.trim()}”.
                  </div>
                ) : (
                  filtered.map((c) => (
                    <button
                      key={c.id}
                      type='button'
                      onClick={() => {
                        onChange(c.id);
                        setOpen(false);
                      }}
                      className='flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm text-slate-900 hover:bg-slate-50'
                    >
                      <span className='truncate'>{c.name}</span>
                      {typeof c.registrantCount === 'number' && (
                        <span className='shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700'>
                          {c.registrantCount}
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}


