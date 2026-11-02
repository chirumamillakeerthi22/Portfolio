import { about, certifications, education } from '../data/profile';
import { AwardIcon, CapIcon, ExternalIcon } from './Icons';
import { Section } from './Section';

export function Certifications() {
  return (
    <Section id="certifications" index="06" eyebrow="Certifications" title="Certifications">
      <ul className="grid gap-4 md:grid-cols-3">
        {certifications.map((c, i) => (
          <li key={c.name} data-reveal style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}>
            <article className="flex h-full flex-col rounded-2xl border border-line bg-elev p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent-ink">
                <AwardIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-base font-semibold leading-snug text-fg">{c.name}</h3>
              <p className="mt-1 text-sm text-muted">{c.issuer}</p>
              <div className="mt-auto flex items-center justify-between pt-5">
                <p className="font-mono text-xs text-subtle">
                  Issued <time>{c.date}</time>
                </p>
                {c.credentialUrl && (
                  <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-accent-ink hover:underline">
                    Verify <ExternalIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span className="sr-only">{c.name} credential (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education" index="07" eyebrow="Education" title="Education & languages" className="bg-sunken/60">
      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <ul className="grid gap-4 sm:grid-cols-2">
          {education.map((e, i) => (
            <li key={e.degree} data-reveal style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}>
              <article className="h-full rounded-2xl border border-line bg-elev p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent-ink">
                    <CapIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs text-subtle">{e.period}</span>
                </div>
                <h3 className="mt-5 text-base font-semibold text-fg">{e.degree}</h3>
                <p className="mt-1 text-sm text-muted">
                  {e.school} · {e.place}
                </p>
                {e.detail && <p className="mt-3 inline-block rounded-md bg-sunken px-2 py-1 font-mono text-xs text-fg">{e.detail}</p>}
              </article>
            </li>
          ))}
        </ul>
        <article data-reveal className="rounded-2xl border border-line bg-elev p-6">
          <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">Languages</h3>
          <dl className="mt-4 divide-y divide-line">
            {about.languages.map((l) => (
              <div key={l.name} className="flex items-baseline justify-between gap-4 py-3">
                <dt className="text-base font-semibold text-fg">{l.name}</dt>
                <dd className="text-right text-sm text-muted">{l.level}</dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </Section>
  );
}
