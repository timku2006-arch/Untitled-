import Link from "next/link";
import { AccessStatus } from "@/components/drop/AccessStatus";
import { Countdown } from "@/components/drop/Countdown";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import type { Drop } from "@/data/drops";
import { formatDayTime } from "@/lib/date";

export function NextDrop({ drop }: { drop: Drop }) {
  return (
    <section aria-labelledby="drop-title" className="bg-surface py-20 lg:py-32">
      <Container className="grid grid-cols-4 gap-x-4 gap-y-12 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
        <div className="col-span-4 flex flex-col md:col-span-8 lg:col-span-6">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-label uppercase text-ink-muted">Ближайший дроп</p>
            <Badge>{drop.publicAt ? "Подписчикам первыми" : "Только для клуба"}</Badge>
          </div>

          <h2 id="drop-title" className="mt-8 text-h1">
            <span className="text-ink-muted">Drop {drop.number}.</span> {drop.title}
          </h2>
          <p className="mt-6 max-w-md text-ink-muted">{drop.description}</p>

          <div className="mt-12 max-w-lg">
            <Countdown target={drop.membersAt} />
          </div>

          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-6 border-t border-line pt-6 text-small">
            <div>
              <dt className="text-ink-muted">Для клуба</dt>
              <dd className="mt-1">{formatDayTime(drop.membersAt)}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Для всех</dt>
              <dd className="mt-1">{drop.publicAt ? formatDayTime(drop.publicAt) : "Не будет"}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Тираж</dt>
              <dd className="mt-1">{drop.edition} вещей</dd>
            </div>
            <div>
              <dt className="text-ink-muted">В коллекции</dt>
              <dd className="mt-1">{drop.itemsCount} позиций</dd>
            </div>
          </dl>

          <div className="mt-8 max-w-lg">
            <AccessStatus drop={drop} />
          </div>
          <Link
            href="/drops"
            className="mt-8 self-start text-small underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            Все дропы
          </Link>
        </div>

        <Reveal className="col-span-4 grid grid-cols-2 gap-4 md:col-span-8 md:gap-6 lg:col-span-5 lg:col-start-8">
          <Placeholder
            shape={drop.preview[0]}
            tone={4}
            alt={`Вещь из дропа ${drop.number}: превью`}
            className="col-span-2 aspect-[4/5]"
          />
          <Placeholder shape={drop.preview[1]} tone={1} detail alt="Фактура ткани крупным планом" className="aspect-square" />
          <Placeholder shape={drop.preview[0]} tone={3} detail alt="Детали кроя крупным планом" className="aspect-square" />
        </Reveal>
      </Container>
    </section>
  );
}
