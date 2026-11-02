import { experience } from '../data/profile';
import { Chip, Section } from './Section';

export function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      title="Internship experience"
      intro="Two structured virtual internship programmes. Hands-on product work is shown separately under Projects."
      className="bg-sunken/60"
    >
      <ol className="relative ml-1.5 space-y-6 border-l border-line-strong sm:ml-2">
        {experience.map((job, i) => (
          <li key={job.title} className="relative pl-8 sm:pl-12" data-reveal style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}>
            <span
              aria-hidden="true"
              className="absolute -left-[7px] top-7 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg"
            />
            <article className="rounded-2xl border border-line bg-elev p-6 shadow-[var(--shadow-sm)] transition-shadow hover:shadow-soft sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-fg sm:text-xl">{job.title}</h3>
                  <p className="mt-0.5 text-sm font-medium text-accent-ink">{job.org}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-mono text-sm text-fg">
                    <time>{job.start}</time> – <time>{job.end}</time>
                  </p>
                  <p className="mt-0.5 text-xs text-subtle">{job.kind}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-2">
                {job.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-sm leading-relaxed text-muted sm:text-[15px]">
                    <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-subtle" />
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                {job.tech.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
