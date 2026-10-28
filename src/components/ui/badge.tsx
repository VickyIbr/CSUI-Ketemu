import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeVariant = "default" | "success" | "warning" | "danger" | "pending" | "verified"

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-paper-2 text-ink-soft",
  success: "bg-[#eaf5ef] text-success",
  warning: "bg-[#fdf4e3] text-warning",
  danger: "bg-[#fbeded] text-danger",
  pending: "bg-paper-2 text-ink-soft",
  verified: "text-success",
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-micro font-medium",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
}
