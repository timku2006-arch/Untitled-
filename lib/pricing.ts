import { CLUB, SHIPPING } from "@/data/site";

/** Цена для подписчика: скидка клуба, округление до рубля. */
export function memberPrice(price: number): number {
  return Math.round(price * (1 - CLUB.discount));
}

export function shippingCost(subtotal: number, isMember: boolean): number {
  if (isMember || subtotal === 0) return 0;
  return subtotal >= SHIPPING.freeFrom ? 0 : SHIPPING.cost;
}

/** Детерминированное форматирование: одинаково на сервере и в браузере. */
export function formatRub(value: number): string {
  const digits = String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${digits} ₽`;
}
