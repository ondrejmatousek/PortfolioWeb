import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { projects } from "@/content/projects";
import { ButtonLink, Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";

/** Asymmetric bento rhythm: 7/5 · 5/7 · 6/6 · 6/6, repeating for additional projects. */
const layout = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6", "lg:col-span-6"];

export function SelectedWork({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="work" aria-labelledby="work-title" className="relative py-24 md:py-32">
      <Container>
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading id="work-title" index="03" label={dict.work.label} title={dict.work.title} intro={dict.work.intro} />
          <ButtonLink href={`/${locale}/work`} variant="ghost" className="shrink-0">
            {dict.work.viewAll}
          </ButtonLink>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {projects.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 0.06} className={i === projects.length - 1 && projects.length % 2 === 1 ? "md:col-span-2 lg:col-span-12" : layout[i % layout.length]}>
              <ProjectCard project={p} locale={locale} dict={dict} size={i === 0 ? "large" : "default"} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
