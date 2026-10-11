"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { NAV } from "@/data/site";
import { useCart } from "@/lib/cart";
import { useMembership } from "@/lib/membership";
import { useHydrated } from "@/lib/storage";

export function Header() {
  const pathname = usePathname();
  const { isMember } = useMembership();
  const { count } = useCart();
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-6 px-4 md:px-6 lg:px-12">
        <Link href="/" className="text-body font-semibold tracking-[-0.02em]" aria-label="Untitled — на главную">
          Untitled
        </Link>

        <nav aria-label="Основная навигация" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="text-small text-ink-muted transition-colors hover:text-ink aria-[current=page]:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          {hydrated && isMember ? (
            <Link href="/club" className="hidden items-center gap-2 text-small sm:inline-flex">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
              В клубе
            </Link>
          ) : (
            <Link
              href="/club#join"
              className="hidden text-small underline decoration-line underline-offset-4 transition-colors hover:decoration-ink sm:inline"
            >
              Вступить
            </Link>
          )}
          <Link href="/cart" className="text-small tabular-nums">
            Корзина<span className="text-ink-muted"> ({hydrated ? count : 0})</span>
            <span className="sr-only">, товаров: {hydrated ? count : 0}</span>
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 inline-flex size-10 items-center justify-center md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Закрыть меню" : "Открыть меню"}</span>
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-px w-5 bg-ink transition-transform duration-300 motion-reduce:transition-none ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-5 bg-ink transition-transform duration-300 motion-reduce:transition-none ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-bg md:hidden"
      >
        <nav aria-label="Мобильная навигация" className="px-4 pt-8 pb-12">
          <ul className="flex flex-col">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex h-16 items-center text-h3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-small text-ink-muted">
            {hydrated && isMember ? (
              "Вы в клубе. Скидка 50% и бесплатная доставка уже действуют."
            ) : (
              <>
                Клуб: скидка 50%, бесплатная доставка и ранний доступ к дропам.{" "}
                <Link href="/club#join" className="text-ink underline underline-offset-4">
                  Вступить
                </Link>
              </>
            )}
          </p>
        </nav>
      </div>
    </header>
  );
}
