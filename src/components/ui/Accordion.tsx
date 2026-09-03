"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";

export type AccordionItem = { question: string; answer: React.ReactNode };

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className={cn("border-t border-[var(--hairline)]", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const btnId = `${baseId}-btn-${i}`;
        return (
          <div key={item.question} className="border-b border-[var(--hairline)]">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-ember"
              >
                <span className="font-display text-(length:--text-title-2) leading-snug">
                  {item.question}
                </span>
                <span aria-hidden className="mt-1 shrink-0 text-muted">
                  {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-7 pr-10 text-slate leading-[1.65] max-w-[64ch]"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
