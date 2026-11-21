import { Mail } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/content/site";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { ContactForm } from "@/components/contact/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";

export function Contact({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.contact;
  const links = [
    { href: site.links.github, label: "GitHub", handle: site.links.github.replace("https://", ""), Icon: GithubIcon },
    ...(site.links.linkedin ? [{ href: site.links.linkedin, label: "LinkedIn", handle: "LinkedIn", Icon: LinkedinIcon }] : []),
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden py-24 md:py-32">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_60%,#000_30%,transparent_100%)]" />
      <div aria-hidden className="glow bottom-[-10rem] left-1/2 -z-10 h-[26rem] w-[50rem] -translate-x-1/2 bg-[radial-gradient(closest-side,var(--accent),transparent)] opacity-25" />

      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow index="06">{c.label}</Eyebrow>
            <h2 id="contact-title" className="mt-5 text-[2.6rem] font-semibold leading-[1] sm:text-6xl lg:text-[4.2rem]">
              <span className="text-gradient">{c.title}</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-fg-muted">{c.intro}</p>
            <p className="mt-6 max-w-lg rounded-2xl border border-line bg-surface/50 p-4 text-sm text-fg-muted">{c.recruiters}</p>

            <div className="mt-10">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">{c.elsewhere}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {links.map(({ href, label, handle, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 text-fg transition-colors hover:text-accent-text"
                    >
                      <span className="grid size-10 place-items-center rounded-full border border-line-strong">
                        <Icon className="size-4" />
                      </span>
                      <span className="font-mono text-sm">{handle}</span>
                      <span className="sr-only">{dict.a11y.external}</span>
                    </a>
                  </li>
                ))}
                {site.email && (
                  <li>
                    <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 text-fg transition-colors hover:text-accent-text">
                      <span className="grid size-10 place-items-center rounded-full border border-line-strong">
                        <Mail aria-hidden className="size-4" />
                      </span>
                      <span className="font-mono text-sm">{site.email}</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-line-strong bg-surface/70 p-6 shadow-[0_40px_120px_-50px_rgb(0_0_0/0.6)] backdrop-blur-xl sm:p-9">
            <ContactForm locale={locale} dict={c.form} email={site.email} />
          </div>
        </div>
      </Container>
    </section>
  );
}
