import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  aside?: ReactNode;
};

export function SectionHeader({ eyebrow, title, id, aside }: Props) {
  return (
    <div className="mb-10 grid grid-cols-4 gap-x-4 gap-y-4 border-t border-line pt-6 md:mb-16 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
      <p className="col-span-4 text-label uppercase text-ink-muted md:col-span-2 lg:col-span-3">{eyebrow}</p>
      <h2 id={id} className="col-span-4 text-h2 text-balance md:col-span-6 lg:col-span-7">
        {title}
      </h2>
      {aside ? <div className="col-span-4 self-end md:col-span-8 lg:col-span-2 lg:justify-self-end">{aside}</div> : null}
    </div>
  );
}
