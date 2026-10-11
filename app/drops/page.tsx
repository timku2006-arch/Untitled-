import type { Metadata } from "next";
import { UpcomingDrop } from "@/components/drop/DropCard";
import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Placeholder } from "@/components/ui/Placeholder";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { pastDrops, upcomingDrops } from "@/data/drops";
import { CLUB } from "@/data/site";
import { formatMonthYear } from "@/lib/date";

export const metadata: Metadata = {
  title: "Дропы",
  description:
    "Лимитированные коллекции Untitled. Подписчики клуба получают доступ за 48 часов до остальных, некоторые дропы продаются только в клубе.",
  alternates: { canonical: "/drops" },
};

// Статусы дропов пересчитываются раз в минуту.
export const revalidate = 60;

export default function DropsPage() {
  const now = Date.now();
  const upcoming = upcomingDrops(now);
  const past = pastDrops(now);

  return (
    <>
      <PageHeader
        eyebrow="Дропы"
        title="Лимитированные коллекции"
        intro={
          <p>
            Небольшие тиражи без повторов. Клуб получает доступ за {CLUB.earlyAccessHours} часов до остальных, а
            часть дропов продаётся только подписчикам.
          </p>
        }
      />

      <section aria-labelledby="upcoming-title">
        <Container>
          <h2 id="upcoming-title" className="sr-only">
            Будущие дропы
          </h2>
          {upcoming.length > 0 ? (
            <div className="flex flex-col gap-16 lg:gap-24">
              {upcoming.map((drop, i) => (
                <Reveal key={drop.id}>
                  <UpcomingDrop drop={drop} now={now} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="border-t border-line pt-6 text-ink-muted">
              Даты следующих дропов скоро появятся. Подпишитесь на рассылку внизу страницы, чтобы не пропустить.
            </p>
          )}
        </Container>
      </section>

      <section aria-labelledby="past-title" className="pt-24 lg:pt-40">
        <Container>
          <SectionHeader id="past-title" eyebrow="Архив" title="Прошедшие дропы" />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
            {past.map((drop, i) => (
              <li key={drop.id}>
                <article aria-labelledby={`${drop.id}-past`}>
                  <div className="relative">
                    <Placeholder
                      shape={drop.preview[0]}
                      tone={((i % 4) + 1) as 1 | 2 | 3 | 4}
                      alt={`Вещь из дропа ${drop.number}`}
                      className="aspect-[4/5] opacity-80 grayscale"
                    />
                    <span className="absolute top-3 left-3 bg-bg px-2 py-1 text-label uppercase text-ink-muted">
                      Распродан
                    </span>
                  </div>
                  <h3 id={`${drop.id}-past`} className="mt-4 text-body">
                    Drop {drop.number}. {drop.title}
                  </h3>
                  <p className="mt-1 text-small text-ink-muted">
                    {formatMonthYear(drop.membersAt)} · {drop.edition} вещей
                    {drop.publicAt ? "" : " · только клуб"}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
