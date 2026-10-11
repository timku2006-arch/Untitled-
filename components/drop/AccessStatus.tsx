"use client";

import Link from "next/link";
import type { Drop } from "@/data/drops";
import { formatDayTime } from "@/lib/date";
import { useMembership } from "@/lib/membership";

type Props = {
  drop: Drop;
  /** soon — ещё закрыт, members — открыт для клуба. */
  phase?: "soon" | "members" | "public";
};

/** Статус доступа к дропу для текущего пользователя. */
export function AccessStatus({ drop, phase = "soon" }: Props) {
  const { isMember } = useMembership();

  if (isMember) {
    return (
      <p className="text-small">
        <span className="mr-2 inline-block size-1.5 translate-y-[-2px] rounded-full bg-accent" aria-hidden="true" />
        {phase === "soon"
          ? `Вы в клубе: доступ откроется ${formatDayTime(drop.membersAt)}.`
          : "Вы в клубе: дроп уже открыт для вас."}
      </p>
    );
  }

  return (
    <p className="text-small text-ink-muted">
      {drop.publicAt
        ? `Без подписки — с ${formatDayTime(drop.publicAt)}, если что-то останется.`
        : "Без подписки этот дроп недоступен."}{" "}
      <Link href="/club#join" className="text-ink underline underline-offset-4 hover:text-accent">
        Вступить в клуб
      </Link>
    </p>
  );
}
