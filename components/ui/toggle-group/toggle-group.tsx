import React from "react"
import { cn } from "@/utils/functions"
import { ToggleGroup } from "@ark-ui/react"

export const ToggleGroupRoot = React.forwardRef<
  React.ElementRef<typeof ToggleGroup.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup.Root>
>(({ className, ...props }, ref) => (
  <ToggleGroup.Root
    className={cn(
      "flex items-center border shrink-0 border-gray-200 divide-x divide-gray-200 rounded-[5px] overflow-hidden",
      className
    )}
    {...props}
    ref={ref}
  />
))

ToggleGroupRoot.displayName = "ToggleGroup"

export const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroup.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroup.Item>
>(({ className, ...props }, ref) => (
  <ToggleGroup.Item
    className={cn(
      "size-[30px] lg:size-10 focus-visible:outline-none shrink-0 inline-flex items-center justify-center text-dark-blue-800 bg-gray-100 data-[focus]:bg-white data-[state=on]:bg-white",
      className
    )}
    {...props}
    ref={ref}
  />
))

ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup }
