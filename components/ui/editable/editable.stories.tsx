import React from "react"
import { Meta } from "@storybook/react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui"
import { Editable, EditableContent, EditableIcon } from "./editable"

const meta: Meta = {
  title: "Marketeq-Projects/Editable",
  parameters: {
    layout: "centered",
  },
}

export default meta

export const Default = () => {
  const [value, setValue] = React.useState("")

  return (
    <TooltipProvider delayDuration={75}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Editable value={value} onValueChange={setValue}>
            <EditableContent />
            <EditableIcon />
          </Editable>
        </TooltipTrigger>
        <TooltipContent align="center" sideOffset={2} className="font-semibold">
          Rename
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
