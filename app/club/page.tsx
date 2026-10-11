import type { Metadata } from "next";
import { JoinSection } from "@/components/club/JoinSection";
import { Faq } from "@/components/home/Faq";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getProduct } from "@/data/products";
import { CLUB, SHIPPING } from "@/data/site";
import { formatRub, memberPrice } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Клуб",
  description: `Подписка Untitled за ${CLUB.price} ₽ в месяц: скидка 50% на всю одежду, бесплатная доставка от любой суммы и ранний доступ к лимитированным дропам.`,
  alternates: { canonical: "/club" },
};

const PERKS = [
  {
    figure: "−50%",
    title: "Скидка на всю одежду",
    text: "Каждая вещь в каталоге стоит для вас вдвое меньше. Скидка распространяется на новые коллекции, базовые вещи и лимитированные дропы.",
    facts: ["Без промокодов: цены пересчитываются сами", "Без исключений и «участвующих товаров»", "Без ограничений по количеству заказов"],
  },
  {
    figure: "0 ₽",
    title: "Доставка без минимальной суммы",
    text: `Курьером или в пункт выдачи, по всей России. Без подписки доставка стоит ${formatRub(SHIPPING.cost)} и бесплатна только от ${formatRub(SHIPPING.freeFrom)}.`,
    facts: ["От любой суммы, даже за одну вещь", "Москва — 1–3 дня, Россия — 2–7 дней", "Обратная доставка при возврате тоже бесплатна"],
  },
  {
    figure: `${CLUB.earlyAccessHours} ч`,
    title: "Ранний доступ к дропам",
    text: `Дропы — небольшие коллекции тиражом от 150 до 400 вещей. Клуб получает доступ за ${CLUB.earlyAccessHours} часов до остальных, и обычно этого достаточно, чтобы забрать нужный размер.`,
    facts: ["Напоминание на почту за день до старта", "Часть дропов продаётся только в клубе", "Скидка 50% действует и на дропы"],
  },
];

const CANCEL = [
  {
    title: "Подписка работает до конца оплаченного месяца",
    text: "Скидка, бесплатная доставка и ранний доступ сохраняются до даты следующего списания.",
  },
  { title: "Новых списаний не будет", text: "Карта отвязывается сразу, без звонков и писем с уговорами." },
  {
    title: "Оформленные заказы остаются со скидкой",
    text: "Всё, что вы купили в клубе, доставим и примем к возврату на тех же условиях.",
  },
  {
    title: "Цены возвращаются к обычным",
    text: `Доставка снова стоит ${formatRub(SHIPPING.cost)}, дропы открываются для вас вместе со всеми. Вернуться в клуб можно в любой момент.`,
  },
];

const EXAMPLES = [
  { label: "Футболка", slugs: ["tee-heavy-black"] },
  { label: "Джемпер и брюки", slugs: ["jumper-merino-ecru", "trousers-pleated-charcoal"] },
  { label: "Пальто", slugs: ["coat-straight-graphite"] },
].map((example) => {
  const full = example.slugs.reduce((sum, slug) => sum + (getProduct(slug)?.price ?? 0), 0);
  const shipping = full >= SHIPPING.freeFrom ? 0 : SHIPPING.cost;
  const club = example.slugs.reduce((sum, slug) => sum + memberPrice(getProduct(slug)?.price ?? 0), 0);
  return { label: example.label, without: full + shipping, club, saving: full + shipping - club };
});

