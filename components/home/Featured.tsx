import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Product } from "@/data/products";

export function Featured({ products }: { products: Product[] }) {
  return (
    <section aria-labelledby="featured-title" className="py-24 lg:py-40">
      <Container>
        <SectionHeader
          id="featured-title"
          eyebrow="Подборка"
          title="Вещи, которые носят дольше одного сезона"
          aside={
            <Link href="/catalog" className="text-small underline decoration-line underline-offset-4 hover:decoration-ink">
              Весь каталог
            </Link>
          }
        />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
          {products.map((product, i) => (
            <li key={product.slug}>
              <Reveal delay={(i % 4) * 80}>
                <ProductCard product={product} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
