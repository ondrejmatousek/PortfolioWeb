import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { techGroups } from "@/content/tech";
import { processSteps } from "@/content/process";
import { Container, SectionHeading } from "@/components/ui/primitives";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { TechStack } from "@/components/sections/TechStack";
import { ProcessTimeline } from "@/components/sections/Process";
import { Contact } from "@/components/sections/Contact";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role[locale],
    url: `${site.url}/${locale}`,
    sameAs: [site.links.github, site.links.linkedin].filter(Boolean),
    knowsAbout: ["C#", ".NET", "ASP.NET Core", "SQL Server", "REST API", "React", "Next.js", "WordPress", "AI automation"],
    makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title[locale], description: s.summary[locale] } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Hero locale={locale} dict={dict} />
      <About dict={dict} />
      <Services locale={locale} dict={dict} />
      <SelectedWork locale={locale} dict={dict} />

      <section id="stack" aria-labelledby="stack-title" className="relative py-24 md:py-32">
        <Container>
          <SectionHeading id="stack-title" index="04" label={dict.stack.label} title={dict.stack.title} intro={dict.stack.intro} />
          <TechStack locale={locale} dict={dict.stack} groups={techGroups} />
        </Container>
      </section>

      <section id="process" aria-labelledby="process-title" className="relative py-24 md:py-32">
        <Container>
          <SectionHeading id="process-title" index="05" label={dict.process.label} title={dict.process.title} intro={dict.process.intro} />
          <ProcessTimeline locale={locale} dict={dict.process} steps={processSteps} />
        </Container>
      </section>

      <Contact locale={locale} dict={dict} />
    </>
  );
}
