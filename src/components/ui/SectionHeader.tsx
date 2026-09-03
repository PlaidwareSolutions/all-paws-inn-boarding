import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  invert = false,
  className,
  level = 2,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? "h2" : "h3";
  return (
    <Reveal className={cn(align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p className={cn("eyebrow mb-5", invert && "!text-sage")}>{eyebrow}</p>
      ) : null}
      <Heading
        className={cn(
          "text-(length:--text-display-3)",
          align === "center" && "mx-auto",
          align === "center" && "max-w-[20ch]",
        )}
      >
        {title}
      </Heading>
      {lead ? (
        <p
          className={cn(
            "mt-6 text-(length:--text-lead) leading-[1.55]",
            invert ? "text-bone/72" : "text-slate",
            align === "center" ? "mx-auto max-w-[56ch]" : "max-w-[54ch]",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
