import React, { useEffect, useRef, useState } from "react"
import { getComputedStyle } from "@/utils/dom-utils"
import { cn } from "@/utils/functions"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BarChart2,
  Bell,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  CoinStack,
  File,
  FileText,
  LifeBuoy,
  LogOut,
  MapPin,
  MarkerPin02,
  MessageSquare01,
  MessageSquare02,
  MessageTextSquare01,
  Monitor,
  Plus,
  Plus2,
  Repeat,
  Search,
  SearchMd,
  Settings,
  Share,
  Star,
  ThumbsDown,
  ThumbsUp,
  Users,
  X,
  XCircle,
} from "@blend-metrics/icons"
import { AdobeBrand, WordpressBrand } from "@blend-metrics/icons/brands"
import { GoogleDefault } from "@blend-metrics/icons/social"
import {
  FacebookSolid,
  InstagramSolid,
  TwitterSolid,
} from "@blend-metrics/icons/social-solid"
import * as RadixTabs from "@radix-ui/react-tabs"
import { TooltipArrow } from "@radix-ui/react-tooltip"
import { Meta } from "@storybook/react"
import { TbStar, TbStarHalfFilled } from "react-icons/tb"
import { useToggle } from "react-use"
import {
  Campaigns,
  LinkedinSolid,
  Logo3,
  Project,
  Talent,
} from "@/components/icons"
import { Adobe } from "@/components/icons/adobe"
import { Arrow } from "@/components/icons/arrow"
import { Dropbox } from "@/components/icons/dropbox"
import { Microsoft } from "@/components/icons/microsoft"
import { Nasdaq } from "@/components/icons/nasdaq"
import { InviteWindowTrigger } from "@/components/invite-window"
import NextImage from "@/components/next-image"
import NextLink from "@/components/next-link"
import { ShowMoreLess } from "@/components/show-more-less"
import { ThreeHorizontalLines } from "@/components/three-horizontal-lines"
import { ThumbsDownToggle } from "@/components/thumbs-down"
import { ThumbsUpToggle } from "@/components/thumbs-up"
import {
  Avatar,
  AvatarFallback,
  AvatarFallbackIcon,
  AvatarGroup,
  AvatarImage,
  Badge,
  Button,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxTrigger,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioTrigger,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Favorite,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Progress,
  RatingGroupContext,
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemContext,
  RatingGroupLabel,
  RatingGroupRoot,
  ScaleOutIn,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  buttonVariants,
  tabsListVariants,
  useCarousel,
} from "@/components/ui"
import { DropdownMenuCheckItem, ScrollBar } from "@/components/ui"

const meta: Meta = {
  title: "Talent Profile",
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

const Footer = () => {
  return (
    <footer className="bg-white px-5 md:px-10 lg:px-[100px] pt-10 lg:pt-[50px] xl:px-[150px] 2xl:px-[250px]">
      <div className="flex gap-y-10 md:gap-y-20 lg:gap-x-[100px] lg:flex-row flex-col lg:items-start">
        <div className="flex-auto grid grid-cols-2 gap-y-10 md:flex items-start md:justify-between">
          <div className="flex flex-col gap-y-[15px]">
            <span className="inline-block text-sm leading-[16.94px] font-medium text-dark-blue-600">
              About
            </span>
            <ul className="space-y-[15px]">
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Why Marketeq?
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Careers
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Partnerships
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Support
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Core Values
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Events
                </NextLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-y-[15px]">
            <span className="inline-block text-sm leading-[16.94px] font-medium text-dark-blue-600">
              About
            </span>
            <ul className="space-y-[15px]">
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Why Marketeq?
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Careers
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Partnerships
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Support
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Core Values
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Events
                </NextLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-y-[15px]">
            <span className="inline-block text-sm leading-[16.94px] font-medium text-dark-blue-600">
              About
            </span>
            <ul className="space-y-[15px]">
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Why Marketeq?
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Careers
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Partnerships
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Support
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Core Values
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Events
                </NextLink>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-y-[15px]">
            <span className="inline-block text-sm leading-[16.94px] font-medium text-dark-blue-600">
              About
            </span>
            <ul className="space-y-[15px]">
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Why Marketeq?
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Careers
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Partnerships
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Support
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Core Values
                </NextLink>
              </li>
              <li>
                <NextLink
                  href="#"
                  className="focus-visible:outline-none text-[13px] leading-[15.73px] font-extralight text-dark-blue-600 hover:underline"
                >
                  Events
                </NextLink>
              </li>
            </ul>
          </div>
        </div>

        <Button className="md:hidden self-start" variant="link" visual="gray">
          <ArrowUp className="size-[15px]" />
          Back to top
        </Button>

        <div className="max-w-[363px] w-full lg:ml-auto">
          <h1 className="text-base leading-[19.36px] font-medium text-dark-blue-400">
            Marketeq Talent Network
          </h1>

          <p className="mt-3 text-[13px] font-extralight leading-[15.73px] whitespace-pre-line text-gray-700">
            Want the freedom of working from home without competing with
            overseas rates? Join our national talent network and get a chance to
            work on exciting projects from top corporations and disruptive
            startups.
          </p>

          <Button
            className="mt-[30px] text-primary-500 hover:bg-primary-50 border-primary-500"
            variant="outlined"
            visual="gray"
          >
            Join the talent network
            <ArrowRight className="size-[15px]" />
          </Button>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-y-10 items-center justify-between mt-10 lg:mt-[50px] py-10 md:py-5 border-t border-gray-200">
        <div className="flex items-center md:flex-row flex-col gap-y-5 md:gap-x-[57px]">
          <Logo3 className="w-[120px] shrink-0 h-[17.62px]" />
          <span className="inline-block text-[13px] leading-[15.73px] font-extralight text-dark-blue-600">
            © 2011 - 2024 Marketeq Digital Inc. All Rights Reserved.
          </span>
        </div>

        <div className="flex md:flex-row flex-col items-center gap-10 lg:gap-x-[50px]">
          <div className="flex gap-x-5 items-center">
            <Button className="text-dark-blue-400" variant="link">
              Terms & Conditions
            </Button>

            <span className="inline-block bg-gray-200 h-4 w-px shrink-0" />

            <Button className="text-dark-blue-400" variant="link">
              Privacy Policy
            </Button>
          </div>

          <div className="flex items-center gap-x-[16.6px]">
            <IconButton
              variant="outlined"
              visual="gray"
              className="size-[30px] rounded-full"
            >
              <FacebookSolid className="size-3.5 text-dark-blue-400" />
            </IconButton>
            <IconButton
              variant="outlined"
              visual="gray"
              className="size-[30px] rounded-full"
            >
              <TwitterSolid className="size-3.5 text-dark-blue-400" />
            </IconButton>
            <IconButton
              variant="outlined"
              visual="gray"
              className="size-[30px] rounded-full"
            >
              <InstagramSolid className="size-3.5 text-dark-blue-400" />
            </IconButton>
            <IconButton
              variant="outlined"
              visual="gray"
              className="size-[30px] rounded-full"
            >
              <LinkedinSolid className="size-3.5 text-dark-blue-400" />
            </IconButton>
          </div>
        </div>
      </div>
    </footer>
  )
}

const Sidebar = () => {
  const [isOpen, toggleIsOpen] = useState(false)
  return (
    <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="gap-x-0.5 text-[11px] leading-6 lg:text-[13px] lg:leading-6 text-dark-blue-400"
          variant="link"
          visual="gray"
        >
          10 team members
          <ChevronRight className="size-3 lg:size-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent
        variant="unanimated"
        className="py-[68px] px-0 bg-[#F9FAFB] rounded-none data-[state=open]:duration-300 data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-left-1/2 data-[state=closed]:slide-out-to-left-1/2 left-0 inset-y-0 w-[241px]"
      >
        <div className="h-12 absolute top-0 border-b border-gray-200 inset-x-0 flex items-center bg-white justify-between pl-3.5 p-1">
          <span className="text-base leading-[19.36px] font-semibold text-dark-blue-400">
            Choose a Category
          </span>
          <DialogClose asChild>
            <IconButton variant="ghost" visual="gray">
              <X className="size-[18px]" />
            </IconButton>
          </DialogClose>
        </div>
        <ScrollArea
          className="h-full"
          scrollBar={<ScrollBar className="w-4 p-1" />}
        >
          <div className="p-3 flex flex-col gap-y-1">
            <NextLink
              href="#"
              className="h-9 p-3 flex items-center focus-visible:outline-none justify-between text-[13px] leading-[13.3px] font-medium text-gray-500 hover:bg-gray-100 hover:text-[#101828]"
            >
              Web Design <ChevronRight className="size-4" />
            </NextLink>
            <NextLink
              href="#"
              className="h-9 p-3 flex items-center focus-visible:outline-none justify-between text-[13px] leading-[13.3px] font-medium text-gray-500 hover:bg-gray-100 hover:text-[#101828]"
            >
              Web Design <ChevronRight className="size-4" />
            </NextLink>
            <NextLink
              href="#"
              className="h-9 p-3 flex items-center focus-visible:outline-none justify-between text-[13px] leading-[13.3px] font-medium text-gray-500 hover:bg-gray-100 hover:text-[#101828]"
            >
              Web Design <ChevronRight className="size-4" />
            </NextLink>
            <NextLink
              href="#"
              className="h-9 p-3 flex items-center focus-visible:outline-none justify-between text-[13px] leading-[13.3px] font-medium text-gray-500 hover:bg-gray-100 hover:text-[#101828]"
            >
              Web Design <ChevronRight className="size-4" />
            </NextLink>
            <NextLink
              href="#"
              className="h-9 p-3 flex items-center focus-visible:outline-none justify-between text-[13px] leading-[13.3px] font-medium text-gray-500 hover:bg-gray-100 hover:text-[#101828]"
            >
              Web Design <ChevronRight className="size-4" />
            </NextLink>
            <NextLink
              href="#"
              className="h-9 p-3 flex items-center focus-visible:outline-none justify-between text-[13px] leading-[13.3px] font-medium text-gray-500 hover:bg-gray-100 hover:text-[#101828]"
            >
              Web Design <ChevronRight className="size-4" />
            </NextLink>
            <NextLink
              href="#"
              className="h-9 p-3 flex items-center focus-visible:outline-none justify-between text-[13px] leading-[13.3px] font-medium text-gray-500 hover:bg-gray-100 hover:text-[#101828]"
            >
              Web Design <ChevronRight className="size-4" />
            </NextLink>
            <NextLink
              href="#"
              className="h-9 p-3 flex items-center focus-visible:outline-none justify-between text-[13px] leading-[13.3px] font-medium text-gray-500 hover:bg-gray-100 hover:text-[#101828]"
            >
              Web Design <ChevronRight className="size-4" />
            </NextLink>
            <NextLink
              href="#"
              className="h-9 p-3 flex items-center focus-visible:outline-none justify-between text-[13px] leading-[13.3px] font-medium text-gray-500 hover:bg-gray-100 hover:text-[#101828]"
            >
              Web Design <ChevronRight className="size-4" />
            </NextLink>
            <NextLink
              href="#"
              className="h-9 p-3 flex items-center focus-visible:outline-none justify-between text-[13px] leading-[13.3px] font-medium text-gray-500 hover:bg-gray-100 hover:text-[#101828]"
            >
              Web Design <ChevronRight className="size-4" />
            </NextLink>
            <NextLink
              href="#"
              className="h-9 p-3 flex items-center focus-visible:outline-none justify-between text-[13px] leading-[13.3px] font-medium text-gray-500 hover:bg-gray-100 hover:text-[#101828]"
            >
              Web Design <ChevronRight className="size-4" />
            </NextLink>
            <NextLink
              href="#"
              className="h-9 p-3 flex items-center focus-visible:outline-none justify-between text-[13px] leading-[13.3px] font-medium text-gray-500 hover:bg-gray-100 hover:text-[#101828]"
            >
              Web Design <ChevronRight className="size-4" />
            </NextLink>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="px-3.5 md:px-6 lg:px-[50px] bg-white shadow-[0px_1px_3px_0px_rgba(16,24,40,.1)] xs:max-md:hidden">
        <div className="pt-0.5 pb-3.5 lg:py-3 flex items-end gap-x-6 lg:justify-between lg:gap-x-[30px] ">
          <div className="flex flex-col">
            <span className="inline-block text-[10px] leading-[12.1px] lg:text-xs lg:leading-[16.34px] text-dark-blue-400">
              You currently have
            </span>

            <Sidebar />
          </div>

          <div className="flex items-center gap-x-6 lg:gap-x-[54.17px] lg:ml-[26.5px]">
            <Button
              className="text-[11px] lg:text-[13px] leading-6 opacity-60 hover:opacity-100"
              variant="link"
              visual="gray"
            >
              Research
            </Button>
            <Button
              className="text-[11px] lg:text-[13px] leading-6 opacity-60 hover:opacity-100"
              variant="link"
              visual="gray"
            >
              Design
            </Button>
            <Button
              className="text-[11px] lg:text-[13px] leading-6 opacity-60 hover:opacity-100"
              variant="link"
              visual="gray"
            >
              Development
            </Button>
            <Button
              className="text-[11px] lg:text-[13px] leading-6 opacity-60 hover:opacity-100"
              variant="link"
              visual="gray"
            >
              Testing
            </Button>
            <Button
              className="text-[11px] lg:text-[13px] leading-6 opacity-60 hover:opacity-100"
              variant="link"
              visual="gray"
            >
              Security
            </Button>
            <Button
              className="text-[11px] lg:text-[13px] leading-6 opacity-60 hover:opacity-100"
              variant="link"
              visual="gray"
            >
              Maintenance
            </Button>
            <Button
              className="text-[11px] lg:text-[13px] leading-6 opacity-60 hover:opacity-100"
              variant="link"
              visual="gray"
            >
              Digital Marketing
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="text-[11px] lg:text-[13px] leading-6 opacity-60 hover:opacity-100 lg:hidden"
                  variant="link"
                  visual="gray"
                >
                  More <ChevronDown className="size-[15px]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <ScrollArea
                  viewportClassName="max-h-[250px]"
                  scrollBar={<ScrollBar className="w-4 p-1" />}
                >
                  <DropdownMenuCheckItem>Option 1</DropdownMenuCheckItem>
                  <DropdownMenuCheckItem>Option 2</DropdownMenuCheckItem>
                  <DropdownMenuCheckItem>Option 3</DropdownMenuCheckItem>
                  <DropdownMenuCheckItem>Option 4</DropdownMenuCheckItem>
                  <DropdownMenuCheckItem>Option 5</DropdownMenuCheckItem>
                  <DropdownMenuCheckItem>Option 6</DropdownMenuCheckItem>
                  <DropdownMenuCheckItem>Option 7</DropdownMenuCheckItem>
                  <DropdownMenuCheckItem>Option 8</DropdownMenuCheckItem>
                  <DropdownMenuCheckItem>Option 9</DropdownMenuCheckItem>
                </ScrollArea>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex items-center gap-x-[18px] ml-auto xs:max-lg:hidden">
            <Button
              className="text-[13px] leading-6 opacity-60 hover:opacity-100"
              variant="link"
              visual="gray"
            >
              My Favorites
            </Button>
            <span className="inline-block h-4 w-px shrink-0 bg-gray-300" />
            <Button
              className="text-[13px] leading-6 opacity-60 hover:opacity-100"
              variant="link"
              visual="gray"
            >
              My Dashboard
            </Button>
          </div>
        </div>
      </div>

      {children}
      <Footer />
    </>
  )
}

const fixedSuggestions = [
  {
    id: 1,
    icon: Talent,
    value: "Browse Talent",
  },
  {
    id: 2,
    icon: Project,
    value: "Browse Project",
  },
  {
    id: 3,
    icon: Campaigns,
    value: "Browse Campaigns",
  },
]

const suggestions = [
  { id: 1, value: "UX Architect" },
  { id: 2, value: "Bulma developer" },
  { id: 3, value: "React" },
  { id: 4, value: "Golang framework" },
  { id: 5, value: "Mobile applications" },
  { id: 6, value: "Magento development" },
]

interface Person {
  name: string
}

type People = Person[]

const people: People = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
  { name: "Hellen Walker" },
  { name: "Hellen Waller" },
]

