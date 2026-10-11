"use client";

import { useState } from "react";
import { Placeholder } from "@/components/ui/Placeholder";
import type { Product } from "@/data/products";

type Frame = { label: string; tone: 1 | 2 | 3 | 4; detail?: boolean };

function framesFor(product: Product): Frame[] {
  const alt = (product.tone % 4) + 1;
  return [
    { label: "Вид спереди", tone: product.tone },
    { label: "Вид сзади", tone: alt as Frame["tone"] },
    { label: "Фактура ткани", tone: product.tone, detail: true },
    { label: "Детали", tone: ((alt % 4) + 1) as Frame["tone"] },
  ];
}

export function Gallery({ product }: { product: Product }) {
  const frames = framesFor(product);
  const [active, setActive] = useState(0);
  const current = frames[active];

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {/* Мобильный: свайп-лента. Десктоп: крупный кадр и миниатюры. */}
      <ul className="-mx-4 flex snap-x snap-mandatory gap-2 overflow-x-auto px-4 md:hidden" aria-label="Фотографии">
        {frames.map((frame, i) => (
          <li key={frame.label} className="w-[85%] shrink-0 snap-center">
            <Placeholder
              shape={product.shape}
              tone={frame.tone}
              detail={frame.detail}
              label={`${i + 1} / ${frames.length}`}
              alt={`${product.name}: ${frame.label.toLowerCase()}`}
              className="aspect-[4/5]"
            />
          </li>
        ))}
      </ul>

      <div className="hidden md:block">
        <Placeholder
          shape={product.shape}
          tone={current.tone}
          detail={current.detail}
          alt={`${product.name}: ${current.label.toLowerCase()}`}
          className="aspect-[4/5]"
        />
        <ul className="mt-4 grid grid-cols-4 gap-4" aria-label="Выбор фотографии">
          {frames.map((frame, i) => (
            <li key={frame.label}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${frame.label}, фото ${i + 1} из ${frames.length}`}
                aria-current={i === active ? "true" : undefined}
                className={`block w-full border transition-colors ${i === active ? "border-ink" : "border-transparent hover:border-line"}`}
              >
                <Placeholder shape={product.shape} tone={frame.tone} detail={frame.detail} alt="" className="aspect-[4/5]" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
