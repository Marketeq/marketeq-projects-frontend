import * as React from "react"
import { ONE_SECOND } from "@/utils/constants"
import {
  cn,
  getIsNotEmpty,
  hookFormHasError,
  isNotEmpty,
  noop,
} from "@/utils/functions"
import { useControllableState, useUncontrolledState } from "@/utils/hooks"
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  ChevronDown,
  Download02,
  Edit03,
  Globe,
  HelpCircle,
  LinkExternal01,
  Lock,
  MoreHorizontal,
  Plus,
  RefreshCcw,
  Search,
  ShieldTick,
  Star,
  Trash03,
  X,
  Zap,
} from "@blend-metrics/icons"
import { MastercardDefault } from "@blend-metrics/icons/payment-methods"
import { ErrorMessage as HookFormErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { Meta } from "@storybook/react"
import { min } from "date-fns"
import CurrencyInput from "react-currency-input-field"
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form"
import { z } from "zod"
import { Logo3 } from "@/components/icons"
import { Network } from "@/components/icons/network"
import { Network1 } from "@/components/icons/network-1"
import { Network2 } from "@/components/icons/network-2"
import { Network3 } from "@/components/icons/network-3"
import { Network4 } from "@/components/icons/network-4"
import NextImage from "@/components/next-image"
import { CountriesCombobox } from "@/components/own-combobox"
import {
  PhoneNumberInput,
  isPhoneValid,
  phoneUtil,
} from "@/components/phone-number-input"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertContent,
  AlertIcon,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  ErrorMessage,
  HeadlessRadioGroupItem,
  HelperText,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  RadioGroup,
  RadioGroupItemSelector,
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

const meta: Meta = {
  title: "Checkout",
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

export const StepIndicator = ({ disabled }: { disabled?: boolean }) => {
  return (
    <button
      disabled={disabled}
      className="peer focus-visible:outline-none size-[25px] rounded-full border-2 inline-flex justify-center items-center shrink-0 text-primary-500 border-primary-500 disabled:text-white disabled:bg-gray-300 disabled:border-gray-300 data-[state=disabled]:text-white data-[state=disabled]:bg-gray-300 data-[state=disabled]:border-gray-300 data-[state=active]:bg-primary-500 data-[state=active]:text-white data-[state=active]:border-primary-500"
    >
      1
    </button>
  )
}

export const Step = ({ disabled }: { disabled?: boolean }) => {
  return (
    <div className="flex gap-x-3 items-center">
      <StepIndicator disabled={disabled} />
      <span className="text-sm shrink-0 whitespace-nowrap leading-none text-dark-blue-400 font-semibold peer-disabled:text-gray-300 peer-data-[state=disabled]:text-gray-300">
        Project Details
      </span>
    </div>
  )
}

const UserGroup = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    className={cn("size-4 text-primary-500", className)}
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.9837 11.75C13.4521 11.75 13.8246 11.4553 14.159 11.0432C14.8437 10.1996 13.7196 9.5255 13.2908 9.19537C12.855 8.85975 12.3684 8.66963 11.875 8.625M11.25 7.375C12.1129 7.375 12.8125 6.67544 12.8125 5.8125C12.8125 4.94956 12.1129 4.25 11.25 4.25"
      stroke="currentColor"
      strokeWidth={0.9375}
      strokeLinecap="round"
    />
    <path
      d="M2.01623 11.75C1.54791 11.75 1.17542 11.4553 0.840964 11.0432C0.156307 10.1996 1.28042 9.5255 1.70915 9.19537C2.14498 8.85975 2.63161 8.66963 3.125 8.625M3.4375 7.375C2.57456 7.375 1.875 6.67544 1.875 5.8125C1.875 4.94956 2.57456 4.25 3.4375 4.25"
      stroke="currentColor"
      strokeWidth={0.9375}
      strokeLinecap="round"
    />
    <path
      d="M5.05238 9.94401C4.41376 10.3389 2.73936 11.1452 3.75919 12.1541C4.25736 12.647 4.8122 12.9995 5.50976 12.9995H9.49026C10.1878 12.9995 10.7426 12.647 11.2408 12.1541C12.2606 11.1452 10.5863 10.3389 9.94764 9.94401C8.45008 9.01801 6.54989 9.01801 5.05238 9.94401Z"
      stroke="currentColor"
      strokeWidth={0.9375}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.68751 5.18799C9.68751 6.39611 8.70814 7.37549 7.50001 7.37549C6.29189 7.37549 5.3125 6.39611 5.3125 5.18799C5.3125 3.97986 6.29189 3.00049 7.50001 3.00049C8.70814 3.00049 9.68751 3.97986 9.68751 5.18799Z"
      stroke="currentColor"
      strokeWidth={0.9375}
    />
  </svg>
)

const Dropdown = ({
  onValueChange,
  value,
  placeholder,
  defaultValue,
}: {
  onValueChange?: (value: string) => void
  value?: string
  placeholder?: string
  defaultValue?: string
}) => {
  const [state, setState] = useControllableState({
    onChange: onValueChange,
    value,
    defaultValue,
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group bg-white data-[state=open]:bg-gray-100 hover:bg-gray-100 focus-visible:outline-none px-2 py-[5px] border border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed hover:border-gray-300 hover:border-dashed border-solid rounded-[5px] inline-flex items-center gap-x-1.5">
        <span className="text-xs leading-[18px] font-medium text-gray-700">
          {state ? state : placeholder}
        </span>
        <ChevronDown className="group-data-[state=open]:inline-block hidden size-[18px] shrink-0 text-gray-500" />
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

export const Navigation = () => {
  return (
    <div className="bg-white shadow-[0px_1px_3px_0px_rgba(16,24,40,.1)]">
      <div className="max-w-[1140px] h-[64px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-x-6">
          <Logo3 className="w-[128px] h-[18.81px] shrink-0" />

          <span className="inline-block h-[18px] w-px shrink-0 bg-gray-200" />

          <div className="inline-flex items-center gap-x-2">
            <Lock className="size-[18px] text-gray-500" />
            <span className="text-base font-semibold leading-none text-gray-500">
              Secure Checkout
            </span>
          </div>
        </div>

        <div className="flex items-center gap-x-3">
          <Step />
          <span className="border-2 border-gray-300 border-dashed w-[35px] shrink-0" />
          <Step disabled />
          <span className="border-2 border-gray-300 border-dashed w-[35px] shrink-0" />
          <Step disabled />
        </div>
      </div>
    </div>
  )
}

export const ProjectDetails = () => {
  return (
    <div className="bg-gray-50">
      <Navigation />

      <div className="px-[150px] py-[50px]">
        <div className="max-w-[1140px] mx-auto">
          <h1 className="text-2xl leading-[.7] font-bold text-dark-blue-400">
            Please confirm your project details below
          </h1>
          <p className="mt-2 text-base font-light text-dark-blue-400 leading-none">
            Then click <span className="font-normal">“Proceed to Payment”</span>{" "}
            to continue
          </p>

          <div className="mt-6 flex items-start gap-x-8">
            <div className="flex-auto">
              <div className="p-5 border flex items-center gap-x-3 border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                <div className="relative h-[92px] overflow-hidden w-[181px] border border-[#DFDFDF] rounded-md shrink-0">
                  <NextImage
                    className="object-cover"
                    src="/dashboard.png"
                    alt="Dashboard"
                    sizes="25vw"
                    fill
                  />
                </div>

                <div className="flex-auto flex items-center gap-x-5">
                  <div className="flex-auto">
                    <h1 className="text-sm font-medium leading-5 border-gray-800">
                      Marketeq Client Portal - Redesigning and Optimizing
                      Website for Enhanced User Experience.
                    </h1>

                    <div className="mt-2 inline-flex items-center gap-x-2">
                      <UserGroup />
                      <span className="text-xs leading-5 font-semibold text-primary-500">
                        8 team members
                      </span>
                    </div>

                    <div className="flex mt-2 items-center gap-x-2">
                      <span className="text-[13px] leading-none font-semibold text-[#122A4B]">
                        January 2024 - August 2024
                      </span>
                    </div>
                  </div>
                  <div className="inline-flex flex-col items-end gap-y-[26px]">
                    <Badge size="md" visual="primary">
                      8 months
                    </Badge>

                    <div className="inline-flex flex-col gap-y-0.5">
                      <span className="inline-block text-dark-blue-400 text-xl leading-none font-semibold">
                        $94,000
                      </span>
                      <span className="inline-block text-dark-blue-400 text-xs leading-none">
                        Project Cost
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Tabs defaultValue="Project Scope">
                  <div className="flex items-center justify-between">
                    <TabsList className="p-1 rounded-[5px] gap-x-2 h-11 bg-white border border-gray-200">
                      <DisclosureTrigger
                        className="focus-visible:outline-none transition duration-300 h-9 shrink-0 inline-flex items-center justify-center py-2 px-3 text-xs leading-5 font-semibold rounded-[4px] data-[state=active]:bg-gray-100 text-gray-700"
                        value="Project Scope"
                      >
                        Project Scope
                      </DisclosureTrigger>
                      <DisclosureTrigger
                        className="focus-visible:outline-none transition duration-300 h-9 shrink-0 inline-flex items-center justify-center py-2 px-3 text-xs leading-5 font-semibold rounded-[4px] data-[state=active]:bg-gray-100 text-gray-700"
                        value="Team Members"
                      >
                        Team Members
                      </DisclosureTrigger>
                    </TabsList>

                    <Button
                      variant="outlined"
                      className="bg-white text-xs leading-5"
                    >
                      <Edit03 className="size-[15px] text-gray-500" /> Edit
                      Scope
                    </Button>
                  </div>
                  <TabsContent value="Team Members">
                    <div className="rounded-lg mt-6 bg-white border border-gray-200 overflow-hidden">
                      <Table>
                        <TableHeader className="bg-gray-50 [&_tr]:border-t-0">
                          <TableRow className="hover:bg-transparent">
                            <TableHead className="bg-gray-50 hover:text-gray-600">
                              <span className="inline-flex items-center gap-x-1">
                                Name <ArrowDown className="size-[15px]" />
                              </span>
                            </TableHead>
                            <TableHead className="bg-gray-50 hover:text-gray-600">
                              Phase
                            </TableHead>
                            <TableHead className="bg-gray-50 hover:text-gray-600">
                              Experience
                            </TableHead>
                            <TableHead className="bg-gray-50 hover:text-gray-600">
                              Location
                            </TableHead>
                            <TableHead className="bg-gray-50 hover:text-gray-600">
                              Rate
                            </TableHead>
                            <TableHead className="bg-gray-50 hover:text-gray-600">
                              Status
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="hover:bg-white">
                            <TableCell className="py-4 px-6">
                              <span className="inline-flex items-start gap-x-2">
                                <Avatar size="sm">
                                  <AvatarImage src="/man.jpg" alt="Man" />
                                  <AvatarFallback>M</AvatarFallback>
                                </Avatar>

                                <span className="inline-flex flex-col">
                                  <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                    Vivek
                                  </span>
                                  <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                    @topdesigner321
                                  </span>
                                </span>
                              </span>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Badge
                                className="text-xs leading-[18px] rounded-[5px] border border-gray-200 bg-white"
                                visual="gray"
                                size="lg"
                              >
                                4 Phases
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Dropdown defaultValue="Junior" />
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <CountriesCombobox
                                triggerClassName="group border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed data-[state=open]:bg-gray-100 hover:border-gray-300 hover:border-dashed bg-white hover:bg-gray-100 border-solid"
                                defaultValue="United States"
                              />
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <span className="whitespace-nowrap inline-block text-sm leading-5 text-gray-600">
                                $500/hr
                              </span>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Badge visual="success">Confirmed</Badge>
                            </TableCell>

                            <TableCell className="py-4 px-6">
                              <IconButton
                                className="w-[27px] h-[23px]"
                                variant="ghost"
                                visual="gray"
                              >
                                <MoreHorizontal className="size-[15px]" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-white">
                            <TableCell className="py-4 px-6">
                              <span className="inline-flex items-start gap-x-2">
                                <Avatar size="sm">
                                  <AvatarImage src="/man.jpg" alt="Man" />
                                  <AvatarFallback>M</AvatarFallback>
                                </Avatar>

                                <span className="inline-flex flex-col">
                                  <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                    Vivek
                                  </span>
                                  <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                    @topdesigner321
                                  </span>
                                </span>
                              </span>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Badge
                                className="text-xs leading-[18px] rounded-[5px] border border-gray-200 bg-white"
                                visual="gray"
                                size="lg"
                              >
                                4 Phases
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Dropdown defaultValue="Junior" />
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <CountriesCombobox
                                triggerClassName="group border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed data-[state=open]:bg-gray-100 hover:border-gray-300 hover:border-dashed bg-white hover:bg-gray-100 border-solid"
                                defaultValue="United States"
                              />
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <span className="whitespace-nowrap inline-block text-sm leading-5 text-gray-600">
                                $500/hr
                              </span>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Badge visual="success">Confirmed</Badge>
                            </TableCell>

                            <TableCell className="py-4 px-6">
                              <IconButton
                                className="w-[27px] h-[23px]"
                                variant="ghost"
                                visual="gray"
                              >
                                <MoreHorizontal className="size-[15px]" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-white">
                            <TableCell className="py-4 px-6">
                              <span className="inline-flex items-start gap-x-2">
                                <Avatar size="sm">
                                  <AvatarImage src="/man.jpg" alt="Man" />
                                  <AvatarFallback>M</AvatarFallback>
                                </Avatar>

                                <span className="inline-flex flex-col">
                                  <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                    Vivek
                                  </span>
                                  <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                    @topdesigner321
                                  </span>
                                </span>
                              </span>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Badge
                                className="text-xs leading-[18px] rounded-[5px] border border-gray-200 bg-white"
                                visual="gray"
                                size="lg"
                              >
                                4 Phases
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Dropdown defaultValue="Junior" />
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <CountriesCombobox
                                triggerClassName="group border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed data-[state=open]:bg-gray-100 hover:border-gray-300 hover:border-dashed bg-white hover:bg-gray-100 border-solid"
                                defaultValue="United States"
                              />
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <span className="whitespace-nowrap inline-block text-sm leading-5 text-gray-600">
                                $500/hr
                              </span>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Badge visual="success">Confirmed</Badge>
                            </TableCell>

                            <TableCell className="py-4 px-6">
                              <IconButton
                                className="w-[27px] h-[23px]"
                                variant="ghost"
                                visual="gray"
                              >
                                <MoreHorizontal className="size-[15px]" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-white">
                            <TableCell className="py-4 px-6">
                              <span className="inline-flex items-start gap-x-2">
                                <Avatar size="sm">
                                  <AvatarImage src="/man.jpg" alt="Man" />
                                  <AvatarFallback>M</AvatarFallback>
                                </Avatar>

                                <span className="inline-flex flex-col">
                                  <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                    Vivek
                                  </span>
                                  <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                    @topdesigner321
                                  </span>
                                </span>
                              </span>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Badge
                                className="text-xs leading-[18px] rounded-[5px] border border-gray-200 bg-white"
                                visual="gray"
                                size="lg"
                              >
                                4 Phases
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Dropdown defaultValue="Junior" />
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <CountriesCombobox
                                triggerClassName="group border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed data-[state=open]:bg-gray-100 hover:border-gray-300 hover:border-dashed bg-white hover:bg-gray-100 border-solid"
                                defaultValue="United States"
                              />
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <span className="whitespace-nowrap inline-block text-sm leading-5 text-gray-600">
                                $500/hr
                              </span>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Badge visual="success">Confirmed</Badge>
                            </TableCell>

                            <TableCell className="py-4 px-6">
                              <IconButton
                                className="w-[27px] h-[23px]"
                                variant="ghost"
                                visual="gray"
                              >
                                <MoreHorizontal className="size-[15px]" />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>

                    <div className="mt-6 p-6 rounded-lg border border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)] bg-white">
                      <h1 className="text-2xl font-bold leading-[0.7] text-dark-blue-400">
                        FAQ’s
                      </h1>

                      <p className="mt-5 text-base leading-none font-light text-dark-blue-400">
                        We use proven design methods to create a personal
                        approach to each product. This allows you to achieve
                        high results and the quality of the work done.
                      </p>

                      <div className="mt-6">
                        <Accordion
                          type="multiple"
                          className="pt-6 space-y-[15px] overflow-hidden [interpolate-size:allow-keywords] transition-[height] duration-300"
                          defaultValue={["item-1"]}
                        >
                          <AccordionItem
                            className="rounded-lg bg-white border border-gray-300"
                            value="item-1"
                          >
                            <AccordionTrigger className="w-full px-5 py-3 flex items-center gap-x-2 text-base leading-[1.3] font-semibold flex-auto text-dark-blue-400">
                              <span className="flex-auto text-left inline-block">
                                How will you ensure we&apos;re aligned on
                                progress and feedback throughout each stage?
                              </span>
                              <ChevronDown className="size-6 shrink-0 group-data-[state=open]/item:-rotate-180 transition duration-300" />
                            </AccordionTrigger>

                            <DisclosureContent className="text-base px-5 pb-5 leading-[1.5] text-dark-blue-400 font-light">
                              We offer a comprehensive range of IT consulting
                              services, including IT strategy development,
                              software development, network infrastructure
                              design and implementation, cybersecurity
                              assessment and solutions, cloud computing
                              solutions, and IT project management.
                            </DisclosureContent>
                          </AccordionItem>
                          <AccordionItem
                            className="rounded-lg bg-white border border-gray-300"
                            value="item-2"
                          >
                            <AccordionTrigger className="w-full px-5 py-3 flex items-center gap-x-2 text-base leading-[1.3] font-semibold flex-auto text-dark-blue-400">
                              <span className="flex-auto text-left inline-block">
                                How will you ensure we&apos;re aligned on
                                progress and feedback throughout each stage?
                              </span>
                              <ChevronDown className="size-6 shrink-0 group-data-[state=open]/item:-rotate-180 transition duration-300" />
                            </AccordionTrigger>

                            <DisclosureContent className="text-base px-5 pb-5 leading-[1.5] text-dark-blue-400 font-light">
                              We offer a comprehensive range of IT consulting
                              services, including IT strategy development,
                              software development, network infrastructure
                              design and implementation, cybersecurity
                              assessment and solutions, cloud computing
                              solutions, and IT project management.
                            </DisclosureContent>
                          </AccordionItem>
                          <AccordionItem
                            className="rounded-lg bg-white border border-gray-300"
                            value="item-3"
                          >
                            <AccordionTrigger className="w-full px-5 py-3 flex items-center gap-x-2 text-base leading-[1.3] font-semibold flex-auto text-dark-blue-400">
                              <span className="flex-auto text-left inline-block">
                                How will you ensure we&apos;re aligned on
                                progress and feedback throughout each stage?
                              </span>
                              <ChevronDown className="size-6 shrink-0 group-data-[state=open]/item:-rotate-180 transition duration-300" />
                            </AccordionTrigger>

                            <DisclosureContent className="text-base px-5 pb-5 leading-[1.5] text-dark-blue-400 font-light">
                              We offer a comprehensive range of IT consulting
                              services, including IT strategy development,
                              software development, network infrastructure
                              design and implementation, cybersecurity
                              assessment and solutions, cloud computing
                              solutions, and IT project management.
                            </DisclosureContent>
                          </AccordionItem>
                          <AccordionItem
                            className="rounded-lg bg-white border border-gray-300"
                            value="item-4"
                          >
                            <AccordionTrigger className="w-full px-5 py-3 flex items-center gap-x-2 text-base leading-[1.3] font-semibold flex-auto text-dark-blue-400">
                              <span className="flex-auto text-left inline-block">
                                How will you ensure we&apos;re aligned on
                                progress and feedback throughout each stage?
                              </span>
                              <ChevronDown className="size-6 shrink-0 group-data-[state=open]/item:-rotate-180 transition duration-300" />
                            </AccordionTrigger>

                            <DisclosureContent className="text-base px-5 pb-5 leading-[1.5] text-dark-blue-400 font-light">
                              We offer a comprehensive range of IT consulting
                              services, including IT strategy development,
                              software development, network infrastructure
                              design and implementation, cybersecurity
                              assessment and solutions, cloud computing
                              solutions, and IT project management.
                            </DisclosureContent>
                          </AccordionItem>
                          <AccordionItem
                            className="rounded-lg bg-white border border-gray-300"
                            value="item-5"
                          >
                            <AccordionTrigger className="w-full px-5 py-3 flex items-center gap-x-2 text-base leading-[1.3] font-semibold flex-auto text-dark-blue-400">
                              <span className="flex-auto text-left inline-block">
                                How will you ensure we&apos;re aligned on
                                progress and feedback throughout each stage?
                              </span>
                              <ChevronDown className="size-6 shrink-0 group-data-[state=open]/item:-rotate-180 transition duration-300" />
                            </AccordionTrigger>

                            <DisclosureContent className="text-base px-5 pb-5 leading-[1.5] text-dark-blue-400 font-light">
                              We offer a comprehensive range of IT consulting
                              services, including IT strategy development,
                              software development, network infrastructure
                              design and implementation, cybersecurity
                              assessment and solutions, cloud computing
                              solutions, and IT project management.
                            </DisclosureContent>
                          </AccordionItem>
                          <AccordionItem
                            className="rounded-lg bg-white border border-gray-300"
                            value="item-6"
                          >
                            <AccordionTrigger className="w-full px-5 py-3 flex items-center gap-x-2 text-base leading-[1.3] font-semibold flex-auto text-dark-blue-400">
                              <span className="flex-auto text-left inline-block">
                                How will you ensure we&apos;re aligned on
                                progress and feedback throughout each stage?
                              </span>
                              <ChevronDown className="size-6 shrink-0 group-data-[state=open]/item:-rotate-180 transition duration-300" />
                            </AccordionTrigger>

                            <DisclosureContent className="text-base px-5 pb-5 leading-[1.5] text-dark-blue-400 font-light">
                              We offer a comprehensive range of IT consulting
                              services, including IT strategy development,
                              software development, network infrastructure
                              design and implementation, cybersecurity
                              assessment and solutions, cloud computing
                              solutions, and IT project management.
                            </DisclosureContent>
                          </AccordionItem>
                          <AccordionItem
                            className="rounded-lg bg-white border border-gray-300"
                            value="item-7"
                          >
                            <AccordionTrigger className="w-full px-5 py-3 flex items-center gap-x-2 text-base leading-[1.3] font-semibold flex-auto text-dark-blue-400">
                              <span className="flex-auto text-left inline-block">
                                How will you ensure we&apos;re aligned on
                                progress and feedback throughout each stage?
                              </span>
                              <ChevronDown className="size-6 shrink-0 group-data-[state=open]/item:-rotate-180 transition duration-300" />
                            </AccordionTrigger>

                            <DisclosureContent className="text-base px-5 pb-5 leading-[1.5] text-dark-blue-400 font-light">
                              We offer a comprehensive range of IT consulting
                              services, including IT strategy development,
                              software development, network infrastructure
                              design and implementation, cybersecurity
                              assessment and solutions, cloud computing
                              solutions, and IT project management.
                            </DisclosureContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="Project Scope">
                    <div className="mt-6">
                      <Accordion
                        type="multiple"
                        defaultValue={["item-1", "item-2", "item-3"]}
                        className="flex-auto space-y-3"
                      >
                        <AccordionItem
                          value="item-1"
                          className="rounded-lg border border-gray-200 shadow-sm bg-white"
                        >
                          <div className="flex items-center justify-between gap-x-4 px-3 py-3">
                            <div className="inline-flex items-center gap-x-3.5">
                              <AccordionTrigger asChild>
                                <IconButton variant="ghost" visual="gray">
                                  <ChevronDown className="size-5 shrink-0 text-gray-500 group-data-[state=open]/item:-rotate-180 transition duration-300" />
                                </IconButton>
                              </AccordionTrigger>

                              <span className="text-base md:text-[18px] font-semibold leading-7 text-gray-900">
                                Phase One{" "}
                                <span className="font-light">Research</span>
                              </span>
                            </div>

                            <div className="inline-flex items-center gap-x-8">
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

                              <Button visual="gray" variant="outlined">
                                <Plus className="size-[15px]" />
                                Add task
                              </Button>
                            </div>
                          </div>

                          <DisclosureContent>
                            <Table>
                              <TableHeader className="bg-gray-50">
                                <TableRow className="hover:bg-transparent">
                                  <TableHead className="hover:text-gray-600">
                                    Task
                                  </TableHead>
                                  <TableHead className="hover:text-gray-600">
                                    Description
                                  </TableHead>
                                  <TableHead className="hover:text-gray-600">
                                    Assignee
                                  </TableHead>
                                  <TableHead className="hover:text-gray-600">
                                    Duration
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow className="hover:bg-white">
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap font-semibold text-dark-blue-400">
                                      Consumer Research
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm font-extralight line-clamp-2 text-dark-blue-400">
                                      Conduct research to understand consumer
                                      needs, behaviors, and preferences for
                                      product optimization.
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="inline-flex items-start gap-x-2">
                                      <Avatar>
                                        <AvatarImage src="/man.jpg" alt="Man" />
                                        <AvatarFallback>M</AvatarFallback>
                                      </Avatar>

                                      <span className="inline-flex flex-col">
                                        <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                          Vivek
                                        </span>
                                        <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                          @topdesigner321
                                        </span>
                                      </span>
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap line-clamp-2 text-dark-blue-400">
                                      40 hours
                                    </span>
                                  </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-white">
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap font-semibold text-dark-blue-400">
                                      Consumer Research
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm font-extralight line-clamp-2 text-dark-blue-400">
                                      Conduct research to understand consumer
                                      needs, behaviors, and preferences for
                                      product optimization.
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="inline-flex items-start gap-x-2">
                                      <Avatar>
                                        <AvatarImage src="/man.jpg" alt="Man" />
                                        <AvatarFallback>M</AvatarFallback>
                                      </Avatar>

                                      <span className="inline-flex flex-col">
                                        <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                          Vivek
                                        </span>
                                        <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                          @topdesigner321
                                        </span>
                                      </span>
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap line-clamp-2 text-dark-blue-400">
                                      40 hours
                                    </span>
                                  </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-white">
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap font-semibold text-dark-blue-400">
                                      Consumer Research
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm font-extralight line-clamp-2 text-dark-blue-400">
                                      Conduct research to understand consumer
                                      needs, behaviors, and preferences for
                                      product optimization.
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="inline-flex items-start gap-x-2">
                                      <Avatar>
                                        <AvatarImage src="/man.jpg" alt="Man" />
                                        <AvatarFallback>M</AvatarFallback>
                                      </Avatar>

                                      <span className="inline-flex flex-col">
                                        <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                          Vivek
                                        </span>
                                        <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                          @topdesigner321
                                        </span>
                                      </span>
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap line-clamp-2 text-dark-blue-400">
                                      40 hours
                                    </span>
                                  </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-white">
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap font-semibold text-dark-blue-400">
                                      Consumer Research
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm font-extralight line-clamp-2 text-dark-blue-400">
                                      Conduct research to understand consumer
                                      needs, behaviors, and preferences for
                                      product optimization.
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="inline-flex items-start gap-x-2">
                                      <Avatar>
                                        <AvatarImage src="/man.jpg" alt="Man" />
                                        <AvatarFallback>M</AvatarFallback>
                                      </Avatar>

                                      <span className="inline-flex flex-col">
                                        <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                          Vivek
                                        </span>
                                        <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                          @topdesigner321
                                        </span>
                                      </span>
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap line-clamp-2 text-dark-blue-400">
                                      40 hours
                                    </span>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </DisclosureContent>
                        </AccordionItem>
                        <AccordionItem
                          value="item-2"
                          className="rounded-lg border border-gray-200 shadow-sm bg-white"
                        >
                          <div className="flex items-center justify-between gap-x-4 px-3 py-3">
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

                              <span className="text-base md:text-[18px] font-semibold leading-7 text-gray-900">
                                Phase One{" "}
                                <span className="font-light">Research</span>
                              </span>
                            </div>

                            <div className="inline-flex items-center gap-x-8">
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

                              <Button visual="gray" variant="outlined">
                                <Plus className="size-[15px]" />
                                Add task
                              </Button>
                            </div>
                          </div>

                          <DisclosureContent>
                            <Table>
                              <TableHeader className="bg-gray-50">
                                <TableRow className="hover:bg-transparent">
                                  <TableHead className="hover:text-gray-600">
                                    Task
                                  </TableHead>
                                  <TableHead className="hover:text-gray-600">
                                    Description
                                  </TableHead>
                                  <TableHead className="hover:text-gray-600">
                                    Assignee
                                  </TableHead>
                                  <TableHead className="hover:text-gray-600">
                                    Duration
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow className="hover:bg-white">
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap font-semibold text-dark-blue-400">
                                      Consumer Research
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm font-extralight line-clamp-2 text-dark-blue-400">
                                      Conduct research to understand consumer
                                      needs, behaviors, and preferences for
                                      product optimization.
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="inline-flex items-start gap-x-2">
                                      <Avatar>
                                        <AvatarImage src="/man.jpg" alt="Man" />
                                        <AvatarFallback>M</AvatarFallback>
                                      </Avatar>

                                      <span className="inline-flex flex-col">
                                        <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                          Vivek
                                        </span>
                                        <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                          @topdesigner321
                                        </span>
                                      </span>
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap line-clamp-2 text-dark-blue-400">
                                      40 hours
                                    </span>
                                  </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-white">
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap font-semibold text-dark-blue-400">
                                      Consumer Research
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm font-extralight line-clamp-2 text-dark-blue-400">
                                      Conduct research to understand consumer
                                      needs, behaviors, and preferences for
                                      product optimization.
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="inline-flex items-start gap-x-2">
                                      <Avatar>
                                        <AvatarImage src="/man.jpg" alt="Man" />
                                        <AvatarFallback>M</AvatarFallback>
                                      </Avatar>

                                      <span className="inline-flex flex-col">
                                        <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                          Vivek
                                        </span>
                                        <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                          @topdesigner321
                                        </span>
                                      </span>
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap line-clamp-2 text-dark-blue-400">
                                      40 hours
                                    </span>
                                  </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-white">
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap font-semibold text-dark-blue-400">
                                      Consumer Research
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm font-extralight line-clamp-2 text-dark-blue-400">
                                      Conduct research to understand consumer
                                      needs, behaviors, and preferences for
                                      product optimization.
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="inline-flex items-start gap-x-2">
                                      <Avatar>
                                        <AvatarImage src="/man.jpg" alt="Man" />
                                        <AvatarFallback>M</AvatarFallback>
                                      </Avatar>

                                      <span className="inline-flex flex-col">
                                        <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                          Vivek
                                        </span>
                                        <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                          @topdesigner321
                                        </span>
                                      </span>
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap line-clamp-2 text-dark-blue-400">
                                      40 hours
                                    </span>
                                  </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-white">
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap font-semibold text-dark-blue-400">
                                      Consumer Research
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm font-extralight line-clamp-2 text-dark-blue-400">
                                      Conduct research to understand consumer
                                      needs, behaviors, and preferences for
                                      product optimization.
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="inline-flex items-start gap-x-2">
                                      <Avatar>
                                        <AvatarImage src="/man.jpg" alt="Man" />
                                        <AvatarFallback>M</AvatarFallback>
                                      </Avatar>

                                      <span className="inline-flex flex-col">
                                        <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                          Vivek
                                        </span>
                                        <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                          @topdesigner321
                                        </span>
                                      </span>
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap line-clamp-2 text-dark-blue-400">
                                      40 hours
                                    </span>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </DisclosureContent>
                        </AccordionItem>
                        <AccordionItem
                          value="item-3"
                          className="rounded-lg border border-gray-200 shadow-sm bg-white"
                        >
                          <div className="flex items-center justify-between gap-x-4 px-3 py-3">
                            <div className="inline-flex items-center gap-x-3.5">
                              <AccordionTrigger asChild>
                                <IconButton variant="ghost" visual="gray">
                                  <ChevronDown className="size-5 shrink-0 text-gray-500 group-data-[state=open]/item:-rotate-180 transition duration-300" />
                                </IconButton>
                              </AccordionTrigger>

                              <span className="text-base md:text-[18px] font-semibold leading-7 text-gray-900">
                                Phase One{" "}
                                <span className="font-light">Research</span>
                              </span>
                            </div>

                            <div className="inline-flex items-center gap-x-8">
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

                              <Button visual="gray" variant="outlined">
                                <Plus className="size-[15px]" />
                                Add task
                              </Button>
                            </div>
                          </div>

                          <DisclosureContent>
                            <Table>
                              <TableHeader className="bg-gray-50">
                                <TableRow className="hover:bg-transparent">
                                  <TableHead className="hover:text-gray-600">
                                    Task
                                  </TableHead>
                                  <TableHead className="hover:text-gray-600">
                                    Description
                                  </TableHead>
                                  <TableHead className="hover:text-gray-600">
                                    Assignee
                                  </TableHead>
                                  <TableHead className="hover:text-gray-600">
                                    Duration
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                <TableRow className="hover:bg-white">
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap font-semibold text-dark-blue-400">
                                      Consumer Research
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm font-extralight line-clamp-2 text-dark-blue-400">
                                      Conduct research to understand consumer
                                      needs, behaviors, and preferences for
                                      product optimization.
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="inline-flex items-start gap-x-2">
                                      <Avatar>
                                        <AvatarImage src="/man.jpg" alt="Man" />
                                        <AvatarFallback>M</AvatarFallback>
                                      </Avatar>

                                      <span className="inline-flex flex-col">
                                        <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                          Vivek
                                        </span>
                                        <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                          @topdesigner321
                                        </span>
                                      </span>
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap line-clamp-2 text-dark-blue-400">
                                      40 hours
                                    </span>
                                  </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-white">
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap font-semibold text-dark-blue-400">
                                      Consumer Research
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm font-extralight line-clamp-2 text-dark-blue-400">
                                      Conduct research to understand consumer
                                      needs, behaviors, and preferences for
                                      product optimization.
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="inline-flex items-start gap-x-2">
                                      <Avatar>
                                        <AvatarImage src="/man.jpg" alt="Man" />
                                        <AvatarFallback>M</AvatarFallback>
                                      </Avatar>

                                      <span className="inline-flex flex-col">
                                        <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                          Vivek
                                        </span>
                                        <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                          @topdesigner321
                                        </span>
                                      </span>
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap line-clamp-2 text-dark-blue-400">
                                      40 hours
                                    </span>
                                  </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-white">
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap font-semibold text-dark-blue-400">
                                      Consumer Research
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm font-extralight line-clamp-2 text-dark-blue-400">
                                      Conduct research to understand consumer
                                      needs, behaviors, and preferences for
                                      product optimization.
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="inline-flex items-start gap-x-2">
                                      <Avatar>
                                        <AvatarImage src="/man.jpg" alt="Man" />
                                        <AvatarFallback>M</AvatarFallback>
                                      </Avatar>

                                      <span className="inline-flex flex-col">
                                        <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                          Vivek
                                        </span>
                                        <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                          @topdesigner321
                                        </span>
                                      </span>
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap line-clamp-2 text-dark-blue-400">
                                      40 hours
                                    </span>
                                  </TableCell>
                                </TableRow>
                                <TableRow className="hover:bg-white">
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap font-semibold text-dark-blue-400">
                                      Consumer Research
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm font-extralight line-clamp-2 text-dark-blue-400">
                                      Conduct research to understand consumer
                                      needs, behaviors, and preferences for
                                      product optimization.
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="inline-flex items-start gap-x-2">
                                      <Avatar>
                                        <AvatarImage src="/man.jpg" alt="Man" />
                                        <AvatarFallback>M</AvatarFallback>
                                      </Avatar>

                                      <span className="inline-flex flex-col">
                                        <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                                          Vivek
                                        </span>
                                        <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                                          @topdesigner321
                                        </span>
                                      </span>
                                    </span>
                                  </TableCell>
                                  <TableCell className="py-4 px-6">
                                    <span className="text-sm text-nowrap line-clamp-2 text-dark-blue-400">
                                      40 hours
                                    </span>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </DisclosureContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <div className="w-[305px] shrink-0 bg-white">
              <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-[0px_1px_5px_0px_rgba(16,24,40,0.02)]">
                <h1 className="text-base font-semibold leading-none text-dark-blue-400">
                  Price Details
                </h1>

                <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200">
                  <li className="flex items-center justify-between">
                    <span className="text-xs font-light text-dark-blue-400">
                      Project cost
                    </span>
                    <span className="text-xs text-dark-blue-400">$94,000</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-xs font-light text-dark-blue-400">
                      Project cost
                    </span>
                    <span className="text-xs text-dark-blue-400">$0.00</span>
                  </li>
                </ul>

                <ul className="pt-4 mt-4 space-y-2 border-t border-gray-200">
                  <li className="flex items-center justify-between">
                    <span className="text-xs font-light text-dark-blue-400">
                      Project cost
                    </span>
                    <span className="text-base font-bold leading-none text-dark-blue-400">
                      $94,000
                    </span>
                  </li>
                </ul>

                <div className="mt-[21.33px]">
                  <Button className="w-full" size="md">
                    Proceed to Payment
                  </Button>
                </div>

                <div className="mt-[21.33px]">
                  <span className="inline-block text-center font-light text-[10px] leading-[14px]">
                    By clicking the above, you agree to Marketeq’s{" "}
                    <Button
                      className="font-medium underline text-[10px] leading-[14px]"
                      variant="link"
                    >
                      Terms of Use
                    </Button>
                    and{" "}
                    <Button
                      className="font-medium underline text-[10px] leading-[14px]"
                      variant="link"
                    >
                      Policy Privacy
                    </Button>
                  </span>
                </div>

                <div className="mt-[21.33px] flex items-center justify-center">
                  <Button variant="link" visual="gray">
                    Add Gift Card / Promo Code
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

const Visa = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={34}
    height={24}
    viewBox="0 0 34 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} y={0.5} width={33} height={23} rx={3.5} fill="#fff" />
    <rect x={0.5} y={0.5} width={33} height={23} rx={3.5} stroke="#D0D5DD" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.75 15.858H8.69L7.146 9.792c-.074-.279-.23-.526-.458-.642A6.6 6.6 0 0 0 4.8 8.508v-.233h3.318c.458 0 .801.35.859.758l.8 4.375 2.06-5.133h2.002zm4.234 0h-1.945l1.602-7.584h1.945zm4.118-5.483c.058-.408.401-.642.802-.642a3.53 3.53 0 0 1 1.888.35l.343-1.633a4.8 4.8 0 0 0-1.773-.35c-1.888 0-3.262 1.05-3.262 2.508 0 1.109.973 1.691 1.66 2.042.743.35 1.03.583.972.933 0 .525-.572.758-1.144.758a4.8 4.8 0 0 1-2.002-.467l-.344 1.634c.687.291 1.43.409 2.117.409 2.117.057 3.433-.992 3.433-2.567 0-1.984-2.69-2.1-2.69-2.975m9.498 5.483-1.545-7.584h-1.659a.86.86 0 0 0-.801.584l-2.86 7h2.002l.4-1.108h2.46l.23 1.108zm-2.918-5.541.572 2.858h-1.602z"
      fill="#172B85"
    />
  </svg>
)

const Mastercard = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={34}
    height={24}
    viewBox="0 0 34 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} y={0.5} width={33} height={23} rx={3.5} fill="#fff" />
    <rect x={0.5} y={0.5} width={33} height={23} rx={3.5} stroke="#D0D5DD" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.179 16.83a6.8 6.8 0 0 1-4.398 1.6c-3.745 0-6.781-3-6.781-6.7s3.036-6.7 6.78-6.7c1.679 0 3.215.603 4.399 1.6a6.8 6.8 0 0 1 4.398-1.6c3.745 0 6.781 3 6.781 6.7s-3.036 6.7-6.78 6.7a6.8 6.8 0 0 1-4.399-1.6"
      fill="#ED0006"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.179 16.83a6.65 6.65 0 0 0 2.382-5.1c0-2.042-.924-3.87-2.382-5.1a6.8 6.8 0 0 1 4.398-1.6c3.745 0 6.78 3 6.78 6.7s-3.035 6.7-6.78 6.7a6.8 6.8 0 0 1-4.398-1.6"
      fill="#F9A000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.18 16.83a6.65 6.65 0 0 0 2.382-5.1c0-2.042-.925-3.87-2.383-5.1a6.65 6.65 0 0 0-2.382 5.1c0 2.042.924 3.87 2.382 5.1"
      fill="#FF5E00"
    />
  </svg>
)

const Discover = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={34}
    height={24}
    viewBox="0 0 34 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} y={0.5} width={33} height={23} rx={3.5} fill="white" />
    <rect x={0.5} y={0.5} width={33} height={23} rx={3.5} stroke="#D0D5DD" />
    <path
      d="M14 23L33 17.25V20C33 21.6569 31.6569 23 30 23H14Z"
      fill="#FD6020"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M29.3937 9.11084C30.439 9.11084 31.0139 9.59438 31.0139 10.5077C31.0662 11.2062 30.5958 11.7972 29.9686 11.9046L31.3797 13.8925H30.2822L29.0801 11.9584H28.9756V13.8925H28.0871V9.11084H29.3937ZM28.9756 11.3137H29.2369C29.8118 11.3137 30.0731 11.045 30.0731 10.5615C30.0731 10.1317 29.8118 9.86304 29.2369 9.86304H28.9756V11.3137ZM25.0034 13.8925H27.5122V13.0866H25.8919V11.7972H27.4599V10.9913H25.8919V9.91674H27.5122V9.11084H25.0034V13.8925ZM22.3902 12.3345L21.1881 9.11084H20.2474L22.1812 14H22.6515L24.5853 9.11084H23.6446L22.3902 12.3345ZM11.7805 11.5286C11.7805 12.8717 12.8258 14 14.1324 14C14.5505 14 14.9164 13.8925 15.2822 13.7314V12.6568C15.0209 12.9792 14.655 13.1941 14.2369 13.1941C13.4007 13.1941 12.7212 12.5494 12.7212 11.6897V11.5823C12.669 10.7227 13.3484 9.97048 14.1847 9.91675C14.6028 9.91675 15.0209 10.1317 15.2822 10.454V9.37948C14.9686 9.16458 14.5505 9.11085 14.1847 9.11085C12.8258 9.0034 11.7805 10.1317 11.7805 11.5286ZM10.1603 10.9376C9.63762 10.7227 9.48082 10.6152 9.48082 10.3466C9.53309 10.0242 9.79441 9.75557 10.108 9.8093C10.3693 9.8093 10.6306 9.97048 10.8397 10.1854L11.3101 9.54066C10.9442 9.2183 10.4739 9.00339 10.0035 9.00339C9.27176 8.94967 8.64459 9.54066 8.59232 10.2928V10.3466C8.59232 10.9913 8.85365 11.3674 9.68988 11.636C9.89894 11.6897 10.108 11.7972 10.3171 11.9046C10.4739 12.0121 10.5784 12.1733 10.5784 12.3882C10.5784 12.7643 10.2648 13.0866 9.95121 13.0866H9.89894C9.48082 13.0866 9.11497 12.818 8.95818 12.4419L8.38326 13.0329C8.69685 13.6239 9.32403 13.9463 9.95121 13.9463C10.7874 14 11.4669 13.3553 11.5191 12.4956V12.3345C11.4669 11.6897 11.2056 11.3674 10.1603 10.9376ZM7.12892 13.8925H8.01742V9.11084H7.12892V13.8925ZM3 9.11086H4.30662H4.56794C5.8223 9.16458 6.81532 10.2391 6.76306 11.5286C6.76306 12.227 6.44947 12.8717 5.92682 13.3553C5.45644 13.7314 4.88153 13.9463 4.30662 13.8926H3V9.11086ZM4.14983 13.0866C4.56794 13.1404 5.03833 12.9792 5.35191 12.7105C5.6655 12.3882 5.8223 11.9584 5.8223 11.4748C5.8223 11.045 5.6655 10.6152 5.35191 10.2928C5.03833 10.0242 4.56794 9.86302 4.14983 9.91674H3.8885V13.0866H4.14983Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.9481 9C16.6415 9 15.5439 10.0745 15.5439 11.4714C15.5439 12.8146 16.5892 13.9429 17.9481 13.9966C19.307 14.0503 20.3523 12.9221 20.4046 11.5252C20.3523 10.1283 19.307 9 17.9481 9V9Z"
      fill="#FD6020"
    />
  </svg>
)

const Amex = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={34}
    height={24}
    viewBox="0 0 34 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={34} height={24} rx={4} fill="#1F72CD" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m6.095 8.5-3.18 7.247h3.807l.472-1.156h1.08l.472 1.156h4.192v-.882l.373.882h2.168l.374-.9v.9h8.718l1.06-1.126.992 1.126 4.478.01-3.191-3.613L31.1 8.5h-4.407L25.66 9.605 24.699 8.5h-9.483l-.815 1.87-.833-1.87h-3.8v.852L9.345 8.5zm.737 1.029h1.856l2.11 4.914V9.53h2.034l1.63 3.523 1.502-3.523h2.023v5.2h-1.231l-.01-4.075-1.795 4.075H13.85l-1.805-4.075v4.075H9.512l-.48-1.166H6.437l-.479 1.165H4.601zm17.288 0h-5.007v5.197h4.93l1.588-1.722 1.53 1.722h1.601l-2.326-2.583 2.326-2.614h-1.53l-1.581 1.703zm-16.385.88-.855 2.077h1.71zm12.615 1.146v-.95h3.123l1.363 1.518-1.423 1.526H20.35v-1.036h2.73v-1.058z"
      fill="#fff"
    />
  </svg>
)

const ACH = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={35}
    height={24}
    viewBox="0 0 35 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={1}
      y={0.5}
      width={33}
      height={23}
      rx={3.5}
      fill="#fff"
      stroke="#D0D5DD"
    />
    <path
      d="M8.034 14.907H6l2.641-6.814h2.52l2.64 6.814h-2.033L9.929 9.81h-.06zm-.272-2.682h4.25v1.251h-4.25zm13.62-1.663h-1.91a1.3 1.3 0 0 0-.158-.463 1.2 1.2 0 0 0-.313-.352 1.4 1.4 0 0 0-.463-.223 2 2 0 0 0-.584-.08q-.57 0-.983.243a1.6 1.6 0 0 0-.63.702q-.219.459-.218 1.111 0 .68.221 1.138.225.456.631.688.41.23.967.23.314 0 .57-.07.26-.07.454-.203.2-.135.325-.33.13-.195.18-.442l1.911.01a2.3 2.3 0 0 1-.302.892 2.9 2.9 0 0 1-.684.802q-.436.36-1.062.572a4.4 4.4 0 0 1-1.43.213Q16.84 15 16 14.594a3.16 3.16 0 0 1-1.322-1.191q-.486-.781-.486-1.903 0-1.125.493-1.906a3.2 3.2 0 0 1 1.335-1.188Q16.86 8 17.904 8q.71 0 1.315.173.604.17 1.062.5.46.325.746.8t.355 1.089m1.083 4.345V8.093h1.892v2.735h3.085V8.093h1.888v6.814h-1.888v-2.738h-3.085v2.738z"
      fill="#000"
    />
  </svg>
)

const Wire = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={34}
    height={24}
    viewBox="0 0 34 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} y={0.5} width={33} height={23} rx={3.5} fill="#fff" />
    <rect x={0.5} y={0.5} width={33} height={23} rx={3.5} stroke="#D0D5DD" />
    <rect
      x={0.5}
      y={0.5}
      width={33}
      height={23}
      rx={3.5}
      fill="#fff"
      stroke="#D0D5DD"
    />
    <path
      d="m10.358 9 .84 3.179q.06.215.11.447.05.234.104.535.069-.356.117-.587t.094-.395L12.408 9h1.84l-1.89 6.687h-1.69l-.827-2.855q-.045-.15-.15-.59l-.073-.305-.064.27q-.105.442-.16.625l-.813 2.855H6.886L5 9h1.84l.768 3.197.107.494q.053.246.098.506a29 29 0 0 1 .233-1L8.886 9zm4.567 6.687V9h1.84v6.687zm3.311 0V9h1.905q1.119 0 1.56.103.44.102.76.345.36.273.555.698.194.426.194.937 0 .775-.381 1.263-.382.487-1.113.646l1.823 2.695h-2.06l-1.535-2.617v2.617zm1.708-3.526h.338q.59 0 .861-.201.272-.201.272-.63 0-.503-.253-.715-.254-.213-.852-.213h-.366zm4.289 3.526V9h4.097v1.466h-2.32v1.16h2.188v1.435H26.01v1.128h2.32v1.498z"
      fill="#000"
    />
  </svg>
)

const Swift = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={34}
    height={24}
    viewBox="0 0 34 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      x={0.5}
      y={0.5}
      width={33}
      height={23}
      rx={3.5}
      fill="#fff"
      stroke="#D0D5DD"
    />
    <path
      d="M8.798 9c-.907.019-1.694.658-1.689 1.679.004.593.481 1.061.95 1.555.72.763.933.629.9 1.402-.013.283-.503.725-1.03.724-.78-.002-1.325-.72-1.109-1.587h-.225L6 14.837h.225c.066-.212.51-.193.691-.2.341-.014.536.249 1.239.246.961-.003 1.906-.605 1.897-1.725-.005-.58-.377-.975-.868-1.432-.757-.703-1.051-1.039-.917-1.602.111-.465.459-.596.804-.6.647-.008.926.645 1.013 1.324h.209l.53-1.725h-.225c-.049.204-.31.214-.514.2-.092-.006-.144.012-.37-.061-.24-.078-.619-.268-.916-.262m2.267.231L11 9.57c.356.001.484-.006.483.631v4.636s.093.204.225 0c.131-.203 2.267-3.588 2.267-3.588v.107l-.016 3.481s.136.204.273 0c.138-.203 3.087-4.867 3.087-4.867.135-.231.237-.392.58-.4l.08-.339h-1.817l-.065.339c.398 0 .663-.06.676.17a.5.5 0 0 1-.08.292l-1.496 2.34-.032-.045V10.2a7 7 0 0 0 0-.261c-.01-.361.093-.37.386-.37l.064-.339h-2.026l-.064.339c.305.008.438.093.434.354v.478l-1.303 2.017-.048.03V9.894c-.001-.123-.03-.322.338-.323l.096-.339zm7.187 0-.064.339c.166-.008.335.052.353.231.008.078-.04.193-.08.339l-1.11 3.958c-.065.263-.395.404-.836.4l-.064.34h2.364l.08-.34c-.418-.008-.391-.119-.386-.261.003-.09.049-.172.08-.278l1.126-3.973c.116-.372.395-.408.82-.416l.08-.339zm2.685 0-.08.339c.352.025.852.022.723.416-.028.086.003.046-.032.185l-1.077 3.85c-.084.357-.345.47-.66.477l-.096.34h2.508l.097-.34c-.549-.001-.77-.071-.66-.477.024-.087.07-.24.097-.37l.514-1.694h.113c.49-.002.629.057.643.308.01.162.005.293.016.385h.274l.418-1.648-.225-.03c-.232.567-.727.575-.9.57h-.226l.354-1.356c.154-.5.204-.473.595-.477.681-.008 1.086.099 1.029 1.016h.225l.418-1.494zm4.39 0-.435 1.494h.258c.125-.417.129-.487.386-.708.263-.221.547-.308.996-.308L25.36 13.82c-.082.671-.485.669-.997.677l-.08.34h2.652l.065-.309c-.34.03-.549-.184-.483-.431.026-.095.072-.237.113-.4l1.093-3.99c.833 0 1 .32.949 1.017h.241l.418-1.494zm-10.05 4.975c-.139 0-.285.166-.321.37s.053.368.193.369c.139 0 .286-.166.321-.37s-.054-.369-.193-.37m4.116 0c-.139 0-.285.166-.321.37s.054.368.193.369c.14 0 .286-.166.321-.37s-.053-.369-.193-.37m3.538 0c-.14 0-.286.166-.322.37s.038.368.177.369c.14 0 .286-.166.322-.37.035-.203-.038-.369-.177-.37m-12.67.015c-.14 0-.27.166-.306.37s.038.369.177.37c.14 0 .286-.167.322-.37.036-.204-.054-.37-.193-.37m17.397 0c-.14 0-.286.166-.322.37s.054.369.193.37c.14 0 .286-.167.322-.37.036-.204-.054-.37-.193-.37"
      fill="#000"
    />
  </svg>
)

