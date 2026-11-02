import { useMemo, useState } from 'react';
import { evidenceLabel, skillGroups, type Evidence } from '../data/profile';
import { Section } from './Section';

const ALL = 'all';
const projectEvidence: Evidence[] = ['Veyoraq', 'InvestTrack'];

export function Skills() {
  const [filter, setFilter] = useState<string>(ALL);
  const groups = useMemo(() => (filter === ALL ? skillGroups : skillGroups.filter((g) => g.id === filter)), [filter]);

  const tabs = [{ id: ALL, label: 'All' }, ...skillGroups.map((g) => ({ id: g.id, label: g.label }))];

  return (
    <Section
      id="skills"
      index="03"
      eyebrow="Skills"
      title="Technical skills, with where each one was used."
      intro="No percentages or self-ratings. Each skill names the project, internship or certification it comes from, and skills used in deployed projects are listed first."
    >
      <div
        role="toolbar"
        aria-label="Filter skills by category"
        className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0"
        data-reveal
      >
        {tabs.map((t) => {
          const on = filter === t.id;
          return (
            <button
              key={t.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFilter(t.id)}
              className={`h-9 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors ${
                on ? 'border-fg bg-fg text-bg' : 'border-line bg-elev text-muted hover:border-line-strong hover:text-fg'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-subtle" data-reveal>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" /> Used in a deployed project
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full border border-line-strong" aria-hidden="true" /> Internship, academic or certification
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2" aria-live="polite">
        {groups.map((g, gi) => {
          // Project-backed skills first, the rest after: order inside each group stays as on the resume.
          const sorted = [...g.skills].sort(
            (a, b) =>
              Number(b.evidence.some((e) => projectEvidence.includes(e))) - Number(a.evidence.some((e) => projectEvidence.includes(e))),
          );
          return (
            <article
              key={g.id}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${(gi % 2) * 80}ms` }}
              className={`rounded-2xl border border-line bg-elev p-6 ${filter !== ALL ? 'md:col-span-2' : ''}`}
            >
              <h3 className="text-base font-semibold text-fg">{g.label}</h3>
              <p className="mt-1 text-sm text-subtle">{g.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {sorted.map((s) => {
                  const fromProject = s.evidence.some((e) => projectEvidence.includes(e));
                  const where = s.evidence.map((e) => evidenceLabel[e]).join(', ');
                  return (
                    <li key={s.name} className="group relative">
                      <span
                        tabIndex={0}
                        aria-label={`${s.name}${s.note ? ` (${s.note})` : ''}. Used in: ${where}`}
                        className={`inline-flex cursor-default items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                          fromProject
                            ? 'border-accent/30 bg-accent-soft text-accent-ink'
                            : 'border-line bg-bg text-muted'
                        } hover:border-accent focus-visible:border-accent`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1.5 w-1.5 rounded-full ${fromProject ? 'bg-accent' : 'border border-line-strong'}`}
                        />
                        {s.name}
                        {s.note && <span className="text-[11px] text-subtle">· {s.note}</span>}
                      </span>
                      <span
                        role="tooltip"
                        className="pointer-events-none absolute bottom-full left-0 z-20 mb-2 hidden w-max max-w-[14rem] rounded-lg bg-fg px-2.5 py-1.5 text-xs text-bg shadow-lift group-focus-within:block group-hover:block"
                      >
                        {where}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
