"use client";

import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { useRef, useState, type FormEvent } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { projectTypes, validateContact, type ContactField, type ContactPayload } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/components/ui/primitives";

type Status = { kind: "idle" | "sending" | "success" } | { kind: "error"; message: string; fallback: boolean };

export function ContactForm({ locale, dict, email }: { locale: Locale; dict: Dictionary["contact"]["form"]; email: string | null }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<ContactField[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload: ContactPayload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      type: String(data.get("type") ?? "") as ContactPayload["type"],
      message: String(data.get("message") ?? ""),
      hp_check: String(data.get("hp_check") ?? ""),
      locale,
    };

    const invalid = validateContact(payload);
    setErrors(invalid);
    if (invalid.length) {
      formRef.current?.querySelector<HTMLElement>(`[name="${invalid[0]}"]`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: ContactField[] };
      if (res.ok && json.ok) {
        setStatus({ kind: "success" });
        formRef.current?.reset();
      } else if (json.error === "validation" && json.fields) {
        setErrors(json.fields);
        setStatus({ kind: "idle" });
      } else {
        const message =
          json.error === "not_configured" ? dict.errors.notConfigured : json.error === "rate_limited" ? dict.errors.rateLimited : dict.errors.generic;
        setStatus({ kind: "error", message, fallback: json.error !== "rate_limited" });
      }
    } catch {
      setStatus({ kind: "error", message: dict.errors.generic, fallback: true });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  const fieldClass = (field: ContactField) =>
    cn(
      "peer w-full rounded-2xl border bg-bg/60 px-4 py-3.5 text-fg outline-none transition-[border-color,box-shadow] placeholder:text-fg-subtle",
      "focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--accent)_18%,transparent)]",
      errors.includes(field) ? "border-danger" : "border-line-strong",
    );

  const errorText = (field: ContactField) =>
    errors.includes(field) ? (
      <p id={`${field}-error`} className="mt-2 text-sm text-danger">
        {dict.errors[field]}
      </p>
    ) : null;

  const label = (field: ContactField, text: string) => (
    <label htmlFor={field} className="mb-2 flex items-baseline justify-between text-sm font-medium">
      {text}
      <span className="font-mono text-[0.68rem] font-normal text-fg-subtle">{dict.required}</span>
    </label>
  );

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          {label("name", dict.name)}
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            className={fieldClass("name")}
            aria-invalid={errors.includes("name")}
            aria-describedby={errors.includes("name") ? "name-error" : undefined}
          />
          {errorText("name")}
        </div>
        <div>
          {label("email", dict.email)}
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={200}
            className={fieldClass("email")}
            aria-invalid={errors.includes("email")}
            aria-describedby={errors.includes("email") ? "email-error" : undefined}
          />
          {errorText("email")}
        </div>
      </div>

      <div>
        {label("type", dict.type)}
        <select
          id="type"
          name="type"
          required
          defaultValue=""
          className={cn(fieldClass("type"), "appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23858c97' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
          }}
          aria-invalid={errors.includes("type")}
          aria-describedby={errors.includes("type") ? "type-error" : undefined}
        >
          <option value="" disabled>
            {dict.typePlaceholder}
          </option>
          {projectTypes.map((t) => (
            <option key={t} value={t}>
              {dict.types[t]}
            </option>
          ))}
        </select>
        {errorText("type")}
      </div>

      <div>
        {label("message", dict.message)}
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder={dict.messagePlaceholder}
          className={cn(fieldClass("message"), "resize-y")}
          aria-invalid={errors.includes("message")}
          aria-describedby={errors.includes("message") ? "message-error" : undefined}
        />
        {errorText("message")}
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="hp_check">Leave this field empty</label>
        <input id="hp_check" name="hp_check" type="text" tabIndex={-1} autoComplete="new-password" />
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg-subtle">{dict.privacy}</p>
        <button type="submit" disabled={status.kind === "sending"} className={buttonClass("primary", "shrink-0 disabled:opacity-70")}>
          {status.kind === "sending" ? (
            <>
              <Loader2 aria-hidden className="size-4 animate-spin" /> {dict.sending}
            </>
          ) : (
            <>
              {dict.submit} <Send aria-hidden className="size-4" />
            </>
          )}
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        {status.kind === "success" && (
          <p className="flex items-start gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm">
            <CheckCircle2 aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-500" />
            {dict.success}
          </p>
        )}
        {status.kind === "error" && (
          <div className="flex items-start gap-3 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-sm">
            <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-danger" />
            <div>
              <p>{status.message}</p>
              {status.fallback && email && (
                <p className="mt-1">
                  {dict.errors.fallback}{" "}
                  <a href={`mailto:${email}`} className="font-medium underline underline-offset-4">
                    {email}
                  </a>
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
