import type { Dictionary } from "@/i18n/dictionaries";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

export function About({ dict }: { dict: Dictionary }) {
  const a = dict.about;
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
          <div>
            <Eyebrow index="01">{a.label}</Eyebrow>
            <Reveal>
              <h2 id="about-title" className="mt-5 text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-[3.6rem]">
                {a.title}
              </h2>
            </Reveal>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-fg-muted">
              {a.paragraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className={i === 0 ? "text-xl text-fg sm:text-2xl sm:leading-snug" : undefined}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1} className="lg:pt-16">
            <div className="overflow-hidden rounded-2xl border border-line bg-surface/70">
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="font-mono text-xs text-fg-subtle">{a.sheet.title}</span>
                <span aria-hidden className="flex gap-1.5">
                  <span className="size-2 rounded-full bg-line-strong" />
                  <span className="size-2 rounded-full bg-line-strong" />
                </span>
              </div>
              <dl className="divide-y divide-line font-mono text-[0.82rem]">
                {a.sheet.rows.map(([key, value]) => (
                  <div key={key} className="grid grid-cols-[7.5rem_1fr] gap-3 px-5 py-3.5">
                    <dt className="text-accent-text">&quot;{key}&quot;</dt>
                    <dd className="text-fg">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>

        <div className="mt-20">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-fg-subtle">{a.principlesTitle}</h3>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {a.principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 0.06} className="bg-bg p-6 lg:p-7">
                <span className="font-mono text-xs text-accent-text">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-4 font-display text-lg font-semibold tracking-tight">{p.title}</p>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-muted">{p.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
