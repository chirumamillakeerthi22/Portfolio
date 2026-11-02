import { useRef, type KeyboardEvent } from 'react';
import { useTheme, type ThemePreference } from './ThemeProvider';
import { MonitorIcon, MoonIcon, SunIcon } from '../components/Icons';

const options: { value: ThemePreference; label: string; Icon: typeof SunIcon }[] = [
  { value: 'system', label: 'System', Icon: MonitorIcon },
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
];

/** Three-way segmented control, built as an ARIA radio group with arrow-key support. */
export function ThemeSwitcher({ showLabels = false }: { showLabels?: boolean }) {
  const { preference, setPreference } = useTheme();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + options.length) % options.length;
    setPreference(options[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className="relative inline-flex items-center gap-0.5 rounded-full border border-line bg-sunken p-0.5"
    >
      {options.map(({ value, label, Icon }, i) => {
        const active = preference === value;
        return (
          <button
            key={value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            title={`${label} theme`}
            onClick={() => setPreference(value)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`inline-flex h-8 items-center justify-center gap-1.5 rounded-full text-xs font-medium transition-colors ${
              showLabels ? 'px-3' : 'w-8'
            } ${active ? 'bg-elev text-fg shadow-[var(--shadow-sm)] ring-1 ring-line' : 'text-subtle hover:text-fg'}`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span className={showLabels ? '' : 'sr-only'}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
