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
  | 'redo'
  | 'removeFormat';

function exec(command: Command, value?: string) {
  // execCommand is deprecated but still widely supported and perfect for a lightweight admin WYSIWYG.
  document.execCommand(command, false, value);
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
        // Prevent losing selection/focus when clicking toolbar.
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

  // Apply external value changes (e.g. switching sessions in edit mode) without clobbering cursor while typing.
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (focused) return;

    const next = value ?? '';
    if (next === lastAppliedValueRef.current) return;

    el.innerHTML = next;
    lastAppliedValueRef.current = next;
  }, [value, focused]);

  function emit() {
    const el = editorRef.current;
    if (!el) return;
    const html = el.innerHTML ?? '';
    lastAppliedValueRef.current = html;
    onChange(html);
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const plainText = e.clipboardData.getData('text/plain');
    if (plainText) {
      document.execCommand('insertText', false, plainText);
      emit();
    }
  }

  return (
    <div className='rounded-xl border border-slate-300 bg-white'>
      <div className='flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-2'>
        <ToolbarButton label='B' onClick={() => exec('bold')} disabled={disabled} />
        <ToolbarButton label='I' onClick={() => exec('italic')} disabled={disabled} />
        <ToolbarButton label='U' onClick={() => exec('underline')} disabled={disabled} />
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
          label='Clear'
          onClick={() => exec('removeFormat')}
          disabled={disabled}
        />
        <ToolbarButton
          label='Link'
          disabled={disabled}
          onClick={() => {
            const url = window.prompt('Enter link URL');
            if (!url) return;
            exec('createLink' as any, url);
            emit();
          }}
        />
      </div>

      <div className='relative'>
        {/* Placeholder */}
        {!value && !focused && (
          <div className='pointer-events-none absolute left-3 top-2 text-sm text-slate-400'>
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
            emit();
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


