/** Shared contact-form contract used by both the form and the API route. */
export const projectTypes = ["software", "web", "ai", "mvp", "job", "other"] as const;
export type ProjectType = (typeof projectTypes)[number];

export interface ContactPayload {
  name: string;
  email: string;
  type: ProjectType | "";
  message: string;
  /** Honeypot — must stay empty. */
  hp_check?: string;
  locale?: string;
}

export type ContactField = "name" | "email" | "type" | "message";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Accepts untrusted input of any shape; non-string fields count as invalid. */
export function validateContact(p: Partial<Record<keyof ContactPayload, unknown>>): ContactField[] {
  const errors: ContactField[] = [];
  const name = str(p.name);
  const email = str(p.email);
  const message = str(p.message);
  if (name.length < 2 || name.length > 120) errors.push("name");
  if (!EMAIL_RE.test(email) || email.length > 200) errors.push("email");
  if (!projectTypes.includes(p.type as ProjectType)) errors.push("type");
  if (message.length < 10 || message.length > 5000) errors.push("message");
  return errors;
}