const GPay = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={35}
    height={24}
    viewBox="0 0 35 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={1} y={0.5} width={33} height={23} rx={3.5} fill="#fff" />
    <rect x={1} y={0.5} width={33} height={23} rx={3.5} stroke="#D0D5DD" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.558 15.528v-2.935h1.515q.93-.002 1.572-.618l.102-.104c.78-.85.729-2.172-.102-2.958a2.16 2.16 0 0 0-1.572-.63h-2.431v7.245zm0-3.825v-2.53h1.538c.33 0 .644.127.877.358.496.486.507 1.294.029 1.797a1.2 1.2 0 0 1-.906.376zm7.465-.745q-.59-.548-1.605-.549-1.309.002-1.96.965l.81.514q.444-.658 1.212-.658c.325 0 .638.121.883.34.239.209.376.509.376.827v.213c-.353-.196-.798-.3-1.344-.3q-.958-.002-1.532.457c-.381.306-.575.71-.575 1.224-.011.468.188.913.54 1.213.36.324.815.486 1.35.486.633 0 1.134-.284 1.515-.85h.04v.688h.877v-3.056c0-.641-.194-1.15-.587-1.514m-2.488 3.657a.75.75 0 0 1-.302-.607q.002-.407.37-.675.378-.271.934-.272.77-.007 1.196.34-.001.591-.455 1.023a1.45 1.45 0 0 1-1.031.434 1.1 1.1 0 0 1-.712-.243m5.045 3.09 3.063-7.134h-.996l-1.418 3.559h-.017l-1.452-3.56h-.996l2.01 4.64-1.14 2.495z"
      fill="#3C4043"
    />
    <path
      d="M13.394 11.958q0-.426-.069-.844H9.46v1.6h2.215a1.93 1.93 0 0 1-.82 1.266v1.04h1.321c.774-.723 1.219-1.791 1.219-3.062"
      fill="#4285F4"
    />
    <path
      d="M9.46 16.025c1.104 0 2.038-.37 2.715-1.005l-1.32-1.04c-.37.254-.844.399-1.396.399-1.07 0-1.976-.734-2.3-1.716H5.798v1.075a4.09 4.09 0 0 0 3.661 2.287"
      fill="#34A853"
    />
    <path
      d="M7.158 12.663a2.54 2.54 0 0 1 0-1.594V10h-1.36a4.18 4.18 0 0 0 0 3.732z"
      fill="#FBBC04"
    />
    <path
      d="M9.46 9.353a2.2 2.2 0 0 1 1.57.624l1.174-1.19a3.93 3.93 0 0 0-2.745-1.08A4.09 4.09 0 0 0 5.798 10l1.36 1.074c.325-.988 1.23-1.721 2.301-1.721"
      fill="#EA4335"
    />
  </svg>
)

