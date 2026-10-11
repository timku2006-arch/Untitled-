"use client";

import { createLocalStore } from "@/lib/storage";

export type CartItem = {
  slug: string;
  size: string;
  qty: number;
};

const EMPTY: CartItem[] = [];
const store = createLocalStore<CartItem[]>("untitled:cart", EMPTY);

export function useCart() {
  const items = store.useValue();
  return {
    items,
    count: items.reduce((sum, item) => sum + item.qty, 0),
    add(slug: string, size: string, qty = 1) {
      const current = store.get();
      const existing = current.find((i) => i.slug === slug && i.size === size);
      store.set(
        existing
          ? current.map((i) => (i === existing ? { ...i, qty: i.qty + qty } : i))
          : [...current, { slug, size, qty }],
      );
    },
    setQty(slug: string, size: string, qty: number) {
      const current = store.get();
      store.set(
        qty <= 0
          ? current.filter((i) => !(i.slug === slug && i.size === size))
          : current.map((i) => (i.slug === slug && i.size === size ? { ...i, qty } : i)),
      );
    },
    remove(slug: string, size: string) {
      store.set(store.get().filter((i) => !(i.slug === slug && i.size === size)));
    },
    clear() {
      store.set(EMPTY);
    },
  };
}
