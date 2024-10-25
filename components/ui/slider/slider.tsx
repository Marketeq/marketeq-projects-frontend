"use client"

import * as React from "react"
import { cn } from "@/utils/functions"
import * as SliderPrimitive from "@radix-ui/react-slider"

const SliderRoot = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  />
))
SliderRoot.displayName = SliderPrimitive.Root.displayName

const SliderTrack = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Track>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Track>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Track
    ref={ref}
    className={cn(
      "relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200",
      className
    )}
    {...props}
  />
))

SliderTrack.displayName = "SliderTrack"

const SliderRange = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Range>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Range>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Range
    ref={ref}
    className={cn("absolute h-full bg-primary-500", className)}
    {...props}
  />
))

SliderRange.displayName = "SliderRange"

const SliderThumb = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Thumb
    className={cn(
      "block h-6 w-6 rounded-full shadow-sm border border-primary-500 bg-white focus-visible:outline-none disabled:pointer-events-none",
      className
    )}
  />
))

SliderThumb.displayName = "SliderThumb"

export { SliderRoot, SliderTrack, SliderThumb, SliderRange }
