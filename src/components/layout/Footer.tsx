import Link from "next/link";
import { ArrowUp } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { Container } from "@/components/ui/primitives";
import { Logo } from "./Logo";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

async function buildYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = await buildYear();
  const home = `/${locale}`;
  return (
    <footer className="relative border-t border-line">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo href={home} name={site.name} />
          <p className="mt-5 text-fg-muted">{dict.footer.tagline}</p>
          <div className="mt-6 flex gap-2">
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <GithubIcon className="size-4" />
              <span className="sr-only">GitHub {dict.a11y.external}</span>
            </a>
            {site.links.linkedin && (
              <a
                href={site.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <LinkedinIcon className="size-4" />
                <span className="sr-only">LinkedIn {dict.a11y.external}</span>
              </a>
            )}
          </div>
        </div>
        <nav aria-label={dict.nav.services}>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">{dict.nav.services}</p>
          <ul className="mt-4 space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`${home}/services/${s.slug}`} className="text-fg-muted transition-colors hover:text-fg">
                  {s.title[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Sitemap">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">Menu</p>
          <ul className="mt-4 space-y-2.5">
            {(["about", "work", "stack", "process", "contact"] as const).map((id) => (
              <li key={id}>
                <Link
                  href={id === "work" ? `${home}/work` : `${home}#${id}`}
                  className="text-fg-muted transition-colors hover:text-fg"
                >
                  {dict.nav[id]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container className="flex flex-col gap-4 border-t border-line py-6 text-sm text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. {dict.footer.rights} <span className="hidden md:inline">· {dict.footer.built}</span>
        </p>
        <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-fg">
          {dict.footer.backToTop} <ArrowUp aria-hidden className="size-4" />
        </a>
      </Container>
    </footer>
  );
}