const ApplePay = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={35}
    height={24}
    viewBox="0 0 35 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={1} y={0.5} width={33} height={23} rx={3.5} fill="#fff" />
    <rect x={1} y={0.5} width={33} height={23} rx={3.5} stroke="#D0D5DD" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.95 8.343c-.286.352-.743.63-1.2.59-.056-.476.167-.981.429-1.294.285-.361.784-.62 1.189-.639.047.496-.138.981-.419 1.343m.413.684c-.402-.024-.77.126-1.066.248-.19.078-.352.144-.475.144-.138 0-.306-.07-.495-.148-.248-.103-.53-.22-.827-.214-.68.01-1.313.411-1.66 1.05-.714 1.28-.186 3.173.504 4.214.338.515.742 1.08 1.275 1.06.234-.01.402-.084.577-.16.2-.09.41-.182.735-.182.315 0 .514.09.706.176.182.082.357.161.617.156.551-.01.899-.515 1.236-1.03.365-.554.525-1.094.55-1.176l.002-.01-.013-.006a1.85 1.85 0 0 1-1.062-1.693c-.009-1 .739-1.507.856-1.586l.014-.01c-.475-.734-1.217-.813-1.474-.833m3.82 6.29V7.59h2.782c1.436 0 2.44 1.03 2.44 2.537s-1.023 2.548-2.478 2.548h-1.594v2.642zm1.15-6.716h1.327c1 0 1.57.555 1.57 1.531 0 .977-.57 1.537-1.574 1.537h-1.323zm7.872 5.789c-.304.604-.975.986-1.698.986-1.07 0-1.817-.664-1.817-1.665 0-.991.723-1.561 2.06-1.646l1.436-.089v-.426c0-.63-.395-.972-1.099-.972-.58 0-1.003.313-1.089.789H19.96c.034-1.002.937-1.73 2.16-1.73 1.317 0 2.174.718 2.174 1.834v3.846h-1.066v-.927zm-1.389.07c-.613 0-1.003-.308-1.003-.779 0-.486.376-.768 1.094-.813l1.28-.084v.436c0 .724-.59 1.24-1.37 1.24m6.012 1.159c-.461 1.353-.989 1.8-2.111 1.8-.086 0-.371-.01-.438-.03v-.927c.071.01.247.02.338.02.509 0 .794-.224.97-.803l.105-.343-1.95-5.625h1.203l1.355 4.565h.024L28.68 9.71h1.17z"
      fill="#000"
    />
  </svg>
)

