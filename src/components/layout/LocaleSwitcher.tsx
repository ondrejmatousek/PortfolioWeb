"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

/** CS / EN segmented switch that keeps the visitor on the equivalent page. */
export function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.replace(/^\/(cs|en)(?=\/|$)/, "");

  return (
    <div role="group" aria-label={label} className="flex items-center rounded-full border border-line p-0.5 font-mono text-xs">
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={`/${l}${rest}`}
            hrefLang={localeNames[l].htmlLang}
            lang={localeNames[l].htmlLang}
            aria-current={active ? "true" : undefined}
            aria-label={localeNames[l].long}
            className={cn(
              "inline-flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 transition-colors",
              active ? "bg-fg text-bg" : "text-fg-muted hover:text-fg",
            )}
          >
            {localeNames[l].short}
          </Link>
        );
      })}
    </div>
  );
}
