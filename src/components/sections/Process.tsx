"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { ProcessStep } from "@/content/types";

/** Vertical timeline whose spine fills as you scroll through the steps. */
export function ProcessTimeline({ locale, dict, steps }: { locale: Locale; dict: Dictionary["process"]; steps: ProcessStep[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ol ref={ref} className="relative mt-16">
      {/* spine */}
      <span aria-hidden className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-line-strong md:left-1/2" />
      <motion.span
        aria-hidden
        className="absolute bottom-6 left-[1.4rem] top-6 w-px origin-top bg-gradient-to-b from-accent via-[var(--hue-ai)] to-cool md:left-1/2"
        style={{ scaleY: reduce ? 1 : progress }}
      />

      {steps.map((step, i) => {
        const right = i % 2 === 1;
        return (
          <li key={step.id} className="relative grid grid-cols-[2.8rem_1fr] gap-5 pb-12 last:pb-0 md:grid-cols-[1fr_4rem_1fr] md:gap-0 md:[&:not(:first-child)]:-mt-24">
            {/* node */}
            <div className="relative z-10 flex justify-center md:col-start-2 md:row-start-1">
              <span className="grid size-11 place-items-center rounded-full border border-line-strong bg-bg font-mono text-sm text-fg shadow-[0_0_0_6px_var(--bg)]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <motion.div
              initial={reduce ? false : { opacity: 0, x: right ? 24 : -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={
                right
                  ? "md:col-start-3 md:row-start-1 md:pl-10"
                  : "md:col-start-1 md:row-start-1 md:pr-10 md:text-right"
              }
            >
              <div className="rounded-3xl border border-line bg-surface/60 p-6 transition-colors hover:border-line-strong sm:p-7">
                <h3 className="text-2xl font-semibold">{step.title[locale]}</h3>
                <p className="mt-3 leading-relaxed text-fg-muted">{step.text[locale]}</p>
                <div className={right ? "mt-5" : "mt-5 md:flex md:flex-col md:items-end"}>
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-fg-subtle">{dict.outputs}</p>
                  <ul className={right ? "mt-2 flex flex-wrap gap-2" : "mt-2 flex flex-wrap gap-2 md:justify-end"}>
                    {step.outputs[locale].map((o) => (
                      <li key={o} className="rounded-full border border-line px-3 py-1 font-mono text-[0.72rem] text-fg-muted">
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
