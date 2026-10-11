import Link from "next/link";
import type { ComponentProps, ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 text-small font-medium tracking-wide whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "h-12 px-6 bg-ink text-bg hover:bg-ink/85",
  secondary: "h-12 px-6 border border-ink text-ink hover:bg-ink hover:text-bg",
  ghost: "min-h-11 text-ink underline decoration-line underline-offset-4 hover:decoration-ink",
};

export function buttonClass(variant: Variant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...rest
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button type={type} className={buttonClass(variant, className)} {...rest} />;
}

export function ButtonLink({
  variant = "primary",
  className,
  ...rest
}: ComponentPropsWithoutRef<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...rest} />;
}
