"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Card with a soft cursor-following glow tinted by `hue` (a CSS colour value). */
export function SpotlightCard({
  hue,
  className,
  children,
}: {
  hue: string;
  className?: string;
  children: ReactNode;
}) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onPointerMove={onMove}
      style={{ "--card-hue": hue } as CSSProperties}
      className={cn("group relative isolate overflow-hidden", className)}
    >
      <div
        aria-hidden
        className="spotlight pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      {children}
    </div>
  );
}
