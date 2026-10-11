import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "О бренде",
  description: "Untitled делает базовую одежду без логотипов и сезонной спешки и продаёт её через клуб.",
  alternates: { canonical: "/about" },
};

const PRINCIPLES = [
  {
    title: "Без названия",
    text: "Мы не ставим логотипы на вещи. Хорошая одежда узнаётся по крою и ткани, а не по надписи на груди.",
  },
  {
    title: "Меньше вещей",
    text: "Небольшой постоянный ассортимент. Каждую модель мы дорабатываем годами, а не заменяем каждый сезон.",
  },
  {
    title: "Честная цена",
    text: "Клуб позволяет нам планировать производство заранее и не закладывать в цену распродажи. Поэтому подписчики платят половину.",
  },
  {
    title: "Небольшие тиражи",
    text: "Дропы выходят тиражом в несколько сотен вещей и не повторяются. Так мы пробуем новое, не производя лишнего.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="О бренде"
        title="Одежда, которой не нужно название"
        intro={<p>Untitled появился в 2024 году в Москве. Мы делаем базовые вещи, которые носят годами.</p>}
      />

      <Container>
        <div className="grid grid-cols-4 gap-x-4 gap-y-4 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
          <Placeholder
            shape="coat"
            tone={4}
            label="Мастерская"
            alt="Пальто на манекене в мастерской"
            className="col-span-4 aspect-[4/5] md:col-span-5 md:aspect-[5/4] lg:col-span-8"
          />
          <Placeholder
            shape="knit"
            tone={1}
            detail
            alt="Шерстяная пряжа крупным планом"
            className="col-span-4 aspect-[4/5] md:col-span-3 md:aspect-auto lg:col-span-4"
          />
        </div>

        <div className="grid grid-cols-4 gap-x-4 py-24 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:py-40">
          <div className="col-span-4 space-y-6 text-h3 md:col-span-7 lg:col-span-8 lg:col-start-4">
            <p>
              Большинство вещей в гардеробе — простые: рубашки, брюки, трикотаж, пальто. Именно их мы и делаем,
              но так, чтобы они служили дольше одного сезона.
            </p>
            <p className="text-ink-muted">
              Клуб — способ сделать такую одежду доступной. Подписка даёт нам предсказуемый спрос, а вам — цену,
              которая не зависит от распродаж.
            </p>
          </div>
        </div>
      </Container>

      <section aria-labelledby="principles-title">
        <Container>
          <SectionHeader id="principles-title" eyebrow="Принципы" title="Четыре правила, по которым мы работаем" />
          <ol className="grid gap-x-6 gap-y-12 md:grid-cols-2">
            {PRINCIPLES.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={(i % 2) * 80} className="border-t border-ink pt-6">
                  <span className="text-small text-ink-muted tabular-nums" aria-hidden="true">
                    0{i + 1}
                  </span>
                  <h3 className="mt-8 text-h3">{item.title}</h3>
                  <p className="mt-3 max-w-md text-ink-muted">{item.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-8 lg:mt-24">
            <ButtonLink href="/catalog">Смотреть каталог</ButtonLink>
            <ButtonLink href="/club" variant="ghost">
              Как устроен клуб
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
