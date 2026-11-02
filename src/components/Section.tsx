import type { ReactNode } from 'react';

type Props = {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
};

/** Shared section frame: numbered eyebrow, heading, optional intro. */
export function Section({ id, index, eyebrow, title, intro, children, className = '' }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-20 py-20 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <header className="mb-10 max-w-2xl sm:mb-14" data-reveal>
          <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-ink">
            <span>{index}</span>
            <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
            <span>{eyebrow}</span>
          </p>
          <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            {title}
          </h2>
          {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  );
}

export function Chip({ children, tone = 'default' }: { children: ReactNode; tone?: 'default' | 'accent' }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
        tone === 'accent' ? 'border-transparent bg-accent-soft text-accent-ink' : 'border-line bg-elev text-muted'
      }`}
    >
      {children}
    </span>
  );
}
