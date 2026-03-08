import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface BadgeProps {
  variant?: "purple" | "yellow";
  className?: string;
  children: ReactNode;
}

export function Badge({ variant = "purple", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variant === "purple" && "bg-purple-600 text-white",
        variant === "yellow" && "bg-yellow-400 text-purple-900",
        className,
      )}
    >
      {children}
    </span>
  );
}
