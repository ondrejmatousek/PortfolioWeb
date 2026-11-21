import Link from "next/link";

export function Logo({ href, name }: { href: string; name: string }) {
  return (
    <Link href={href} className="group flex items-center gap-3" aria-label={name}>
      <span
        aria-hidden
        className="relative grid size-9 place-items-center overflow-hidden rounded-xl border border-line-strong bg-surface font-mono text-[0.8rem] font-semibold tracking-tight"
      >
        <span className="relative z-10">
          om<span className="text-accent">.</span>
        </span>
        <span className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,color-mix(in_oklab,var(--accent)_35%,transparent),transparent_60%)] opacity-60 transition-opacity group-hover:opacity-100" />
      </span>
      <span className="hidden whitespace-nowrap font-display text-[0.95rem] font-semibold tracking-tight sm:block lg:hidden xl:block">{name}</span>
    </Link>
  );
}
