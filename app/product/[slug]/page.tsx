import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/product/AddToCart";
import { Gallery } from "@/components/product/Gallery";
import { MemberNote } from "@/components/product/MemberNote";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { Price } from "@/components/ui/Price";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PRODUCTS, categoryLabel, getProduct } from "@/data/products";
import { SITE } from "@/data/site";
import { memberPrice } from "@/lib/pricing";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.description} ${product.color}. ${product.composition}.`,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: { title: `${product.name} — Untitled`, description: product.description },
  };
}

const SIZE_CHART = [
  { size: "XS", chest: "84–88", waist: "68–72", height: "160–168" },
  { size: "S", chest: "88–92", waist: "72–76", height: "165–172" },
  { size: "M", chest: "92–98", waist: "76–82", height: "170–178" },
  { size: "L", chest: "98–104", waist: "82–88", height: "175–184" },
  { size: "XL", chest: "104–110", waist: "88–94", height: "180–190" },
];

export default async function ProductPage({ params }: Params) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const related = PRODUCTS.filter((p) => p.slug !== product.slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    color: product.color,
    material: product.composition,
    brand: { "@type": "Brand", name: SITE.name },
    offers: [
      { price: product.price, name: "Обычная цена" },
      { price: memberPrice(product.price), name: "Цена для подписчиков" },
    ].map((offer) => ({
      "@type": "Offer",
      priceCurrency: "RUB",
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/product/${product.slug}`,
      ...offer,
    })),
  };

  const hasLetterSizes = product.sizes.some((s) => s !== "One size");

  return (
    <>
      <Container className="pt-6 md:pt-10">
        <nav aria-label="Навигационная цепочка" className="mb-6 text-small text-ink-muted md:mb-10">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link href="/catalog" className="hover:text-ink">
                Каталог
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/catalog?category=${product.category}`} className="hover:text-ink">
                {categoryLabel(product.category)}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
          <div className="col-span-4 md:col-span-4 lg:col-span-7">
            <Gallery product={product} />
          </div>

          <div className="col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-9">
            <div className="md:sticky md:top-24">
              <p className="text-label uppercase text-ink-muted">{categoryLabel(product.category)}</p>
              <h1 className="mt-4 text-h2">{product.name}</h1>
              <p className="mt-2 text-small text-ink-muted">{product.color}</p>

              <Price price={product.price} size="lg" className="mt-8" />
              <div className="mt-3">
                <MemberNote price={product.price} />
              </div>

              <div className="mt-10">
                <AddToCart product={product} />
              </div>

              <div className="mt-6 border-t border-line">
                <Section title="Описание" open>
                  <p>{product.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {product.details.map((d) => (
                      <li key={d} className="flex gap-3">
                        <span aria-hidden="true">—</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </Section>
                <Section title="Состав и уход">
                  <p>{product.composition}.</p>
                  <p className="mt-3">Деликатная стирка при 30°, сушить в расправленном виде, не отбеливать.</p>
                </Section>
                <Section title="Размеры">
                  {hasLetterSizes ? (
                    <table className="w-full text-left text-small tabular-nums">
                      <caption className="sr-only">Таблица размеров, сантиметры</caption>
                      <thead className="text-ink-muted">
                        <tr className="border-b border-line">
                          <th scope="col" className="py-2 font-normal">Размер</th>
                          <th scope="col" className="py-2 font-normal">Грудь</th>
                          <th scope="col" className="py-2 font-normal">Талия</th>
                          <th scope="col" className="py-2 font-normal">Рост</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SIZE_CHART.filter((r) => product.sizes.includes(r.size)).map((r) => (
                          <tr key={r.size} className="border-b border-line last:border-b-0">
                            <th scope="row" className="py-2 font-medium text-ink">{r.size}</th>
                            <td className="py-2">{r.chest}</td>
                            <td className="py-2">{r.waist}</td>
                            <td className="py-2">{r.height}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>Один размер. Подробные размеры указаны в описании.</p>
                  )}
                </Section>
                <Section title="Доставка и возврат">
                  <p>
                    Подписчикам доставка бесплатна при любой сумме. Без подписки — 490 ₽, бесплатно от 15 000 ₽.
                    Вернуть вещь можно в течение 14 дней.
                  </p>
                </Section>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <section aria-labelledby="related-title" className="pt-24 lg:pt-40">
        <Container>
          <SectionHeader id="related-title" eyebrow="Ещё" title="С этим носят" />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

function Section({ title, open, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  return (
    <details open={open} className="group border-b border-line">
      <summary className="flex cursor-pointer items-center justify-between py-4 text-small font-medium">
        {title}
        <span
          aria-hidden="true"
          className="relative size-3 before:absolute before:top-1/2 before:left-0 before:h-px before:w-3 before:bg-ink after:absolute after:top-0 after:left-1/2 after:h-3 after:w-px after:bg-ink group-open:after:hidden"
        />
      </summary>
      <div className="pb-6 text-small text-ink-muted">{children}</div>
    </details>
  );
}
