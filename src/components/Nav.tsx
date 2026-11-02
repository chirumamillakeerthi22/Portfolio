import { useEffect, useRef, useState } from 'react';
import { navItems, person, resumes } from '../data/profile';
import { useActiveSection } from '../hooks/useActiveSection';
import { ThemeSwitcher } from '../theme/ThemeSwitcher';
import { CloseIcon, DownloadIcon, MenuIcon } from './Icons';
import { ResumeMenu } from './ResumeMenu';

const ids = navItems.map((n) => n.id);

export function Nav() {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu: Escape closes it, focus moves in and back, page does not scroll behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    const mq = window.matchMedia('(min-width: 1024px)');
    const onWide = () => mq.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onWide);
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onWide);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b backdrop-blur-xl transition-[border-color,background-color] duration-300 ${
        scrolled || open ? 'border-line bg-[var(--nav-bg)]' : 'border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-fg"
      >
        Skip to content
      </a>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#home" className="group flex items-center gap-2.5" aria-label={`${person.name}, back to top`}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-fg font-mono text-[11px] font-semibold tracking-tight text-bg transition-transform group-hover:-rotate-6">
            KC
          </span>
          <span className="hidden text-sm font-semibold tracking-tight text-fg sm:inline">{person.name}</span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    isActive ? 'text-fg' : 'text-subtle hover:text-fg'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemeSwitcher />
          </div>
          <div className="hidden lg:block">
            <ResumeMenu variant="nav" label="Resume" align="right" />
          </div>
          <button
            ref={menuButton}
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-elev text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        ref={panel}
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg px-5 pb-10 pt-4 lg:hidden"
      >
        <ul className="divide-y divide-line">
          {navItems.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? 'location' : undefined}
                className="flex items-baseline justify-between py-4 text-2xl font-semibold tracking-tight text-fg"
              >
                {item.label}
                <span className="font-mono text-xs text-subtle">0{i}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 space-y-6">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-subtle">Theme</p>
            <ThemeSwitcher showLabels />
          </div>
          <div className="grid gap-2">
            {resumes.map((r) => (
              <a
                key={r.href}
                href={r.href}
                download
                className="flex items-center justify-between rounded-2xl border border-line bg-elev px-4 py-3"
              >
                <span>
                  <span className="block text-sm font-medium text-fg">{r.label}</span>
                  <span className="block text-xs text-subtle">{r.note}</span>
                </span>
                <DownloadIcon className="h-4 w-4 text-accent-ink" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
