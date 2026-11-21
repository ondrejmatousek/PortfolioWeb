import { LayoutTemplate, Rocket, ServerCog, Sparkles } from "lucide-react";
import type { Service } from "@/content/types";

const icons = { server: ServerCog, layout: LayoutTemplate, sparkles: Sparkles, rocket: Rocket } as const;

export function ServiceIcon({ icon, className }: { icon: Service["icon"]; className?: string }) {
  const Icon = icons[icon];
  return <Icon aria-hidden className={className} strokeWidth={1.6} />;
}

export const hueVar = (hue: Service["hue"]) => `var(--hue-${hue})`;
