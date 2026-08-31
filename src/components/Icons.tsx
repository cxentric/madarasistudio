import type { CSSProperties } from "react";

type IconProps = { className?: string; style?: CSSProperties };

// A stepped temple gopuram silhouette.
export function GopuramIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M24 4 L28 10 H20 Z M18 10 H30 L32 16 H16 Z M14 16 H34 L36.5 23 H11.5 Z M9 23 H39 L41 30 H7 Z M6 30 H42 V34 H6 Z M10 34 H38 V42 H10 Z M20 34 V42 M28 34 V42"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

// A davara-and-tumbler filter-coffee set.
export function DavaraIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M14 18 C14 18 13 30 15 34 C16.5 36.5 21.5 36.5 23 34 C25 30 24 18 24 18 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <ellipse cx="19" cy="18" rx="5" ry="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M28 24 H40 C40 29 36.5 32 34 32 C31.5 32 28 29 28 24 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M40 25 C43 25 43 30 40 30" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 40 H26 M30 34 H38" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// A temple bell with a hanging clapper.
export function BellIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M24 6 V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M17 30 C15 24 16 12 24 12 C32 12 33 24 31 30 Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M14 30 H34" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M20 30 C20 34 28 34 28 30" stroke="currentColor" strokeWidth="1.4" />
      <path d="M24 34 V40" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="24" cy="42" r="1.6" fill="currentColor" />
    </svg>
  );
}

// A kolam-style dot grid with a looping line, the site's signature motif.
export function KolamIcon({ className, style }: IconProps) {
  const dots = [
    [12, 12], [24, 12], [36, 12],
    [12, 24], [24, 24], [36, 24],
    [12, 36], [24, 36], [36, 36],
  ];
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} style={style} aria-hidden="true">
      {dots.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="1.4" fill="currentColor" />
      ))}
      <path
        d="M12 12 C 20 12, 20 24, 24 24 C 28 24, 28 12, 36 12 C 44 12, 44 24, 36 24 C 28 24, 28 36, 24 36 C 20 36, 20 24, 12 24 C 4 24, 4 12, 12 12"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

// A three-wheeler silhouette.
export function AutoIcon({ className, style }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M10 30 H8 V22 C8 19 10 17 13 17 H23 L28 22 H33 C36 22 38 24 38 27 V30"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M13 22 H27" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 30 H40" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="14" cy="34" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="34" cy="34" r="3.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export const ICONS = {
  gopuram: GopuramIcon,
  davara: DavaraIcon,
  bell: BellIcon,
  kolam: KolamIcon,
  auto: AutoIcon,
} as const;

export type IconName = keyof typeof ICONS;
