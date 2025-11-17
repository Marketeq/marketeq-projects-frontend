import { SVGProps, useState } from "react"
import { cn } from "@/utils/functions"
import {
  ArrowDown,
  ArrowUp,
  BarChart10,
  Check,
  ChevronDown,
  Columns03,
  Copy02,
  Dataflow02,
  Dataflow03,
  Edit03,
  EyeOff,
  File02,
  File06,
  Image as ImageIcon,
  List,
  MapPin,
  MessageSquare,
  MessageSquare01,
  Mic,
  Monitor02,
  PlaySquare,
  Plus,
  Smile,
  Trash01,
  Type02,
  Upload,
  Users03,
  X,
} from "@blend-metrics/icons"
import { Meta } from "@storybook/react"
import {
  Bold,
  Italic,
  OrderedList,
  StrikeThrough,
  ToCenter,
  ToLeft,
  ToRight,
  Underline,
  UnorderedList,
} from "@/components/icons/editing-icons"
import { Grid01 } from "@/components/icons/grid-01"
import NextImage from "@/components/next-image"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
  EditableArea,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRoot,
  HeadlessSelectIcon,
  HeadlessSelectTrigger,
  IconButton,
  PictureEditor,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui"

const meta: Meta = {
  title: "Case Study Builder Comps",
}

export default meta

export const Toolbar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("inline-flex flex-col", className)}>
      <div className="py-1.5 px-1 bg-black border-b inline-flex justify-center items-center border-white/20 rounded-t-[7px]">
        <button className="inline-block focus-visible:outline-none opacity-40 hover:opacity-100 transition duration-300">
          <Grid01 className="text-white" />
        </button>
      </div>
      <div className="p-[7px] rounded-b-[7px] bg-black inline-flex flex-col gap-y-[7px]">
        <button className="size-[52.3px] flex flex-col items-center shrink-0 opacity-50 focus-visible:outline-none hover:border hover:border-white/30 hover:bg-white/10 hover:opacity-100 rounded-[5px] transition duration-300 justify-center">
          <Type02 className="size-6 text-white" />
          <span className="text-[9px] leading-none font-semibold text-white">
            Text
          </span>
        </button>
        <button className="size-[52.3px] flex flex-col items-center shrink-0 opacity-50 focus-visible:outline-none hover:border hover:border-white/30 hover:bg-white/10 hover:opacity-100 rounded-[5px] transition duration-300 justify-center">
          <Picture className="size-6 text-white" />
          <span className="text-[9px] leading-none font-semibold text-white">
            Image
          </span>
        </button>
        <button className="size-[52.3px] flex flex-col items-center shrink-0 opacity-50 focus-visible:outline-none hover:border hover:border-white/30 hover:bg-white/10 hover:opacity-100 rounded-[5px] transition duration-300 justify-center">
          <Columns03 className="size-6 text-white" />
          <span className="text-[9px] leading-none font-semibold text-white">
            Columns
          </span>
        </button>
        <button className="size-[52.3px] flex flex-col items-center shrink-0 opacity-50 focus-visible:outline-none hover:border hover:border-white/30 hover:bg-white/10 hover:opacity-100 rounded-[5px] transition duration-300 justify-center">
          <PlaySquare className="size-6 text-white" />
          <span className="text-[9px] leading-none font-semibold text-white">
            Video
          </span>
        </button>
        <button className="size-[52.3px] flex flex-col items-center shrink-0 opacity-50 focus-visible:outline-none hover:border hover:border-white/30 hover:bg-white/10 hover:opacity-100 rounded-[5px] transition duration-300 justify-center">
          <Smile className="size-6 text-white" />
          <span className="text-[9px] leading-none font-semibold text-white">
            Emoji
          </span>
        </button>
      </div>
    </div>
  )
}

export const BlockToolbar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "inline-flex rounded-[5px] bg-white border-gray-300 border divide-x divide-gray-300 shadow-[0px_1px_2px_0px_rgba(16,24,40,.05)]",
        className
      )}
    >
      <button className="first:rounded-l-[5px] last:rounded-r-[5px] focus-visible:outline-none inline-flex items-center size-9 shrink-0 text-gray-500 justify-center hover:bg-gray-100 hover:text-gray-950">
        <ArrowUp className="size-4" />
      </button>
      <button className="first:rounded-l-[5px] last:rounded-r-[5px] focus-visible:outline-none inline-flex items-center size-9 shrink-0 text-gray-500 justify-center hover:bg-gray-100 hover:text-gray-950">
        <ArrowDown className="size-4" />
      </button>
      <button className="first:rounded-l-[5px] last:rounded-r-[5px] focus-visible:outline-none inline-flex items-center size-9 shrink-0 text-gray-500 justify-center hover:bg-gray-100 hover:text-gray-950">
        <EyeOff className="size-4" />
      </button>
      <button className="first:rounded-l-[5px] last:rounded-r-[5px] focus-visible:outline-none inline-flex items-center size-9 shrink-0 text-gray-500 justify-center hover:bg-gray-100 hover:text-gray-950">
        <Copy02 className="size-4" />
      </button>
      <button className="first:rounded-l-[5px] last:rounded-r-[5px] focus-visible:outline-none inline-flex items-center size-9 shrink-0 text-error-500 justify-center hover:bg-error-100 hover:text-error-600">
        <Trash01 className="size-4" />
      </button>
    </div>
  )
}

