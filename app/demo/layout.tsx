"use client";

import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useDemoStore } from "@/lib/store/demo-store";
import type { UserRole } from "@/lib/types";

export default function DemoLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const setRole = useDemoStore((s) => s.setRole);

  useEffect(() => {
    let role: UserRole = "owner";
    if (pathname.startsWith("/demo/client")) role = "client";
    else if (pathname.startsWith("/demo/team")) role = "team";
    else if (pathname.startsWith("/demo/owner")) role = "owner";
    setRole(role);
  }, [pathname, setRole]);

  return <>{children}</>;
}
