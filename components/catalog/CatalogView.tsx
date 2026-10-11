"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { CATEGORIES, PRODUCTS, SIZES, type Category } from "@/data/products";
import { plural } from "@/lib/format";

const isCategory = (v: string | null): v is Category => CATEGORIES.some((c) => c.id === v);

export function CatalogView() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const rawCategory = params.get("category");
  const category = isCategory(rawCategory) ? rawCategory : null;
  const rawSize = params.get("size");
  const size = rawSize && SIZES.includes(rawSize) ? rawSize : null;

  const products = PRODUCTS.filter(
    (p) => (!category || p.category === category) && (!size || p.sizes.includes(size)),
  );

  function update(key: "category" | "size", value: string | null) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <>
      <div className="flex flex-col gap-6 border-t border-line pt-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-6">
          <FilterGroup
            label="Категория"
            options={[{ value: null, label: "Все" }, ...CATEGORIES.map((c) => ({ value: c.id, label: c.label }))]}
            selected={category}
            onSelect={(v) => update("category", v)}
          />
          <FilterGroup
            label="Размер"
            options={[{ value: null, label: "Все" }, ...SIZES.map((s) => ({ value: s, label: s }))]}
            selected={size}
            onSelect={(v) => update("size", v)}
          />
        </div>
        <div className="flex items-center gap-6 lg:pt-1">
          <p className="text-small text-ink-muted" aria-live="polite">
            {products.length} {plural(products.length, ["вещь", "вещи", "вещей"])}
          </p>
          {category || size ? (
            <button
              type="button"
              onClick={() => router.replace(pathname, { scroll: false })}
              className="text-small underline decoration-line underline-offset-4 hover:decoration-ink"
            >
              Сбросить
            </button>
          ) : null}
        </div>
      </div>

      {products.length > 0 ? (
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-16 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-y-16">
          {products.map((product) => (
            <li key={product.slug}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-16 max-w-md">
          <p className="text-h3">Ничего не нашлось</p>
          <p className="mt-3 text-ink-muted">В этой категории нет вещей такого размера. Попробуйте другой размер.</p>
        </div>
      )}
    </>
  );
}

type Option = { value: string | null; label: string };

function FilterGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: Option[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-6">
      <p className="w-24 shrink-0 text-label uppercase text-ink-muted" aria-hidden="true">
        {label}
      </p>
      <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
        {options.map((option) => {
          const active = option.value === selected;
          return (
            <li key={option.label} className="shrink-0">
              <button
                type="button"
                aria-pressed={active}
                onClick={() => onSelect(option.value)}
                className={`h-9 border px-3.5 text-small transition-colors ${
                  active ? "border-ink bg-ink text-bg" : "border-line hover:border-ink"
                }`}
              >
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
