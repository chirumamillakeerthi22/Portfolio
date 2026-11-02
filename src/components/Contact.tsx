import { useState } from 'react';
import { person } from '../data/profile';
import { CheckIcon, CopyIcon, ExternalIcon, GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon } from './Icons';
import { ResumeMenu } from './ResumeMenu';

/*
  No contact form on purpose: there is no configured backend to deliver messages,
  and a form that only pretends to send would lose them. Email is one click instead.
*/
export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${person.email}`;
    }
  };

  const links = [
    { label: 'LinkedIn', value: 'keerthi-chirumamilla', href: person.linkedin, Icon: LinkedInIcon },
    { label: 'GitHub', value: person.githubHandle, href: person.github, Icon: GitHubIcon },
    { label: 'Portfolio', value: person.portfolio.replace('https://', ''), href: person.portfolio, Icon: ExternalIcon },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="overflow-hidden rounded-[2rem] border border-line bg-elev shadow-soft">
          <div className="grid lg:grid-cols-[1.3fr_1fr]">
            <div className="p-8 sm:p-12" data-reveal>
              <p className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-ink">
                <span>08</span>
                <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                <span>Contact</span>
              </p>
              <h2 id="contact-title" className="text-3xl font-semibold tracking-tight text-fg sm:text-5xl">
                Let’s talk about <span className="font-display font-normal italic text-accent-ink">your data</span>.
              </h2>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">{person.availability} The quickest way to reach me is email.</p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${person.email}?subject=${encodeURIComponent('Hello Keerthi')}`}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-fg hover:bg-accent-hover"
                >
                  <MailIcon className="h-4 w-4" aria-hidden="true" />
                  Email me
                </a>
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-fg hover:border-fg/40"
                >
                  {copied ? <CheckIcon className="h-4 w-4 text-accent-ink" aria-hidden="true" /> : <CopyIcon className="h-4 w-4" aria-hidden="true" />}
                  {copied ? 'Copied' : 'Copy email address'}
                </button>
                <span role="status" className="sr-only">
                  {copied ? 'Email address copied to clipboard' : ''}
                </span>
              </div>
              <p className="mt-4 break-all font-mono text-sm text-muted">{person.email}</p>
            </div>

            <div className="border-t border-line bg-sunken/70 p-8 sm:p-12 lg:border-l lg:border-t-0" data-reveal style={{ ['--reveal-delay' as string]: '100ms' }}>
              <ul className="divide-y divide-line">
                {links.map(({ label, value, href, Icon }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-4">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-elev text-fg">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs text-subtle">{label}</span>
                        <span className="block truncate text-sm font-medium text-fg group-hover:underline underline-offset-4">{value}</span>
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-4 py-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-elev text-fg">
                    <MapPinIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs text-subtle">Based in</span>
                    <span className="block text-sm font-medium text-fg">{person.location}</span>
                  </span>
                </li>
              </ul>
              <div className="mt-6">
                <ResumeMenu variant="outline" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
