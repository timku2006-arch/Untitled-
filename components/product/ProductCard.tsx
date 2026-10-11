import Link from "next/link";
import { Placeholder } from "@/components/ui/Placeholder";
import { Price } from "@/components/ui/Price";
import type { Product } from "@/data/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Placeholder
          shape={product.shape}
          tone={product.tone}
          alt={`${product.name}, цвет ${product.color.toLowerCase()}`}
          className="absolute inset-0 transition-transform duration-[400ms] ease-[var(--ease-soft)] group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        <Placeholder
          shape={product.shape}
          tone={product.tone === 1 ? 2 : 1}
          detail
          alt=""
          className="absolute inset-0 opacity-0 transition-opacity duration-[400ms] ease-[var(--ease-soft)] group-hover:opacity-100 motion-reduce:transition-none"
        />
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <h3 className="text-body">
          <Link href={`/product/${product.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <p className="text-small text-ink-muted">{product.color}</p>
        <Price price={product.price} className="mt-2" />
      </div>
    </article>
  );
}