export const BlockImageToolbar = ({
  className,
  onAddImage,
  onRemove,
  onEdit,
}: {
  className?: string
  onAddImage: () => void
  onRemove: () => void
  onEdit: () => void
}) => {
  const [open, setOpen] = useState(false)
  return (
    <div
      className={cn(
        "inline-flex rounded-[5px] bg-white border-gray-300 border divide-x divide-gray-300 shadow-[0px_1px_2px_0px_rgba(16,24,40,.05)]",
        className
      )}
    >
      <button
        onClick={onEdit}
        className="first:rounded-l-[5px] last:rounded-r-[5px] focus-visible:outline-none inline-flex items-center size-9 shrink-0 text-gray-500 justify-center hover:bg-gray-100 hover:text-gray-950"
      >
        <Edit03 className="size-4" />
      </button>
      <button
        className="first:rounded-l-[5px] last:rounded-r-[5px] px-2.5 focus-visible:outline-none text-xs leading-5 font-semibold inline-flex items-center gap-x-2 h-9 shrink-0 text-gray-500 justify-center hover:bg-gray-100 hover:text-gray-950"
        onClick={onAddImage}
      >
        <Upload className="size-4" /> Add Image
      </button>
      <button
        className="first:rounded-l-[5px] last:rounded-r-[5px] focus-visible:outline-none inline-flex items-center size-9 shrink-0 text-error-500 justify-center hover:bg-error-100 hover:text-error-600"
        onClick={() => setOpen(true)}
      >
        <Trash01 className="size-4" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[409px] p-0">
          <div className="p-6 border-b border-gray-200">
            <DialogTitle>Delete this image?</DialogTitle>
            <DialogDescription className="mt-2">
              Your image will be removed permanently.
            </DialogDescription>
          </div>
          <div className="py-4 flex rounded-b-xl bg-gray-25 items-center justify-between px-6">
            <DialogClose asChild>
              <Button
                className="opacity-50 hover:opacity-100"
                visual="gray"
                variant="link"
              >
                <X className="size-[15px]" />
                Cancel
              </Button>
            </DialogClose>

            <Button
              variant="outlined"
              visual="gray"
              onClick={() => {
                onRemove()
                setOpen(false)
              }}
            >
              Yes, Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export const ToBeAdded = () => {
  return (
    <div className="flex items-center">
      <div className="h-0.5 flex-auto bg-gray-200" />
      <button className="size-[41px] shrink-0 focus-visible:outline-none rounded-full inline-flex justify-center items-center border-2 bg-gray-100 hover:bg-white text-gray-500 border-gray-300 hover:border-gray-400 shadow-[0px_4px_8px_-2px_rgba(16,24,40,.1)] transition duration-300">
        <Plus className="size-5" />
      </button>
      <div className="h-0.5 flex-auto bg-gray-200" />
    </div>
  )
}

export const FlexibleToolbar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "h-[41px] p-2 bg-black rounded-lg border-1 border-gray-800 inline-flex items-center shrink-0 shadow-[0px_10px_13.33px_-3.33px_rgba(16,24,40,.08)]",
        className
      )}
    >
      <div className="first:pl-0 px-2 last:pr-0">
        <Select defaultValue="Normal Heading">
          <HeadlessSelectTrigger className="flex text-xs leading-none whitespace-nowrap text-white hover:text-white/75 data-[state=open]:text-white shrink-0 h-[25px] rounded-[4px] bg-white/15 hover:bg-white/15 transition duration-300 data-[state=open]:bg-white/15 data-[placeholder]:bg-transparent data-[placeholder]:text-white/50 focus-visible:outline-none px-2 items-center gap-x-1">
            <SelectValue defaultValue="Select a country" />
            <HeadlessSelectIcon>
              <ChevronDown className="size-[13.33px]" />
            </HeadlessSelectIcon>
          </HeadlessSelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Large Heading">Large Heading</SelectItem>
              <SelectItem value="Normal Heading">Normal Heading</SelectItem>
              <SelectItem value="Small Heading">Small Heading</SelectItem>
              <SelectItem value="Bold Statement">Bold Statement</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <span className="h-4 inline-block w-px bg-white/20" />
      <div className="first:pl-0 inline-flex px-2 last:pr-0 items-center gap-x-1">
        <TooltipProvider delayDuration={75}>
          <Tooltip>
            <Toggle asChild>
              <TooltipTrigger className="inline-flex h-[25px] shrink-0 focus-visible:outline-none justify-center items-center rounded-[4px] hover:bg-white/15 data-[state=on]:bg-white/15 text-gray-50/50 hover:text-white/75 data-[state=on]:text-white data-[state=on]:hover:text-white transition duration-300">
                <Bold />
              </TooltipTrigger>
            </Toggle>
            <TooltipContent side="top" visual="white" sideOffset={9.14}>
              Bold ⌘U
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={75}>
          <Tooltip>
            <Toggle asChild>
              <TooltipTrigger className="inline-flex h-[25px] shrink-0 focus-visible:outline-none justify-center items-center rounded-[4px] hover:bg-white/15 data-[state=on]:bg-white/15 text-gray-50/50 hover:text-white/75 data-[state=on]:text-white data-[state=on]:hover:text-white transition duration-300">
                <Italic />
              </TooltipTrigger>
            </Toggle>
            <TooltipContent side="top" visual="white" sideOffset={9.14}>
              Italic ⌘I
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={75}>
          <Tooltip>
            <Toggle asChild>
              <TooltipTrigger className="inline-flex h-[25px] shrink-0 focus-visible:outline-none justify-center items-center rounded-[4px] hover:bg-white/15 data-[state=on]:bg-white/15 text-gray-50/50 hover:text-white/75 data-[state=on]:text-white data-[state=on]:hover:text-white transition duration-300">
                <Underline />
              </TooltipTrigger>
            </Toggle>
            <TooltipContent side="top" visual="white" sideOffset={9.14}>
              Underline ⌘U
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={75}>
          <Tooltip>
            <Toggle asChild>
              <TooltipTrigger className="inline-flex h-[25px] shrink-0 focus-visible:outline-none justify-center items-center rounded-[4px] hover:bg-white/15 data-[state=on]:bg-white/15 text-gray-50/50 hover:text-white/75 data-[state=on]:text-white data-[state=on]:hover:text-white transition duration-300">
                <StrikeThrough />
              </TooltipTrigger>
            </Toggle>
            <TooltipContent side="top" visual="white" sideOffset={9.14}>
              Strikethrough ⌘S
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span className="h-4 inline-block w-px bg-white/20" />
      <div className="first:pl-0 inline-flex px-2 last:pr-0 items-center gap-x-1">
        <TooltipProvider delayDuration={75}>
          <Tooltip>
            <Toggle asChild>
              <TooltipTrigger className="inline-flex h-[25px] shrink-0 focus-visible:outline-none justify-center items-center rounded-[4px] hover:bg-white/15 data-[state=on]:bg-white/15 text-gray-50/50 hover:text-white/75 data-[state=on]:text-white data-[state=on]:hover:text-white transition duration-300">
                <ToLeft />
              </TooltipTrigger>
            </Toggle>
            <TooltipContent side="top" visual="white" sideOffset={9.14}>
              Left Align ⌘+Shift+L
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={75}>
          <Tooltip>
            <Toggle asChild>
              <TooltipTrigger className="inline-flex h-[25px] shrink-0 focus-visible:outline-none justify-center items-center rounded-[4px] hover:bg-white/15 data-[state=on]:bg-white/15 text-gray-50/50 hover:text-white/75 data-[state=on]:text-white data-[state=on]:hover:text-white transition duration-300">
                <ToCenter />
              </TooltipTrigger>
            </Toggle>
            <TooltipContent side="top" visual="white" sideOffset={9.14}>
              Center Align ⌘+Shift+C
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={75}>
          <Tooltip>
            <Toggle asChild>
              <TooltipTrigger className="inline-flex h-[25px] shrink-0 focus-visible:outline-none justify-center items-center rounded-[4px] hover:bg-white/15 data-[state=on]:bg-white/15 text-gray-50/50 hover:text-white/75 data-[state=on]:text-white data-[state=on]:hover:text-white transition duration-300">
                <ToRight />
              </TooltipTrigger>
            </Toggle>
            <TooltipContent side="top" visual="white" sideOffset={9.14}>
              Right Align ⌘+Shift+R
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <span className="h-4 inline-block w-px bg-white/20" />
      <div className="first:pl-0 inline-flex px-2 last:pr-0 items-center gap-x-1">
        <TooltipProvider delayDuration={75}>
          <Tooltip>
            <Toggle asChild>
              <TooltipTrigger className="inline-flex h-[25px] shrink-0 focus-visible:outline-none justify-center items-center rounded-[4px] hover:bg-white/15 data-[state=on]:bg-white/15 text-gray-50/50 hover:text-white/75 data-[state=on]:text-white data-[state=on]:hover:text-white transition duration-300">
                <UnorderedList />
              </TooltipTrigger>
            </Toggle>
            <TooltipContent side="top" visual="white" sideOffset={9.14}>
              Bullet List ⌘L
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={75}>
          <Tooltip>
            <Toggle asChild>
              <TooltipTrigger className="inline-flex h-[25px] shrink-0 focus-visible:outline-none justify-center items-center rounded-[4px] hover:bg-white/15 data-[state=on]:bg-white/15 text-gray-50/50 hover:text-white/75 data-[state=on]:text-white data-[state=on]:hover:text-white transition duration-300">
                <OrderedList />
              </TooltipTrigger>
            </Toggle>
            <TooltipContent side="top" visual="white" sideOffset={9.14}>
              Ordered List ⌘O
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}

