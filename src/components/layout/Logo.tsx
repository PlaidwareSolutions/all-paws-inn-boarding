import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The brand mark. Raster artwork (not a token-driven SVG), so unlike the
 * line-mark it replaced it can't be recolored via currentColor — it carries
 * its own dark backdrop, which is why it's framed in a rounded box rather
 * than left to float directly on the page background.
 */
export function LogoBadge({ className }: { className?: string }) {
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-md", className)}>
      <Image
        src="/brand/logo-badge.png"
        alt=""
        fill
        sizes="48px"
        className="object-cover"
        priority
      />
    </span>
  );
}

export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoBadge className="size-9 lg:size-10" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.0625rem] tracking-[-0.01em] lg:text-[1.1875rem]",
            invert ? "text-bone" : "text-ink",
          )}
        >
          All Paws Inn
        </span>
        <span
          className={cn(
            "mt-1 font-mono text-[0.5625rem] uppercase tracking-[0.2em]",
            invert ? "text-bone/60" : "text-muted",
          )}
        >
          Houston, Texas
        </span>
      </span>
    </span>
  );
}
