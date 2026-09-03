import { cn } from "@/lib/cn";

type Tone = "bone" | "parchment" | "linen" | "moss" | "mossDeep" | "none";
type Rhythm = "tight" | "default" | "loose" | "none";

const tones: Record<Tone, string> = {
  bone: "bg-bone text-ink",
  parchment: "bg-parchment text-ink",
  linen: "bg-linen text-ink",
  moss: "bg-moss text-bone",
  mossDeep: "bg-moss-deep text-bone",
  none: "",
};

/* Deliberate variation in section rhythm keeps the page from feeling
   like a stack of equal blocks. */
const rhythms: Record<Rhythm, string> = {
  tight: "py-[clamp(3.5rem,2rem+5vw,5.5rem)]",
  default: "py-[clamp(5rem,2.5rem+8vw,10rem)]",
  loose: "py-[clamp(6.5rem,3rem+11vw,13rem)]",
  none: "",
};

export function Section({
  children,
  tone = "bone",
  rhythm = "default",
  className,
  id,
  as: Tag = "section",
  ...rest
}: {
  children: React.ReactNode;
  tone?: Tone;
  rhythm?: Rhythm;
  className?: string;
  id?: string;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag id={id} className={cn(tones[tone], rhythms[rhythm], className)} {...rest}>
      {children}
    </Tag>
  );
}