const SearchBar = () => {
  const [state, setState] = useState<string>()
  const [selected, setSelected] = React.useState<{
    id: number
    value: string
    icon?: React.JSXElementConstructor<any>
  }>()
  const [query, setQuery] = React.useState("")

  const filteredSuggestions =
    query === ""
      ? suggestions
      : suggestions.filter((industry) =>
          industry.value
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        )
  const reset = () => setQuery("")

  return (
    <Combobox
      className="group/root w-auto flex-auto"
      value={selected}
      onChange={setSelected}
    >
      <ComboboxTrigger className="relative flex h-[34px] lg:h-10 rounded-[5px] items-center gap-x-3 border border-gray-300 ui-open:rounded-b-none py-[7px] lg:py-2 pl-2.5 pr-3 lg:px-3">
        <div className="flex items-center gap-x-2 flex-auto">
          <SearchMd className="size-4 shrink-0 text-gray-400" />
          <ComboboxInput
            placeholder="Search by skills or project type"
            className="p-0 border-0 text-xs leading-5 h-auto rounded-none hover:ring-0 hover:border-gray-300 focus:ring-0 focus:border-gray-300 ui-open:rounded-b-none"
            size="lg"
            displayValue={(value: {
              id: number
              value: string
              icon?: React.JSXElementConstructor<any>
            }) => value.value}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <span className="w-px h-4 shrink-0 inline-block bg-gray-200" />
        <Listbox className="w-auto" value={state} onChange={setState}>
          <ListboxButton
            className="p-0 border-0 text-[11px] leading-[16.67px] lg:text-sm lg:leading-5 font-semibold gap-x-[6.67px] lg:gap-x-1.5 w-auto h-auto rounded-none hover:ring-0 focus:ring-0"
            placeholder="Category"
            iconClassName="size-[12.5px]"
          />
          <ListboxOptions className="w-max -right-3 left-auto mt-3.5">
            {people.map((person) => (
              <ListboxOption key={person.name} value={person.name}>
                {person.name}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </ComboboxTrigger>
      <ScaleOutIn afterLeave={reset}>
        <ComboboxOptions className="px-0 mt-0 space-y-0 border border-gray-300 border-t-0 rounded-t-none">
          <div className="p-3">
            {fixedSuggestions.map((fixedSuggestion) => (
              <ComboboxOption
                key={fixedSuggestion.id}
                value={fixedSuggestion}
                className="text-xs flex items-center gap-x-3 leading-[13.3px] text-gray-400"
              >
                <fixedSuggestion.icon className="size-5" />
                {fixedSuggestion.value}
              </ComboboxOption>
            ))}
          </div>

          <div className="space-y-1 p-3 border-t border-gray-100">
            <div className="px-3 flex items-center justify-between">
              <h1 className="text-[13px] leading-6 font-semibold text-dark-blue-400">
                Recent Searches
              </h1>

              <Button
                className="opacity-50 hover:opacity-100"
                variant="link"
                visual="gray"
              >
                Clear Search History
              </Button>
            </div>
            <ScrollArea viewportClassName="max-h-[360px]">
              {filteredSuggestions.map((suggestion) => (
                <ComboboxOption key={suggestion.id} value={suggestion}>
                  {suggestion.value}
                </ComboboxOption>
              ))}
            </ScrollArea>
          </div>
        </ComboboxOptions>
      </ScaleOutIn>
    </Combobox>
  )
}

const TopMostHeader = () => {
  return (
    <div className="px-3.5 md:px-6 lg:px-[50px] bg-white flex flex-col xs:max-md:pt-1 xs:max-md:pb-3.5 md:max-lg:pb-2.5 sticky top-0 z-50">
      <div className="flex items-center justify-between md:gap-x-3 lg:gap-x-[50px] md:pt-2 md:pb-1 lg:py-3">
        <NextLink className="focus-visible:outline-none" href="/marketplace">
          <Logo3 className="h-[14.25px] w-[97px] lg:w-[128px] lg:h-[18.81px]" />
        </NextLink>

        <div className="flex flex-auto gap-x-3 xs:max-lg:ml-3 xs:max-md:hidden">
          <SearchBar />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="gap-x-2 xs:max-lg:h-[34px] xs:max-lg:px-[12.6px] xs:max-lg:py-[7.2px] bg-white"
                visual="gray"
                variant="outlined"
                size="md"
              >
                <span className="inline-flex items-center gap-x-[7.2px] lg:gap-x-1 text-[12.6px] leading-5 lg:text-base lg:leading-6 font-extralight">
                  <span className="font-semibold">$ 1,540</span> USD
                </span>
                <ChevronDown className="text-gray-500 size-[13.5px] lg:size-[15px]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[174px]">
              <DropdownMenuItem>
                <Plus className="size-4" /> Add Funds
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Repeat className="size-4" /> Transfer Funds
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-x-1">
            <InviteWindowTrigger asChild>
              <IconButton
                className="rounded-full"
                size="md"
                variant="ghost"
                visual="gray"
              >
                <Plus className="size-[18px]" />
              </IconButton>
            </InviteWindowTrigger>
            <IconButton
              className="rounded-full"
              size="md"
              variant="ghost"
              visual="gray"
            >
              <Bell className="size-[18px]" />
            </IconButton>
            <IconButton
              className="rounded-full lg:hidden"
              size="md"
              variant="ghost"
              visual="gray"
            >
              <ThreeHorizontalLines className="text-dark-blue-400" />
            </IconButton>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="hidden lg:inline-flex items-center gap-x-2 px-3 py-1.5 rounded-[8px] hover:bg-gray-100 focus-visible:outline-none">
              <div className="inline-flex items-center gap-x-2">
                <Avatar>
                  <AvatarImage src="/man.jpg" alt="Man" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold leading-[15px] text-gray-700">
                    Christopher Torres
                  </span>
                  <span className="text-[9px] leading-[14px] text-gray-500">
                    chris@marketeqdigital.com
                  </span>
                </div>
              </div>

              <ChevronDown className="size-4 shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[278px]">
              <DropdownMenuLabel className="font-normal" size="md">
                <div className="flex flex-col gap-y-2">
                  <div className="flex flex-col">
                    <span className="text-xs leading-5 text-gray-700">
                      User ID: 2459749
                    </span>
                    <span className="text-[13px] leading-5 text-primary-500">
                      chris@marketeqdigital.com
                    </span>
                  </div>

                  <Button className="w-full">My Account</Button>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <Monitor className="size-4" />
                My Projects
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart2 className="size-4" />
                My Campaigns
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Users className="size-4" />
                My Team
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Star className="size-4" />
                My Favorites
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CoinStack className="size-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="size-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="grid grid-cols-2 gap-x-[9px]">
                <DropdownMenuItem>
                  <LifeBuoy className="size-4" />
                  Help Center
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="size-4" />
                  Log out
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="md:hidden">
        <SearchBar />
      </div>
    </div>
  )
}

const CarouselPreviousTrigger = () => {
  const { canScrollPrev } = useCarousel()
  return canScrollPrev ? (
    <CarouselPrevious className="size-7 border border-white hover:ring-8 hover:ring-white hover:bg-black bg-black/80 transition text-white duration-300 -left-4" />
  ) : null
}

const CarouselNextTrigger = () => {
  const { canScrollNext } = useCarousel()
  return canScrollNext ? (
    <CarouselNext className="size-7 border border-white hover:ring-8 hover:ring-white hover:border-black bg-black/80 hover:bg-black transition text-white duration-300 -right-4" />
  ) : null
}

const SaveButton = () => {
  const [isOpen, toggleIsOpen] = useToggle(false)
  const [value, setValue] = React.useState("")

  return (
    <div className="flex items-center">
      <Toggle
        className={buttonVariants({
          className:
            "group border-r-0 xs:max-lg:gap-x-[5.1px] xs:max-lg:leading-[12.75px] xs:max-lg:text-[8.93px] xs:max-lg:h-[25.75px] rounded-r-none",
          variant: "outlined",
          visual: "gray",
          size: "md",
        })}
      >
        <Star className="size-[12.75px] lg:size-5 text-gray-300 group-hover:text-gray-500 group-hover:group-data-[state=on]:text-primary-500 group-data-[state=on]:text-primary-500  group-data-[state=on]:fill-primary-500" />
        <span className="group-data-[state=off]:inline-block hidden">Save</span>
        <span className="hidden group-data-[state=on]:inline-block">Saved</span>
      </Toggle>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton
            className="group rounded-l-none xs:max-lg:size-[25.5px] text-gray-500"
            variant="outlined"
            visual="gray"
            size="md"
          >
            <ChevronDown className="duration transition group-data-[state=open]:-rotate-180 size-[12.75px] lg:size-5" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" side="bottom">
          <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
            <DropdownMenuRadioTrigger value="Digital Marketing">
              Digital Marketing
            </DropdownMenuRadioTrigger>
            <DropdownMenuRadioTrigger value="Customer Service">
              Customer Service
            </DropdownMenuRadioTrigger>
            <DropdownMenuRadioTrigger value="Email Marketing">
              Email Marketing
            </DropdownMenuRadioTrigger>
          </DropdownMenuRadioGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => toggleIsOpen()}
            className="text-primary-500"
          >
            <Plus className="size-4" /> Create New List
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
        <DialogContent>
          <form className="flex items-center gap-x-3">
            <Input placeholder="Enter List Name" className="flex-auto" />
            <Button size="lg">Save</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export const Default = () => {
  const cardRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const [isCardStuck, setIsCardStuck] = useState<boolean>(false)
  const [isToolbarStuck, setIsToolbarStuck] = useState<boolean>(false)
  const [showMore, toggleShowMore] = useToggle(false)

  useEffect(() => {
    const node = cardRef.current

    if (node) {
      const topValue = getComputedStyle(node)["top"]
      const top = topValue.endsWith("px") ? Number(topValue.slice(0, -2)) : 0

      const handleScroll = () => {
        const rect = node.getBoundingClientRect()
        const isStuck = top === Math.ceil(rect.y)
        setIsCardStuck(isStuck)
      }

      window.addEventListener("scroll", handleScroll)

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  useEffect(() => {
    const node = toolbarRef.current

    if (node) {
      const topValue = getComputedStyle(node)["top"]
      const top = topValue.endsWith("px") ? Number(topValue.slice(0, -2)) : 0

      const handleScroll = () => {
        const rect = node.getBoundingClientRect()
        const isStuck = top === Math.ceil(rect.y)
        setIsToolbarStuck(isStuck)
      }

      window.addEventListener("scroll", handleScroll)

      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopMostHeader />
      <Layout>
        <div className="py-[50px]">
          <div className="max-w-[1440px] mx-auto px-[100px]">
            <div className="border border-gray-200 rounded-lg bg-white shadow-[0px_2px_5px_0px_rgba(0,0,0,.04)]">
              <div className="p-10 flex items-start gap-x-10">
                <Avatar className="size-[318px]">
                  <AvatarImage src="/man.jpg" alt="Man" />
                  <AvatarFallback />
                </Avatar>

                <div className="flex-auto">
                  <div className="flex items-start">
                    <div className="flex-auto">
                      <h1 className="text-[28px] leading-[34px] font-bold text-dark-blue-400">
                        Dheeraj
                        <span className="text-[26px] font-extralight">
                          @dheerajnagdali
                        </span>
                      </h1>
                      <h2 className="text-[22px] mt-1 leading-[27px] text-dark-blue-400 font-medium">
                        Expert React Developer
                      </h2>

                      <p className="mt-2 text-sm leading-none text-gray-500">
                        10 years of experience
                      </p>

                      <div className="mt-6 flex items-center gap-x-3">
                        <Badge
                          className="bg-primary-500 text-white rounded-[4px]"
                          visual="primary"
                        >
                          <Star className="size-3 fill-white" /> 4.5
                        </Badge>

                        <span className="text-xs leading-none text-gray-500">
                          24 reviews
                        </span>
                      </div>

                      <div className="mt-6">
                        <div className="flex items-center gap-x-[9px]">
                          <MapPin className="size-4" />
                          <p className="text-sm leading-none font-medium text-dark-blue-400">
                            Nainital, Uttarakhand, India
                          </p>
                        </div>

                        <div className="flex items-center mt-3 gap-x-[9px]">
                          <Clock className="size-4" />
                          <p className="text-sm leading-none font-extralight text-dark-blue-400">
                            Dheeraj is{" "}
                            <span className="text-success-600 font-medium">
                              available
                            </span>{" "}
                            for hire
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-x-3">
                      <TooltipProvider delayDuration={75}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="md">
                              <Plus className="size-[15px]" />
                              Hire Me
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            visual="white"
                            size="md"
                            className="group text-gray-700 p-6 max-w-[344px] border border-gray-200 shadow-[0px_24px_48px_-12px_rgba(16,24,40,.18)]"
                            sideOffset={14}
                            side="bottom"
                          >
                            <div className="flex items-center mt-3 gap-x-2">
                              <Clock className="size-4" />
                              <p className="text-sm leading-none font-extralight text-dark-blue-400">
                                Dheeraj{" "}
                                <span className="font-medium">
                                  is not currently available
                                </span>{" "}
                                for hire
                              </p>
                            </div>

                            <Button className="mt-3" size="md" variant="link">
                              View similar talent{" "}
                              <ArrowRight className="size-3" />
                            </Button>

                            <span className="absolute inline-block size-4 border-b border-r border-gray-200 bg-white rotate-45 group-data-[side=bottom]:border-r-0 group-data-[side=bottom]:border-b-0 group-data-[side=bottom]:border-l group-data-[side=bottom]:border-t inset-x-0 mx-auto group-data-[side=top]:-bottom-2 group-data-[side=bottom]:-top-2" />
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <SaveButton />

                      <IconButton
                        className="text-gray-500"
                        variant="outlined"
                        visual="gray"
                        size="md"
                      >
                        <Share className="size-[20px]" />
                      </IconButton>
                    </div>
                  </div>

                  <div className="mt-[54px]">
                    <h1 className="text-sm font-bold leading-none text-dark-blue-400">
                      What I do
                    </h1>

                    <div className="mt-3 flex gap-x-3">
                      <Badge className="text-gray-700" visual="gray" size="lg">
                        Typescript
                      </Badge>
                      <Badge className="text-gray-700" visual="gray" size="lg">
                        React.js
                      </Badge>
                      <Badge className="text-gray-700" visual="gray" size="lg">
                        Tailwind CSS
                      </Badge>
                      <Badge className="text-gray-700" visual="gray" size="lg">
                        Next.js
                      </Badge>
                      <Badge className="text-gray-700" visual="gray" size="lg">
                        <Plus2 className="h-3 w-3" /> 17 more...
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="py-3 px-8 border-t border-gray-200 grid grid-cols-5 divide-x divide-gray-200 bg-[#122A4B]/[.02]">
                <div className="flex gap-x-2 justify-center items-center">
                  <span className="text-sm font-extralight leading-none text-dark-blue-400">
                    Rate
                  </span>
                  <span className="text-xl font-bold leading-none text-dark-blue-400">
                    $85 - $120
                    <span className="text-sm font-extralight leading-none text-dark-blue-400">
                      /hr
                    </span>
                  </span>
                </div>
                <div className="flex gap-x-2 justify-center  items-center">
                  <span className="text-sm font-extralight leading-none text-dark-blue-400">
                    Client success rating
                  </span>
                  <span className="text-sm font-bold leading-none text-dark-blue-400">
                    95%
                  </span>
                </div>
                <div className="flex gap-x-2 justify-center  items-center">
                  <span className="text-sm font-extralight leading-none text-dark-blue-400">
                    Total projects completed
                  </span>
                  <span className="text-sm font-bold leading-none text-dark-blue-400">
                    1450
                  </span>
                </div>
                <div className="flex gap-x-2 justify-center  items-center">
                  <span className="text-sm font-extralight leading-none text-dark-blue-400">
                    Member since
                  </span>
                  <span className="text-sm font-bold leading-none text-dark-blue-400">
                    September 19, 2024
                  </span>
                </div>
                <div className="flex gap-x-2 justify-center  items-center">
                  <span className="text-sm font-extralight leading-none text-dark-blue-400">
                    Repeat hire rate
                  </span>
                  <span className="text-sm font-bold leading-none text-dark-blue-400">
                    85%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Tabs className="mt-6 isolate" defaultValue="Portfolio">
            <TabsList
              className="group/list p-0 bg-transparent data-[status=stuck]:border-b data-[status=stuck]:border-gray-200 z-10 transition duration-300 top-[64px] sticky block data-[status=stuck]:bg-white border-0"
              data-status={isToolbarStuck ? "stuck" : "unstuck"}
              ref={toolbarRef}
            >
              <div className="max-w-[1440px] mx-auto px-[100px]">
                <div className="contents group-data-[status=stuck]/list:flex items-center max-w-[1240px] mx-auto">
                  <div className="flex-auto contents group-data-[status=stuck]/list:block">
                    <div className="hidden items-center gap-x-3 group-data-[status=stuck]/list:flex">
                      <Avatar
                        className="hover:ring-0 active:ring-primary-100"
                        size="lg"
                      >
                        <AvatarImage src="/man.jpg" alt="Man" />
                        <AvatarFallbackIcon />
                      </Avatar>
                      <div className="flex flex-col gap-y-0.5">
                        <span className="text-lg leading-none font-bold text-dark-blue-400">
                          Dheeraj{" "}
                          <span className="text-base font-extralight">
                            @dheerajnagdali
                          </span>
                        </span>
                        <span className="text-sm leading-none font-medium text-dark-blue-400">
                          Expert React Developer
                        </span>
                      </div>
                    </div>
                    <div
                      className={cn(
                        tabsListVariants({
                          className:
                            "bg-transparent justify-start w-full group-data-[status=stuck]/list:border-b-0 group-data-[status=stuck]/list:mt-3 inline-flex",
                        })
                      )}
                    >
                      <TabsTrigger value="Portfolio" asChild>
                        <NextLink href="#">Portfolio</NextLink>
                      </TabsTrigger>
                      <TabsTrigger value="Skills" asChild>
                        <NextLink href="#">Skills</NextLink>
                      </TabsTrigger>
                      <TabsTrigger value="Overview" asChild>
                        <NextLink href="#">Overview</NextLink>
                      </TabsTrigger>
                      <TabsTrigger value="Offers" asChild>
                        <NextLink href="#">Offers</NextLink>
                      </TabsTrigger>
                      <TabsTrigger value="Work Experience" asChild>
                        <NextLink href="#">Work Experience</NextLink>
                      </TabsTrigger>
                      <TabsTrigger value="Education" asChild>
                        <NextLink href="#">Work Experience</NextLink>
                      </TabsTrigger>
                      <TabsTrigger value="Project History" asChild>
                        <NextLink href="#">Project History</NextLink>
                      </TabsTrigger>
                    </div>
                  </div>

                  <div className="space-y-3 group-data-[status=stuck]/list:block hidden">
                    <div className="flex items-center gap-x-3">
                      <TooltipProvider delayDuration={75}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="md">
                              <Plus className="size-[15px]" />
                              Hire Me
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent
                            visual="white"
                            size="md"
                            className="text-gray-700 p-6 max-w-[344px] border border-gray-200 shadow-[0px_24px_48px_-12px_rgba(16,24,40,.18)]"
                            sideOffset={14}
                            side="bottom"
                          >
                            <TooltipArrow className="fill-white" />
                            <div className="flex items-center mt-3 gap-x-[9px]">
                              <Clock className="size-4" />
                              <p className="text-sm leading-none font-extralight text-dark-blue-400">
                                Dheeraj{" "}
                                <span className="font-medium">
                                  is not currently available
                                </span>{" "}
                                for hire
                              </p>
                            </div>

                            <Button className="mt-3" size="md" variant="link">
                              View similar talent{" "}
                              <ArrowRight className="size-3" />
                            </Button>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <SaveButton />

                      <IconButton
                        className="text-gray-500"
                        variant="outlined"
                        visual="gray"
                        size="md"
                      >
                        <Share className="size-[20px]" />
                      </IconButton>
                    </div>

                    <div className="flex items-center mt-3 gap-x-[9px]">
                      <Clock className="size-4" />
                      <p className="text-[12.09px] leading-none font-extralight text-dark-blue-400">
                        Dheeraj is currently{" "}
                        <span className="text-success-600 font-bold">
                          available
                        </span>{" "}
                        for <span className="font-bold">40 hrs</span> /week
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsList>
            <div className="max-w-[1440px] mx-auto px-[100px]">
              <div className="pt-6 flex gap-x-8">
                <div className="flex-auto">
                  <div className="grid grid-cols-3 flex-auto gap-x-6">
                    <article className="group relative rounded-lg overflow-hidden h-[200px]">
                      <NextImage
                        className="object-cover"
                        src="/dashboard.png"
                        alt="Dashboard"
                        fill
                        sizes="33vw"
                      />
                      <div className="group inset-0 absolute flex items-center justify-center hover:bg-black/50 transition duration-300">
                        <Button className="group-hover:opacity-100 opacity-0 bg-white text-gray-700 transition duration-300 hover:bg-primary-500 hover:text-white">
                          View Project
                        </Button>
                      </div>
                      <div className="absolute group-hover:hidden flex flex-col justify-end gap-y-2 p-[15px] inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_50.12%,rgba(0,0,0,.5)_82.64%)]">
                        <h1 className="text-sm text-white leading-none font-medium">
                          React.js Front End Ecommerce Store
                        </h1>
                        <div className="flex items-center gap-x-[6.79px]">
                          <Badge className="bg-white/20 text-white">
                            UX/UI Design
                          </Badge>
                          <Badge className="bg-white/20 text-white">
                            Visual Design
                          </Badge>
                        </div>
                      </div>
                    </article>
                    <article className="group relative rounded-lg overflow-hidden h-[200px]">
                      <NextImage
                        className="object-cover"
                        src="/dashboard.png"
                        alt="Dashboard"
                        fill
                        sizes="33vw"
                      />
                      <div className="group inset-0 absolute flex items-center justify-center hover:bg-black/50 transition duration-300">
                        <Button className="group-hover:opacity-100 opacity-0 bg-white text-gray-700 transition duration-300 hover:bg-primary-500 hover:text-white">
                          View Project
                        </Button>
                      </div>
                      <div className="absolute group-hover:hidden flex flex-col justify-end gap-y-2 p-[15px] inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_50.12%,rgba(0,0,0,.5)_82.64%)]">
                        <h1 className="text-sm text-white leading-none font-medium">
                          React.js Front End Ecommerce Store
                        </h1>
                        <div className="flex items-center gap-x-[6.79px]">
                          <Badge className="bg-white/20 text-white">
                            UX/UI Design
                          </Badge>
                          <Badge className="bg-white/20 text-white">
                            Visual Design
                          </Badge>
                        </div>
                      </div>
                    </article>
                    <article className="group relative rounded-lg overflow-hidden h-[200px]">
                      <NextImage
                        className="object-cover"
                        src="/dashboard.png"
                        alt="Dashboard"
                        fill
                        sizes="33vw"
                      />
                      <div className="group inset-0 absolute flex items-center justify-center hover:bg-black/50 transition duration-300">
                        <Button className="group-hover:opacity-100 opacity-0 bg-white text-gray-700 transition duration-300 hover:bg-primary-500 hover:text-white">
                          View Project
                        </Button>
                      </div>
                      <div className="group-hover:hidden absolute flex flex-col justify-end gap-y-2 p-[15px] inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_50.12%,rgba(0,0,0,.5)_82.64%)]">
                        <h1 className="text-sm text-white leading-none font-medium">
                          React.js Front End Ecommerce Store
                        </h1>
                        <div className="flex items-center gap-x-[6.79px]">
                          <Badge className="bg-white/20 text-white">
                            UX/UI Design
                          </Badge>
                          <Badge className="bg-white/20 text-white">
                            Visual Design
                          </Badge>
                        </div>
                      </div>
                    </article>
                  </div>

                  <div className="my-6">
                    <div className="flex items-center gap-x-1">
                      <span className="flex-auto inline-block h-px bg-gray-200" />
                      <Button variant="link" visual="gray">
                        View More
                      </Button>
                      <span className="flex-auto inline-block h-px bg-gray-200" />
                    </div>
                  </div>

                  <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                    <h1 className="text-xl leading-none font-bold text-dark-blue-400">
                      Skills
                    </h1>

                    <div className="mt-6 flex gap-3 flex-wrap">
                      <Badge className="text-gray-700" visual="gray" size="lg">
                        Typescript
                      </Badge>
                      <Badge className="text-gray-700" visual="gray" size="lg">
                        React.js
                      </Badge>
                      <Badge className="text-gray-700" visual="gray" size="lg">
                        Tailwind CSS
                      </Badge>
                      <Badge className="text-gray-700" visual="gray" size="lg">
                        Next.js
                      </Badge>
                      <Badge className="text-gray-700" visual="gray" size="lg">
                        <Plus2 className="h-3 w-3" /> 17 more...
                      </Badge>
                    </div>

                    <div className="mt-6 flex items-center justify-center">
                      <Button variant="link" visual="gray">
                        View More
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="p-6 rounded-t-lg bg-white border border-gray-200 space-y-6">
                      <h1 className="text-xl font-bold text-dark-blue-400 leading-none">
                        Overview
                      </h1>

                      <p className="mt-6 text-sm font-extralight text-gray-700">
                        Front-end Technologies & Web Accessibility | Exploring
                        Human Interface Design I’m passionate about crafting
                        intuitive, user-friendly digital experiences with a
                        strong focus on accessibility and human-centered design.
                        With expertise in HTML, CSS, JavaScript, and modern
                        frameworks, I create seamless interfaces that enhance
                        usability for all users, including those with
                        disabilities. I believe technology should be inclusive,
                        aesthetically engaging, and functionally efficient.
                      </p>

                      <Button variant="link" visual="gray">
                        View More
                      </Button>
                    </div>

                    <Tabs
                      defaultValue="Featured Clients"
                      className="p-6 h-[134px] border-x border-b rounded-b-lg border-gray-200 bg-white"
                    >
                      <RadixTabs.List className="flex items-center gap-x-3">
                        <TabsTrigger
                          variant="unstyled"
                          showUnderline={false}
                          value="Featured Clients"
                          className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                        >
                          Featured Clients
                        </TabsTrigger>
                        <TabsTrigger
                          variant="unstyled"
                          showUnderline={false}
                          value="Certifications"
                          className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                        >
                          Certifications
                        </TabsTrigger>
                        <TabsTrigger
                          variant="unstyled"
                          showUnderline={false}
                          value="Industry Expertise"
                          className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                        >
                          Industry Expertise
                        </TabsTrigger>
                      </RadixTabs.List>

                      <TabsContent value="Featured Clients">
                        <div className="pt-6 flex items-center gap-x-6">
                          <Dropbox />
                          <Microsoft />
                          <Adobe />
                          <Nasdaq />
                        </div>
                      </TabsContent>
                      <TabsContent value="Certifications">
                        <div className="pt-6 flex items-center gap-x-6">
                          <div className="inline-flex text-sm leading-none font-medium text-dark-blue-400 items-center gap-x-1.5">
                            <AdobeBrand className="size-7" />
                            Adobe Certified Professional
                          </div>
                          <div className="inline-flex text-sm leading-none font-medium text-dark-blue-400 items-center gap-x-1.5">
                            <GoogleDefault className="size-6" />
                            Google UX Design Certificate
                          </div>
                          <div className="inline-flex text-sm leading-none font-medium text-dark-blue-400 items-center gap-x-1.5">
                            <WordpressBrand className="size-7" />
                            Certified Wordpress Developer
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="Industry Expertise">
                        <div className="pt-6 flex items-center gap-x-3">
                          <Badge size="lg" visual="gray">
                            Real Estate
                          </Badge>
                          <Badge size="lg" visual="gray">
                            Finance
                          </Badge>
                          <Badge size="lg" visual="gray">
                            Accounting
                          </Badge>
                          <Badge size="lg" visual="gray">
                            Insurance
                          </Badge>
                          <Badge size="lg" visual="gray">
                            Music
                          </Badge>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="mt-6">
                    <h1 className="text-xl font-bold leading-none text-dark-blue-400">
                      My Offers
                    </h1>

                    <Tabs defaultValue="Projects" className="mt-6">
                      <div className="flex items-center justify-between">
                        <RadixTabs.List className="inline-flex items-center gap-x-3">
                          <TabsTrigger
                            variant="unstyled"
                            showUnderline={false}
                            value="Projects"
                            className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                          >
                            Projects
                          </TabsTrigger>
                          <TabsTrigger
                            variant="unstyled"
                            showUnderline={false}
                            value="Services"
                            className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                          >
                            Services
                          </TabsTrigger>
                        </RadixTabs.List>

                        <RadixTabs.Tabs
                          defaultValue="Front-end"
                          className="inline-flex items-center gap-x-6"
                        >
                          <RadixTabs.List className="inline-flex items-center gap-x-3">
                            <RadixTabs.Trigger
                              value="Front-end"
                              className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                            >
                              Font-end
                            </RadixTabs.Trigger>
                            <RadixTabs.Trigger
                              value="Back-End"
                              className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                            >
                              Back-End
                            </RadixTabs.Trigger>
                            <RadixTabs.Trigger
                              value="Database"
                              className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                            >
                              Database
                            </RadixTabs.Trigger>
                          </RadixTabs.List>

                          <Button
                            className="group"
                            variant="link"
                            visual="gray"
                          >
                            View All{" "}
                            <ArrowRight className="size-[15px] transition duration-300 group-hover:translate-x-[4px]" />
                          </Button>
                        </RadixTabs.Tabs>
                      </div>

                      <TabsContent value="Projects">
                        <div className="pt-6 grid grid-cols-3 gap-x-5">
                          <article className="p-5 bg-white border rounded-lg border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                            <div className="h-[169px] rounded-[6px] overflow-hidden bg-white relative">
                              <NextImage
                                className="object-cover"
                                src="/dashboard.png"
                                alt="Dashboard"
                                fill
                                sizes="33vw"
                              />
                            </div>

                            <div className="mt-3 flex items-start gap-x-3">
                              <NextLink
                                href="#"
                                className="focus-visible:outline-none font-bold flex-auto text-base leading-none text-dark-blue-400 hover:underline"
                              >
                                The Ultimate Mobile App Experience
                              </NextLink>

                              <div className="inline-flex items-center gap-x-1">
                                <Star className="size-[15px] text-primary-500 fill-primary-500" />
                                <span className="inline-flex items-center gap-x-1 text-sm leading-none text-dark-blue-400 font-medium">
                                  4.9 <span>(5)</span>
                                </span>
                              </div>
                            </div>

                            <p className="mt-3 text-sm leading-none font-extralight text-dark-blue-400">
                              Brief Description of the project. Lorem ipsum
                              dolor sit amet, consectetur adipiscing elit, sed
                              do eiusmod tempor incididunt.
                            </p>

                            <div className="mt-[14.5px] flex flex-col gap-y-3">
                              <div className="flex items-center gap-x-[6.4px]">
                                <Clock className="size-[18px] shrink-0 text-primary-500" />

                                <span className="font-medium text-sm leading-none text-dark-blue-400">
                                  Starting from 12 weeks
                                </span>
                              </div>

                              <div className="flex items-center gap-x-[6.4px]">
                                <Clock className="size-[18px] shrink-0 text-primary-500" />

                                <span className="font-medium text-sm leading-none text-dark-blue-400">
                                  $50,000 budget
                                </span>
                              </div>
                            </div>

                            <div className="mt-5 flex items-center justify-between">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AvatarGroup max={5} size="sm" excess>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                    </AvatarGroup>
                                  </TooltipTrigger>

                                  <TooltipContent
                                    className="p-0 max-w-[262px]"
                                    size="md"
                                  >
                                    <ScrollArea
                                      className="h-[192px] p-3"
                                      scrollBar={
                                        <ScrollBar
                                          className="w-4 p-1"
                                          thumbClassName="bg-white/20"
                                        />
                                      }
                                    >
                                      <div className="space-y-3 pr-5">
                                        <div className="flex items-center gap-x-[18px]">
                                          <div className="flex items-center gap-x-2 flex-auto">
                                            <Avatar>
                                              <AvatarImage
                                                src="/woman.jpg"
                                                alt="Woman"
                                              />
                                              <AvatarFallback>W</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col flex-auto">
                                              <div className="flex items-center gap-x-0.5">
                                                <span className="text-xs leading-5 font-semibold text-white">
                                                  Sevil
                                                </span>
                                                <span className="text-[10px] leading-none font-light text-white">
                                                  @designsuperstar23
                                                </span>
                                              </div>
                                              <span className="text-[10px] font-light text-white">
                                                Full-stack Developer
                                              </span>
                                            </div>
                                          </div>

                                          <span className="text-sm font-semibold text-white leading-5">
                                            $75{" "}
                                            <span className="text-[10px] font-light leading-5">
                                              /hr
                                            </span>
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-x-[18px]">
                                          <div className="flex items-center gap-x-2 flex-auto">
                                            <Avatar>
                                              <AvatarImage
                                                src="/woman.jpg"
                                                alt="Woman"
                                              />
                                              <AvatarFallback>W</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col flex-auto">
                                              <div className="flex items-center gap-x-0.5">
                                                <span className="text-xs leading-5 font-semibold text-white">
                                                  Sevil
                                                </span>
                                                <span className="text-[10px] leading-none font-light text-white">
                                                  @designsuperstar23
                                                </span>
                                              </div>
                                              <span className="text-[10px] font-light text-white">
                                                Full-stack Developer
                                              </span>
                                            </div>
                                          </div>

                                          <span className="text-sm font-semibold text-white leading-5">
                                            $75{" "}
                                            <span className="text-[10px] font-light leading-5">
                                              /hr
                                            </span>
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-x-[18px]">
                                          <div className="flex items-center gap-x-2 flex-auto">
                                            <Avatar>
                                              <AvatarImage
                                                src="/woman.jpg"
                                                alt="Woman"
                                              />
                                              <AvatarFallback>W</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col flex-auto">
                                              <div className="flex items-center gap-x-0.5">
                                                <span className="text-xs leading-5 font-semibold text-white">
                                                  Sevil
                                                </span>
                                                <span className="text-[10px] leading-none font-light text-white">
                                                  @designsuperstar23
                                                </span>
                                              </div>
                                              <span className="text-[10px] font-light text-white">
                                                Full-stack Developer
                                              </span>
                                            </div>
                                          </div>

                                          <span className="text-sm font-semibold text-white leading-5">
                                            $75{" "}
                                            <span className="text-[10px] font-light leading-5">
                                              /hr
                                            </span>
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-x-[18px]">
                                          <div className="flex items-center gap-x-2 flex-auto">
                                            <Avatar>
                                              <AvatarImage
                                                src="/woman.jpg"
                                                alt="Woman"
                                              />
                                              <AvatarFallback>W</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col flex-auto">
                                              <div className="flex items-center gap-x-0.5">
                                                <span className="text-xs leading-5 font-semibold text-white">
                                                  Sevil
                                                </span>
                                                <span className="text-[10px] leading-none font-light text-white">
                                                  @designsuperstar23
                                                </span>
                                              </div>
                                              <span className="text-[10px] font-light text-white">
                                                Full-stack Developer
                                              </span>
                                            </div>
                                          </div>

                                          <span className="text-sm font-semibold text-white leading-5">
                                            $75{" "}
                                            <span className="text-[10px] font-light leading-5">
                                              /hr
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </ScrollArea>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider delayDuration={75}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="inline-block">
                                      <Favorite />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Save to favorites
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </article>
                          <article className="p-5 bg-white border rounded-lg border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                            <div className="h-[169px] rounded-[6px] overflow-hidden bg-white relative">
                              <NextImage
                                className="object-cover"
                                src="/dashboard.png"
                                alt="Dashboard"
                                fill
                                sizes="33vw"
                              />
                            </div>

                            <div className="mt-3 flex items-start gap-x-3">
                              <NextLink
                                href="#"
                                className="focus-visible:outline-none font-bold flex-auto text-base leading-none text-dark-blue-400 hover:underline"
                              >
                                The Ultimate Mobile App Experience
                              </NextLink>

                              <div className="inline-flex items-center gap-x-1">
                                <Star className="size-[15px] text-primary-500 fill-primary-500" />
                                <span className="inline-flex items-center gap-x-1 text-sm leading-none text-dark-blue-400 font-medium">
                                  4.9 <span>(5)</span>
                                </span>
                              </div>
                            </div>

                            <p className="mt-3 text-sm leading-none font-extralight text-dark-blue-400">
                              Brief Description of the project. Lorem ipsum
                              dolor sit amet, consectetur adipiscing elit, sed
                              do eiusmod tempor incididunt.
                            </p>

                            <div className="mt-[14.5px] flex flex-col gap-y-3">
                              <div className="flex items-center gap-x-[6.4px]">
                                <Clock className="size-[18px] shrink-0 text-primary-500" />

                                <span className="font-medium text-sm leading-none text-dark-blue-400">
                                  Starting from 12 weeks
                                </span>
                              </div>

                              <div className="flex items-center gap-x-[6.4px]">
                                <Clock className="size-[18px] shrink-0 text-primary-500" />

                                <span className="font-medium text-sm leading-none text-dark-blue-400">
                                  $50,000 budget
                                </span>
                              </div>
                            </div>

                            <div className="mt-5 flex items-center justify-between">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AvatarGroup max={5} size="sm" excess>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                    </AvatarGroup>
                                  </TooltipTrigger>

                                  <TooltipContent
                                    className="p-0 max-w-[262px]"
                                    size="md"
                                  >
                                    <ScrollArea
                                      className="h-[192px] p-3"
                                      scrollBar={
                                        <ScrollBar
                                          className="w-4 p-1"
                                          thumbClassName="bg-white/20"
                                        />
                                      }
                                    >
                                      <div className="space-y-3 pr-5">
                                        <div className="flex items-center gap-x-[18px]">
                                          <div className="flex items-center gap-x-2 flex-auto">
                                            <Avatar>
                                              <AvatarImage
                                                src="/woman.jpg"
                                                alt="Woman"
                                              />
                                              <AvatarFallback>W</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col flex-auto">
                                              <div className="flex items-center gap-x-0.5">
                                                <span className="text-xs leading-5 font-semibold text-white">
                                                  Sevil
                                                </span>
                                                <span className="text-[10px] leading-none font-light text-white">
                                                  @designsuperstar23
                                                </span>
                                              </div>
                                              <span className="text-[10px] font-light text-white">
                                                Full-stack Developer
                                              </span>
                                            </div>
                                          </div>

                                          <span className="text-sm font-semibold text-white leading-5">
                                            $75{" "}
                                            <span className="text-[10px] font-light leading-5">
                                              /hr
                                            </span>
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-x-[18px]">
                                          <div className="flex items-center gap-x-2 flex-auto">
                                            <Avatar>
                                              <AvatarImage
                                                src="/woman.jpg"
                                                alt="Woman"
                                              />
                                              <AvatarFallback>W</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col flex-auto">
                                              <div className="flex items-center gap-x-0.5">
                                                <span className="text-xs leading-5 font-semibold text-white">
                                                  Sevil
                                                </span>
                                                <span className="text-[10px] leading-none font-light text-white">
                                                  @designsuperstar23
                                                </span>
                                              </div>
                                              <span className="text-[10px] font-light text-white">
                                                Full-stack Developer
                                              </span>
                                            </div>
                                          </div>

                                          <span className="text-sm font-semibold text-white leading-5">
                                            $75{" "}
                                            <span className="text-[10px] font-light leading-5">
                                              /hr
                                            </span>
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-x-[18px]">
                                          <div className="flex items-center gap-x-2 flex-auto">
                                            <Avatar>
                                              <AvatarImage
                                                src="/woman.jpg"
                                                alt="Woman"
                                              />
                                              <AvatarFallback>W</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col flex-auto">
                                              <div className="flex items-center gap-x-0.5">
                                                <span className="text-xs leading-5 font-semibold text-white">
                                                  Sevil
                                                </span>
                                                <span className="text-[10px] leading-none font-light text-white">
                                                  @designsuperstar23
                                                </span>
                                              </div>
                                              <span className="text-[10px] font-light text-white">
                                                Full-stack Developer
                                              </span>
                                            </div>
                                          </div>

                                          <span className="text-sm font-semibold text-white leading-5">
                                            $75{" "}
                                            <span className="text-[10px] font-light leading-5">
                                              /hr
                                            </span>
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-x-[18px]">
                                          <div className="flex items-center gap-x-2 flex-auto">
                                            <Avatar>
                                              <AvatarImage
                                                src="/woman.jpg"
                                                alt="Woman"
                                              />
                                              <AvatarFallback>W</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col flex-auto">
                                              <div className="flex items-center gap-x-0.5">
                                                <span className="text-xs leading-5 font-semibold text-white">
                                                  Sevil
                                                </span>
                                                <span className="text-[10px] leading-none font-light text-white">
                                                  @designsuperstar23
                                                </span>
                                              </div>
                                              <span className="text-[10px] font-light text-white">
                                                Full-stack Developer
                                              </span>
                                            </div>
                                          </div>

                                          <span className="text-sm font-semibold text-white leading-5">
                                            $75{" "}
                                            <span className="text-[10px] font-light leading-5">
                                              /hr
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </ScrollArea>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider delayDuration={75}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="inline-block">
                                      <Favorite />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Save to favorites
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </article>
                          <article className="p-5 bg-white border rounded-lg border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                            <div className="h-[169px] rounded-[6px] overflow-hidden bg-white relative">
                              <NextImage
                                className="object-cover"
                                src="/dashboard.png"
                                alt="Dashboard"
                                fill
                                sizes="33vw"
                              />
                            </div>

                            <div className="mt-3 flex items-start gap-x-3">
                              <NextLink
                                href="#"
                                className="focus-visible:outline-none font-bold flex-auto text-base leading-none text-dark-blue-400 hover:underline"
                              >
                                The Ultimate Mobile App Experience
                              </NextLink>

                              <div className="inline-flex items-center gap-x-1">
                                <Star className="size-[15px] text-primary-500 fill-primary-500" />
                                <span className="inline-flex items-center gap-x-1 text-sm leading-none text-dark-blue-400 font-medium">
                                  4.9 <span>(5)</span>
                                </span>
                              </div>
                            </div>

                            <p className="mt-3 text-sm leading-none font-extralight text-dark-blue-400">
                              Brief Description of the project. Lorem ipsum
                              dolor sit amet, consectetur adipiscing elit, sed
                              do eiusmod tempor incididunt.
                            </p>

                            <div className="mt-[14.5px] flex flex-col gap-y-3">
                              <div className="flex items-center gap-x-[6.4px]">
                                <Clock className="size-[18px] shrink-0 text-primary-500" />

                                <span className="font-medium text-sm leading-none text-dark-blue-400">
                                  Starting from 12 weeks
                                </span>
                              </div>

                              <div className="flex items-center gap-x-[6.4px]">
                                <Clock className="size-[18px] shrink-0 text-primary-500" />

                                <span className="font-medium text-sm leading-none text-dark-blue-400">
                                  $50,000 budget
                                </span>
                              </div>
                            </div>

                            <div className="mt-5 flex items-center justify-between">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <AvatarGroup max={5} size="sm" excess>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                      <Avatar
                                        size="sm"
                                        className="border-2 border-white hover:ring-0 active:ring-0"
                                      >
                                        <AvatarImage
                                          src="/woman.jpg"
                                          alt="Woman"
                                        />
                                        <AvatarFallback>W</AvatarFallback>
                                      </Avatar>
                                    </AvatarGroup>
                                  </TooltipTrigger>

                                  <TooltipContent
                                    className="p-0 max-w-[262px]"
                                    size="md"
                                  >
                                    <ScrollArea
                                      className="h-[192px] p-3"
                                      scrollBar={
                                        <ScrollBar
                                          className="w-4 p-1"
                                          thumbClassName="bg-white/20"
                                        />
                                      }
                                    >
                                      <div className="space-y-3 pr-5">
                                        <div className="flex items-center gap-x-[18px]">
                                          <div className="flex items-center gap-x-2 flex-auto">
                                            <Avatar>
                                              <AvatarImage
                                                src="/woman.jpg"
                                                alt="Woman"
                                              />
                                              <AvatarFallback>W</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col flex-auto">
                                              <div className="flex items-center gap-x-0.5">
                                                <span className="text-xs leading-5 font-semibold text-white">
                                                  Sevil
                                                </span>
                                                <span className="text-[10px] leading-none font-light text-white">
                                                  @designsuperstar23
                                                </span>
                                              </div>
                                              <span className="text-[10px] font-light text-white">
                                                Full-stack Developer
                                              </span>
                                            </div>
                                          </div>

                                          <span className="text-sm font-semibold text-white leading-5">
                                            $75{" "}
                                            <span className="text-[10px] font-light leading-5">
                                              /hr
                                            </span>
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-x-[18px]">
                                          <div className="flex items-center gap-x-2 flex-auto">
                                            <Avatar>
                                              <AvatarImage
                                                src="/woman.jpg"
                                                alt="Woman"
                                              />
                                              <AvatarFallback>W</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col flex-auto">
                                              <div className="flex items-center gap-x-0.5">
                                                <span className="text-xs leading-5 font-semibold text-white">
                                                  Sevil
                                                </span>
                                                <span className="text-[10px] leading-none font-light text-white">
                                                  @designsuperstar23
                                                </span>
                                              </div>
                                              <span className="text-[10px] font-light text-white">
                                                Full-stack Developer
                                              </span>
                                            </div>
                                          </div>

                                          <span className="text-sm font-semibold text-white leading-5">
                                            $75{" "}
                                            <span className="text-[10px] font-light leading-5">
                                              /hr
                                            </span>
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-x-[18px]">
                                          <div className="flex items-center gap-x-2 flex-auto">
                                            <Avatar>
                                              <AvatarImage
                                                src="/woman.jpg"
                                                alt="Woman"
                                              />
                                              <AvatarFallback>W</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col flex-auto">
                                              <div className="flex items-center gap-x-0.5">
                                                <span className="text-xs leading-5 font-semibold text-white">
                                                  Sevil
                                                </span>
                                                <span className="text-[10px] leading-none font-light text-white">
                                                  @designsuperstar23
                                                </span>
                                              </div>
                                              <span className="text-[10px] font-light text-white">
                                                Full-stack Developer
                                              </span>
                                            </div>
                                          </div>

                                          <span className="text-sm font-semibold text-white leading-5">
                                            $75{" "}
                                            <span className="text-[10px] font-light leading-5">
                                              /hr
                                            </span>
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-x-[18px]">
                                          <div className="flex items-center gap-x-2 flex-auto">
                                            <Avatar>
                                              <AvatarImage
                                                src="/woman.jpg"
                                                alt="Woman"
                                              />
                                              <AvatarFallback>W</AvatarFallback>
                                            </Avatar>

                                            <div className="flex flex-col flex-auto">
                                              <div className="flex items-center gap-x-0.5">
                                                <span className="text-xs leading-5 font-semibold text-white">
                                                  Sevil
                                                </span>
                                                <span className="text-[10px] leading-none font-light text-white">
                                                  @designsuperstar23
                                                </span>
                                              </div>
                                              <span className="text-[10px] font-light text-white">
                                                Full-stack Developer
                                              </span>
                                            </div>
                                          </div>

                                          <span className="text-sm font-semibold text-white leading-5">
                                            $75{" "}
                                            <span className="text-[10px] font-light leading-5">
                                              /hr
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </ScrollArea>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider delayDuration={75}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span className="inline-block">
                                      <Favorite />
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Save to favorites
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </article>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="my-6">
                    <div className="flex items-center gap-x-1">
                      <span className="flex-auto inline-block h-px bg-gray-200" />
                      <Button variant="link" visual="gray">
                        View More
                      </Button>
                      <span className="flex-auto inline-block h-px bg-gray-200" />
                    </div>
                  </div>

                  <div className="p-6 rounded-lg bg-white shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)] border border-gray-200">
                    <h1 className="text-xl leading-none font-bold text-dark-blue-400">
                      Background
                    </h1>

                    <Tabs defaultValue="Work Experience" className="mt-6">
                      <RadixTabs.List className="inline-flex items-center gap-x-3">
                        <TabsTrigger
                          variant="unstyled"
                          showUnderline={false}
                          value="Work Experience"
                          className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                        >
                          Work Experience
                        </TabsTrigger>
                        <TabsTrigger
                          variant="unstyled"
                          showUnderline={false}
                          value="Education"
                          className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                        >
                          Education
                        </TabsTrigger>
                      </RadixTabs.List>

                      <TabsContent value="Work Experience">
                        <div className="pt-6">
                          <div className="flex gap-x-6">
                            <div className="relative flex flex-col items-center">
                              <div className="size-[55px] border border-gray-300 rounded-lg inline-flex shrink-0 justify-center items-center shadow-[0px_1px_4px_0px_rgba(0,0,0,.03)]">
                                <NextImage
                                  className="object-contain"
                                  src="/android.png"
                                  alt="Android"
                                  height={45}
                                  width={45}
                                />
                              </div>

                              <div className="absolute flex py-1.5 justify-center top-[55px] inset-x-0 bottom-0">
                                <span className="inline-block border-dashed border-[1.5px] border-gray-200" />
                              </div>
                            </div>

                            <div className="flex-auto">
                              <div className="pb-8">
                                <h1 className="text-base font-bold text-dark-blue-400 leading-none">
                                  Lead Front-End Developer
                                </h1>
                                <p className="text-[13px] mt-1.5 leading-none text-dark-blue-400">
                                  Android
                                </p>
                                <div className="mt-1.5 inline-flex items-center gap-x-2">
                                  <span className="text-xs leading-none text-dark-blue-400">
                                    December 2020 - Present
                                  </span>
                                  <span className="shrink-0 size-1 rounded-full inline-block" />
                                  <span className="text-xs leading-none font-semibold text-dark-blue-400">
                                    5 yrs 2 mos
                                  </span>
                                </div>
                                <p className="mt-3 text-sm leading-none font-extralight line-clamp-4 text-gray-700">
                                  Lorem ipsum dolor sit amet consectetur. Cursus
                                  vitae purus in convallis nulla arcu sed. Diam
                                  pellentesque ornare nec consectetur maecenas
                                  leo lectus. Risus nunc sit urna neque volutpat
                                  at sed. Tortor integer faucibus sed viverra
                                  malesuada ornare tellus enim sollicitudin. Id
                                  odio porttitor interdum nulla. Lorem ipsum
                                  dolor sit amet consectetur{" "}
                                  <Button
                                    className="hover:text-gray-700 font-semibold"
                                    visual="gray"
                                    variant="link"
                                  >
                                    ...Read More
                                  </Button>
                                </p>

                                <div className="mt-3 flex items-center justify-between">
                                  <div className="flex flex-auto items-center gap-x-3">
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="pb-8">
                                <h1 className="text-base font-bold text-dark-blue-400 leading-none">
                                  Lead Front-End Developer
                                </h1>
                                <p className="text-[13px] mt-1.5 leading-none text-dark-blue-400">
                                  Android
                                </p>
                                <div className="mt-1.5 inline-flex items-center gap-x-2">
                                  <span className="text-xs leading-none text-dark-blue-400">
                                    December 2020 - Present
                                  </span>
                                  <span className="shrink-0 size-1 rounded-full inline-block" />
                                  <span className="text-xs leading-none font-semibold text-dark-blue-400">
                                    5 yrs 2 mos
                                  </span>
                                </div>
                                <p className="mt-3 text-sm leading-none font-extralight line-clamp-4 text-gray-700">
                                  Lorem ipsum dolor sit amet consectetur. Cursus
                                  vitae purus in convallis nulla arcu sed. Diam
                                  pellentesque ornare nec consectetur maecenas
                                  leo lectus. Risus nunc sit urna neque volutpat
                                  at sed. Tortor integer faucibus sed viverra
                                  malesuada ornare tellus enim sollicitudin. Id
                                  odio porttitor interdum nulla. Lorem ipsum
                                  dolor sit amet consectetur{" "}
                                  <Button
                                    className="hover:text-gray-700 font-semibold"
                                    visual="gray"
                                    variant="link"
                                  >
                                    ...Read More
                                  </Button>
                                </p>

                                <div className="mt-3 flex items-center justify-between">
                                  <div className="flex flex-auto items-center gap-x-3">
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-x-6">
                            <div className="relative flex flex-col items-center">
                              <div className="size-[55px] border border-gray-300 rounded-lg inline-flex shrink-0 justify-center items-center shadow-[0px_1px_4px_0px_rgba(0,0,0,.03)]">
                                <NextImage
                                  className="object-contain"
                                  src="/android.png"
                                  alt="Android"
                                  height={45}
                                  width={45}
                                />
                              </div>

                              <div className="absolute flex py-1.5 justify-center top-[55px] inset-x-0 bottom-0">
                                <span className="inline-block border-dashed border-[1.5px] border-gray-200" />
                              </div>
                            </div>

                            <div className="flex-auto">
                              <div className="pb-8">
                                <h1 className="text-base font-bold text-dark-blue-400 leading-none">
                                  Lead Front-End Developer
                                </h1>
                                <p className="text-[13px] mt-1.5 leading-none text-dark-blue-400">
                                  Android
                                </p>
                                <div className="mt-1.5 inline-flex items-center gap-x-2">
                                  <span className="text-xs leading-none text-dark-blue-400">
                                    December 2020 - Present
                                  </span>
                                  <span className="shrink-0 size-1 rounded-full inline-block" />
                                  <span className="text-xs leading-none font-semibold text-dark-blue-400">
                                    5 yrs 2 mos
                                  </span>
                                </div>
                                <p className="mt-3 text-sm leading-none font-extralight line-clamp-4 text-gray-700">
                                  Lorem ipsum dolor sit amet consectetur. Cursus
                                  vitae purus in convallis nulla arcu sed. Diam
                                  pellentesque ornare nec consectetur maecenas
                                  leo lectus. Risus nunc sit urna neque volutpat
                                  at sed. Tortor integer faucibus sed viverra
                                  malesuada ornare tellus enim sollicitudin. Id
                                  odio porttitor interdum nulla. Lorem ipsum
                                  dolor sit amet consectetur{" "}
                                  <Button
                                    className="hover:text-gray-700 font-semibold"
                                    visual="gray"
                                    variant="link"
                                  >
                                    ...Read More
                                  </Button>
                                </p>

                                <div className="mt-3 flex items-center justify-between">
                                  <div className="flex flex-auto items-center gap-x-3">
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                  </div>
                                </div>
                              </div>

                              <div className="pb-8">
                                <h1 className="text-base font-bold text-dark-blue-400 leading-none">
                                  Lead Front-End Developer
                                </h1>
                                <p className="text-[13px] mt-1.5 leading-none text-dark-blue-400">
                                  Android
                                </p>
                                <div className="mt-1.5 inline-flex items-center gap-x-2">
                                  <span className="text-xs leading-none text-dark-blue-400">
                                    December 2020 - Present
                                  </span>
                                  <span className="shrink-0 size-1 rounded-full inline-block" />
                                  <span className="text-xs leading-none font-semibold text-dark-blue-400">
                                    5 yrs 2 mos
                                  </span>
                                </div>
                                <p className="mt-3 text-sm leading-none font-extralight line-clamp-4 text-gray-700">
                                  Lorem ipsum dolor sit amet consectetur. Cursus
                                  vitae purus in convallis nulla arcu sed. Diam
                                  pellentesque ornare nec consectetur maecenas
                                  leo lectus. Risus nunc sit urna neque volutpat
                                  at sed. Tortor integer faucibus sed viverra
                                  malesuada ornare tellus enim sollicitudin. Id
                                  odio porttitor interdum nulla. Lorem ipsum
                                  dolor sit amet consectetur{" "}
                                  <Button
                                    className="hover:text-gray-700 font-semibold"
                                    visual="gray"
                                    variant="link"
                                  >
                                    ...Read More
                                  </Button>
                                </p>

                                <div className="mt-3 flex items-center justify-between">
                                  <div className="flex flex-auto items-center gap-x-3">
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                    <Badge visual="gray">Sketch App</Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex mt-6 items-center justify-center">
                          <Button variant="link" visual="gray">
                            View More
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="Education">
                        <div className="pt-6">
                          <div className="flex pb-5 items-start gap-x-6">
                            <div className="size-[55px] p-[5px] relative shrink-0 rounded-lg overflow-hidden border border-gray-200">
                              <NextImage
                                className="object-cover"
                                src="/university-of-florida.png"
                                alt="University Of Florida"
                                fill
                                sizes="20vw"
                              />
                            </div>

                            <div className="flex-auto">
                              <h1 className="text-base leading-none font-bold text-dark-blue-400">
                                University of Florida
                              </h1>
                              <div className="mt-1.5 flex items-center gap-x-2">
                                <span className="text-dark-blue-400 text-xs leading-none">
                                  Master of Science
                                </span>
                                <span className="text-dark-blue-400 font-semibold text-xs leading-none">
                                  Computer Science
                                </span>
                              </div>
                              <div className="mt-1.5">
                                <span className="text-dark-blue-400 text-xs leading-none">
                                  August 2012 - September 2014
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex pb-5 items-start gap-x-6">
                            <div className="size-[55px] p-[5px] relative shrink-0 rounded-lg overflow-hidden border border-gray-200">
                              <NextImage
                                className="object-cover"
                                src="/university-of-florida.png"
                                alt="University Of Florida"
                                fill
                                sizes="20vw"
                              />
                            </div>

                            <div className="flex-auto">
                              <h1 className="text-base leading-none font-bold text-dark-blue-400">
                                University of Florida
                              </h1>
                              <div className="mt-1.5 flex items-center gap-x-2">
                                <span className="text-dark-blue-400 text-xs leading-none">
                                  Master of Science
                                </span>
                                <span className="text-dark-blue-400 font-semibold text-xs leading-none">
                                  Computer Science
                                </span>
                              </div>
                              <div className="mt-1.5">
                                <span className="text-dark-blue-400 text-xs leading-none">
                                  August 2012 - September 2014
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex pb-5 items-start gap-x-6">
                            <div className="size-[55px] p-[5px] relative shrink-0 rounded-lg overflow-hidden border border-gray-200">
                              <NextImage
                                className="object-cover"
                                src="/university-of-florida.png"
                                alt="University Of Florida"
                                fill
                                sizes="20vw"
                              />
                            </div>

                            <div className="flex-auto">
                              <h1 className="text-base leading-none font-bold text-dark-blue-400">
                                University of Florida
                              </h1>
                              <div className="mt-1.5 flex items-center gap-x-2">
                                <span className="text-dark-blue-400 text-xs leading-none">
                                  Master of Science
                                </span>
                                <span className="text-dark-blue-400 font-semibold text-xs leading-none">
                                  Computer Science
                                </span>
                              </div>
                              <div className="mt-1.5">
                                <span className="text-dark-blue-400 text-xs leading-none">
                                  August 2012 - September 2014
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex pb-5 items-start gap-x-6">
                            <div className="size-[55px] p-[5px] relative shrink-0 rounded-lg overflow-hidden border border-gray-200">
                              <NextImage
                                className="object-cover"
                                src="/university-of-florida.png"
                                alt="University Of Florida"
                                fill
                                sizes="20vw"
                              />
                            </div>

                            <div className="flex-auto">
                              <h1 className="text-base leading-none font-bold text-dark-blue-400">
                                University of Florida
                              </h1>
                              <div className="mt-1.5 flex items-center gap-x-2">
                                <span className="text-dark-blue-400 text-xs leading-none">
                                  Master of Science
                                </span>
                                <span className="text-dark-blue-400 font-semibold text-xs leading-none">
                                  Computer Science
                                </span>
                              </div>
                              <div className="mt-1.5">
                                <span className="text-dark-blue-400 text-xs leading-none">
                                  August 2012 - September 2014
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="link" visual="gray">
                          2 More...
                        </Button>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="mt-6">
                    <div className="border border-gray-200 rounded-t-lg bg-white shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)] py-5 pl-5 pr-6">
                      <Carousel
                        opts={{
                          align: "start",
                        }}
                        className="w-full"
                      >
                        <CarouselContent>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <CarouselItem
                              key={index}
                              className="basis-[20%] h-[108px]"
                            >
                              <div className="p-1 size-full bg-gray-200 relative rounded-lg overflow-hidden">
                                <NextImage src="/cpu.png" alt="CPU" fill />
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>

                        <CarouselPreviousTrigger />
                        <CarouselNextTrigger />
                      </Carousel>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs leading-none font-extralight text-dark-blue-400">
                          Client project images
                        </span>

                        <Button variant="link" visual="gray">
                          View All
                        </Button>
                      </div>
                    </div>

                    <div className="p-8 border-x gap-x-[50px] border-b flex items-start rounded-b-lg border-gray-200 bg-white shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                      <div className="flex flex-col flex-1 gap-y-1.5 basis-[147px]">
                        <h1 className="text-xl leading-none text-nowrap font-bold text-dark-blue-400">
                          Project History
                        </h1>

                        <RatingGroupRoot
                          className="flex-row gap-x-1.5 mt-1.5"
                          allowHalf
                          count={5}
                          defaultValue={4}
                          disabled
                        >
                          <RatingGroupLabel size="sm">4.9</RatingGroupLabel>
                          <RatingGroupControl>
                            <RatingGroupContext>
                              {({ items }) =>
                                items.map((item) => (
                                  <RatingGroupItem key={item} index={item}>
                                    <RatingGroupItemContext>
                                      {({ half }) =>
                                        half ? <TbStarHalfFilled /> : <TbStar />
                                      }
                                    </RatingGroupItemContext>
                                  </RatingGroupItem>
                                ))
                              }
                            </RatingGroupContext>
                            <RatingGroupHiddenInput />
                          </RatingGroupControl>
                        </RatingGroupRoot>

                        <NextLink
                          href="#"
                          className="focus-visible:outline-none text-xs leading-6 transition duration-300 hover:underline text-dark-blue-400"
                        >
                          23 ratings
                        </NextLink>
                      </div>

                      <div className="flex flex-col flex-1 gap-y-1 basis-[304px]">
                        <div className="flex items-center gap-x-2">
                          <NextLink
                            href="#"
                            className="hover:underline focus-visible:outline-none text-xs font-semibold text-dark-blue-400"
                          >
                            5
                          </NextLink>
                          <Progress className="flex-auto" value={100} />
                          <NextLink
                            href="#"
                            className="hover:underline focus-visible:outline-none text-xs font-semibold leading-[21px] inline-flex items-center gap-x-1 text-dark-blue-400"
                          >
                            100% <span className="font-extralight">(100)</span>
                          </NextLink>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <NextLink
                            href="#"
                            className="hover:underline focus-visible:outline-none text-xs font-semibold text-dark-blue-400"
                          >
                            4
                          </NextLink>
                          <Progress className="flex-auto" value={75} />
                          <NextLink
                            href="#"
                            className="hover:underline focus-visible:outline-none text-xs font-semibold leading-[21px] inline-flex items-center gap-x-1 text-dark-blue-400"
                          >
                            75% <span className="font-extralight">(75)</span>
                          </NextLink>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <NextLink
                            href="#"
                            className="hover:underline focus-visible:outline-none text-xs font-semibold text-dark-blue-400"
                          >
                            3
                          </NextLink>
                          <Progress className="flex-auto" value={50} />
                          <NextLink
                            href="#"
                            className="hover:underline focus-visible:outline-none text-xs font-semibold leading-[21px] inline-flex items-center gap-x-1 text-dark-blue-400"
                          >
                            50% <span className="font-extralight">(50)</span>
                          </NextLink>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <NextLink
                            href="#"
                            className="hover:underline focus-visible:outline-none text-xs font-semibold text-dark-blue-400"
                          >
                            2
                          </NextLink>
                          <Progress className="flex-auto" value={25} />
                          <NextLink
                            href="#"
                            className="hover:underline focus-visible:outline-none text-xs font-semibold leading-[21px] inline-flex items-center gap-x-1 text-dark-blue-400"
                          >
                            25% <span className="font-extralight">(25)</span>
                          </NextLink>
                        </div>
                        <div className="flex items-center gap-x-2">
                          <NextLink
                            href="#"
                            className="hover:underline focus-visible:outline-none text-xs font-semibold text-dark-blue-400"
                          >
                            1
                          </NextLink>
                          <Progress className="flex-auto" value={0} />
                          <NextLink
                            href="#"
                            className="hover:underline focus-visible:outline-none text-xs font-semibold leading-[21px] inline-flex items-center gap-x-1 text-dark-blue-400"
                          >
                            0% <span className="font-extralight">(0)</span>
                          </NextLink>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col basis-[304px]">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <NextLink
                              href="#"
                              className="focus-visible:outline-none text-xs leading-5 font-semibold underline text-gray-500 hover:text-gray-600"
                            >
                              Communication Level
                            </NextLink>

                            <div className="flex items-center gap-x-1">
                              <Star className="size-3.5 text-primary-500 fill-primary-500" />
                              <span className="text-[13px] leading-none font-medium">
                                4.3
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <NextLink
                              href="#"
                              className="focus-visible:outline-none text-xs leading-5 font-semibold underline text-gray-500 hover:text-gray-600"
                            >
                              Responsiveness
                            </NextLink>

                            <div className="flex items-center gap-x-1">
                              <Star className="size-3.5 text-primary-500 fill-primary-500" />
                              <span className="text-[13px] leading-none font-medium">
                                4.3
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <NextLink
                              href="#"
                              className="focus-visible:outline-none text-xs leading-5 font-semibold underline text-gray-500 hover:text-gray-600"
                            >
                              Quality of Delivery
                            </NextLink>

                            <div className="flex items-center gap-x-1">
                              <Star className="size-3.5 text-primary-500 fill-primary-500" />
                              <span className="text-[13px] leading-none font-medium">
                                4.3
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <NextLink
                              href="#"
                              className="focus-visible:outline-none text-xs leading-5 font-semibold underline text-gray-500 hover:text-gray-600"
                            >
                              Value of Delivery
                            </NextLink>

                            <div className="flex items-center gap-x-1">
                              <Star className="size-3.5 text-primary-500 fill-primary-500" />
                              <span className="text-[13px] leading-none font-medium">
                                4.3
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <NextLink
                              href="#"
                              className="focus-visible:outline-none text-xs leading-5 font-semibold underline text-gray-500 hover:text-gray-600"
                            >
                              Value of Delivery
                            </NextLink>

                            <div className="flex items-center gap-x-1">
                              <Star className="size-3.5 text-primary-500 fill-primary-500" />
                              <span className="text-[13px] leading-none font-medium">
                                4.9
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Tabs defaultValue="Completed">
                      <RadixTabs.List className="flex items-center justify-between">
                        <div className="flex items-center gap-x-3">
                          <TabsTrigger
                            variant="unstyled"
                            showUnderline={false}
                            value="Completed"
                            className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                          >
                            Completed (24)
                          </TabsTrigger>
                          <TabsTrigger
                            variant="unstyled"
                            showUnderline={false}
                            value="Ongoing"
                            className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                          >
                            Ongoing (7)
                          </TabsTrigger>
                        </div>

                        <div className="inline-flex items-center gap-x-3">
                          <InputGroup className="shrink-0 w-[220px]">
                            <Input
                              id="email"
                              type="email"
                              className="peer text-sm leading-5 h-10 right-3 pl-[34px]"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                              placeholder="Search"
                            />
                            <InputLeftElement className="text-gray-400 peer-focus:text-primary-500">
                              <SearchMd className="size-4" />
                            </InputLeftElement>
                            {email ? (
                              <InputRightElement>
                                <button
                                  className="focus-visible:outline-none inline-block"
                                  onClick={() => setEmail("")}
                                >
                                  <XCircle className="size-4 text-gray-500/50 hover:text-gray-500" />
                                </button>
                              </InputRightElement>
                            ) : null}
                          </InputGroup>

                          <Listbox className="shrink-0 w-max">
                            <ListboxButton
                              className="w-max text-sm h-10"
                              placeholder="Most Recent"
                            />
                            <ListboxOptions className="w-[177px] right-0">
                              {[
                                "Most Recent",
                                "Oldest",
                                "Highest Rating",
                                "Lowest Rating",
                              ].map((option) => (
                                <ListboxOption
                                  className="font-medium text-gray-700"
                                  key={option}
                                  value={option}
                                >
                                  {option}
                                </ListboxOption>
                              ))}
                            </ListboxOptions>
                          </Listbox>
                        </div>
                      </RadixTabs.List>
                      <TabsContent value="Completed">
                        <ShowMoreLess
                          value={showMore}
                          onValueChange={toggleShowMore}
                        >
                          <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                            <div className="flex items-center pt-6 px-6">
                              <div className="flex-1 w-[394px] space-y-3">
                                <div className="flex items-start gap-x-3">
                                  <Avatar size="md">
                                    <AvatarImage src="/man.jpg" alt="Man" />
                                    <AvatarFallback>M</AvatarFallback>
                                  </Avatar>

                                  <div className="space-y-3">
                                    <div className="flex flex-col gap-y-1.5">
                                      <div className="inline-flex items-center gap-x-1">
                                        <span className="text-base leading-6 font-semibold text-dark-blue-400">
                                          Emily
                                        </span>
                                        <span className="text-base leading-6 text-dark-blue-400">
                                          @emily.j
                                        </span>
                                      </div>

                                      <div className="mt-1.5">
                                        <span className="text-[13px] leading-6 text-dark-blue-400">
                                          Product Manager
                                        </span>
                                      </div>
                                    </div>

                                    <div className="inline-flex items-center gap-x-2">
                                      <span className="text-xs leading-none text-dark-blue-400">
                                        December 2020 - Present
                                      </span>
                                      <span className="shrink-0 size-1 rounded-full bg-gray-300 inline-block" />
                                      <span className="text-xs leading-none text-dark-blue-400">
                                        5 yrs 2 mos
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-x-2">
                                  <div className="inline-flex items-center gap-x-[2.35px]">
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                  </div>

                                  <span className="text-base leading-[28.16px] font-bold text-dark-blue-400">
                                    4.8
                                  </span>

                                  <span className="text-[11px] leading-6 font-extralight text-dark-blue-400">
                                    Posted a week ago
                                  </span>
                                </div>
                              </div>

                              <div className="flex-1 w-[477px] inline-grid grid-cols-2 gap-y-4 gap-x-[50px] pb-3">
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 px-6">
                              <h1 className="text-sm leading-6 font-semibold text-dark-blue-400">
                                Best Experience with a Backend Engineer!!!!
                              </h1>
                              <p className="text-sm leading-none mt-1 text-gray-700 line-clamp-3 font-extralight">
                                Lorem ipsum dolor sit amet consectetur. Mi eu
                                ipsum augue in integer lacus amet semper. Non
                                dictum phasellus elit turpis nisi vitae et.
                                Tristique ultrices habitasse tortor vehicula
                                elementum. Nulla turpis rhoncus venenatis at. In
                                porta viverra faucibus posuere{" "}
                                <Button
                                  className="hover:text-gray-700 font-semibold"
                                  size="sm"
                                  variant="link"
                                  visual="gray"
                                >
                                  ...Read More
                                </Button>
                              </p>

                              <div className="mt-3 flex items-center justify-between">
                                <div className="items-center inline-flex gap-x-2.5">
                                  <span className="text-xs font-medium leading-none text-dark-blue-400">
                                    Helpful
                                  </span>
                                  <ThumbsUpToggle />
                                  <ThumbsDownToggle />
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex items-center gap-x-3 px-6 pb-6">
                              <div className="w-[153px] relative rounded-lg overflow-hidden h-[98px]">
                                <NextImage
                                  className="object-cover"
                                  src="/dashboard.png"
                                  alt="Dashboard"
                                  fill
                                  sizes="25vw"
                                />
                              </div>

                              <div className="flex-auto space-y-3">
                                <h1 className="text-sm font-bold leading-6 text-dark-blue-400">
                                  Seniority Mobile App
                                </h1>

                                <div className="flex gap-x-8 items-center">
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-sm text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                    <span className="text-sm font-bold text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                  </div>
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-sm text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                    <span className="text-sm font-bold text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                  </div>
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-sm text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                    <span className="text-sm font-bold text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-x-2">
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                            <div className="flex items-center pt-6 px-6">
                              <div className="flex-1 w-[394px] space-y-3">
                                <div className="flex items-start gap-x-3">
                                  <Avatar size="md">
                                    <AvatarImage src="/man.jpg" alt="Man" />
                                    <AvatarFallback>M</AvatarFallback>
                                  </Avatar>

                                  <div className="space-y-3">
                                    <div className="flex flex-col gap-y-1.5">
                                      <div className="inline-flex items-center gap-x-1">
                                        <span className="text-base leading-6 font-semibold text-dark-blue-400">
                                          Emily
                                        </span>
                                        <span className="text-base leading-6 text-dark-blue-400">
                                          @emily.j
                                        </span>
                                      </div>

                                      <div className="mt-1.5">
                                        <span className="text-[13px] leading-6 text-dark-blue-400">
                                          Product Manager
                                        </span>
                                      </div>
                                    </div>

                                    <div className="inline-flex items-center gap-x-2">
                                      <span className="text-xs leading-none text-dark-blue-400">
                                        December 2020 - Present
                                      </span>
                                      <span className="shrink-0 size-1 rounded-full bg-gray-300 inline-block" />
                                      <span className="text-xs leading-none text-dark-blue-400">
                                        5 yrs 2 mos
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-x-2">
                                  <div className="inline-flex items-center gap-x-[2.35px]">
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                  </div>

                                  <span className="text-base leading-[28.16px] font-bold text-dark-blue-400">
                                    4.8
                                  </span>

                                  <span className="text-[11px] leading-6 font-extralight text-dark-blue-400">
                                    Posted a week ago
                                  </span>
                                </div>
                              </div>

                              <div className="flex-1 w-[477px] inline-grid grid-cols-2 gap-y-4 gap-x-[50px] pb-3">
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 px-6">
                              <h1 className="text-sm leading-6 font-semibold text-dark-blue-400">
                                Best Experience with a Backend Engineer!!!!
                              </h1>
                              <p className="text-sm leading-none mt-1 text-gray-700 line-clamp-3 font-extralight">
                                Lorem ipsum dolor sit amet consectetur. Mi eu
                                ipsum augue in integer lacus amet semper. Non
                                dictum phasellus elit turpis nisi vitae et.
                                Tristique ultrices habitasse tortor vehicula
                                elementum. Nulla turpis rhoncus venenatis at. In
                                porta viverra faucibus posuere{" "}
                                <Button
                                  className="hover:text-gray-700 font-semibold"
                                  size="sm"
                                  variant="link"
                                  visual="gray"
                                >
                                  ...Read More
                                </Button>
                              </p>

                              <div className="mt-3 flex items-center justify-between">
                                <div className="items-center inline-flex gap-x-2.5">
                                  <span className="text-xs font-medium leading-none text-dark-blue-400">
                                    Helpful
                                  </span>

                                  <ThumbsUpToggle />
                                  <ThumbsDownToggle />
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex items-center gap-x-3 px-6 pb-6">
                              <div className="w-[153px] relative rounded-lg overflow-hidden h-[98px]">
                                <NextImage
                                  className="object-cover"
                                  src="/dashboard.png"
                                  alt="Dashboard"
                                  fill
                                  sizes="25vw"
                                />
                              </div>

                              <div className="flex-auto space-y-3">
                                <h1 className="text-sm font-bold leading-6 text-dark-blue-400">
                                  Seniority Mobile App
                                </h1>

                                <div className="flex gap-x-8 items-center">
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-sm text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                    <span className="text-sm font-bold text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                  </div>
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-sm text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                    <span className="text-sm font-bold text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                  </div>
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-sm text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                    <span className="text-sm font-bold text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-x-2">
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="p-6 bg-white border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)] border-t">
                              <div className="flex items-center gap-x-3">
                                <Avatar
                                  className="hover:ring-0 active:ring-primary-100"
                                  size="md"
                                >
                                  <AvatarImage src="/man.jpg" alt="Man" />
                                  <AvatarFallbackIcon />
                                </Avatar>

                                <div className="flex flex-col flex-1">
                                  <div className="inline-flex items-center gap-x-1">
                                    <span className="text-sm leading-6 font-bold text-dark-blue-400">
                                      Company Response
                                    </span>
                                    <span className="text-sm leading-6 text-dark-blue-400">
                                      @Acme Inc.
                                    </span>
                                  </div>

                                  <div className="inline-flex items-center gap-x-2">
                                    <span className="text-xs leading-none text-dark-blue-400">
                                      90 days project
                                    </span>
                                    <span className="shrink-0 size-1 rounded-full bg-gray-300 inline-block" />
                                    <span className="text-xs leading-none text-dark-blue-400">
                                      March 2023
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <p className="text-sm font-extralight mt-3 leading-none text-gray-700">
                                Lorem ipsum dolor sit amet consectetur. Mi eu
                                ipsum augue in integer lacus amet semper. Non
                                dictum phasellus elit turpis nisi vitae et.
                                Tristique ultrices habitasse tortor vehicula
                                elementum. Nulla turpis rhoncus venenatis at. In
                                porta viverra faucibus po{" "}
                                <Button
                                  className="hover:text-gray-700 font-semibold"
                                  size="sm"
                                  variant="link"
                                  visual="gray"
                                >
                                  ...Read More
                                </Button>
                              </p>

                              <div className="mt-3 flex items-center justify-between">
                                <div className="items-center inline-flex gap-x-2.5">
                                  <span className="text-xs font-medium leading-none text-dark-blue-400">
                                    Helpful
                                  </span>
                                  <ThumbsUpToggle />
                                  <ThumbsDownToggle />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                            <div className="flex items-center pt-6 px-6">
                              <div className="flex-1 w-[394px] space-y-3">
                                <div className="flex items-start gap-x-3">
                                  <Avatar size="md">
                                    <AvatarImage src="/man.jpg" alt="Man" />
                                    <AvatarFallback>M</AvatarFallback>
                                  </Avatar>

                                  <div className="space-y-3">
                                    <div className="flex flex-col gap-y-1.5">
                                      <div className="inline-flex items-center gap-x-1">
                                        <span className="text-base leading-6 font-semibold text-dark-blue-400">
                                          Emily
                                        </span>
                                        <span className="text-base leading-6 text-dark-blue-400">
                                          @emily.j
                                        </span>
                                      </div>

                                      <div className="mt-1.5">
                                        <span className="text-[13px] leading-6 text-dark-blue-400">
                                          Product Manager
                                        </span>
                                      </div>
                                    </div>

                                    <div className="inline-flex items-center gap-x-2">
                                      <span className="text-xs leading-none text-dark-blue-400">
                                        December 2020 - Present
                                      </span>
                                      <span className="shrink-0 size-1 rounded-full bg-gray-300 inline-block" />
                                      <span className="text-xs leading-none text-dark-blue-400">
                                        5 yrs 2 mos
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-x-2">
                                  <div className="inline-flex items-center gap-x-[2.35px]">
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                  </div>

                                  <span className="text-base leading-[28.16px] font-bold text-dark-blue-400">
                                    4.8
                                  </span>

                                  <span className="text-[11px] leading-6 font-extralight text-dark-blue-400">
                                    Posted a week ago
                                  </span>
                                </div>
                              </div>

                              <div className="flex-1 w-[477px] inline-grid grid-cols-2 gap-y-4 gap-x-[50px] pb-3">
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 px-6">
                              <h1 className="text-sm leading-6 font-semibold text-dark-blue-400">
                                Best Experience with a Backend Engineer!!!!
                              </h1>
                              <p className="text-sm leading-none mt-1 text-gray-700 line-clamp-3 font-extralight">
                                Lorem ipsum dolor sit amet consectetur. Mi eu
                                ipsum augue in integer lacus amet semper. Non
                                dictum phasellus elit turpis nisi vitae et.
                                Tristique ultrices habitasse tortor vehicula
                                elementum. Nulla turpis rhoncus venenatis at. In
                                porta viverra faucibus posuere{" "}
                                <Button
                                  className="hover:text-gray-700 font-semibold"
                                  size="sm"
                                  variant="link"
                                  visual="gray"
                                >
                                  ...Read More
                                </Button>
                              </p>

                              <div className="mt-3 flex items-center justify-between">
                                <div className="items-center inline-flex gap-x-2.5">
                                  <span className="text-xs font-medium leading-none text-dark-blue-400">
                                    Helpful
                                  </span>

                                  <ThumbsUpToggle />
                                  <ThumbsDownToggle />
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex items-center gap-x-3 px-6 pb-6">
                              <div className="w-[153px] relative rounded-lg overflow-hidden h-[98px]">
                                <NextImage
                                  className="object-cover"
                                  src="/dashboard.png"
                                  alt="Dashboard"
                                  fill
                                  sizes="25vw"
                                />
                              </div>

                              <div className="flex-auto space-y-3">
                                <h1 className="text-sm font-bold leading-6 text-dark-blue-400">
                                  Seniority Mobile App
                                </h1>

                                <div className="flex gap-x-8 items-center">
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-sm text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                    <span className="text-sm font-bold text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                  </div>
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-sm text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                    <span className="text-sm font-bold text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                  </div>
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-sm text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                    <span className="text-sm font-bold text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-x-2">
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                            <div className="flex items-center pt-6 px-6">
                              <div className="flex-1 w-[394px] space-y-3">
                                <div className="flex items-start gap-x-3">
                                  <Avatar size="md">
                                    <AvatarImage src="/man.jpg" alt="Man" />
                                    <AvatarFallback>M</AvatarFallback>
                                  </Avatar>

                                  <div className="space-y-3">
                                    <div className="flex flex-col gap-y-1.5">
                                      <div className="inline-flex items-center gap-x-1">
                                        <span className="text-base leading-6 font-semibold text-dark-blue-400">
                                          Emily
                                        </span>
                                        <span className="text-base leading-6 text-dark-blue-400">
                                          @emily.j
                                        </span>
                                      </div>

                                      <div className="mt-1.5">
                                        <span className="text-[13px] leading-6 text-dark-blue-400">
                                          Product Manager
                                        </span>
                                      </div>
                                    </div>

                                    <div className="inline-flex items-center gap-x-2">
                                      <span className="text-xs leading-none text-dark-blue-400">
                                        December 2020 - Present
                                      </span>
                                      <span className="shrink-0 size-1 rounded-full bg-gray-300 inline-block" />
                                      <span className="text-xs leading-none text-dark-blue-400">
                                        5 yrs 2 mos
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center gap-x-2">
                                  <div className="inline-flex items-center gap-x-[2.35px]">
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                    <Favorite
                                      defaultPressed
                                      className="size-[15px]"
                                    />
                                  </div>

                                  <span className="text-base leading-[28.16px] font-bold text-dark-blue-400">
                                    4.8
                                  </span>

                                  <span className="text-[11px] leading-6 font-extralight text-dark-blue-400">
                                    Posted a week ago
                                  </span>
                                </div>
                              </div>

                              <div className="flex-1 w-[477px] inline-grid grid-cols-2 gap-y-4 gap-x-[50px] pb-3">
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                                <div className="flex items-center gap-x-[6.4px]">
                                  <CheckCircle className="size-[18px] text-success-500" />
                                  <span className="text-sm text-dark-blue-400 leading-none font-medium">
                                    Would Recommend
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="mt-3 px-6">
                              <h1 className="text-sm leading-6 font-semibold text-dark-blue-400">
                                Best Experience with a Backend Engineer!!!!
                              </h1>
                              <p className="text-sm leading-none mt-1 text-gray-700 line-clamp-3 font-extralight">
                                Lorem ipsum dolor sit amet consectetur. Mi eu
                                ipsum augue in integer lacus amet semper. Non
                                dictum phasellus elit turpis nisi vitae et.
                                Tristique ultrices habitasse tortor vehicula
                                elementum. Nulla turpis rhoncus venenatis at. In
                                porta viverra faucibus posuere{" "}
                                <Button
                                  className="hover:text-gray-700 font-semibold"
                                  size="sm"
                                  variant="link"
                                  visual="gray"
                                >
                                  ...Read More
                                </Button>
                              </p>

                              <div className="mt-3 flex items-center justify-between">
                                <div className="items-center inline-flex gap-x-2.5">
                                  <span className="text-xs font-medium leading-none text-dark-blue-400">
                                    Helpful
                                  </span>

                                  <ThumbsUpToggle />
                                  <ThumbsDownToggle />
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex items-center gap-x-3 px-6 pb-6">
                              <div className="w-[153px] relative rounded-lg overflow-hidden h-[98px]">
                                <NextImage
                                  className="object-cover"
                                  src="/dashboard.png"
                                  alt="Dashboard"
                                  fill
                                  sizes="25vw"
                                />
                              </div>

                              <div className="flex-auto space-y-3">
                                <h1 className="text-sm font-bold leading-6 text-dark-blue-400">
                                  Seniority Mobile App
                                </h1>

                                <div className="flex gap-x-8 items-center">
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-sm text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                    <span className="text-sm font-bold text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                  </div>
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-sm text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                    <span className="text-sm font-bold text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                  </div>
                                  <div className="inline-flex items-center gap-x-3">
                                    <span className="text-sm text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                    <span className="text-sm font-bold text-dark-blue-400 leading-6">
                                      Project Cost
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-x-2">
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                  <Badge size="sm" visual="gray">
                                    Team player
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </ShowMoreLess>

                        <div className="flex items-center justify-end mt-6">
                          <Button
                            size="md"
                            visual="gray"
                            variant="outlined"
                            className="bg-white"
                            onClick={toggleShowMore}
                          >
                            {showMore ? (
                              <>
                                Show less <ChevronUp className="size-[15px]" />
                              </>
                            ) : (
                              "Show More Feedback (1)"
                            )}
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="Ongoing">
                        <div className="mt-6 space-y-6">
                          <article className="border p-6 rounded-lg bg-white border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                            <div className="flex items-start gap-x-4">
                              <div className="relative overflow-hidden rounded-md shrink-0 w-[134px] h-[86px]">
                                <NextImage
                                  src="/dashboard.png"
                                  alt="Dashboard"
                                  fill
                                  sizes="25vw"
                                />
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center gap-x-2">
                                  <h1 className="text-sm font-bold text-dark-blue-400">
                                    Seniority Mobile App
                                  </h1>
                                  <Badge
                                    className="border rounded-[3.15px] bg-white border-gray-300"
                                    visual="gray"
                                    variant="rounded"
                                  >
                                    <FileText className="size-[9.46px] text-primary-500" />{" "}
                                    Under NDA
                                  </Badge>
                                </div>

                                <div className="mt-2 flex items-center gap-x-6">
                                  <div className="flex gap-x-3">
                                    <span className="text-xs leading-6 text-dark-blue-400">
                                      Estimated Project Cost
                                    </span>
                                    <span className="font-bold text-sm leading-6 text-dark-blue-400">
                                      $25,000
                                    </span>
                                  </div>
                                  <div className="flex gap-x-3">
                                    <span className="text-xs leading-6 text-dark-blue-400">
                                      Project Type
                                    </span>
                                    <span className="font-bold text-sm leading-6 text-dark-blue-400">
                                      Cloud Software
                                    </span>
                                  </div>
                                  <div className="flex gap-x-3">
                                    <span className="text-xs leading-6 text-dark-blue-400">
                                      Current Phase
                                    </span>
                                    <span className="font-bold text-sm leading-6 text-dark-blue-400">
                                      Development
                                    </span>
                                  </div>
                                </div>

                                <div className="mt-2 flex items-center gap-x-2">
                                  <Badge>API-Driven</Badge>
                                  <Badge>Agile Workflow</Badge>
                                  <Badge>Cross-Platform</Badge>
                                  <Badge>Cloud-Based</Badge>
                                  <Badge>Mobile-Optimized</Badge>
                                  <Badge>FinTech</Badge>
                                  <Badge>SaaS</Badge>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-x-3 mt-3">
                              <div className="flex items-center gap-x-4">
                                <AvatarGroup
                                  excessClassName="border-gray-300 text-gray-500"
                                  excess
                                >
                                  <Avatar className="border-2 border-white hover:ring-0 active:ring-0">
                                    <AvatarImage src="/woman.jpg" alt="Woman" />
                                    <AvatarFallback>W</AvatarFallback>
                                  </Avatar>
                                  <Avatar className="border-2 border-white hover:ring-0 active:ring-0">
                                    <AvatarImage src="/woman.jpg" alt="Woman" />
                                    <AvatarFallback>W</AvatarFallback>
                                  </Avatar>
                                  <Avatar className="border-2 border-white hover:ring-0 active:ring-0">
                                    <AvatarImage src="/woman.jpg" alt="Woman" />
                                    <AvatarFallback>W</AvatarFallback>
                                  </Avatar>
                                  <Avatar className="border-2 border-white hover:ring-0 active:ring-0">
                                    <AvatarImage src="/woman.jpg" alt="Woman" />
                                    <AvatarFallback>W</AvatarFallback>
                                  </Avatar>
                                  <Avatar className="border-2 border-white hover:ring-0 active:ring-0">
                                    <AvatarImage src="/woman.jpg" alt="Woman" />
                                    <AvatarFallback>W</AvatarFallback>
                                  </Avatar>
                                  <Avatar className="border-2 border-white hover:ring-0 active:ring-0">
                                    <AvatarImage src="/woman.jpg" alt="Woman" />
                                    <AvatarFallback>W</AvatarFallback>
                                  </Avatar>
                                  <Avatar className="border-2 border-white hover:ring-0 active:ring-0">
                                    <AvatarImage src="/woman.jpg" alt="Woman" />
                                    <AvatarFallback>W</AvatarFallback>
                                  </Avatar>
                                  <Avatar className="border-2 border-white hover:ring-0 active:ring-0">
                                    <AvatarImage src="/woman.jpg" alt="Woman" />
                                    <AvatarFallback>W</AvatarFallback>
                                  </Avatar>
                                </AvatarGroup>

                                <span className="text-xs text-dark-blue-400">
                                  Senior Front-End Developer
                                </span>
                              </div>

                              <span className="shrink-0 size-1 bg-gray-300 rounded-full" />

                              <div className="flex items-center gap-x-2">
                                <span className="text-xs text-dark-blue-400">
                                  January 2025 - Present
                                </span>

                                <Badge
                                  variant="rounded"
                                  className="bg-primary-50 text-primary-500 px-1.5 rounded-[3.15px]"
                                  visual="primary"
                                >
                                  2 Months
                                </Badge>
                              </div>
                            </div>
                          </article>

                          <article className="border p-6 rounded-lg bg-white border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                            <div className="flex items-start gap-x-4">
                              <div className="relative overflow-hidden rounded-md shrink-0 w-[134px] h-[86px]">
                                <NextImage
                                  src="/dashboard.png"
                                  alt="Dashboard"
                                  fill
                                  sizes="25vw"
                                />
                              </div>

                              <div className="space-y-2">
                                <div className="flex items-center gap-x-2">
                                  <h1 className="text-sm font-bold text-dark-blue-400">
                                    Seniority Mobile App
                                  </h1>
                                  <Badge
                                    className="border rounded-[3.15px] bg-white border-gray-300"
                                    visual="gray"
                                    variant="rounded"
                                  >
                                    <FileText className="size-[9.46px] text-primary-500" />{" "}
                                    Under NDA
                                  </Badge>
                                </div>

                                <div className="mt-2 flex items-center gap-x-6">
                                  <div className="flex gap-x-3">
                                    <span className="text-xs leading-6 text-dark-blue-400">
                                      Estimated Project Cost
                                    </span>
                                    <span className="font-bold text-sm leading-6 text-dark-blue-400">
                                      $25,000
                                    </span>
                                  </div>
                                  <div className="flex gap-x-3">
                                    <span className="text-xs leading-6 text-dark-blue-400">
                                      Project Type
                                    </span>
                                    <span className="font-bold text-sm leading-6 text-dark-blue-400">
                                      Cloud Software
                                    </span>
                                  </div>
                                  <div className="flex gap-x-3">
                                    <span className="text-xs leading-6 text-dark-blue-400">
                                      Current Phase
                                    </span>
                                    <span className="font-bold text-sm leading-6 text-dark-blue-400">
                                      Development
                                    </span>
                                  </div>
                                </div>

                                <div className="mt-2 flex items-center gap-x-2">
                                  <Badge>API-Driven</Badge>
                                  <Badge>Agile Workflow</Badge>
                                  <Badge>Cross-Platform</Badge>
                                  <Badge>Cloud-Based</Badge>
                                  <Badge>Mobile-Optimized</Badge>
                                  <Badge>FinTech</Badge>
                                  <Badge>SaaS</Badge>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-x-3 mt-3">
                              <div className="flex items-center gap-x-4">
                                <AvatarGroup
                                  excessClassName="border-gray-300 text-gray-500"
                                  excess
                                >
                                  <Avatar className="border-2 border-white hover:ring-0 active:ring-0">
                                    <AvatarImage src="/woman.jpg" alt="Woman" />
                                    <AvatarFallback>W</AvatarFallback>
                                  </Avatar>
                                  <Avatar className="border-2 border-white hover:ring-0 active:ring-0">
                                    <AvatarImage src="/woman.jpg" alt="Woman" />
                                    <AvatarFallback>W</AvatarFallback>
                                  </Avatar>
                                  <Avatar className="border-2 border-white hover:ring-0 active:ring-0">
                                    <AvatarImage src="/woman.jpg" alt="Woman" />
                                    <AvatarFallback>W</AvatarFallback>
                                  </Avatar>
                                </AvatarGroup>

                                <span className="text-xs text-dark-blue-400">
                                  Senior Front-End Developer
                                </span>
                              </div>

                              <span className="shrink-0 size-1 bg-gray-300 rounded-full" />

                              <div className="flex items-center gap-x-2">
                                <span className="text-xs text-dark-blue-400">
                                  January 2025 - Present
                                </span>

                                <Badge
                                  variant="rounded"
                                  className="bg-primary-50 text-primary-500 px-1.5 rounded-[3.15px]"
                                  visual="primary"
                                >
                                  2 Months
                                </Badge>
                              </div>
                            </div>
                          </article>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>

                <div className="shrink-0 flex flex-col gap-y-6 w-[289px] isolate">
                  <div
                    className={cn(
                      "top-[197.5px] sticky bg-white rounded-lg z-10 transition duration-300 before:content-[''] before:absolute before:w-full before:top-[-32px] before:h-[40px] before:bg-gray-50",
                      isCardStuck &&
                        "shadow-[0px_12px_16px_-4px_rgba(16,24,40,.08)]"
                    )}
                    ref={cardRef}
                  >
                    <div className="p-6 rounded-t-lg relative bg-white border border-gray-200">
                      <div className="flex items-center gap-x-1 justify-center">
                        <span className="inline-flex text-sm leading-none text-dark-blue-400 font-bold items-center gap-x-1">
                          <span className="size-1 inline-block bg-gray-500 rounded-full" />{" "}
                          Offline
                        </span>
                        <span className="font-extralight text-sm leading-none text-dark-blue-400">
                          3:30 PM local time
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-center">
                        <span className="text-sm leading-none font-extralight text-dark-blue-400">
                          Average response time{" "}
                          <span className="text-sm font-bold leading-none">
                            1 hour
                          </span>
                        </span>
                      </div>

                      <button className="w-full mt-5 duration-300 transition focus-visible:outlin-none text-sm leading-5 font-semibold shrink-0 h-10 flex items-center justify-center gap-x-2 rounded-[5px] px-4 bg-white border-2 text-primary-500 hover:text-white hover:bg-primary-500 border-primary-500 shadow-[0px_1px_2px_0px_rgba(16,24,40,.05)]">
                        <MessageSquare01 className="size-[15px]" /> Message Me
                      </button>
                    </div>

                    <div className="p-6 border-x rounded-b-lg border-b bg-white border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center text-xs leading-none font-extralight text-dark-blue-400 gap-x-[5.85px]">
                          <MessageTextSquare01 className="size-[15px]" />
                          Language
                        </span>

                        <span className="text-xs leading-none font-bold text-dark-blue-400">
                          English, Hindi
                        </span>
                      </div>

                      <div className="flex mt-5 items-center justify-between">
                        <span className="flex items-center text-xs leading-none font-extralight text-dark-blue-400 gap-x-[5.85px]">
                          <Clock className="size-[15px]" />
                          Time Zone
                        </span>

                        <span className="text-xs leading-none font-bold text-dark-blue-400">
                          India (IST-3)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 mt-6">
                    <div className="rounded-lg border border-gray-200 bg-white">
                      <div className="p-6">
                        <h1 className="text-sm font-bold leading-none text-dark-blue-400">
                          Similar profiles
                        </h1>

                        <div className="mt-3">
                          <div className="py-3 flex items-start gap-x-2 border-b border-gray-200">
                            <Avatar
                              className="hover:ring-0 active:ring-primary-100"
                              size="md"
                            >
                              <AvatarImage src="/man.jpg" alt="Man" />
                              <AvatarFallbackIcon />
                            </Avatar>

                            <div className="flex-1">
                              <h1 className="text-sm leading-none text-dark-blue-400 font-bold">
                                Jenny{" "}
                                <span className="text-xs font-extralight leading-none text-gray-500">
                                  @LakshitKumar
                                </span>
                              </h1>
                              <p className="mt-0.5 text-xs leading-none font-extralight text-dark-blue-400">
                                Full Stack Developer
                              </p>
                              <div className="mt-1.5 flex items-center justify-between">
                                <span className="text-[13px] leading-none font-bold text-dark-blue-400">
                                  $57
                                  <span className="text-xs leading-none text-dark-blue-400 font-extralight">
                                    /hr
                                  </span>
                                </span>

                                <div className="inline-flex items-center gap-x-1">
                                  <Star className="size-3 text-primary-500 fill-primary-500" />
                                  <span className="font-medium leading-none text-xs text-dark-blue-400">
                                    4.2
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="py-3 flex items-start gap-x-2 border-b border-gray-200">
                            <Avatar
                              className="hover:ring-0 active:ring-primary-100"
                              size="md"
                            >
                              <AvatarImage src="/man.jpg" alt="Man" />
                              <AvatarFallbackIcon />
                            </Avatar>

                            <div className="flex-1">
                              <h1 className="text-sm leading-none text-dark-blue-400 font-bold">
                                Jenny{" "}
                                <span className="text-xs font-extralight leading-none text-gray-500">
                                  @LakshitKumar
                                </span>
                              </h1>
                              <p className="mt-0.5 text-xs leading-none font-extralight text-dark-blue-400">
                                Full Stack Developer
                              </p>
                              <div className="mt-1.5 flex items-center justify-between">
                                <span className="text-[13px] leading-none font-bold text-dark-blue-400">
                                  $57
                                  <span className="text-xs leading-none text-dark-blue-400 font-extralight">
                                    /hr
                                  </span>
                                </span>

                                <div className="inline-flex items-center gap-x-1">
                                  <Star className="size-3 text-primary-500 fill-primary-500" />
                                  <span className="font-medium leading-none text-xs text-dark-blue-400">
                                    4.2
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="py-3 flex items-start gap-x-2 border-b border-gray-200">
                            <Avatar
                              className="hover:ring-0 active:ring-primary-100"
                              size="md"
                            >
                              <AvatarImage src="/man.jpg" alt="Man" />
                              <AvatarFallbackIcon />
                            </Avatar>

                            <div className="flex-1">
                              <h1 className="text-sm leading-none text-dark-blue-400 font-bold">
                                Jenny{" "}
                                <span className="text-xs font-extralight leading-none text-gray-500">
                                  @LakshitKumar
                                </span>
                              </h1>
                              <p className="mt-0.5 text-xs leading-none font-extralight text-dark-blue-400">
                                Full Stack Developer
                              </p>
                              <div className="mt-1.5 flex items-center justify-between">
                                <span className="text-[13px] leading-none font-bold text-dark-blue-400">
                                  $57
                                  <span className="text-xs leading-none text-dark-blue-400 font-extralight">
                                    /hr
                                  </span>
                                </span>

                                <div className="inline-flex items-center gap-x-1">
                                  <Star className="size-3 text-primary-500 fill-primary-500" />
                                  <span className="font-medium leading-none text-xs text-dark-blue-400">
                                    4.2
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="py-3 flex items-start gap-x-2 border-b border-gray-200">
                            <Avatar
                              className="hover:ring-0 active:ring-primary-100"
                              size="md"
                            >
                              <AvatarImage src="/man.jpg" alt="Man" />
                              <AvatarFallbackIcon />
                            </Avatar>

                            <div className="flex-1">
                              <h1 className="text-sm leading-none text-dark-blue-400 font-bold">
                                Jenny{" "}
                                <span className="text-xs font-extralight leading-none text-gray-500">
                                  @LakshitKumar
                                </span>
                              </h1>
                              <p className="mt-0.5 text-xs leading-none font-extralight text-dark-blue-400">
                                Full Stack Developer
                              </p>
                              <div className="mt-1.5 flex items-center justify-between">
                                <span className="text-[13px] leading-none font-bold text-dark-blue-400">
                                  $57
                                  <span className="text-xs leading-none text-dark-blue-400 font-extralight">
                                    /hr
                                  </span>
                                </span>

                                <div className="inline-flex items-center gap-x-1">
                                  <Star className="size-3 text-primary-500 fill-primary-500" />
                                  <span className="font-medium leading-none text-xs text-dark-blue-400">
                                    4.2
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-center">
                          <Button size="sm" variant="link" visual="gray">
                            View More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white">
                    <div className="p-6">
                      <h1 className="text-sm font-bold leading-none text-dark-blue-400">
                        Affiliated Teams
                      </h1>

                      <div className="mt-3">
                        <div className="py-3 flex items-center gap-x-2 border-b border-gray-200">
                          <Avatar
                            className="hover:ring-0 active:ring-primary-100"
                            size="md"
                          >
                            <AvatarImage src="/man.jpg" alt="Man" />
                            <AvatarFallbackIcon />
                          </Avatar>

                          <div className="flex-1">
                            <NextLink
                              href="#"
                              className="focus-visible:outline-none hover:underline text-sm leading-none text-dark-blue-400 font-bold"
                            >
                              Bitcoin Master Devs
                            </NextLink>

                            <div className="mt-1.5 flex items-center justify-between">
                              <span className="inline-flex items-center gap-x-1 font-extralight">
                                <MarkerPin02 className="size-2.5 text-dark-blue-400" />
                                <span className="text-[10px] leading-none text-dark-blue-400 font-extralight">
                                  Moscow, Russia
                                </span>
                              </span>

                              <div className="inline-flex items-center gap-x-1">
                                <Clock className="size-[10px] text-primary-500" />
                                <span className="font-extralight leading-none text-[10px] text-dark-blue-400">
                                  450 hrs
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="py-3 flex items-center gap-x-2 border-b border-gray-200">
                          <Avatar
                            className="hover:ring-0 active:ring-primary-100"
                            size="md"
                          >
                            <AvatarImage src="/man.jpg" alt="Man" />
                            <AvatarFallbackIcon />
                          </Avatar>

                          <div className="flex-1">
                            <NextLink
                              href="#"
                              className="focus-visible:outline-none hover:underline text-sm leading-none text-dark-blue-400 font-bold"
                            >
                              Bitcoin Master Devs
                            </NextLink>

                            <div className="mt-1.5 flex items-center justify-between">
                              <span className="inline-flex items-center gap-x-1 font-extralight">
                                <MarkerPin02 className="size-2.5 text-dark-blue-400" />
                                <span className="text-[10px] leading-none text-dark-blue-400 font-extralight">
                                  Moscow, Russia
                                </span>
                              </span>

                              <div className="inline-flex items-center gap-x-1">
                                <Clock className="size-[10px] text-primary-500" />
                                <span className="font-extralight leading-none text-[10px] text-dark-blue-400">
                                  450 hrs
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="py-3 flex items-center gap-x-2 border-b border-gray-200">
                          <Avatar
                            className="hover:ring-0 active:ring-primary-100"
                            size="md"
                          >
                            <AvatarImage src="/man.jpg" alt="Man" />
                            <AvatarFallbackIcon />
                          </Avatar>

                          <div className="flex-1">
                            <NextLink
                              href="#"
                              className="focus-visible:outline-none hover:underline text-sm leading-none text-dark-blue-400 font-bold"
                            >
                              Bitcoin Master Devs
                            </NextLink>

                            <div className="mt-1.5 flex items-center justify-between">
                              <span className="inline-flex items-center gap-x-1 font-extralight">
                                <MarkerPin02 className="size-2.5 text-dark-blue-400" />
                                <span className="text-[10px] leading-none text-dark-blue-400 font-extralight">
                                  Moscow, Russia
                                </span>
                              </span>

                              <div className="inline-flex items-center gap-x-1">
                                <Clock className="size-[10px] text-primary-500" />
                                <span className="font-extralight leading-none text-[10px] text-dark-blue-400">
                                  450 hrs
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="py-3 flex items-center gap-x-2 border-b border-gray-200">
                          <Avatar
                            className="hover:ring-0 active:ring-primary-100"
                            size="md"
                          >
                            <AvatarImage src="/man.jpg" alt="Man" />
                            <AvatarFallbackIcon />
                          </Avatar>

                          <div className="flex-1">
                            <NextLink
                              href="#"
                              className="focus-visible:outline-none hover:underline text-sm leading-none text-dark-blue-400 font-bold"
                            >
                              Bitcoin Master Devs
                            </NextLink>

                            <div className="mt-1.5 flex items-center justify-between">
                              <span className="inline-flex items-center gap-x-1 font-extralight">
                                <MarkerPin02 className="size-2.5 text-dark-blue-400" />
                                <span className="text-[10px] leading-none text-dark-blue-400 font-extralight">
                                  Moscow, Russia
                                </span>
                              </span>

                              <div className="inline-flex items-center gap-x-1">
                                <Clock className="size-[10px] text-primary-500" />
                                <span className="font-extralight leading-none text-[10px] text-dark-blue-400">
                                  450 hrs
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="py-3 flex items-center gap-x-2 border-b border-gray-200">
                          <Avatar
                            className="hover:ring-0 active:ring-primary-100"
                            size="md"
                          >
                            <AvatarImage src="/man.jpg" alt="Man" />
                            <AvatarFallbackIcon />
                          </Avatar>

                          <div className="flex-1">
                            <NextLink
                              href="#"
                              className="focus-visible:outline-none hover:underline text-sm leading-none text-dark-blue-400 font-bold"
                            >
                              Bitcoin Master Devs
                            </NextLink>

                            <div className="mt-1.5 flex items-center justify-between">
                              <span className="inline-flex items-center gap-x-1 font-extralight">
                                <MarkerPin02 className="size-2.5 text-dark-blue-400" />
                                <span className="text-[10px] leading-none text-dark-blue-400 font-extralight">
                                  Moscow, Russia
                                </span>
                              </span>

                              <div className="inline-flex items-center gap-x-1">
                                <Clock className="size-[10px] text-primary-500" />
                                <span className="font-extralight leading-none text-[10px] text-dark-blue-400">
                                  450 hrs
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-center">
                        <Button size="sm" variant="link" visual="gray">
                          View More
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </Layout>
    </div>
  )
}

export const Offers = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <TopMostHeader />
      <Layout>
        <div className="px-[100px] pb-[50px]">
          <div className="h-[84px] border-b border-gray-200 flex items-center justify-between">
            <Button size="lg" variant="link" visual="gray">
              <ArrowLeft className="size-[15px]" />
              Back to Profile
            </Button>

            <div className="flex items-center gap-x-8">
              <div className="flex items-center gap-x-3">
                <Avatar size="lg">
                  <AvatarImage src="/man.jpg" alt="man" />
                  <AvatarFallbackIcon />
                </Avatar>

                <div className="flex flex-col gap-y-0.5">
                  <span className="text-lg inline-flex items-center gap-x-[3px] font-bold leading-none text-dark-blue-400">
                    Dheeraj{" "}
                    <span className="text-base leading-none font-extralight text-dark-blue-400">
                      @dheerajnagdali
                    </span>
                  </span>
                  <span className="text-sm leading-none font-medium text-dark-blue-400">
                    Expert React Developer
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-x-3">
                <TooltipProvider delayDuration={75}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="md">
                        <Plus className="size-[15px]" />
                        Hire Me
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      visual="white"
                      size="md"
                      className="text-gray-700 p-6 max-w-[344px] border border-gray-200 shadow-[0px_24px_48px_-12px_rgba(16,24,40,.18)]"
                      sideOffset={14}
                      side="bottom"
                    >
                      <TooltipArrow className="fill-white" />
                      <div className="flex items-center mt-3 gap-x-[9px]">
                        <Clock className="size-4" />
                        <p className="text-sm leading-none font-extralight text-dark-blue-400">
                          Dheeraj{" "}
                          <span className="font-medium">
                            is not currently available
                          </span>{" "}
                          for hire
                        </p>
                      </div>

                      <Button className="mt-3" size="md" variant="link">
                        View similar talent <ArrowRight className="size-3" />
                      </Button>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="inline-flex items-center">
                  <Button
                    className="rounded-r-none"
                    variant="outlined"
                    visual="gray"
                    size="md"
                  >
                    <Star className="size-[15px] text-gray-500" />
                    Save
                  </Button>
                  <IconButton
                    className="rounded-l-none border-l-0 text-gray-500"
                    variant="outlined"
                    visual="gray"
                    size="md"
                  >
                    <ChevronDown className="size-[20px]" />
                  </IconButton>
                </div>

                <IconButton
                  className="text-gray-500"
                  variant="outlined"
                  visual="gray"
                  size="md"
                >
                  <Share className="size-[20px]" />
                </IconButton>
              </div>
            </div>
          </div>

          <div className="mt-[50px]">
            <h1 className="text-xl font-bold leading-none text-dark-blue-400">
              My Offers
            </h1>

            <Tabs defaultValue="Projects" className="mt-6">
              <div className="flex items-center justify-between">
                <RadixTabs.List className="inline-flex items-center gap-x-3">
                  <TabsTrigger
                    showUnderline={false}
                    variant="unstyled"
                    value="Projects"
                    className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                  >
                    Projects
                  </TabsTrigger>
                  <TabsTrigger
                    showUnderline={false}
                    variant="unstyled"
                    value="Services"
                    className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                  >
                    Services
                  </TabsTrigger>
                </RadixTabs.List>

                <RadixTabs.Tabs defaultValue="Front-end" className="contents">
                  <RadixTabs.List className="inline-flex items-center gap-x-3">
                    <RadixTabs.Trigger
                      value="Front-end"
                      className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                    >
                      Font-end
                    </RadixTabs.Trigger>
                    <RadixTabs.Trigger
                      value="Back-End"
                      className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                    >
                      Back-End
                    </RadixTabs.Trigger>
                    <RadixTabs.Trigger
                      value="Database"
                      className="focus-visible:outline-none py-[7px] bg-white hover:bg-gray-50 hover:border-gray-400 px-3.5 border-2 border-gray-300 data-[state=active]:text-dark-blue-400 data-[state=active]:bg-white hover:data-[state=active]:bg-white data-[state=active]:border-dark-blue-400 hover:data-[state=active]:text-dark-blue-400 hover:data-[state=active]:border-dark-blue-400  text-gray-500 hover:text-gray-600 rounded-full text-sm leading-5 font-medium"
                    >
                      Database
                    </RadixTabs.Trigger>
                  </RadixTabs.List>
                </RadixTabs.Tabs>
              </div>

              <TabsContent value="Projects">
                <div className="pt-6 grid grid-cols-4 gap-x-5 gap-y-6">
                  <article className="p-5 bg-white border rounded-lg border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                    <div className="h-[169px] rounded-[6px] overflow-hidden bg-white relative">
                      <NextImage
                        className="object-cover"
                        src="/dashboard.png"
                        alt="Dashboard"
                        fill
                        sizes="33vw"
                      />
                    </div>

                    <div className="mt-3 flex items-start gap-x-3">
                      <h1 className="font-bold flex-auto text-base leading-none text-dark-blue-400">
                        The Ultimate Mobile App Experience
                      </h1>

                      <div className="inline-flex items-center gap-x-3">
                        <Star className="size-[15px] text-primary-500 fill-primary-500" />
                        <span className="text-sm leading-none text-dark-blue-400 font-medium">
                          4.9(5)
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-none font-extralight text-dark-blue-400">
                      Brief Description of the project. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt.
                    </p>

                    <div className="mt-[14.5px] flex flex-col gap-y-3">
                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          Starting from 12 weeks
                        </span>
                      </div>

                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          $50,000 budget
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <AvatarGroup max={5} size="sm" excess>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                      </AvatarGroup>

                      <Favorite />
                    </div>
                  </article>
                  <article className="p-5 bg-white border rounded-lg border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                    <div className="h-[169px] rounded-[6px] overflow-hidden bg-white relative">
                      <NextImage
                        className="object-cover"
                        src="/dashboard.png"
                        alt="Dashboard"
                        fill
                        sizes="33vw"
                      />
                    </div>

                    <div className="mt-3 flex items-start gap-x-3">
                      <h1 className="font-bold flex-auto text-base leading-none text-dark-blue-400">
                        The Ultimate Mobile App Experience
                      </h1>

                      <div className="inline-flex items-center gap-x-3">
                        <Star className="size-[15px] text-primary-500 fill-primary-500" />
                        <span className="text-sm leading-none text-dark-blue-400 font-medium">
                          4.9(5)
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-none font-extralight text-dark-blue-400">
                      Brief Description of the project. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt.
                    </p>

                    <div className="mt-[14.5px] flex flex-col gap-y-3">
                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          Starting from 12 weeks
                        </span>
                      </div>

                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          $50,000 budget
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <AvatarGroup max={5} size="sm" excess>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                      </AvatarGroup>

                      <Favorite />
                    </div>
                  </article>
                  <article className="p-5 bg-white border rounded-lg border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                    <div className="h-[169px] rounded-[6px] overflow-hidden bg-white relative">
                      <NextImage
                        className="object-cover"
                        src="/dashboard.png"
                        alt="Dashboard"
                        fill
                        sizes="33vw"
                      />
                    </div>

                    <div className="mt-3 flex items-start gap-x-3">
                      <h1 className="font-bold flex-auto text-base leading-none text-dark-blue-400">
                        The Ultimate Mobile App Experience
                      </h1>

                      <div className="inline-flex items-center gap-x-3">
                        <Star className="size-[15px] text-primary-500 fill-primary-500" />
                        <span className="text-sm leading-none text-dark-blue-400 font-medium">
                          4.9(5)
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-none font-extralight text-dark-blue-400">
                      Brief Description of the project. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt.
                    </p>

                    <div className="mt-[14.5px] flex flex-col gap-y-3">
                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          Starting from 12 weeks
                        </span>
                      </div>

                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          $50,000 budget
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <AvatarGroup max={5} size="sm" excess>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                      </AvatarGroup>

                      <Favorite />
                    </div>
                  </article>
                  <article className="p-5 bg-white border rounded-lg border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                    <div className="h-[169px] rounded-[6px] overflow-hidden bg-white relative">
                      <NextImage
                        className="object-cover"
                        src="/dashboard.png"
                        alt="Dashboard"
                        fill
                        sizes="33vw"
                      />
                    </div>

                    <div className="mt-3 flex items-start gap-x-3">
                      <h1 className="font-bold flex-auto text-base leading-none text-dark-blue-400">
                        The Ultimate Mobile App Experience
                      </h1>

                      <div className="inline-flex items-center gap-x-3">
                        <Star className="size-[15px] text-primary-500 fill-primary-500" />
                        <span className="text-sm leading-none text-dark-blue-400 font-medium">
                          4.9(5)
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-none font-extralight text-dark-blue-400">
                      Brief Description of the project. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt.
                    </p>

                    <div className="mt-[14.5px] flex flex-col gap-y-3">
                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          Starting from 12 weeks
                        </span>
                      </div>

                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          $50,000 budget
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <AvatarGroup max={5} size="sm" excess>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                      </AvatarGroup>

                      <Favorite />
                    </div>
                  </article>
                  <article className="p-5 bg-white border rounded-lg border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                    <div className="h-[169px] rounded-[6px] overflow-hidden bg-white relative">
                      <NextImage
                        className="object-cover"
                        src="/dashboard.png"
                        alt="Dashboard"
                        fill
                        sizes="33vw"
                      />
                    </div>

                    <div className="mt-3 flex items-start gap-x-3">
                      <h1 className="font-bold flex-auto text-base leading-none text-dark-blue-400">
                        The Ultimate Mobile App Experience
                      </h1>

                      <div className="inline-flex items-center gap-x-3">
                        <Star className="size-[15px] text-primary-500 fill-primary-500" />
                        <span className="text-sm leading-none text-dark-blue-400 font-medium">
                          4.9(5)
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-none font-extralight text-dark-blue-400">
                      Brief Description of the project. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt.
                    </p>

                    <div className="mt-[14.5px] flex flex-col gap-y-3">
                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          Starting from 12 weeks
                        </span>
                      </div>

                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          $50,000 budget
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <AvatarGroup max={5} size="sm" excess>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                      </AvatarGroup>

                      <Favorite />
                    </div>
                  </article>
                  <article className="p-5 bg-white border rounded-lg border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                    <div className="h-[169px] rounded-[6px] overflow-hidden bg-white relative">
                      <NextImage
                        className="object-cover"
                        src="/dashboard.png"
                        alt="Dashboard"
                        fill
                        sizes="33vw"
                      />
                    </div>

                    <div className="mt-3 flex items-start gap-x-3">
                      <h1 className="font-bold flex-auto text-base leading-none text-dark-blue-400">
                        The Ultimate Mobile App Experience
                      </h1>

                      <div className="inline-flex items-center gap-x-3">
                        <Star className="size-[15px] text-primary-500 fill-primary-500" />
                        <span className="text-sm leading-none text-dark-blue-400 font-medium">
                          4.9(5)
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-none font-extralight text-dark-blue-400">
                      Brief Description of the project. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt.
                    </p>

                    <div className="mt-[14.5px] flex flex-col gap-y-3">
                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          Starting from 12 weeks
                        </span>
                      </div>

                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          $50,000 budget
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <AvatarGroup max={5} size="sm" excess>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                      </AvatarGroup>

                      <Favorite />
                    </div>
                  </article>
                  <article className="p-5 bg-white border rounded-lg border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                    <div className="h-[169px] rounded-[6px] overflow-hidden bg-white relative">
                      <NextImage
                        className="object-cover"
                        src="/dashboard.png"
                        alt="Dashboard"
                        fill
                        sizes="33vw"
                      />
                    </div>

                    <div className="mt-3 flex items-start gap-x-3">
                      <h1 className="font-bold flex-auto text-base leading-none text-dark-blue-400">
                        The Ultimate Mobile App Experience
                      </h1>

                      <div className="inline-flex items-center gap-x-3">
                        <Star className="size-[15px] text-primary-500 fill-primary-500" />
                        <span className="text-sm leading-none text-dark-blue-400 font-medium">
                          4.9(5)
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-none font-extralight text-dark-blue-400">
                      Brief Description of the project. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt.
                    </p>

                    <div className="mt-[14.5px] flex flex-col gap-y-3">
                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          Starting from 12 weeks
                        </span>
                      </div>

                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          $50,000 budget
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <AvatarGroup max={5} size="sm" excess>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                      </AvatarGroup>

                      <Favorite />
                    </div>
                  </article>
                  <article className="p-5 bg-white border rounded-lg border-gray-200 shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)]">
                    <div className="h-[169px] rounded-[6px] overflow-hidden bg-white relative">
                      <NextImage
                        className="object-cover"
                        src="/dashboard.png"
                        alt="Dashboard"
                        fill
                        sizes="33vw"
                      />
                    </div>

                    <div className="mt-3 flex items-start gap-x-3">
                      <h1 className="font-bold flex-auto text-base leading-none text-dark-blue-400">
                        The Ultimate Mobile App Experience
                      </h1>

                      <div className="inline-flex items-center gap-x-3">
                        <Star className="size-[15px] text-primary-500 fill-primary-500" />
                        <span className="text-sm leading-none text-dark-blue-400 font-medium">
                          4.9(5)
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-none font-extralight text-dark-blue-400">
                      Brief Description of the project. Lorem ipsum dolor sit
                      amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt.
                    </p>

                    <div className="mt-[14.5px] flex flex-col gap-y-3">
                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          Starting from 12 weeks
                        </span>
                      </div>

                      <div className="flex items-center gap-x-[6.4px]">
                        <Clock className="size-[18px] shrink-0 text-primary-500" />

                        <span className="font-medium text-sm leading-none text-dark-blue-400">
                          $50,000 budget
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <AvatarGroup max={5} size="sm" excess>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                        <Avatar
                          size="sm"
                          className="border-2 border-white hover:ring-0 active:ring-0"
                        >
                          <AvatarImage src="/woman.jpg" alt="Woman" />
                          <AvatarFallback>W</AvatarFallback>
                        </Avatar>
                      </AvatarGroup>

                      <Favorite />
                    </div>
                  </article>
                </div>
              </TabsContent>
              <TabsContent value="Services"></TabsContent>
            </Tabs>
          </div>

          <div className="mt-[50px] flex items-center justify-center">
            <Button className="bg-white" size="md" variant="outlined">
              Load More...
            </Button>
          </div>
        </div>
      </Layout>
    </div>
  )
}
