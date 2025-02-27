"use client"

import React from "react"
import { cn } from "@/utils/functions"
import { TagsInput } from "@ark-ui/react"
import { VariantProps } from "class-variance-authority"
import { z } from "zod"
import { badgeVariants } from "../badge"
import { labelVariants } from "../label"

export const TagsInputRoot = React.forwardRef<
  React.ElementRef<typeof TagsInput.Root>,
  React.ComponentPropsWithoutRef<typeof TagsInput.Root>
>(({ editable = false, ...props }, ref) => (
  <TagsInput.Root editable={editable} {...props} ref={ref} />
))

TagsInputRoot.displayName = TagsInput.Root.displayName

export const TagsInputLabel = React.forwardRef<
  React.ElementRef<typeof TagsInput.Label>,
  React.ComponentPropsWithoutRef<typeof TagsInput.Label> &
    VariantProps<typeof labelVariants>
>(({ className, size, ...props }, ref) => (
  <TagsInput.Label
    className={cn(labelVariants({ className, size }))}
    {...props}
    ref={ref}
  />
))

TagsInputLabel.displayName = TagsInput.Label.displayName

export const TagsInputControl = React.forwardRef<
  React.ElementRef<typeof TagsInput.Control>,
  React.ComponentPropsWithoutRef<typeof TagsInput.Control> & {
    invalid?: boolean
  }
>(({ className, invalid, ...props }, ref) => (
  <TagsInput.Control
    className={cn(
      "min-h-11 bg-white border border-gray-300 focus-visible:outline-none py-2.5 px-3.5 flex flex-wrap gap-x-3 gap-y-1 items-center rounded-[5px]",
      {
        "border-error-500 focus:border-error-500": invalid,
      },
      className
    )}
    {...props}
    ref={ref}
  />
))

TagsInputControl.displayName = TagsInput.Control.displayName

export const TagsInputItem = React.forwardRef<
  React.ElementRef<typeof TagsInput.Item>,
  React.ComponentPropsWithoutRef<typeof TagsInput.Item>
>(({ className, value, ...props }, ref) => {
  return (
    <TagsInput.Item
      className={cn("group inline-flex", className)}
      {...props}
      value={value}
      ref={ref}
    />
  )
})

TagsInputItem.displayName = TagsInput.Item.displayName

export const TagsInputItemPreview = React.forwardRef<
  React.ElementRef<typeof TagsInput.ItemPreview>,
  React.ComponentPropsWithoutRef<typeof TagsInput.ItemPreview> &
    VariantProps<typeof badgeVariants>
>(({ className, size, visual, variant, ...props }, ref) => (
  <TagsInput.ItemPreview
    className={cn(
      badgeVariants({
        size,
        visual,
        variant,
      }),
      className
    )}
    {...props}
    ref={ref}
  />
))

TagsInputItemPreview.displayName = TagsInput.ItemPreview.displayName

export const TagsInputItemText = TagsInput.ItemText

export const TagsInputItemDeleteTrigger = React.forwardRef<
  React.ElementRef<typeof TagsInput.ItemDeleteTrigger>,
  React.ComponentPropsWithoutRef<typeof TagsInput.ItemDeleteTrigger>
>(({ className, ...props }, ref) => (
  <TagsInput.ItemDeleteTrigger
    className={cn("focus-visible:outline-none", className)}
    {...props}
    ref={ref}
  />
))

TagsInputItemDeleteTrigger.displayName = TagsInput.ItemDeleteTrigger.displayName

export const TagsInputItemInput = TagsInput.ItemInput

export const TagsInputInput = React.forwardRef<
  React.ElementRef<typeof TagsInput.Input>,
  React.ComponentPropsWithoutRef<typeof TagsInput.Input>
>(({ className, ...props }, ref) => (
  <TagsInput.Input
    className={cn(
      "text-base leading-6 grow text-gray-900 placeholder:text-gray-500 font-normal focus-visible:outline-none border-0 focus:ring-0 p-0 h-max",
      className
    )}
    {...props}
    ref={ref}
  />
))

TagsInputInput.displayName = TagsInput.Input.displayName

export const TagsInputClearTrigger = TagsInput.ClearTrigger

export const TagsInputContext = TagsInput.Context
