"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { CLUB } from "@/data/site";
import { formatDay } from "@/lib/date";
import { useMembership, type Membership } from "@/lib/membership";
import { formatRub } from "@/lib/pricing";
import { useHydrated } from "@/lib/storage";

/** Форма вступления → экран успеха → панель подписчика. */
export function JoinSection() {
  const hydrated = useHydrated();
  const { membership, join, cancel } = useMembership();
  const [justJoined, setJustJoined] = useState<string | null>(null);

  if (!hydrated) return <div className="min-h-[28rem]" aria-hidden="true" />;
  if (justJoined) return <Success name={justJoined} />;
  if (membership) return <MemberPanel membership={membership} onCancel={cancel} />;
  return (
    <JoinForm
      onJoin={(name, email) => {
        join(name, email);
        setJustJoined(name);
      }}
    />
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = { name?: string; email?: string };

function validate(name: string, email: string): Errors {
  const errors: Errors = {};
  if (!name.trim()) errors.name = "Укажите имя";
  else if (name.trim().length < 2) errors.name = "Имя слишком короткое";
  if (!email.trim()) errors.email = "Укажите email";
  else if (!EMAIL_RE.test(email.trim())) errors.email = "Проверьте адрес: похоже, в нём опечатка";
  return errors;
}

function JoinForm({ onJoin }: { onJoin: (name: string, email: string) => void }) {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    const next = validate(name, email);
    setErrors(next);
    if (next.name) return nameRef.current?.focus();
    if (next.email) return emailRef.current?.focus();
    onJoin(name.trim(), email.trim());
  }

  // После первой попытки ошибки обновляются по мере ввода.
  const revalidate = (n: string, m: string) => submitted && setErrors(validate(n, m));

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`} className="text-h3">
        Оформление подписки
      </h3>
      <p className="mt-2 text-small text-ink-muted">Два поля. Карту попросим на следующем шаге.</p>

      <div className="mt-8 flex flex-col gap-6">
        <Field
          id={`${id}-name`}
          label="Имя"
          error={errors.name}
          input={
            <input
              ref={nameRef}
              id={`${id}-name`}
              name="name"
              autoComplete="given-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                revalidate(e.target.value, email);
              }}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? `${id}-name-error` : undefined}
              className={inputClass(Boolean(errors.name))}
            />
          }
        />
        <Field
          id={`${id}-email`}
          label="Email"
          hint="Пришлём подтверждение и напоминания о списании."
          error={errors.email}
          input={
            <input
              ref={emailRef}
              id={`${id}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                revalidate(name, e.target.value);
              }}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={`${id}-email-hint${errors.email ? ` ${id}-email-error` : ""}`}
              className={inputClass(Boolean(errors.email))}
            />
          }
        />
      </div>

      <Button type="submit" className="mt-8 w-full">
        Вступить за {formatRub(CLUB.price)} в месяц
      </Button>
      <p className="mt-4 text-small text-ink-muted">
        Это демо: оплата не подключена, деньги не списываются. Отменить подписку можно в любой момент.
      </p>
    </form>
  );
}

function inputClass(invalid: boolean) {
  return `h-12 w-full rounded-[2px] border bg-bg px-4 text-body transition-colors focus:outline-none focus-visible:border-accent focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-accent ${
    invalid ? "border-danger" : "border-line hover:border-ink-muted"
  }`;
}

function Field({
  id,
  label,
  hint,
  error,
  input,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-small">
        {label}
      </label>
      {input}
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-small text-ink-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-small text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Success({ name }: { name: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus(), []);

  return (
    <div role="status">
      <p className="text-label uppercase text-accent">Подписка оформлена</p>
      <h3 ref={ref} tabIndex={-1} className="mt-4 text-h2 focus:outline-none">
        Добро пожаловать в клуб, {name}.
      </h3>
      <p className="mt-4 max-w-md text-ink-muted">
        Скидка 50% и бесплатная доставка уже действуют, цены в каталоге пересчитаны. О ближайшем дропе напомним
        письмом.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
        <ButtonLink href="/catalog">В каталог</ButtonLink>
        <ButtonLink href="/drops" variant="ghost">
          Ближайшие дропы
        </ButtonLink>
      </div>
    </div>
  );
}

function nextCharge(since: string): string {
  const start = new Date(since);
  const next = new Date(since);
  const now = Date.now();
  let months = 1;
  next.setUTCMonth(start.getUTCMonth() + months);
  while (next.getTime() <= now) {
    months += 1;
    next.setTime(start.getTime());
    next.setUTCMonth(start.getUTCMonth() + months);
  }
  return next.toISOString();
}

function MemberPanel({ membership, onCancel }: { membership: Membership; onCancel: () => void }) {
  const [confirming, setConfirming] = useState(false);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (confirming) confirmRef.current?.focus();
  }, [confirming]);

  return (
    <div>
      <p className="flex items-center gap-2 text-label uppercase text-accent">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
        Подписка активна
      </p>
      <h3 className="mt-4 text-h2">Вы в клубе, {membership.name}.</h3>

      <dl className="mt-8 divide-y divide-line border-y border-line text-small">
        {[
          ["Email", membership.email],
          ["В клубе с", formatDay(membership.since)],
          ["Следующее списание", `${formatDay(nextCharge(membership.since))}, ${formatRub(CLUB.price)}`],
        ].map(([term, value]) => (
          <div key={term} className="flex justify-between gap-6 py-3">
            <dt className="text-ink-muted">{term}</dt>
            <dd className="text-right">{value}</dd>
          </div>
        ))}
      </dl>

      {confirming ? (
        <div role="alertdialog" aria-labelledby="cancel-q" aria-describedby="cancel-d" className="mt-8 bg-surface p-6">
          <p id="cancel-q" className="text-body font-medium">
            Отменить подписку?
          </p>
          <p id="cancel-d" className="mt-2 text-small text-ink-muted">
            Скидка и бесплатная доставка перестанут действовать, ранний доступ к дропам закроется. В демо отмена
            срабатывает сразу.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button ref={confirmRef} variant="secondary" onClick={onCancel}>
              Да, отменить
            </Button>
            <Button onClick={() => setConfirming(false)}>Остаться в клубе</Button>
          </div>
        </div>
      ) : (
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
          <ButtonLink href="/catalog">В каталог</ButtonLink>
          <Button variant="ghost" onClick={() => setConfirming(true)}>
            Отменить подписку
          </Button>
        </div>
      )}
    </div>
  );
}
