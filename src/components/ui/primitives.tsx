import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10", className)}>{children}</div>;
}

/** Monospace section label, e.g. "01 — About". */
export function Eyebrow({ index, children, className }: { index?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-fg-muted", className)}>
      {index && <span className="text-accent-text">{index}</span>}
      <span aria-hidden className="h-px w-8 bg-line-strong" />
      <span>{children}</span>
    </p>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  intro,
  id,
  className,
}: {
  index?: string;
  label: string;
  title: string;
  intro?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Eyebrow index={index}>{label}</Eyebrow>
      <h2 id={id} className="mt-5 text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-[3.6rem]">
        {title}
      </h2>
      {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{intro}</p>}
    </div>
  );
}

type ButtonVariant = "primary" | "ghost";

const buttonBase =
  "group relative inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.95rem] font-medium transition-[transform,background-color,border-color,box-shadow] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.98]";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[0_0_0_1px_color-mix(in_oklab,var(--accent)_60%,transparent),0_10px_40px_-10px_color-mix(in_oklab,var(--accent)_70%,transparent)] hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_var(--accent),0_18px_50px_-12px_color-mix(in_oklab,var(--accent)_90%,transparent)]",
  ghost: "border border-line-strong bg-surface/60 text-fg backdrop-blur hover:-translate-y-0.5 hover:border-fg-subtle hover:bg-surface",
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  icon = true,
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; icon?: boolean }) {
  return (
    <Link className={cn(buttonBase, buttonVariants[variant], className)} {...props}>
      {children}
      {icon && (
        <ArrowUpRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </Link>
  );
}

export const buttonClass = (variant: ButtonVariant = "primary", className?: string) =>
  cn(buttonBase, buttonVariants[variant], className);

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface-2/70 px-3 py-1 font-mono text-[0.72rem] tracking-wide text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusDot({ status }: { status: "live" | "pilot" | "in-development" | "internal" | "placeholder" }) {
  const color =
    status === "live" ? "bg-emerald-400" : status === "pilot" ? "bg-sky-400" : status === "placeholder" ? "bg-fg-subtle" : "bg-amber-400";
  return (
    <span aria-hidden className="relative inline-flex size-2">
      {status === "live" && <span className={cn("animate-pulse-ring absolute inset-0 rounded-full", color)} />}
      <span className={cn("relative inline-flex size-2 rounded-full", color)} />
    </span>
  );
}
