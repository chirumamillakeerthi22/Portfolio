import { useEffect, useId, useRef, useState } from 'react';
import { resumes } from '../data/profile';
import { DownloadIcon } from './Icons';

type Props = { variant?: 'solid' | 'outline' | 'nav'; label?: string; align?: 'left' | 'right' };

/** "Download resume" button that offers the one-page and two-page PDFs. */
export function ResumeMenu({ variant = 'outline', label = 'Download Resume', align = 'left' }: Props) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    wrap.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const styles = {
    solid: 'bg-accent text-accent-fg hover:bg-accent-hover h-12 px-5 text-sm',
    outline: 'border border-line-strong bg-elev text-fg hover:border-fg/40 h-12 px-5 text-sm',
    nav: 'border border-line bg-elev text-fg hover:border-line-strong h-9 px-3.5 text-xs',
  }[variant];

  return (
    <div ref={wrap} className="relative inline-block" onBlur={(e) => !wrap.current?.contains(e.relatedTarget) && setOpen(false)}>
      <button
        ref={button}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-2 rounded-full font-medium transition-colors ${styles}`}
      >
        <DownloadIcon className="h-4 w-4" aria-hidden="true" />
        {label}
      </button>
      <div
        id={id}
        hidden={!open}
        className={`absolute top-full z-50 mt-2 w-64 rounded-2xl border border-line bg-elev p-1.5 shadow-lift ${
          align === 'right' ? 'right-0' : 'left-0'
        }`}
      >
        {resumes.map((r) => (
          <a
            key={r.href}
            href={r.href}
            download
            onClick={() => setOpen(false)}
            className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left hover:bg-sunken focus-visible:bg-sunken"
          >
            <span>
              <span className="block text-sm font-medium text-fg">{r.label}</span>
              <span className="block text-xs text-subtle">{r.note}</span>
            </span>
            <DownloadIcon className="h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
          </a>
        ))}
      </div>
    </div>
  );
}
