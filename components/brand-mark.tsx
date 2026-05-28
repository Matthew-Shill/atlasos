import { BrandLogo } from "@/components/brand-logo";
import { BrandWordmark } from "@/components/brand-wordmark";
import { cn } from "@/lib/utils";

export function BrandMark({
  iconSize = 40,
  wordmarkSize = "lg",
  subtitle,
  subtitleClassName,
  className,
  iconClassName,
  priority,
  onDark = false,
}: {
  iconSize?: number;
  wordmarkSize?: "sm" | "md" | "lg" | "xl";
  subtitle?: string;
  subtitleClassName?: string;
  className?: string;
  iconClassName?: string;
  priority?: boolean;
  onDark?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <BrandLogo
        size={iconSize}
        className={cn("rounded-xl", iconClassName)}
        priority={priority}
      />
      <div className="min-w-0 leading-tight">
        <BrandWordmark size={wordmarkSize} onDark={onDark} />
        {subtitle ? (
          <span
            className={cn(
              "mt-0.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-200",
              subtitleClassName
            )}
          >
            {subtitle}
          </span>
        ) : null}
      </div>
    </div>
  );
}
