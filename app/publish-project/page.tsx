"use client"

import { useEffect, useMemo, useState } from "react"
import React from "react"
import { HTTPS, ONE_SECOND } from "@/utils/constants"
import {
  cn,
  debounce,
  getFirstItem,
  hookFormHasError,
  keys,
} from "@/utils/functions"
import {
  useControllableState,
  useStepper,
  useUnmountEffect,
} from "@/utils/hooks"
import { createContext } from "@/utils/react-utils"
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
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsDown,
  ChevronsUp,
  Clock,
  Copy,
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
import { Usflag } from "@blend-metrics/icons/flags"
import { ErrorMessage as HookFormErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { noop } from "@tanstack/react-table"
import { Steps } from "headless-stepper"
import {
  Controller,
  SubmitHandler,
  UseFormReturn,
  get,
  useForm,
  useWatch,
} from "react-hook-form"
import { useIsomorphicLayoutEffect, useToggle } from "react-use"
import { z } from "zod"
import { Keys } from "@/types/core"
import { Network } from "@/components/icons/network"
import { Network1 } from "@/components/icons/network-1"
import { Network2 } from "@/components/icons/network-2"
import { Network3 } from "@/components/icons/network-3"
import { Network4 } from "@/components/icons/network-4"
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

const Sidebar = () => {
  const { currentStep, stepsState } = useStepRootContext()
  const { setStep } = useStepperContext()
  const projectInfoMethods = useProjectInfoContext()
  const mediaMethods = useMediaContext()

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
                            (projectInfoMethods.formState.errors[field.name] ? (
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
                            (mediaMethods.formState.errors[field.name] ? (
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

                          <AlertCircle className="size-[18px] text-warning-500 shrink-0" />
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
            <Button disabled={!isValid}>
              Submit Project <ChevronRight className="size-[15px]" />
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

const ProjectInfo = () => {
  const { toggleValidation } = useStepContext()
  const methods = useProjectInfoContext()
  const {
    formState: { isValid, errors },
  } = methods

  useIsomorphicLayoutEffect(() => {
    toggleValidation(isValid)
  }, [isValid])

  const onSubmit: SubmitHandler<ProjectInfoFormValues> = (values) => {}

  const projectInfoValues = useWatch({ control: methods.control })
  const { error } = projectInfoSchema.safeParse(projectInfoValues)
  const totalFields = keys(methods.control._fields).length
  const totalFieldErrors = error ? keys(error.flatten().fieldErrors).length : 0
  const progressValue = parseInt(
    `${((totalFields - totalFieldErrors) / totalFields) * 100}`
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
                                    >
                                      <TagsInputItemText>
                                        {value}
                                      </TagsInputItemText>
                                      <TagsInputItemDeleteTrigger>
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
                                    >
                                      <TagsInputItemText>
                                        {value}
                                      </TagsInputItemText>
                                      <TagsInputItemDeleteTrigger>
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
                                    >
                                      <TagsInputItemText>
                                        {value}
                                      </TagsInputItemText>
                                      <TagsInputItemDeleteTrigger>
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
                Suggested Skills
              </span>

              <div className="flex items-center gap-x-3">
                <Badge visual="primary">
                  Node.js
                  <button className="focus-visible:outline-none">
                    <Plus2 className="size-3" />
                  </button>
                </Badge>
                <Badge visual="primary">
                  JavaScript
                  <button className="focus-visible:outline-none">
                    <Plus2 className="size-3" />
                  </button>
                </Badge>
                <Badge visual="primary">
                  Wireframing
                  <button className="focus-visible:outline-none">
                    <Plus2 className="size-3" />
                  </button>
                </Badge>
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
                              Tags
                            </TagsInputLabel>
                            <div className="flex items-center justify-between">
                              <HelperText size="sm">
                                Add up to 10 tags that best describe your
                                project. Use relevant keywords to highlight its
                                features and make it easier to find.
                              </HelperText>

                              <span className="text-xs leading-[14.52px] text-gray-500">
                                {projectInfoValues.industry?.length || 0}/5
                              </span>
                            </div>
                          </div>
                          <TagsInputControl>
                            {tagsInput.value.map((value, index) => (
                              <TagsInputItem
                                key={index}
                                index={index}
                                value={value}
                              >
                                <TagsInputItemPreview
                                  visual="primary"
                                  size="md"
                                >
                                  <TagsInputItemText>{value}</TagsInputItemText>
                                  <TagsInputItemDeleteTrigger>
                                    <X2 className="size-3" />
                                  </TagsInputItemDeleteTrigger>
                                </TagsInputItemPreview>
                                <TagsInputItemInput />
                              </TagsInputItem>
                            ))}
                            <TagsInputInput placeholder="Add tags" />
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
                          <TagsInputControl>
                            {tagsInput.value.map((value, index) => (
                              <TagsInputItem
                                key={index}
                                index={index}
                                value={value}
                              >
                                <TagsInputItemPreview
                                  visual="primary"
                                  size="md"
                                >
                                  <TagsInputItemText>{value}</TagsInputItemText>
                                  <TagsInputItemDeleteTrigger>
                                    <X2 className="size-3" />
                                  </TagsInputItemDeleteTrigger>
                                </TagsInputItemPreview>
                                <TagsInputItemInput />
                              </TagsInputItem>
                            ))}
                            <TagsInputInput placeholder="Add tags" />
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
                          <TagsInputControl>
                            {tagsInput.value.map((value, index) => (
                              <TagsInputItem
                                key={index}
                                index={index}
                                value={value}
                              >
                                <TagsInputItemPreview
                                  visual="primary"
                                  size="md"
                                >
                                  <TagsInputItemText>{value}</TagsInputItemText>
                                  <TagsInputItemDeleteTrigger>
                                    <X2 className="size-3" />
                                  </TagsInputItemDeleteTrigger>
                                </TagsInputItemPreview>
                                <TagsInputItemInput />
                              </TagsInputItem>
                            ))}
                            <TagsInputInput placeholder="Add skills" />
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

            <div className="mt-6 space-y-1.5">
              <span className="block text-xs leading-5 text-dark-blue-400">
                Suggested Skills
              </span>

              <div className="flex items-center gap-x-3">
                <Badge visual="primary">
                  Node.js
                  <button className="focus-visible:outline-none">
                    <Plus2 className="size-3" />
                  </button>
                </Badge>
                <Badge visual="primary">
                  JavaScript
                  <button className="focus-visible:outline-none">
                    <Plus2 className="size-3" />
                  </button>
                </Badge>
                <Badge visual="primary">
                  Wireframing
                  <button className="focus-visible:outline-none">
                    <Plus2 className="size-3" />
                  </button>
                </Badge>
              </div>
            </div>
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
    additionalImages: z
      .array(
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
      )
      .min(1, "Please at least upload 1 image(s)"),
    featuredVideo: z
      .string()
      .min(1, "Please provide a valid url")
      .url("Please provide a valid url"),
  })
  .refine(
    (data) => data.featuredImages.every((value) => value.progress === 100),
    {
      message: "Please let the images get uploaded to the server",
      path: ["featuredImage"],
    }
  )
  .refine(
    (data) => data.additionalImages.some((value) => value !== undefined),
    {
      message: "Please at least upload 1 image(s)",
      path: ["additionalImages"],
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
    toggleValidation(isValid)
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
  const values = useWatch({ control })

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
                {Array.from({ length: 8 }, (_, idx) => idx).map((idx) => (
                  <Controller
                    key={idx}
                    name={`additionalImages.${idx}`}
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
                          setError(`additionalImages.${idx}`, { message })
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

const PhaseNameDialog = ({
  onOpenChange,
  open,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [isPhaseNameDialog, toggleIsPhaseNameDialog] = useControllableState({
    defaultValue: false,
    value: open,
    onChange: onOpenChange,
  })

  return (
    <>
      <Dialog open={isPhaseNameDialog} onOpenChange={toggleIsPhaseNameDialog}>
        <DialogContent className="px-5 w-full py-10 md:px-10 bg-transparent shadow-none rounded-none">
          <div className="max-w-[371px] bg-white p-6 rounded-xl shadow-[0px_8px_8px_-4px_rgba(16,24,40,.03)_0px_20px_24px_-4px_rgba(16,24,40,.08)]">
            <div className="space-y-1.5">
              <Label htmlFor="phase-name" className="text-gray-700" size="sm">
                Phase Name
              </Label>
              <Input
                id="phase-name"
                className="text-gray-900"
                defaultValue="Stage 1"
              />
            </div>

            <DialogFooter className="mt-8 grid gap-x-3">
              <DialogClose asChild>
                <Button variant="outlined" visual="gray">
                  Cancel
                </Button>
              </DialogClose>

              <DialogClose asChild>
                <Button>Done</Button>
              </DialogClose>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

const TaskNameDialog = ({
  onOpenChange,
  open,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [isTaskNameDialogOpen, toggleIsTaskNameDialogOpen] =
    useControllableState({
      defaultValue: false,
      value: open,
      onChange: onOpenChange,
    })
  return (
    <Dialog
      open={isTaskNameDialogOpen}
      onOpenChange={toggleIsTaskNameDialogOpen}
    >
      <DialogContent className="px-5 w-full py-10 md:px-10 bg-transparent shadow-none rounded-none">
        <div className="max-w-[371px] bg-white p-6 rounded-xl shadow-[0px_8px_8px_-4px_rgba(16,24,40,.03)_0px_20px_24px_-4px_rgba(16,24,40,.08)]">
          <div className="space-y-1.5">
            <Label htmlFor="task-name" className="text-gray-700" size="sm">
              Task Name
            </Label>
            <Input
              id="task-name"
              className="text-gray-900"
              defaultValue="Affinity Mapping"
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
              />
              <Listbox id="duration" defaultValue="Hours">
                <ListboxButton placeholder="Select" />
                <ListboxOptions>
                  {[
                    "Hours",
                    "Minutes",
                    "Seconds",
                    "Days",
                    "Months",
                    "Years",
                  ].map((format) => (
                    <ListboxOption key={format} value={format}>
                      {format}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>

          <DialogFooter className="mt-8 grid gap-x-3">
            <DialogClose asChild>
              <Button variant="outlined" visual="gray">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Done</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const DurationDialog = ({
  onOpenChange,
  open,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [isDurationDialogOpen, toggleIsDurationDialogOpen] =
    useControllableState({
      defaultValue: false,
      value: open,
      onChange: onOpenChange,
    })
  return (
    <Dialog
      open={isDurationDialogOpen}
      onOpenChange={toggleIsDurationDialogOpen}
    >
      <DialogContent className="px-5 w-full py-10 md:px-10 bg-transparent shadow-none rounded-none">
        <div className="max-w-[371px] bg-white p-6 rounded-xl shadow-[0px_8px_8px_-4px_rgba(16,24,40,.03)_0px_20px_24px_-4px_rgba(16,24,40,.08)]">
          <div className="space-y-1.5 mt-3">
            <Label htmlFor="duration" className="text-gray-700" size="sm">
              Duration
            </Label>
            <div className="grid grid-cols-2 gap-x-3">
              <Input
                id="duration"
                className="text-gray-900"
                defaultValue="40"
              />
              <Listbox id="duration" defaultValue="Hours">
                <ListboxButton placeholder="Select" />
                <ListboxOptions>
                  {[
                    "Hours",
                    "Minutes",
                    "Seconds",
                    "Days",
                    "Months",
                    "Years",
                  ].map((format) => (
                    <ListboxOption key={format} value={format}>
                      {format}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </Listbox>
            </div>
          </div>

          <DialogFooter className="mt-8 grid gap-x-3">
            <DialogClose asChild>
              <Button variant="outlined" visual="gray">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button>Done</Button>
            </DialogClose>
          </DialogFooter>
        </div>
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
  const [isSaveExitDialogOpen, toggleIsSaveExitDialogOpen] =
    useControllableState({
      defaultValue: false,
      value: open,
      onChange: onOpenChange,
    })
  return (
    <Dialog
      open={isSaveExitDialogOpen}
      onOpenChange={toggleIsSaveExitDialogOpen}
    >
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

const Dropdown = ({ initialState }: { initialState?: string }) => {
  const [value, setValue] = useState(initialState)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-gray-100 focus-visible:outline-none pr-2 p-[5px] border border-gray-300 border-dashed rounded-[5px] inline-flex items-center gap-x-1.5">
        <span className="text-xs leading-[18px] font-medium text-gray-700">
          {value}
        </span>
        <ChevronDown className="size-[18px] shrink-0 text-gray-500" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-max">
        <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
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
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) => {
  const [isDeletePhaseDialogOpen, toggleIsDeletePhaseDialogOpen] =
    useControllableState({
      defaultValue: false,
      value: open,
      onChange: onOpenChange,
    })
  return (
    <Dialog
      open={isDeletePhaseDialogOpen}
      onOpenChange={toggleIsDeletePhaseDialogOpen}
    >
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
            <DialogClose asChild>
              <Button>Done</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const ProjectScope = () => {
  const { toggleValidation } = useStepContext()
  const [isPhaseNameDialogOpen, toggleIsPhaseNameDialogOpen] = useToggle(false)
  const [isTaskNameDialogOpen, toggleIsTaskNameDialogOpen] = useToggle(false)
  const [isDurationDialogOpen, toggleIsDurationDialogOpen] = useToggle(false)
  const [isDeletePhaseDialogOpen, toggleIsDeletePhaseDialogOpen] =
    useToggle(false)

  useIsomorphicLayoutEffect(() => {
    toggleValidation(true)
  }, [])

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
                  >
                    <ChevronsDown className="size-[15px]" /> Expand all
                  </Button>
                  <Button
                    className="rounded-l-none md:rounded-r-[5px] rounded-r-none"
                    variant="outlined"
                    visual="gray"
                  >
                    <ChevronsUp className="size-[15px]" /> Collapse All
                  </Button>
                </div>

                <Button
                  className="border-l-0 rounded-l-none md:border-l md:rounded-l-[5px]"
                  variant="outlined"
                  visual="gray"
                >
                  <Plus className="size-[15px]" /> Expand all
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
              defaultValue={["Research"]}
              type="multiple"
              className="flex-auto"
            >
              <AccordionItem value="Research" asChild>
                <div className="rounded-lg border border-gray-200 shadow-sm">
                  <div className="mb-3 flex items-start gap-x-4 px-3 pt-3">
                    <div className="flex flex-auto gap-y-2 md:flex-row md:justify-between md:items-center flex-col">
                      <AccordionTrigger className="inline-flex items-center gap-x-3.5">
                        <div className="size-8 inline-flex items-center justify-center">
                          <ChevronDown className="size-5 shrink-0 text-gray-500 group-data-[state=open]/item:-rotate-180 transition duration-300" />
                        </div>
                        <span className="text-base md:text-[18px] font-semibold leading-7 text-gray-900">
                          Phase One <span className="font-light">Research</span>
                        </span>
                      </AccordionTrigger>

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
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <ArrowUp className="h-4 w-4" /> Move up
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ArrowDown className="h-4 w-4" /> Move down
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4" /> Duplicate Phase
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <ArrowUpLeft className="h-4 w-4" /> Insert Phase
                            Above
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ArrowDownLeft className="h-4 w-4" /> Insert Phase
                            Below
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Type className="h-4 w-4" /> Rename Phase
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Clock className="h-4 w-4" /> Change Duration
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            visual="destructive"
                            onSelect={toggleIsDeletePhaseDialogOpen}
                          >
                            <Trash2 className="h-4 w-4" /> Delete Phase
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <IconButton
                            className="text-gray-500"
                            variant="outlined"
                            visual="gray"
                          >
                            <Plus className="size-3" />
                          </IconButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-auto">
                          <DropdownMenuItem
                            onSelect={toggleIsTaskNameDialogOpen}
                          >
                            <Plus className="size-4" /> Add Task
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={toggleIsPhaseNameDialogOpen}
                          >
                            <Plus className="h-4 w-4" /> Add Phase
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <PhaseNameDialog
                        open={isPhaseNameDialogOpen}
                        onOpenChange={toggleIsPhaseNameDialogOpen}
                      />
                      <TaskNameDialog
                        open={isTaskNameDialogOpen}
                        onOpenChange={toggleIsTaskNameDialogOpen}
                      />
                      <DurationDialog
                        open={isDurationDialogOpen}
                        onOpenChange={toggleIsDurationDialogOpen}
                      />
                      <DeletePhaseDialog
                        open={isDeletePhaseDialogOpen}
                        onOpenChange={toggleIsDeletePhaseDialogOpen}
                      />
                    </div>
                  </div>

                  <DisclosureContent className="overflow-auto">
                    <Table>
                      <TableHeader className="bg-gray-50">
                        <TableRow className="hover:bg-transparent">
                          <TableHead>Task Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Experience</TableHead>
                          <TableHead>Duration</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="hover:bg-transparent">
                          <TableCell className="py-4 px-6">
                            <span className="flex flex-col text-sm font-semibold text-gray-900">
                              Affinity Mapping
                            </span>
                          </TableCell>
                          <TableCell className="py-4 px-6">
                            UX Designer
                          </TableCell>
                          <TableCell className="px-3 py-4">
                            <button className="bg-gray-100 focus-visible:outline-none pr-2 p-[5px] border border-gray-300 border-dashed rounded-[5px] inline-flex items-center gap-x-1.5">
                              <span className="inline-flex items-center justify-center size-[18px] shrink-0 rounded-full overflow-hidden">
                                <Usflag className="size-[18px]" />
                              </span>
                              <span className="text-xs leading-[18px] font-medium text-gray-700">
                                USA
                              </span>
                              <ChevronDown className="size-[18px] shrink-0 text-gray-500" />
                            </button>
                          </TableCell>
                          <TableCell className="py-4 px-6">
                            <Dropdown initialState="Guru" />
                          </TableCell>
                          <TableCell
                            className="py-4 px-6 cursor-pointer"
                            onClick={toggleIsDurationDialogOpen}
                          >
                            40 hours
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-transparent">
                          <TableCell className="py-4 px-6">
                            <span className="flex flex-col text-sm font-semibold text-gray-900">
                              Affinity Mapping
                            </span>
                          </TableCell>
                          <TableCell className="py-4 px-6">
                            UX Designer
                          </TableCell>
                          <TableCell className="px-3 py-4">
                            <button className="bg-gray-100 focus-visible:outline-none pr-2 p-[5px] border border-gray-300 border-dashed rounded-[5px] inline-flex items-center gap-x-1.5">
                              <span className="inline-flex items-center justify-center size-[18px] shrink-0 rounded-full overflow-hidden">
                                <Usflag className="size-[18px]" />
                              </span>
                              <span className="text-xs leading-[18px] font-medium text-gray-700">
                                USA
                              </span>
                              <ChevronDown className="size-[18px] shrink-0 text-gray-500" />
                            </button>
                          </TableCell>
                          <TableCell className="py-4 px-6">
                            <Dropdown initialState="Guru" />
                          </TableCell>
                          <TableCell
                            className="py-4 px-6 cursor-pointer"
                            onClick={toggleIsDurationDialogOpen}
                          >
                            40 hours
                          </TableCell>
                        </TableRow>
                        <TableRow className="hover:bg-transparent">
                          <TableCell className="py-4 px-6">
                            <span className="flex flex-col text-sm font-semibold text-gray-900">
                              Affinity Mapping
                            </span>
                          </TableCell>
                          <TableCell className="py-4 px-6">
                            UX Designer
                          </TableCell>
                          <TableCell className="px-3 py-4">
                            <button className="bg-gray-100 focus-visible:outline-none pr-2 p-[5px] border border-gray-300 border-dashed rounded-[5px] inline-flex items-center gap-x-1.5">
                              <span className="inline-flex items-center justify-center size-[18px] shrink-0 rounded-full overflow-hidden">
                                <Usflag className="size-[18px]" />
                              </span>
                              <span className="text-xs leading-[18px] font-medium text-gray-700">
                                USA
                              </span>
                              <ChevronDown className="size-[18px] shrink-0 text-gray-500" />
                            </button>
                          </TableCell>
                          <TableCell className="py-4 px-6">
                            <Dropdown initialState="Guru" />
                          </TableCell>
                          <TableCell
                            className="py-4 px-6 cursor-pointer"
                            onClick={toggleIsDurationDialogOpen}
                          >
                            40 hours
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </DisclosureContent>
                </div>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="pl-[17.45px] xs:max-[1024px]:hidden">
            <ProjectScopeTip showArrow />
          </div>
        </div>
      </ScrollArea>
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

  return (
    <StepperProvider value={stepperValue}>
      <StepRootProvider value={stepperRootValue}>
        <div className="h-screen flex">
          <ProjectInfoProvider value={projectInfoMethods}>
            <MediaProvider value={mediaMethods}>
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