export default function ClubPage() {
  const breakEven = Math.round(CLUB.price / CLUB.discount);

  return (
    <>
      <PageHeader
        eyebrow="Клуб Untitled"
        title={<>Половина цены на всё за {formatRub(CLUB.price)} в месяц</>}
        intro={
          <p>
            Одна подписка без уровней: скидка 50%, доставка без условий и ранний доступ к дропам. Отменить можно в
            любой момент.
          </p>
        }
      />

      <section aria-labelledby="perks-title">
        <Container>
          <h2 id="perks-title" className="sr-only">
            Привилегии
          </h2>
          <div className="flex flex-col">
            {PERKS.map((perk) => (
              <Reveal key={perk.title}>
                <article className="grid grid-cols-4 gap-x-4 gap-y-6 border-t border-ink py-10 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:py-16">
                  <p className="col-span-4 text-h1 tabular-nums md:col-span-2 lg:col-span-3" aria-hidden="true">
                    {perk.figure}
                  </p>
                  <div className="col-span-4 md:col-span-6 lg:col-span-5">
                    <h3 className="text-h3">{perk.title}</h3>
                    <p className="mt-3 text-ink-muted">{perk.text}</p>
                  </div>
                  <ul className="col-span-4 space-y-3 text-small md:col-span-6 md:col-start-3 lg:col-span-3 lg:col-start-10">
                    {perk.facts.map((fact) => (
                      <li key={fact} className="flex gap-3 border-b border-line pb-3 last:border-b-0">
                        <svg viewBox="0 0 16 16" className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true">
                          <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        {fact}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="savings-title" className="pt-16 lg:pt-24">
        <Container>
          <SectionHeader
            id="savings-title"
            eyebrow="Расчёт"
            title={<>Подписка окупается с заказа от {formatRub(breakEven)}</>}
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left tabular-nums">
              <caption className="sr-only">Примеры заказов: стоимость без подписки и в клубе</caption>
              <thead className="text-small text-ink-muted">
                <tr className="border-b border-ink">
                  <th scope="col" className="py-3 font-normal">Заказ</th>
                  <th scope="col" className="py-3 text-right font-normal">Без подписки, с доставкой</th>
                  <th scope="col" className="py-3 text-right font-normal">В клубе</th>
                  <th scope="col" className="py-3 text-right font-normal">Экономия</th>
                </tr>
              </thead>
              <tbody>
                {EXAMPLES.map((row) => (
                  <tr key={row.label} className="border-b border-line">
                    <th scope="row" className="py-5 font-normal">{row.label}</th>
                    <td className="py-5 text-right text-ink-muted">{formatRub(row.without)}</td>
                    <td className="py-5 text-right">{formatRub(row.club)}</td>
                    <td className="py-5 text-right text-accent">{formatRub(row.saving)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-small text-ink-muted">
            Подписка стоит {formatRub(CLUB.price)} в месяц. Расчёт по ценам текущего каталога.
          </p>
        </Container>
      </section>

      <section id="join" aria-labelledby="join-title" className="scroll-mt-20 pt-24 lg:pt-40">
        <Container>
          <SectionHeader id="join-title" eyebrow="Подписка" title="Вступить в клуб" />
          <div className="grid grid-cols-4 gap-x-4 gap-y-12 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
            <div className="col-span-4 md:col-span-3 lg:col-span-4">
              <div className="border border-ink p-6 md:p-8">
                <p className="text-label uppercase text-ink-muted">Клуб Untitled</p>
                <p className="mt-6 flex items-baseline gap-3">
                  <span className="text-h1 tabular-nums">{formatRub(CLUB.price)}</span>
                </p>
                <p className="mt-1 text-ink-muted">в месяц</p>
                <ul className="mt-8 space-y-2 text-small">
                  <li>Скидка 50% на всю одежду</li>
                  <li>Бесплатная доставка</li>
                  <li>Ранний доступ к дропам</li>
                </ul>
                <p className="mt-8 border-t border-line pt-4 text-small text-ink-muted">
                  Списание раз в месяц в дату оформления. Напоминаем за три дня.
                </p>
              </div>
            </div>
            <div className="col-span-4 md:col-span-5 lg:col-span-6 lg:col-start-7">
              <JoinSection />
            </div>
          </div>
        </Container>
      </section>

      <section id="cancel" aria-labelledby="cancel-title" className="scroll-mt-20 pt-24 lg:pt-40">
        <Container>
          <SectionHeader id="cancel-title" eyebrow="Отмена" title="Что будет, если отменить" />
          <ol className="grid gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {CANCEL.map((item, i) => (
              <li key={item.title} className="border-t border-line pt-6">
                <span className="text-small text-ink-muted tabular-nums" aria-hidden="true">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-body font-medium">{item.title}</h3>
                <p className="mt-2 text-small text-ink-muted">{item.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="pt-24 lg:pt-40">
        <Faq />
      </div>
    </>
  );
}
