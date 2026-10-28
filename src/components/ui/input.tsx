import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-line bg-paper px-3 py-2 text-body-sm text-ink",
          "placeholder:text-ink-soft/60",
          "focus-visible:outline-none focus-visible:border-ink-blue focus-visible:ring-2 focus-visible:ring-[rgba(29,63,209,0.18)]",
          "disabled:cursor-not-allowed disabled:opacity-45",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
