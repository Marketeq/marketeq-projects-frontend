import UserGroup from '@/components/icons/user-group';
import NextImage from '@/components/next-image';
import Navigation from '@/components/ui/navigation';
import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,

  DisclosureContent,
  DisclosureTrigger,

  IconButton,

  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,

} from "@/components/ui"
import {
  AlertCircle,
  ArrowDown,
  ArrowLeft,
  Bank,
  Check,
  CheckCircle,
  ChevronDown,
  CreditCard,
  DivideSquare,
  Download02,
  Edit03,
  Globe,
  HelpCircle,
  LinkExternal01,
  LinkExternal02,
  Lock,
  MoreHorizontal,
  Plus,
  RefreshCcw,
  Search,
  ShieldTick,
  Star,
  Trash03,
  Trash2,
  X,
  Zap,
} from "@blend-metrics/icons"
import Dropdown from '@/components/ui/dropdown';
import { CountriesCombobox } from '@/components/own-combobox';


export default function ProjectDetailsPage() {
  return <div className="bg-gray-50">
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
                  <NextImage className="object-cover" src="/dashboard.png" alt="Dashboard" sizes="25vw" fill />
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
                      <DisclosureTrigger className="focus-visible:outline-none transition duration-300 h-9 shrink-0 inline-flex items-center justify-center py-2 px-3 text-xs leading-5 font-semibold rounded-[4px] data-[state=active]:bg-gray-100 text-gray-700" value="Project Scope">
                        Project Scope
                      </DisclosureTrigger>
                      <DisclosureTrigger className="focus-visible:outline-none transition duration-300 h-9 shrink-0 inline-flex items-center justify-center py-2 px-3 text-xs leading-5 font-semibold rounded-[4px] data-[state=active]:bg-gray-100 text-gray-700" value="Team Members">
                        Team Members 
                      </DisclosureTrigger>
                    </TabsList>

                    <Button variant="outlined" className="bg-white text-xs leading-5">
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
                              <Badge className="text-xs leading-[18px] rounded-[5px] border border-gray-200 bg-white" visual="gray" size="lg">
                                4 Phases
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Dropdown defaultValue="Junior" />
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <CountriesCombobox triggerClassName="group border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed data-[state=open]:bg-gray-100 hover:border-gray-300 hover:border-dashed bg-white hover:bg-gray-100 border-solid" defaultValue="United States" />
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
                              <IconButton className="w-[27px] h-[23px]" variant="ghost" visual="gray">
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
                              <Badge className="text-xs leading-[18px] rounded-[5px] border border-gray-200 bg-white" visual="gray" size="lg">
                                4 Phases
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Dropdown defaultValue="Junior" />
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <CountriesCombobox triggerClassName="group border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed data-[state=open]:bg-gray-100 hover:border-gray-300 hover:border-dashed bg-white hover:bg-gray-100 border-solid" defaultValue="United States" />
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
                              <IconButton className="w-[27px] h-[23px]" variant="ghost" visual="gray">
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
                              <Badge className="text-xs leading-[18px] rounded-[5px] border border-gray-200 bg-white" visual="gray" size="lg">
                                4 Phases
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Dropdown defaultValue="Junior" />
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <CountriesCombobox triggerClassName="group border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed data-[state=open]:bg-gray-100 hover:border-gray-300 hover:border-dashed bg-white hover:bg-gray-100 border-solid" defaultValue="United States" />
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
                              <IconButton className="w-[27px] h-[23px]" variant="ghost" visual="gray">
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
                              <Badge className="text-xs leading-[18px] rounded-[5px] border border-gray-200 bg-white" visual="gray" size="lg">
                                4 Phases
                              </Badge>
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <Dropdown defaultValue="Junior" />
                            </TableCell>
                            <TableCell className="py-4 px-6">
                              <CountriesCombobox triggerClassName="group border-gray-200 data-[state=open]:border-gray-300 data-[state=open]:border-dashed data-[state=open]:bg-gray-100 hover:border-gray-300 hover:border-dashed bg-white hover:bg-gray-100 border-solid" defaultValue="United States" />
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
                              <IconButton className="w-[27px] h-[23px]" variant="ghost" visual="gray">
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
                        <Accordion type="multiple" className="pt-6 space-y-[15px] overflow-hidden [interpolate-size:allow-keywords] transition-[height] duration-300" defaultValue={["item-1"]}>
                          <AccordionItem className="rounded-lg bg-white border border-gray-300" value="item-1">
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
                          <AccordionItem className="rounded-lg bg-white border border-gray-300" value="item-2">
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
                          <AccordionItem className="rounded-lg bg-white border border-gray-300" value="item-3">
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
                          <AccordionItem className="rounded-lg bg-white border border-gray-300" value="item-4">
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
                          <AccordionItem className="rounded-lg bg-white border border-gray-300" value="item-5">
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
                          <AccordionItem className="rounded-lg bg-white border border-gray-300" value="item-6">
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
                          <AccordionItem className="rounded-lg bg-white border border-gray-300" value="item-7">
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
                      <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3"]} className="flex-auto space-y-3">
                        <AccordionItem value="item-1" className="rounded-lg border border-gray-200 shadow-sm bg-white">
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
                        <AccordionItem value="item-2" className="rounded-lg border border-gray-200 shadow-sm bg-white">
                          <div className="flex items-center justify-between gap-x-4 px-3 py-3">
                            <div className="inline-flex items-center gap-x-3.5">
                              <AccordionTrigger asChild>
                                <IconButton className="size-8" variant="ghost" visual="gray">
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
                        <AccordionItem value="item-3" className="rounded-lg border border-gray-200 shadow-sm bg-white">
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
                    <Button className="font-medium underline text-[10px] leading-[14px]" variant="link">
                      Terms of Use
                    </Button>
                    and{" "}
                    <Button className="font-medium underline text-[10px] leading-[14px]" variant="link">
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
    </div>;
}