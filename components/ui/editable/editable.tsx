"use client"

import React from "react"
import { callAll, cn } from "@/utils/functions"
import { useControllableState } from "@/utils/hooks"
import { createContext } from "@/utils/react-utils"
import { Edit3 } from "@blend-metrics/icons"
import { WithoutChildren } from "@/types/react"

const [EditableProvider, useEditableContext] = createContext<{
  id: string
  value: string
  onValueChange: (value: string) => void
}>({
  displayName: "EditableContext",
})

const Editable = React.forwardRef<
  React.ElementRef<"div">,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string
    onValueChange?: (value: string) => void
  }
>(({ className, value, onValueChange, ...props }, ref) => {
  const id = React.useId()
  const [state, setState] = useControllableState({
    value,
    onChange: onValueChange,
    defaultValue: "",
  })
  return (
    <EditableProvider
      value={{
        id,
        value: state,
        onValueChange: setState,
      }}
    >
      <div
        className={cn("relative group min-w-[100px] max-w-[200px]", className)}
        ref={ref}
        {...props}
      />
    </EditableProvider>
  )
})

Editable.displayName = "Editable"

const EditableContent = React.forwardRef<
  React.ElementRef<"input">,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">
>(({ className, ...props }, ref) => {
  const { id, value, onValueChange } = useEditableContext()
  return (
    <input
      id={id}
      className={cn(
        "border-0 w-full p-0 text-sm font-semibold leading-6 border-b-[1.5px] text-gray-black border-transparent h-7 pr-6 focus:ring-0 group-hover:border-gray-200 focus:border-transparent",
        className
      )}
      spellCheck="false"
      autoComplete="false"
      {...props}
      value={value}
      onChange={(event) => onValueChange(event.target.value)}
      ref={ref}
    />
  )
})

EditableContent.displayName = "EditableContent"

const EditableIcon = React.forwardRef<
  React.ElementRef<"label">,
  WithoutChildren<React.LabelHTMLAttributes<HTMLLabelElement>>
>(({ className, ...props }, ref) => {
  const { id } = useEditableContext()
  return (
    <label
      htmlFor={id}
      ref={ref}
      className={cn(
        "absolute inset-y-0 opacity-0 group-hover:opacity-100 transition duration-300 text-gray-black h-4 w-4 my-auto right-0",
        className
      )}
      {...props}
    >
      <Edit3 className="h-4 w-4" />
    </label>
  )
})

EditableIcon.displayName = "EditableIcon"

export { Editable, EditableContent, EditableIcon }
