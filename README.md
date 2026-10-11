# Untitled

Сайт бренда одежды с клубной подпиской: 3 490 ₽ в месяц, скидка 50%, бесплатная доставка и ранний доступ к дропам.

Next.js (App Router), TypeScript, Tailwind CSS 4. Данные моковые, лежат в `/data`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

- Дизайн-токены: `app/globals.css` (`@theme`).
- Статус подписки и корзина хранятся в localStorage (`lib/membership.ts`, `lib/cart.ts`).
- Цены и доставка: `lib/pricing.ts`, константы — `data/site.ts`.
