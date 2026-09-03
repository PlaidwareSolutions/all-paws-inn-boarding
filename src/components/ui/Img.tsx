import NextImage from "next/image";
import type { ImageAsset } from "@/lib/images";
import { cn } from "@/lib/cn";

/**
 * Every image is cropped by its frame, never by layout shift.
 * `alt` is always written per call site — the manifest description is a fallback only.
 */
export function Img({
  asset,
  alt,
  className,
  sizes = "100vw",
  priority = false,
  fetchPriority,
}: {
  asset: ImageAsset;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
}) {
  return (
    <NextImage
      src={asset.src}
      alt={alt}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={asset.blurDataURL}
      priority={priority}
      fetchPriority={fetchPriority}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