const Klarna = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={35}
    height={24}
    viewBox="0 0 35 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={0.5} width={34} height={24} rx={4} fill="#FFD8E2" />
    <mask id="a" fill="#fff">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.77 15.38H4.385V9h1.383zM9.222 9H7.87c0 1.174-.51 2.252-1.4 2.957l-.536.425 2.078 2.998H9.72l-1.912-2.76c.907-.954 1.415-2.239 1.415-3.62m2.207 6.378h-1.307V9h1.307zm3.947-4.411v.282a2.1 2.1 0 0 0-1.237-.404c-1.214 0-2.199 1.042-2.199 2.327 0 1.286.985 2.328 2.2 2.328.458 0 .884-.15 1.236-.404v.282h1.248v-4.411zm-.004 2.205c0 .627-.506 1.135-1.13 1.135a1.133 1.133 0 0 1-1.131-1.135c0-.626.506-1.134 1.13-1.134.625 0 1.131.508 1.131 1.134m13.17-1.923v-.282h1.247v4.41h-1.248v-.281a2.1 2.1 0 0 1-1.237.404c-1.214 0-2.199-1.042-2.199-2.328s.985-2.327 2.2-2.327c.458 0 .884.15 1.236.404m-1.135 3.058c.624 0 1.13-.508 1.13-1.135 0-.626-.506-1.134-1.13-1.134-.625 0-1.13.508-1.13 1.134 0 .627.505 1.135 1.13 1.135m2.924.335c0-.458.35-.829.783-.829.432 0 .783.371.783.83 0 .457-.35.828-.783.828s-.783-.371-.783-.829m-7.443-3.794c-.499 0-.97.164-1.286.616v-.497H20.36v4.41h1.258V13.06c0-.67.425-1 .937-1 .548 0 .864.347.864.99v2.328h1.246v-2.805c0-1.027-.771-1.725-1.776-1.725m-4.333.119v.574c.25-.344.716-.574 1.223-.574v1.284h-.015c-.494 0-1.206.373-1.206 1.068v2.059h-1.28v-4.411z"
      />
    </mask>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.77 15.38H4.385V9h1.383zM9.222 9H7.87c0 1.174-.51 2.252-1.4 2.957l-.536.425 2.078 2.998H9.72l-1.912-2.76c.907-.954 1.415-2.239 1.415-3.62m2.207 6.378h-1.307V9h1.307zm3.947-4.411v.282a2.1 2.1 0 0 0-1.237-.404c-1.214 0-2.199 1.042-2.199 2.327 0 1.286.985 2.328 2.2 2.328.458 0 .884-.15 1.236-.404v.282h1.248v-4.411zm-.004 2.205c0 .627-.506 1.135-1.13 1.135a1.133 1.133 0 0 1-1.131-1.135c0-.626.506-1.134 1.13-1.134.625 0 1.131.508 1.131 1.134m13.17-1.923v-.282h1.247v4.41h-1.248v-.281a2.1 2.1 0 0 1-1.237.404c-1.214 0-2.199-1.042-2.199-2.328s.985-2.327 2.2-2.327c.458 0 .884.15 1.236.404m-1.135 3.058c.624 0 1.13-.508 1.13-1.135 0-.626-.506-1.134-1.13-1.134-.625 0-1.13.508-1.13 1.134 0 .627.505 1.135 1.13 1.135m2.924.335c0-.458.35-.829.783-.829.432 0 .783.371.783.83 0 .457-.35.828-.783.828s-.783-.371-.783-.829m-7.443-3.794c-.499 0-.97.164-1.286.616v-.497H20.36v4.41h1.258V13.06c0-.67.425-1 .937-1 .548 0 .864.347.864.99v2.328h1.246v-2.805c0-1.027-.771-1.725-1.776-1.725m-4.333.119v.574c.25-.344.716-.574 1.223-.574v1.284h-.015c-.494 0-1.206.373-1.206 1.068v2.059h-1.28v-4.411z"
      fill="#000"
    />
    <path
      d="M4.386 15.38h-1v1h1zm1.383 0v1h1v-1zM4.386 9V8h-1v1zm1.383 0h1V8h-1zm2.1 0V8h-1v1zm1.354 0h1V8h-1zM6.47 11.957l.622.783zm-.536.425-.62-.784-.736.582.534.771zm2.078 2.998-.822.57.298.43h.524zm1.708 0v1h1.91l-1.088-1.57zm-1.912-2.76-.725-.687-.56.59.463.668zm2.315 2.758h-1v1h1zm1.307 0v1h1v-1zM10.123 9V8h-1v1zm1.307 0h1V8h-1zm3.947 2.248-.585.81 1.585 1.145V11.25zm0-.282v-1h-1v1zm0 4.129h1V13.14l-1.585 1.144zm0 .282h-1v1h1zm1.248 0v1h1v-1zm0-4.411h1v-1h-1zm11.917 0v-1h-1v1zm0 .282-.585.81 1.585 1.145V11.25zm1.248-.282h1v-1h-1zm0 4.41v1h1v-1zm-1.248 0h-1v1h1zm0-.281h1V13.14l-1.585 1.144zm-6.94-3.632h-1v3.18l1.82-2.608zm0-.497h1v-1h-1zm-1.242 0v-1h-1v1zm0 4.41h-1v1h1zm1.258 0v1h1v-1zm1.8 0h-1v1h1zm1.247 0v1h1v-1zm-6.11-3.836h-1v3.08l1.81-2.492zm0-.574h1v-1h-1zm1.224 0h1v-1h-1zm0 1.284-.042.999 1.042.043V12.25zm-.007 0 .041-1h-.004zm-.008 0 .037-1h-.037zm-1.206 3.127v1h1v-1zm-1.28 0h-1v1h1zm0-4.411v-1h-1v1zM4.386 16.38h1.383v-2H4.386zm-1-7.38v6.38h2V9zm2.383-1H4.386v2h1.383zm1 7.38V9h-2v6.38zM7.87 10h1.354V8H7.87zm-.777 2.74C8.23 11.838 8.87 10.467 8.87 9h-2c0 .88-.38 1.665-1.02 2.173zm-.537.425.537-.425-1.243-1.567-.536.425zm2.279 1.645-2.078-2.998-1.644 1.14 2.078 2.997zm.886-.43H8.012v2H9.72zm-2.734-1.19 1.912 2.76 1.644-1.14-1.912-2.759zM8.223 9c0 1.134-.416 2.17-1.14 2.933l1.45 1.376c1.09-1.147 1.69-2.68 1.69-4.309zm1.9 7.378h1.307v-2h-1.307zM9.123 9v6.377h2V9zm2.307-1h-1.307v2h1.307zm1 7.377V9h-2v6.377zm3.947-4.129v-.282h-2v.282zm-2.237.596c.237 0 .46.076.652.215l1.17-1.622a3.1 3.1 0 0 0-1.822-.593zm-1.199 1.327c0-.787.59-1.327 1.2-1.327v-2c-1.82 0-3.2 1.544-3.2 3.327zm1.2 1.328c-.61 0-1.2-.54-1.2-1.328h-2c0 1.784 1.38 3.328 3.2 3.328zm.651-.215a1.1 1.1 0 0 1-.652.215v2a3.1 3.1 0 0 0 1.822-.593zm1.585 1.093v-.282h-2v.282zm.248-1h-1.248v2h1.248zm-1-3.411v4.41h2v-4.41zm-.248 1h1.248v-2h-1.248zm-1.134 3.34c1.18 0 2.13-.959 2.13-2.135h-2a.133.133 0 0 1-.13.135zm-2.131-2.135c0 1.176.95 2.135 2.13 2.135v-2a.133.133 0 0 1-.13-.135zm2.13-2.134c-1.18 0-2.13.959-2.13 2.134h2c0-.077.062-.134.13-.134zm2.131 2.134c0-1.175-.95-2.134-2.13-2.134v2c.069 0 .13.057.13.134zm11.17-2.205v.282h2v-.282zm2.247-1h-1.248v2h1.248zm1 5.41v-4.41h-2v4.41zm-2.248 1h1.248v-2h-1.248zm-1-1.281v.282h2v-.282zm-.237 1.404c.682 0 1.31-.223 1.823-.593l-1.17-1.622a1.1 1.1 0 0 1-.653.215zm-3.199-3.328c0 1.784 1.38 3.328 3.2 3.328v-2c-.61 0-1.2-.54-1.2-1.328zm3.2-3.327c-1.82 0-3.2 1.544-3.2 3.327h2c0-.787.59-1.327 1.2-1.327zm1.822.593a3.1 3.1 0 0 0-1.823-.593v2c.237 0 .46.076.652.215zm-1.59 2.734a.133.133 0 0 1-.13.135v2c1.18 0 2.13-.959 2.13-2.135zm-.13-.134c.069 0 .13.057.13.134h2c0-1.175-.95-2.134-2.13-2.134zm-.13.134c0-.077.06-.134.13-.134v-2c-1.18 0-2.13.959-2.13 2.134zm.13.135a.133.133 0 0 1-.13-.135h-2c0 1.176.95 2.135 2.13 2.135zm3.707-.494c-1.038 0-1.783.873-1.783 1.83h2a.15.15 0 0 1-.044.1.24.24 0 0 1-.173.07zm1.783 1.83c0-.957-.746-1.83-1.783-1.83v2a.24.24 0 0 1-.173-.07.15.15 0 0 1-.044-.1zm-1.783 1.828c1.037 0 1.783-.873 1.783-1.829h-2a.15.15 0 0 1 .044-.1.24.24 0 0 1 .173-.071zm-1.783-1.829c0 .956.745 1.829 1.783 1.829v-2c.079 0 .14.036.173.07a.15.15 0 0 1 .044.101zm-6.91-2.606a.37.37 0 0 1 .16-.135.8.8 0 0 1 .306-.053v-2c-.724 0-1.552.25-2.105 1.043zm-1.82-1.069v.497h2v-.497zm-.242 1h1.243v-2H20.36zm1 3.41v-4.41h-2v4.41zm.258-1H20.36v2h1.258zm-1-1.317v2.318h2V13.06zm1.937-2c-.468 0-.97.153-1.358.533-.397.387-.579.913-.579 1.467h2c0-.062.01-.085.009-.082l-.01.017a.2.2 0 0 1-.078.066c-.01.003-.006 0 .016 0zm1.864 1.99c0-.471-.116-.988-.477-1.397-.378-.429-.894-.592-1.387-.592v2c.032 0 .026.005-.004-.007a.3.3 0 0 1-.109-.078c-.031-.036-.038-.062-.036-.055a.5.5 0 0 1 .013.13zm0 2.328V13.05h-2v2.327zm.246-1h-1.246v2h1.246zm-1-1.805v2.805h2v-2.805zm-.776-.725c.5 0 .776.297.776.725h2c0-1.626-1.267-2.725-2.776-2.725zm-3.333-.307v-.574h-2v.574zm.223-1.574c-.785 0-1.571.351-2.033.987l1.619 1.175a.4.4 0 0 1 .136-.1.65.65 0 0 1 .278-.062zm1 2.284v-1.284h-2v1.284zm-1.049.999h.007l.083-1.998h-.007zm-.003 0h.008l.074-1.999H19.8zm-.169.069-.002.011-.006.018c-.004.006 0-.005.027-.025a.4.4 0 0 1 .164-.07l.023-.003v-2a2.37 2.37 0 0 0-1.39.475c-.43.324-.816.864-.816 1.594zm0 2.059v-2.06h-2v2.06zm-2.28 1h1.28v-2h-1.28zm-1-5.411v4.41h2v-4.41zm2.278-1h-1.278v2h1.278z"
      fill="#000"
      mask="url(#a)"
    />
  </svg>
)

