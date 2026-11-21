import type { ProjectArt as ArtKind } from "@/content/types";

/**
 * Illustrative, stylised previews for each project type.
 * These are NOT screenshots — the UI labels them as illustrative.
 * Replace with a real screenshot via `project.image` when available.
 */
export function ProjectArt({ kind, color }: { kind: ArtKind; color: string }) {
  return (
    <svg viewBox="0 0 400 260" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`g-${kind}`} cx="70%" cy="10%" r="80%">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <pattern id={`dots-${kind}`} width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="var(--line-strong)" />
        </pattern>
      </defs>
      <rect width="400" height="260" fill="var(--surface-2)" />
      <rect width="400" height="260" fill={`url(#dots-${kind})`} />
      <rect width="400" height="260" fill={`url(#g-${kind})`} />
      <g className="transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5">{art[kind](color)}</g>
    </svg>
  );
}

const panel = (x: number, y: number, w: number, h: number, r = 10) => (
  <rect x={x} y={y} width={w} height={h} rx={r} fill="var(--surface)" stroke="var(--line-strong)" />
);
const bar = (x: number, y: number, w: number, h = 6, fill = "var(--line-strong)", key?: string | number) => (
  <rect key={key} x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} />
);

const art: Record<ArtKind, (c: string) => React.ReactNode> = {
  jobs: (c) => (
    <>
      {panel(40, 34, 320, 210)}
      {bar(60, 54, 90, 8, "var(--fg-subtle)")}
      {bar(270, 50, 70, 16, c)}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(60 ${86 + i * 50})`}>
          <rect width="280" height="40" rx="8" fill="var(--surface-2)" stroke="var(--line)" />
          <rect x="10" y="9" width="22" height="22" rx="6" fill={c} opacity={0.25 + i * 0.2} />
          {bar(42, 11, 110 - i * 14, 6, "var(--fg-muted)")}
          {bar(42, 24, 70, 5)}
          {bar(222, 15, 46, 10, i === 0 ? c : "var(--line-strong)")}
        </g>
      ))}
    </>
  ),
  replay: (c) => {
    const candles = [
      [0, 120, 150, 110, 160], [1, 150, 135, 128, 158], [2, 135, 140, 126, 148], [3, 140, 118, 112, 146],
      [4, 118, 104, 98, 124], [5, 104, 112, 96, 118], [6, 112, 96, 88, 116], [7, 96, 86, 78, 102],
      [8, 86, 98, 80, 104], [9, 98, 80, 74, 102], [10, 80, 72, 64, 88], [11, 72, 84, 66, 90],
    ];
    return (
      <>
        {panel(30, 30, 340, 200)}
        <line x1="50" y1="150" x2="350" y2="150" stroke="var(--line-strong)" strokeDasharray="3 4" />
        <rect x="248" y="76" width="96" height="28" fill="#4fd1a5" opacity="0.14" />
        <rect x="248" y="104" width="96" height="18" fill="#ff6b6b" opacity="0.14" />
        {candles.map(([i, o, cl, lo, hi]) => {
          const x = 60 + i * 22;
          const up = cl < o;
          return (
            <g key={i} opacity={i > 9 ? 0.35 : 1}>
              <line x1={x + 5} x2={x + 5} y1={lo} y2={hi} stroke={up ? "#4fd1a5" : "var(--fg-subtle)"} />
              <rect x={x} y={Math.min(o, cl)} width="10" height={Math.max(3, Math.abs(o - cl))} rx="1.5" fill={up ? "#4fd1a5" : "var(--fg-subtle)"} />
            </g>
          );
        })}
        <line x1="283" y1="44" x2="283" y2="214" stroke={c} strokeWidth="1.5" />
        <g transform="translate(150 196)">
          <rect width="100" height="24" rx="12" fill="var(--surface-2)" stroke="var(--line-strong)" />
          <path d="M18 7 L18 17 L26 12 Z" fill={c} />
          {bar(36, 9, 52, 6, "var(--line-strong)")}
          {bar(36, 9, 30, 6, c)}
        </g>
      </>
    );
  },
  watcher: (c) => (
    <>
      <g transform="translate(200 132)">
        {[96, 68, 40].map((r) => (
          <circle key={r} r={r} fill="none" stroke="var(--line-strong)" />
        ))}
        <line x1="-100" x2="100" stroke="var(--line)" />
        <line y1="-100" y2="100" stroke="var(--line)" />
        <path d="M0 0 L96 0 A96 96 0 0 0 68 -68 Z" fill={c} opacity="0.18" />
        {[[40, -50], [-60, 30], [20, 62], [-30, -70]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill={c} opacity="0.18" />
            <circle cx={x} cy={y} r="3.5" fill={i === 0 ? c : "var(--fg-muted)"} />
          </g>
        ))}
      </g>
      <g transform="translate(272 30)">
        <rect width="104" height="40" rx="8" fill="var(--surface)" stroke="var(--line-strong)" />
        <circle cx="14" cy="20" r="4" fill={c} />
        {bar(26, 13, 64, 5, "var(--fg-muted)")}
        {bar(26, 23, 44, 5)}
      </g>
    </>
  ),
  seasonality: (c) => (
    <>
      {panel(30, 30, 340, 200)}
      {bar(50, 48, 80, 7, "var(--fg-subtle)")}
      {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => (
        <text key={i} x={62 + i * 26} y="214" fontSize="8" fill="var(--fg-subtle)" fontFamily="monospace">
          {m}
        </text>
      ))}
      <rect x="166" y="66" width="78" height="134" fill={c} opacity="0.1" />
      <path
        d="M58 150 C 90 140, 110 160, 140 140 S 190 90, 220 96 S 270 140, 300 126 S 340 110, 352 104 L352 170 C 330 172, 300 186, 270 176 S 230 140, 200 142 S 150 186, 120 180 S 80 176, 58 186 Z"
        fill={c}
        opacity="0.16"
      />
      <path d="M58 168 C 90 158, 110 172, 140 160 S 190 112, 220 118 S 270 160, 300 150 S 340 132, 352 136" fill="none" stroke={c} strokeWidth="2.4" />
      <path d="M58 172 C 100 170, 130 150, 170 150 S 240 140, 280 150 S 330 140, 352 146" fill="none" stroke="var(--fg-subtle)" strokeWidth="1.2" strokeDasharray="3 4" />
    </>
  ),
  insiders: (c) => (
    <>
      {panel(30, 30, 340, 200)}
      {bar(50, 48, 70, 7, "var(--fg-subtle)")}
      {bar(290, 45, 60, 14, c)}
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(50 ${76 + i * 28})`}>
          <line x1="0" x2="300" y1="22" y2="22" stroke="var(--line)" />
          {bar(0, 6, 34, 7, i < 2 ? c : "var(--fg-muted)")}
          {bar(50, 6, 90 - i * 8, 6)}
          {bar(170, 6, 40, 6)}
          {[0, 1, 2].map((d) => (
            <circle key={d} cx={250 + d * 14} cy="9" r="4.5" fill={d < 3 - Math.min(i, 2) ? c : "var(--line-strong)"} opacity={d < 3 - Math.min(i, 2) ? 0.9 : 1} />
          ))}
        </g>
      ))}
    </>
  ),
  shop: (c) => (
    <>
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${38 + i * 112} ${46 + (i === 1 ? -12 : 0)})`}>
          <rect width="100" height="168" rx="12" fill="var(--surface)" stroke="var(--line-strong)" />
          <rect x="8" y="8" width="84" height="100" rx="8" fill={c} opacity={0.12 + i * 0.06} />
          {i === 0 && <path d="M30 92 L30 52 Q50 34 70 52 L70 92" fill="none" stroke={c} strokeWidth="2" />}
          {i === 1 && (
            <>
              <line x1="50" y1="20" x2="50" y2="50" stroke={c} strokeWidth="1.5" />
              <path d="M32 70 Q50 40 68 70 Z" fill={c} opacity="0.7" />
            </>
          )}
          {i === 2 && <rect x="28" y="44" width="44" height="40" rx="6" fill="none" stroke={c} strokeWidth="2" />}
          {bar(10, 120, 60, 6, "var(--fg-muted)")}
          {bar(10, 134, 38, 5)}
          {bar(10, 148, 32, 8, c)}
        </g>
      ))}
    </>
  ),
};
