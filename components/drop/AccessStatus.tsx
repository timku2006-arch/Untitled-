"use client";

import Link from "next/link";
import type { Drop } from "@/data/drops";
import { formatDayTime } from "@/lib/date";
import { useMembership } from "@/lib/membership";

/** Статус доступа к дропу для текущего пользователя. */
export function AccessStatus({ drop }: { drop: Drop }) {
  const { isMember } = useMembership();

  if (isMember) {
    return (
      <p className="text-small">
        <span className="mr-2 inline-block size-1.5 translate-y-[-2px] rounded-full bg-accent" aria-hidden="true" />
        Вы в клубе: доступ откроется {formatDayTime(drop.membersAt)}.
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
