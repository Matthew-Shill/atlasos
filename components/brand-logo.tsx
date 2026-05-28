import Image from "next/image";
import { BRAND_LOGO_SRC } from "@/lib/company-logos";
import { cn } from "@/lib/utils";

export function BrandLogo({
  size = 40,
  className,
  priority,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={BRAND_LOGO_SRC}
      alt="AtlasOS"
      width={size}
      height={size}
      priority={priority}
      className={cn("shrink-0 rounded-lg bg-white object-contain", className)}
    />
  );
}
