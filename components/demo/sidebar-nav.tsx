"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  clientNavGroups,
  ownerNavGroups,
  teamNavGroups,
  type NavGroup,
} from "@/lib/nav-config";
import { resolvePortalClientId } from "@/lib/client-portal";
import { getAssignedClientIds } from "@/lib/demo-team";
import { useDemoStore } from "@/lib/store/demo-store";
import { cn } from "@/lib/utils";

function navLabel(href: string, baseLabel: string, unreadCount: number) {
  if (href.endsWith("/messages")) {
    return unreadCount > 0 ? `Messages (${unreadCount})` : "Messages";
  }
  return baseLabel;
}

function isActive(pathname: string, href: string) {
  if (href === "/demo/owner") return pathname === "/demo/owner";
  if (href === "/demo/team") return pathname === "/demo/team";
  if (href === "/demo/client") return pathname === "/demo/client";
  return pathname.startsWith(href);
}

function NavGroups({
  groups,
  variant,
}: {
  groups: NavGroup[];
  variant: "owner" | "team" | "client";
}) {
  const pathname = usePathname();
  const messageThreads = useDemoStore((s) => s.messageThreads);
  const clients = useDemoStore((s) => s.clients);
  const portalClientId = useDemoStore((s) => s.currentClientId);

  const unreadCount = useMemo(() => {
    if (variant === "team") {
      const assigned = new Set(getAssignedClientIds(clients));
      return messageThreads
        .filter((t) => t.clientId && assigned.has(t.clientId))
        .reduce((sum, t) => sum + t.unread, 0);
    }
    if (variant === "client") {
      const effectiveId = resolvePortalClientId(clients, portalClientId);
      return messageThreads
        .filter((t) => t.clientId === effectiveId)
        .reduce((sum, t) => sum + t.unread, 0);
    }
    return messageThreads.reduce((sum, t) => sum + t.unread, 0);
  }, [variant, messageThreads, clients, portalClientId]);

  return (
    <div className="flex flex-col gap-6 px-3 py-4">
      {groups.map((group) => (
        <div key={group.label}>
          <p className="mb-2 px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-indigo-200/90">
            {group.label}
          </p>
          <ul className="flex flex-col gap-1">
            {group.items.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
                      active
                        ? "atlas-nav-active"
                        : "text-indigo-100 hover:bg-white/15 hover:text-white"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        active ? "text-indigo-600" : "text-indigo-300"
                      )}
                      strokeWidth={active ? 2.5 : 2}
                    />
                    <span className="flex-1">
                      {navLabel(item.href, item.label, unreadCount)}
                    </span>
                    {item.badge && !active && (
                      <span className="rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-bold text-amber-950">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function SidebarNav({ variant }: { variant: "owner" | "team" | "client" }) {
  const groups =
    variant === "owner"
      ? ownerNavGroups
      : variant === "team"
        ? teamNavGroups
        : clientNavGroups;

  return <NavGroups groups={groups} variant={variant} />;
}
