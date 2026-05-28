"use client";

import Image from "next/image";
import { BRAND_LOGO_SRC } from "@/lib/company-logos";
import { cn } from "@/lib/utils";

/** Small logo slot — always uses AtlasOS Icon */
export function CompanyLogo({
  name,
  size = 36,
  className,
}: {
  clientId: string;
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={BRAND_LOGO_SRC}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={cn("rounded-lg object-contain bg-white ring-1 ring-border/60", className)}
    />
  );
}
