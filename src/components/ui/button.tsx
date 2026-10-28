import * as React from "react"
import { cn } from "@/lib/utils"

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive" | "highlight"
type ButtonSize = "default" | "sm" | "lg" | "icon"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-ink-blue text-white hover:bg-ink-blue/90",
  secondary: "bg-paper border border-line text-ink hover:border-line-strong",
  ghost: "text-ink-blue hover:bg-ink-blue-soft",
  destructive: "bg-paper border border-danger text-danger hover:bg-danger/5",
  highlight: "bg-highlighter text-ink hover:bg-highlighter/90",
}

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-10 px-4 text-body-sm",
  sm: "h-8 px-3 text-caption",
  lg: "h-12 px-6 text-body",
  icon: "h-10 w-10",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-blue focus-visible:ring-offset-2",
          "disabled:opacity-45 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"
