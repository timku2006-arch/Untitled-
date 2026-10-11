"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/cart";

export function AddToCart({ product }: { product: Product }) {
  const id = useId();
  const single = product.sizes.length === 1;
  const [size, setSize] = useState<string | null>(single ? product.sizes[0] : null);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  function onAdd() {
    if (!size) {
      setError(true);
      document.getElementById(`${id}-${product.sizes[0]}`)?.focus();
      return;
    }
    add(product.slug, size);
    setAdded(true);
  }

  return (
    <div className="flex flex-col gap-6">
      <fieldset aria-describedby={error ? `${id}-error` : undefined}>
        <legend className="mb-3 flex w-full justify-between text-small">
          <span>Размер</span>
          {!single ? <span className="text-ink-muted">Сетка — ниже, в разделе «Размеры»</span> : null}
        </legend>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <label
              key={s}
              className="relative flex h-11 min-w-14 cursor-pointer items-center justify-center border border-line px-3 text-small transition-colors hover:border-ink has-checked:border-ink has-checked:bg-ink has-checked:text-bg has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-accent"
            >
              <input
                id={`${id}-${s}`}
                type="radio"
                name={`${id}-size`}
                value={s}
                checked={size === s}
                onChange={() => {
                  setSize(s);
                  setError(false);
                  setAdded(false);
                }}
                className="sr-only"
              />
              {s}
            </label>
          ))}
        </div>
        {error ? (
          <p id={`${id}-error`} role="alert" className="mt-3 text-small text-danger">
            Выберите размер
          </p>
        ) : null}
      </fieldset>

      <Button onClick={onAdd} className="w-full">
        Добавить в корзину
      </Button>

      <p role="status" className="min-h-5 text-small">
        {added ? (
          <>
            Добавлено в корзину.{" "}
            <Link href="/cart" className="underline underline-offset-4 hover:text-accent">
              Перейти к оформлению
            </Link>
          </>
        ) : null}
      </p>
    </div>
  );
}
