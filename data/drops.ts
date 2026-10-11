import type { Shape } from "@/data/products";

export type Drop = {
  id: string;
  number: string;
  title: string;
  description: string;
  /** Открытие продаж для клуба. */
  membersAt: string;
  /** Открытие для всех. null — дроп только для клуба. */
  publicAt: string | null;
  edition: number;
  itemsCount: number;
  preview: Shape[];
};

export const DROPS: Drop[] = [
  {
    id: "drop-07",
    number: "07",
    title: "Шерсть",
    description:
      "Шесть вещей из итальянской шерсти: пальто, два джемпера, брюки, шарф и шапка. Один цвет, одна фактура.",
    membersAt: "2026-10-24T09:00:00Z",
    publicAt: "2026-10-26T09:00:00Z",
    edition: 300,
    itemsCount: 6,
    preview: ["coat", "knit"],
  },
  {
    id: "drop-08",
    number: "08",
    title: "Зимние слои",
    description: "Утеплённая куртка, флисовый жилет и термобельё. Только для клуба, повторного тиража не будет.",
    membersAt: "2026-12-05T09:00:00Z",
    publicAt: null,
    edition: 150,
    itemsCount: 4,
    preview: ["coat", "tee"],
  },
  {
    id: "drop-09",
    number: "09",
    title: "Белая рубашка",
    description: "Пять вариантов одной рубашки: от тонкого поплина до плотного оксфорда.",
    membersAt: "2027-02-14T09:00:00Z",
    publicAt: "2027-02-16T09:00:00Z",
    edition: 400,
    itemsCount: 5,
    preview: ["shirt", "shirt"],
  },
  {
    id: "drop-06",
    number: "06",
    title: "Лён",
    description: "Летняя капсула из стираного льна в трёх оттенках песка.",
    membersAt: "2026-06-13T09:00:00Z",
    publicAt: "2026-06-15T09:00:00Z",
    edition: 350,
    itemsCount: 7,
    preview: ["shirt", "trousers"],
  },
  {
    id: "drop-05",
    number: "05",
    title: "Рабочая одежда",
    description: "Куртки и брюки из плотного канваса по мотивам рабочей формы.",
    membersAt: "2026-03-21T09:00:00Z",
    publicAt: null,
    edition: 200,
    itemsCount: 5,
    preview: ["trousers", "shirt"],
  },
];

export function upcomingDrops(now = Date.now()): Drop[] {
  return DROPS.filter((d) => new Date(d.publicAt ?? d.membersAt).getTime() > now).sort(
    (a, b) => new Date(a.membersAt).getTime() - new Date(b.membersAt).getTime(),
  );
}

export function pastDrops(now = Date.now()): Drop[] {
  return DROPS.filter((d) => new Date(d.publicAt ?? d.membersAt).getTime() <= now).sort(
    (a, b) => new Date(b.membersAt).getTime() - new Date(a.membersAt).getTime(),
  );
}
