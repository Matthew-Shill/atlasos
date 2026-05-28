"use client";

import { MessagesInbox } from "@/components/demo/messages-inbox";
import { usePortalClient } from "@/lib/client-portal";

export default function ClientMessagesPage() {
  const { clientId } = usePortalClient();

  return (
    <MessagesInbox
      clientIds={[clientId]}
      perspective="client"
      portalClientId={clientId}
      showResolve={false}
      singleThread
      description="Message your Northline Studio team."
    />
  );
}
