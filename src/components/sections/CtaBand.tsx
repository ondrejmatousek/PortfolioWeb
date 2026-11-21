import { ButtonLink, Container } from "@/components/ui/primitives";

/** Closing call-to-action used on detail pages. */
export function CtaBand({ title, text, href, button }: { title: string; text: string; href: string; button: string }) {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] border border-line-strong bg-surface/70 px-6 py-14 text-center sm:px-12 md:py-20">
          <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
          <div aria-hidden className="glow left-1/2 top-full -z-10 h-80 w-[40rem] -translate-x-1/2 -translate-y-1/2 bg-[var(--accent)] opacity-30" />
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-fg-muted">{text}</p>
          <div className="mt-9 flex justify-center">
            <ButtonLink href={href}>{button}</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
