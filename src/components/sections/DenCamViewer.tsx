"use client";

import Link from "next/link";
import { useState } from "react";
import { Lock } from "lucide-react";
import { cameras } from "@/data/cameras";
import { Img } from "@/components/ui/Img";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

/**
 * An honest viewer. The frame is labelled as a sample rather than dressed up
 * as a live feed, and the signed-out state shows what you would be getting.
 */
export function DenCamViewer() {
  const [active, setActive] = useState(0);
  const cam = cameras[active]!;

  return (
    <div className="border border-[var(--hairline-strong)] bg-bone">
      <div className="relative">
        <div className="frame aspect-16/9 w-full">
          <Img asset={cam.image} alt={cam.alt} sizes="(max-width: 1024px) 92vw, 62vw" />
        </div>

        {/* Signed-out overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/72 p-6 text-center">
          <span className="inline-flex size-12 items-center justify-center rounded-sm border border-[var(--hairline-invert)] text-bone">
            <Lock size={20} aria-hidden />
          </span>
          <p className="mt-5 font-display text-[1.5rem] text-bone">Sign in to watch</p>
          <p className="mt-2.5 max-w-[38ch] text-[0.875rem] leading-snug text-bone/70">
            Cameras are open to guests with an animal staying. Yard cameras run{" "}
            {cameras[0]!.hours.toLowerCase()}; the room cameras are on all night.
          </p>
          <Link
            href="/portal"
            className="mt-6 inline-flex min-h-11 items-center rounded-sm bg-bone px-6 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-linen"
          >
            Open the Guest Portal
          </Link>
        </div>

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Pill tone="invert">
            <span className="size-1.5 rounded-full bg-ember" aria-hidden /> Sample frame
          </Pill>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 border-y border-[var(--hairline)] px-5 py-3">
        <div>
          <p className="font-display text-[1.125rem] leading-none">{cam.name}</p>
          <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-muted">
            {cam.where}
          </p>
        </div>
        <p className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-slate">
          {cam.hours}
        </p>
      </div>

      <div role="tablist" aria-label="Cameras" className="grid grid-cols-2 sm:grid-cols-4">
        {cameras.map((c, i) => (
          <button
            key={c.slug}
            role="tab"
            aria-selected={i === active}
            onClick={() => setActive(i)}
            className={cn(
              "flex flex-col gap-2 border-b border-r border-[var(--hairline)] p-3 text-left transition-colors last:border-r-0",
              i === active ? "bg-parchment" : "hover:bg-parchment/60",
            )}
          >
            <span className="frame aspect-16/9 w-full">
              <Img asset={c.image} alt="" sizes="160px" className={i === active ? "" : "opacity-60"} />
            </span>
            <span className="font-mono text-[0.5625rem] uppercase leading-tight tracking-[0.1em] text-slate">
              {c.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
