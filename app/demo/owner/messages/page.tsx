import { MessagesInbox } from "@/components/demo/messages-inbox";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string }>;
}) {
  const params = await searchParams;
  return <MessagesInbox initialClientId={params.clientId} />;
}
