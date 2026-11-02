import type { Project } from '../data/profile';

const COL_W = 168;
const ROW_H = 92;
const BOX_W = 142;
const BOX_H = 54;
const PAD_X = 16;
const PAD_Y = 14;

/** Architecture diagram drawn from the node list in the data file (not a screenshot). */
export function ArchitectureDiagram({ project, animated = true, idPrefix }: { project: Project; animated?: boolean; idPrefix: string }) {
  const { nodes, edges } = project.architecture;
  const cols = Math.max(...nodes.map((n) => n.col)) + 1;
  const rows = Math.max(...nodes.map((n) => n.row)) + 1;
  const width = PAD_X * 2 + (cols - 1) * COL_W + BOX_W;
  const height = PAD_Y * 2 + (rows - 1) * ROW_H + BOX_H;
  const pos = (id: string) => {
    const n = nodes.find((x) => x.id === id)!;
    return { x: PAD_X + n.col * COL_W, y: PAD_Y + n.row * ROW_H };
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="block h-auto w-full"
      role="img"
      aria-labelledby={`${idPrefix}-arch-title`}
    >
      <title id={`${idPrefix}-arch-title`}>{`${project.name} architecture: ${project.architecture.caption}`}</title>
      {edges.map(({ from, to }) => {
        const a = pos(from);
        const b = pos(to);
        // Connect the nearest sides of the two boxes with a smooth curve.
        const sameCol = a.x === b.x;
        const x1 = sameCol ? a.x + BOX_W / 2 : a.x < b.x ? a.x + BOX_W : a.x;
        const y1 = sameCol ? (a.y < b.y ? a.y + BOX_H : a.y) : a.y + BOX_H / 2;
        const x2 = sameCol ? b.x + BOX_W / 2 : a.x < b.x ? b.x : b.x + BOX_W;
        const y2 = sameCol ? (a.y < b.y ? b.y : b.y + BOX_H) : b.y + BOX_H / 2;
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const d = sameCol ? `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}` : `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`;
        return (
          <g key={from + to}>
            <path d={d} fill="none" stroke="var(--border-strong)" strokeWidth="1.5" />
            <path d={d} fill="none" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" className={animated ? 'edge-flow' : ''} strokeDasharray={animated ? undefined : '0'} opacity="0.9" />
          </g>
        );
      })}
      {nodes.map((n) => {
        const { x, y } = pos(n.id);
        return (
          <g key={n.id}>
            <rect x={x} y={y} width={BOX_W} height={BOX_H} rx="12" fill="var(--bg-elev)" stroke="var(--border-strong)" strokeWidth="1.25" />
            <rect x={x} y={y + 14} width="3" height={BOX_H - 28} rx="1.5" fill="var(--brand)" />
            <text x={x + 14} y={y + 23} fontSize="12.5" fontWeight="600" fill="var(--fg)">
              {n.label}
            </text>
            <text x={x + 14} y={y + 40} fontSize="10" fill="var(--fg-subtle)">
              {n.sub}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** Narrow-screen version: the same components as a readable list. */
export function ArchitectureList({ project }: { project: Project }) {
  return (
    <ol className="grid grid-cols-2 gap-2" aria-label={`${project.name} architecture components`}>
      {project.architecture.nodes.map((n) => (
        <li key={n.id} className="relative rounded-xl border border-line-strong bg-elev py-2.5 pl-4 pr-3">
          <span aria-hidden="true" className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full" style={{ background: 'var(--brand)' }} />
          <span className="block text-[13px] font-semibold leading-tight text-fg">{n.label}</span>
          <span className="mt-0.5 block text-[11px] leading-tight text-subtle">{n.sub}</span>
        </li>
      ))}
    </ol>
  );
}

/** Picks the diagram or the list depending on the available width (CSS only, no JS measurement). */
export function Architecture({ project, idPrefix }: { project: Project; idPrefix: string }) {
  return (
    <>
      <div className="hidden sm:block">
        <ArchitectureDiagram project={project} idPrefix={idPrefix} />
      </div>
      <div className="sm:hidden">
        <ArchitectureList project={project} />
      </div>
    </>
  );
}
