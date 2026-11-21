import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin", "latin-ext"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin", "latin-ext"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "404 — Stránka nenalezena / Page not found",
  robots: { index: false },
};

/** Fallback 404 for URLs outside any locale. Bilingual, since the locale is unknown. */
export default function GlobalNotFound() {
  return (
    <html lang="cs" className={`${geist.variable} ${geistMono.variable} ${bricolage.variable}`}>
      <body className="min-h-dvh">
        <main className="relative isolate flex min-h-dvh items-center overflow-hidden px-4 sm:px-10">
          <div aria-hidden className="bg-grid mask-fade-b absolute inset-0 -z-10" />
          <div className="mx-auto w-full max-w-[1240px]">
            <p className="font-mono text-sm text-accent-text">HTTP 404</p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">Tahle stránka neexistuje.</h1>
            <p lang="en" className="mt-2 text-2xl text-fg-muted sm:text-3xl">
              This page doesn&apos;t exist.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/cs" className="inline-flex min-h-12 items-center rounded-full bg-accent px-6 font-medium text-accent-ink">
                Zpět na úvod
              </Link>
              <Link href="/en" lang="en" className="inline-flex min-h-12 items-center rounded-full border border-line-strong px-6 font-medium">
                Back to home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
