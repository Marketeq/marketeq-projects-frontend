"use client"

import {
  CSSProperties,
  Fragment,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react"
import React from "react"
import { Empty1 } from "@/stories/publish-project.stories"
import { HTTPS, ONE_SECOND } from "@/utils/constants"
import {
  cn,
  debounce,
  getId,
  getIsEmpty,
  getIsNotEmpty,
  hookFormHasError,
  keys,
  pick,
} from "@/utils/functions"
import {
  useCallbackRef,
  useControllableState,
  useStepper,
  useUncontrolledState,
  useUnmountEffect,
} from "@/utils/hooks"
import { createContext, createStrictContext } from "@/utils/react-utils"
import { TagsInputHiddenInput } from "@ark-ui/react"
import {
  AlertCircle,
  AlertTriangle,
  ArrowDown,
  ArrowDownLeft,
  ArrowUp,
  ArrowUpLeft,
  Check,
  CheckCircle,
  CheckCircleBroken,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsDown,
  ChevronsUp,
  Clock,
  Copy,
  Edit03,
  Eye,
  HelpCircle,
  Home03,
  Lightbulb05,
  Lock01,
  MoreHorizontal,
  PlayCircle,
  Plus,
  Plus2,
  SearchMd,
  Send,
  Trash2,
  Type,
  X,
  X2,
} from "@blend-metrics/icons"
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  type UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { ErrorMessage as HookFormErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { createColumnHelper, noop } from "@tanstack/react-table"
import {
  Row,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Steps } from "headless-stepper"
import {
  Controller,
  SubmitHandler,
  UseFormReturn,
  get,
  useForm,
  useWatch,
} from "react-hook-form"
import {
  useIsomorphicLayoutEffect,
  usePrevious,
  useToggle,
  useUpdateEffect,
} from "react-use"
import { z } from "zod"
import { Prettify } from "@/types/core"
import { GripVertical2 } from "@/components/icons/grip-vertical-2"
import { Network } from "@/components/icons/network"
import { Network1 } from "@/components/icons/network-1"
import { Network2 } from "@/components/icons/network-2"
import { Network3 } from "@/components/icons/network-3"
import { Network4 } from "@/components/icons/network-4"
import { CountriesCombobox, OwnCombobox } from "@/components/own-combobox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ErrorMessage,
  SquareShapeDropzone,
  Step,
  StepControl,
  StepRootProvider,
  StepperProvider,
  TagsInputContext,
  TagsInputControl,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDeleteTrigger,
  TagsInputItemInput,
  TagsInputItemPreview,
  TagsInputItemText,
  TagsInputLabel,
  TagsInputRoot,
  useStepContext,
  useStepRootContext,
  useStepperContext,
} from "@/components/ui"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DisclosureContent,
  Dropzone,
  HelperText,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Progress,
  ScrollArea,
  ScrollBar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui"

declare module "@tanstack/react-table" {
  // @ts-expect-error
  interface TableMeta<TData extends PhaseRow> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
    openDurationDialog: (index: number) => void
    roles: string[]
  }
}

const meta = {
  "Project Info": [
    { label: "Title", name: "title" },
    { label: "Category", name: "category" },
    { label: "Industry(s)", name: "industry" },
    { label: "Short Description", name: "shortDescription" },
    { label: "Full Description", name: "fullDescription" },
    { label: "Tags", name: "tags" },
    { label: "Skills", name: "skills" },
  ],
  Media: [
    { label: "Featured Image", name: "featuredImages" },
    { label: "Additional Images", name: "additionalImages" },
    { label: "Featured Video", name: "featuredVideo" },
  ],
  "Project Scope": [
    { label: "Task Name", name: "taskName" },
    { label: "Role", name: "role" },
    { label: "Location", name: "location" },
    { label: "Experience", name: "experience" },
    { label: "Duration", name: "duration" },
  ],
} as const

const DURATION_TYPE = ["days", "weeks", "hours"] as const

const taskFormSchema = z.object({
  task: z.string().min(1, "Please enter at least 1 character(s)"),
  duration: z.object({
    value: z.coerce.number({
      invalid_type_error: "Please enter a valid number",
    }),
    type: z.enum(DURATION_TYPE, {
      invalid_type_error: "Please select an option",
      required_error: "Please select an option",
    }),
  }),
})

const rowSchema = taskFormSchema.merge(
  z.object({
    id: z.string().min(1, "Please enter at least 1 character(s)"),
    role: z.string().min(1, "Please enter at least 1 character(s)"),
    location: z.string().min(1, "Please enter at least 1 character(s)"),
    experience: z.string().min(1, "Please enter at least 1 character(s)"),
  })
)

const projectScopeSchema = z
  .array(
    z.object({
      phaseName: z.string().min(1, "Please enter at least 1 character(s)"),
      rows: z.array(rowSchema).min(1, "Please add at least 1 task(s)"),
    })
  )
  .min(1, "Please add at least 1 phase(s)")

