/** Shared contact-form contract used by both the form and the API route. */
export const projectTypes = ["software", "web", "ai", "mvp", "job", "other"] as const;
export type ProjectType = (typeof projectTypes)[number];

export interface ContactPayload {
  name: string;
  email: string;
  type: ProjectType | "";
  message: string;
  /** Honeypot — must stay empty. */
  company?: string;
  locale?: string;
}

export type ContactField = "name" | "email" | "type" | "message";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(p: Partial<ContactPayload>): ContactField[] {
  const errors: ContactField[] = [];
  const name = (p.name ?? "").trim();
  const email = (p.email ?? "").trim();
  const message = (p.message ?? "").trim();
  if (name.length < 2 || name.length > 120) errors.push("name");
  if (!EMAIL_RE.test(email) || email.length > 200) errors.push("email");
  if (!projectTypes.includes(p.type as ProjectType)) errors.push("type");
  if (message.length < 10 || message.length > 5000) errors.push("message");
  return errors;
}
