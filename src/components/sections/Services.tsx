import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { services } from "@/content/services";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { ServiceIcon, hueVar } from "@/components/ui/ServiceIcon";

export function Services({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading id="services-title" index="02" label={dict.services.label} title={dict.services.title} intro={dict.services.intro} />

        <ul className="mt-16 grid gap-5 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 2) * 0.08}>
              <SpotlightCard
                hue={hueVar(s.hue)}
                className="h-full rounded-3xl border border-line bg-surface/60 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-line-strong"
              >
                <Link href={`/${locale}/services/${s.slug}`} className="flex h-full flex-col p-7 sm:p-9">
                  <div className="flex items-start justify-between gap-6">
                    <span
                      className="grid size-14 place-items-center rounded-2xl border"
                      style={{
                        color: hueVar(s.hue),
                        borderColor: `color-mix(in oklab, ${hueVar(s.hue)} 35%, transparent)`,
                        background: `color-mix(in oklab, ${hueVar(s.hue)} 10%, transparent)`,
                      }}
                    >
                      <ServiceIcon icon={s.icon} className="size-6" />
                    </span>
                    <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                  </div>

                  <h3 className="mt-10 text-2xl font-semibold sm:text-[1.9rem]">{s.title[locale]}</h3>
                  <p className="mt-2 text-fg" style={{ color: `color-mix(in oklab, ${hueVar(s.hue)} 55%, var(--fg))` }}>
                    {s.tagline[locale]}
                  </p>
                  <p className="mt-4 leading-relaxed text-fg-muted">{s.summary[locale]}</p>

                  <ul className="mt-7 flex flex-wrap gap-2" aria-label="Keywords">
                    {s.keywords[locale].map((kw) => (
                      <li key={kw} className="rounded-full border border-line px-3 py-1 font-mono text-[0.72rem] text-fg-muted">
                        {kw}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-auto flex items-center gap-2 pt-9 text-sm font-medium">
                    {dict.services.more}
                    <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
                {/* hue hairline */}
                <span
                  aria-hidden
                  className="absolute inset-x-8 top-0 h-px opacity-60"
                  style={{ background: `linear-gradient(90deg, transparent, ${hueVar(s.hue)}, transparent)` }}
                />
              </SpotlightCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
