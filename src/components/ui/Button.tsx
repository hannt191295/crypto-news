import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-lg px-4 py-2 text-sm font-medium transition",
        variant === "primary" &&
          "bg-purple-600 text-white hover:bg-purple-700",
        variant === "ghost" &&
          "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
