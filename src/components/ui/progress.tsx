import * as React from "react"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    value?: number
    showValue?: boolean
  }
>(({ className, value = 0, showValue = false, ...props }, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / 100) * 100))
  return (
    <div className={cn("relative w-full", className)} ref={ref} {...props}>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-line"
        style={{ width: `${percentage}%` }}
      >
        <div
          className="h-full rounded-full bg-ink-blue transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-ink-soft font-mono">{Math.round(percentage)}%</span>}
    </div>
  )
})
Progress.displayName = "Progress"

export { Progress }