const GIFT_CARD_REGEX = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/

const CARD_NUMBER_REGEX = /^(?:\d[ -]*?){13,19}$/

const getSchema = (availableBalance: number) =>
  z.object({
    amount: z.coerce
      .number({
        invalid_type_error: "Please enter a valid number",
      })
      .min(1, "Please provide a number bigger or equal to 1")
      .max(availableBalance, "You do not have sufficient balance available"),
    paymentMethod: z.string().min(1, "Please select a payment method"),
    pay: z.enum(["AT_ONCE", "IN_INSTALLMENTS"], {
      required_error: "Please select an option",
    }),
    cardNumber: z
      .string()
      .regex(CARD_NUMBER_REGEX, "Please provide a valid card number"),
    nameOnCard: z.string().min(1, "Please enter at least 1 character"),
    expirationDate: z.string().min(1, "Please provide a valid expiration date"),
    cvvOrCvc: z
      .string()
      .min(3, "Please provide a valid CVV or CVC")
      .max(4, "Please provide a valid CVV or CVC"),
    giftCard: z.string().regex(GIFT_CARD_REGEX, "Invalid gift card"),
    saveDefaultPaymentMethod: z.boolean(),
    billingAddress: billingAddressForm,
  })

const billingAddressForm = z
  .object({
    fullName: z.string().min(1, "Please enter at least 1 character"),
    addressLine1: z.string().min(1, "Please enter at least 1 character"),
    addressLine2: z.string(),
    city: z.string().min(1, "Please enter at least 1 character"),
    state: z.string().min(1, "Please select your state"),
    zipcode: z.string().length(5, "Please enter a valid zipcode"),
    phoneNumber: z.string(),
  })
  .refine(
    (data) => isPhoneValid(data.phoneNumber),
    "Please enter a valid phone number"
  )

type FormValues = z.infer<ReturnType<typeof getSchema>>

type BillingAddressFormValues = z.infer<typeof billingAddressForm>

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 20,
})

const formatGiftCard = (giftCard: string) => {
  const cleaned = giftCard.replace(/[^A-Za-z0-9]/g, "")
  const capitalized = cleaned.toUpperCase()
  let i = 4
  let result = capitalized.slice(0, i)
  for (; i < capitalized.length; i += 4) {
    if (GIFT_CARD_REGEX.test(result)) break

    result += "-" + capitalized.slice(i, i + 4)
  }
  return result
}

const formatCardNumber = (cardNumber: string) => {
  const cleaned = cardNumber.replace(/\D/g, "")
  let i = 4
  let result = cleaned.slice(0, i)
  for (; i < cleaned.length; i += 4) {
    if (CARD_NUMBER_REGEX.test(result)) break

    result += "-" + cleaned.slice(i, i + 4)
  }
  return result
}

const PAYMENT_METHODS = [
  {
    value: "item-0",
    icons: [
      { icon: <Visa /> },
      { icon: <Mastercard /> },
      { icon: <Discover /> },
      { icon: <Amex /> },
    ],
    title: "Credit / Debit Card",
    desc: "2.9% + $0.30 per transaction",
  },
  {
    value: "item-1",
    icons: [{ icon: <ACH /> }],
    title: "Bank Account",
    desc: "0.8% per transaction",
  },
  {
    value: "item-2",
    icons: [{ icon: <Wire /> }, { icon: <Swift /> }],
    title: "Wire Transfer",
    desc: "0.8% per transaction",
  },
  {
    value: "item-3",
    icons: [{ icon: <GPay /> }],
    title: "Google Pay",
    desc: "2.9% + $0.30 per transaction",
  },
  {
    value: "item-4",
    icons: [{ icon: <ApplePay /> }],
    title: "Apple Pay",
    desc: "2.9% + $0.30 per transaction",
  },
  {
    value: "item-5",
    icons: [{ icon: <Klarna /> }],
    title: "Pay with Klarna",
    desc: "starting at 5.9% + $0.30per transaction",
  },
]

const GiftCard = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M23.297 4.5q1.718 0 2.578.854.816.81.858 2.366l.002.175V19.82q0 1.687-.86 2.534-.814.806-2.4.847l-.178.002H4.439q-1.719 0-2.58-.848-.813-.805-.856-2.36L1 19.821V7.895q0-1.697.86-2.546.815-.805 2.4-.846l.179-.003zM2.763 19.722q0 .855.438 1.287.405.4 1.135.43l.125.003 8.739-.001v-5.803h-.077a5.4 5.4 0 0 1-.86 1.61 8.3 8.3 0 0 1-1.336 1.379q-.707.585-1.522 1.002-.772.388-1.396.487-.47.066-.74-.208a.88.88 0 0 1-.268-.635q0-.394.23-.64a.94.94 0 0 1 .545-.276l.102-.015q.57-.065 1.214-.421a7.5 7.5 0 0 0 1.255-.876q.59-.501 1.084-1.096.417-.502.654-.951l.063-.127H2.763zm22.209-4.852h-9.386q.242.505.718 1.08.495.593 1.085 1.095.607.52 1.248.875.57.317 1.082.404l.128.018q.428.044.657.29.23.247.23.641 0 .362-.269.635-.267.273-.738.208-.636-.099-1.402-.487a8.5 8.5 0 0 1-1.517-1.002 8.3 8.3 0 0 1-1.336-1.38 5.5 5.5 0 0 1-.795-1.424l-.065-.186h-.088v5.804h8.75q.81 0 1.255-.432.41-.4.44-1.158l.003-.129zm-1.575-8.604-.122-.003h-8.75v3.757a4.7 4.7 0 0 1 .881-1.21 3.9 3.9 0 0 1 1.145-.784 3.2 3.2 0 0 1 1.303-.273q1.182 0 1.966.783.782.782.782 1.987 0 .69-.295 1.287a3.5 3.5 0 0 1-.827 1.067c-.32.282-.677.52-1.06.707l-.172.082h6.723V7.994q0-.855-.442-1.293-.41-.405-1.132-.435M13.2 6.262H4.46q-.82 0-1.259.438-.405.405-.435 1.164l-.003.128v5.673h6.713a5 5 0 0 1-1.221-.789 3.6 3.6 0 0 1-.832-1.067 2.8 2.8 0 0 1-.301-1.287q0-1.205.788-1.987.79-.783 1.96-.783.69-.001 1.315.274c.425.19.813.454 1.144.783a4.4 4.4 0 0 1 .78 1.037l.09.173zM9.959 9.307q-.591 0-.942.357-.35.355-.35.98 0 .514.317 1.024.316.509.876.92a4.9 4.9 0 0 0 1.28.662q.633.22 1.332.248l.202.004h.328v-.307a4.6 4.6 0 0 0-.241-1.489 4.2 4.2 0 0 0-.668-1.243 3.3 3.3 0 0 0-.975-.849 2.35 2.35 0 0 0-1.16-.307m7.807 0c-.403 0-.8.107-1.15.307a3.3 3.3 0 0 0-.974.849A4.4 4.4 0 0 0 14.725 13l-.004.195v.307h.329a4.75 4.75 0 0 0 2.82-.915q.553-.41.87-.92.319-.508.318-1.024 0-.623-.345-.98-.345-.356-.948-.356" />
  </svg>
)

const defaultBillingAddressFormValues: BillingAddressFormValues = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  fullName: "",
  phoneNumber: "",
  state: "",
  zipcode: "",
}

export const AvailableBalance = () => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const [showGiftCard, setShowGiftCard] = React.useState(false)
  const [isAmountFormSubmitted, setIsAmountFormSubmitted] =
    React.useState(false)

  const [availableBalance] = React.useState(4000)
  const timeoutId = React.useRef<ReturnType<typeof setTimeout>>()
  const [giftCards, setGiftCards] = useUncontrolledState<string[] | undefined>({
    defaultValue: undefined,
  })
  const [billingAddresses, setBillingAddresses] = useUncontrolledState<
    BillingAddressFormValues[] | undefined
  >({
    defaultValue: undefined,
  })
  const [layout, setLayout] = React.useState<"default" | "selection" | "form">(
    "form"
  )

  const handleRemove = (index: number) => {
    if (giftCards) {
      const lastItem = giftCards.length - 1 === index
      lastItem && setShowGiftCard(false)
      setGiftCards(giftCards.filter((_, i) => i !== index))
    }
  }

  React.useEffect(() => {
    return () => clearTimeout(timeoutId.current)
  }, [timeoutId, showGiftCard])

  const {
    register,
    formState: { errors },
    control,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(getSchema(availableBalance)),
    mode: "onChange",
    defaultValues: {
      saveDefaultPaymentMethod: false,
      cardNumber: "",
      cvvOrCvc: "",
      expirationDate: "",
      giftCard: "",
      nameOnCard: "",
      paymentMethod: "",
      pay: "AT_ONCE",
    },
  })
  const form = useForm<BillingAddressFormValues>({
    resolver: zodResolver(billingAddressForm),
    defaultValues: defaultBillingAddressFormValues,
  })

  const amount = useWatch({ control, name: "amount" })
  const giftCard = useWatch({ control, name: "giftCard" })
  const paymentMethod = useWatch({ control, name: "paymentMethod" })
  const billingAddress = useWatch({ control, name: "billingAddress" })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsVisible(false)
    setIsAmountFormSubmitted(true)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setGiftCards((prev) => (prev ? [...prev, giftCard] : [giftCard]))
    setValue("giftCard", "")
    setShowGiftCard(true)
    timeoutId.current = setTimeout(() => setShowGiftCard(false), ONE_SECOND * 5)
  }

  const handleOnSubmit: SubmitHandler<BillingAddressFormValues> = (values) => {
    setBillingAddresses((prev) => (prev ? [...prev, values] : [values]))
    form.reset(defaultBillingAddressFormValues, {
      keepErrors: false,
      keepDirty: false,
      keepTouched: false,
    })

    setLayout("selection")
  }

  const onUseAddress = () => {
    if (billingAddress) setLayout("default")
  }

  return (
    <div className="bg-gray-50">
      <Navigation />

      <div className="px-[150px] py-[50px]">
        <Button className="group" size="md" variant="link" visual="gray">
          <ArrowLeft className="size-[15px] group-hover:-translate-x-1 transition duration-300" />{" "}
          Back
        </Button>

        <h1 className="mt-2 text-2xl leading-[.7] font-bold text-dark-blue-400">
          Payment Details
        </h1>

        <div className="mt-6 flex items-start gap-x-8">
          <div className="flex-auto p-[50px] rounded-lg shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)] border border-gray-200 bg-white">
            <h3 className="text-base leading-[.7] font-semibold text-dark-blue-400">
              How do you want to pay?
            </h3>

            <div className="mt-6">
              <Controller
                control={control}
                name="pay"
                render={({ field: { onChange, ...field } }) => (
                  <RadioGroup
                    onValueChange={onChange}
                    className="flex gap-x-3 items-start"
                    {...field}
                  >
                    <RadioGroupItemSelector size="md" value="AT_ONCE">
                      <Label size="sm" asChild>
                        <span>Pay Full Amount</span>
                      </Label>
                      <HelperText size="sm">$98,000</HelperText>
                    </RadioGroupItemSelector>
                    <RadioGroupItemSelector size="md" value="IN_INSTALLMENTS">
                      <Label size="sm" asChild>
                        <span>Pay In Installments</span>
                      </Label>
                      <HelperText size="sm">
                        Select your payment plan
                      </HelperText>
                    </RadioGroupItemSelector>
                  </RadioGroup>
                )}
              />

              <HookFormErrorMessage
                errors={errors}
                name="pay"
                render={({ message }) => (
                  <ErrorMessage className="mt-1.5">{message}</ErrorMessage>
                )}
              />
            </div>

            <div className="mt-6 border-t pt-6 border-gray-200">
              <h3 className="text-base leading-[.7] font-semibold text-dark-blue-400">
                Your Available Balance
              </h3>

              <div className="mt-5 flex items-start gap-x-4">
                <Checkbox size="md" />

                <div className="flex-auto flex flex-col items-start">
                  {isVisible ? (
                    <form className="contents" onSubmit={onSubmit}>
                      <div className="flex items-center flex-auto max-w-[328px] gap-x-3">
                        <Controller
                          control={control}
                          name="amount"
                          render={({ field: { onChange, ...field } }) => (
                            <CurrencyInput
                              className={cn(
                                inputVariants({
                                  className: "flex-auto",
                                  variant: hookFormHasError({
                                    errors,
                                    name: "amount",
                                  })
                                    ? "error"
                                    : undefined,
                                })
                              )}
                              intlConfig={{
                                locale: "en-US",
                                currency: "USD",
                              }}
                              onValueChange={onChange}
                              placeholder="Enter amount"
                              decimalsLimit={20}
                              {...field}
                            />
                          )}
                        />

                        <Button
                          size="lg"
                          disabled={hookFormHasError({
                            errors,
                            name: "amount",
                          })}
                        >
                          Apply
                        </Button>
                      </div>

                      <HookFormErrorMessage
                        errors={errors}
                        name="amount"
                        render={({ message }) => (
                          <ErrorMessage className="mt-1.5">
                            {message}
                          </ErrorMessage>
                        )}
                      />

                      <div className="mt-2">
                        <span className="block text-xs leading-none text-gray-500">
                          {formatter.format(
                            z.coerce.number().safeParse(amount).success
                              ? availableBalance - amount
                              : availableBalance
                          )}{" "}
                          remaining of available balance
                        </span>
                      </div>

                      <Button
                        className="underline mt-1"
                        variant="link"
                        visual="gray"
                        type="button"
                        onClick={() => {
                          setValue("amount", undefined as unknown as number)
                          setIsVisible(false)
                        }}
                      >
                        Use full balance
                      </Button>
                    </form>
                  ) : (
                    <>
                      {z.coerce.number().safeParse(amount).success ? (
                        <>
                          <Label size="sm">
                            Using{" "}
                            <span className="font-bold">
                              {formatter.format(amount)}
                            </span>{" "}
                            of total available balance of{" "}
                            {formatter.format(availableBalance)}
                          </Label>
                          <div className="flex items-center gap-x-1 mt-1.5">
                            <Button
                              className="underline"
                              variant="link"
                              visual="gray"
                              onClick={() => setIsVisible(true)}
                            >
                              Edit amount
                            </Button>
                            <span className="inline-block text-xs leading-[15px] text-gray-500">
                              or
                            </span>
                            <Button
                              className="underline"
                              variant="link"
                              visual="gray"
                              onClick={() =>
                                setValue(
                                  "amount",
                                  undefined as unknown as number
                                )
                              }
                            >
                              Use full balance
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <Label size="sm">
                            Use my{" "}
                            <span className="font-bold">
                              {formatter.format(availableBalance)}
                            </span>{" "}
                            available balance{" "}
                          </Label>
                          <Button
                            className="underline mt-1.5"
                            variant="link"
                            visual="gray"
                            onClick={() => setIsVisible(true)}
                          >
                            Apply Custom Amount
                          </Button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 border-t pt-6 border-gray-200">
              {show ? (
                <div className="max-w-[477px] p-5 rounded-lg space-y-3 bg-primary-25">
                  <div className="flex items-center justify-between">
                    <Label size="sm">
                      Redeem a gift card{" "}
                      <span className="font-light">(dashes not required)</span>
                    </Label>

                    <Button
                      variant="link"
                      visual="gray"
                      onClick={() => setShow(false)}
                    >
                      Cancel
                    </Button>
                  </div>

                  <form
                    className="flex items-center gap-x-3"
                    onSubmit={handleSubmit}
                  >
                    <Controller
                      control={control}
                      name="giftCard"
                      render={({ field: { onChange, ...field } }) => (
                        <Input
                          className="flex-auto"
                          onChange={(event) => {
                            const {
                              target: { value },
                            } = event
                            onChange(formatGiftCard(value))
                          }}
                          {...field}
                          isInvalid={hookFormHasError({
                            errors: errors,
                            name: "giftCard",
                          })}
                        />
                      )}
                    />
                    <Button size="lg">Apply</Button>
                  </form>

                  <HookFormErrorMessage
                    errors={errors}
                    name="giftCard"
                    render={({ message }) => (
                      <ErrorMessage className="mt-1.5">{message}</ErrorMessage>
                    )}
                  />

                  {showGiftCard && giftCards && (
                    <Alert variant="success" className="mt-3">
                      <AlertIcon>
                        <CheckCircle className="size-5" />
                      </AlertIcon>
                      <AlertContent>
                        <AlertTitle>
                          Gift Card “{giftCards.slice(-1)}” has been applied.
                        </AlertTitle>
                      </AlertContent>
                    </Alert>
                  )}

                  {giftCards && getIsNotEmpty(giftCards) && (
                    <Accordion type="multiple" className="mt-3">
                      <AccordionItem value="item-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs leading-none text-dark-blue-400 font-light">
                            Total gift card amount{" "}
                            <span className="font-bold">$1,000</span>
                          </span>

                          <AccordionTrigger asChild>
                            <Button variant="link" visual="gray">
                              View All Gift Cards
                              <ChevronDown className="size-[15px]" />
                            </Button>
                          </AccordionTrigger>
                        </div>
                        <DisclosureContent className="pt-5">
                          {giftCards.map((giftCard, index) => (
                            <div
                              className="h-10 flex items-center justify-between border-b-[.5px] last:border-b-0 border-gray-300"
                              key={index}
                            >
                              <span className="inline-flex items-center gap-x-3">
                                <GiftCard className="size-7 shrink-0 fill-dark-blue-400" />
                                <span className="text-sm leading-none font-medium text-dark-blue-400">
                                  Gift card ending in *{giftCard.slice(0, 3)}
                                </span>
                              </span>

                              <span className="text-sm leading-none font-medium text-dark-blue-400">
                                Amount:{" "}
                                <span className="font-bold">$1,000.00</span>
                              </span>

                              <button
                                className="focus-visible:outline-none shrink-0 text-gray-400"
                                onClick={() => handleRemove(index)}
                              >
                                <Trash03 className="size-[18px]" />
                              </button>
                            </div>
                          ))}
                        </DisclosureContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                </div>
              ) : (
                <Button variant="link" size="md" onClick={() => setShow(true)}>
                  <Plus className="size-[15px]" /> Add Gift Card(s)
                </Button>
              )}
            </div>

            <div className="mt-6 border-t pt-6 border-gray-200">
              <h3 className="text-base leading-[.7] font-semibold text-dark-blue-400">
                Select payment method
              </h3>
              <Controller
                control={control}
                name="paymentMethod"
                render={({ field: { onChange, ...field } }) => (
                  <RadioGroup
                    onValueChange={onChange}
                    {...field}
                    className="mt-5 grid grid-cols-3 gap-3"
                  >
                    {(paymentMethod
                      ? PAYMENT_METHODS.filter(
                          (method) => method.value === paymentMethod
                        )
                      : PAYMENT_METHODS
                    ).map((method) => (
                      <HeadlessRadioGroupItem
                        value={method.value}
                        key={method.value}
                        className="group p-5 border relative shrink-0 border-gray-200 rounded-lg shadow-[0px_1px_4px_0px_rgba(0,0,0,.03)] hover:ring-1 hover:ring-gray-200 transition duration-300 focus-visible:outline-none"
                      >
                        <div className="absolute transition inline-flex items-center justify-center duration-300 left-2.5 top-2.5 size-5 rounded-full bg-primary-500 text-white group-hover:ring-[1.5px] group-hover:ring-primary-25 opacity-0 group-data-[state=checked]:opacity-100">
                          <Check className="size-3.5 shrink-0" />
                        </div>
                        <div className="gap-x-[3px] flex items-center justify-center [&>svg]:shrink-0">
                          {method.icons.map(({ icon }) => icon)}
                        </div>
                        <h3 className="mt-3 text-sm font-medium text-gray-800 leading-5 text-center">
                          {method.title}
                        </h3>
                        <p className="text-xs mt-1 text-gray-500 leading-none text-center">
                          {method.desc}
                        </p>
                      </HeadlessRadioGroupItem>
                    ))}
                    {paymentMethod && (
                      <HeadlessRadioGroupItem
                        value=""
                        className="group p-[25px] border relative shrink-0 border-gray-200 rounded-lg shadow-[0px_1px_4px_0px_rgba(0,0,0,.03)] hover:ring-1 hover:ring-gray-200 transition duration-300 focus-visible:outline-none"
                      >
                        <div className="flex items-center justify-center">
                          <RefreshCcw className="size-5 text-gray-500" />
                        </div>
                        <h3 className="text-sm leading-5 mt-3 font-medium text-center text-gray-800">
                          Change Payment Method{" "}
                        </h3>
                      </HeadlessRadioGroupItem>
                    )}
                  </RadioGroup>
                )}
              />
              <HookFormErrorMessage
                errors={errors}
                name="paymentMethod"
                render={({ message }) => (
                  <ErrorMessage className="mt-1.5">{message}</ErrorMessage>
                )}
              />
            </div>

            {paymentMethod === "item-2" && (
              <div className="mt-[50px]">
                <div className="flex justify-between items-end">
                  <div className="space-y-3">
                    <h1 className="text-lg font-bold text-dark-blue-400 leading-none">
                      Wire transfer details
                    </h1>
                    <p className="text-xs text-gray-500 leading-none">
                      Please follow the instructions below in order to complete
                      your wire transfer
                    </p>
                  </div>

                  <Button variant="outlined" visual="gray">
                    <Download02 className="size-[15px]" /> Download Invoice
                  </Button>
                </div>

                <div className="mt-6 border border-gray-200 shadow-[0px_1px_4px_0px_rgba(0,0,0,.03)] bg-white rounded-lg">
                  <Tabs defaultValue="Domestic Transfer">
                    <TabsList className="justify-start w-full">
                      <TabsTrigger value="Domestic Transfer">
                        Domestic Transfer
                      </TabsTrigger>
                      <TabsTrigger value="International Transfer">
                        International Transfer
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="py-4 px-6 border-b border-gray-200">
                    <span className="text-gray-950 text-sm">
                      Domestic wire transfers will take 24 - 48 hours to
                      receive.
                    </span>
                  </div>

                  <Table>
                    <TableBody className="[&_tr:last-child]:rounded-b-lg [&_td]:[&_tr:last-child]:rounded-b-lg">
                      <TableRow className="odd:bg-gray-25 even:bg-white hover:even:bg-white hover:odd:bg-gray-25 border-gray-200">
                        <TableCell className="py-4 border-r border-gray-200 px-6 whitespace-nowrap">
                          Account Number:
                        </TableCell>
                        <TableCell className="font-semibold py-4 px-6 whitespace-nowrap text-gray-950">
                          712000528
                        </TableCell>
                      </TableRow>
                      <TableRow className="odd:bg-gray-25 even:bg-white hover:even:bg-white hover:odd:bg-gray-25 border-gray-200">
                        <TableCell className="py-4 border-r border-gray-200 px-6 whitespace-nowrap">
                          Routing Number:
                        </TableCell>
                        <TableCell className="font-semibold py-4 px-6 whitespace-nowrap text-gray-950">
                          111000523
                        </TableCell>
                      </TableRow>
                      <TableRow className="odd:bg-gray-25 even:bg-white hover:even:bg-white hover:odd:bg-gray-25 border-gray-200">
                        <TableCell className="py-4 border-r border-gray-200 px-6 whitespace-nowrap">
                          Account Name:
                        </TableCell>
                        <TableCell className="font-semibold py-4 px-6 whitespace-nowrap text-gray-950">
                          Marketeq Digital Inc.
                        </TableCell>
                      </TableRow>
                      <TableRow className="odd:bg-gray-25 even:bg-white hover:even:bg-white hover:odd:bg-gray-25 border-gray-200">
                        <TableCell className="py-4 border-r border-gray-200 px-6 whitespace-nowrap">
                          Bank Name:
                        </TableCell>
                        <TableCell className="font-semibold py-4 px-6 whitespace-nowrap text-gray-950">
                          JP Morgan Chase & Co.
                        </TableCell>
                      </TableRow>
                      <TableRow className="odd:bg-gray-25 even:bg-white hover:even:bg-white hover:odd:bg-gray-25 border-gray-200">
                        <TableCell className="py-4  border-r border-gray-200 px-6 whitespace-nowrap">
                          Bank Address:
                        </TableCell>
                        <TableCell className="font-semibold py-4 px-6 whitespace-nowrap text-gray-950">
                          111 Wall Street New York, New York 10043, United
                          States
                        </TableCell>
                      </TableRow>
                      <TableRow className="odd:bg-gray-25 even:bg-white hover:even:bg-white hover:odd:bg-gray-25 border-gray-200">
                        <TableCell className="py-4 border-r border-gray-200 px-6 whitespace-nowrap">
                          Remark:
                        </TableCell>
                        <TableCell className="font-semibold py-4 px-6 whitespace-nowrap text-gray-950">
                          #22602731500102292{" "}
                          <div className="inline-flex items-center gap-x-2">
                            <ArrowLeft className="size-4 text-gray-500" />
                            <span className="text-sm  whitespace-nowrap text-gray-500">
                              Please attach this order number
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {paymentMethod === "item-2" && (
              <div className="mt-[50px]">
                <div className="flex justify-between items-end">
                  <h1 className="text-lg font-bold text-dark-blue-400 leading-none">
                    Steps to complete your wire transfer
                  </h1>

                  <Button variant="outlined" visual="gray">
                    <Download02 className="size-[15px]" /> Download Instructions
                  </Button>
                </div>

                <div className="mt-8">
                  <div className="pl-2.5 [&_span]:data-[data-part=line]">
                    <div className="gap-x-6 pb-[25px] relative flex items-start">
                      <div className="inline-block">
                        <div className="size-8 rounded-full shrink-0 border border-primary-500 text-primary-500 text-sm leading-none font-semibold inline-flex items-center justify-center">
                          1
                        </div>
                        <span
                          data-part="line"
                          className="block w-0.5 absolute bottom-[5px] top-[37px] left-[15px] bg-gray-200"
                        />
                      </div>

                      <div className="flex-auto space-y-2 pt-[7px]">
                        <h3 className="text-sm text-dark-blue-400 leading-[18px]">
                          Select your preferred transfer method (Domestic or
                          International).
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="pl-2.5 data-[part=line]:[&_span]:last:hidden">
                    <div className="gap-x-6 pb-[25px] relative flex items-start">
                      <div className="inline-block">
                        <div className="size-8 rounded-full shrink-0 border border-primary-500 text-primary-500 text-sm leading-none font-semibold inline-flex items-center justify-center">
                          2
                        </div>

                        <span
                          data-part="line"
                          className="block w-0.5 absolute bottom-[5px] top-[37px] left-[15px] bg-gray-200"
                        />
                      </div>

                      <div className="flex-auto space-y-2">
                        <h3 className="text-sm text-dark-blue-400 leading-[18px]">
                          Download and attach your invoice and proceed with your
                          payment using the bank account details provided.
                        </h3>
                        <h3 className="text-sm text-dark-blue-400 leading-[18px]">
                          <span className="font-semibold">NOTE:</span> Please
                          mention your{" "}
                          <span className="font-semibold">project title</span>{" "}
                          and{" "}
                          <span className="font-semibold">order number</span> in
                          the reference area to help us identify your payment
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className="pl-2.5 data-[part=line]:[&_span]:last:hidden">
                    <div className="gap-x-6 pb-[25px] relative flex items-start">
                      <div className="inline-block">
                        <div className="size-8 rounded-full shrink-0 border border-primary-500 text-primary-500 text-sm leading-none font-semibold inline-flex items-center justify-center">
                          3
                        </div>
                        <span
                          data-part="line"
                          className="block w-0.5 absolute bottom-[5px] top-[37px] left-[15px] bg-gray-200"
                        />
                      </div>

                      <div className="flex-auto space-y-2">
                        <h3 className="text-sm text-dark-blue-400 leading-[18px]">
                          Upload the payment receipt or proof of your
                          transaction. This helps us process your payment faster
                          and keep everything on track.
                        </h3>
                        <h3 className="text-sm text-dark-blue-400 leading-[18px]">
                          <span className="font-semibold">NOTE:</span> You will
                          able to upload your wire transfer receipt after you
                          submit your order.
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "item-2" && (
              <div className="mt-[26px]">
                <div className="flex items-center gap-x-2">
                  <Button variant="outlined" visual="gray">
                    Cancel
                  </Button>
                  <Button className="bg-primary-50 text-primary-500 hover:bg-primary-500 hover:text-white">
                    Save Payment Method
                  </Button>
                </div>
                <div className="mt-3.5">
                  <span className="text-xs font-light text-dark-blue-400">
                    By adding sending your wire transfer, you agree to
                    Marketeq’s{" "}
                    <Button variant="link">Terms and Conditions</Button>
                  </span>
                </div>
              </div>
            )}

            {paymentMethod === "item-1" && (
              <div className="mt-[50px]">
                <div className="px-[55.25px] flex items-end pb-5 gap-x-[22.55px]">
                  <div className="h-[95.88px] shrink-0 relative w-[198.92px]">
                    <NextImage
                      className="object-contain"
                      src="/connect-bank-account.png"
                      alt="Connect Bank Account"
                      fill
                      sizes="25vw"
                    />
                  </div>
                  <h1 className="text-[26.62px] leading-[1.2] text-gray-950">
                    Marketeq uses <span className="font-bold">Plaid</span> to
                    connect your bank account
                  </h1>
                </div>

                <div className="py-[50px] px-[75px] rounded-xl border-2 border-gray-200 bg-white grid grid-cols-2 gap-x-[60px] items-center">
                  <div className="space-y-[30px]">
                    <div className="flex items-start gap-x-2.5">
                      <Zap className="size-[14.77px] shrink-0 text-gray-950" />
                      <div className="flex-auto">
                        <h3 className="text-[13px] leading-none font-semibold text-gray-950">
                          Connect in seconds
                        </h3>
                        <p className="mt-2 text-[13px] leading-none font-light text-gray-950">
                          8000+ apps trust Plaid to quickly connect to financial
                          institutions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-x-2.5">
                      <ShieldTick className="size-[14.77px] shrink-0 text-gray-950" />
                      <div className="flex-auto">
                        <h3 className="text-[13px] leading-none font-semibold text-gray-950">
                          Keep your data safe
                        </h3>
                        <p className="mt-2 text-[13px] leading-none font-light text-gray-950">
                          Plaid uses best-in-class encryption to help protect
                          your data
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <Button className="h-[56.24px] bg-black border-[0.75px] gap-x-3 border-gray-300 px-8 text-[17.62px] leading-[20.88px] font-semibold">
                      Connect my account{" "}
                      <LinkExternal01 className="size-[18px]" />
                    </Button>

                    <div>
                      <span className="inline-block text-[11px] leading-[1.5] font-light text-gray-950">
                        By continuing, you agree to Plaid’s{" "}
                        <span className="underline inline-block">
                          Privacy Policy
                        </span>{" "}
                        and to receiving updates on plaid.com
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-[50px] flex items-center gap-x-[9px]">
                  <span className="inline-block flex-auto h-px bg-[#E1E6EA]" />
                  <span className="text-xs font-medium text-[#939DA7] leading-5">
                    Or
                  </span>
                  <span className="inline-block flex-auto h-px bg-[#E1E6EA]" />
                </div>
              </div>
            )}

            {paymentMethod === "item-1" && (
              <div className="mt-[50px]">
                <h1 className="text-lg leading-none font-bold text-dark-blue-400">
                  Add your bank account Manually
                </h1>

                <div className="mt-6 space-y-3">
                  <div className="space-y-1.5">
                    <Label size="sm" htmlFor="account-type">
                      Account Type
                    </Label>

                    <Input
                      id="account-type"
                      type="Select"
                      placeholder="0000-0000-0000-0000"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label size="sm" htmlFor="account-holder-name">
                      Account Holder Name
                    </Label>

                    <Input
                      id="account-holder-name"
                      type="text"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label size="sm" htmlFor="bank-routing-number">
                      Bank Routing Number
                    </Label>

                    <Input
                      id="bank-routing-number"
                      type="text"
                      placeholder="xxxx-xxxx-xx"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-x-3">
                    <div className="space-y-1.5">
                      <Label size="sm" htmlFor="account-number">
                        Account Number
                      </Label>
                      <Input
                        id="account-number"
                        type="text"
                        placeholder="Up to 17 digits"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label size="sm" htmlFor="re-enter-account-number">
                        Re-Enter Account Number
                      </Label>

                      <Input
                        id="re-enter-account-number"
                        type="text"
                        placeholder="Up to 17 digits"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-[22px] flex items-center gap-x-3">
                  <Checkbox size="md" id="save-default-payment-method" />

                  <Label size="sm" htmlFor="save-default-payment-method">
                    Save as default payment method
                  </Label>
                </div>

                <div className="mt-[50px]">
                  <div className="flex items-center justify-end gap-x-2">
                    <Button variant="outlined" visual="gray">
                      Cancel
                    </Button>
                    <Button className="bg-primary-50 text-primary-500 hover:bg-primary-500 hover:text-white">
                      Save account
                    </Button>
                  </div>
                  <div className="mt-3.5 flex items-center justify-end">
                    <span className="text-xs font-light text-dark-blue-400">
                      By adding sending your wire transfer, you agree to
                      Marketeq’s{" "}
                      <Button variant="link">Terms and Conditions</Button>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "item-0" && (
              <div className="mt-[50px]">
                <h1 className="text-lg leading-none font-bold text-dark-blue-400">
                  Add your credit / debit card
                </h1>
                <p className="mt-3 text-gray-500 text-xs leading-none flex items-center gap-x-1">
                  <Lock className="size-4" /> Your payment is secure. Your card
                  details will not be shared.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="space-y-1.5">
                    <Label size="sm" htmlFor="card-number">
                      Card number
                    </Label>
                    <InputGroup>
                      <Controller
                        control={control}
                        name="cardNumber"
                        render={({ field: { onChange, ...field } }) => (
                          <Input
                            className="pl-[52px]"
                            id="card-number"
                            onChange={(event) => {
                              const {
                                target: { value },
                              } = event
                              onChange(formatCardNumber(value))
                            }}
                            {...field}
                            isInvalid={hookFormHasError({
                              errors: errors,
                              name: "cardNumber",
                            })}
                            type="text"
                            placeholder="0000-0000-0000-0000"
                          />
                        )}
                      />
                      <InputLeftElement className="w-[52px]">
                        <MastercardDefault />
                      </InputLeftElement>
                    </InputGroup>
                    <HookFormErrorMessage
                      errors={errors}
                      name="cardNumber"
                      render={({ message }) => (
                        <ErrorMessage>{message}</ErrorMessage>
                      )}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label size="sm" htmlFor="name-on-card">
                      Name on card
                    </Label>

                    <Input
                      id="name-on-card"
                      {...register("nameOnCard")}
                      isInvalid={hookFormHasError({
                        errors: errors,
                        name: "nameOnCard",
                      })}
                      type="text"
                      placeholder="John Doe"
                    />

                    <HookFormErrorMessage
                      errors={errors}
                      name="nameOnCard"
                      render={({ message }) => (
                        <ErrorMessage>{message}</ErrorMessage>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-x-3">
                    <div className="space-y-1.5">
                      <Label size="sm" htmlFor="expiration-date">
                        Expiration Date
                      </Label>
                      <Input
                        id="expiration-date"
                        type="text"
                        placeholder="MM/YY"
                        {...register("expirationDate")}
                        isInvalid={hookFormHasError({
                          errors: errors,
                          name: "expirationDate",
                        })}
                      />
                      <HookFormErrorMessage
                        errors={errors}
                        name="expirationDate"
                        render={({ message }) => (
                          <ErrorMessage>{message}</ErrorMessage>
                        )}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label size="sm" htmlFor="cvv-cvc">
                        CVV / CVC
                      </Label>
                      <InputGroup>
                        <Input
                          id="cvv-cvc"
                          type="text"
                          placeholder="3 or 4 digits"
                          {...register("cvvOrCvc")}
                          isInvalid={hookFormHasError({
                            errors: errors,
                            name: "cvvOrCvc",
                          })}
                        />
                        <InputRightElement>
                          <TooltipProvider delayDuration={75}>
                            <Tooltip>
                              <TooltipTrigger className="focus-visible:outline-none">
                                <HelpCircle className="text-gray-500 h-4 w-4" />
                              </TooltipTrigger>
                              <TooltipContent
                                className="max-w-[139px]"
                                visual="gray"
                              >
                                3-4 digit code on the back of your card
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </InputRightElement>
                      </InputGroup>
                      <HookFormErrorMessage
                        errors={errors}
                        name="cvvOrCvc"
                        render={({ message }) => (
                          <ErrorMessage>{message}</ErrorMessage>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-[22px] flex items-center gap-x-3">
                  <Controller
                    control={control}
                    name="saveDefaultPaymentMethod"
                    render={({ field: { onChange, value, ...field } }) => (
                      <Checkbox
                        size="md"
                        id="save-default-payment-method"
                        onCheckedChange={onChange}
                        checked={value}
                        {...field}
                      />
                    )}
                  />
                  <Label size="sm" htmlFor="save-default-payment-method">
                    Save as default payment method
                  </Label>
                </div>
              </div>
            )}

            {paymentMethod === "item-0" && layout === "selection" && (
              <div className="mt-[50px]">
                <h3 className="text-lg leading-none font-bold text-dark-blue-400">
                  Billing Address
                </h3>

                <p className="mt-3 text-xs leading-none text-gray-500">
                  Please choose a billing address from your address book below,
                  or{" "}
                  <Button
                    className="text-xs leading-none"
                    variant="link"
                    type="button"
                    onClick={() => setLayout("form")}
                  >
                    add a new billing address
                  </Button>
                </p>

                <Controller
                  name="billingAddress"
                  control={control}
                  render={({ field: { onChange } }) => (
                    <RadioGroup
                      className="mt-6"
                      onValueChange={(value) => {
                        onChange(billingAddresses?.[parseInt(value)])
                      }}
                    >
                      {billingAddresses?.map((billingAddress, index) => (
                        <RadioGroupItemSelector
                          className="min-h-[42px] bg-transparent border-0 hover:ring-2 hover:ring-gray-300 data-[state=checked]:ring-2 focus:ring-2 focus:ring-primary-400 data-[state=checked]:ring-primary-400"
                          value={`${index}`}
                          key={index}
                        >
                          <Label className="font-normal" size="sm">
                            <span className="font-bold">
                              {billingAddress.fullName}
                            </span>
                            , {billingAddress.addressLine1},{" "}
                            {billingAddress.phoneNumber}
                          </Label>
                        </RadioGroupItemSelector>
                      ))}
                    </RadioGroup>
                  )}
                />

                <div className="mt-6 flex items-center gap-x-3">
                  <Button
                    className="text-xs leading-6 text-primary-500 bg-primary-50 hover:text-white hover:bg-primary-500"
                    onClick={onUseAddress}
                    disabled={!billingAddress}
                  >
                    Use This Address
                  </Button>
                  <Button
                    className="text-xs leading-6"
                    variant="outlined"
                    visual="gray"
                    type="button"
                    onClick={() => setLayout("form")}
                  >
                    <Plus className="size-[15px]" />
                    New Address
                  </Button>
                </div>
              </div>
            )}

            {paymentMethod === "item-0" && layout === "form" && (
              <form
                className="mt-[50px]"
                onSubmit={form.handleSubmit(handleOnSubmit)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-none font-bold text-dark-blue-400">
                    Billing Address
                  </h3>

                  {Boolean(billingAddresses?.length) && (
                    <Button
                      onClick={() => setLayout("selection")}
                      className="text-xs underline"
                      variant="link"
                      type="button"
                    >
                      Use a saved address
                    </Button>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="space-y-1.5">
                    <Label size="sm" htmlFor="full-name">
                      Full Name
                    </Label>
                    <Input
                      placeholder="John Doe"
                      id="full-name"
                      {...form.register("fullName")}
                      isInvalid={hookFormHasError({
                        errors: form.formState.errors,
                        name: "fullName",
                      })}
                    />
                    <HookFormErrorMessage
                      errors={form.formState.errors}
                      name="fullName"
                      render={({ message }) => (
                        <ErrorMessage>{message}</ErrorMessage>
                      )}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label size="sm" htmlFor="address-line-1">
                      Address Line 1
                    </Label>
                    <Input
                      placeholder="Street Address or P.O. Box"
                      id="address-line-1"
                      {...form.register("addressLine1")}
                      isInvalid={hookFormHasError({
                        errors: form.formState.errors,
                        name: "addressLine1",
                      })}
                    />
                    <HookFormErrorMessage
                      errors={form.formState.errors}
                      name="addressLine1"
                      render={({ message }) => (
                        <ErrorMessage>{message}</ErrorMessage>
                      )}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label size="sm" htmlFor="address-line-2">
                      Address Line 2
                    </Label>
                    <Input
                      placeholder="Apt, Suite, Unit, or Building #"
                      id="address-line-2"
                      {...form.register("addressLine2")}
                      isInvalid={hookFormHasError({
                        errors: form.formState.errors,
                        name: "addressLine2",
                      })}
                    />
                    <HookFormErrorMessage
                      errors={form.formState.errors}
                      name="addressLine2"
                      render={({ message }) => (
                        <ErrorMessage>{message}</ErrorMessage>
                      )}
                    />
                  </div>

                  <div className="gap-x-3 grid grid-cols-3">
                    <div className="space-y-1.5">
                      <Label size="sm" htmlFor="city">
                        City
                      </Label>
                      <Input
                        placeholder="Marketown"
                        id="city"
                        {...form.register("city")}
                        isInvalid={hookFormHasError({
                          errors: form.formState.errors,
                          name: "city",
                        })}
                      />
                      <HookFormErrorMessage
                        errors={form.formState.errors}
                        name="city"
                        render={({ message }) => (
                          <ErrorMessage>{message}</ErrorMessage>
                        )}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label size="sm" htmlFor="state">
                        State
                      </Label>
                      <Controller
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <Listbox {...field}>
                            <ListboxButton placeholder="Select" />
                            <ListboxOptions>
                              {[
                                "New York",
                                "Florida",
                                "Alaska",
                                "Arizona",
                                "Georgia",
                                "Hawaii",
                              ].map((state) => (
                                <ListboxOption key={state} value={state}>
                                  {state}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </Listbox>
                        )}
                      />
                      <HookFormErrorMessage
                        errors={form.formState.errors}
                        name="state"
                        render={({ message }) => (
                          <ErrorMessage>{message}</ErrorMessage>
                        )}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label size="sm" htmlFor="zipcode">
                        Zipcode
                      </Label>
                      <Input
                        placeholder="12345"
                        id="zipcode"
                        {...form.register("zipcode")}
                        isInvalid={hookFormHasError({
                          errors: form.formState.errors,
                          name: "zipcode",
                        })}
                      />
                      <HookFormErrorMessage
                        errors={form.formState.errors}
                        name="zipcode"
                        render={({ message }) => (
                          <ErrorMessage>{message}</ErrorMessage>
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label size="sm" htmlFor="phone-number">
                      Phone number
                    </Label>
                    <Controller
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => <PhoneNumberInput {...field} />}
                    />
                    <HookFormErrorMessage
                      errors={form.formState.errors}
                      name="phoneNumber"
                      render={({ message }) => (
                        <ErrorMessage>{message}</ErrorMessage>
                      )}
                    />
                  </div>
                </div>

                <div className="flex mt-[50px] justify-end">
                  <Button>Save Card</Button>
                </div>
              </form>
            )}

            {paymentMethod === "item-0" &&
              layout === "default" &&
              billingAddress && (
                <>
                  <div className="mt-[50px]">
                    <h3 className="text-lg leading-none font-bold text-dark-blue-400">
                      Billing Address
                    </h3>

                    <div className="mt-6 p-6 rounded-[7px] pt-[35px] border-2 flex items-center justify-between border-gray-200 bg-white">
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold leading-5 text-dark-blue-400">
                          {billingAddress.fullName}
                        </h3>

                        <ul className="max-w-[211px]">
                          <li className="text-base leading-5 text-dark-blue-400">
                            {billingAddress.addressLine1}
                          </li>
                          <li className="text-base leading-5 text-dark-blue-400">
                            {phoneUtil.formatOutOfCountryCallingNumber(
                              phoneUtil.parseAndKeepRawInput(
                                billingAddress.phoneNumber
                              )
                            )}
                          </li>
                        </ul>
                      </div>

                      <Button
                        visual="gray"
                        variant="outlined"
                        onClick={() => setLayout("selection")}
                      >
                        Change Address
                      </Button>
                    </div>
                  </div>

                  <div className="flex mt-[50px] justify-end">
                    <Button className="text-primary-500 bg-primary-50 hover:bg-primary-500 hover:text-white">
                      Save Card
                    </Button>
                  </div>
                </>
              )}
          </div>
          <div className="w-[305px] shrink-0 p-5 rounded-lg bg-white border border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
            <h1 className="text-base font-semibold leading-none text-dark-blue-400">
              Project Details
            </h1>

            <div className="mt-4 space-y-4 pb-4 border-b border-gray-200">
              <div className="relative h-[92px] rounded-md overflow-hidden">
                <NextImage
                  className="object-cover"
                  src="/dashboard.png"
                  alt="Dashboard"
                  sizes="50vw"
                  fill
                />
              </div>

              <h3 className="text-sm font-medium text-dark-blue-400 leading-[18px]">
                Marketeq Client Portal - Redesigning and Optimizing Website for
                Enhanced User Experience.
              </h3>

              <div className="flex items-center gap-x-2 ">
                <UserGroup className="size-[15px]" />
                <span className="inline-block text-xs leading-5 font-semibold text-primary-500">
                  8 team members
                </span>
              </div>

              <div className="flex items-end justify-between">
                <div className="space-y-1">
                  <h3 className="text-[10px] leading-none text-dark-blue-400 font-light">
                    Total Duration
                  </h3>
                  <h1 className="text-xs font-semibold leading-none text-dark-blue-400">
                    Jan 2025 - Aug 2025
                  </h1>
                </div>

                <Badge size="sm" visual="primary">
                  8 months
                </Badge>
              </div>
            </div>

            <div className="mt-5 pb-4 border-b border-gray-200">
              <h1 className="text-base leading-none font-semibold text-dark-blue-400">
                Price Details
              </h1>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="inline-block text-xs leading-none text-dark-blue-400 font-light">
                    Project cost
                  </span>
                  <span className="inline-block text-xs leading-none text-dark-blue-400 font-light">
                    $94,000
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-block text-xs leading-none text-dark-blue-400 font-light">
                    Project cost
                  </span>
                  <span className="inline-block text-xs leading-none text-dark-blue-400 font-light">
                    $94,000
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-block text-xs leading-none text-dark-blue-400 font-light">
                    Project cost
                  </span>
                  <span className="inline-block text-xs leading-none text-dark-blue-400 font-light">
                    $94,000
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="inline-block text-xs leading-none text-dark-blue-400 font-light">
                  Total amount to be paid
                </span>
                <h1 className="inline-block text-base font-bold leading-none text-dark-blue-400">
                  $94,000
                </h1>
              </div>

              <div className="grid mt-5">
                <Button>Submit Order</Button>
              </div>

              <div className="mt-5">
                <span className="inline-block text-center text-[10px] font-light text-dark-blue-400 leading-[14px]">
                  By clicking the above, you agree to Marketeq’s{" "}
                  <Button
                    className="text-[10px] leading-[14px] underline"
                    variant="link"
                  >
                    Terms of Use
                  </Button>{" "}
                  and{" "}
                  <Button
                    className="text-[10px] leading-[14px] underline"
                    variant="link"
                  >
                    Privacy Policy
                  </Button>{" "}
                </span>
              </div>

              <div className="mt-5 flex items-center justify-center">
                <Button variant="link" visual="gray">
                  Add Gift Card / Promo Code
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const RemoveTeamMember = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-y-2">
            <DialogTitle>Remove Team Member?</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove Charlie (UX Researcher) from the
              team?
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button variant="outlined" visual="gray">
              Cancel
            </Button>
          </DialogClose>
          <Button visual="error">Yes, Remove</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const EditScope = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-y-2">
            <DialogTitle>
              Are you sure you want to leave checkout to edit the scope?
            </DialogTitle>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button variant="outlined" visual="gray">
              Edit Scope
            </Button>
          </DialogClose>
          <Button>Continue Checkout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const AddTask = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-y-2">
            <DialogTitle>
              Are you sure you want to leave checkout to edit the scope?
            </DialogTitle>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button variant="outlined" visual="gray">
              Add Task
            </Button>
          </DialogClose>
          <Button>Continue Checkout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const EditTeam = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-y-2">
            <DialogTitle>
              Are you sure you want to leave checkout to edit the team?
            </DialogTitle>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button variant="outlined" visual="gray">
              Edit Team
            </Button>
          </DialogClose>
          <Button>Continue Checkout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export const ReplaceTeamMember = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[558px]">
        <DialogHeader>
          <div className="flex items-center justify-between gap-y-2">
            <DialogTitle>Replace Team Member</DialogTitle>
            <DialogClose>
              <IconButton visual="gray" variant="ghost">
                <X className="size-5" />
              </IconButton>
            </DialogClose>
          </div>

          <div className="border-2 mt-5 border-gray-300 bg-gray-50 rounded-lg h-[72px] flex">
            <div className="flex items-center first:pl-6 last:pr-6 pr-3 pl-3 py-4 flex-auto">
              <span className="inline-flex items-start gap-x-2">
                <Avatar size="sm">
                  <AvatarImage src="/man.jpg" alt="Man" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>

                <span className="inline-flex flex-col">
                  <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                    Vivek
                  </span>
                  <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                    @topdesigner321
                  </span>
                </span>
              </span>
            </div>
            <div className="flex items-center first:pl-6 last:pr-6 pr-3 pl-3 py-4 flex-auto">
              <Dropdown defaultValue="Junior" />
            </div>
            <div className="flex items-center first:pl-6 last:pr-6 pr-3 pl-3 py-4 flex-auto">
              <CountriesCombobox
                triggerClassName="group border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed data-[state=open]:bg-gray-100 hover:border-gray-300 hover:border-dashed bg-white hover:bg-gray-100 border-solid"
                defaultValue="United States"
              />
            </div>
            <div className="flex items-center first:pl-6 last:pr-6 pr-3 pl-3 py-4 flex-auto">
              <span className="whitespace-nowrap inline-block text-sm leading-5 text-gray-600">
                $500/hr
              </span>
            </div>
          </div>

          <div className="mt-5">
            <h1 className="text-sm leading-5 font-semibold text-dark-blue-400">
              Select a new team member to replace @topdesign241
            </h1>

            <Tabs
              defaultValue="All"
              className="mt-3 bg-white border border-gray-200 rounded-lg shadow-[0px_1px_4px_0px_rgba(0,0,0,.03)] overflow-hidden"
            >
              <TabsList className="flex justify-between items-center">
                <div className="flex items-end gap-x-4">
                  <TabsTrigger value="All">All</TabsTrigger>
                  <TabsTrigger value="Favorites">
                    <Star className="shrink-0 size-[18px]" />
                    Favorites
                  </TabsTrigger>
                  <TabsTrigger value="Talent Network">
                    <Globe className="shrink-0 size-[18px]" />
                    Talent Network
                  </TabsTrigger>
                </div>

                <button className="focus-visible:outline-none relative -translate-y-1.5">
                  <Search className="size-4 shrink-0 text-gray-400" />
                </button>
              </TabsList>

              <TabsContent value="All">
                <Table>
                  <TableHeader className="bg-gray-50 [&_tr]:border-t-0">
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="bg-white text-dark-blue-400 hover:text-dark-blue-400 pr-3 pl-3 first:pl-6 last:pr-6">
                        <span className="inline-flex items-center gap-x-1">
                          Name <ArrowDown className="size-[15px]" />
                        </span>
                      </TableHead>
                      <TableHead className="bg-white text-dark-blue-400 hover:text-dark-blue-400 pr-3 pl-3 first:pl-6 last:pr-6">
                        Experience
                      </TableHead>
                      <TableHead className="bg-white text-dark-blue-400 hover:text-dark-blue-400 pr-3 pl-3 first:pl-6 last:pr-6">
                        Location
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-white">
                      <TableCell className="py-4 px-6">
                        <span className="inline-flex items-start gap-x-2">
                          <Avatar size="sm">
                            <AvatarImage src="/man.jpg" alt="Man" />
                            <AvatarFallback>M</AvatarFallback>
                          </Avatar>

                          <span className="inline-flex flex-col">
                            <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                              Vivek
                            </span>
                            <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                              @topdesigner321
                            </span>
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <Dropdown defaultValue="Junior" />
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <CountriesCombobox
                          triggerClassName="group border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed data-[state=open]:bg-gray-100 hover:border-gray-300 hover:border-dashed bg-white hover:bg-gray-100 border-solid"
                          defaultValue="United States"
                        />
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="whitespace-nowrap inline-block text-sm leading-5 text-gray-600">
                          $500/hr
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-white">
                      <TableCell className="py-4 px-6">
                        <span className="inline-flex items-start gap-x-2">
                          <Avatar size="sm">
                            <AvatarImage src="/man.jpg" alt="Man" />
                            <AvatarFallback>M</AvatarFallback>
                          </Avatar>

                          <span className="inline-flex flex-col">
                            <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                              Vivek
                            </span>
                            <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                              @topdesigner321
                            </span>
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <Dropdown defaultValue="Junior" />
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <CountriesCombobox
                          triggerClassName="group border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed data-[state=open]:bg-gray-100 hover:border-gray-300 hover:border-dashed bg-white hover:bg-gray-100 border-solid"
                          defaultValue="United States"
                        />
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="whitespace-nowrap inline-block text-sm leading-5 text-gray-600">
                          $500/hr
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-white">
                      <TableCell className="py-4 px-6">
                        <span className="inline-flex items-start gap-x-2">
                          <Avatar size="sm">
                            <AvatarImage src="/man.jpg" alt="Man" />
                            <AvatarFallback>M</AvatarFallback>
                          </Avatar>

                          <span className="inline-flex flex-col">
                            <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                              Vivek
                            </span>
                            <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                              @topdesigner321
                            </span>
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <Dropdown defaultValue="Junior" />
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <CountriesCombobox
                          triggerClassName="group border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed data-[state=open]:bg-gray-100 hover:border-gray-300 hover:border-dashed bg-white hover:bg-gray-100 border-solid"
                          defaultValue="United States"
                        />
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="whitespace-nowrap inline-block text-sm leading-5 text-gray-600">
                          $500/hr
                        </span>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-white">
                      <TableCell className="py-4 px-6">
                        <span className="inline-flex items-start gap-x-2">
                          <Avatar size="sm">
                            <AvatarImage src="/man.jpg" alt="Man" />
                            <AvatarFallback>M</AvatarFallback>
                          </Avatar>

                          <span className="inline-flex flex-col">
                            <span className="text-xs text-nowrap leading-[16.26px] font-semibold text-dark-blue-400">
                              Vivek
                            </span>
                            <span className="text-xs text-nowrap leading-[16.26px] font-extralight text-dark-blue-400">
                              @topdesigner321
                            </span>
                          </span>
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <Dropdown defaultValue="Junior" />
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <CountriesCombobox
                          triggerClassName="group border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed data-[state=open]:bg-gray-100 hover:border-gray-300 hover:border-dashed bg-white hover:bg-gray-100 border-solid"
                          defaultValue="United States"
                        />
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        <span className="whitespace-nowrap inline-block text-sm leading-5 text-gray-600">
                          $500/hr
                        </span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-8 flex justify-end gap-x-3">
          <DialogClose asChild>
            <Button variant="outlined" visual="gray">
              Cancel
            </Button>
          </DialogClose>
          <Button>Replace</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
