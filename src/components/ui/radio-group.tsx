import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupPrimitive.RadioGroupProps
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    className={cn("flex w-full flex-col space-y-1", className)}
    {...props}
  />
))
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupPrimitive.RadioGroupItemProps
>(({ className, ...props }, ref) => (
  <RadioGroupPrimitive.Item
    ref={ref}
    className={cn("flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-line ring-offset-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-ink-blue data-[state=checked]:bg-ink-blue", className)}
    {...props}
  >
    <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
      <Circle className="h-2.5 w-2.5 fill-current" />
    </RadioGroupPrimitive.Indicator>
  </RadioGroupPrimitive.Item>
))
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
