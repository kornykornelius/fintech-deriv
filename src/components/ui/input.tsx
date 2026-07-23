import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Marks the field invalid: error border, error focus ring, aria-invalid. */
  invalid?: boolean;
}

export function Input({ invalid, className, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={cn(
        "flex h-10 w-full rounded-md border border-border bg-surface px-3 text-body text-foreground transition-colors",
        "placeholder:text-muted-foreground",
        "hover:border-border-strong",
        "focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/25",
        "disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-muted-foreground disabled:hover:border-border",
        "aria-invalid:border-error aria-invalid:focus:border-error aria-invalid:focus:ring-error/25",
        className,
      )}
      {...props}
    />
  );
}
