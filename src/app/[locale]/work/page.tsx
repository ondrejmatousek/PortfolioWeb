import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";
import { CtaBand } from "@/components/sections/CtaBand";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const dict = getDictionary(locale);
  return pageMetadata({ locale, path: "/work", title: dict.work.pageTitle, description: dict.work.pageIntro });
}

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <section className="relative isolate overflow-hidden pb-12 pt-32 md:pt-40">
        <div aria-hidden className="bg-grid mask-fade-b absolute inset-0 -z-10" />
        <Container>
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg">
            <ArrowLeft aria-hidden className="size-4" /> {dict.notFound.home}
          </Link>
          <Eyebrow className="mt-10">{dict.work.label}</Eyebrow>
          <h1 className="mt-5 text-5xl font-semibold leading-[0.98] sm:text-7xl">{dict.work.pageTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">{dict.work.pageIntro}</p>
        </Container>
      </section>
      <section className="pb-8">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2">
            {projects.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 2) * 0.06}>
                <ProjectCard project={p} locale={locale} dict={dict} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand title={dict.work.case.ctaTitle} text={dict.work.case.ctaText} href={`/${locale}#contact`} button={dict.nav.cta} />
    </>
  );
}
