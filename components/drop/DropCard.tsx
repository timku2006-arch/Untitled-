import { AccessStatus } from "@/components/drop/AccessStatus";
import { Countdown } from "@/components/drop/Countdown";
import { Badge } from "@/components/ui/Badge";
import { Placeholder } from "@/components/ui/Placeholder";
import type { Drop } from "@/data/drops";
import { formatDayTime } from "@/lib/date";

type Phase = "soon" | "members" | "public";

export function dropPhase(drop: Drop, now: number): Phase {
  if (now < new Date(drop.membersAt).getTime()) return "soon";
  if (!drop.publicAt || now < new Date(drop.publicAt).getTime()) return "members";
  return "public";
}

/** Будущий дроп: превью, обратный отсчёт и статус доступа. */
export function UpcomingDrop({ drop, now, index }: { drop: Drop; now: number; index: number }) {
  const phase = dropPhase(drop, now);
  const target = phase === "soon" ? drop.membersAt : (drop.publicAt ?? drop.membersAt);

  return (
    <article
      aria-labelledby={`${drop.id}-title`}
      className="grid grid-cols-4 gap-x-4 gap-y-8 border-t border-ink pt-6 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12"
    >
      <div className="col-span-4 md:col-span-3 lg:col-span-4">
        <div className="grid grid-cols-2 gap-2">
          <Placeholder
            shape={drop.preview[0]}
            tone={index % 2 ? 2 : 4}
            alt={`Вещь из дропа ${drop.number}`}
            className="aspect-[4/5]"
          />
          <Placeholder
            shape={drop.preview[1]}
            tone={index % 2 ? 1 : 3}
            alt={`Ещё одна вещь из дропа ${drop.number}`}
            className="aspect-[4/5]"
          />
        </div>
      </div>

      <div className="col-span-4 flex flex-col md:col-span-5 lg:col-span-7 lg:col-start-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{drop.publicAt ? "Подписчикам первыми" : "Только для клуба"}</Badge>
          {phase === "members" ? <Badge tone="neutral">Открыт для клуба</Badge> : null}
        </div>
        <h3 id={`${drop.id}-title`} className="mt-6 text-h2">
          <span className="text-ink-muted">Drop {drop.number}.</span> {drop.title}
        </h3>
        <p className="mt-4 max-w-lg text-ink-muted">{drop.description}</p>

        <div className="mt-8 max-w-md">
          <p className="mb-3 text-small text-ink-muted">
            {phase === "soon" ? "До открытия для клуба" : "До открытия для всех"}
          </p>
          <Countdown target={target} size="sm" />
        </div>

        <dl className="mt-8 grid max-w-lg grid-cols-2 gap-x-6 gap-y-4 text-small sm:grid-cols-4">
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
            <dt className="text-ink-muted">Позиций</dt>
            <dd className="mt-1">{drop.itemsCount}</dd>
          </div>
        </dl>

        <div className="mt-6 max-w-lg">
          <AccessStatus drop={drop} phase={phase} />
        </div>
      </div>
    </article>
  );
}
