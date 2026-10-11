"use client";

import { createLocalStore } from "@/lib/storage";

export type Membership = {
  name: string;
  email: string;
  since: string;
};

const store = createLocalStore<Membership | null>("untitled:membership", null);

export function useMembership() {
  const membership = store.useValue();
  return {
    membership,
    isMember: membership !== null,
    join(name: string, email: string) {
      store.set({ name, email, since: new Date().toISOString() });
    },
    cancel() {
      store.set(null);
    },
  };
}
