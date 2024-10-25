"use client"

import React from "react"
import { cn } from "@/utils/functions"
import { Star } from "@blend-metrics/icons"
import { Toggle } from "@/components/ui"

const Favorite = React.forwardRef<
  React.ElementRef<typeof Toggle>,
  React.ComponentPropsWithoutRef<typeof Toggle> & { starClassName?: string }
>(({ className, starClassName, ...props }) => {
  return (
    <Toggle
      className={cn(
        "group text-gray-300 flex-none hover:text-gray-500 h-6 w-6 inline-flex items-center justify-center fill-white focus-visible:outline-none data-[state=on]:text-primary-500 data-[state=on]:hover:text-primary-500 data-[state=on]:fill-primary-500",
        className
      )}
      {...props}
    >
      <Star className={cn("h-6 w-6 fill-inherit", starClassName)} />
    </Toggle>
  )
})

Favorite.displayName = "Favorite"

export { Favorite }
