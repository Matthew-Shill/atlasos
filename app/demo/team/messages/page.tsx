"use client";

import { useMemo } from "react";
import { MessagesInbox } from "@/components/demo/messages-inbox";
import { getAssignedClientIds } from "@/lib/demo-team";
import { useDemoStore } from "@/lib/store/demo-store";

export default function TeamMessagesPage() {
  const clients = useDemoStore((s) => s.clients);
  const clientIds = useMemo(() => getAssignedClientIds(clients), [clients]);

  return (
    <MessagesInbox
      clientIds={clientIds}
      description="Conversations with clients assigned to you."
    />
  );
}
