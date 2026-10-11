import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, intro, children }: Props) {
  return (
    <Container as="header" className="pt-10 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-24">
      <p className="mb-6 text-label uppercase text-ink-muted md:mb-10">{eyebrow}</p>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
        <h1 className="col-span-4 text-h1 text-balance md:col-span-8 lg:col-span-7">{title}</h1>
        {intro ? (
          <div className="col-span-4 self-end text-ink-muted md:col-span-6 lg:col-span-4 lg:col-start-9">{intro}</div>
        ) : null}
      </div>
      {children}
    </Container>
  );
}
