import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type AvatarVariant = "light" | "dark";
export type AvatarSize = "md" | "lg";

const variantClasses: Record<AvatarVariant, string> = {
  light: "bg-surface-subtle text-foreground",
  dark: "bg-secondary-foreground text-inverse-foreground",
};

const sizeClasses: Record<AvatarSize, string> = {
  md: "h-12 w-12 text-body",
  lg: "h-14 w-14 text-h4",
};

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  initials: string;
  variant?: AvatarVariant;
  size?: AvatarSize;
}

export function Avatar({
  initials,
  variant = "light",
  size = "md",
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-md font-bold",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {initials}
    </div>
  );
}
