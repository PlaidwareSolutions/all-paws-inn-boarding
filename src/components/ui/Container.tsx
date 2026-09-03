import { cn } from "@/lib/cn";

type Width = "default" | "wide" | "narrow" | "prose";

const widths: Record<Width, string> = {
  default: "max-w-[1280px]",
  wide: "max-w-[1460px]",
  narrow: "max-w-[900px]",
  prose: "max-w-[68ch]",
};

export function Container({
  children,
  width = "default",
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  width?: Width;
  className?: string;
  as?: React.ElementType;
}) {
  return (
    <Tag className={cn("mx-auto w-full px-(--spacing-gutter)", widths[width], className)}>
      {children}
    </Tag>
  );
}
