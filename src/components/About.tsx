import { about } from '../data/profile';
import { Section } from './Section';

export function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title="Reliable data, from the API call to the database row.">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg" data-reveal>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <ul className="space-y-3" aria-label="Core strengths">
          {about.focus.map((f, i) => (
            <li
              key={f.title}
              data-reveal
              style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
              className="group rounded-2xl border border-line bg-elev p-5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong"
            >
              <p className="flex items-center gap-3 text-sm font-semibold text-fg">
                <span className="font-mono text-xs text-accent-ink">0{i + 1}</span>
                {f.title}
              </p>
              <p className="mt-1.5 pl-7 text-sm leading-relaxed text-muted">{f.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