const Sidebar = () => {
  const { currentStep, stepsState } = useStepRootContext()
  const { setStep } = useStepperContext()
  const projectInfoMethods = useProjectInfoContext()
  const mediaMethods = useMediaContext()

  const projectInfoValues = useWatch({ control: projectInfoMethods.control })
  const { error: projectInfoError } =
    projectInfoSchema.safeParse(projectInfoValues)
  const projectInfoFlattenError = projectInfoError?.flatten()

  const mediaValues = useWatch({ control: mediaMethods.control })
  const { error: mediaError } = mediaFormSchema.safeParse(mediaValues)
  const mediaFlattenError = mediaError?.flatten()
  const { projectScopeMethods } = useProjectScopeContext()
  const [phases] = projectScopeMethods

  return (
    <div className="py-6 px-[15px] flex flex-col shrink-0 gap-y-5 xs:max-[1024px]:hidden w-[260px] border-r border-gray-200 bg-gray-50">
      {stepsState.map(({ label, isValid }, index) => {
        const isActive = currentStep === index

        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <div className="flex flex-col">
                <TooltipTrigger asChild>
                  <button
                    className="group flex items-center justify-between focus-visible:outline-none hover:bg-gray-100 disabled:hover:bg-transparent rounded-md px-3 py-2"
                    data-ui-state={
                      isActive ? "active" : isValid ? "complete" : "disabled"
                    }
                    onClick={() => (isValid ? setStep(index) : noop)}
                  >
                    <span className="flex items-center gap-x-3">
                      <span className="text-sm leading-[16.94px] font-semibold size-[25px] rounded-full shrink-0 inline-flex justify-center items-center text-white group-data-[ui-state=active]:border-2 group-data-[ui-state=active]:text-primary-500 group-data-[ui-state=active]:border-primary-500 group-data-[ui-state=complete]:bg-primary-500 group-data-[ui-state=disabled]:bg-gray-300">
                        {index + 1}
                      </span>
                      <span className="text-dark-blue-400 group-data-[ui-state=disabled]:text-gray-300 text-sm leading-[16.94px] font-semibold">
                        {label}
                      </span>
                    </span>

                    <Lock01 className="size-[18px] text-gray-300 shrink-0 group-data-[ui-state=disabled]:inline-block hidden" />
                  </button>
                </TooltipTrigger>

                <TooltipContent className="max-w-[138px]">
                  {isActive
                    ? "Opened"
                    : isValid
                      ? "Click to open"
                      : "Please complete the current step first"}
                </TooltipContent>

                {isActive && (
                  <div className="pl-[25px]">
                    {label === "Project Info" &&
                      meta[label].map((field, i) => (
                        <div
                          className="py-1.5 flex items-center justify-between pl-[25px] pr-3"
                          key={i}
                        >
                          <span className="text-sm leading-6 text-gray-500">
                            {field.label}
                          </span>

                          {projectInfoMethods.formState.dirtyFields[
                            field.name
                          ] &&
                            (projectInfoFlattenError?.fieldErrors[
                              field.name
                            ] ? (
                              <AlertCircle className="size-[22px] text-warning-500 shrink-0" />
                            ) : (
                              <div className="size-[18px] rounded-full inline-flex items-center justify-center shrink-0 bg-success-500">
                                <Check className="size-3 text-white" />
                              </div>
                            ))}
                        </div>
                      ))}
                    {label === "Media" &&
                      meta[label].map((field, i) => (
                        <div
                          className="py-1.5 flex items-center justify-between pl-[25px] pr-3"
                          key={i}
                        >
                          <span className="text-sm leading-6 text-gray-500">
                            {field.label}
                          </span>

                          {mediaMethods.formState.dirtyFields[field.name] &&
                            (mediaFlattenError?.fieldErrors[field.name] ? (
                              <AlertCircle className="size-[18px] text-warning-500 shrink-0" />
                            ) : (
                              <div className="size-[18px] rounded-full inline-flex items-center justify-center shrink-0 bg-success-500">
                                <Check className="size-3 text-white" />
                              </div>
                            ))}
                        </div>
                      ))}
                    {label === "Project Scope" &&
                      meta[label].map((field, i) => (
                        <div
                          className="py-1.5 flex items-center justify-between pl-[25px] pr-3"
                          key={i}
                        >
                          <span className="text-sm leading-6 text-gray-500">
                            {field.label}
                          </span>

                          {(field.label === "Task Name" &&
                            phases.reduce(
                              (previous, { rows }) =>
                                previous &&
                                rows !== undefined &&
                                rows &&
                                rows.reduce(
                                  (prev, { task }) =>
                                    prev &&
                                    rowSchema
                                      .pick({ task: true })
                                      .safeParse({ task }).success,
                                  true
                                ),
                              true
                            )) ||
                          (field.label === "Role" &&
                            phases.reduce(
                              (previous, { rows }) =>
                                previous &&
                                rows !== undefined &&
                                rows.reduce(
                                  (prev, { role }) =>
                                    prev &&
                                    rowSchema
                                      .pick({ role: true })
                                      .safeParse({ role }).success,
                                  true
                                ),
                              true
                            )) ||
                          (field.label === "Location" &&
                            phases.reduce(
                              (previous, { rows }) =>
                                previous &&
                                rows !== undefined &&
                                rows.reduce(
                                  (prev, { location }) =>
                                    prev &&
                                    rowSchema
                                      .pick({ location: true })
                                      .safeParse({ location }).success,
                                  true
                                ),
                              true
                            )) ||
                          (field.label === "Experience" &&
                            phases.reduce(
                              (previous, { rows }) =>
                                previous &&
                                rows !== undefined &&
                                rows &&
                                rows.reduce(
                                  (prev, { experience }) =>
                                    prev &&
                                    rowSchema
                                      .pick({ experience: true })
                                      .safeParse({ experience }).success,
                                  true
                                ),
                              true
                            )) ||
                          (field.label === "Duration" &&
                            phases.reduce(
                              (previous, { rows }) =>
                                previous &&
                                rows !== undefined &&
                                rows.reduce(
                                  (prev, { duration }) =>
                                    prev &&
                                    rowSchema
                                      .pick({ duration: true })
                                      .safeParse({ duration }).success,
                                  true
                                ),
                              true
                            )) ? (
                            <div className="size-[18px] rounded-full inline-flex items-center justify-center shrink-0 bg-success-500">
                              <Check className="size-3 text-white" />
                            </div>
                          ) : (
                            <AlertCircle className="size-[18px] text-warning-500 shrink-0" />
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </Tooltip>
          </TooltipProvider>
        )
      })}
    </div>
  )
}

const Header = ({ onSaveExit }: { onSaveExit?: () => void }) => {
  return (
    <div className="pr-[17px] pl-[32px] flex items-center justify-between sticky top-0 bg-white h-[70px] border-b border-gray-200">
      <h3 className="text-sm leading-[16.94px] text-gray-900 font-semibold">
        Publish to Marketplace
      </h3>

      <div className="flex items-center gap-x-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <IconButton
                className="text-gray-500"
                variant="outlined"
                visual="gray"
              >
                <HelpCircle className="size-4" />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent>Help</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Button className="bg-primary-500/15 text-primary-500 hover:bg-primary-500 hover:text-white">
          <Eye className="size-[15px]" /> Preview
        </Button>
        <Button
          className="text-gray-900"
          variant="outlined"
          visual="gray"
          onClick={onSaveExit}
        >
          Save & Exit
        </Button>
      </div>
    </div>
  )
}

const BottomBar = ({ progressValue }: { progressValue?: number }) => {
  const { nextStep, prevStep } = useStepperContext()
  const { hasNextStep, hasPreviousStep, totalSteps, currentStep, stepsState } =
    useStepRootContext()

  const { isValid } = stepsState[currentStep]
  const { setIsProjectSubmitted } = useProjectScopeContext()
  return (
    <div className="h-[78px] z-40 fixed left-0 min-[1024px]:left-[260px] bottom-0 right-0 bg-white border-b border-gray-200">
      <Progress value={progressValue} bubble={false} />
      <div className="flex h-[70px] items-center justify-between py-[15px] pr-[17px] pl-[32px]">
        <span className="text-xs leading-[18px] font-semibold text-gray-700">
          {progressValue}% Complete
        </span>

        <div className="flex items-center gap-x-6">
          {hasPreviousStep && (
            <Button variant="outlined" onClick={prevStep}>
              <ChevronLeft className="size-[15px]" />
              Previous
            </Button>
          )}
          {hasNextStep ? (
            <Button onClick={isValid ? nextStep : noop}>
              Next <ChevronRight className="size-[15px]" />
            </Button>
          ) : (
            <Button
              disabled={!isValid}
              onClick={() => setIsProjectSubmitted(true)}
            >
              Submit Project
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

const ProjectInfoTip = ({
  closeTrigger,
  showArrow,
  className,
}: {
  closeTrigger?: React.ReactNode
  showArrow?: boolean
  className?: string
}) => {
  return (
    <div
      className={cn(
        "p-5 rounded-lg w-[269px] bg-primary-50 relative",
        className
      )}
    >
      {showArrow && (
        <div className="absolute size-[25.45px] rotate-45 top-[35px] -left-[12.725px] bg-primary-50" />
      )}

      {closeTrigger}

      <div className="flex items-center gap-x-2">
        <Lightbulb05 className="size-[30px] shrink-0 text-primary-500" />
        <span className="text-base leading-[30px] font-semibold text-gray-900">
          Tip
        </span>
      </div>
      <div className="mt-1">
        <span className="text-xs leading-[14.52px] text-black/60">
          A great title gives your audience a reason to open your project
        </span>
      </div>

      <div className="mt-3 p-4 rounded-lg border-gray-300 bg-gray-25">
        <div className="flex items-center gap-x-3">
          <CheckCircle className="size-5 shrink-0 text-primary-500" />{" "}
          <span className="text-sm leading-5 font-semibold text-gray-700">
            Focus on purpose
          </span>
        </div>

        <div className="mt-3">
          <span className="text-sm leading-[16.94px] text-gray-500">
            Use impactful keywords that communicate value and make it easy to
            identify in a list of projects.
          </span>
        </div>
      </div>

      <div className="mt-3 p-4 rounded-lg border-gray-300 bg-gray-25">
        <div className="flex items-center gap-x-3">
          <CheckCircle className="size-5 shrink-0 text-primary-500" />{" "}
          <span className="text-sm leading-5 font-semibold text-gray-700">
            Focus on purpose
          </span>
        </div>

        <div className="mt-3">
          <span className="text-sm leading-[16.94px] text-gray-500">
            Use impactful keywords that communicate value and make it easy to
            identify in a list of projects.
          </span>
        </div>
      </div>
    </div>
  )
}

const projectInfoSchema = z.object({
  title: z
    .string()
    .min(1, "Please enter at least 1 character(s)")
    .max(120, "Please do not enter more than 120 character(s)"),
  category: z
    .array(
      z.object({
        category: z
          .string({
            required_error: "Please enter/select a category",
          })
          .min(1, "Please select at least 1 character(s)"),
        subCategories: z
          .array(z.string(), {
            required_error: "Please enter/select at least 1 sub-category(s)",
          })
          .min(1, "Please enter/select at least 1 category(s)"),
      })
    )
    .length(3, "Please enter/select all the categories and sub-categories"),
  industry: z
    .array(z.string(), {
      required_error: "Please enter/select at least 1 industry(s)",
    })
    .min(1, "Please enter at least 1 industry(s)")
    .max(5, "Please do not enter more than 5 industry(s)"),
  shortDescription: z
    .string()
    .min(1, "Please enter at least 1 character(s)")
    .max(300, "Please do not enter more than 300 character(s)"),
  fullDescription: z
    .string()
    .min(1, "Please enter at least 1 character(s)")
    .max(2_000, "Please do not enter more than 2,000 character(s)"),
  tags: z
    .array(z.string(), {
      required_error: "Please enter/select at least 1 tags(s)",
    })
    .min(1, "Please enter/select at least 1 tags(s)")
    .max(10, "Please do not enter/select more than 10 tag(s)"),
  skills: z
    .array(z.string(), {
      required_error: "Please enter/select at least 1 skill(s)",
    })
    .min(1, "Please enter/select at least 1 character(s)")
    .max(10, "Please do not enter/select more than 10 tag(s)"),
})

type ProjectInfoFormValues = z.infer<typeof projectInfoSchema>

const techDesignCategories = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Graphic Design",
  "Software Engineering",
  "Product Design",
  "Frontend Development",
  "Backend Development",
  "Data Science",
  "Artificial Intelligence",
  "Cloud Computing",
  "Cybersecurity",
]

const skills = ["Node.js", "Javascript", "Wireframing"]

const ProjectInfo = () => {
  const { toggleValidation } = useStepContext()
  const methods = useProjectInfoContext()
  const {
    formState: { isValid, errors },
    setValue,
    trigger,
  } = methods

  useIsomorphicLayoutEffect(() => {
    toggleValidation(true)
  }, [isValid])

  const onSubmit: SubmitHandler<ProjectInfoFormValues> = (values) => {}

  const projectInfoValues = useWatch({ control: methods.control })
  const { error } = projectInfoSchema.safeParse(projectInfoValues)
  const totalFields = keys(methods.control._fields).length
  const totalFieldErrors = error ? keys(error.flatten().fieldErrors).length : 0
  const progressValue = parseInt(
    `${((totalFields - totalFieldErrors) / totalFields) * 100}`
  )

  const suggestedSkills = skills.filter(
    (value) => !projectInfoValues.skills?.includes(value)
  )

  return (
    <form className="contents" onSubmit={methods.handleSubmit(onSubmit)}>
      <ScrollArea
        className="h-[calc(theme(size.full)-148px)]"
        scrollBar={<ScrollBar className="w-4 p-1" />}
      >
        <div className="py-10 px-5 md:px-10 min-[1024px]:py-[50px] min-[1024px]:px-[75px] flex flex-col min-[1024px]:flex-row gap-y-10 min-[1024px]:gap-x-[41.45px]">
          <div className="p-3 pr-9 border rounded-lg border-blue-300 bg-blue-100 min-[1024px]:hidden">
            <div className="flex items-start gap-x-3">
              <Lightbulb05 className="size-[30px] text-primary-500" />

              <div className="flex flex-col flex-auto items-start md:items-center gap-y-3 md:flex-row gap-x-0.5">
                <div className="space-y-0.5 flex-auto">
                  <h1 className="text-base leading-[30px] font-semibold text-gray-900">
                    Tip
                  </h1>
                  <p className="text-xs leading-[14.52px] text-dark-blue-400 tracking-[0.01em]">
                    A great title gives your audience a reason to open your
                    project
                  </p>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" type="button">
                      <PlayCircle className="size-5" /> Show me how
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-[317.55px] p-0">
                    <ProjectInfoTip
                      className="w-full"
                      closeTrigger={
                        <DialogClose asChild>
                          <IconButton
                            className="text-primary-500/50 hover:text-primary-500 absolute top-[11px] right-[11.55px]"
                            variant="light"
                            visual="gray"
                          >
                            <X className="size-5" />
                          </IconButton>
                        </DialogClose>
                      }
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="flex-auto">
            <h1 className="text-xl leading-[30px] font-semibold text-gray-900">
              Project Info
            </h1>

            <div className="space-y-1.5 mt-6">
              <div className="space-y-0.5">
                <Label
                  className="leading-9 text-dark-blue-400 font-semibold"
                  size="lg"
                  htmlFor="title"
                >
                  Title
                </Label>
                <div className="flex items-center justify-between">
                  <HelperText size="sm">
                    Write a title that accurately describes your project scope
                    for the marketplace.
                  </HelperText>

                  <span className="text-xs leading-[14.52px] text-gray-500">
                    {projectInfoValues.title?.length || 0}/120
                  </span>
                </div>
              </div>

              <Input
                id="title"
                type="text"
                placeholder="Enter Title"
                {...methods.register("title")}
                isInvalid={hookFormHasError({
                  errors,
                  name: "title",
                })}
              />

              <HookFormErrorMessage
                errors={errors}
                name="title"
                render={({ message }) => (
                  <ErrorMessage size="sm">{message}</ErrorMessage>
                )}
              />
            </div>

            <div className="space-y-6 mt-6">
              <div className="space-y-0.5">
                <Label
                  className="leading-9 text-dark-blue-400 font-semibold"
                  size="lg"
                  htmlFor="email"
                  asChild
                >
                  <span>Category</span>
                </Label>

                <HelperText size="sm">
                  Select categories that best fit your project scope for easier
                  discovery.
                </HelperText>
              </div>

              <div className="flex items-start gap-x-1.5">
                <div className="size-11 shrink-0 inline-flex items-center justify-between text-xl leading-[30px] text-gray-900 font-semibold">
                  1
                </div>

                <div className="flex flex-col flex-auto gap-y-2.5">
                  <div className="max-w-[202px]">
                    <Controller
                      control={methods.control}
                      name="category.0.category"
                      render={({ field: { value, onChange, ...field } }) => (
                        <Listbox value={value} onChange={onChange}>
                          <ListboxButton
                            placeholder="Add Category"
                            {...field}
                          />
                          <ListboxOptions>
                            {techDesignCategories.map((category) => (
                              <ListboxOption key={category} value={category}>
                                {category}
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </Listbox>
                      )}
                    />
                  </div>

                  <Controller
                    name="category.0.subCategories"
                    control={methods.control}
                    render={({ field: { onChange, ...field } }) => (
                      <TagsInputRoot
                        onValueChange={(details) => onChange(details.value)}
                        {...field}
                        className="space-y-1.5"
                      >
                        <TagsInputContext>
                          {(tagsInput) => (
                            <>
                              <TagsInputControl className="relative pr-[28px]">
                                {tagsInput.value.map((value, index) => (
                                  <TagsInputItem
                                    key={index}
                                    index={index}
                                    value={value}
                                  >
                                    <TagsInputItemPreview
                                      visual="primary"
                                      size="md"
                                      className="pr-2 text-primary-500 bg-primary-50"
                                    >
                                      <TagsInputItemText>
                                        {value}
                                      </TagsInputItemText>
                                      <TagsInputItemDeleteTrigger className="opacity-50 hover:opacity-100">
                                        <X2 className="size-3" />
                                      </TagsInputItemDeleteTrigger>
                                    </TagsInputItemPreview>
                                    <TagsInputItemInput />
                                  </TagsInputItem>
                                ))}
                                <TagsInputInput placeholder="Add Sub-Category(s)" />

                                <SearchMd className="size-4 shrink-0 absolute inset-y-0 right-3 my-auto text-gray-400" />
                              </TagsInputControl>
                            </>
                          )}
                        </TagsInputContext>
                        <TagsInputHiddenInput />
                      </TagsInputRoot>
                    )}
                  />

                  {(hookFormHasError({ errors, name: "category.0.category" }) ||
                    hookFormHasError({
                      errors,
                      name: "category.0.subCategories",
                    })) && (
                    <ErrorMessage size="sm">
                      {get(errors, "category.0.category.message") ||
                        get(errors, "category.0.subCategories.message")}
                    </ErrorMessage>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-x-1.5">
                <div className="size-11 shrink-0 inline-flex items-center justify-between text-xl leading-[30px] text-gray-900 font-semibold">
                  2
                </div>

                <div className="flex flex-col flex-auto gap-y-2.5">
                  <div className="max-w-[202px]">
                    <Controller
                      control={methods.control}
                      name="category.1.category"
                      render={({ field: { value, onChange, ...field } }) => (
                        <Listbox value={value} onChange={onChange}>
                          <ListboxButton
                            placeholder="Add Category"
                            {...field}
                          />
                          <ListboxOptions>
                            {techDesignCategories.map((category) => (
                              <ListboxOption key={category} value={category}>
                                {category}
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </Listbox>
                      )}
                    />
                  </div>

                  <Controller
                    name="category.1.subCategories"
                    control={methods.control}
                    render={({ field: { onChange, ...field } }) => (
                      <TagsInputRoot
                        onValueChange={(details) => onChange(details.value)}
                        {...field}
                        className="space-y-1.5"
                      >
                        <TagsInputContext>
                          {(tagsInput) => (
                            <>
                              <TagsInputControl className="relative pr-[28px]">
                                {tagsInput.value.map((value, index) => (
                                  <TagsInputItem
                                    key={index}
                                    index={index}
                                    value={value}
                                  >
                                    <TagsInputItemPreview
                                      visual="primary"
                                      size="md"
                                      className="pr-2 text-primary-500 bg-primary-50"
                                    >
                                      <TagsInputItemText>
                                        {value}
                                      </TagsInputItemText>
                                      <TagsInputItemDeleteTrigger className="opacity-50 hover:opacity-100">
                                        <X2 className="size-3" />
                                      </TagsInputItemDeleteTrigger>
                                    </TagsInputItemPreview>
                                    <TagsInputItemInput />
                                  </TagsInputItem>
                                ))}
                                <TagsInputInput placeholder="Add Sub-Category(s)" />

                                <SearchMd className="size-4 shrink-0 absolute inset-y-0 right-3 my-auto text-gray-400" />
                              </TagsInputControl>
                            </>
                          )}
                        </TagsInputContext>
                        <TagsInputHiddenInput />
                      </TagsInputRoot>
                    )}
                  />

                  {(hookFormHasError({ errors, name: "category.1.category" }) ||
                    hookFormHasError({
                      errors,
                      name: "category.1.subCategories",
                    })) && (
                    <ErrorMessage size="sm">
                      {get(errors, "category.1.category.message") ||
                        get(errors, "category.1.subCategories.message")}
                    </ErrorMessage>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-x-1.5">
                <div className="size-11 shrink-0 inline-flex items-center justify-between text-xl leading-[30px] text-gray-900 font-semibold">
                  3
                </div>

                <div className="flex flex-col flex-auto gap-y-2.5">
                  <div className="max-w-[202px]">
                    <Controller
                      control={methods.control}
                      name="category.2.category"
                      render={({ field: { value, onChange, ...field } }) => (
                        <Listbox value={value} onChange={onChange}>
                          <ListboxButton
                            placeholder="Add Category"
                            {...field}
                          />
                          <ListboxOptions>
                            {techDesignCategories.map((category) => (
                              <ListboxOption key={category} value={category}>
                                {category}
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </Listbox>
                      )}
                    />
                  </div>

                  <Controller
                    name="category.2.subCategories"
                    control={methods.control}
                    render={({ field: { onChange, ...field } }) => (
                      <TagsInputRoot
                        onValueChange={(details) => onChange(details.value)}
                        {...field}
                        className="space-y-1.5"
                      >
                        <TagsInputContext>
                          {(tagsInput) => (
                            <>
                              <TagsInputControl className="relative pr-[28px]">
                                {tagsInput.value.map((value, index) => (
                                  <TagsInputItem
                                    key={index}
                                    index={index}
                                    value={value}
                                  >
                                    <TagsInputItemPreview
                                      visual="primary"
                                      size="md"
                                      className="pr-2 text-primary-500 bg-primary-50"
                                    >
                                      <TagsInputItemText>
                                        {value}
                                      </TagsInputItemText>
                                      <TagsInputItemDeleteTrigger className="opacity-50 hover:opacity-100">
                                        <X2 className="size-3" />
                                      </TagsInputItemDeleteTrigger>
                                    </TagsInputItemPreview>
                                    <TagsInputItemInput />
                                  </TagsInputItem>
                                ))}
                                <TagsInputInput placeholder="Add Sub-Category(s)" />

                                <SearchMd className="size-4 shrink-0 absolute inset-y-0 right-3 my-auto text-gray-400" />
                              </TagsInputControl>
                            </>
                          )}
                        </TagsInputContext>
                        <TagsInputHiddenInput />
                      </TagsInputRoot>
                    )}
                  />

                  {(hookFormHasError({ errors, name: "category.2.category" }) ||
                    hookFormHasError({
                      errors,
                      name: "category.2.subCategories",
                    })) && (
                    <ErrorMessage size="sm">
                      {get(errors, "category.2.category.message") ||
                        get(errors, "category.2.subCategories.message")}
                    </ErrorMessage>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-1.5">
              <span className="block text-xs leading-5 text-dark-blue-400">
                Suggested Categories
              </span>

              <div className="flex items-center gap-x-3">
                {[
                  { category: "Design", subCategory: "UI/UX Design" },
                  { category: "Development", subCategory: "Mobile App" },
                ].map(({ category, subCategory }) => (
                  <Badge
                    size="md"
                    className="pr-2 focus-visible:outline-none text-primary-500 bg-primary-50"
                    visual="primary"
                    asChild
                    key={category}
                  >
                    <button type="button">
                      {category} / {subCategory}
                      <Plus2 className="size-3 opacity-50 hover:opacity-100" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-1.5 mt-6">
              <Controller
                name="industry"
                control={methods.control}
                render={({ field: { onChange, ...field } }) => (
                  <TagsInputRoot
                    onValueChange={(details) => onChange(details.value)}
                    {...field}
                    className="space-y-1.5"
                  >
                    <TagsInputContext>
                      {(tagsInput) => (
                        <>
                          <div className="space-y-0.5">
                            <TagsInputLabel
                              className="leading-9 text-dark-blue-400 font-semibold"
                              size="lg"
                            >
                              Industry
                            </TagsInputLabel>
                            <div className="flex items-center justify-between">
                              <HelperText size="sm">
                                Add up to 5 industries that aligns with your
                                project scope for targeted visibility.
                              </HelperText>

                              <span className="text-xs leading-[14.52px] text-gray-500">
                                {projectInfoValues.industry?.length || 0}/5
                              </span>
                            </div>
                          </div>
                          <TagsInputControl className="relative pr-[28px]">
                            {tagsInput.value.map((value, index) => (
                              <TagsInputItem
                                key={index}
                                index={index}
                                value={value}
                              >
                                <TagsInputItemPreview
                                  visual="primary"
                                  size="md"
                                  className="pr-2 text-primary-500 bg-primary-50"
                                >
                                  <TagsInputItemText>{value}</TagsInputItemText>
                                  <TagsInputItemDeleteTrigger className="opacity-50 hover:opacity-100">
                                    <X2 className="size-3" />
                                  </TagsInputItemDeleteTrigger>
                                </TagsInputItemPreview>
                                <TagsInputItemInput />
                              </TagsInputItem>
                            ))}
                            <TagsInputInput placeholder="Add tags" />

                            <SearchMd className="size-4 shrink-0 absolute inset-y-0 right-3 my-auto text-gray-400" />
                          </TagsInputControl>
                        </>
                      )}
                    </TagsInputContext>
                    <TagsInputHiddenInput />
                  </TagsInputRoot>
                )}
              />

              <HookFormErrorMessage
                errors={errors}
                name="industry"
                render={({ message }) => (
                  <ErrorMessage size="sm">{message}</ErrorMessage>
                )}
              />
            </div>

            <div className="space-y-1.5 mt-6">
              <div className="space-y-0.5">
                <Label
                  className="leading-9 text-dark-blue-400 font-semibold"
                  size="lg"
                  htmlFor="short-description"
                >
                  Short Description
                </Label>
                <div className="flex items-center justify-between">
                  <HelperText size="sm">
                    Provide a brief overview of your project scope.
                  </HelperText>

                  <span className="text-xs leading-[14.52px] text-gray-500">
                    {projectInfoValues.shortDescription?.length || 0}/300
                  </span>
                </div>
              </div>

              <Textarea
                id="short-description"
                placeholder="Enter a short description..."
                {...methods.register("shortDescription")}
                isInvalid={hookFormHasError({
                  errors,
                  name: "shortDescription",
                })}
              />

              <HookFormErrorMessage
                errors={errors}
                name="shortDescription"
                render={({ message }) => (
                  <ErrorMessage size="sm">{message}</ErrorMessage>
                )}
              />
            </div>

            <div className="space-y-1.5 mt-6">
              <div className="space-y-0.5">
                <Label
                  className="leading-9 text-dark-blue-400 font-semibold"
                  size="lg"
                  htmlFor="full-description"
                >
                  Full Description
                </Label>
                <div className="flex items-center justify-between">
                  <HelperText size="sm">
                    Provide a comprehensive description of this project,
                    including its purpose and features.
                  </HelperText>

                  <span className="text-xs leading-[14.52px] text-gray-500">
                    {projectInfoValues.fullDescription?.length || 0}/2,000
                  </span>
                </div>
              </div>

              <Textarea
                id="full-description"
                placeholder="Enter a short description..."
                {...methods.register("fullDescription")}
                isInvalid={hookFormHasError({
                  errors,
                  name: "fullDescription",
                })}
              />

              <HookFormErrorMessage
                errors={errors}
                name="fullDescription"
                render={({ message }) => (
                  <ErrorMessage size="sm">{message}</ErrorMessage>
                )}
              />
            </div>

            <div className="space-y-1.5 mt-6">
              <Controller
                name="tags"
                control={methods.control}
                render={({ field: { onChange, ...field } }) => (
                  <TagsInputRoot
                    onValueChange={(details) => onChange(details.value)}
                    {...field}
                    className="space-y-1.5"
                  >
                    <TagsInputContext>
                      {(tagsInput) => (
                        <>
                          <div className="space-y-0.5">
                            <TagsInputLabel
                              className="leading-9 text-dark-blue-400 font-semibold"
                              size="lg"
                            >
                              Tags
                            </TagsInputLabel>
                            <div className="flex items-center justify-between">
                              <HelperText size="sm">
                                Add up to 10 tags that best describe your
                                project. Use relevant keywords to highlight its
                                features and make it easier to find.
                              </HelperText>

                              <span className="text-xs leading-[14.52px] text-gray-500">
                                {projectInfoValues.tags?.length || 0}/10
                              </span>
                            </div>
                          </div>
                          <TagsInputControl className="relative pr-[28px]">
                            {tagsInput.value.map((value, index) => (
                              <TagsInputItem
                                key={index}
                                index={index}
                                value={value}
                              >
                                <TagsInputItemPreview
                                  visual="primary"
                                  size="md"
                                  className="pr-2 text-primary-500 bg-primary-50"
                                >
                                  <TagsInputItemText>{value}</TagsInputItemText>
                                  <TagsInputItemDeleteTrigger className="opacity-50 hover:opacity-100">
                                    <X2 className="size-3" />
                                  </TagsInputItemDeleteTrigger>
                                </TagsInputItemPreview>
                                <TagsInputItemInput />
                              </TagsInputItem>
                            ))}
                            <TagsInputInput placeholder="Add tags" />

                            <SearchMd className="size-4 shrink-0 absolute inset-y-0 right-3 my-auto text-gray-400" />
                          </TagsInputControl>
                        </>
                      )}
                    </TagsInputContext>
                    <TagsInputHiddenInput />
                  </TagsInputRoot>
                )}
              />

              <HookFormErrorMessage
                errors={errors}
                name="tags"
                render={({ message }) => (
                  <ErrorMessage size="sm">{message}</ErrorMessage>
                )}
              />
            </div>

            <div className="space-y-1.5 mt-6">
              <Controller
                name="skills"
                control={methods.control}
                render={({ field: { onChange, ...field } }) => (
                  <TagsInputRoot
                    onValueChange={(details) => onChange(details.value)}
                    {...field}
                    className="space-y-1.5"
                  >
                    <TagsInputContext>
                      {(tagsInput) => (
                        <>
                          <div className="space-y-0.5">
                            <TagsInputLabel
                              className="leading-9 text-dark-blue-400 font-semibold"
                              size="lg"
                            >
                              Skills
                            </TagsInputLabel>
                            <div className="flex items-center justify-between">
                              <HelperText size="sm">
                                List up to 10 key skills or proficiencies
                                required to implement this project effectively.
                              </HelperText>

                              <span className="text-xs leading-[14.52px] text-gray-500">
                                {projectInfoValues.skills?.length || 0}/10
                              </span>
                            </div>
                          </div>
                          <TagsInputControl className="relative pr-[28px]">
                            {tagsInput.value.map((value, index) => (
                              <TagsInputItem
                                key={index}
                                index={index}
                                value={value}
                              >
                                <TagsInputItemPreview
                                  visual="primary"
                                  size="md"
                                  className="pr-2 text-primary-500 bg-primary-50"
                                >
                                  <TagsInputItemText>{value}</TagsInputItemText>
                                  <TagsInputItemDeleteTrigger className="opacity-50 hover:opacity-100">
                                    <X2 className="size-3" />
                                  </TagsInputItemDeleteTrigger>
                                </TagsInputItemPreview>
                                <TagsInputItemInput />
                              </TagsInputItem>
                            ))}
                            <TagsInputInput placeholder="Add skills" />

                            <SearchMd className="size-4 shrink-0 absolute inset-y-0 right-3 my-auto text-gray-400" />
                          </TagsInputControl>
                        </>
                      )}
                    </TagsInputContext>
                    <TagsInputHiddenInput />
                  </TagsInputRoot>
                )}
              />

              <HookFormErrorMessage
                errors={errors}
                name="skills"
                render={({ message }) => (
                  <ErrorMessage size="sm">{message}</ErrorMessage>
                )}
              />
            </div>

            {getIsNotEmpty(suggestedSkills) ? (
              <div className="mt-6 space-y-1.5">
                <span className="block text-xs leading-5 text-dark-blue-400">
                  Suggested Skills
                </span>

                <div className="flex items-center gap-x-3">
                  {suggestedSkills.map((suggestedSkill, index) => (
                    <Badge
                      size="md"
                      className="pr-2 bg-primary-50 focus-visible:outline-none text-primary-500"
                      visual="primary"
                      key={index}
                      asChild
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setValue(
                            "skills",
                            projectInfoValues.skills
                              ? [...projectInfoValues.skills, suggestedSkill]
                              : [suggestedSkill]
                          )
                          trigger("skills")
                        }}
                      >
                        {suggestedSkill}

                        <Plus2 className="size-3 opacity-50 hover:opacity-100" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <div className="pl-[17.45px] xs:max-[1024px]:hidden">
            <ProjectInfoTip showArrow />
          </div>
        </div>
      </ScrollArea>

      <BottomBar progressValue={progressValue} />
    </form>
  )
}

const MediaTip = ({
  showArrow,
  closeTrigger,
  className,
}: {
  showArrow?: boolean
  closeTrigger?: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "p-5 rounded-lg w-[269px] bg-primary-50 relative",
        className
      )}
    >
      {showArrow && (
        <div className="absolute size-[25.45px] rotate-45 top-[35px] -left-[12.725px] bg-primary-50" />
      )}
      {closeTrigger}
      <div className="flex items-center gap-x-2">
        <Lightbulb05 className="size-[30px] shrink-0 text-primary-500" />
        <span className="text-base leading-[30px] font-semibold text-gray-900">
          Tip
        </span>
      </div>
      <div className="mt-1">
        <span className="text-xs leading-[14.52px] text-black/60">
          Make your project stand out with better images.
        </span>
      </div>

      <div className="mt-3 p-4 rounded-lg border-gray-300 bg-gray-25">
        <div className="flex items-center gap-x-3">
          <Check className="size-5 shrink-0 text-success-500" />{" "}
          <span className="text-sm leading-5 font-semibold text-gray-700">
            Best practice
          </span>
        </div>

        <ul className="mt-3 list-disc pl-4">
          <li className="text-sm leading-[16.94px] text-gray-500">
            Upload a professional, high-quality image to represent your scope.
          </li>
          <li className="text-sm leading-[16.94px] text-gray-500 mt-5">
            Ensure it reflects the essence of your work and attracts attention
            in the marketplace.
          </li>
        </ul>
      </div>

      <div className="mt-3 p-4 rounded-lg border-gray-300 bg-gray-25">
        <div className="flex items-center gap-x-3">
          <X className="size-5 shrink-0 text-error-500" />{" "}
          <span className="text-sm leading-5 font-semibold text-gray-700">
            Avoid
          </span>
        </div>

        <div className="mt-3">
          <span className="text-sm leading-[16.94px] text-gray-500">
            Use impactful keywords that communicate value and make it easy to
            identify in a list of projects.
          </span>
        </div>
      </div>
    </div>
  )
}

const mediaFormSchema = z
  .object({
    featuredImages: z
      .array(
        z.object({
          meta: z.any(),
          progress: z.number(),
          hasError: z.boolean(),
        }),
        {
          required_error: "Please upload a file",
        }
      )
      .min(1, "Please at least upload 1 image(s)"),
    additionalImages: z.array(
      z
        .array(
          z.object({
            meta: z.any(),
            progress: z.number(),
            hasError: z.boolean(),
          }),
          {
            required_error: "Please upload a file",
          }
        )
        .optional()
    ),
    featuredVideo: z
      .string()
      .min(1, "Please provide a valid url")
      .refine(
        (value) =>
          /^(https?):\/\/(?=.*\.[a-z]{2,})[^\s$.?#].[^\s]*$/i.test(value),
        {
          message: "Please enter a valid URL",
        }
      ),
  })
  .refine(
    (data) => data.featuredImages.every((value) => value.progress === 100),
    {
      message: "Please let the images get uploaded to the server",
      path: ["featuredImage"],
    }
  )
  .refine(
    (data) =>
      data.additionalImages.reduce(
        (_, previousValue) =>
          previousValue
            ? previousValue.reduce(
                (__, previousItem) => previousItem.progress === 100,
                false
              )
            : true,
        false
      ),
    {
      message: "Please let the images get uploaded to the server",
      path: ["featuredImage"],
    }
  )

type MediaFormValues = {
  featuredImages: {
    progress: number
    hasError: boolean
    meta: any
  }[]
  additionalImages: {
    progress: number
    hasError: boolean
    meta: any
  }[][]
  featuredVideo: string
}

const Media = () => {
  const { toggleValidation } = useStepContext()
  const {
    control,
    formState: { errors, isValid, isSubmitted },
    setError,
    handleSubmit,
    trigger,
  } = useMediaContext()

  useIsomorphicLayoutEffect(() => {
    toggleValidation(true)
  }, [isValid])

  const onSubmit: SubmitHandler<MediaFormValues> = (values) => {}

  const mediaValues = useWatch({ control: control })
  const { error } = mediaFormSchema.safeParse(mediaValues)
  const totalFields = keys(control._fields).length
  const totalFieldErrors = error ? keys(error.flatten().fieldErrors).length : 0
  const progressValue = parseInt(
    `${((totalFields - totalFieldErrors) / totalFields) * 100}`
  )

  const ref = React.useRef(new Set<() => void>())

  useUnmountEffect(() => {
    ref.current.forEach((cb) => cb())
    ref.current.clear()
  })

  return (
    <form className="contents" onSubmit={handleSubmit(onSubmit)}>
      <ScrollArea
        className="h-[calc(theme(size.full)-148px)]"
        scrollBar={<ScrollBar className="w-4 p-1" />}
      >
        <div className="py-10 px-5 md:px-10 min-[1024px]:py-[50px] min-[1024px]:px-[75px] flex flex-col gap-y-10 min-[1024px]:flex-row min-[1024px]:gap-x-[41.45px]">
          <div className="p-3 pr-9 border rounded-lg border-blue-300 bg-blue-100 min-[1024px]:hidden">
            <div className="flex items-start gap-x-3">
              <Lightbulb05 className="size-[30px] text-primary-500" />

              <div className="flex flex-col flex-auto items-start md:items-center gap-y-3 md:flex-row gap-x-0.5">
                <div className="space-y-0.5 flex-auto">
                  <h1 className="text-base leading-[30px] font-semibold text-gray-900">
                    Tip
                  </h1>
                  <p className="text-xs leading-[14.52px] text-dark-blue-400 tracking-[0.01em]">
                    Make your project stand out with better images.
                  </p>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link">
                      <PlayCircle className="size-5" /> Show me how
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-[317.55px] p-0">
                    <MediaTip
                      className="w-full"
                      closeTrigger={
                        <DialogClose asChild>
                          <IconButton
                            className="text-primary-500/50 hover:text-primary-500 absolute top-[11px] right-[11.55px]"
                            variant="light"
                            visual="gray"
                          >
                            <X className="size-5" />
                          </IconButton>
                        </DialogClose>
                      }
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="flex-auto">
            <h1 className="text-xl leading-[30px] font-semibold text-gray-900">
              Media
            </h1>

            <div className="space-y-3 mt-6">
              <div className="space-y-0.5">
                <Label
                  className="leading-9 text-dark-blue-400 font-semibold"
                  size="lg"
                  htmlFor="title"
                  asChild
                >
                  <span>Featured Image</span>
                </Label>

                <HelperText size="sm">
                  Make a strong first impression with a standout featured image.
                </HelperText>
              </div>
              <Controller
                control={control}
                name="featuredImages"
                render={({ field: { value, onChange } }) => (
                  <Dropzone
                    size="lg"
                    icon
                    value={value}
                    onValueChange={(value) => {
                      ref.current.forEach((cb) => cb())
                      ref.current.clear()

                      onChange(value)

                      ref.current.add(
                        debounce(
                          () =>
                            onChange(
                              value?.map((item) => ({
                                ...item,
                                progress: 50,
                              }))
                            ),
                          ONE_SECOND * 3
                        ).cancel
                      )
                      ref.current.add(
                        debounce(
                          () =>
                            onChange(
                              value?.map((item) => ({
                                ...item,
                                progress: 100,
                              }))
                            ),
                          ONE_SECOND * 6
                        ).cancel
                      )
                    }}
                    onError={(message) =>
                      setError("featuredImages", { message })
                    }
                  />
                )}
              />

              <HookFormErrorMessage
                errors={errors}
                name="featuredImages"
                render={({ message }) => (
                  <ErrorMessage size="sm">{message}</ErrorMessage>
                )}
              />
            </div>

            <div className="space-y-3 mt-6">
              <div className="space-y-0.5">
                <Label
                  className="leading-9 text-dark-blue-400 font-semibold"
                  size="lg"
                  htmlFor="title"
                  asChild
                >
                  <span>Additional Images</span>
                </Label>

                <HelperText size="sm">
                  Include additional images to showcase more details.
                </HelperText>
              </div>

              <div className="grid grid-cols-4 gap-2.5">
                {Array.from({ length: 8 }, (_, index) => index).map((index) => (
                  <Controller
                    key={index}
                    name={`additionalImages.${index}`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SquareShapeDropzone
                        value={value}
                        onValueChange={(value) => {
                          onChange(
                            value?.map((item) => ({ ...item, progress: 100 }))
                          )
                          isSubmitted ? trigger("additionalImages") : noop
                        }}
                        onError={(message) =>
                          setError(`additionalImages.${index}`, { message })
                        }
                      />
                    )}
                  />
                ))}
              </div>

              <HookFormErrorMessage
                errors={errors}
                name="additionalImages.root"
                render={({ message }) => (
                  <ErrorMessage size="sm">{message}</ErrorMessage>
                )}
              />
            </div>

            <div className="space-y-3 mt-6">
              <div className="space-y-0.5">
                <Label
                  className="leading-9 text-dark-blue-400 font-semibold"
                  size="lg"
                  htmlFor="featured-video"
                >
                  Featured Video
                </Label>

                <HelperText size="sm">
                  Grab attention with a compelling video that showcases your
                  vision.
                </HelperText>
              </div>

              <InputGroup>
                <InputLeftAddon>https://</InputLeftAddon>
                <Controller
                  control={control}
                  name="featuredVideo"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Input
                      type="text"
                      id="featured-video"
                      className="rounded-l-none"
                      placeholder="www.video.com"
                      value={value.slice(8)}
                      onChange={(event) => {
                        const {
                          target: { value },
                        } = event
                        onChange(value ? `${HTTPS}${value}` : value)
                      }}
                      {...field}
                      isInvalid={hookFormHasError({
                        errors,
                        name: "featuredVideo",
                      })}
                    />
                  )}
                />
              </InputGroup>

              <HookFormErrorMessage
                errors={errors}
                name="featuredVideo"
                render={({ message }) => (
                  <ErrorMessage size="sm">{message}</ErrorMessage>
                )}
              />
            </div>
          </div>

          <div className="pl-[17.45px] xs:max-[1024px]:hidden">
            <MediaTip />
          </div>
        </div>
      </ScrollArea>

      <BottomBar progressValue={progressValue} />
    </form>
  )
}

const ProjectScopeTip = ({
  showArrow,
  closeTrigger,
  className,
}: {
  showArrow?: boolean
  closeTrigger?: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "p-5 rounded-lg w-[269px] bg-primary-50 relative",
        className
      )}
    >
      {showArrow && (
        <div className="absolute size-[25.45px] rotate-45 top-[35px] -left-[12.725px] bg-primary-50" />
      )}

      {closeTrigger}

      <div className="flex items-center gap-x-2">
        <Lightbulb05 className="size-[30px] shrink-0 text-primary-500" />
        <span className="text-base leading-[30px] font-semibold text-gray-900">
          Tip
        </span>
      </div>
      <div className="mt-1">
        <span className="text-xs leading-[14.52px] block text-dark-blue-400">
          Review and Refine Your Project Scope
        </span>

        <ul className="mt-3 list-disc pl-4 space-y-5">
          <li className="text-xs leading-[14.52px] tracking-[0.01em] text-dark-blue-400">
            Ensure all phases and tasks align with your project goals and
            deliverables.
          </li>
          <li className="text-xs leading-[14.52px] tracking-[0.01em] text-dark-blue-400">
            Review dependencies, timelines, and assignments for clarity.
          </li>
        </ul>
      </div>

      <div className="mt-3 p-4 rounded-lg border-gray-300 bg-gray-25">
        <div className="flex items-center gap-x-3">
          <Check className="size-5 shrink-0 text-success-500" />{" "}
          <span className="text-sm leading-5 font-semibold text-gray-700">
            Best practice
          </span>
        </div>

        <ul className="mt-3 list-disc pl-4 space-y-5">
          <li className="text-sm leading-[16.94px] text-gray-500">
            Use the project planner to edit existing phases or tasks
            effortlessly.
          </li>
          <li className="text-sm leading-[16.94px] text-gray-500">
            Double-check for any overlapping or missing tasks to maintain
            efficiency.
          </li>
          <li className="text-sm leading-[16.94px] text-gray-500">
            Add new phases, tasks, or processes quickly with the + Add option. •
          </li>
        </ul>
      </div>

      <div className="mt-3 p-4 rounded-lg border-gray-300 bg-gray-25">
        <div className="flex items-center gap-x-3">
          <X className="size-5 shrink-0 text-error-500" />{" "}
          <span className="text-sm leading-5 font-semibold text-gray-700">
            Avoid
          </span>
        </div>

        <ul className="mt-3 list-disc pl-4 space-y-5">
          <li className="text-sm leading-[16.94px] text-gray-500">
            Leaving phases or tasks incomplete or ambiguous.
          </li>
          <li className="text-sm leading-[16.94px] text-gray-500">
            Try not to overload a single phase with too many tasks; break them
            down if needed.
          </li>
        </ul>
      </div>
    </div>
  )
}

const phaseNameFormSchema = z.object({
  name: z.string().min(1, "Please enter at least 1 character(s)"),
})

type PhaseNameFormValues = z.infer<typeof phaseNameFormSchema>

const PhaseNameDialog = ({
  onOpenChange,
  onAddPhaseName,
  open,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onAddPhaseName: (phaseName: string) => void
}) => {
  const [isOpen, toggleIsOpen] = useControllableState({
    defaultValue: false,
    value: open,
    onChange: onOpenChange,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhaseNameFormValues>({
    resolver: zodResolver(phaseNameFormSchema),
  })

  const onSubmit: SubmitHandler<PhaseNameFormValues> = (values) => {
    const { name } = values
    onAddPhaseName(name)

    toggleIsOpen(false)
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
        <DialogContent className="px-5 w-full py-10 md:px-10 bg-transparent shadow-none rounded-none">
          <form
            className="max-w-[371px] bg-white p-6 rounded-xl shadow-[0px_8px_8px_-4px_rgba(16,24,40,.03)_0px_20px_24px_-4px_rgba(16,24,40,.08)]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-1.5">
              <Label htmlFor="phase-name" className="text-gray-700" size="sm">
                Phase Name
              </Label>
              <Input
                id="phase-name"
                className="text-gray-900"
                defaultValue="Stage 1"
                {...register("name")}
                isInvalid={hookFormHasError({ errors, name: "name" })}
              />
              <HookFormErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => <ErrorMessage>{message}</ErrorMessage>}
              />
            </div>

            <DialogFooter className="mt-8 grid gap-x-3">
              <DialogClose asChild>
                <Button type="button" variant="outlined" visual="gray">
                  Cancel
                </Button>
              </DialogClose>

              <Button>Done</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

type TaskFormValues = z.infer<typeof taskFormSchema>

const TaskDialog = ({
  open,
  onOpenChange,
  onAddTask,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onAddTask: (values: TaskFormValues) => void
}) => {
  const [isOpen, toggleIsOpen] = useControllableState({
    defaultValue: false,
    value: open,
    onChange: onOpenChange,
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      duration: {
        type: "hours",
        value: 40,
      },
      task: "Affinity Mapping",
    },
  })
  const onSubmit: SubmitHandler<TaskFormValues> = (values) => {
    onAddTask(values)
    toggleIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
      <DialogContent className="px-5 w-full py-10 md:px-10 bg-transparent shadow-none rounded-none">
        <form
          className="max-w-[371px] bg-white p-6 rounded-xl shadow-[0px_8px_8px_-4px_rgba(16,24,40,.03)_0px_20px_24px_-4px_rgba(16,24,40,.08)]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-1.5">
            <Label htmlFor="task-name" className="text-gray-700" size="sm">
              Task Name
            </Label>
            <Input
              id="task-name"
              className="text-gray-900"
              {...register("task")}
              isInvalid={hookFormHasError({ errors, name: "task" })}
            />
            <HookFormErrorMessage
              errors={errors}
              name="task"
              render={({ message }) => <ErrorMessage>{message}</ErrorMessage>}
            />
          </div>

          <div className="space-y-1.5 mt-3">
            <Label htmlFor="duration" className="text-gray-700" size="sm">
              Duration
            </Label>
            <div className="grid grid-cols-2 gap-x-3">
              <Input
                id="duration"
                className="text-gray-900"
                defaultValue="40"
                {...register("duration.value")}
                isInvalid={hookFormHasError({ errors, name: "duration.value" })}
              />
              <Controller
                control={control}
                name="duration.type"
                render={({ field: { value, onChange } }) => (
                  <Listbox value={value} onChange={onChange} id="duration">
                    <ListboxButton placeholder="Select" />
                    <ListboxOptions>
                      {DURATION_TYPE.map((format) => (
                        <ListboxOption key={format} value={format}>
                          {format}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Listbox>
                )}
              />
            </div>

            {(hookFormHasError({ errors, name: "duration.value" }) ||
              hookFormHasError({
                errors,
                name: "duration.type",
              })) && (
              <ErrorMessage size="sm">
                {get(errors, "duration.value.message") ||
                  get(errors, "duration.type.message")}
              </ErrorMessage>
            )}
          </div>

          <DialogFooter className="mt-8 grid gap-x-3">
            <DialogClose asChild>
              <Button variant="outlined" type="button" visual="gray">
                Cancel
              </Button>
            </DialogClose>

            <Button>Done</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const durationFormSchema = taskFormSchema.pick({ duration: true })

type DurationFormValues = z.infer<typeof durationFormSchema>

const DurationDialog = ({
  onOpenChange,
  open,
  durationFormValues,
  onDurationFormValuesChange,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  durationFormValues?: DurationFormValues
  onDurationFormValuesChange: (durationFormValues: DurationFormValues) => void
}) => {
  const [isOpen, toggleIsOpen] = useControllableState({
    defaultValue: false,
    value: open,
    onChange: onOpenChange,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<DurationFormValues>({
    resolver: zodResolver(durationFormSchema),
    values: durationFormValues,
  })

  const onSubmit: SubmitHandler<DurationFormValues> = (values) => {
    onDurationFormValuesChange?.(values)
    toggleIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
      <DialogContent className="px-5 w-full py-10 md:px-10 bg-transparent shadow-none rounded-none">
        <form
          className="max-w-[371px] bg-white p-6 rounded-xl shadow-[0px_8px_8px_-4px_rgba(16,24,40,.03)_0px_20px_24px_-4px_rgba(16,24,40,.08)]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-1.5">
            <Label htmlFor="duration" className="text-gray-700" size="sm">
              Duration
            </Label>
            <div className="grid grid-cols-2 gap-x-3">
              <Input
                id="duration"
                className="text-gray-900"
                defaultValue="40"
                {...register("duration.value")}
                isInvalid={hookFormHasError({ errors, name: "duration.value" })}
              />
              <Controller
                control={control}
                name="duration.type"
                render={({ field: { value, onChange } }) => (
                  <Listbox value={value} onChange={onChange} id="duration">
                    <ListboxButton placeholder="Select" />
                    <ListboxOptions>
                      {DURATION_TYPE.map((format) => (
                        <ListboxOption key={format} value={format}>
                          {format}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </Listbox>
                )}
              />
            </div>

            {(hookFormHasError({ errors, name: "duration.value" }) ||
              hookFormHasError({
                errors,
                name: "duration.type",
              })) && (
              <ErrorMessage size="sm">
                {get(errors, "duration.value.message") ||
                  get(errors, "duration.type.message")}
              </ErrorMessage>
            )}
          </div>

          <DialogFooter className="mt-8 grid gap-x-3">
            <DialogClose asChild>
              <Button variant="outlined" visual="gray">
                Cancel
              </Button>
            </DialogClose>

            <Button>Done</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const SaveExitDialog = ({
  onOpenChange,
  open,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [isOpen, toggleIsOpen] = useControllableState({
    defaultValue: false,
    value: open,
    onChange: onOpenChange,
  })
  return (
    <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
      <DialogContent className="px-5 w-full py-10 md:px-10 bg-transparent shadow-none rounded-none">
        <div className="max-w-[371px] bg-white p-6 rounded-xl shadow-[0px_8px_8px_-4px_rgba(16,24,40,.03)_0px_20px_24px_-4px_rgba(16,24,40,.08)]">
          <DialogTitle>Save & Exit</DialogTitle>
          <DialogDescription>
            Would you like to save your project scope progress before exiting?
            You can resume editing any time.
          </DialogDescription>

          <DialogFooter className="mt-8 grid gap-x-3">
            <DialogClose asChild>
              <Button variant="outlined" visual="gray">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Save & Exit</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const Dropdown = ({
  onValueChange,
  value,
  placeholder,
}: {
  onValueChange?: (value: string) => void
  value?: string
  placeholder?: string
}) => {
  const [state, setState] = useControllableState({
    onChange: onValueChange,
    value,
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-gray-100 focus-visible:outline-none px-2 py-[5px] border border-gray-300 border-dashed rounded-[5px] inline-flex items-center gap-x-1.5">
        <span className="text-xs leading-[18px] font-medium text-gray-700">
          {state ? state : placeholder}
        </span>
        <ChevronDown className="size-[18px] shrink-0 text-gray-500" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-max">
        <DropdownMenuRadioGroup value={value} onValueChange={setState}>
          <DropdownMenuRadioItem
            className="gap-x-2"
            hideIndicator={false}
            value="Student"
          >
            <Network />
            Student (0 - 2 years)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="gap-x-2"
            hideIndicator={false}
            value="Junior"
          >
            <Network1 />
            Junior (2 - 3 years)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="gap-x-2"
            hideIndicator={false}
            value="Mediator"
          >
            <Network2 />
            Medior (3 - 5 years)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="gap-x-2"
            hideIndicator={false}
            value="Senior"
          >
            <Network3 />
            Senior (5 - 10 years)
          </DropdownMenuRadioItem>

          <DropdownMenuRadioItem
            className="gap-x-2"
            hideIndicator={false}
            value="Guru"
          >
            <Network4 />
            Guru (10+ years)
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const DeletePhaseDialog = ({
  onOpenChange,
  open,
  onDeletePhase,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  onDeletePhase: () => void
}) => {
  const [isOpen, toggleIsOpen] = useControllableState({
    defaultValue: false,
    value: open,
    onChange: onOpenChange,
  })
  return (
    <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
      <DialogContent className="px-5 w-full py-10 md:px-10 bg-transparent shadow-none rounded-none">
        <div className="max-w-[371px] bg-white p-6 rounded-xl shadow-[0px_8px_8px_-4px_rgba(16,24,40,.03)_0px_20px_24px_-4px_rgba(16,24,40,.08)]">
          <DialogTitle>Delete this phase?</DialogTitle>
          <DialogDescription>
            This phase will be deleted permanently. You will not be able to
            recover it.
          </DialogDescription>

          <DialogFooter className="mt-8 grid gap-x-3">
            <DialogClose asChild>
              <Button variant="outlined" visual="gray">
                Cancel
              </Button>
            </DialogClose>

            <Button
              onClick={() => {
                onDeletePhase()
                toggleIsOpen(false)
              }}
            >
              Done
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const MoreDropdown = (props: {
  openDeletePhaseDialog: () => void
  openPhaseDialog: () => void
  onInsertBelow: () => void
  onInsertAbove: () => void
  onDuplicatePhase: () => void
  onSwapPhases: (to: number) => void
}) => {
  const {
    openDeletePhaseDialog,
    openPhaseDialog,
    onInsertAbove,
    onInsertBelow,
    onDuplicatePhase,
    onSwapPhases: onSwapPhasesProp,
  } = props
  const arrayNavigator = useArrayNavigationContext()
  const selectedIndex = arrayNavigator?.selectedIndex

  const onSwapPhases = useCallbackRef(onSwapPhasesProp)

  useUpdateEffect(() => {
    if (selectedIndex !== undefined) {
      onSwapPhases(selectedIndex)
    }
  }, [onSwapPhases, selectedIndex])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-[23px] px-1.5 py-1 text-gray-500"
          variant="ghost"
          visual="gray"
        >
          <MoreHorizontal className="h-[15px] w-[15px]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {arrayNavigator?.canMoveLeft && (
          <DropdownMenuItem onSelect={arrayNavigator?.moveToLeft}>
            <ArrowUp className="h-4 w-4" /> Move up
          </DropdownMenuItem>
        )}
        {arrayNavigator?.canMoveRight && (
          <DropdownMenuItem onSelect={arrayNavigator?.moveToRight}>
            <ArrowDown className="h-4 w-4" /> Move down
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDuplicatePhase}>
          <Copy className="h-4 w-4" /> Duplicate Phase
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onInsertAbove}>
          <ArrowUpLeft className="h-4 w-4" /> Insert Phase Above
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onInsertBelow}>
          <ArrowDownLeft className="h-4 w-4" /> Insert Phase Below
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={openPhaseDialog}>
          <Type className="h-4 w-4" /> Rename Phase
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem visual="destructive" onSelect={openDeletePhaseDialog}>
          <Trash2 className="h-4 w-4" /> Delete Phase
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const PlusDropdown = ({
  addPhase,
  addTask,
}: {
  addTask: () => void
  addPhase: () => void
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton className="text-gray-500" variant="outlined" visual="gray">
          <Plus className="size-3" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto" align="end">
        <DropdownMenuItem onSelect={addTask}>
          <Plus className="size-4" /> Add Task
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={addPhase}>
          <Plus className="h-4 w-4" /> Add Phase
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

type PhaseRow = Prettify<
  {
    id: string
    role?: string
    location?: string
    experience?: string
  } & TaskFormValues
>

interface Phase {
  phaseName?: string
  rows?: PhaseRow[]
}

interface PhaseTableRowProps {
  row: Row<PhaseRow>
}

const PhaseTableRow = ({ row }: PhaseTableRowProps) => {
  const { transform, transition, setNodeRef, isDragging, isOver } = useSortable(
    {
      id: row.original.id,
    }
  )

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  }

  return (
    <TableRow
      className={cn(
        "group/row hover:bg-transparent relative",
        isOver &&
          "after:content-[''] after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:bg-primary-500"
      )}
      ref={setNodeRef}
      style={style}
    >
      {row.getVisibleCells().map((cell) => (
        <Fragment key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </Fragment>
      ))}
    </TableRow>
  )
}

const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
  const { attributes, listeners } = useSortable({
    id: rowId,
  })
  return (
    <button
      className="focus-visible:outline-none transition duration-300 group-hover/row:opacity-100 opacity-0 text-gray-900/50 hover:text-gray-900"
      {...attributes}
      {...listeners}
    >
      <GripVertical2 />
    </button>
  )
}

const columnHelper = createColumnHelper<PhaseRow>()

const columns = [
  columnHelper.accessor("task", {
    cell: ({ getValue, row: { id } }) => (
      <TableCell className="py-4 px-6">
        <span className="inline-flex items-center gap-x-1.5">
          <RowDragHandleCell rowId={id} />
          <span className="text-sm font-semibold text-gray-900">
            {getValue()}
          </span>
        </span>
      </TableCell>
    ),
    header: "Task Name",
  }),
  columnHelper.accessor("role", {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      // eslint-disable-next-line
      const [value, setValue] = useUncontrolledState({
        defaultValue: getValue(),
        onChange: (value) => table.options.meta?.updateData(index, id, value),
      })

      return (
        <TableCell className="py-4 px-6">
          <OwnCombobox
            value={value}
            onValueChange={setValue}
            placeholder="Add Role"
            options={table.options.meta?.roles}
          />
        </TableCell>
      )
    },
    header: "Role",
  }),
  columnHelper.accessor("location", {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      // eslint-disable-next-line
      const [value, setValue] = useUncontrolledState({
        defaultValue: getValue(),
        onChange: () => {
          table.options.meta?.updateData(index, id, value)
        },
      })
      return (
        <TableCell className="px-3 py-4">
          <CountriesCombobox
            placeholder="Location"
            value={value}
            onValueChange={setValue}
          />
        </TableCell>
      )
    },
    header: "Location",
  }),
  columnHelper.accessor("experience", {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      // eslint-disable-next-line
      const [value, setValue] = useUncontrolledState({
        defaultValue: getValue(),
        onChange: (value) => table.options.meta?.updateData(index, id, value),
      })
      return (
        <TableCell className="py-4 px-6">
          <Dropdown
            placeholder="Experience"
            value={value}
            onValueChange={setValue}
          />
        </TableCell>
      )
    },
    header: "Experience",
  }),
  columnHelper.accessor("duration", {
    cell: ({ getValue, table, row: { index } }) => (
      <TableCell className="py-4 px-6">
        <button
          className="focus-visible:outline-none"
          type="button"
          onClick={() => table.options.meta?.openDurationDialog(index)}
        >
          {getValue().value} {getValue().type}
        </button>
      </TableCell>
    ),
    header: "Duration",
  }),
]

interface PhaseTableProps {
  rows: PhaseRow[]
  onRowsChange: (rows: PhaseRow[]) => void
  openDurationDialog: (index: number) => void
}

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Cloud Engineer",
  "Database Administrator",
  "Security Engineer",
  "Mobile Developer",
  "QA Engineer",
  "System Architect",
  "Network Engineer",
  "Site Reliability Engineer (SRE)",
  "Software Engineer",
  "UI/UX Designer",
  "Graphic Designer",
  "Product Designer",
  "Interaction Designer",
  "Visual Designer",
  "Motion Designer",
  "Web Designer",
  "Brand Designer",
  "Illustrator",
  "Information Architect",
  "User Researcher",
  "Content Strategist",
  "Design Technologist",
  "Experience Designer",
  "Service Designer",
]

const useArrayNavigator = <T,>(items: T[], itemIndex: number) => {
  const [selectedIndex, setSelectedIndex] = useState(itemIndex)

  const canMoveLeft = itemIndex > 0
  const canMoveRight = itemIndex < items.length - 1

  const moveToLeft = useCallback(() => {
    if (canMoveLeft) {
      setSelectedIndex((prev) => prev - 1)
    }
  }, [canMoveLeft])

  const moveToRight = useCallback(() => {
    if (canMoveRight) {
      setSelectedIndex((prev) => prev + 1)
    }
  }, [canMoveRight])

  return useMemo(
    () => ({
      moveToRight,
      moveToLeft,
      canMoveLeft,
      canMoveRight,
      selectedIndex,
    }),
    [moveToRight, moveToLeft, canMoveLeft, canMoveRight, selectedIndex]
  )
}

const [ArrayNavigatorProvider, useArrayNavigationContext] = createStrictContext<
  ReturnType<typeof useArrayNavigator>
>({
  displayName: "ArrayNavigatorContext",
  errorMessage: `useArrayNavigatorContext returned is 'undefined'. Seems you forgot to wrap the components in "<ArrayNavigator />"`,
})

const ArrayNavigator = ({
  children,
  value,
  index,
}: {
  children?: React.ReactNode
  value: { phaseName?: string; rows?: PhaseRow[] }[]
  index: number
}) => {
  const arrayNavigation = useArrayNavigator(value, index)
  return (
    <ArrayNavigatorProvider value={arrayNavigation}>
      {children}
    </ArrayNavigatorProvider>
  )
}

const PhaseTable = ({
  rows,
  onRowsChange,
  openDurationDialog,
}: PhaseTableProps) => {
  const [data, setData] = useControllableState({
    value: rows,
    onChange: onRowsChange,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setData((prev) =>
          prev.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...row,
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
      openDurationDialog,
      roles: ROLES,
    },
  })

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data.map(({ id }) => id),
    [data]
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Table>
        <TableHeader className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="hover:bg-transparent" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <SortableContext
            items={dataIds}
            strategy={verticalListSortingStrategy}
          >
            {table.getRowModel().rows.map((row) => (
              <PhaseTableRow key={row.id} row={row} />
            ))}
          </SortableContext>
        </TableBody>
      </Table>
    </DndContext>
  )
}

type PhaseNameDialogAction =
  | {
      type: "TOGGLE"
      payload?: { open?: boolean; addTo?: "start" | "end" }
    }
  | { type: "EDIT"; payload: number }

type PhaseNameDialogState = {
  open: boolean
  editingPhaseIndex: number | null
  action: "EDIT" | null
  addTo: "start" | "end"
}

const phaseNameDialogReducer = (
  state: PhaseNameDialogState,
  action: PhaseNameDialogAction
): PhaseNameDialogState => {
  switch (action.type) {
    case "TOGGLE":
      const { payload } = action
      return {
        ...state,
        action: null,
        editingPhaseIndex: null,
        open: typeof payload?.open === "boolean" ? payload.open : !state.open,
        addTo: typeof payload?.addTo === "string" ? payload.addTo : "end",
      }
    case "EDIT":
      return {
        ...state,
        addTo: "end",
        action: "EDIT",
        open: true,
        editingPhaseIndex: action.payload,
      }

    default:
      return state
  }
}

const defaultPhaseNameDialogState: PhaseNameDialogState = {
  action: null,
  editingPhaseIndex: null,
  open: false,
  addTo: "end",
}

type TaskDialogState = {
  open: boolean
  editingPhaseIndex: number | null
}

interface DurationDialogState extends TaskDialogState {
  editingPhaseRowIndex: number | null
}

type DeletePhaseDialogState = {
  open: boolean
  phaseIndex: number | null
}

const ProjectScope = () => {
  const [taskDialogState, setTaskDialogState] = useState<TaskDialogState>({
    editingPhaseIndex: null,
    open: false,
  })
  const [durationDialogState, setDurationDialogState] =
    useState<DurationDialogState>({
      editingPhaseIndex: null,
      editingPhaseRowIndex: null,
      open: false,
    })
  const [phaseDialogState, dispatch] = useReducer(
    phaseNameDialogReducer,
    defaultPhaseNameDialogState
  )
  const [accordionState, setAccordionState] = useState(["item-0"])
  const { projectScopeMethods } = useProjectScopeContext()
  const { toggleValidation, status } = useStepContext()

  const [projectScopeState, setProjectScopeState] = projectScopeMethods

  const [phases, setPhases] = useControllableState<Phase[]>({
    value: projectScopeState,
    onChange: (value) => {
      setProjectScopeState(value)
      expandAll()
    },
  })
  const { success } = projectScopeSchema.safeParse(phases)

  useIsomorphicLayoutEffect(() => {
    toggleValidation(success)
  }, [success])

  const [deletePhaseDialogState, setDeletePhaseDialogState] =
    useState<DeletePhaseDialogState>({
      phaseIndex: null,
      open: false,
    })

  const expandAll = useCallback(() => {
    setAccordionState(phases.map((_, index) => `item-${index}`))
  }, [phases])

  const collapseAll = useCallback(() => {
    setAccordionState([])
  }, [])

  const handleOpenTaskDialog = useCallback(
    (phaseIndex: number) => {
      const { phaseName } = phases[phaseIndex]

      if (!phaseName) {
        dispatch({ type: "EDIT", payload: phaseIndex })
      } else {
        setTaskDialogState({
          open: true,
          editingPhaseIndex: phaseIndex,
        })
      }
    },
    [phases]
  )

  const handleRowsChange = useCallback(
    (phaseIndex: number, rows: PhaseRow[]) => {
      setPhases((prev) =>
        prev.map((phase, index) =>
          index === phaseIndex ? { ...phase, rows } : phase
        )
      )
    },
    [setPhases]
  )

  const handleSwapPhases = useCallback(
    (from: number, to: number) => {
      setPhases((prev) => arrayMove(prev, from, to))
    },
    [setPhases]
  )

  const onAddPhaseName = useCallback(
    (phaseName: string) => {
      const { action, editingPhaseIndex, addTo } = phaseDialogState

      if (action === "EDIT" && typeof editingPhaseIndex === "number") {
        setPhases((prev) => {
          const nextState = prev.map((item, index) =>
            index === editingPhaseIndex ? { ...item, phaseName } : item
          )
          return nextState
        })
      } else {
        setPhases((prev) =>
          addTo === "start"
            ? [{ phaseName }, ...prev]
            : [...prev, { phaseName }]
        )
      }
    },
    [phaseDialogState, setPhases]
  )

  const onAddTask = useCallback(
    (values: TaskFormValues) => {
      const { editingPhaseIndex } = taskDialogState

      if (typeof editingPhaseIndex === "number") {
        setPhases((prev) => {
          const newPhases = prev.map((phase, index) => {
            if (index === editingPhaseIndex) {
              const newRow = { ...values, id: `${getId()}` }
              const { rows } = phase

              return {
                ...phase,
                rows: rows ? [...rows, newRow] : [newRow],
              }
            }
            return phase
          })

          return newPhases
        })
      }
    },
    [taskDialogState, setPhases]
  )

  const onDurationFormValuesChange = useCallback(
    (durationFormValues: DurationFormValues) => {
      const { editingPhaseIndex, editingPhaseRowIndex } = durationDialogState
      if (
        typeof editingPhaseIndex === "number" &&
        typeof editingPhaseRowIndex === "number"
      ) {
        setPhases((prevPhases) => {
          const newRows = prevPhases[editingPhaseIndex].rows?.map(
            (item, index) =>
              index === editingPhaseRowIndex
                ? { ...item, ...durationFormValues }
                : item
          )
          const newPhases = prevPhases.map((item, index) =>
            index === editingPhaseIndex ? { ...item, rows: newRows } : item
          )

          return newPhases
        })
      }
    },
    [durationDialogState, setPhases]
  )

  const durationFormValues = useMemo(() => {
    const { editingPhaseIndex, editingPhaseRowIndex } = durationDialogState
    if (
      typeof editingPhaseIndex === "number" &&
      typeof editingPhaseRowIndex === "number"
    ) {
      const { rows } = phases[editingPhaseIndex]
      const { duration } = (rows ?? [])[editingPhaseRowIndex]

      return {
        duration: { ...duration },
      }
    }
  }, [durationDialogState, phases])

  const onDeletePhase = useCallback(() => {
    const { phaseIndex } = deletePhaseDialogState
    setPhases((prev) => prev.filter((_, index) => index !== phaseIndex))
  }, [deletePhaseDialogState, setPhases])

  const handleOpenDeletePhaseDialog = useCallback((phaseIndex: number) => {
    setDeletePhaseDialogState({
      phaseIndex,
      open: true,
    })
  }, [])

  const onDuplicatePhase = useCallback(
    (phaseIndex: number) => {
      setPhases((prev) => {
        const nextState = [...prev]
        nextState.splice(phaseIndex, 0, nextState[phaseIndex])
        return nextState
      })
    },
    [setPhases]
  )

  return (
    <>
      <ScrollArea
        className="h-[calc(theme(size.full)-148px)]"
        scrollBar={<ScrollBar className="w-4 p-1" />}
      >
        <div className="py-10 px-5 md:px-10 min-[1024px]:py-[50px] min-[1024px]:px-[75px] min-[1024px]:flex space-y-10 min-[1024px]:space-y-0 min-[1024px]:flex-row min-[1024px]:gap-x-[41.45px]">
          <div className="p-3 pr-9 border rounded-lg border-blue-300 bg-blue-100 min-[1024px]:hidden">
            <div className="flex items-start gap-x-3">
              <Lightbulb05 className="size-[30px] text-primary-500" />

              <div className="flex flex-col flex-auto items-start md:items-center gap-y-3 md:flex-row gap-x-0.5">
                <div className="space-y-0.5 flex-auto">
                  <h1 className="text-base leading-[30px] font-semibold text-gray-900">
                    Tip
                  </h1>
                  <p className="text-xs leading-[14.52px] text-dark-blue-400 tracking-[0.01em]">
                    A great title gives your audience a reason to open your
                    project
                  </p>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link">
                      <PlayCircle className="size-5" /> Show me how
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="max-w-[317.55px] p-0">
                    <ProjectScopeTip
                      className="w-full"
                      closeTrigger={
                        <DialogClose asChild>
                          <IconButton
                            className="text-primary-500/50 hover:text-primary-500 absolute top-[11px] right-[11.55px]"
                            variant="light"
                            visual="gray"
                          >
                            <X className="size-5" />
                          </IconButton>
                        </DialogClose>
                      }
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="space-y-6 flex-auto">
            <div className="flex md:flex-row flex-col gap-y-6 md:gap-y-0 md:items-center justify-between">
              <h1 className="text-xl leading-[30px] font-semibold text-gray-800">
                Project Scope
              </h1>

              <div className="flex items-center md:gap-x-3">
                <div className="flex items-center">
                  <Button
                    className="border-r-0 rounded-r-none"
                    variant="outlined"
                    visual="gray"
                    onClick={expandAll}
                  >
                    <ChevronsDown className="size-[15px]" /> Expand all
                  </Button>
                  <Button
                    className="rounded-l-none md:rounded-r-[5px] rounded-r-none"
                    variant="outlined"
                    visual="gray"
                    onClick={collapseAll}
                  >
                    <ChevronsUp className="size-[15px]" /> Collapse All
                  </Button>
                </div>

                <Button
                  className="border-l-0 rounded-l-none md:border-l md:rounded-l-[5px]"
                  variant="outlined"
                  visual="gray"
                  onClick={() => dispatch({ type: "TOGGLE" })}
                >
                  <Plus className="size-[15px]" /> Add Phase
                </Button>
              </div>
            </div>

            <InputGroup>
              <Input type="text" placeholder="Find a phase or task" />
              <InputLeftElement>
                <SearchMd className="text-gray-500 h-5 w-5" />
              </InputLeftElement>
            </InputGroup>

            <Accordion
              value={accordionState}
              onValueChange={setAccordionState}
              type="multiple"
              className="flex-auto space-y-3"
            >
              {phases.map(({ phaseName, rows }, index) => (
                <ArrayNavigator key={index} value={phases} index={index}>
                  {rows ? (
                    <AccordionItem value={`item-${index}`} asChild>
                      <div className="rounded-lg border border-gray-200 shadow-sm">
                        <div className="mb-3 flex items-start gap-x-4 px-3 pt-3">
                          <div className="flex flex-auto gap-y-2 md:flex-row md:justify-between md:items-center flex-col">
                            <div className="inline-flex items-center gap-x-3.5">
                              <AccordionTrigger className="focus-visible:outline-none size-8 inline-flex items-center justify-center">
                                <ChevronDown className="size-5 shrink-0 text-gray-500 group-data-[state=open]/item:-rotate-180 transition duration-300" />
                              </AccordionTrigger>

                              <span className="text-base md:text-[18px] font-semibold leading-7 text-gray-900">
                                Phase One{" "}
                                <span className="font-light">{phaseName}</span>
                              </span>
                            </div>

                            <div className="inline-flex items-center gap-x-2 md:pl-0 pl-10">
                              <span className="text-xs leading-[14.52px] md:text-[13px] md:leading-[15.73px] text-dark-blue-400 font-semibold">
                                Day 1
                              </span>
                              <span className="text-xs leading-[14.52px] md:text-[13px] md:leading-[15.73px] text-dark-blue-400 font-semibold">
                                -
                              </span>
                              <span className="text-xs leading-[14.52px] md:text-[13px] md:leading-[15.73px] text-dark-blue-400 font-semibold">
                                Day 8
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-x-4 items-center">
                            <MoreDropdown
                              onSwapPhases={(to) => handleSwapPhases(index, to)}
                              openPhaseDialog={() =>
                                dispatch({ type: "EDIT", payload: index })
                              }
                              openDeletePhaseDialog={() =>
                                handleOpenDeletePhaseDialog(index)
                              }
                              onInsertAbove={() =>
                                dispatch({
                                  type: "TOGGLE",
                                  payload: { addTo: "start" },
                                })
                              }
                              onInsertBelow={() => dispatch({ type: "TOGGLE" })}
                              onDuplicatePhase={() => onDuplicatePhase(index)}
                            />
                            <PlusDropdown
                              addTask={() => handleOpenTaskDialog(index)}
                              addPhase={() => dispatch({ type: "TOGGLE" })}
                            />
                          </div>
                        </div>

                        <DisclosureContent className="overflow-auto">
                          <PhaseTable
                            rows={rows}
                            onRowsChange={(rows) =>
                              handleRowsChange(index, rows)
                            }
                            openDurationDialog={(editingPhaseRowIndex) =>
                              setDurationDialogState({
                                editingPhaseIndex: index,
                                editingPhaseRowIndex,
                                open: true,
                              })
                            }
                          />
                        </DisclosureContent>
                      </div>
                    </AccordionItem>
                  ) : (
                    <AccordionItem value={`item-${index}`} asChild>
                      <div className="rounded-lg border border-gray-100 shadow-xs">
                        <div className="mb-3 flex items-center gap-x-4 px-3 pt-3">
                          <div className="flex flex-auto justify-between items-center">
                            <div className="inline-flex items-center gap-x-3.5">
                              <AccordionTrigger asChild>
                                <IconButton
                                  className="size-8"
                                  variant="ghost"
                                  visual="gray"
                                >
                                  <ChevronDown className="size-5 shrink-0 text-gray-500 group-data-[state=open]/item:-rotate-180 transition duration-300" />
                                </IconButton>
                              </AccordionTrigger>

                              <div className="inline-flex md:flex-row gap-x-1.5 flex-col md:items-center gap-y-3 md:gap-x-5">
                                <span className="text-base md:text-[18px] font-semibold md:font-light leading-7 text-gray-900">
                                  Phase one
                                </span>{" "}
                                {phaseName ? (
                                  <span className="text-lg leading-8 font-semibold text-gray-900">
                                    {phaseName}
                                  </span>
                                ) : (
                                  <button
                                    className="focus-visible:outline-none inline-flex items-center gap-x-2"
                                    onClick={() =>
                                      dispatch({
                                        type: "EDIT",
                                        payload: index,
                                      })
                                    }
                                  >
                                    <Edit03 className="size-[15px] text-gray-800" />
                                    <span className="inline-block text-sm leading-5 font-semibold text-gray-800">
                                      Edit Phase Name
                                    </span>
                                  </button>
                                )}
                                <div className="inline-block md:hidden">
                                  <span className="text-xs leading-[14.52px] md:text-[13px] md:leading-[15.73px] text-dark-blue-400 font-semibold">
                                    Day {index + 1}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="hidden md:inline-flex items-center gap-x-2 md:pl-0 pl-10">
                              <span className="text-xs leading-[14.52px] md:text-[13px] md:leading-[15.73px] text-dark-blue-400 font-semibold">
                                Day {index + 1}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-x-4 items-center">
                            <MoreDropdown
                              onSwapPhases={(to) => handleSwapPhases(index, to)}
                              openPhaseDialog={() =>
                                dispatch({ type: "EDIT", payload: index })
                              }
                              openDeletePhaseDialog={() =>
                                handleOpenDeletePhaseDialog(index)
                              }
                              onInsertAbove={() =>
                                dispatch({
                                  type: "TOGGLE",
                                  payload: { addTo: "start" },
                                })
                              }
                              onInsertBelow={() => dispatch({ type: "TOGGLE" })}
                              onDuplicatePhase={() => onDuplicatePhase(index)}
                            />
                            <PlusDropdown
                              addTask={() => handleOpenTaskDialog(index)}
                              addPhase={() => dispatch({ type: "TOGGLE" })}
                            />
                          </div>
                        </div>
                        <DisclosureContent className="overflow-auto">
                          <div className="w-full overflow-auto flex border-t border-gray-200 flex-col justify-center min-h-[208px] md:min-h-[228px]">
                            <div className="max-w-[352px] mx-auto">
                              <h1 className="text-base font-semibold text-center leading-6 text-gray-800">
                                Create your first task
                              </h1>
                              <p className="text-sm mt-1 leading-5 text-center text-gray-800">
                                Start defining your project scope with a clear,
                                actionable step.
                              </p>

                              <div className="mt-6 flex justify-center">
                                <Button
                                  className="bg-primary-50 text-primary-500 hover:bg-primary-500 hover:text-white"
                                  onClick={() => handleOpenTaskDialog(index)}
                                >
                                  <Plus className="size-[15px]" />
                                  Add Task
                                </Button>
                              </div>
                            </div>
                          </div>
                        </DisclosureContent>
                      </div>
                    </AccordionItem>
                  )}
                </ArrayNavigator>
              ))}
            </Accordion>

            <Button
              className="mt-5"
              variant="ghost"
              visual="gray"
              onClick={() => dispatch({ type: "TOGGLE" })}
            >
              <Plus className="size-[15px]" /> Add Phase
            </Button>

            <PhaseNameDialog
              onOpenChange={(open) =>
                dispatch({ type: "TOGGLE", payload: { open } })
              }
              open={phaseDialogState.open}
              onAddPhaseName={onAddPhaseName}
            />
            <TaskDialog
              open={taskDialogState.open}
              onOpenChange={(open) =>
                setTaskDialogState((prev) => ({
                  ...prev,
                  open,
                  editingPhaseIndex: null,
                }))
              }
              onAddTask={onAddTask}
            />
            <DurationDialog
              durationFormValues={durationFormValues}
              open={durationDialogState.open}
              onDurationFormValuesChange={onDurationFormValuesChange}
              onOpenChange={(open) =>
                setDurationDialogState({
                  editingPhaseIndex: null,
                  editingPhaseRowIndex: null,
                  open,
                })
              }
            />
            <DeletePhaseDialog
              open={deletePhaseDialogState.open}
              onOpenChange={(open) =>
                setDeletePhaseDialogState({
                  phaseIndex: null,
                  open,
                })
              }
              onDeletePhase={onDeletePhase}
            />
          </div>

          <div className="pl-[17.45px] xs:max-[1024px]:hidden">
            <ProjectScopeTip showArrow />
          </div>
        </div>
      </ScrollArea>

      <BottomBar progressValue={0} />
    </>
  )
}

const steps: Steps[] = [
  { label: "Project Info", isValid: false, disabled: false },
  { label: "Media", isValid: false, disabled: true },
  { label: "Project Scope", isValid: false, disabled: true },
]

const [ProjectInfoProvider, useProjectInfoContext] = createContext<
  UseFormReturn<ProjectInfoFormValues>
>({
  displayName: "ProjectInfoProvider",
  errorMessage: `useProjectInfoContext returned is 'undefined'. Seems you forgot to wrap the components in "<ProjectInfoPopover />"`,
})

const [MediaProvider, useMediaContext] = createContext<
  UseFormReturn<MediaFormValues>
>({
  displayName: "MediaProvider",
  errorMessage: `useMediaContext returned is 'undefined'. Seems you forgot to wrap the components in "<MediaPopover />"`,
})

const [ProjectScopeProvider, useProjectScopeContext] = createContext<{
  projectScopeMethods: [Phase[], React.Dispatch<React.SetStateAction<Phase[]>>]
  isProjectSubmitted: boolean
  setIsProjectSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}>({
  displayName: "MediaProvider",
  errorMessage: `useMediaContext returned is 'undefined'. Seems you forgot to wrap the components in "<MediaPopover />"`,
})

function PublishProject({
  media,
  projectInfo,
  projectScope,
}: {
  projectInfo?: React.ReactNode
  media?: React.ReactNode
  projectScope?: React.ReactNode
}) {
  const {
    nextStep,
    prevStep,
    setStep,
    toggleStepValidation,
    state: { currentStep, hasNextStep, hasPreviousStep, totalSteps },
    stepsState,
  } = useStepper({
    steps,
  })

  const stepperValue = useMemo(
    () => ({ nextStep, prevStep, setStep, toggleStepValidation }),
    [nextStep, prevStep, setStep, toggleStepValidation]
  )
  const stepperRootValue = useMemo(
    () => ({
      currentStep,
      hasNextStep,
      hasPreviousStep,
      totalSteps,
      stepsState,
    }),
    [currentStep, hasNextStep, hasPreviousStep, totalSteps, stepsState]
  )
  const [isSaveExitDialogOpen, toggleIsSaveExitDialogOpen] = useToggle(false)
  const projectInfoMethods = useForm<ProjectInfoFormValues>({
    resolver: zodResolver(projectInfoSchema),
  })
  const mediaMethods = useForm<MediaFormValues>({
    resolver: zodResolver(mediaFormSchema),
    defaultValues: {
      featuredVideo: "",
    },
  })
  const projectScopeMethods = useState<Phase[]>([{}])
  const [isProjectSubmitted, setIsProjectSubmitted] = useState(false)
  const projectScopeValue = useMemo(
    () => ({ projectScopeMethods, isProjectSubmitted, setIsProjectSubmitted }),
    [projectScopeMethods, isProjectSubmitted, setIsProjectSubmitted]
  )

  return isProjectSubmitted ? (
    <div className="min-h-screen flex flex-col">
      <div className="h-[70px] border-b border-gray-200 flex items-center pr-[17px] pl-8">
        <h1 className="text-sm leading-[16.94px] font-semibold text-gray-900">
          Publish to Marketplace
        </h1>
      </div>
      <Empty1 />
    </div>
  ) : (
    <StepperProvider value={stepperValue}>
      <StepRootProvider value={stepperRootValue}>
        <div className="h-screen flex">
          <ProjectInfoProvider value={projectInfoMethods}>
            <MediaProvider value={mediaMethods}>
              <ProjectScopeProvider value={projectScopeValue}>
                <Sidebar />
                <div className="flex-auto bg-white">
                  <Header onSaveExit={toggleIsSaveExitDialogOpen} />
                  <SaveExitDialog
                    open={isSaveExitDialogOpen}
                    onOpenChange={toggleIsSaveExitDialogOpen}
                  />
                  <StepControl className="contents">
                    <Step className="contents">{projectInfo}</Step>
                    <Step className="contents">{media}</Step>
                    <Step className="contents">{projectScope}</Step>
                  </StepControl>
                </div>
              </ProjectScopeProvider>
            </MediaProvider>
          </ProjectInfoProvider>
        </div>
      </StepRootProvider>
    </StepperProvider>
  )
}

export default function PublishRootProject() {
  return (
    <PublishProject
      projectInfo={<ProjectInfo />}
      media={<Media />}
      projectScope={<ProjectScope />}
    />
  )
}
