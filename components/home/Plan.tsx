"use client";

import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CLUB } from "@/data/site";
import { formatDay } from "@/lib/date";
import { useMembership } from "@/lib/membership";
import { formatRub } from "@/lib/pricing";

const INCLUDED = [
  "Скидка 50% на всю одежду и аксессуары",
  "Бесплатная доставка при любой сумме заказа",
  `Доступ к дропам за ${CLUB.earlyAccessHours} часов до остальных`,
  "Дропы, которые продаются только в клубе",
];

export function Plan() {
  const { isMember, membership } = useMembership();
  // Подписка окупается, когда скидка равна её цене.
  const breakEven = Math.round(CLUB.price / CLUB.discount);

  return (
    <section aria-labelledby="plan-title" className="pb-24 lg:pb-40">
      <Container>
        <SectionHeader id="plan-title" eyebrow="Тариф" title="Одна подписка, без уровней и мелкого шрифта" />

        <div className="grid grid-cols-4 gap-x-4 border border-ink md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
          <div className="col-span-4 flex flex-col justify-between gap-10 p-6 md:col-span-4 md:p-10 lg:col-span-5">
            <div>
              <p className="text-label uppercase text-ink-muted">Клуб Untitled</p>
              <p className="mt-6 flex items-baseline gap-3">
                <span className="text-h1 tabular-nums">{formatRub(CLUB.price)}</span>
                <span className="text-ink-muted">в месяц</span>
              </p>
              <p className="mt-4 max-w-xs text-small text-ink-muted">
                Окупается с первого заказа от {formatRub(breakEven)}. Отменить можно в любой момент.
              </p>
            </div>
            {isMember ? (
              <div className="flex flex-col gap-4">
                <p className="text-small">
                  <span className="mr-2 inline-block size-1.5 translate-y-[-2px] rounded-full bg-accent" aria-hidden="true" />
                  Вы в клубе с {membership ? formatDay(membership.since) : ""}
                </p>
                <ButtonLink href="/club" variant="secondary" className="self-start">
                  Управление подпиской
                </ButtonLink>
              </div>
            ) : (
              <ButtonLink href="/club#join" className="self-start">
                Оформить подписку
              </ButtonLink>
            )}
          </div>

          <ul className="col-span-4 border-t border-ink p-6 md:col-span-4 md:border-t-0 md:border-l md:p-10 lg:col-span-7">
            {INCLUDED.map((item) => (
              <li key={item} className="flex gap-4 border-b border-line py-4 first:pt-0 last:border-b-0 last:pb-0">
                <svg viewBox="0 0 16 16" className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true">
                  <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
