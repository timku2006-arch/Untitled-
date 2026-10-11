import type { Shape } from "@/data/products";

const TONES = {
  1: "bg-surface",
  2: "bg-surface-2",
  3: "bg-surface-3",
  4: "bg-surface-4",
} as const;

/** Контуры вещей в системе координат 400 × 500. */
const SHAPES: Record<Shape, string[]> = {
  coat: [
    "M140 95 L180 85 L200 140 L220 85 L260 95 L300 125 L322 380 L294 384 L276 205 L282 432 L118 432 L124 205 L106 384 L78 380 L100 125 Z",
    "M180 85 L200 210 L220 85",
    "M200 210 L200 432",
  ],
  shirt: [
    "M135 112 L175 96 L200 122 L225 96 L265 112 L300 142 L322 332 L294 337 L272 192 L272 402 L128 402 L128 192 L106 337 L78 332 L100 142 Z",
    "M175 96 L188 130 L200 122 L212 130 L225 96",
    "M200 122 L200 402",
  ],
  knit: [
    "M135 116 Q200 140 265 116 L300 136 L326 342 L296 347 L272 202 L272 396 L128 396 L128 202 L104 347 L74 342 L100 136 Z",
    "M128 380 L272 380",
    "M150 122 Q200 150 250 122",
  ],
  tee: [
    "M132 120 L172 100 Q200 118 228 100 L268 120 L312 172 L282 194 L266 178 L266 392 L134 392 L134 178 L118 194 L88 172 Z",
  ],
  trousers: [
    "M145 92 L255 92 L272 422 L216 422 L200 182 L184 422 L128 422 Z",
    "M145 112 L255 112",
    "M228 112 L236 260",
  ],
  bag: ["M118 196 L282 196 L294 412 L106 412 Z", "M160 196 Q160 116 200 116 Q240 116 240 196"],
  cap: ["M118 292 Q118 196 200 190 Q282 196 282 292 Z", "M118 292 L292 292 Q336 300 322 314 L130 314 Z", "M200 190 L200 292"],
};

type Props = {
  shape: Shape;
  tone?: keyof typeof TONES;
  label?: string;
  /** Крупный план фактуры — второй кадр в карточке. */
  detail?: boolean;
  className?: string;
  alt: string;
};

/** Плейсхолдер фотографии в едином стиле: нейтральный фон, тонкий контур вещи. */
export function Placeholder({ shape, tone = 1, label, detail = false, className = "", alt }: Props) {
  const position = /\babsolute\b/.test(className) ? "" : "relative";
  const a11y = alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true as const };
  return (
    <div {...a11y} className={`${position} overflow-hidden ${TONES[tone]} ${className}`}>
      {detail ? <Texture /> : <Silhouette shape={shape} />}
      {label ? (
        <span aria-hidden="true" className="absolute bottom-3 left-3 text-label uppercase text-ink-muted/80">
          {label}
        </span>
      ) : null}
    </div>
  );
}

function Silhouette({ shape }: { shape: Shape }) {
  return (
    <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <ellipse cx="200" cy="452" rx="120" ry="8" className="fill-ink/[0.04]" />
        {SHAPES[shape].map((d, i) => (
          <path
            key={i}
            d={d}
            fill={i === 0 ? "currentColor" : "none"}
            className={i === 0 ? "text-bg/50" : ""}
            stroke="var(--color-ink-muted)"
            strokeOpacity={0.55}
            strokeWidth={1.2}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}
    </svg>
  );
}

/** Крупный план ткани: диагональ твила. */
function Texture() {
  return (
    <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="twill" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-ink-muted)" strokeOpacity="0.14" strokeWidth="2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#twill)" />
    </svg>
  );
}
