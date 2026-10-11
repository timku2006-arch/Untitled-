"use client";

import { useSyncExternalStore } from "react";

/**
 * Небольшое хранилище поверх localStorage для useSyncExternalStore.
 * Если localStorage недоступен (приватный режим, запрет), значение живёт в памяти вкладки.
 */
export function createLocalStore<T>(key: string, fallback: T) {
  const listeners = new Set<() => void>();
  let memoryRaw: string | null = null;
  let cachedRaw: string | null | undefined;
  let cached: T = fallback;

  function readRaw(): string | null {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return memoryRaw;
    }
  }

  function get(): T {
    const raw = readRaw();
    if (raw !== cachedRaw) {
      cachedRaw = raw;
      try {
        cached = raw ? (JSON.parse(raw) as T) : fallback;
      } catch {
        cached = fallback;
      }
    }
    return cached;
  }

  function set(value: T) {
    const raw = value === null || value === undefined ? null : JSON.stringify(value);
    memoryRaw = raw;
    try {
      if (raw === null) window.localStorage.removeItem(key);
      else window.localStorage.setItem(key, raw);
    } catch {
      // остаёмся на значении в памяти
    }
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key === key) listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  function useValue(): T {
    return useSyncExternalStore(subscribe, get, () => fallback);
  }

  return { get, set, useValue };
}

/** true только после гидрации — для элементов, которые не должны мигать на сервере. */
const noopSubscribe = () => () => {};
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
