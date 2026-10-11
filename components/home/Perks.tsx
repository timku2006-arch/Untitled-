import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CLUB } from "@/data/site";

const PERKS = [
  {
    figure: "−50%",
    title: "Скидка на всю одежду",
    text: "Половина цены на каждую вещь в каталоге, включая новые коллекции и дропы. Без промокодов и исключений.",
  },
  {
    figure: "0 ₽",
    title: "Доставка без минимальной суммы",
    text: "Бесплатно курьером или в пункт выдачи, даже если в заказе одна вещь.",
  },
  {
    figure: `${CLUB.earlyAccessHours} ч`,
    title: "Ранний доступ к дропам",
    text: `Лимитированные коллекции открываются для клуба за ${CLUB.earlyAccessHours} часов до остальных. Некоторые продаются только в клубе.`,
  },
];

export function Perks() {
  return (
    <section aria-labelledby="perks-title" className="pb-24 lg:pb-40">
      <Container>
        <SectionHeader id="perks-title" eyebrow="Что даёт клуб" title="Три привилегии, одна подписка" />
        <ol className="grid gap-x-6 gap-y-12 md:grid-cols-3">
          {PERKS.map((perk, i) => (
            <li key={perk.title}>
              <Reveal delay={i * 80} className="flex h-full flex-col border-t border-ink pt-6">
                <span className="text-h1 tabular-nums" aria-hidden="true">
                  {perk.figure}
                </span>
                <h3 className="mt-10 text-h3 md:mt-16">{perk.title}</h3>
                <p className="mt-3 max-w-sm text-ink-muted">{perk.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
