"use client";

import Link from "next/link";
import { SHIPPING } from "@/data/site";
import { useMembership } from "@/lib/membership";
import { formatRub, memberPrice } from "@/lib/pricing";

/** Короткая строка под ценой: что даёт подписка именно для этой вещи. */
export function MemberNote({ price }: { price: number }) {
  const { isMember } = useMembership();
  const saving = price - memberPrice(price);

  if (isMember) {
    return (
      <p className="text-small text-ink-muted">
        Скидка клуба применена: вы экономите {formatRub(saving)}. Доставка бесплатная.
      </p>
    );
  }

  return (
    <p className="text-small text-ink-muted">
      С подпиской вы сэкономите {formatRub(saving)}, а доставка будет бесплатной. Без подписки доставка{" "}
      {formatRub(SHIPPING.cost)}, бесплатно от {formatRub(SHIPPING.freeFrom)}.{" "}
      <Link href="/club#join" className="text-ink underline underline-offset-4 hover:text-accent">
        Вступить в клуб
      </Link>
    </p>
  );
}
