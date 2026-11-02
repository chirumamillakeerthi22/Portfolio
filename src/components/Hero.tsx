import { person } from '../data/profile';
import { ArrowRight, GitHubIcon, LinkedInIcon, MailIcon, MapPinIcon } from './Icons';
import { PipelineVisual } from './PipelineVisual';
import { ResumeMenu } from './ResumeMenu';

export function Hero() {
  return (
    <section id="home" aria-labelledby="home-title" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        <div>
          <p data-reveal className="mb-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-line bg-elev/70 py-1 pl-1 pr-3 text-xs text-muted">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 font-medium text-accent-ink">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Open to work
            </span>
            Werkstudent · Internship · Junior
          </p>

          <h1 id="home-title" data-reveal style={{ ['--reveal-delay' as string]: '60ms' }}>
            <span className="block text-5xl font-semibold tracking-[-0.035em] text-fg sm:text-6xl lg:text-7xl">{person.name}</span>
            <span className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-accent-ink sm:text-sm">
              {person.role.split(' · ').map((part, i) => (
                <span key={part} className="whitespace-nowrap">
                  {i > 0 && <span aria-hidden="true" className="mr-3 text-subtle">/</span>}
                  {part}
                </span>
              ))}
            </span>
          </h1>

          <p
            data-reveal
            style={{ ['--reveal-delay' as string]: '120ms' }}
            className="mt-7 max-w-xl font-display text-[1.7rem] leading-[1.2] text-fg sm:text-[2rem]"
          >
            {person.headline}
          </p>
          <p data-reveal style={{ ['--reveal-delay' as string]: '160ms' }} className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {person.intro}
          </p>

          <div data-reveal style={{ ['--reveal-delay' as string]: '220ms' }} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              View My Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <ResumeMenu variant="outline" />
            <a
              href="#contact"
              className="inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-medium text-fg underline-offset-4 hover:underline"
            >
              <MailIcon className="h-4 w-4" aria-hidden="true" />
              Contact Me
            </a>
          </div>

          <div data-reveal style={{ ['--reveal-delay' as string]: '280ms' }} className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="h-4 w-4" aria-hidden="true" />
              {person.location}
            </span>
            <a href={person.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
              <GitHubIcon className="h-4 w-4" aria-hidden="true" />
              GitHub<span className="sr-only"> profile (opens in a new tab)</span>
            </a>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-fg">
              <LinkedInIcon className="h-4 w-4" aria-hidden="true" />
              LinkedIn<span className="sr-only"> profile (opens in a new tab)</span>
            </a>
          </div>
        </div>

        <div data-reveal style={{ ['--reveal-delay' as string]: '200ms' }}>
          <PipelineVisual />
        </div>
      </div>
    </section>
  );
}
