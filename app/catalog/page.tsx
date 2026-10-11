import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/CatalogView";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PRODUCTS } from "@/data/products";

export const metadata: Metadata = {
  title: "Каталог",
  description: "Вся одежда Untitled. У каждой вещи две цены: обычная и для подписчиков клуба, на 50% ниже.",
  alternates: { canonical: "/catalog" },
};

export default function CatalogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Каталог"
        title="Вся одежда"
        intro={<p>У каждой вещи две цены. Вторая — для подписчиков клуба, ровно вдвое ниже.</p>}
      />
      <Container className="pb-8">
        {/* Фильтры читают URL на клиенте, а сервер отдаёт полную сетку — она попадает в HTML. */}
        <Suspense
          fallback={
            <ul className="grid grid-cols-2 gap-x-4 gap-y-12 border-t border-line pt-6 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-y-16">
              {PRODUCTS.map((product) => (
                <li key={product.slug}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          }
        >
          <CatalogView />
        </Suspense>
      </Container>
    </>
  );
}
