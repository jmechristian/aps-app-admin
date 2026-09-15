'use client';

import { useEffect, useRef, useState } from 'react';

type Command =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikeThrough'
  | 'insertUnorderedList'
  | 'insertOrderedList'
  | 'undo'
  | 'redo';

const ALLOWED_TAGS = new Set([
  'P',
  'BR',
  'B',
  'STRONG',
  'I',
  'EM',
  'U',
  'S',
  'STRIKE',
  'UL',
  'OL',
  'LI',
  'A',
]);

function exec(command: Command, value?: string) {
  document.execCommand(command, false, value);
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function htmlToPlainText(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.innerText || div.textContent || '').replace(/\u00a0/g, ' ');
}

function plainTextToHtml(text: string) {
  const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
  if (!normalized) return '';
  return normalized
    .split(/\n{2,}/)
    .map((block) => `<p>${escapeHtml(block).replace(/\n/g, '<br>')}</p>`)
    .join('');
}

function unwrap(el: Element) {
  const parent = el.parentNode;
  if (!parent) {
    el.remove();
    return;
  }
  while (el.firstChild) parent.insertBefore(el.firstChild, el);
  parent.removeChild(el);
}

/** Drop comments, inline styles, classes, and non-semantic tags. Keep visible text. */
export function sanitizeHtml(html: string) {
  const template = document.createElement('template');
  template.innerHTML = html;

  function clean(root: ParentNode) {
    for (const node of [...root.childNodes]) {
      if (node.nodeType === Node.COMMENT_NODE) {
        node.remove();
        continue;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) continue;

      const el = node as HTMLElement;
      clean(el);

      const tag = el.tagName;
      if (tag === 'A') {
        const href = el.getAttribute('href')?.trim() ?? '';
        for (const attr of [...el.attributes]) el.removeAttribute(attr.name);
        if (/^(https?:|mailto:)/i.test(href)) el.setAttribute('href', href);
        continue;
      }

      if (ALLOWED_TAGS.has(tag)) {
        for (const attr of [...el.attributes]) el.removeAttribute(attr.name);
        continue;
      }

      unwrap(el);
    }
  }

  clean(template.content);
  return template.innerHTML;
}

function ToolbarButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type='button'
      onMouseDown={(e) => {
        e.preventDefault();
      }}
      onClick={onClick}
      disabled={disabled}
      className='rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60'
    >
      {label}
    </button>
  );
}

export default function WysiwygEditor({
  value,
  onChange,
  disabled,
  placeholder = 'Write…',
}: {
  value: string;
  onChange: (html: string) => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const lastAppliedValueRef = useRef<string>('');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (focused) return;

    const next = sanitizeHtml(value ?? '');
    if (next === lastAppliedValueRef.current) return;

    el.innerHTML = next;
    lastAppliedValueRef.current = next;
  }, [value, focused]);

  function emit(rewrite = false) {
    const el = editorRef.current;
    if (!el) return;
    const html = sanitizeHtml(el.innerHTML ?? '');
    if (rewrite) el.innerHTML = html;
    lastAppliedValueRef.current = html;
    onChange(html);
  }

  function clearFormatting() {
    const el = editorRef.current;
    if (!el) return;
    const html = plainTextToHtml(htmlToPlainText(el.innerHTML ?? ''));
    el.innerHTML = html;
    lastAppliedValueRef.current = html;
    onChange(html);
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const plain = e.clipboardData.getData('text/plain');
    const html = e.clipboardData.getData('text/html');
    const text = plain || (html ? htmlToPlainText(html) : '');
    if (!text) return;
    document.execCommand('insertText', false, text);
    emit();
  }

  return (
    <div className='rounded-xl border border-slate-300 bg-white'>
      <div className='flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-2'>
        <ToolbarButton label='B' onClick={() => exec('bold')} disabled={disabled} />
        <ToolbarButton label='I' onClick={() => exec('italic')} disabled={disabled} />
        <ToolbarButton label='U' onClick={() => exec('underline')} disabled={disabled} />
        <ToolbarButton
          label='P'
          onClick={() => {
            document.execCommand('formatBlock', false, 'p');
          }}
          disabled={disabled}
        />
        <ToolbarButton label='S' onClick={() => exec('strikeThrough')} disabled={disabled} />
        <div className='mx-1 h-6 w-px bg-slate-200' />
        <ToolbarButton
          label='• List'
          onClick={() => exec('insertUnorderedList')}
          disabled={disabled}
        />
        <ToolbarButton
          label='1. List'
          onClick={() => exec('insertOrderedList')}
          disabled={disabled}
        />
        <div className='mx-1 h-6 w-px bg-slate-200' />
        <ToolbarButton label='Undo' onClick={() => exec('undo')} disabled={disabled} />
        <ToolbarButton label='Redo' onClick={() => exec('redo')} disabled={disabled} />
        <ToolbarButton
          label='Clear format'
          onClick={clearFormatting}
          disabled={disabled}
        />
        <ToolbarButton
          label='Link'
          disabled={disabled}
          onClick={() => {
            const url = window.prompt('Enter link URL');
            if (!url) return;
            document.execCommand('createLink', false, url);
            emit(true);
          }}
        />
      </div>

      <div className='relative'>
        {!value && !focused && (
          <div className='pointer-events-none absolute top-2 left-3 text-sm text-slate-400'>
            {placeholder}
          </div>
        )}

        <div
          ref={editorRef}
          contentEditable={!disabled}
          suppressContentEditableWarning
          onPaste={handlePaste}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            emit(true);
          }}
          onInput={() => emit()}
          className='min-h-[140px] w-full px-3 py-2 text-sm text-slate-900 outline-none
            [&_a]:text-slate-900 [&_a]:underline
            [&_p]:my-2
            [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-6
            [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6
            [&_li]:my-1'
        />
      </div>
    </div>
  );
}
