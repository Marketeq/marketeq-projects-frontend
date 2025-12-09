import React from "react"
import {


  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DisclosureContent,
  DisclosureTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  ErrorMessage,
  HeadlessRadioGroupItem,
  HelperText,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Label,
  Listbox,
  ListboxButton,
  ListboxContent,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemSelector,
  ScrollArea,
  ScrollBar,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  inputVariants,
} from "@/components/ui"
import { useControllableState } from "@/utils/hooks"

export default function RmDialog ({
  trigger,
  open,
  onOpenChange,
  title,
  description,
  onRemove,
}: {
  trigger?: (options: {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
  }) => React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  onRemove?: () => void
})  {
  const [state, setState] = useControllableState({
    value: open,
    onChange: onOpenChange,
    defaultValue: false,
  })
  return (
    <Dialog open={state} onOpenChange={setState}>
      {trigger?.({ isOpen: state, setIsOpen: setState })}

      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-y-2">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button variant="outlined" visual="gray">
              Cancel
            </Button>
          </DialogClose>
          <Button visual="error" onClick={onRemove}>
            Yes, Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}