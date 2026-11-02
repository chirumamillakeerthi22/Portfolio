import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { otherProjects, projects, type Project } from '../data/profile';
import { Architecture } from './ArchitectureDiagram';
import { ArrowRight, CloseIcon, ExternalIcon, GitHubIcon } from './Icons';
import { Chip, Section } from './Section';

const brandStyle = (p: Project) => ({ '--brand-l': p.brand.light, '--brand-d': p.brand.dark }) as CSSProperties;

function ProjectVisual({ project, idPrefix }: { project: Project; idPrefix: string }) {
  if (project.screenshot) {
    return (
      <img
        src={project.screenshot}
        alt={`Screenshot of ${project.name}`}
        loading="lazy"
        decoding="async"
        width={1280}
        height={800}
        className="h-full w-full object-cover object-top"
      />
    );
  }
  return (
    <div className="px-4 py-6 sm:px-8 sm:py-9">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">Architecture</p>
      <Architecture project={project} idPrefix={idPrefix} />
    </div>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (p: Project) => void }) {
  return (
    <article
      data-reveal
      style={brandStyle(project)}
      className="brand-scope group relative overflow-hidden rounded-3xl border border-line bg-elev shadow-[var(--shadow-sm)] transition-[box-shadow,border-color] duration-300 hover:border-line-strong hover:shadow-lift"
      aria-labelledby={`${project.slug}-title`}
    >
      <div className="relative border-b border-line bg-sunken">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ background: `radial-gradient(ellipse at ${index % 2 ? '80%' : '20%'} 0%, var(--brand), transparent 65%)` }}
        />
        <div className="bg-grid relative">
          <div className="mx-auto max-w-3xl">
            <ProjectVisual project={project} idPrefix={`card-${project.slug}`} />
          </div>
        </div>
      </div>

      <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
            <span className="rounded-full px-2.5 py-1 font-medium" style={{ color: 'var(--brand)', background: 'color-mix(in srgb, var(--brand) 12%, transparent)' }}>
              {project.kind}
            </span>
            <span className="font-mono text-subtle">{project.period}</span>
          </div>
          <h3 id={`${project.slug}-title`} className="mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-1 font-display text-xl text-muted sm:text-2xl">{project.tagline}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">{project.summary}</p>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
              aria-haspopup="dialog"
            >
              Read case study
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">: {project.name}</span>
            </button>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-medium text-fg hover:border-fg/40"
            >
              View Live Project
              <ExternalIcon className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens {project.name} in a new tab)</span>
            </a>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-muted hover:text-fg"
              >
                <GitHubIcon className="h-4 w-4" aria-hidden="true" />
                Source Code
                <span className="sr-only">for {project.name} on GitHub (opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">Key features</h4>
          <ul className="mt-3 space-y-2.5">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--brand)' }} />
                {h}
              </li>
            ))}
          </ul>
          <h4 className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-subtle">Stack</h4>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.stack.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (project && !d.open) {
      d.showModal();
      document.body.style.overflow = 'hidden';
      d.querySelector<HTMLElement>('.dialog-scroll')?.scrollTo(0, 0);
    }
    if (!project && d.open) d.close();
  }, [project]);

  if (!project) return <dialog ref={ref} className="project-dialog" aria-hidden="true" />;

  return (
    <dialog
      ref={ref}
      className="project-dialog brand-scope"
      style={brandStyle(project)}
      aria-labelledby="dialog-title"
      onClose={() => {
        document.body.style.overflow = '';
        onClose();
      }}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
    >
      <div className="dialog-panel flex max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-3xl border border-line bg-elev shadow-lift">
        <div className="flex items-start justify-between gap-4 border-b border-line px-6 py-5 sm:px-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: 'var(--brand)' }}>
              {project.kind} · {project.period}
            </p>
            <h2 id="dialog-title" className="mt-1 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
              {project.name} <span className="font-display font-normal text-muted">— {project.tagline}</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-fg hover:bg-sunken"
            aria-label="Close case study"
            autoFocus
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="dialog-scroll overflow-y-auto px-6 py-7 sm:px-8" tabIndex={0} role="region" aria-label="Case study details">
          <section aria-labelledby="d-problem">
            <h3 id="d-problem" className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
              The problem
            </h3>
            <p className="mt-2 max-w-3xl text-base leading-relaxed text-fg sm:text-lg">{project.problem}</p>
          </section>

          <section aria-labelledby="d-arch" className="mt-9">
            <h3 id="d-arch" className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
              Architecture
            </h3>
            <div className="bg-grid mt-3 rounded-2xl border border-line bg-sunken p-4 sm:p-6">
              <Architecture project={project} idPrefix={`dialog-${project.slug}`} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.architecture.caption}</p>
          </section>

          <section aria-labelledby="d-impl" className="mt-9">
            <h3 id="d-impl" className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
              Implementation
            </h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {project.implementation.map((b) => (
                <div key={b.title} className="rounded-2xl border border-line p-5">
                  <h4 className="text-sm font-semibold text-fg">{b.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.text}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-9 grid gap-8 sm:grid-cols-[1.3fr_1fr]">
            <section aria-labelledby="d-dec">
              <h3 id="d-dec" className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
                Key technical decisions
              </h3>
              <ul className="mt-3 space-y-2.5">
                {project.decisions.map((d) => (
                  <li key={d} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: 'var(--brand)' }} />
                    {d}
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="d-role">
              <h3 id="d-role" className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle">
                My role
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg/90">{project.role}</p>
              <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.14em] text-subtle">Technology</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </section>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-line px-6 py-4 sm:px-8">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-bg hover:opacity-90"
          >
            View Live Project
            <ExternalIcon className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium text-fg hover:border-fg/40"
            >
              <GitHubIcon className="h-4 w-4" aria-hidden="true" />
              View Source Code
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  return (
    <Section
      id="projects"
      index="04"
      eyebrow="Projects"
      title="Featured projects"
      intro="Two personal projects, designed, built and deployed end to end. Open a case study for the architecture and the decisions behind it."
    >
      <div className="space-y-6">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            index={i}
            onOpen={(proj) => {
              lastTrigger.current = document.activeElement as HTMLElement;
              setOpen(proj);
            }}
          />
        ))}
      </div>

      <h3 className="mt-16 mb-5 text-sm font-semibold uppercase tracking-[0.14em] text-subtle" data-reveal>
        Academic projects
      </h3>
      <div className="grid gap-4 md:grid-cols-3">
        {otherProjects.map((p, i) => (
          <article
            key={p.name}
            data-reveal
            style={{ ['--reveal-delay' as string]: `${i * 70}ms` }}
            className="flex flex-col rounded-2xl border border-line bg-elev p-6 transition-colors hover:border-line-strong"
          >
            <p className="text-xs font-medium text-accent-ink">{p.kind}</p>
            <h4 className="mt-2 text-base font-semibold text-fg">{p.name}</h4>
            <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
            <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
              {p.stack.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </article>
        ))}
      </div>

      <ProjectDialog
        project={open}
        onClose={() => {
          setOpen(null);
          lastTrigger.current?.focus();
        }}
      />
    </Section>
  );
}
