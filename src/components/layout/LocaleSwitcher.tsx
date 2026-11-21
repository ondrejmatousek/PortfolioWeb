"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { locales, localeNames, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

const subscribeHash = (cb: () => void) => {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
};

/** CS / EN segmented switch that keeps the visitor on the equivalent page. */
export function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.replace(/^\/(cs|en)(?=\/|$)/, "");
  // Keep the in-page section (e.g. #contact) when switching language.
  const hash = useSyncExternalStore(subscribeHash, () => window.location.hash, () => "");

  return (
    <div role="group" aria-label={label} className="flex items-center rounded-full border border-line p-0.5 font-mono text-xs">
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={`/${l}${rest}${hash}`}
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
