import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Info } from "lucide-react";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { pageMetadata } from "@/lib/seo";
import { Container, Eyebrow, StatusDot, Tag } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectVisual } from "@/components/work/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(locale) || !project) return {};
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: `${project.name} — ${project.category[locale]}`,
    description: project.tagline[locale],
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(locale) || !project) notFound();
  const dict = getDictionary(locale);
  const c = dict.work.case;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  const features = project.features[locale];
  const architecture = project.architecture?.[locale] ?? [];

  return (
    <article>
      <header className="relative isolate overflow-hidden pb-14 pt-32 md:pt-40">
        <div aria-hidden className="bg-grid mask-fade-b absolute inset-0 -z-10" />
        <div aria-hidden className="glow -top-40 right-0 -z-10 size-[32rem]" style={{ background: project.color, opacity: 0.18 }} />
        <Container>
          <Link href={`/${locale}/work`} className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg">
            <ArrowLeft aria-hidden className="size-4" /> {c.back}
          </Link>
          <Eyebrow className="mt-10">{project.category[locale]}</Eyebrow>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl">{project.name}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-fg-muted sm:text-2xl">{project.tagline[locale]}</p>

          <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-bg p-5">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">{c.status}</dt>
              <dd className="mt-2 flex items-center gap-2">
                <StatusDot status={project.status} /> {dict.work.status[project.status]}
              </dd>
            </div>
            <div className="bg-bg p-5">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">{c.category}</dt>
              <dd className="mt-2">{project.category[locale]}</dd>
            </div>
            <div className="bg-bg p-5">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">{c.links}</dt>
              <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent-text underline-offset-4 hover:underline">
                    {c.live} <ArrowUpRight aria-hidden className="size-4" />
                    <span className="sr-only">{dict.a11y.external}</span>
                  </a>
                )}
                {project.repoUrl && (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent-text underline-offset-4 hover:underline">
                    {c.repo} <ArrowUpRight aria-hidden className="size-4" />
                    <span className="sr-only">{dict.a11y.external}</span>
                  </a>
                )}
                {!project.liveUrl && !project.repoUrl && <span className="text-fg-subtle">—</span>}
              </dd>
            </div>
            <div className="bg-bg p-5">
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">{project.codename ? c.codename : c.role}</dt>
              <dd className="mt-2">{project.codename ?? project.role?.[locale] ?? <span className="text-fg-subtle">—</span>}</dd>
            </div>
          </dl>
        </Container>
      </header>

      <Container>
        <Reveal>
          <figure className="group relative overflow-hidden rounded-[2rem] border border-line-strong">
            <div className="aspect-[16/8]">
              <ProjectVisual project={project} locale={locale} priority variant="hero" />
            </div>
            {!project.image && (
              <figcaption className="absolute bottom-4 right-4 rounded-full border border-line bg-bg/75 px-3 py-1 font-mono text-xs text-fg-muted backdrop-blur">
                {c.disclaimer}
              </figcaption>
            )}
          </figure>
        </Reveal>
      </Container>

      {project.todo && (
        <Container className="mt-10">
          <aside className="flex gap-4 rounded-2xl border border-dashed border-[color-mix(in_oklab,var(--accent)_50%,transparent)] bg-[color-mix(in_oklab,var(--accent)_6%,transparent)] p-5">
            <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-accent-text" />
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-text">{c.placeholderTitle}</p>
              <p className="mt-1.5 text-fg-muted">{project.todo[locale]}</p>
            </div>
          </aside>
        </Container>
      )}

      <Container className="grid gap-16 py-20 md:py-28 lg:grid-cols-[1fr_20rem] lg:gap-20">
        <div className="space-y-16">
          <Reveal>
            <section aria-labelledby="problem">
              <h2 id="problem" className="flex items-baseline gap-4 text-3xl font-semibold sm:text-4xl">
                <span className="font-mono text-sm text-accent-text">01</span>
                {c.problem}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-fg-muted">{project.problem[locale]}</p>
            </section>
          </Reveal>
          <Reveal>
            <section aria-labelledby="solution">
              <h2 id="solution" className="flex items-baseline gap-4 text-3xl font-semibold sm:text-4xl">
                <span className="font-mono text-sm text-accent-text">02</span>
                {c.solution}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-fg-muted">{project.solution[locale]}</p>
            </section>
          </Reveal>
          {features.length > 0 && (
            <Reveal>
              <section aria-labelledby="features">
                <h2 id="features" className="flex items-baseline gap-4 text-3xl font-semibold sm:text-4xl">
                  <span className="font-mono text-sm text-accent-text">03</span>
                  {c.features}
                </h2>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {features.map((f) => (
                    <li key={f} className="flex gap-3 rounded-2xl border border-line bg-surface/50 p-4">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0" style={{ color: project.color }} />
                      <span className="text-[0.95rem] leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          )}
          {architecture.length > 0 && (
            <Reveal>
              <section aria-labelledby="architecture">
                <h2 id="architecture" className="flex items-baseline gap-4 text-3xl font-semibold sm:text-4xl">
                  <span className="font-mono text-sm text-accent-text">04</span>
                  {c.architecture}
                </h2>
                <ol className="mt-7 space-y-3">
                  {architecture.map((a, i) => (
                    <li key={a} className="grid grid-cols-[2.5rem_1fr] items-start border-t border-line pt-4">
                      <span className="font-mono text-xs text-fg-subtle">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-lg leading-relaxed text-fg-muted">{a}</span>
                    </li>
                  ))}
                </ol>
              </section>
            </Reveal>
          )}
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-line bg-surface/50 p-6">
            <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">{c.stack}</h2>
            {project.stack.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-fg-muted">{c.stackUnknown}</p>
            )}
            <div className="mt-6 border-t border-line pt-5">
              <h2 className="font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">{dict.nav.services}</h2>
              <ul className="mt-3 space-y-2">
                {project.services.map((slugS) => {
                  const s = getService(slugS);
                  return s ? (
                    <li key={slugS}>
                      <Link href={`/${locale}/services/${s.slug}`} className="text-sm text-fg-muted underline-offset-4 hover:text-fg hover:underline">
                        {s.title[locale]}
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </div>
          </div>
        </aside>
      </Container>

      <Container>
        <Link
          href={`/${locale}/work/${next.slug}`}
          className="group flex items-center justify-between gap-6 border-y border-line py-10 transition-colors hover:border-line-strong"
        >
          <span>
            <span className="block font-mono text-xs uppercase tracking-[0.16em] text-fg-subtle">{c.next}</span>
            <span className="mt-2 block font-display text-3xl font-semibold tracking-tight sm:text-5xl">{next.name}</span>
          </span>
          <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:border-transparent group-hover:bg-accent group-hover:text-accent-ink">
            <ArrowRight aria-hidden className="size-5" />
          </span>
        </Link>
      </Container>

      <CtaBand title={c.ctaTitle} text={c.ctaText} href={`/${locale}#contact`} button={dict.nav.cta} />
    </article>
  );
}
