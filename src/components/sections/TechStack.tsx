"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { TechGroup, TechLevel } from "@/content/types";
import { cn } from "@/lib/cn";

const levelStyle: Record<TechLevel, { dot: string; card: string }> = {
  professional: { dot: "bg-accent", card: "border-[color-mix(in_oklab,var(--accent)_40%,transparent)] bg-[color-mix(in_oklab,var(--accent)_8%,var(--surface))]" },
  projects: { dot: "bg-cool", card: "border-[color-mix(in_oklab,var(--cool)_35%,transparent)] bg-[color-mix(in_oklab,var(--cool)_6%,var(--surface))]" },
  workflow: { dot: "bg-fg-subtle", card: "border-line-strong bg-surface" },
};

export function TechStack({ locale, dict, groups }: { locale: Locale; dict: Dictionary["stack"]; groups: TechGroup[] }) {
  const tabs = [{ id: "all", title: dict.all }, ...groups.map((g) => ({ id: g.id, title: g.title[locale] }))];
  const [active, setActive] = useState("all");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduce = useReducedMotion();

  const visible = active === "all" ? groups : groups.filter((g) => g.id === active);

  // WAI-ARIA tabs keyboard pattern: arrows, Home, End
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = tabs.length - 1;
    let next = -1;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next >= 0) {
      e.preventDefault();
      setActive(tabs[next].id);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div className="mt-14">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label={dict.tablist} className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {tabs.map((tab, i) => {
            const selected = tab.id === active;
            return (
              <button
                key={tab.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls="tech-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(tab.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors",
                  selected ? "text-bg" : "text-fg-muted hover:text-fg",
                )}
              >
                {selected && (
                  <motion.span
                    layoutId={reduce ? undefined : "tab-pill"}
                    className="absolute inset-0 -z-0 rounded-full bg-fg"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">{tab.title}</span>
              </button>
            );
          })}
        </div>

        <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-fg-muted">
          {(Object.keys(levelStyle) as TechLevel[]).map((level) => (
            <li key={level} className="flex items-center gap-2" title={dict.levelHints[level]}>
              <span aria-hidden className={cn("size-2 rounded-full", levelStyle[level].dot)} />
              <span>
                <span className="text-fg">{dict.levels[level]}</span>
                <span className="hidden xl:inline"> — {dict.levelHints[level]}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div id="tech-panel" role="tabpanel" aria-labelledby={`tab-${active}`} tabIndex={0} className="mt-10 rounded-3xl focus-visible:outline-offset-8">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={cn("grid gap-5", active === "all" ? "md:grid-cols-2 xl:grid-cols-3" : "")}
          >
            {visible.map((group) => (
              <section
                key={group.id}
                aria-label={group.title[locale]}
                className={cn("rounded-3xl border border-line bg-surface/50 p-6 sm:p-7", active === "all" && group.id === "frontend" && "xl:row-span-1")}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold">{group.title[locale]}</h3>
                  <span className="font-mono text-xs text-fg-subtle">{String(group.items.length).padStart(2, "0")}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{group.description[locale]}</p>
                <ul className={cn("mt-6 grid gap-2", active === "all" ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4")}>
                  {group.items.map((item) => (
                    <li
                      key={item.name}
                      className={cn(
                        "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm transition-transform duration-300 hover:-translate-y-0.5",
                        levelStyle[item.level].card,
                      )}
                    >
                      <span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", levelStyle[item.level].dot)} />
                      <span className="leading-tight">{item.name}</span>
                      <span className="sr-only">— {dict.levels[item.level]}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
