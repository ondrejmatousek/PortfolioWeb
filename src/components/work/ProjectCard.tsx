import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Project } from "@/content/types";
import { StatusDot } from "@/components/ui/primitives";
import { cn } from "@/lib/cn";
import { ProjectArt } from "./ProjectArt";

export function ProjectVisual({ project, locale, priority }: { project: Project; locale: Locale; priority?: boolean }) {
  if (project.image) {
    return (
      <Image
        src={project.image.src}
        alt={project.image.alt[locale]}
        width={project.image.width}
        height={project.image.height}
        priority={priority}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="h-full w-full object-cover"
      />
    );
  }
  return <ProjectArt kind={project.art} color={project.color} />;
}

export function ProjectCard({
  project,
  locale,
  dict,
  size = "default",
}: {
  project: Project;
  locale: Locale;
  dict: Dictionary;
  size?: "default" | "large";
}) {
  const stack = project.stack.slice(0, size === "large" ? 5 : 4);
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface/60 transition-[border-color,transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)]">
      <div className={cn("relative overflow-hidden border-b border-line", size === "large" ? "aspect-[16/9]" : "aspect-[16/10]")}>
        <div className="h-full w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]">
          <ProjectVisual project={project} locale={locale} />
        </div>
        {!project.image && (
          <span className="absolute bottom-3 right-3 rounded-full border border-line bg-bg/70 px-2.5 py-1 font-mono text-[0.62rem] text-fg-muted backdrop-blur">
            {dict.work.illustrative}
          </span>
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full border border-line bg-bg/75 px-3 py-1 font-mono text-[0.68rem] text-fg backdrop-blur">
          <StatusDot status={project.status} />
          {dict.work.status[project.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-fg-subtle">{project.category[locale]}</p>
        <h3 className={cn("mt-2 font-semibold", size === "large" ? "text-3xl sm:text-4xl" : "text-2xl")}>
          <Link href={`/${locale}/work/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.name}
          </Link>
        </h3>
        <p className="mt-3 leading-relaxed text-fg-muted">{project.tagline[locale]}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          {stack.length > 0 ? (
            <ul className="flex flex-wrap gap-1.5" aria-label={dict.work.case.stack}>
              {stack.map((s) => (
                <li key={s} className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.68rem] text-fg-muted">
                  {s}
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
          <span
            aria-hidden
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-accent group-hover:text-accent-ink"
          >
            <ArrowUpRight className="size-5" />
          </span>
        </div>
      </div>
      {/* keyboard focus ring for the stretched link */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl ring-accent group-has-[a:focus-visible]:ring-2" />
    </article>
  );
}
