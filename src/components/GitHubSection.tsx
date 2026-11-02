import { person, repositories } from '../data/profile';
import { ExternalIcon, GitHubIcon } from './Icons';
import { Section } from './Section';

const langColour: Record<string, string> = { TypeScript: '#3178c6', JavaScript: '#e3b341', Python: '#3572a5', HTML: '#e34c26' };

export function GitHubSection() {
  return (
    <Section
      id="github"
      index="05"
      eyebrow="GitHub"
      title="Code you can read."
      intro="The source for both featured projects is public, including SQL migrations, security tests and server-side API code."
      className="bg-sunken/60"
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
        <a
          href={person.github}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
          className="group flex flex-col justify-between rounded-2xl bg-fg p-7 text-bg transition-transform hover:-translate-y-0.5"
        >
          <GitHubIcon className="h-8 w-8" aria-hidden="true" />
          <div className="mt-10">
            <p className="text-sm opacity-70">github.com/</p>
            <p className="text-xl font-semibold tracking-tight break-all">{person.githubHandle}</p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-medium">
              View GitHub profile
              <ExternalIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </p>
          </div>
        </a>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repositories.map((r, i) => (
            <li key={r.name} data-reveal style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-elev p-5 transition-colors hover:border-line-strong">
                <h3 className="font-mono text-sm font-semibold text-fg">
                  <a
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {r.name}
                    <span className="sr-only"> repository on GitHub (opens in a new tab)</span>
                  </a>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{r.description}</p>
                <div className="mt-5 flex items-center justify-between gap-3 text-xs text-subtle">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: langColour[r.language] ?? 'var(--fg-subtle)' }} aria-hidden="true" />
                    {r.language}
                  </span>
                  {r.live && (
                    <a href={r.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-fg">
                      Live
                      <ExternalIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      <span className="sr-only"> site for {r.name} (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
