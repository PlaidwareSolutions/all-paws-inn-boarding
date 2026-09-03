import { cn } from "@/lib/cn";

/** Used only for genuine status (availability, vaccine state) — never decoration. */
export function Pill({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: "neutral" | "good" | "warn" | "low" | "invert";
  className?: string;
}) {
  const tones = {
    neutral: "border-[var(--hairline-strong)] text-slate",
    good: "border-success/35 text-success bg-success/[0.06]",
    warn: "border-warning/40 text-warning bg-warning/[0.07]",
    low: "border-ember/40 text-ember bg-ember/[0.06]",
    invert: "border-[var(--hairline-invert)] text-bone/85",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
