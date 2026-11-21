import { locale as rootLocale } from "next/root-params";
import { defaultLocale, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ButtonLink, Container } from "@/components/ui/primitives";

export default async function NotFound() {
  const value = await rootLocale();
  const locale = hasLocale(value) ? value : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <section className="relative isolate flex min-h-[80dvh] items-center overflow-hidden pt-24">
      <div aria-hidden className="bg-grid mask-fade-b absolute inset-0 -z-10" />
      <Container>
        <p className="font-mono text-sm text-accent-text">HTTP 404 · route not found</p>
        <p aria-hidden className="mt-4 font-display text-[7rem] font-semibold leading-none tracking-[-0.06em] text-line-strong sm:text-[12rem]">
          404
        </p>
        <h1 className="mt-2 text-4xl font-semibold sm:text-6xl">{dict.notFound.title}</h1>
        <p className="mt-5 max-w-xl text-lg text-fg-muted">{dict.notFound.text}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/${locale}`}>{dict.notFound.home}</ButtonLink>
          <ButtonLink href={`/${locale}/work`} variant="ghost">
            {dict.notFound.work}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
