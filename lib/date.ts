const MONTHS = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const MSK_OFFSET_MS = 3 * 60 * 60 * 1000;

function toMsk(iso: string) {
  return new Date(new Date(iso).getTime() + MSK_OFFSET_MS);
}

/** «24 октября» — по московскому времени, без зависимости от часового пояса браузера. */
export function formatDay(iso: string): string {
  const d = toMsk(iso);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

/** «24 октября, 12:00» */
export function formatDayTime(iso: string): string {
  const d = toMsk(iso);
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${formatDay(iso)}, ${hh}:${mm}`;
}

/** «октябрь 2026» для архива. */
export function formatMonthYear(iso: string): string {
  const d = toMsk(iso);
  const nominative = [
    "январь",
    "февраль",
    "март",
    "апрель",
    "май",
    "июнь",
    "июль",
    "август",
    "сентябрь",
    "октябрь",
    "ноябрь",
    "декабрь",
  ];
  return `${nominative[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}
