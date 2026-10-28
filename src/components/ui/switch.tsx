import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn("peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-line transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-ink-blue", className)}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn("pointer-events-none block h-5 w-5 rounded-full bg-paper shadow-lg ring-0 transition-transform duration-200 data-[state=checked]:translate-x-5")}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName

export { Switch }
