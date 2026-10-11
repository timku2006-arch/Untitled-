import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/catalog", "/drops", "/club", "/about"];
  return [
    ...pages.map((path) => ({ url: `${SITE.url}${path}` })),
    ...PRODUCTS.map((p) => ({ url: `${SITE.url}/product/${p.slug}` })),
  ];
}
