"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

const control =
  "w-full rounded-sm border bg-bone px-3.5 py-3 text-[0.9375rem] text-ink " +
  "border-[var(--hairline-strong)] placeholder:text-muted/70 " +
  "transition-colors focus:border-moss focus:outline-none " +
  "focus-visible:outline-2 focus-visible:outline-ember focus-visible:outline-offset-2 min-h-11";

function Wrapper({
  label,
  hint,
  error,
  id,
  required,
  optional,
  children,
  className,
}: {
  label: string;
  hint?: string;
  error?: string;
  id: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-[0.8125rem] font-medium text-slate">
        {label}
        {required ? <span className="text-ember"> *</span> : null}
        {optional && !required ? <span className="text-muted"> (optional)</span> : null}
      </label>
      {hint ? (
        <p id={`${id}-hint`} className="-mt-1 text-[0.8125rem] text-muted">
          {hint}
        </p>
      ) : null}
      {children}
      <p aria-live="polite" className="min-h-0">
        {error ? <span className="text-[0.8125rem] text-danger">{error}</span> : null}
      </p>
    </div>
  );
}

type BaseProps = { label: string; hint?: string; error?: string; className?: string; optional?: boolean };

export function TextField({
  label,
  hint,
  error,
  className,
  optional,
  ...rest
}: BaseProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <Wrapper label={label} hint={hint} error={error} id={id} required={rest.required} optional={optional} className={className}>
      <input
        id={id}
        aria-invalid={!!error}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={cn(control, error && "border-danger")}
        {...rest}
      />
    </Wrapper>
  );
}

export function TextArea({
  label,
  hint,
  error,
  className,
  optional,
  ...rest
}: BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId();
  return (
    <Wrapper label={label} hint={hint} error={error} id={id} required={rest.required} optional={optional} className={className}>
      <textarea
        id={id}
        rows={4}
        aria-invalid={!!error}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={cn(control, "resize-y", error && "border-danger")}
        {...rest}
      />
    </Wrapper>
  );
}

export function SelectField({
  label,
  hint,
  error,
  className,
  optional,
  children,
  ...rest
}: BaseProps & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId();
  return (
    <Wrapper label={label} hint={hint} error={error} id={id} required={rest.required} optional={optional} className={className}>
      <select
        id={id}
        aria-invalid={!!error}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={cn(control, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 8%22><path fill=%22%237A7267%22 d=%22M1 1.5 6 6.5l5-5%22/></svg>')] bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10", error && "border-danger")}
        {...rest}
      >
        {children}
      </select>
    </Wrapper>
  );
}

export function CheckField({
  label,
  description,
  className,
  ...rest
}: { label: React.ReactNode; description?: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = useId();
  return (
    <div className={cn("flex gap-3", className)}>
      <input
        id={id}
        type="checkbox"
        className="mt-0.5 size-5 shrink-0 accent-moss"
        {...rest}
      />
      <label htmlFor={id} className="text-[0.9375rem] leading-snug text-slate">
        {label}
        {description ? <span className="mt-1 block text-[0.8125rem] text-muted">{description}</span> : null}
      </label>
    </div>
  );
}
