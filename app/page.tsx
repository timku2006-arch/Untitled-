import { Faq } from "@/components/home/Faq";
import { Featured } from "@/components/home/Featured";
import { Hero } from "@/components/home/Hero";
import { NextDrop } from "@/components/home/NextDrop";
import { Perks } from "@/components/home/Perks";
import { Plan } from "@/components/home/Plan";
import { DROPS, upcomingDrops } from "@/data/drops";
import { FAQ } from "@/data/faq";
import { PRODUCTS } from "@/data/products";

// Ближайший дроп пересчитывается раз в час.
export const revalidate = 3600;

export default function HomePage() {
  const nextDrop = upcomingDrops()[0] ?? DROPS[0];
  const featured = PRODUCTS.filter((p) => p.featured);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <Hero />
      <Perks />
      <NextDrop drop={nextDrop} />
      <Featured products={featured} />
      <Plan />
      <Faq />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    </>
  );
}
