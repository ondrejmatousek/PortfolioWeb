import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ButtonLink, Container } from "@/components/ui/primitives";
import { HeroVisual } from "./HeroVisual";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.hero;
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden pb-20 pt-32 md:pt-40 lg:pb-28">
      <div aria-hidden className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <div aria-hidden className="glow left-1/2 top-[-12rem] -z-10 h-[28rem] w-[46rem] -translate-x-1/2 bg-[radial-gradient(closest-side,var(--accent),transparent)] opacity-30" />

      <Container className="grid grid-cols-[minmax(0,1fr)] items-center gap-16 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <p
            className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-1.5 pl-2 pr-4 font-mono text-xs text-fg-muted backdrop-blur"
          >
            <span className="relative inline-flex size-2">
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            {h.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="animate-rise-soft mt-7 text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[4.1rem] xl:text-[4.9rem]"
            style={{ animationDelay: "80ms" }}
          >
            {h.titleA}
            <span className="font-serif text-[1.08em] font-normal italic tracking-[-0.02em] text-accent-text">{h.titleAccent}</span>
            {h.titleB}
          </h1>

          <p className="animate-rise-soft mt-7 max-w-xl text-lg leading-relaxed text-fg-muted sm:text-xl" style={{ animationDelay: "160ms" }}>
            {h.subtitle}
          </p>

          <div className="animate-rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
            <ButtonLink href={`/${locale}#work`}>{h.ctaPrimary}</ButtonLink>
            <ButtonLink href={`/${locale}#contact`} variant="ghost">
              {h.ctaSecondary}
            </ButtonLink>
          </div>

          <dl className="animate-rise mt-14 grid max-w-xl grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line" style={{ animationDelay: "320ms" }}>
            {h.facts.map((f) => (
              <div key={f.label} className="bg-bg/90 px-3 py-4 sm:px-5">
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="block whitespace-nowrap font-display text-base font-semibold tracking-tight min-[400px]:text-lg sm:text-2xl">{f.value}</span>
                  <span className="mt-1 block text-xs leading-snug text-fg-muted sm:text-sm">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <HeroVisual label={h.visualLabel} />
      </Container>
    </section>
  );
}
