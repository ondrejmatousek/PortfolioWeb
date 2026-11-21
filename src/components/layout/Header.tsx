"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

export function Header({ locale, dict, name }: { locale: Locale; dict: Pick<Dictionary, "nav" | "a11y">; name: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const home = `/${locale}`;

  const items = [
    { id: "about", label: dict.nav.about },
    { id: "services", label: dict.nav.services },
    { id: "work", label: dict.nav.work },
    { id: "stack", label: dict.nav.stack },
    { id: "process", label: dict.nav.process },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation (state adjusted during render, per React docs).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Close on Escape and lock page scroll while the menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open ? "border-b border-line bg-bg/75 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6 md:h-20 lg:px-10">
        <Logo href={home} name={name} />

        <nav aria-label={dict.a11y.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`${home}#${item.id}`}
                  className="whitespace-nowrap rounded-full px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-surface hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <LocaleSwitcher locale={locale} label={dict.a11y.switchLanguage} />
          </div>
          <ThemeToggle labels={{ toLight: dict.a11y.themeToLight, toDark: dict.a11y.themeToDark }} />
          <Link
            href={`${home}#contact`}
            className="hidden h-10 items-center whitespace-nowrap rounded-full bg-fg px-4 text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 md:inline-flex lg:hidden xl:inline-flex"
          >
            {dict.nav.cta}
          </Link>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.a11y.menuClose : dict.a11y.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg px-4 pb-10 pt-6 sm:px-6 lg:hidden"
      >
        <nav aria-label={dict.a11y.mainNav}>
          <ul className="flex flex-col">
            {[...items, { id: "contact", label: dict.nav.contact }].map((item, i) => (
              <li key={item.id} className="border-b border-line">
                <Link
                  href={`${home}#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-4 font-display text-3xl font-semibold tracking-tight"
                >
                  <span className="font-mono text-xs text-accent-text">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 sm:hidden">
          <LocaleSwitcher locale={locale} label={dict.a11y.switchLanguage} />
        </div>
      </div>
    </header>
  );
}
