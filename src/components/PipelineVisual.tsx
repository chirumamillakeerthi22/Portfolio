import { useState } from 'react';

/*
  Hero visual: the data path both featured projects actually follow.
  Each stage can be hovered, focused or tapped to show where it was implemented.
*/
type Stage = { id: string; step: string; label: string; x: number; y: number; detail: string; where: string };

const stages: Stage[] = [
  { id: 'src', step: '01', label: 'Ingest', x: 70, y: 56, detail: 'REST APIs called from server-side functions; keys never reach the browser.', where: 'Finnhub via Edge Functions · Gemini via API routes' },
  { id: 'val', step: '02', label: 'Validate', x: 250, y: 56, detail: 'Every request and response checked against a schema before it moves on.', where: 'Zod (Veyoraq) · Pydantic (InvestTrack)' },
  { id: 'mod', step: '03', label: 'Model', x: 430, y: 56, detail: 'Relational tables, versioned SQL migrations, exact Numeric types for money.', where: 'PostgreSQL on Supabase · SQLAlchemy' },
  { id: 'sec', step: '04', label: 'Secure', x: 430, y: 194, detail: 'Row Level Security keeps each row to its owner, proven by SQL tests.', where: 'RLS policies + SQL security tests (Veyoraq)' },
  { id: 'srv', step: '05', label: 'Serve', x: 250, y: 194, detail: 'Results reach people as dashboards, charts and validated UI.', where: 'Recharts dashboard · Power BI & Tableau (capstone)' },
  { id: 'chk', step: '06', label: 'Test', x: 70, y: 194, detail: 'Automated tests guard the pipeline when anything changes.', where: 'Vitest suite across 49 test files (Veyoraq)' },
];

const edges: [string, string][] = [
  ['src', 'val'],
  ['val', 'mod'],
  ['mod', 'sec'],
  ['sec', 'srv'],
  ['srv', 'chk'],
];

const byId = Object.fromEntries(stages.map((s) => [s.id, s]));

export function PipelineVisual() {
  const [active, setActive] = useState('val');
  const current = byId[active];

  return (
    <figure className="relative">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-elev shadow-soft">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          </span>
          <span className="font-mono text-[11px] text-subtle">data-path.sql</span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-accent-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            interactive
          </span>
        </div>

        <div className="bg-grid relative">
          <svg viewBox="0 0 500 250" className="block h-auto w-full" role="group" aria-label="Data pipeline stages. Select a stage to see where it was implemented.">
            {edges.map(([a, b]) => {
              const A = byId[a];
              const B = byId[b];
              const lit = active === a || active === b;
              return (
                <g key={a + b}>
                  <line x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke="var(--border-strong)" strokeWidth="1.5" />
                  <line
                    x1={A.x}
                    y1={A.y}
                    x2={B.x}
                    y2={B.y}
                    className="edge-flow"
                    stroke={lit ? 'var(--accent)' : 'var(--fg-subtle)'}
                    strokeOpacity={lit ? 1 : 0.5}
                    strokeWidth={lit ? 2.5 : 1.5}
                    strokeLinecap="round"
                  />
                </g>
              );
            })}

            {stages.map((s) => {
              const isActive = s.id === active;
              return (
                <g
                  key={s.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  aria-label={`${s.label}: ${s.detail}`}
                  onMouseEnter={() => setActive(s.id)}
                  onFocus={() => setActive(s.id)}
                  onClick={() => setActive(s.id)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setActive(s.id))}
                  className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-[var(--accent)]"
                >
                  {isActive && <circle cx={s.x} cy={s.y} r="7" fill="var(--accent)" className="node-pulse" />}
                  <rect
                    x={s.x - 52}
                    y={s.y - 26}
                    width="104"
                    height="52"
                    rx="14"
                    fill={isActive ? 'var(--accent)' : 'var(--bg-elev)'}
                    stroke={isActive ? 'var(--accent)' : 'var(--border-strong)'}
                    strokeWidth="1.5"
                    style={{ transition: 'fill 200ms, stroke 200ms' }}
                  />
                  <text x={s.x} y={s.y - 4} textAnchor="middle" fontSize="10" fontFamily="var(--font-mono)" fill={isActive ? 'var(--accent-fg)' : 'var(--fg-subtle)'} opacity="0.85">
                    {s.step}
                  </text>
                  <text x={s.x} y={s.y + 12} textAnchor="middle" fontSize="14" fontWeight="600" fill={isActive ? 'var(--accent-fg)' : 'var(--fg)'}>
                    {s.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <figcaption className="border-t border-line px-5 py-4" aria-live="polite">
          <p className="text-sm font-medium text-fg">
            <span className="mr-2 font-mono text-xs text-accent-ink">{current.step}</span>
            {current.detail}
          </p>
          <p className="mt-1 font-mono text-xs text-subtle">{current.where}</p>
        </figcaption>
      </div>
    </figure>
  );
}
