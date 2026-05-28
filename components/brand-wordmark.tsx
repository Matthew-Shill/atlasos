import { cn } from "@/lib/utils";

const sizes = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
} as const;

export function BrandWordmark({
  size = "lg",
  className,
  onDark = false,
}: {
  size?: keyof typeof sizes;
  className?: string;
  /** Lighter OS color on purple sidebar */
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "atlas-brand-wordmark",
        sizes[size],
        onDark && "atlas-brand-wordmark--on-dark",
        className
      )}
    >
      <span className="atlas-brand-wordmark-atlas">Atlas</span>
      <span className="atlas-brand-wordmark-os">OS</span>
    </span>
  );
}
