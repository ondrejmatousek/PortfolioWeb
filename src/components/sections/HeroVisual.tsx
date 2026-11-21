import type { CSSProperties, ReactNode } from "react";

/**
 * Decorative hero composition: a code editor that "types" a short C# story
 * (brief → AI draft → human review → ship) and a live system map.
 * Pure HTML/SVG + CSS animations — no client JS, disabled under reduced motion.
 */

const k = (s: string) => <span className="text-[#c792ea]">{s}</span>; // keyword
const ty = (s: string) => <span className="text-[#82aaff]">{s}</span>; // type
const fn = (s: string) => <span className="text-[#ffcb6b]">{s}</span>; // method
const cm = (s: string) => <span className="italic text-fg-subtle">{s}</span>; // comment
const pn = (s: string) => <span className="text-fg-subtle">{s}</span>; // punctuation

const lines: { indent: number; content: ReactNode }[] = [
  { indent: 0, content: <>{k("public sealed class ")}{ty("ProjectService")}{pn("(")}{ty("IAppDb")} db{pn(", ")}{ty("IAiAgent")} agent{pn(")")}</> },
  { indent: 0, content: pn("{") },
  { indent: 1, content: <>{k("public async ")}{ty("Task")}{pn("<")}{ty("Result")}{pn(">")} {fn("DeliverAsync")}{pn("(")}{ty("Brief")} brief{pn(")")}</> },
  { indent: 1, content: pn("{") },
  { indent: 2, content: <>{k("var ")}draft {pn("=")} {k("await ")}agent{pn(".")}{fn("DraftAsync")}{pn("(")}brief{pn(");")}</> },
  { indent: 2, content: <>{k("var ")}code {pn("=")} {fn("Review")}{pn("(")}draft{pn(");")} {cm("// human in the loop")}</> },
  { indent: 2, content: <>{k("await ")}db{pn(".")}{fn("SaveAsync")}{pn("(")}code{pn(");")}</> },
  { indent: 2, content: <>{k("return ")}{ty("Result")}{pn(".")}{fn("Shipped")}{pn("(")}code{pn(");")}</> },
  { indent: 1, content: pn("}") },
  { indent: 0, content: pn("}") },
];

const nodes = [
  { id: "web", x: 18, y: 26, label: "Web", sub: "Next.js" },
  { id: "api", x: 50, y: 50, label: "API", sub: "ASP.NET Core" },
  { id: "db", x: 82, y: 26, label: "SQL", sub: "SQL Server" },
  { id: "ai", x: 82, y: 78, label: "AI", sub: "agent" },
  { id: "ops", x: 18, y: 78, label: "CI/CD", sub: "Azure" },
];

export function HeroVisual({ label }: { label: string }) {
  return (
    <figure aria-label={label} className="relative mx-auto w-full max-w-[560px] select-none lg:mx-0">
      {/* soft glows */}
      <div aria-hidden className="glow -right-10 -top-10 size-72 bg-[var(--accent)]" />
      <div aria-hidden className="glow -bottom-16 -left-10 size-72 bg-[var(--cool)]" />

      {/* Editor */}
      <div
        aria-hidden
        className="animate-rise relative overflow-hidden rounded-2xl border border-line-strong bg-surface/80 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.6)] backdrop-blur-xl"
        style={{ animationDelay: "250ms" }}
      >
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-fg-subtle/40" />
            <span className="size-2.5 rounded-full bg-fg-subtle/40" />
            <span className="size-2.5 rounded-full bg-fg-subtle/40" />
          </div>
          <span className="font-mono text-[0.7rem] text-fg-subtle">ProjectService.cs</span>
          <span className="flex items-center gap-1.5 font-mono text-[0.65rem] text-emerald-400/90">
            <span className="size-1.5 rounded-full bg-emerald-400" /> ready
          </span>
        </div>
        <pre className="overflow-hidden px-4 py-4 font-mono text-[0.68rem] leading-[1.85] text-fg sm:text-[0.76rem]">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 w-4 shrink-0 text-right text-fg-subtle/60">{i + 1}</span>
              <span
                className="animate-type block whitespace-pre"
                style={{ animationDelay: `${600 + i * 260}ms`, paddingLeft: `${line.indent * 1.25}rem` } as CSSProperties}
              >
                {line.content}
                {i === lines.length - 1 && <span className="animate-caret ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.2em] bg-accent" />}
              </span>
            </div>
          ))}
        </pre>
      </div>

      {/* System map */}
      <div
        aria-hidden
        className="animate-rise relative -mt-6 ml-auto w-[82%] rounded-2xl border border-line-strong bg-bg-elev/90 p-3 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)] backdrop-blur-xl sm:-mt-8 sm:w-[72%]"
        style={{ animationDelay: "900ms" }}
      >
        <div className="mb-1 flex items-center justify-between px-1">
          <span className="font-mono text-[0.65rem] text-fg-subtle">system.map</span>
          <span className="font-mono text-[0.65rem] text-accent-text">live</span>
        </div>
        <svg viewBox="0 0 100 100" className="h-auto w-full" style={{ aspectRatio: "16 / 10" }} preserveAspectRatio="none">
          {nodes
            .filter((n) => n.id !== "api")
            .map((n) => (
              <g key={n.id}>
                <line x1={50} y1={50} x2={n.x} y2={n.y} stroke="var(--line-strong)" strokeWidth={0.5} vectorEffect="non-scaling-stroke" />
                <line
                  className="animate-flow"
                  x1={50}
                  y1={50}
                  x2={n.x}
                  y2={n.y}
                  stroke={n.id === "ai" ? "var(--hue-ai)" : n.id === "db" ? "var(--cool)" : "var(--accent)"}
                  strokeWidth={1.4}
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}
        </svg>
        {/* Node labels as HTML so text never stretches with the SVG */}
        <div className="pointer-events-none absolute inset-x-3 bottom-3 top-8">
          {nodes.map((n) => (
            <div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div
                className={
                  n.id === "api"
                    ? "rounded-lg border border-accent/60 bg-surface px-2.5 py-1.5 text-center shadow-[0_0_30px_-6px_var(--accent)]"
                    : "rounded-lg border border-line-strong bg-surface px-2 py-1 text-center"
                }
              >
                <div className="font-mono text-[0.62rem] font-semibold leading-tight text-fg sm:text-[0.7rem]">{n.label}</div>
                <div className="font-mono text-[0.5rem] leading-tight text-fg-subtle sm:text-[0.56rem]">{n.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}
