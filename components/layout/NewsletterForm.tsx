"use client";

import { useId, useState, type FormEvent } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!value) return setError("Укажите email");
    if (!EMAIL_RE.test(value)) return setError("Проверьте адрес: похоже, в нём опечатка");
    setError(null);
    setDone(true);
  }

  if (done) {
    return (
      <p role="status" className="text-body">
        Готово. Первое письмо придёт перед следующим дропом.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <label htmlFor={`${id}-email`} className="mb-3 block text-small text-ink-muted">
        Письмо о дропах и новых вещах. Не чаще раза в две недели.
      </label>
      <div className="flex border-b border-ink focus-within:border-accent">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-12 min-w-0 flex-1 bg-transparent text-body placeholder:text-ink-muted focus:outline-none"
        />
        <button type="submit" className="h-12 pl-4 text-small font-medium">
          Подписаться
        </button>
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-2 text-small text-danger">
          {error}
        </p>
      ) : null}
    </form>
  );
}
