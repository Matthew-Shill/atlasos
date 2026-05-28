"use client";

import { useMemo } from "react";
import { useDemoStore } from "@/lib/store/demo-store";
import {
  DEFAULT_CLIENT_ID,
  SARAH_CLIENT_ID,
} from "@/lib/data/seed";
import type { Client } from "@/lib/types";

export function resolvePortalClientId(
  clients: Client[],
  currentClientId: string | null
): string {
  if (clients.some((c) => c.id === SARAH_CLIENT_ID)) return SARAH_CLIENT_ID;
  return currentClientId || DEFAULT_CLIENT_ID;
}

export function usePortalClient() {
  const clients = useDemoStore((s) => s.clients);
  const currentClientId = useDemoStore((s) => s.currentClientId);
  const clientId = useMemo(
    () => resolvePortalClientId(clients, currentClientId),
    [clients, currentClientId]
  );
  const client = useDemoStore((s) => s.getClient(clientId));
  return { clientId, client };
}
