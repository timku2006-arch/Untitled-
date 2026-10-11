export type Category = "outerwear" | "knit" | "shirts" | "tshirts" | "trousers" | "accessories";

/** Силуэт для плейсхолдера фотографии. */
export type Shape = "coat" | "shirt" | "knit" | "tee" | "trousers" | "bag" | "cap";

export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  color: string;
  sizes: string[];
  composition: string;
  description: string;
  details: string[];
  shape: Shape;
  tone: 1 | 2 | 3 | 4;
  featured?: boolean;
};

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "outerwear", label: "Верхняя одежда" },
  { id: "knit", label: "Трикотаж" },
  { id: "shirts", label: "Рубашки" },
  { id: "tshirts", label: "Футболки" },
  { id: "trousers", label: "Брюки" },
  { id: "accessories", label: "Аксессуары" },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "One size"];

const LETTER = ["XS", "S", "M", "L", "XL"];

export const PRODUCTS: Product[] = [
  {
    slug: "coat-straight-graphite",
    name: "Пальто прямого кроя",
    category: "outerwear",
    price: 38900,
    color: "Графит",
    sizes: LETTER,
    composition: "80% шерсть, 20% полиамид. Подкладка: 100% вискоза",
    description:
      "Пальто до середины бедра из плотной шерсти. Прямой силуэт, потайная застёжка, ничего лишнего.",
    details: ["Потайная застёжка на пуговицы", "Два кармана в боковых швах", "Внутренний карман"],
    shape: "coat",
    tone: 2,
    featured: true,
  },
  {
    slug: "overshirt-wool-olive",
    name: "Куртка-рубашка из шерсти",
    category: "outerwear",
    price: 21900,
    color: "Олива",
    sizes: LETTER,
    composition: "70% шерсть, 30% полиэстер",
    description: "Плотная куртка-рубашка на межсезонье. Носится поверх футболки или трикотажа.",
    details: ["Накладные карманы", "Пуговицы из рога", "Свободная посадка"],
    shape: "shirt",
    tone: 3,
  },
  {
    slug: "jumper-merino-ecru",
    name: "Джемпер из мериноса",
    category: "knit",
    price: 12900,
    color: "Экрю",
    sizes: LETTER,
    composition: "100% шерсть мериноса",
    description: "Тонкий джемпер с круглым вырезом. Не колется, хорошо держит форму после стирки.",
    details: ["Плоская вязка", "Манжеты в резинку", "Ручная стирка"],
    shape: "knit",
    tone: 1,
    featured: true,
  },
  {
    slug: "cardigan-chunky-brown",
    name: "Кардиган крупной вязки",
    category: "knit",
    price: 16900,
    color: "Табак",
    sizes: LETTER,
    composition: "60% шерсть, 30% альпака, 10% полиамид",
    description: "Тёплый кардиган с V-образным вырезом и широкими планками.",
    details: ["Крупная вязка", "Пять пуговиц", "Удлинённые рукава"],
    shape: "knit",
    tone: 4,
  },
  {
    slug: "shirt-poplin-white",
    name: "Рубашка из поплина",
    category: "shirts",
    price: 8900,
    color: "Белый",
    sizes: LETTER,
    composition: "100% хлопок",
    description: "Базовая рубашка из плотного поплина. Классический воротник, прямой низ.",
    details: ["Воротник кент", "Перламутровые пуговицы", "Прямой крой"],
    shape: "shirt",
    tone: 1,
    featured: true,
  },
  {
    slug: "shirt-linen-sand",
    name: "Рубашка оверсайз из льна",
    category: "shirts",
    price: 9900,
    color: "Песок",
    sizes: LETTER,
    composition: "100% лён",
    description: "Свободная рубашка из стираного льна. Мягкая с первого дня.",
    details: ["Стираный лён", "Опущенная линия плеча", "Нагрудный карман"],
    shape: "shirt",
    tone: 3,
  },
  {
    slug: "tee-heavy-black",
    name: "Футболка плотная",
    category: "tshirts",
    price: 4900,
    color: "Чёрный",
    sizes: LETTER,
    composition: "100% хлопок, 240 г/м²",
    description: "Футболка из плотного хлопка с аккуратной горловиной. Не садится после стирки.",
    details: ["Плотность 240 г/м²", "Двойная горловина", "Прямой силуэт"],
    shape: "tee",
    tone: 2,
  },
  {
    slug: "longsleeve-basic-grey",
    name: "Лонгслив базовый",
    category: "tshirts",
    price: 5900,
    color: "Серый меланж",
    sizes: LETTER,
    composition: "95% хлопок, 5% эластан",
    description: "Лонгслив, который подходит ко всему. Тянется, но не теряет форму.",
    details: ["Круглый вырез", "Манжеты в рубчик", "Приталенный силуэт"],
    shape: "knit",
    tone: 2,
  },
  {
    slug: "trousers-pleated-charcoal",
    name: "Брюки со стрелками",
    category: "trousers",
    price: 13900,
    color: "Антрацит",
    sizes: LETTER,
    composition: "64% полиэстер, 33% вискоза, 3% эластан",
    description: "Брюки со стрелками и одной складкой у пояса. Слегка зауженные к низу.",
    details: ["Одна складка", "Боковые карманы", "Шлёвки под ремень"],
    shape: "trousers",
    tone: 4,
    featured: true,
  },
  {
    slug: "trousers-wide-twill-stone",
    name: "Брюки широкие из твила",
    category: "trousers",
    price: 11900,
    color: "Камень",
    sizes: LETTER,
    composition: "100% хлопок",
    description: "Широкие брюки из плотного твила. Высокая посадка, длина до пола.",
    details: ["Высокая посадка", "Задние карманы на пуговице", "Плотный твил"],
    shape: "trousers",
    tone: 1,
  },
  {
    slug: "tote-canvas-natural",
    name: "Сумка-тоут из канваса",
    category: "accessories",
    price: 6900,
    color: "Натуральный",
    sizes: ["One size"],
    composition: "100% хлопок, канвас 16 oz",
    description: "Вместительная сумка из плотного канваса с внутренним карманом.",
    details: ["Внутренний карман на молнии", "Длинные ручки", "Размер 40 × 42 см"],
    shape: "bag",
    tone: 3,
  },
  {
    slug: "cap-cotton-navy",
    name: "Кепка из хлопка",
    category: "accessories",
    price: 3900,
    color: "Тёмно-синий",
    sizes: ["One size"],
    composition: "100% хлопок",
    description: "Шестиклинка из мягкого хлопка с регулируемым ремешком.",
    details: ["Регулируемый ремешок", "Мягкий козырёк", "Вышивка на заднике"],
    shape: "cap",
    tone: 2,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function categoryLabel(id: Category): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
