"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { getProduct } from "@/data/products";
import { CLUB, SHIPPING } from "@/data/site";
import { useCart } from "@/lib/cart";
import { plural } from "@/lib/format";
import { useMembership } from "@/lib/membership";
import { formatRub, memberPrice, shippingCost } from "@/lib/pricing";
import { useHydrated } from "@/lib/storage";

export function CartView() {
  const hydrated = useHydrated();
  const { items, count, setQty, remove, clear } = useCart();
  const { isMember } = useMembership();
  const [ordered, setOrdered] = useState(false);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ordered) doneRef.current?.focus();
  }, [ordered]);

  if (!hydrated) return <div className="min-h-96" aria-hidden="true" />;

  if (ordered) {
    return (
      <div role="status" className="max-w-lg border-t border-line pt-8">
        <h2 ref={doneRef} tabIndex={-1} className="text-h2 focus:outline-none">
          Заказ оформлен
        </h2>
        <p className="mt-4 text-ink-muted">Это демо: оплата и доставка не подключены. Корзина очищена.</p>
        <ButtonLink href="/catalog" className="mt-8">
          Вернуться в каталог
        </ButtonLink>
      </div>
    );
  }

  const lines = items.flatMap((item) => {
    const product = getProduct(item.slug);
    return product ? [{ ...item, product }] : [];
  });

  if (lines.length === 0) {
    return (
      <div className="max-w-lg border-t border-line pt-8">
        <p className="text-h3">В корзине пока пусто</p>
        <p className="mt-3 text-ink-muted">Начните с каталога или посмотрите, что выйдет в ближайшем дропе.</p>
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
          <ButtonLink href="/catalog">В каталог</ButtonLink>
          <ButtonLink href="/drops" variant="ghost">
            Дропы
          </ButtonLink>
        </div>
      </div>
    );
  }

  const full = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const clubTotal = lines.reduce((sum, l) => sum + memberPrice(l.product.price) * l.qty, 0);
  const subtotal = isMember ? clubTotal : full;
  const shipping = shippingCost(subtotal, isMember);
  const total = subtotal + shipping;
  const ifMember = clubTotal;
  const potentialSaving = total - ifMember;

  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-12 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
      <section aria-labelledby="items-title" className="col-span-4 md:col-span-8 lg:col-span-7">
        <h2 id="items-title" className="sr-only">
          Товары
        </h2>
        <ul className="border-t border-ink">
          {lines.map((line) => {
            const unit = isMember ? memberPrice(line.product.price) : line.product.price;
            const label = `${line.product.name}, размер ${line.size}`;
            return (
              <li key={`${line.slug}-${line.size}`} className="flex gap-4 border-b border-line py-6 md:gap-6">
                <Link href={`/product/${line.slug}`} className="w-24 shrink-0 md:w-32" tabIndex={-1} aria-hidden="true">
                  <Placeholder shape={line.product.shape} tone={line.product.tone} alt="" className="aspect-[4/5]" />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-6">
                    <div>
                      <h3 className="text-body">
                        <Link href={`/product/${line.slug}`} className="hover:text-accent">
                          {line.product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-small text-ink-muted">
                        {line.product.color} · {line.size}
                      </p>
                    </div>
                    <p className="flex items-baseline gap-2 tabular-nums sm:flex-col sm:items-end sm:gap-0.5">
                      {isMember ? (
                        <s className="text-small text-ink-muted">
                          <span className="sr-only">Без скидки: </span>
                          {formatRub(line.product.price * line.qty)}
                        </s>
                      ) : null}
                      <span>{formatRub(unit * line.qty)}</span>
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-line" role="group" aria-label={`Количество: ${label}`}>
                      <button
                        type="button"
                        className="size-10 text-ink-muted hover:text-ink disabled:opacity-40"
                        onClick={() => setQty(line.slug, line.size, line.qty - 1)}
                        aria-label="Уменьшить количество"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-small tabular-nums" aria-live="polite">
                        {line.qty}
                      </span>
                      <button
                        type="button"
                        className="size-10 text-ink-muted hover:text-ink disabled:opacity-40"
                        onClick={() => setQty(line.slug, line.size, line.qty + 1)}
                        disabled={line.qty >= 9}
                        aria-label="Увеличить количество"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(line.slug, line.size)}
                      className="text-small text-ink-muted underline decoration-line underline-offset-4 hover:text-ink"
                    >
                      Удалить<span className="sr-only">: {label}</span>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="summary-title" className="col-span-4 md:col-span-8 lg:col-span-4 lg:col-start-9">
        <div className="lg:sticky lg:top-24">
          <h2 id="summary-title" className="border-t border-ink pt-6 text-h3">
            Итого
          </h2>
          <dl className="mt-6 space-y-3 text-small tabular-nums">
            <div className="flex justify-between gap-6">
              <dt className="text-ink-muted">
                {count} {plural(count, ["вещь", "вещи", "вещей"])}
              </dt>
              <dd>{formatRub(full)}</dd>
            </div>
            {isMember ? (
              <div className="flex justify-between gap-6 text-accent">
                <dt>Скидка клуба 50%</dt>
                <dd>−{formatRub(full - clubTotal)}</dd>
              </div>
            ) : null}
            <div className="flex justify-between gap-6">
              <dt className="text-ink-muted">Доставка</dt>
              <dd>{shipping === 0 ? "Бесплатно" : formatRub(shipping)}</dd>
            </div>
            <div className="flex justify-between gap-6 border-t border-line pt-4 text-body font-medium">
              <dt>К оплате</dt>
              <dd>{formatRub(total)}</dd>
            </div>
          </dl>

          {!isMember && shipping > 0 ? (
            <p className="mt-3 text-small text-ink-muted">
              До бесплатной доставки — {formatRub(SHIPPING.freeFrom - subtotal)}.
            </p>
          ) : null}

          <Button
            className="mt-8 w-full"
            onClick={() => {
              clear();
              setOrdered(true);
            }}
          >
            Оформить заказ
          </Button>

          {!isMember ? (
            <div className="mt-8 bg-surface p-6">
              <p className="text-body font-medium">В клубе этот заказ стоил бы {formatRub(ifMember)}</p>
              <p className="mt-2 text-small text-ink-muted">
                Экономия {formatRub(potentialSaving)} при подписке за {formatRub(CLUB.price)} в месяц. Доставка
                бесплатная.
              </p>
              <Link
                href="/club#join"
                className="mt-4 inline-block text-small underline underline-offset-4 hover:text-accent"
              >
                Вступить в клуб
              </Link>
            </div>
          ) : (
            <p className="mt-6 text-small text-ink-muted">
              Вы в клубе: скидка 50% применена, доставка бесплатная.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
