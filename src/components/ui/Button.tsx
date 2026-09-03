import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "onDark" | "onDarkGhost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-medium " +
  "transition-colors duration-200 ease-out disabled:opacity-45 disabled:pointer-events-none " +
  "text-center leading-tight";

const variants: Record<Variant, string> = {
  primary: "bg-moss text-bone hover:bg-moss-soft",
  secondary: "bg-transparent text-ink border border-[var(--hairline-strong)] hover:border-ink hover:bg-ink/[0.03]",
  ghost: "bg-transparent text-ink hover:bg-ink/[0.05]",
  onDark: "bg-bone text-ink hover:bg-linen",
  onDarkGhost: "bg-transparent text-bone border border-[var(--hairline-invert)] hover:border-bone hover:bg-bone/10",
};

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3.5 text-[0.8125rem]",
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-[3.25rem] px-7 text-base",
};

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, variant = "primary", size = "md", className, href, ...rest }: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (href) {
    const external = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
