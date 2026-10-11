import type { ReactNode } from "react";

export function Badge({ children, tone = "accent" }: { children: ReactNode; tone?: "accent" | "neutral" }) {
  const styles = tone === "accent" ? "bg-accent-soft text-accent" : "border border-line text-ink-muted";
  return (
    <span className={`inline-flex h-7 items-center px-2.5 text-label uppercase ${styles}`}>{children}</span>
  );
}