export const InitialBlock = () => {
  return (
    <div className="border border-gray-200 p-[100px] bg-white rounded-[10px] flex flex-col gap-y-[100px]">
      <div className="space-y-3">
        <h1 className="text-[64px] leading-none text-dark-blue-400 font-semibold">
          Your Case Study Title
        </h1>
        <p className="text-2xl leading-none font-light text-dark-blue-400">
          Write what into this design or add any details you want to mention
        </p>
      </div>

      <div className="border-2 border-dashed text-gray-200 cursor-pointer data-[state=active]:bg-gray-100 bg-gray-50 p-6 rounded-[8px]">
        <div className="p-6">
          <div className="max-w-[206px] mx-auto">
            <h3 className="text-base text-center leading-6 font-medium text-gray-900">
              Drag Your Fields Here
            </h3>
            <p className="text-xs text-center leading-none mt-0.5 text-gray-500">
              No fields have been added yet. Let’s add some fields now.
            </p>
          </div>

          <div className="flex items-center justify-center mt-5">
            <Button className="bg-white" variant="outlined" visual="gray">
              <Plus className="size-[15px]" /> Add New Block
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const TemplateDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-white" variant="outlined" visual="gray">
          <Plus className="size-[15px]" /> Add New Block
        </Button>
      </DialogTrigger>
      <DialogContent
        dialogOverlay={<DialogOverlay className="blur-lg" />}
        className="max-w-[875px] p-0"
      >
        <div className="pl-6 p-3 flex items-center justify-between border-b border-gray-200">
          <h1 className="text-lg leading-7 font-semibold text-dark-blue-400">
            Select your section
          </h1>

          <IconButton className="text-gray-500" variant="ghost" visual="gray">
            <X className="size-5" />
          </IconButton>
        </div>
        <div className="p-6 grid grid-cols-4 gap-3">
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <File02 className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Introduction
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <Type02 className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Bold Statement
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <Picture className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Gallery
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <List className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Challenges
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <Dataflow02 className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Process
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <ImageIcon className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Process
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <Mic className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Interview
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <Users03 className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Personas
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <PlaySquare className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Video
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <Dataflow03 className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Customer Journey
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <MessageSquare className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Testimonial
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <ImageIcon className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Image & Text
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <BarChart10 className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Result Metrics
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <Monitor02 className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Prototype
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <File06 className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Conclusion
            </span>
          </button>
          <button className="group p-5 focus-visible:outline-none flex flex-col items-center gap-y-3 rounded-lg border-2 border-transparent transition duration-300 hover:bg-primary-25 hover:border-primary-500">
            <Columns03 className="size-[25.2px] text-gray-500 group-hover:text-primary-500 shrink-0" />
            <span className="inline-block text-[17.74px] text-gray-500 group-hover:text-primary-500 font-medium leading-none">
              Custom Columns
            </span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const Addened = ({ className }: { className?: string }) => {
  return (
    <div className={cn("h-[402px] relative inline-flex", className)}>
      <div className="w-1 rounded-full bg-primary-500" />
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
        <button className="rounded-full focus-visible:outline-none transition duration-300 hover:bg-white hover:text-primary-500 bg-primary-500 shrink-0 text-white size-[25px] inline-flex items-center justify-center">
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  )
}

const Picture = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={84}
    height={76}
    viewBox="0 0 84 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.952 65.638 38.04 44.75c1.386-1.254 2.08-1.88 2.878-2.116a3.85 3.85 0 0 1 2.164 0c.799.235 1.492.862 2.878 2.116L68.894 65.5M49 47.5l10.04-9.084c1.386-1.254 2.08-1.881 2.878-2.116a3.85 3.85 0 0 1 2.164 0c.799.235 1.492.862 2.878 2.116L77 47.5m-42-19c0 3.498-3.134 6.333-7 6.333s-7-2.835-7-6.333 3.134-6.333 7-6.333 7 2.835 7 6.333m-11.2 38h36.4c5.88 0 8.82 0 11.067-1.035 1.976-.911 3.582-2.365 4.589-4.152C77 59.28 77 56.62 77 51.3V24.7c0-5.32 0-7.98-1.144-10.013-1.007-1.787-2.613-3.24-4.59-4.152C69.022 9.5 66.082 9.5 60.2 9.5H23.8c-5.88 0-8.82 0-11.067 1.035-1.976.911-3.582 2.365-4.589 4.152C7 16.72 7 19.38 7 24.7v26.6c0 5.32 0 7.98 1.144 10.013 1.007 1.787 2.613 3.24 4.59 4.152C14.978 66.5 17.918 66.5 23.8 66.5"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const BlockWithCols = () => {
  return (
    <div className="relative group/root border border-gray-200 p-[100px] bg-white rounded-[10px] flex flex-col gap-y-[100px]">
      <Toolbar className="top-[50px] absolute -right-[33px]" />

      <div className="space-y-3">
        <h1 className="group/block relative font-semibold">
          <span className="absolute -inset-5 group-hover/block:inline-block group-focus-within/block:inline-block opacity-0 hidden group-hover/block:opacity-100 group-focus-within/block:opacity-100 transition duration-300 border-2 rounded-lg border-primary-500 group-hover/block:bg-primary-500/5 group-focus-within/block:bg-transparent group-hover/block:group-focus-within/block:bg-transparent group-hover/block:border-primary-200">
            <span className="absolute left-0 invisible transition-[visibility] duration-300 group-focus-within/block:invisible group-hover/block:visible -top-[22px] text-xs text-primary-500 leading-none font-medium group-hover/block:group-focus-within/block:invisible">
              Text
            </span>
            <BlockToolbar className="-top-[18px] -right-[17px] absolute group-focus-within/block:visible invisible transition-[visibility] duration-300" />
            <FlexibleToolbar className="absolute left-0 -top-[60.14px] group-focus-within/block:visible invisible transition-[visibility] duration-300" />
          </span>
          <EditableRoot
            className="relative"
            defaultValue="Your Case Study Title"
          >
            <EditableLabel>Title</EditableLabel>
            <EditableArea>
              <EditableInput
                asChild
                className="bg-transparent py-2 w-full first-line:inline-block placeholder:text-dark-blue-400 group-data-[placeholder-shown]/area:text-dark-blue-400 min-h-[64px] [field-sizing:content] resize-none scrollbar-none text-[64px] leading-none font-semibold text-dark-blue-400"
              >
                <textarea />
              </EditableInput>
              <EditablePreview className=" group-data-[placeholder-shown]/area:text-dark-blue-400 text-[64px] leading-none font-semibold text-dark-blue-400" />
            </EditableArea>
          </EditableRoot>
        </h1>
        <p className="group/block relative">
          <span className="absolute -inset-5 group-hover/block:inline-block group-focus-within/block:inline-block opacity-0 hidden group-hover/block:opacity-100 group-focus-within/block:opacity-100 transition duration-300 border-2 rounded-lg border-primary-500 group-hover/block:bg-primary-500/5 group-focus-within/block:bg-transparent group-hover/block:group-focus-within/block:bg-transparent group-hover/block:border-primary-200">
            <span className="absolute left-0 invisible transition-[visibility] duration-300 group-focus-within/block:invisible group-hover/block:visible -top-[22px] text-xs text-primary-500 leading-none font-medium group-hover/block:group-focus-within/block:invisible">
              Text
            </span>
            <BlockToolbar className="-top-[18px] -right-[17px] absolute group-focus-within/block:visible invisible transition-[visibility] duration-300" />
            <FlexibleToolbar className="absolute left-0 -top-[60.14px] group-focus-within/block:visible invisible transition-[visibility] duration-300" />
          </span>
          <EditableRoot
            className="relative"
            defaultValue="Write what into this design or add any details you want to mention"
          >
            <EditableLabel>Sub Title</EditableLabel>
            <EditableArea>
              <EditableInput
                asChild
                className="bg-transparent py-2 w-full first-line:inline-block placeholder:text-dark-blue-400 group-data-[placeholder-shown]/area:text-dark-blue-400 min-h-[24px] [field-sizing:content] resize-none scrollbar-none text-2xl leading-none font-light text-dark-blue-400"
              >
                <textarea />
              </EditableInput>
              <EditablePreview className=" group-data-[placeholder-shown]/area:text-dark-blue-400 text-2xl leading-none font-light text-dark-blue-400" />
            </EditableArea>
          </EditableRoot>
        </p>
      </div>

      <div className="relative group">
        <h1 className="relative group/block">
          <span className="absolute -inset-5 group-hover/block:inline-block group-focus-within/block:inline-block opacity-0 hidden group-hover/block:opacity-100 group-focus-within/block:opacity-100 transition duration-300 border-2 rounded-lg border-primary-500 group-hover/block:bg-primary-500/5 group-focus-within/block:bg-transparent group-hover/block:group-focus-within/block:bg-transparent group-hover/block:border-primary-200">
            <span className="absolute left-0 invisible transition-[visibility] duration-300 group-focus-within/block:invisible group-hover/block:visible -top-[22px] text-xs text-primary-500 leading-none font-medium group-hover/block:group-focus-within/block:invisible">
              Text
            </span>
            <BlockToolbar className="-top-[18px] -right-[17px] absolute group-focus-within/block:visible invisible transition-[visibility] duration-300" />
            <FlexibleToolbar className="absolute left-0 -top-[60.14px] group-focus-within/block:visible invisible transition-[visibility] duration-300" />
          </span>
          <EditableRoot
            className="relative"
            defaultValue="These are your columns"
          >
            <EditableLabel>These are your columns</EditableLabel>
            <EditableArea>
              <EditableInput
                asChild
                className="bg-transparent py-2 w-full first-line:inline-block placeholder:text-dark-blue-400 group-data-[placeholder-shown]/area:text-dark-blue-400 min-h-[40px] [field-sizing:content] resize-none scrollbar-none text-[40px] leading-none font-semibold text-dark-blue-400"
              >
                <textarea />
              </EditableInput>
              <EditablePreview className=" group-data-[placeholder-shown]/area:text-dark-blue-400 text-[40px] leading-none font-semibold text-dark-blue-400" />
            </EditableArea>
          </EditableRoot>
        </h1>
        <BlockToolbar className="-top-[18px] -right-[17px] absolute hidden opacity-0 group-focus-within:group-hover:hidden group-focus-within:group-hover:opacity-0 group-hover:inline-flex group-hover:opacity-100 transition duration-300" />

        <div className="relative mt-8 grid grid-cols-3 gap-x-[--gap] [--cols:3] [--gap:50px]">
          <article>
            <PictureEditor
              startingPoint={({ dataUrl, open, style, onRemove, onEdit }) => (
                <div className="overflow-hidden relative group/image h-[250px] bg-gray-100 grid rounded-lg place-items-center hover:bg-black/20 hover:ring-2 hover:ring-primary-500 transition duration-300">
                  {dataUrl ? (
                    <div
                      className="size-full rounded-lg transform"
                      style={style}
                    >
                      <img
                        src={dataUrl}
                        aria-label="Picture"
                        className="absolute object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <>
                      <Picture className="w-[84px] shrink-0 h-[76px] text-gray-300 group-hover/image:text-white" />
                    </>
                  )}
                  <BlockImageToolbar
                    className="top-5 left-5 absolute hidden opacity-0 group-hover/image:inline-flex group-hover/image:opacity-100 transition duration-300"
                    onAddImage={open}
                    onRemove={onRemove}
                    onEdit={onEdit}
                  />
                </div>
              )}
            />
            <div className="mt-6">
              <h1 className="relative group/block">
                <span className="absolute -inset-5 group-hover/block:inline-block group-focus-within/block:inline-block opacity-0 hidden group-hover/block:opacity-100 group-focus-within/block:opacity-100 transition duration-300 border-2 rounded-lg border-primary-500 group-hover/block:bg-primary-500/5 group-focus-within/block:bg-transparent group-hover/block:group-focus-within/block:bg-transparent group-hover/block:border-primary-200">
                  <span className="absolute left-0 invisible transition-[visibility] duration-300 group-focus-within/block:invisible group-hover/block:visible -top-[22px] text-xs text-primary-500 leading-none font-medium group-hover/block:group-focus-within/block:invisible">
                    Text
                  </span>
                  <BlockToolbar className="-top-[18px] -right-[17px] absolute group-focus-within/block:visible invisible transition-[visibility] duration-300" />
                  <FlexibleToolbar className="absolute left-0 -top-[60.14px] group-focus-within/block:visible invisible transition-[visibility] duration-300" />
                </span>
                <EditableRoot
                  className="relative"
                  defaultValue="This is your heading"
                >
                  <EditableLabel>Title</EditableLabel>
                  <EditableArea>
                    <EditableInput
                      asChild
                      className="bg-transparent py-2 w-full first-line:inline-block placeholder:text-dark-blue-400 group-data-[placeholder-shown]/area:text-dark-blue-400 min-h-[24px] [field-sizing:content] resize-none scrollbar-none text-2xl leading-none font-semibold text-dark-blue-400"
                    >
                      <textarea />
                    </EditableInput>
                    <EditablePreview className=" group-data-[placeholder-shown]/area:text-dark-blue-400 text-2xl leading-none font-semibold text-dark-blue-400" />
                  </EditableArea>
                </EditableRoot>
              </h1>
              <p className="relative group/block mt-3">
                <span className="absolute -inset-5 group-hover/block:inline-block group-focus-within/block:inline-block opacity-0 hidden group-hover/block:opacity-100 group-focus-within/block:opacity-100 transition duration-300 border-2 rounded-lg border-primary-500 group-hover/block:bg-primary-500/5 group-focus-within/block:bg-transparent group-hover/block:group-focus-within/block:bg-transparent group-hover/block:border-primary-200">
                  <span className="absolute left-0 invisible transition-[visibility] duration-300 group-focus-within/block:invisible group-hover/block:visible -top-[22px] text-xs text-primary-500 leading-none font-medium group-hover/block:group-focus-within/block:invisible">
                    Text
                  </span>
                  <BlockToolbar className="-top-[18px] -right-[17px] absolute group-focus-within/block:visible invisible transition-[visibility] duration-300" />
                  <FlexibleToolbar className="absolute left-0 -top-[60.14px] group-focus-within/block:visible invisible transition-[visibility] duration-300" />
                </span>
                <EditableRoot
                  className="relative"
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                >
                  <EditableLabel>Sub Title</EditableLabel>
                  <EditableArea>
                    <EditableInput
                      asChild
                      className="bg-transparent py-2 w-full first-line:inline-block placeholder:text-dark-blue-400 group-data-[placeholder-shown]/area:text-dark-blue-400 min-h-[24px] [field-sizing:content] resize-none scrollbar-none text-2xl leading-none font-light text-dark-blue-400"
                    >
                      <textarea />
                    </EditableInput>
                    <EditablePreview className=" group-data-[placeholder-shown]/area:text-dark-blue-400 text-2xl leading-none font-light text-dark-blue-400" />
                  </EditableArea>
                </EditableRoot>
              </p>
            </div>
          </article>
          <div className="absolute w-[--gap] group/gap flex justify-center inset-y-0 left-[calc(calc(calc(calc(theme(size.full)-calc(var(--gap)*calc(var(--cols)-1)))/var(--cols))*var(--pos))+calc(var(--gap)*calc(var(--pos)-1)))] [--pos:1]">
            <Addened className="h-full group-hover/gap:visible invisible transition-[visibility] duration-300" />
          </div>
          <article>
            <PictureEditor
              startingPoint={({ dataUrl, open, style, onRemove, onEdit }) => (
                <div className="overflow-hidden relative group/image h-[250px] bg-gray-100 grid rounded-lg place-items-center hover:bg-black/20 hover:ring-2 hover:ring-primary-500 transition duration-300">
                  {dataUrl ? (
                    <div
                      className="size-full rounded-lg transform"
                      style={style}
                    >
                      <img
                        src={dataUrl}
                        aria-label="Picture"
                        className="absolute object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <>
                      <Picture className="w-[84px] shrink-0 h-[76px] text-gray-300 group-hover/image:text-white" />
                    </>
                  )}
                  <BlockImageToolbar
                    className="top-5 left-5 absolute hidden opacity-0 group-hover/image:inline-flex group-hover/image:opacity-100 transition duration-300"
                    onAddImage={open}
                    onRemove={onRemove}
                    onEdit={onEdit}
                  />
                </div>
              )}
            />
            <div className="mt-6">
              <h1 className="relative group/block">
                <span className="absolute -inset-5 group-hover/block:inline-block group-focus-within/block:inline-block opacity-0 hidden group-hover/block:opacity-100 group-focus-within/block:opacity-100 transition duration-300 border-2 rounded-lg border-primary-500 group-hover/block:bg-primary-500/5 group-focus-within/block:bg-transparent group-hover/block:group-focus-within/block:bg-transparent group-hover/block:border-primary-200">
                  <span className="absolute left-0 invisible transition-[visibility] duration-300 group-focus-within/block:invisible group-hover/block:visible -top-[22px] text-xs text-primary-500 leading-none font-medium group-hover/block:group-focus-within/block:invisible">
                    Text
                  </span>
                  <BlockToolbar className="-top-[18px] -right-[17px] absolute group-focus-within/block:visible invisible transition-[visibility] duration-300" />
                  <FlexibleToolbar className="absolute left-0 -top-[60.14px] group-focus-within/block:visible invisible transition-[visibility] duration-300" />
                </span>
                <EditableRoot
                  className="relative"
                  defaultValue="This is your heading"
                >
                  <EditableLabel>Title</EditableLabel>
                  <EditableArea>
                    <EditableInput
                      asChild
                      className="bg-transparent py-2 w-full first-line:inline-block placeholder:text-dark-blue-400 group-data-[placeholder-shown]/area:text-dark-blue-400 min-h-[24px] [field-sizing:content] resize-none scrollbar-none text-2xl leading-none font-semibold text-dark-blue-400"
                    >
                      <textarea />
                    </EditableInput>
                    <EditablePreview className=" group-data-[placeholder-shown]/area:text-dark-blue-400 text-2xl leading-none font-semibold text-dark-blue-400" />
                  </EditableArea>
                </EditableRoot>
              </h1>
              <p className="relative group/block mt-3">
                <span className="absolute -inset-5 group-hover/block:inline-block group-focus-within/block:inline-block opacity-0 hidden group-hover/block:opacity-100 group-focus-within/block:opacity-100 transition duration-300 border-2 rounded-lg border-primary-500 group-hover/block:bg-primary-500/5 group-focus-within/block:bg-transparent group-hover/block:group-focus-within/block:bg-transparent group-hover/block:border-primary-200">
                  <span className="absolute left-0 invisible transition-[visibility] duration-300 group-focus-within/block:invisible group-hover/block:visible -top-[22px] text-xs text-primary-500 leading-none font-medium group-hover/block:group-focus-within/block:invisible">
                    Text
                  </span>
                  <BlockToolbar className="-top-[18px] -right-[17px] absolute group-focus-within/block:visible invisible transition-[visibility] duration-300" />
                  <FlexibleToolbar className="absolute left-0 -top-[60.14px] group-focus-within/block:visible invisible transition-[visibility] duration-300" />
                </span>
                <EditableRoot
                  className="relative"
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                >
                  <EditableLabel>Sub Title</EditableLabel>
                  <EditableArea>
                    <EditableInput
                      asChild
                      className="bg-transparent py-2 w-full first-line:inline-block placeholder:text-dark-blue-400 group-data-[placeholder-shown]/area:text-dark-blue-400 min-h-[24px] [field-sizing:content] resize-none scrollbar-none text-2xl leading-none font-light text-dark-blue-400"
                    >
                      <textarea />
                    </EditableInput>
                    <EditablePreview className=" group-data-[placeholder-shown]/area:text-dark-blue-400 text-2xl leading-none font-light text-dark-blue-400" />
                  </EditableArea>
                </EditableRoot>
              </p>
            </div>
          </article>
          <div className="absolute w-[--gap] group/gap flex justify-center inset-y-0 left-[calc(calc(calc(calc(theme(size.full)-calc(var(--gap)*calc(var(--cols)-1)))/var(--cols))*var(--pos))+calc(var(--gap)*calc(var(--pos)-1)))] [--pos:2]">
            <Addened className="h-full group-hover/gap:visible invisible transition-[visibility] duration-300" />
          </div>
          <article>
            <PictureEditor
              startingPoint={({ dataUrl, open, style, onRemove, onEdit }) => (
                <div className="overflow-hidden relative group/image h-[250px] bg-gray-100 grid rounded-lg place-items-center hover:bg-black/20 hover:ring-2 hover:ring-primary-500 transition duration-300">
                  {dataUrl ? (
                    <div
                      className="size-full rounded-lg transform"
                      style={style}
                    >
                      <img
                        src={dataUrl}
                        aria-label="Picture"
                        className="absolute object-contain rounded-lg"
                      />
                    </div>
                  ) : (
                    <>
                      <Picture className="w-[84px] shrink-0 h-[76px] text-gray-300 group-hover/image:text-white" />
                    </>
                  )}
                  <BlockImageToolbar
                    className="top-5 left-5 absolute hidden opacity-0 group-hover/image:inline-flex group-hover/image:opacity-100 transition duration-300"
                    onAddImage={open}
                    onRemove={onRemove}
                    onEdit={onEdit}
                  />
                </div>
              )}
            />

            <div className="mt-6">
              <h1 className="relative group/block">
                <span className="absolute -inset-5 group-hover/block:inline-block group-focus-within/block:inline-block opacity-0 hidden group-hover/block:opacity-100 group-focus-within/block:opacity-100 transition duration-300 border-2 rounded-lg border-primary-500 group-hover/block:bg-primary-500/5 group-focus-within/block:bg-transparent group-hover/block:group-focus-within/block:bg-transparent group-hover/block:border-primary-200">
                  <span className="absolute left-0 invisible transition-[visibility] duration-300 group-focus-within/block:invisible group-hover/block:visible -top-[22px] text-xs text-primary-500 leading-none font-medium group-hover/block:group-focus-within/block:invisible">
                    Text
                  </span>
                  <BlockToolbar className="-top-[18px] -right-[17px] absolute group-focus-within/block:visible invisible transition-[visibility] duration-300" />
                  <FlexibleToolbar className="absolute left-0 -top-[60.14px] group-focus-within/block:visible invisible transition-[visibility] duration-300" />
                </span>
                <EditableRoot
                  className="relative"
                  defaultValue="This is your heading"
                >
                  <EditableLabel>Title</EditableLabel>
                  <EditableArea>
                    <EditableInput
                      asChild
                      className="bg-transparent py-2 w-full first-line:inline-block placeholder:text-dark-blue-400 group-data-[placeholder-shown]/area:text-dark-blue-400 min-h-[24px] [field-sizing:content] resize-none scrollbar-none text-2xl leading-none font-semibold text-dark-blue-400"
                    >
                      <textarea />
                    </EditableInput>
                    <EditablePreview className=" group-data-[placeholder-shown]/area:text-dark-blue-400 text-2xl leading-none font-semibold text-dark-blue-400" />
                  </EditableArea>
                </EditableRoot>
              </h1>
              <p className="relative group/block mt-3">
                <span className="absolute -inset-5 group-hover/block:inline-block group-focus-within/block:inline-block opacity-0 hidden group-hover/block:opacity-100 group-focus-within/block:opacity-100 transition duration-300 border-2 rounded-lg border-primary-500 group-hover/block:bg-primary-500/5 group-focus-within/block:bg-transparent group-hover/block:group-focus-within/block:bg-transparent group-hover/block:border-primary-200">
                  <span className="absolute left-0 invisible transition-[visibility] duration-300 group-focus-within/block:invisible group-hover/block:visible -top-[22px] text-xs text-primary-500 leading-none font-medium group-hover/block:group-focus-within/block:invisible">
                    Text
                  </span>
                  <BlockToolbar className="-top-[18px] -right-[17px] absolute group-focus-within/block:visible invisible transition-[visibility] duration-300" />
                  <FlexibleToolbar className="absolute left-0 -top-[60.14px] group-focus-within/block:visible invisible transition-[visibility] duration-300" />
                </span>
                <EditableRoot
                  className="relative"
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor"
                >
                  <EditableLabel>Sub Title</EditableLabel>
                  <EditableArea>
                    <EditableInput
                      asChild
                      className="bg-transparent py-2 w-full first-line:inline-block placeholder:text-dark-blue-400 group-data-[placeholder-shown]/area:text-dark-blue-400 min-h-[24px] [field-sizing:content] resize-none scrollbar-none text-2xl leading-none font-light text-dark-blue-400"
                    >
                      <textarea />
                    </EditableInput>
                    <EditablePreview className=" group-data-[placeholder-shown]/area:text-dark-blue-400 text-2xl leading-none font-light text-dark-blue-400" />
                  </EditableArea>
                </EditableRoot>
              </p>
            </div>
          </article>
        </div>
      </div>

      <ToBeAdded />
    </div>
  )
}

export const SplitCard = () => {
  return (
    <div className="p-[84px]">
      <div className="relative group/region p-5">
        <span className="absolute -inset-5 group-hover/region:inline-block group-focus-within/region:hidden group-hover/region:group-focus-within/region:hidden opacity-0 hidden group-hover/region:opacity-100 group-focus-within/region:opacity-0 group-hover/region:group-focus-within/region:opacity-0 transition duration-300 border-2 rounded-lg border-primary-500 group-hover/region:bg-primary-500/5 group-focus-within/region:bg-transparent group-hover/region:border-primary-200">
          <span className="absolute left-0 invisible transition-[visibility] duration-300 group-focus-within/region:invisible group-hover/region:visible -top-[22px] text-xs text-primary-500 leading-none font-medium group-hover/region:group-focus-within/block:invisible">
            Region
          </span>
          <BlockToolbar className="-top-[18px] -right-[17px] absolute group-hover/region:visible invisible transition-[visibility] duration-300" />
        </span>

        <div className="relative grid grid-cols-2 gap-x-[50px]">
          <PictureEditor
            startingPoint={({ dataUrl, open, style, onRemove, onEdit }) => (
              <div className="overflow-hidden relative group/image bg-gray-100 grid rounded-lg place-items-center group-hover/region:bg-primary-50 hover:bg-black/20 hover:ring-2 hover:ring-primary-500 transition duration-300">
                {dataUrl ? (
                  <div className="size-full rounded-lg transform" style={style}>
                    <img
                      src={dataUrl}
                      aria-label="Picture"
                      className="absolute object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <Picture className="w-[84px] shrink-0 h-[76px] text-gray-300 group-hover/image:text-primary-300" />
                )}
                <BlockImageToolbar
                  className="top-5 left-5 absolute hidden opacity-0 group-hover/image:inline-flex group-hover/image:opacity-100 transition duration-300"
                  onAddImage={open}
                  onRemove={onRemove}
                  onEdit={onEdit}
                />
              </div>
            )}
          />

          <div>
            <h1 className="group/block relative font-semibold">
              <span className="absolute -inset-5 group-hover/block:inline-block group-focus-within/block:inline-block opacity-0 hidden group-hover/block:opacity-100 group-focus-within/block:opacity-100 transition duration-300 border-2 rounded-lg border-primary-500 group-hover/block:bg-primary-500/5 group-focus-within/block:bg-transparent group-hover/block:group-focus-within/block:bg-transparent group-hover/block:border-primary-200">
                <span className="absolute left-0 invisible transition-[visibility] duration-300 group-focus-within/block:invisible group-hover/block:visible -top-[22px] text-xs text-primary-500 leading-none font-medium group-hover/block:group-focus-within/block:invisible">
                  Text
                </span>
                <BlockToolbar className="-top-[18px] -right-[17px] absolute group-focus-within/block:visible invisible transition-[visibility] duration-300" />
                <FlexibleToolbar className="absolute left-0 -top-[60.14px] group-focus-within/block:visible invisible transition-[visibility] duration-300" />
              </span>
              <EditableRoot
                className="relative"
                defaultValue="These are your challenges"
              >
                <EditableLabel>Title</EditableLabel>
                <EditableArea>
                  <EditableInput
                    asChild
                    className="bg-transparent py-2 w-full first-line:inline-block placeholder:text-dark-blue-400 group-data-[placeholder-shown]/area:text-dark-blue-400 min-h-[40px] [field-sizing:content] resize-none scrollbar-none text-[40px] leading-none font-semibold text-dark-blue-400"
                  >
                    <textarea />
                  </EditableInput>
                  <EditablePreview className=" group-data-[placeholder-shown]/area:text-dark-blue-400 text-[40px] leading-none font-semibold text-dark-blue-400" />
                </EditableArea>
              </EditableRoot>
            </h1>

            <p className="group/block relative mt-5">
              <span className="absolute -inset-5 group-hover/block:inline-block group-focus-within/block:inline-block opacity-0 hidden group-hover/block:opacity-100 group-focus-within/block:opacity-100 transition duration-300 border-2 rounded-lg border-primary-500 group-hover/block:bg-primary-500/5 group-focus-within/block:bg-transparent group-hover/block:group-focus-within/block:bg-transparent group-hover/block:border-primary-200">
                <span className="absolute left-0 invisible transition-[visibility] duration-300 group-focus-within/block:invisible group-hover/block:visible -top-[22px] text-xs text-primary-500 leading-none font-medium group-hover/block:group-focus-within/block:invisible">
                  Text
                </span>
                <BlockToolbar className="-top-[18px] -right-[17px] absolute group-focus-within/block:visible invisible transition-[visibility] duration-300" />
                <FlexibleToolbar className="absolute left-0 -top-[60.14px] group-focus-within/block:visible invisible transition-[visibility] duration-300" />
              </span>
              <EditableRoot
                className="relative"
                defaultValue="This is left aligned. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
              >
                <EditableLabel>Sub Title</EditableLabel>
                <EditableArea>
                  <EditableInput
                    asChild
                    className="bg-transparent py-2 w-full first-line:inline-block placeholder:text-dark-blue-400 group-data-[placeholder-shown]/area:text-dark-blue-400 min-h-[24px] [field-sizing:content] resize-none scrollbar-none text-2xl leading-none font-light text-dark-blue-400"
                  >
                    <textarea />
                  </EditableInput>
                  <EditablePreview className=" group-data-[placeholder-shown]/area:text-dark-blue-400 text-2xl leading-none font-light text-dark-blue-400" />
                </EditableArea>
              </EditableRoot>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export const ClientView = () => {
  return (
    <div className="p-[100px] bg-white">
      <div className="grid grid-cols-2">
        <div className="relative rounded-l-lg p-[32px]">
          <NextImage
            className="object-cover"
            src="/woman.jpg"
            alt="Woman"
            sizes="50vw"
            fill
          />

          <div className="bg-black/20 p-8 flex flex-col justify-end absolute inset-0 rounded-l-lg">
            <div>
              <h1 className="text-[40px] leading-none font-semibold text-white">
                Jane Doe
              </h1>
              <p className="text-2xl mt-3 leading-none text-white">
                28, Professional Model
              </p>
              <div className="mt-3 flex items-center gap-x-3 flex-wrap">
                <div className="inline-flex shrink-0 items-center rounded-full px-3 h-7 bg-white text-gray-700 text-sm font-medium">
                  Passionate
                </div>
                <div className="inline-flex shrink-0 items-center rounded-full px-3 h-7 bg-white text-gray-700 text-sm font-medium">
                  Passionate
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-8">
          <h1 className="text-base font-semibold text-dark-blue-400 leading-none">
            About
          </h1>

          <p className="font-light text-dark-blue-400 mt-3 leading-none text-sm">
            Jane is a Professional Model who lives in New York. She has been
            modeling for about 10 years at different companies like GAP, Levi’s,
            Banana Republic and Theory. It was when she was around 21 when she
            was contacted by the agency.
          </p>

          <div className="mt-[34.45px]">
            <h1 className="text-base font-semibold text-dark-blue-400 leading-none">
              About
            </h1>

            <p className="font-light text-dark-blue-400 mt-3 leading-none text-sm">
              Jane is a Professional Model who lives in New York. She has been
              modeling for about 10 years at different companies like GAP,
              Levi’s, Banana Republic and Theory. It was when she was around 21
              when she was contacted by the agency.
            </p>
          </div>
          <div className="mt-[34.45px]">
            <h1 className="text-base font-semibold text-dark-blue-400 leading-none">
              Goals
            </h1>

            <div className="space-y-3">
              <p className="font-light text-dark-blue-400 mt-3 leading-none text-sm">
                Always stay up-to-date and follow on her dietary restrictions
                and schedule
              </p>
              <p className="font-light text-dark-blue-400 mt-3 leading-none text-sm">
                Always stay up-to-date and follow on her dietary restrictions
                and schedule
              </p>
              <p className="font-light text-dark-blue-400 mt-3 leading-none text-sm">
                Always stay up-to-date and follow on her dietary restrictions
                and schedule
              </p>
            </div>
          </div>
          <div className="mt-[34.45px]">
            <h1 className="text-base font-semibold text-dark-blue-400 leading-none">
              Frustrations
            </h1>

            <div className="space-y-3">
              <p className="font-light text-dark-blue-400 mt-3 leading-none text-sm">
                Always stay up-to-date and follow on her dietary restrictions
                and schedule
              </p>
              <p className="font-light text-dark-blue-400 mt-3 leading-none text-sm">
                Always stay up-to-date and follow on her dietary restrictions
                and schedule
              </p>
              <p className="font-light text-dark-blue-400 mt-3 leading-none text-sm">
                Always stay up-to-date and follow on her dietary restrictions
                and schedule
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[100px] border rounded-lg bg-border-200 gap-x-[53.33px] flex items-center justify-between flex-wrap p-[50px]">
        <div className="space-y-2">
          <h1 className="font-bold text-[40px] leading-none text-dark-blue-400">
            50%
          </h1>
          <p className="text-xl leading-none text-dark-blue-400">
            Less Time Spent
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="font-bold text-[40px] leading-none text-dark-blue-400">
            50%
          </h1>
          <p className="text-xl leading-none text-dark-blue-400">
            Less Time Spent
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="font-bold text-[40px] leading-none text-dark-blue-400">
            50%
          </h1>
          <p className="text-xl leading-none text-dark-blue-400">
            Less Time Spent
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="font-bold text-[40px] leading-none text-dark-blue-400">
            50%
          </h1>
          <p className="text-xl leading-none text-dark-blue-400">
            Less Time Spent
          </p>
        </div>
      </div>

      <div className="mt-[100px]">
        <h1 className="font-bold text-[40px] leading-none text-dark-blue-400">
          Testimonials
        </h1>

        <div className="mt-[32px] grid grid-cols-2 gap-x-[50px]">
          <article className="p-6 rounded-[20px] bg-gray-100 rounded-bl-none">
            <div className="flex items-start gap-x-3">
              <h1 className="pt-[11px] leading-none text-dark-blue-400 font-bold text-[114.33px]">
                “
              </h1>
              <h1 className="pt-6 text-dark-blue-400 text-2xl leading-none">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </h1>
            </div>

            <div className="mt-[50px] flex items-center gap-x-2">
              <Avatar size="md">
                <AvatarImage src="/man.jpg" alt="Man" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>

              <div className="space-y-0.5">
                <h1 className="text-sm font-bold text-dark-blue-400 leading-none">
                  John Doe
                </h1>
                <p className="text-[10px] font-light text-dark-blue-400">
                  Acme Inc. President & CEO
                </p>
              </div>
            </div>
          </article>
          <article className="p-6 rounded-[20px] bg-gray-100 rounded-bl-none">
            <div className="flex items-start gap-x-3">
              <h1 className="pt-[11px] leading-none text-dark-blue-400 font-bold text-[114.33px]">
                “
              </h1>
              <h1 className="pt-6 text-dark-blue-400 text-2xl leading-none">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </h1>
            </div>

            <div className="mt-[50px] flex items-center gap-x-2">
              <Avatar size="md">
                <AvatarImage src="/man.jpg" alt="Man" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>

              <div className="space-y-0.5">
                <h1 className="text-sm font-bold text-dark-blue-400 leading-none">
                  John Doe
                </h1>
                <p className="text-[10px] font-light text-dark-blue-400">
                  Acme Inc. President & CEO
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>

      <div className="mt-[100px]">
        <h1 className="font-semibold text-[40px] leading-none text-dark-blue-400">
          This is your Conclusion
        </h1>
        <p className="mt-6 text-dark-blue-400 text-2xl leading-none font-light">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>

      <div className="bg-gray-50 mt-[100px] p-[100px]">
        <h1 className="font-semibold text-[40px] leading-none text-dark-blue-400">
          More Projects
        </h1>

        <div className="mt-6">
          <div className="bg-white rounded-[15px] border grid grid-cols-2 gap-x-[50px] p-[75px] border-gray-200">
            <div className="flex gap-x-3 items-start">
              <div className="relative inline-block">
                <Avatar className="size-[74px]" size="2xl">
                  <AvatarImage src="/man.jpg" alt="Man" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div className="size-[20.77px] absolute left-0 top-[56px] rounded-full inline-flex items-center justify-center ring-[2.65px] text-white ring-white bg-success-500">
                  <Check className="size-[15px]" />
                </div>
              </div>

              <div>
                <h1 className="text-[22px] leading-none font-bold text-dark-blue-400">
                  Saumya{" "}
                  <span className="text-[22px] leading-none font-light text-dark-blue-400">
                    @saumyadesign23
                  </span>
                </h1>

                <p className="text-lg leading-none text-dark-blue-400 font-light mt-2">
                  UX Product Designer{" "}
                </p>

                <div className="mt-2 flex items-center gap-x-[9px]">
                  <MapPin className="size-[16px] text-dark-blue-400" />

                  <span className="text-sm leading-none font-medium text-dark-blue-400">
                    Jersey City, NJ, United States
                  </span>
                </div>

                <div className="mt-8 flex items-center gap-x-3">
                  <Button>
                    <Plus className="size-[15px]" /> Hire Me
                  </Button>
                  <Button
                    variant="outlined"
                    visual="gray"
                    className="border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white"
                  >
                    <MessageSquare01 className="size-[15px]" /> Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
