"use client";

import { useEffect, useMemo, useState } from "react";
import { useDemoStore } from "@/lib/store/demo-store";
import { PageHeader } from "@/components/demo/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatRelative } from "@/lib/format";
import { toast } from "sonner";
import { Inbox, Paperclip, Send } from "lucide-react";

function isStaffSender(senderId: string) {
  return senderId.startsWith("tm") || senderId === "tm-1";
}

export function MessagesInbox({
  description = "Client conversations, team notes, and system alerts in one inbox.",
  clientIds,
  perspective = "staff",
  portalClientId,
  initialClientId,
  showResolve = true,
  singleThread = false,
}: {
  description?: string;
  /** When set, only threads for these clients are shown */
  clientIds?: string[];
  perspective?: "staff" | "client";
  portalClientId?: string;
  initialClientId?: string;
  showResolve?: boolean;
  /** Client portal: hide thread list when only one conversation */
  singleThread?: boolean;
}) {
  const allThreads = useDemoStore((s) => s.messageThreads);
  const sendMessage = useDemoStore((s) => s.sendMessage);
  const markThreadRead = useDemoStore((s) => s.markThreadRead);
  const ensureClientThread = useDemoStore((s) => s.ensureClientThread);
  const markResolved = useDemoStore((s) => s.markThreadResolved);
  const messages = useDemoStore((s) => s.messages);
  const portalClient = useDemoStore((s) =>
    portalClientId ? s.getClient(portalClientId) : undefined
  );

  const threads = useMemo(() => {
    if (!clientIds?.length) return allThreads;
    const allowed = new Set(clientIds);
    return allThreads.filter((t) => t.clientId && allowed.has(t.clientId));
  }, [allThreads, clientIds]);

  const [activeId, setActiveId] = useState("");
  const [draft, setDraft] = useState("");

  useEffect(() => {
    setActiveId((prev) => {
      if (prev && threads.some((t) => t.id === prev)) return prev;
      return threads[0]?.id ?? "";
    });
  }, [threads]);

  useEffect(() => {
    if (!initialClientId || perspective !== "staff") return;
    const threadId = ensureClientThread(initialClientId);
    if (threadId) {
      setActiveId(threadId);
    }
  }, [initialClientId, perspective, ensureClientThread]);

  const active = threads.find((t) => t.id === activeId);
  const msgs = useMemo(
    () =>
      messages
        .filter((m) => m.threadId === activeId)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()),
    [messages, activeId]
  );

  const unreadCount = threads.filter((t) => t.unread > 0).length;

  useEffect(() => {
    if (!activeId || perspective !== "staff") return;
    const thread = threads.find((t) => t.id === activeId);
    if (thread?.unread && thread.unread > 0) {
      markThreadRead(activeId);
    }
  }, [activeId, perspective, threads, markThreadRead]);

  const messageAlign = (senderId: string) => {
    if (perspective === "client" && portalClientId) {
      const isMine = senderId === portalClientId;
      return isMine ? "client" : "staff";
    }
    const staff = isStaffSender(senderId);
    return staff ? "staff" : "client";
  };

  const handleSend = () => {
    if (!active || !draft.trim()) return;
    if (perspective === "client" && portalClient) {
      sendMessage(active.id, draft, portalClient.name, portalClient.id);
    } else {
      sendMessage(active.id, draft, "Jordan Lee", "tm-2");
    }
    setDraft("");
    toast.success("Message sent");
  };

  return (
    <>
      <PageHeader
        eyebrow="Communication"
        title="Messages"
        description={description}
      />
      <div className="atlas-panel flex h-[calc(100vh-14rem)] min-h-[480px] overflow-hidden">
        {!singleThread && (
          <div className="flex w-full max-w-sm shrink-0 flex-col border-r border-indigo-100 bg-gradient-to-b from-indigo-50 to-violet-50/50">
            <div className="flex items-center gap-2 border-b border-indigo-100 bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 text-white">
              <Inbox className="h-4 w-4" />
              <span className="text-sm font-bold">Inbox</span>
              <Badge variant="secondary" className="ml-auto text-xs">
                {unreadCount} unread
              </Badge>
            </div>
            <ScrollArea className="flex-1">
              {threads.length === 0 ? (
                <p className="p-4 text-sm text-muted-foreground">No conversations yet.</p>
              ) : (
                threads.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveId(t.id)}
                    className={cn(
                      "w-full border-b border-border/40 p-4 text-left transition-colors",
                      activeId === t.id
                        ? "bg-card shadow-[inset_3px_0_0_0_var(--primary)]"
                        : "hover:bg-card/60"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-sm truncate">{t.clientName}</span>
                      {t.unread > 0 && (
                        <Badge className="h-5 min-w-5 shrink-0 justify-center px-1.5">
                          {t.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-xs font-medium text-muted-foreground">
                      {t.subject}
                    </p>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground/80">
                      {t.lastMessage}
                    </p>
                    {t.label && (
                      <Badge variant="outline" className="mt-2 text-[10px] font-normal">
                        {t.label}
                      </Badge>
                    )}
                  </button>
                ))
              )}
            </ScrollArea>
          </div>
        )}
        <div className="flex flex-1 flex-col bg-card">
          {active ? (
            <>
              <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
                <div>
                  <h2 className="font-semibold">
                    {perspective === "client" ? active.subject : active.clientName}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {perspective === "client"
                      ? `With ${active.clientName === portalClient?.name ? "Northline Studio" : active.clientName}`
                      : active.subject}
                  </p>
                </div>
                {showResolve && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      markResolved(active.id);
                      toast.success("Marked resolved");
                    }}
                  >
                    Mark resolved
                  </Button>
                )}
              </div>
              <ScrollArea className="flex-1 p-5">
                <div className="space-y-4">
                  {msgs.map((m) => {
                    const align = messageAlign(m.senderId);
                    const isRight = align === "staff" && perspective === "staff"
                      || align === "client" && perspective === "client";
                    return (
                      <div
                        key={m.id}
                        className={cn(
                          "max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm",
                          isRight
                            ? "ml-auto bg-primary text-primary-foreground"
                            : "bg-muted/60 ring-1 ring-border/50"
                        )}
                      >
                        <p className="text-xs font-medium opacity-80 mb-1">
                          {m.senderName}
                        </p>
                        <p className="leading-relaxed">{m.body}</p>
                        <p className="mt-1.5 text-[10px] opacity-70">
                          {formatRelative(m.createdAt)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              <div className="border-t border-border/60 bg-muted/20 p-4">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => toast.info("File attached (demo)")}
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className="bg-card"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && draft.trim()) handleSend();
                    }}
                  />
                  <Button onClick={handleSend}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <p className="p-8 text-muted-foreground">
              {threads.length === 0
                ? "No messages yet. Your team will reach out here."
                : "Select a conversation"}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
