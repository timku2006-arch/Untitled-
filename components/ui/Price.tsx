"use client";

import { useMembership } from "@/lib/membership";
import { formatRub, memberPrice } from "@/lib/pricing";

type Props = {
  price: number;
  size?: "sm" | "lg";
  className?: string;
};

/**
 * Обе цены видны всегда. Без подписки клубная цена подписана «в клубе»,
 * после вступления она становится ценой пользователя.
 */
export function Price({ price, size = "sm", className = "" }: Props) {
  const { isMember } = useMembership();
  const club = memberPrice(price);
  const main = size === "lg" ? "text-h3" : "text-body";

  return (
    <p className={`flex flex-wrap items-baseline gap-x-2.5 gap-y-1 ${className}`}>
      <s className={`${size === "lg" ? "text-body" : "text-small"} text-ink-muted`}>
        <span className="sr-only">Обычная цена: </span>
        {formatRub(price)}
      </s>
      <span className={`${main} font-medium tabular-nums ${isMember ? "text-ink" : "text-accent"}`}>
        <span className="sr-only">{isMember ? "Ваша цена: " : "Цена для подписчиков: "}</span>
        {formatRub(club)}
      </span>
      <span className="text-small text-ink-muted" aria-hidden="true">
        {isMember ? "ваша цена" : "в клубе"}
      </span>
    </p>
  );
}
