import { useEffect, useState } from 'react';
import { person } from '../data/profile';
import { ArrowUp, GitHubIcon, LinkedInIcon, MailIcon } from './Icons';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-sm font-semibold text-fg">{person.name}</p>
          <p className="mt-1 text-xs text-subtle">{person.role}</p>
        </div>
        <ul className="flex items-center gap-2" aria-label="Profiles">
          {[
            { label: 'GitHub', href: person.github, Icon: GitHubIcon, ext: true },
            { label: 'LinkedIn', href: person.linkedin, Icon: LinkedInIcon, ext: true },
            { label: 'Email', href: `mailto:${person.email}`, Icon: MailIcon, ext: false },
          ].map(({ label, href, Icon, ext }) => (
            <li key={label}>
              <a
                href={href}
                {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
                aria-label={ext ? `${label} (opens in a new tab)` : label}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-subtle">
          © {year} {person.name}. Built with React, TypeScript and Tailwind CSS. No cookies, no tracking.
        </p>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 1.2);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a
      href="#home"
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed bottom-5 right-5 z-30 grid h-11 w-11 place-items-center rounded-full border border-line bg-elev text-fg shadow-soft transition-all duration-300 hover:border-line-strong sm:bottom-8 sm:right-8 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </a>
  );
}
