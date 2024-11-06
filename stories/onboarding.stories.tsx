import {
  AlertCircle,
  ChevronRight,
  Info,
  Mail,
  Plus,
} from "@blend-metrics/icons"
import { Meta } from "@storybook/react"
import { Logo, Logo3 } from "@/components/icons"
import { Pointer } from "@/components/icons/pointer"
import NextLink from "@/components/next-link"
import { Triangles } from "@/components/triangles"
import {
  Button,
  CheckboxSelector,
  CircularProgress,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Label,
} from "@/components/ui"

const meta: Meta = {
  title: "Onboarding",
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

export const Default = () => {
  return (
    <div className="min-h-screen flex">
      <div className="relative p-[75px] w-[480px] shrink-0 flex flex-col bg-dark-blue-500">
        <Logo className="h-9 w-[245px] shrink-0" />

        <div className="mt-[94px]">
          <h1 className="text-[45px] leading-none font-bold text-white">
            Connect. Create. Conquer.
          </h1>

          <div className="mt-[30px]">
            <span className="text-white text-[22px] leading-[26.63px]">
              From ideas to execution, find the talent that can make it happen.
            </span>
          </div>
        </div>

        <Triangles className="absolute bottom-0 right-0" />

        <div className="relative mt-auto flex flex-col gap-y-5">
          <NextLink
            className="text-base leading-[19.36px] text-white hover:underline focus-visible:outline-none"
            href="/"
          >
            Already have an account?
          </NextLink>

          <div className="relative self-start">
            <Button
              className="hover:bg-white hover:text-dark-blue-400 border-white/[.2] text-white hover:border-white"
              size="lg"
              visual="gray"
              variant="outlined"
            >
              Sign In
            </Button>
            <Pointer className="absolute top-[34px] right-0 -rotate-6" />
          </div>
        </div>
      </div>

      <div className="relative flex justify-stretch items-center flex-auto py-[100px] px-[200px]">
        <div className="max-w-[560px] mx-auto">
          <h1 className="text-2xl leading-[36px] text-dark-blue-400 font-semibold">
            What brings you here today?
          </h1>

          <p className="text-base leading-[19.36px] text-dark-blue-400 mt-2 font-light">
            Whether you&apos;re here to hire or get hired, let&apos;s get you
            set up the right way.
          </p>

          <div className="mt-[50px] flex flex-col gap-y-6">
            <article className="rounded-lg p-5 border border-gray-200 flex items-center gap-x-5 bg-white">
              <div className="w-[100px] shrink-0 bg-gray-200 rounded-lg self-stretch" />

              <div className="flex-auto">
                <h1 className="text-lg leading-[21.78px] font-semibold text-dark-blue-400">
                  I’m looking to hire
                </h1>
                <p className="text-base mt-2 leading-[19.36px] font-light text-dark-blue-400">
                  Discover the right experts ready to deliver what you need.
                </p>
              </div>

              <button className="focus-visible:outline-none shrink-0 rounded-[5px] size-8 flex items-center justify-center">
                <ChevronRight className="size-5" />
              </button>
            </article>

            <article className="rounded-lg p-5 border border-gray-200 flex items-center gap-x-5 bg-white">
              <div className="w-[100px] shrink-0 bg-gray-200 rounded-lg self-stretch" />

              <div className="flex-auto">
                <h1 className="text-lg leading-[21.78px] font-semibold text-dark-blue-400">
                  I’m looking to hire
                </h1>
                <p className="text-base mt-2 leading-[19.36px] font-light text-dark-blue-400">
                  Discover the right experts ready to deliver what you need.
                </p>
              </div>

              <button className="focus-visible:outline-none shrink-0 rounded-[5px] size-8 flex items-center justify-center">
                <ChevronRight className="size-5" />
              </button>
            </article>
          </div>
        </div>
      </div>
    </div>
  )
}

export const DescribeYourTeam = () => {
  return (
    <div className="min-h-screen flex">
      <div className="relative p-[75px] w-[480px] shrink-0 flex flex-col bg-dark-blue-500">
        <Logo className="h-9 w-[245px] shrink-0" />

        <div className="mt-[94px]">
          <h1 className="text-[45px] leading-none font-bold text-white">
            Connect. Create. Conquer.
          </h1>

          <div className="mt-[30px]">
            <span className="text-white text-[22px] leading-[26.63px]">
              From ideas to execution, find the talent that can make it happen.
            </span>
          </div>
        </div>

        <Triangles className="absolute bottom-0 right-0" />

        <div className="relative mt-auto flex flex-col gap-y-5">
          <NextLink
            className="text-base leading-[19.36px] text-white hover:underline focus-visible:outline-none"
            href="/"
          >
            Already have an account?
          </NextLink>

          <div className="relative self-start">
            <Button
              className="hover:bg-white hover:text-dark-blue-400 border-white/[.2] text-white hover:border-white"
              size="lg"
              visual="gray"
              variant="outlined"
            >
              Sign In
            </Button>
            <Pointer className="absolute top-[34px] right-0 -rotate-6" />
          </div>
        </div>
      </div>

      <div className="relative flex justify-stretch items-center flex-auto py-[100px] px-[200px]">
        <div className="max-w-[560px] mx-auto">
          <div className="flex gap-x-2 items-center">
            <CircularProgress
              show={false}
              size={15.43}
              strokeWidth={2.5}
              value={30}
            />
            <span className="text-[11px] leading-[15.43px] text-gray-700">
              STEP 1 / 4
            </span>
          </div>

          <h1 className="text-2xl leading-[36px] mt-2 text-dark-blue-400 font-semibold">
            What brings you here today?
          </h1>

          <p className="text-base leading-[19.36px] text-dark-blue-400 mt-2 font-light">
            Whether you&apos;re here to hire or get hired, let&apos;s get you
            set up the right way.
          </p>

          <form className="mt-[50px] flex flex-col">
            <div className="flex flex-col gap-y-1.5">
              <Label htmlFor="your-team-name">What’s your team name?</Label>
              <Input
                id="your-team-name"
                placeholder="Enter your team or company name"
              />
            </div>
            <div className="flex flex-col gap-y-1.5 mt-6">
              <Label htmlFor="your-role">What’s your role?</Label>
              <InputGroup>
                <Input
                  id="your-role"
                  placeholder="Enter your team or company name"
                />
                <InputRightElement>
                  <Info className="text-gray-500 h-4 w-4" />
                </InputRightElement>
              </InputGroup>
            </div>
            <div className="flex flex-col gap-y-1.5 mt-6">
              <Label htmlFor="your-industry">What’s your industry?</Label>
              <Input
                id="your-industry"
                placeholder="Enter your industry (e.g. Technology, Healthcare, Retail)"
              />
            </div>

            <div className="mt-[148px] flex items-center justify-between">
              <Button size="md" variant="outlined" visual="gray" type="button">
                Back
              </Button>

              <div className="flex items-center gap-x-6">
                <Button size="md" visual="gray" variant="ghost" type="button">
                  Skip
                </Button>

                <Button size="md" visual="primary">
                  Continue
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export const ShareYourGoals = () => {
  return (
    <div className="min-h-screen flex">
      <div className="relative p-[75px] w-[480px] shrink-0 flex flex-col bg-dark-blue-500">
        <Logo className="h-9 w-[245px] shrink-0" />

        <div className="mt-[94px]">
          <h1 className="text-[45px] leading-none font-bold text-white">
            Connect. Create. Conquer.
          </h1>

          <div className="mt-[30px]">
            <span className="text-white text-[22px] leading-[26.63px]">
              From ideas to execution, find the talent that can make it happen.
            </span>
          </div>
        </div>

        <Triangles className="absolute bottom-0 right-0" />

        <div className="relative mt-auto flex flex-col gap-y-5">
          <NextLink
            className="text-base leading-[19.36px] text-white hover:underline focus-visible:outline-none"
            href="/"
          >
            Already have an account?
          </NextLink>

          <div className="relative self-start">
            <Button
              className="hover:bg-white hover:text-dark-blue-400 border-white/[.2] text-white hover:border-white"
              size="lg"
              visual="gray"
              variant="outlined"
            >
              Sign In
            </Button>
            <Pointer className="absolute top-[34px] right-0 -rotate-6" />
          </div>
        </div>
      </div>

      <div className="relative flex justify-stretch items-center flex-auto py-[100px] px-[200px]">
        <div className="max-w-[560px] mx-auto">
          <div className="flex gap-x-2 items-center">
            <CircularProgress
              show={false}
              size={15.43}
              strokeWidth={2.5}
              value={30}
            />
            <span className="text-[11px] leading-[15.43px] text-gray-700">
              STEP 1 / 4
            </span>
          </div>

          <h1 className="text-2xl leading-[36px] mt-2 text-dark-blue-400 font-semibold">
            What brings you here today?
          </h1>

          <p className="text-base leading-[19.36px] text-dark-blue-400 mt-2 font-light">
            Whether you&apos;re here to hire or get hired, let&apos;s get you
            set up the right way.
          </p>

          <form className="mt-[50px]">
            <div className="flex flex-col gap-y-2.5">
              <CheckboxSelector size="md">
                <h1 className="text-sm leading-5 font-medium text-dark-blue-400">
                  Growth & Expansion
                </h1>
                <p className="text-sm leading-5 font-light text-dark-blue-400">
                  Focused on scaling, increasing sales, or entering new markets
                </p>
              </CheckboxSelector>
              <CheckboxSelector size="md">
                <h1 className="text-sm leading-5 font-medium text-dark-blue-400">
                  Brand Building & Awareness
                </h1>
                <p className="text-sm leading-5 font-light text-dark-blue-400">
                  Aiming to improve your brand presence, reputation and
                  visibility
                </p>
              </CheckboxSelector>
              <CheckboxSelector size="md">
                <h1 className="text-sm leading-5 font-medium text-dark-blue-400">
                  Design & Strategy
                </h1>
                <p className="text-sm leading-5 font-light text-dark-blue-400">
                  Focused on refining design quality and improving user
                  experience
                </p>
              </CheckboxSelector>
              <CheckboxSelector size="md">
                <h1 className="text-sm leading-5 font-medium text-dark-blue-400">
                  Operational Efficiency & Optimization
                </h1>
                <p className="text-sm leading-5 font-light text-dark-blue-400">
                  Improving processes, streamlining workflows, or boosting team
                  productivity
                </p>
              </CheckboxSelector>
              <CheckboxSelector size="md">
                <h1 className="text-sm leading-5 font-medium text-dark-blue-400">
                  Product & Service Development
                </h1>
                <p className="text-sm leading-5 font-light text-dark-blue-400">
                  Looking to innovate, improve, or launch new products or
                  services
                </p>
              </CheckboxSelector>
              <CheckboxSelector size="md">
                <h1 className="text-sm leading-5 font-medium text-dark-blue-400">
                  Technology & Innovation
                </h1>
                <p className="text-sm leading-5 font-light text-dark-blue-400">
                  Adopting new tech, leveraging data, or improving their digital
                  tools
                </p>
              </CheckboxSelector>
              <CheckboxSelector size="md">
                <h1 className="text-sm leading-5 font-medium text-dark-blue-400">
                  Customer Engagement & Retention
                </h1>
                <p className="text-sm leading-5 font-light text-dark-blue-400">
                  Focused on boosting customer satisfaction, loyalty, and
                  interactions
                </p>
              </CheckboxSelector>
              <CheckboxSelector size="md">
                <h1 className="text-sm leading-5 font-medium text-dark-blue-400">
                  Recruitment & Team Building
                </h1>
                <p className="text-sm leading-5 font-light text-dark-blue-400">
                  Focused on boosting customer satisfaction, loyalty, and
                  interactions
                </p>
              </CheckboxSelector>
            </div>

            <div className="mt-[50px] flex items-center justify-between">
              <Button size="md" variant="outlined" visual="gray" type="button">
                Back
              </Button>

              <Button size="md" visual="primary">
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export const InviteYourTeam = () => {
  return (
    <div className="min-h-screen flex">
      <div className="relative p-[75px] w-[480px] shrink-0 flex flex-col bg-dark-blue-500">
        <Logo className="h-9 w-[245px] shrink-0" />

        <div className="mt-[94px]">
          <h1 className="text-[45px] leading-none font-bold text-white">
            Connect. Create. Conquer.
          </h1>

          <div className="mt-[30px]">
            <span className="text-white text-[22px] leading-[26.63px]">
              From ideas to execution, find the talent that can make it happen.
            </span>
          </div>
        </div>

        <Triangles className="absolute bottom-0 right-0" />

        <div className="relative mt-auto flex flex-col gap-y-5">
          <NextLink
            className="text-base leading-[19.36px] text-white hover:underline focus-visible:outline-none"
            href="/"
          >
            Already have an account?
          </NextLink>

          <div className="relative self-start">
            <Button
              className="hover:bg-white hover:text-dark-blue-400 border-white/[.2] text-white hover:border-white"
              size="lg"
              visual="gray"
              variant="outlined"
            >
              Sign In
            </Button>
            <Pointer className="absolute top-[34px] right-0 -rotate-6" />
          </div>
        </div>
      </div>

      <div className="relative flex justify-stretch items-center flex-auto py-[100px] px-[200px]">
        <div className="max-w-[560px] mx-auto">
          <div className="flex gap-x-2 items-center">
            <CircularProgress
              show={false}
              size={15.43}
              strokeWidth={2.5}
              value={30}
            />
            <span className="text-[11px] leading-[15.43px] text-gray-700">
              STEP 1 / 4
            </span>
          </div>

          <h1 className="text-2xl leading-[36px] mt-2 text-dark-blue-400 font-semibold">
            What brings you here today?
          </h1>

          <p className="text-base leading-[19.36px] text-dark-blue-400 mt-2 font-light">
            Whether you&apos;re here to hire or get hired, let&apos;s get you
            set up the right way.
          </p>

          <form className="mt-[50px]">
            <div className="flex items-center gap-x-3">
              <span className="text-lg leading-[36px] font-semibold">
                Add your teammates’ emails to invite them
              </span>
              <Info className="size-4 shrink-0 text-gray-500" />
            </div>

            <div className="flex flex-col gap-y-1.5 mt-1.5">
              <InputGroup>
                <Input type="email" placeholder="Enter email" />
                <InputRightElement>
                  <Mail className="text-gray-500 size-5" />
                </InputRightElement>
              </InputGroup>
              <InputGroup>
                <Input type="email" placeholder="Enter email" />
                <InputRightElement>
                  <Mail className="text-gray-500 size-5" />
                </InputRightElement>
              </InputGroup>
              <InputGroup>
                <Input type="email" placeholder="Enter email" />
                <InputRightElement>
                  <Mail className="text-gray-500 size-5" />
                </InputRightElement>
              </InputGroup>

              <Button
                className="text-gray-500/50 hover:text-gray-500 self-start"
                size="md"
                variant="link"
                visual="gray"
              >
                <Plus className="size-[15px]" /> Add Another
              </Button>
            </div>

            <div className="mt-[50px] flex items-center gap-x-[9px]">
              <span className="flex-auto inline-block h-px bg-gray-200" />
              <span className="text-xs leading-5 font-medium text-gray-500">
                Or
              </span>
              <span className="flex-auto inline-block h-px bg-gray-200" />
            </div>

            <div className="mt-[50px] flex items-center justify-between">
              <Button size="md" variant="outlined" visual="gray" type="button">
                Back
              </Button>

              <Button size="md" visual="primary">
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
