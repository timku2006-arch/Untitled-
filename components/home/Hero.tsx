import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { CLUB } from "@/data/site";
import { formatRub } from "@/lib/pricing";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pt-10 pb-24 md:pt-16 lg:pt-20 lg:pb-40">
      <Container>
        <p className="mb-6 text-label uppercase text-ink-muted md:mb-10">Клуб одежды</p>
        <h1 id="hero-title" className="text-display">
          Untitled
        </h1>

        <div className="mt-10 grid grid-cols-4 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
          <div className="col-span-4 flex flex-col justify-between gap-10 md:col-span-3 lg:col-span-4">
            <div>
              <p className="max-w-sm text-h3 text-balance">
                Одежда, которая в клубе стоит вдвое меньше.
              </p>
              <p className="mt-5 max-w-sm text-ink-muted">
                Подписка за {formatRub(CLUB.price)} в месяц: скидка 50% на всё, доставка без условий и
                ранний доступ к лимитированным дропам.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <ButtonLink href="/club#join">Вступить</ButtonLink>
              <ButtonLink href="/catalog" variant="ghost">
                Смотреть каталог
              </ButtonLink>
            </div>
          </div>

          <div className="col-span-4 md:col-span-5 lg:col-span-8 grid grid-cols-2 gap-x-4 md:gap-x-6">
            <Placeholder
              shape="coat"
              tone={2}
              label="Пальто прямого кроя"
              alt="Пальто прямого кроя цвета графит на нейтральном фоне"
              className="col-span-2 aspect-[4/5] sm:aspect-[5/4] lg:col-span-1 lg:aspect-[4/5]"
            />
            <Placeholder
              shape="knit"
              tone={1}
              label="Джемпер из мериноса"
              alt="Джемпер из мериноса цвета экрю на нейтральном фоне"
              className="hidden aspect-[4/5] lg:block"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
