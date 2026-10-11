"use client";

import { useEffect, useState } from "react";
import { formatDayTime } from "@/lib/date";

type Props = {
  target: string;
  size?: "sm" | "lg";
};

function split(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Обратный отсчёт. До гидрации показывает прочерки, чтобы сервер и клиент совпадали.
 * Для скринридеров — статичная дата, а не тикающие секунды.
 */
export function Countdown({ target, size = "lg" }: Props) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const left = now === null ? null : split(new Date(target).getTime() - now);
  const units = [
    { label: "дн", value: left?.days },
    { label: "ч", value: left?.hours },
    { label: "мин", value: left?.minutes },
    { label: "сек", value: left?.seconds },
  ];

  const number = size === "lg" ? "text-h1" : "text-h3";

  return (
    <div>
      <p className="sr-only">Старт {formatDayTime(target)} по Москве</p>
      <dl aria-hidden="true" className={`grid grid-cols-4 ${size === "lg" ? "gap-4 md:gap-6" : "gap-3"}`}>
        {units.map((unit) => (
          <div key={unit.label} className="flex flex-col">
            <dt className="order-2 mt-2 text-label uppercase text-ink-muted">{unit.label}</dt>
            <dd className={`${number} tabular-nums`}>{unit.value === undefined ? "––" : pad(unit.value)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
