import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { SITE } from "@/data/site";

const COLUMNS = [
  {
    title: "Магазин",
    links: [
      { href: "/catalog", label: "Каталог" },
      { href: "/drops", label: "Дропы" },
      { href: "/cart", label: "Корзина" },
    ],
  },
  {
    title: "Клуб",
    links: [
      { href: "/club", label: "Подписка" },
      { href: "/#faq", label: "Вопросы и ответы" },
      { href: "/club#cancel", label: "Отмена подписки" },
    ],
  },
  {
    title: "Бренд",
    links: [
      { href: "/about", label: "О бренде" },
      { href: `mailto:${SITE.email}`, label: "Связаться" },
      { href: "https://t.me/", label: "Telegram" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line lg:mt-40">
      <Container className="grid grid-cols-4 gap-x-4 gap-y-14 py-16 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:py-24">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <p className="mb-6 text-h3">Рассылка</p>
          <div className="max-w-md">
            <NewsletterForm />
          </div>
        </div>

        <nav aria-label="Ссылки в подвале" className="col-span-4 grid grid-cols-2 gap-x-4 gap-y-10 md:col-span-8 md:grid-cols-3 md:gap-x-6 lg:col-span-6 lg:col-start-7">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-label uppercase text-ink-muted">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-small transition-colors hover:text-accent">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <Container className="flex flex-col gap-4 border-t border-line py-8 text-small text-ink-muted md:flex-row md:items-end md:justify-between">
        <p className="text-[clamp(4rem,2rem+12vw,12rem)] leading-[0.8] font-medium tracking-[-0.05em] text-ink" aria-hidden="true">
          Untitled
        </p>
        <p>© 2026 Untitled</p>
      </Container>
    </footer>
  );
}
