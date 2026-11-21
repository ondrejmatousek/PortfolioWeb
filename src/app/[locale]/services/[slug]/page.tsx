import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { CSSProperties } from "react";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getService, services } from "@/content/services";
import { getProject } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { Container, Eyebrow, Tag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceIcon, hueVar } from "@/components/ui/ServiceIcon";
import { ProjectCard } from "@/components/work/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!hasLocale(locale) || !service) return {};
  return pageMetadata({ locale, path: `/services/${slug}`, title: service.title[locale], description: service.summary[locale] });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!hasLocale(locale) || !service) notFound();
  const dict = getDictionary(locale);
  const d = dict.services.detail;
  const hue = hueVar(service.hue);
  const related = service.relatedProjects.map(getProject).filter((p) => p !== undefined);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <div style={{ "--card-hue": hue } as CSSProperties}>
      <header className="relative isolate overflow-hidden pb-16 pt-32 md:pt-40">
        <div aria-hidden className="bg-grid mask-fade-b absolute inset-0 -z-10" />
        <div aria-hidden className="glow -top-32 left-1/3 -z-10 h-[26rem] w-[40rem]" style={{ background: hue, opacity: 0.2 }} />
        <Container>
          <Link href={`/${locale}#services`} className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg">
            <ArrowLeft aria-hidden className="size-4" /> {d.back}
          </Link>
          <div className="mt-10 flex items-center gap-4">
            <span
              className="grid size-14 place-items-center rounded-2xl border"
              style={{ color: hue, borderColor: `color-mix(in oklab, ${hue} 35%, transparent)`, background: `color-mix(in oklab, ${hue} 10%, transparent)` }}
            >
              <ServiceIcon icon={service.icon} className="size-6" />
            </span>
            <Eyebrow>{dict.services.label}</Eyebrow>
          </div>
          <h1 className="mt-6 text-5xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl">{service.title[locale]}</h1>
          <p className="mt-6 max-w-3xl text-xl sm:text-2xl" style={{ color: `color-mix(in oklab, ${hue} 55%, var(--fg))` }}>
            {service.tagline[locale]}
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-fg-muted">{service.intro[locale]}</p>
        </Container>
      </header>

      <section aria-labelledby="deliverables" className="py-16 md:py-24">
        <Container>
          <h2 id="deliverables" className="text-3xl font-semibold sm:text-5xl">
            {d.deliverablesTitle}
          </h2>
          <ul className={`mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 ${service.deliverables[locale].length % 3 === 0 ? "lg:grid-cols-3" : ""}`}>
            {service.deliverables[locale].map((item, i) => (
              <Reveal as="li" key={item.title} delay={(i % 3) * 0.05} className="bg-bg p-7">
                <span className="font-mono text-xs" style={{ color: hue }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-fg-muted">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">{d.useCasesTitle}</h2>
            <ul className="mt-8 space-y-4">
              {service.useCases[locale].map((u) => (
                <li key={u} className="flex gap-4 border-t border-line pt-4 text-lg leading-relaxed text-fg-muted">
                  <ArrowRight aria-hidden className="mt-1.5 size-4 shrink-0" style={{ color: hue }} />
                  {u}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">{d.stackTitle}</h2>
            <ul className="mt-8 flex flex-wrap gap-2">
              {service.stack.map((s) => (
                <li key={s}>
                  <Tag className="px-4 py-2 text-sm">{s}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related" className="py-16 md:py-24">
          <Container>
            <h2 id="related" className="text-3xl font-semibold sm:text-4xl">
              {d.relatedTitle}
            </h2>
            <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} locale={locale} dict={dict} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <CtaBand title={d.ctaTitle} text={d.ctaText} href={`/${locale}#contact`} button={dict.nav.cta} />

      <nav aria-label={dict.nav.services} className="pb-20">
        <Container>
          <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link href={`/${locale}/services/${s.slug}`} className="group flex h-full items-center justify-between gap-4 bg-bg p-6 transition-colors hover:bg-surface">
                  <span className="flex items-center gap-3">
                    <ServiceIcon icon={s.icon} className="size-5 text-fg-muted" />
                    <span className="font-display text-lg font-semibold tracking-tight">{s.title[locale]}</span>
                  </span>
                  <ArrowRight aria-hidden className="size-4 text-fg-subtle transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </div>
  );
}
