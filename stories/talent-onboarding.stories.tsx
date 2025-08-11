import React, { useEffect, useState } from "react"
import { HOT_KEYS } from "@/utils/constants"
import { getIsNotEmpty, hookFormHasError } from "@/utils/functions"
import { useControllableState, useUncontrolledState } from "@/utils/hooks"
import {
  AlertCircle,
  Briefcase02,
  Check,
  ChevronDown,
  ChevronRight,
  Home03,
  Plus,
  Upload,
  Users03,
  X2,
} from "@blend-metrics/icons"
import { ErrorMessage as HookFormErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { Meta } from "@storybook/react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { useToggle } from "react-use"
import { z } from "zod"
import { Logo } from "@/components/icons"
import { Pointer } from "@/components/icons/pointer"
import { Triangles } from "@/components/triangles"
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  Badge,
  Button,
  Checkbox,
  CircularProgress,
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
  ComboboxTrigger,
  ErrorMessage,
  ImageEditor,
  Input,
  Label,
  ScaleOutIn,
  ScrollArea,
} from "@/components/ui"

const meta: Meta = {
  title: "Talent Onboarding",
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

const introduceYourselfFormSchema = z.object({
  avatar: z
    .array(z.instanceof(File), {
      required_error: "Please select an avatar",
    })
    .min(1, "Please select an avatar"),
  firstName: z.string().min(1, "Please enter at least 1 character(s)"),
  lastName: z.string().min(1, "Please enter at least 1 character(s)"),
})

type IntroduceYourselfFormValues = z.infer<typeof introduceYourselfFormSchema>

export const IntroduceYourself = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<IntroduceYourselfFormValues>({
    resolver: zodResolver(introduceYourselfFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  })

  const onSubmit: SubmitHandler<IntroduceYourselfFormValues> = () => {}

  return (
    <div className="min-h-screen flex">
      <div className="relative p-[75px] w-[480px] shrink-0 flex flex-col bg-dark-blue-500">
        <Logo className="h-9 w-[245px] shrink-0" />

        <div className="mt-[80px]">
          <h1 className="text-[30px] leading-[36.31px] font-bold text-white">
            The Future of Remote Work Is Here...
          </h1>

          <ul className="mt-[30px] space-y-5">
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Find Tailored Projects
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Discover curated matches to elevate your talent.
                </p>
              </div>
            </li>
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Connect with Ideal Teams
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Collaborate with teams that align with your expertise.
                </p>
              </div>
            </li>
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Get Paid, Stress Free
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Secure contracts. Fast, hassle-free payments every time.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <Triangles className="absolute bottom-0 right-0" />

        <div className="relative mt-auto flex flex-col gap-y-5">
          <span className="text-base leading-[19.36px] text-white focus-visible:outline-none">
            Already have an account?
          </span>

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
        <div className="w-full max-w-[560px] mx-auto">
          <div className="flex gap-x-2 items-center">
            <CircularProgress
              show={false}
              size={15.43}
              strokeWidth={2.5}
              value={30}
            />
            <span className="text-[11px] leading-[15.43px] text-gray-700">
              STEP 1 / 5
            </span>
          </div>

          <h1 className="text-2xl leading-[36px] mt-2 text-dark-blue-400 font-semibold">
            Introduce yourself!
          </h1>

          <p className="text-base leading-[19.36px] text-dark-blue-400 mt-2 font-light">
            Tell us a bit about you to help us connect you with the right
            opportunities!
          </p>

          <form className="mt-[50px]" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="flex flex-col gap-y-1.5">
                <Label
                  className="text-dark-blue-400"
                  htmlFor="profile-photo"
                  asChild
                >
                  <span>Profile Photo</span>
                </Label>

                <Controller
                  control={control}
                  name="avatar"
                  render={({ field: { onChange } }) => (
                    <ImageEditor
                      onValueChange={onChange}
                      startingPoint={({ dataUrl, open, style }) => (
                        <div className="flex gap-x-3 items-center">
                          <div className="relative overflow-hidden size-[96px] bg-gray-100 rounded-full inline-flex items-center justify-center shrink-0">
                            {dataUrl ? (
                              <img
                                alt="Avatar"
                                src={dataUrl}
                                className="rounded-full absolute inset-0 size-full object-cover transform"
                                style={style}
                              />
                            ) : (
                              <span className="text-4xl leading-[44px] uppercase text-gray-300 font-medium">
                                ct
                              </span>
                            )}
                          </div>

                          {dataUrl ? (
                            <Button
                              className="rounded-full"
                              size="md"
                              onClick={open}
                              type="button"
                            >
                              Change Photo
                            </Button>
                          ) : (
                            <Button
                              className="rounded-full"
                              size="md"
                              type="button"
                              variant="outlined"
                              visual="gray"
                              onClick={open}
                            >
                              <Upload className="size-[15px]" /> Upload Picture
                            </Button>
                          )}
                        </div>
                      )}
                    />
                  )}
                />

                <HookFormErrorMessage
                  errors={errors}
                  name="avatar"
                  render={({ message }) => (
                    <ErrorMessage size="sm">{message}</ErrorMessage>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-x-6">
                <div className="flex flex-col gap-y-1.5">
                  <Label
                    className="text-dark-blue-400"
                    htmlFor="first-name"
                    size="sm"
                  >
                    First Name
                  </Label>
                  <Input
                    placeholder="John"
                    id="first-name"
                    {...register("firstName")}
                    isInvalid={hookFormHasError({ errors, name: "firstName" })}
                  />
                  <HookFormErrorMessage
                    errors={errors}
                    name="firstName"
                    render={({ message }) => (
                      <ErrorMessage size="sm">{message}</ErrorMessage>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-y-1.5">
                  <Label
                    className="text-dark-blue-400"
                    htmlFor="last-name"
                    size="sm"
                  >
                    Last Name
                  </Label>
                  <Input
                    placeholder="Doe"
                    id="last-name"
                    {...register("lastName")}
                    isInvalid={hookFormHasError({ errors, name: "lastName" })}
                  />
                  <HookFormErrorMessage
                    errors={errors}
                    name="lastName"
                    render={({ message }) => (
                      <ErrorMessage size="sm">{message}</ErrorMessage>
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="mt-[190px] flex items-center justify-between">
              <Button size="md" variant="outlined" visual="gray" type="button">
                Back
              </Button>

              <div className="flex items-center gap-x-10">
                <Button variant="ghost" visual="gray" type="button">
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

const createYourUsernameFormSchema = z.object({
  username: z.string().min(1, "Please enter at least 1 character(s)"),
})

type CreateYourUsernameFormValues = z.infer<typeof createYourUsernameFormSchema>

export const CreateYourUsername = () => {
  const [show, toggleShow] = useToggle(false)
  const {
    formState: { errors },
    setValue,
    register,
    handleSubmit,
  } = useForm<CreateYourUsernameFormValues>({
    resolver: zodResolver(createYourUsernameFormSchema),
  })
  const onSubmit: SubmitHandler<CreateYourUsernameFormValues> = () => {}
  return (
    <div className="min-h-screen flex">
      <div className="relative p-[75px] w-[480px] shrink-0 flex flex-col bg-dark-blue-500">
        <Logo className="h-9 w-[245px] shrink-0" />

        <div className="mt-[80px]">
          <h1 className="text-[30px] leading-[36.31px] font-bold text-white">
            The Future of Remote Work Is Here...
          </h1>

          <ul className="mt-[30px] space-y-5">
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Find Tailored Projects
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Discover curated matches to elevate your talent.
                </p>
              </div>
            </li>
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Connect with Ideal Teams
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Collaborate with teams that align with your expertise.
                </p>
              </div>
            </li>
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Get Paid, Stress Free
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Secure contracts. Fast, hassle-free payments every time.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <Triangles className="absolute bottom-0 right-0" />

        <div className="relative mt-auto flex flex-col gap-y-5">
          <span className="text-base leading-[19.36px] text-white focus-visible:outline-none">
            Already have an account?
          </span>

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
        <div className="max-w-[560px] w-full mx-auto">
          <div className="flex gap-x-2 items-center">
            <CircularProgress
              show={false}
              size={15.43}
              strokeWidth={2.5}
              value={30}
            />
            <span className="text-[11px] leading-[15.43px] text-gray-700">
              STEP 2 / 5
            </span>
          </div>

          <h1 className="text-2xl leading-[36px] mt-2 text-dark-blue-400 font-semibold">
            Create your username
          </h1>

          <p className="text-base leading-[19.36px] text-dark-blue-400 mt-2 font-light">
            Your username is one-of-a-kind, and you can always update it
            later...
          </p>

          <form className="mt-[50px]" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-1.5">
              <Label className="text-dark-blue-400" id="username" size="sm">
                Enter Your Username
              </Label>
              <Input
                id="username"
                {...register("username")}
                isInvalid={hookFormHasError({ errors, name: "username" })}
              />
              <HookFormErrorMessage
                errors={errors}
                name="username"
                render={({ message }) => (
                  <ErrorMessage size="sm">{message}</ErrorMessage>
                )}
              />
            </div>

            {show ? (
              <div className="mt-6">
                <Button
                  className="text-primary-500/50 hover:text-primary-500"
                  size="lg"
                  visual="gray"
                  variant="link"
                  type="button"
                  onClick={() => setValue("username", "@esha.design")}
                >
                  @esha.design
                </Button>
                ,{" "}
                <Button
                  className="text-primary-500/50 hover:text-primary-500"
                  size="lg"
                  visual="gray"
                  variant="link"
                  type="button"
                  onClick={() => setValue("username", "@esha.design")}
                >
                  @esha.design
                </Button>
                ,{" "}
                <Button
                  className="text-primary-500/50 hover:text-primary-500"
                  size="lg"
                  visual="gray"
                  variant="link"
                  type="button"
                  onClick={() => setValue("username", "@esha.designer")}
                >
                  @esha.designer
                </Button>
                ,{" "}
                <Button
                  className="text-primary-500/50 hover:text-primary-500"
                  size="lg"
                  visual="gray"
                  variant="link"
                  type="button"
                  onClick={() => setValue("username", "@esha.designer")}
                >
                  @esha.designer
                </Button>
                ,{" "}
                <Button
                  className="text-primary-500/50 hover:text-primary-500"
                  size="lg"
                  visual="gray"
                  variant="link"
                  type="button"
                  onClick={() => setValue("username", "@esha.designer")}
                >
                  @esha.designer
                </Button>
                ,{" "}
                <Button
                  className="text-primary-500/50 hover:text-primary-500"
                  size="lg"
                  visual="gray"
                  variant="link"
                  type="button"
                  onClick={() => setValue("username", "@esha.designer")}
                >
                  @esha.designer
                </Button>
                ,{" "}
                <Button
                  className="text-primary-500/50 hover:text-primary-500"
                  size="lg"
                  visual="gray"
                  variant="link"
                  type="button"
                  onClick={() => setValue("username", "@esha.designer")}
                >
                  @esha.designer
                </Button>
                ,{" "}
                <Button
                  className="text-primary-500/50 hover:text-primary-500"
                  size="lg"
                  visual="gray"
                  variant="link"
                  type="button"
                  onClick={() => setValue("username", "@esha.designer")}
                >
                  @esha.designer
                </Button>
                ,{" "}
                <Button
                  className="text-primary-500/50 hover:text-primary-500"
                  size="lg"
                  visual="gray"
                  variant="link"
                  type="button"
                  onClick={() => setValue("username", "@esha.designer")}
                >
                  @esha.designer
                </Button>
                ,{" "}
                <Button
                  className="text-primary-500/50 hover:text-primary-500"
                  size="lg"
                  visual="gray"
                  variant="link"
                  type="button"
                  onClick={() => setValue("username", "@esha.designer")}
                >
                  @esha.designer
                </Button>
                ,{" "}
                <Button
                  className="text-primary-500/50 hover:text-primary-500"
                  size="lg"
                  visual="gray"
                  variant="link"
                  type="button"
                  onClick={() => setValue("username", "@esha.designer")}
                >
                  @esha.designer
                </Button>
                ,{" "}
                <Button
                  className="text-primary-500/50 hover:text-primary-500"
                  size="lg"
                  visual="gray"
                  variant="link"
                  type="button"
                  onClick={() => setValue("username", "@esha.designer")}
                >
                  @esha.designer
                </Button>
              </div>
            ) : (
              <div className="mt-6">
                <span className="block text-sm leading-[16.94px] text-gray-500">
                  <Button
                    className="text-primary-500/50 hover:text-primary-500"
                    size="lg"
                    visual="gray"
                    variant="link"
                    type="button"
                    onClick={() => setValue("username", "@esha.design")}
                  >
                    @esha.design
                  </Button>
                  ,{" "}
                  <Button
                    className="text-primary-500/50 hover:text-primary-500"
                    size="lg"
                    visual="gray"
                    variant="link"
                    onClick={() => setValue("username", "@esha.design")}
                  >
                    @esha.design
                  </Button>
                  , and{" "}
                  <Button
                    className="text-primary-500/50 hover:text-primary-500"
                    size="lg"
                    visual="gray"
                    variant="link"
                    onClick={() => setValue("username", "@esha.designer")}
                  >
                    @esha.designer
                  </Button>{" "}
                  are available
                </span>

                <Button
                  className="mt-3"
                  size="md"
                  variant="link"
                  type="button"
                  visual="gray"
                  onClick={toggleShow}
                >
                  <Plus className="size-[15px]" />
                  More suggestions
                </Button>
              </div>
            )}

            <div className="mt-[50px]">
              <Alert>
                <AlertIcon>
                  <AlertCircle className="size-5" />
                </AlertIcon>
                <AlertContent>
                  <AlertDescription className="mt-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Aliquid pariatur, ipsum similique veniam.
                  </AlertDescription>
                </AlertContent>
              </Alert>
            </div>

            <div className="mt-[134px] flex items-center justify-between">
              <Button size="md" variant="outlined" visual="gray" type="button">
                Back
              </Button>

              <div className="flex items-center gap-x-10">
                <Button variant="ghost" visual="gray" type="button">
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

const shareYourGoalsFormSchema = z.object({
  location: z.string().min(1, "Please enter at least 1 character(s)"),
  languages: z.string().min(1, "Please enter at least 1 character(s)"),
})

type ShareYourGoalsFormValues = z.infer<typeof shareYourGoalsFormSchema>

export const ShareYourLocation = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ShareYourGoalsFormValues>({
    resolver: zodResolver(shareYourGoalsFormSchema),
  })
  const onSubmit: SubmitHandler<ShareYourGoalsFormValues> = (values) => {}
  return (
    <div className="min-h-screen flex">
      <div className="relative p-[75px] w-[480px] shrink-0 flex flex-col bg-dark-blue-500">
        <Logo className="h-9 w-[245px] shrink-0" />

        <div className="mt-[80px]">
          <h1 className="text-[30px] leading-[36.31px] font-bold text-white">
            The Future of Remote Work Is Here...
          </h1>

          <ul className="mt-[30px] space-y-5">
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Find Tailored Projects
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Discover curated matches to elevate your talent.
                </p>
              </div>
            </li>
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Connect with Ideal Teams
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Collaborate with teams that align with your expertise.
                </p>
              </div>
            </li>
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Get Paid, Stress Free
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Secure contracts. Fast, hassle-free payments every time.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <Triangles className="absolute bottom-0 right-0" />

        <div className="relative mt-auto flex flex-col gap-y-5">
          <span className="text-base leading-[19.36px] text-white focus-visible:outline-none">
            Already have an account?
          </span>

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
        <div className="max-w-[560px] w-full mx-auto">
          <div className="flex gap-x-2 items-center">
            <CircularProgress
              show={false}
              size={15.43}
              strokeWidth={2.5}
              value={30}
            />
            <span className="text-[11px] leading-[15.43px] text-gray-700">
              STEP 3 / 5
            </span>
          </div>

          <h1 className="text-2xl leading-[36px] mt-2 text-dark-blue-400 font-semibold">
            Share your location
          </h1>

          <p className="text-base leading-[19.36px] text-dark-blue-400 mt-2 font-light">
            Share your information to tailor your experience and project
            matches..
          </p>

          <form className="mt-[50px]" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="flex flex-col gap-y-1.5">
                <Label
                  className="text-dark-blue-400"
                  htmlFor="username"
                  size="sm"
                >
                  What’s your location?
                </Label>
                <Input
                  id="username"
                  placeholder="Enter your city or town"
                  {...register("location")}
                  isInvalid={hookFormHasError({ errors, name: "location" })}
                />
                <HookFormErrorMessage
                  errors={errors}
                  name="location"
                  render={({ message }) => (
                    <ErrorMessage size="sm">{message}</ErrorMessage>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-1.5">
                <Label
                  className="text-dark-blue-400"
                  htmlFor="speaking-language"
                  size="sm"
                >
                  What languages do you speak?
                </Label>
                <Input
                  id="speaking-language"
                  placeholder="Enter your languages"
                  {...register("languages")}
                  isInvalid={hookFormHasError({ errors, name: "languages" })}
                />
                <HookFormErrorMessage
                  errors={errors}
                  name="languages"
                  render={({ message }) => (
                    <ErrorMessage size="sm">{message}</ErrorMessage>
                  )}
                />
              </div>
            </div>

            <div className="mt-[134px] flex items-center justify-between">
              <Button size="md" variant="outlined" visual="gray" type="button">
                Back
              </Button>

              <div className="flex items-center gap-x-10">
                <Button variant="ghost" visual="gray" type="button">
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

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "HTML",
  "CSS",
  "Git",
  "REST APIs",
  "GraphQL",
  "SQL",
  "NoSQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "Azure",
  "Google Cloud",
  "Agile Methodologies",
  "Test-Driven Development (TDD)",
  "CI/CD",
  "Machine Learning",
  "Data Analysis",
  "UI/UX Design",
  "Version Control",
  "Web Security",
]

const TopSkills = ({
  onValueChange,
  value: valueProp,
  invalid,
}: {
  value?: string[]
  onValueChange?: (values: string[]) => void
  invalid?: boolean
}) => {
  const [inputValue, setInputValue] = useState("")
  const [values, setValues] = useControllableState<string[]>({
    defaultValue: [],
    value: valueProp,
    onChange: onValueChange,
  })
  const [selected, setSelected] = useState<string[]>([])

  const resetInputValue = () => setInputValue("")

  const addValue = () => {
    if (!inputValue) return

    setValues((prev) => {
      return prev.includes(inputValue) ? prev : [...prev, inputValue]
    })
    resetInputValue()
  }

  const removeValue = (index: number) => {
    const tag = values[index]

    setValues((prev) => {
      const nextState = prev.filter((_, i) => i !== index)
      return nextState
    })
    setSelected((prev) => {
      const nextState = prev.filter((value) => value !== tag)
      return nextState
    })
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setInputValue(value)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    if (key === HOT_KEYS.ENTER) addValue()
  }

  const filteredRoles = skills.filter((skill) =>
    skill.toLowerCase().includes(inputValue.toLowerCase())
  )

  useEffect(() => {
    setValues((preValues) => {
      const filteredSelected = selected.filter(
        (value) => !preValues.includes(value)
      )
      return [...preValues, ...filteredSelected]
    })
  }, [selected])

  return (
    <div className="space-y-3">
      <Combobox
        className="w-full"
        value={selected}
        onChange={setSelected}
        multiple
      >
        <ComboboxTrigger className="flex flex-col gap-y-1.5">
          <ComboboxLabel size="sm" className="text-dark-blue-400">
            Who are you looking to work with?
          </ComboboxLabel>
          <ComboboxInput
            size="lg"
            className="pl-3.5"
            placeholder="Enter job titles related to your project"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={inputValue}
            invalid={invalid}
          />
        </ComboboxTrigger>

        <ScaleOutIn afterLeave={() => setInputValue("")}>
          <ComboboxOptions>
            <ScrollArea viewportClassName="max-h-[304px]">
              {filteredRoles.map((role, index) => (
                <ComboboxOption key={index} value={role}>
                  {role}
                </ComboboxOption>
              ))}
            </ScrollArea>
          </ComboboxOptions>
        </ScaleOutIn>
      </Combobox>

      {getIsNotEmpty(values) && (
        <div className="flex flex-wrap gap-3">
          {values.map((item, index) => (
            <Badge visual="primary" key={index}>
              {item}
              <button
                className="focus-visible:outline-none"
                onClick={() => removeValue(index)}
                type="button"
              >
                <X2 className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

const showcaseYourTalentFormSchema = z.object({
  recentJobTitle: z.string().min(1, "Please enter at least 1 character(s)"),
  industriesWorkedWith: z
    .string()
    .min(1, "Please enter at least 1 character(s)"),
  yourTopSkills: z.array(z.string()).min(1, "Please enter at least 1 skill(s)"),
  studying: z.boolean(),
})

type ShowcaseYourTalentFormValues = z.infer<typeof showcaseYourTalentFormSchema>

export const ShowcaseYourTalent = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<ShowcaseYourTalentFormValues>({
    resolver: zodResolver(showcaseYourTalentFormSchema),
    defaultValues: {
      industriesWorkedWith: "",
      recentJobTitle: "",
      studying: false,
    },
  })
  const onSubmit: SubmitHandler<ShowcaseYourTalentFormValues> = (values) => {}
  return (
    <div className="min-h-screen flex">
      <div className="relative p-[75px] w-[480px] shrink-0 flex flex-col bg-dark-blue-500">
        <Logo className="h-9 w-[245px] shrink-0" />

        <div className="mt-[80px]">
          <h1 className="text-[30px] leading-[36.31px] font-bold text-white">
            The Future of Remote Work Is Here...
          </h1>

          <ul className="mt-[30px] space-y-5">
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Find Tailored Projects
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Discover curated matches to elevate your talent.
                </p>
              </div>
            </li>
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Connect with Ideal Teams
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Collaborate with teams that align with your expertise.
                </p>
              </div>
            </li>
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Get Paid, Stress Free
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Secure contracts. Fast, hassle-free payments every time.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <Triangles className="absolute bottom-0 right-0" />

        <div className="relative mt-auto flex flex-col gap-y-5">
          <span className="text-base leading-[19.36px] text-white focus-visible:outline-none">
            Already have an account?
          </span>

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
        <div className="max-w-[560px] w-full mx-auto">
          <div className="flex gap-x-2 items-center">
            <CircularProgress
              show={false}
              size={15.43}
              strokeWidth={2.5}
              value={30}
            />
            <span className="text-[11px] leading-[15.43px] text-gray-700">
              STEP 4 / 5
            </span>
          </div>

          <h1 className="text-2xl leading-[36px] mt-2 text-dark-blue-400 font-semibold">
            Showcase your talent
          </h1>

          <p className="text-base leading-[19.36px] text-dark-blue-400 mt-2 font-light">
            Highlight your skills and expertise to attract the projects that
            suit you best
          </p>

          <form className="mt-[50px]" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="flex flex-col gap-y-1.5">
                <Label
                  size="sm"
                  className="text-dark-blue-400"
                  htmlFor="recent-job-title"
                >
                  What’s your most recent job title?
                </Label>
                <Input
                  id="recent-job-title"
                  placeholder="e.g., Software Developer"
                  {...register("recentJobTitle")}
                  isInvalid={hookFormHasError({
                    errors,
                    name: "recentJobTitle",
                  })}
                />
                <HookFormErrorMessage
                  errors={errors}
                  name="recentJobTitle"
                  render={({ message }) => (
                    <ErrorMessage size="sm">{message}</ErrorMessage>
                  )}
                />
              </div>
              <div className="flex flex-col gap-y-1.5">
                <Label
                  size="sm"
                  className="text-dark-blue-400"
                  htmlFor="industries"
                >
                  Which industries have you worked in?
                </Label>
                <Input
                  id="industries"
                  placeholder="e.g., Banking"
                  {...register("industriesWorkedWith")}
                  isInvalid={hookFormHasError({
                    errors,
                    name: "industriesWorkedWith",
                  })}
                />
                <HookFormErrorMessage
                  errors={errors}
                  name="industriesWorkedWith"
                  render={({ message }) => (
                    <ErrorMessage size="sm">{message}</ErrorMessage>
                  )}
                />
              </div>

              <div className="flex flex-col gap-y-1.5">
                <Controller
                  control={control}
                  name="yourTopSkills"
                  render={({ field: { value, onChange } }) => (
                    <TopSkills
                      value={value}
                      onValueChange={onChange}
                      invalid={hookFormHasError({
                        errors,
                        name: "yourTopSkills",
                      })}
                    />
                  )}
                />
                <HookFormErrorMessage
                  errors={errors}
                  name="yourTopSkills"
                  render={({ message }) => (
                    <ErrorMessage size="sm">{message}</ErrorMessage>
                  )}
                />
              </div>

              <div className="mt-6 flex flex-row-reverse justify-end items-center gap-x-5">
                <Label size="sm" htmlFor="studying">
                  I’m currently a student{" "}
                </Label>
                <Controller
                  control={control}
                  name="studying"
                  render={({ field: { value, onChange, ...field } }) => (
                    <Checkbox
                      id="studying"
                      checked={value}
                      onCheckedChange={onChange}
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <div className="mt-[50px] flex items-center justify-between">
              <Button size="md" variant="outlined" visual="gray" type="button">
                Back
              </Button>

              <div className="flex items-center gap-x-10">
                <Button variant="ghost" visual="gray" type="button">
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

const ProjectPreferences = ({
  invalid,
  onValueChange,
  value: valueProp,
}: {
  invalid?: boolean
  onValueChange?: (values: string[]) => void
  value?: string[]
}) => {
  const [inputValue, setInputValue] = useState("")
  const [values, setValues] = useControllableState<string[]>({
    defaultValue: [],
    onChange: onValueChange,
    value: valueProp,
  })
  const [selected, setSelected] = useState<string[]>([])

  const resetInputValue = () => setInputValue("")

  const addValue = () => {
    if (!inputValue) return

    setValues((prev) => {
      return prev.includes(inputValue) ? prev : [...prev, inputValue]
    })
    resetInputValue()
  }

  const removeValue = (index: number) => {
    const tag = values[index]

    setValues((prev) => {
      const nextState = prev.filter((_, i) => i !== index)
      return nextState
    })
    setSelected((prev) => {
      const nextState = prev.filter((value) => value !== tag)
      return nextState
    })
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setInputValue(value)
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = event
    if (key === HOT_KEYS.ENTER) addValue()
  }

  const filteredRoles = skills.filter((skill) =>
    skill.toLowerCase().includes(inputValue.toLowerCase())
  )

  useEffect(() => {
    setValues((preValues) => {
      const filteredSelected = selected.filter(
        (value) => !preValues.includes(value)
      )
      return [...preValues, ...filteredSelected]
    })
  }, [selected])

  return (
    <div className="space-y-3">
      <Combobox
        className="w-full"
        value={selected}
        onChange={setSelected}
        multiple
      >
        <ComboboxTrigger className="flex flex-col gap-y-1.5">
          <ComboboxLabel size="sm" className="text-dark-blue-400">
            What types of projects would you like to work on?
          </ComboboxLabel>
          <ComboboxInput
            size="lg"
            className="pl-3.5"
            placeholder="Enter your project preferences (e.g., Data Analysis)"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={inputValue}
            invalid={invalid}
          />
        </ComboboxTrigger>

        <ScaleOutIn afterLeave={() => setInputValue("")}>
          <ComboboxOptions>
            <ScrollArea viewportClassName="max-h-[304px]">
              {filteredRoles.map((role, index) => (
                <ComboboxOption key={index} value={role}>
                  {role}
                </ComboboxOption>
              ))}
            </ScrollArea>
          </ComboboxOptions>
        </ScaleOutIn>
      </Combobox>

      {getIsNotEmpty(values) && (
        <div className="flex flex-wrap gap-3">
          {values.map((item, index) => (
            <Badge visual="primary" key={index}>
              {item}
              <button
                className="focus-visible:outline-none"
                onClick={() => removeValue(index)}
                type="button"
              >
                <X2 className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

const YourAvailability = ({
  invalid,
  onValueChange,
  value: valueProp,
}: {
  invalid?: boolean
  onValueChange?: (values: string) => void
  value?: string
}) => {
  const [inputValue, setInputValue] = useState("")
  const [value, setValue] = useControllableState({
    onChange: onValueChange,
    value: valueProp,
  })

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event
    setInputValue(value)
  }

  const filteredRoles = skills.filter((skill) =>
    skill.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <div className="space-y-3">
      <Combobox
        className="w-full flex flex-col gap-y-1.5"
        value={value}
        onChange={setValue}
      >
        <ComboboxLabel size="sm" className="text-dark-blue-400">
          What’s your availability?
        </ComboboxLabel>
        <ComboboxTrigger>
          <ComboboxInput
            size="lg"
            className="pl-3.5 pr-[42px]"
            placeholder="Select availability"
            onChange={onChange}
            invalid={invalid}
          />
          <ComboboxButton align="right">
            <ChevronDown className="size-4" />
          </ComboboxButton>
        </ComboboxTrigger>

        <ScaleOutIn afterLeave={() => setInputValue("")}>
          <ComboboxOptions className="top-full">
            <ScrollArea viewportClassName="max-h-[304px]">
              {filteredRoles.map((role, index) => (
                <ComboboxOption key={index} value={role}>
                  {role}
                </ComboboxOption>
              ))}
            </ScrollArea>
          </ComboboxOptions>
        </ScaleOutIn>
      </Combobox>
    </div>
  )
}

const setYourPreferencesFormSchema = z.object({
  projects: z.array(z.string()).min(1, "Please enter at least 1 project(s)"),
  yourAvailability: z.string().min(1, "Please enter at least 1 project(s)"),
})

type SetYourPreferencesFormValues = z.infer<typeof setYourPreferencesFormSchema>

export const SetYourPreferences = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<SetYourPreferencesFormValues>({
    resolver: zodResolver(setYourPreferencesFormSchema),
  })
  const onSubmit: SubmitHandler<SetYourPreferencesFormValues> = (values) => {}
  return (
    <div className="min-h-screen flex">
      <div className="relative p-[75px] w-[480px] shrink-0 flex flex-col bg-dark-blue-500">
        <Logo className="h-9 w-[245px] shrink-0" />

        <div className="mt-[80px]">
          <h1 className="text-[30px] leading-[36.31px] font-bold text-white">
            The Future of Remote Work Is Here...
          </h1>

          <ul className="mt-[30px] space-y-5">
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Find Tailored Projects
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Discover curated matches to elevate your talent.
                </p>
              </div>
            </li>
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Connect with Ideal Teams
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Collaborate with teams that align with your expertise.
                </p>
              </div>
            </li>
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Get Paid, Stress Free
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Secure contracts. Fast, hassle-free payments every time.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <Triangles className="absolute bottom-0 right-0" />

        <div className="relative mt-auto flex flex-col gap-y-5">
          <span className="text-base leading-[19.36px] text-white focus-visible:outline-none">
            Already have an account?
          </span>

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
        <div className="max-w-[560px] w-full mx-auto">
          <div className="flex gap-x-2 items-center">
            <CircularProgress
              show={false}
              size={15.43}
              strokeWidth={2.5}
              value={30}
            />
            <span className="text-[11px] leading-[15.43px] text-gray-700">
              STEP 5 / 5
            </span>
          </div>

          <h1 className="text-2xl leading-[36px] mt-2 text-dark-blue-400 font-semibold">
            Set your preferences
          </h1>

          <p className="text-base leading-[19.36px] text-dark-blue-400 mt-2 font-light">
            Give us insights into your team to help us make things even
            smoother.
          </p>

          <form className="mt-[50px]" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div className="flex flex-col gap-y-1.5">
                <Controller
                  control={control}
                  name="projects"
                  render={({ field: { value, onChange } }) => (
                    <ProjectPreferences
                      value={value}
                      onValueChange={onChange}
                      invalid={hookFormHasError({ errors, name: "projects" })}
                    />
                  )}
                />
                <HookFormErrorMessage
                  name="projects"
                  errors={errors}
                  render={({ message }) => (
                    <ErrorMessage size="sm">{message}</ErrorMessage>
                  )}
                />
              </div>

              <div className="flex flex-col gap-y-1.5">
                <Controller
                  control={control}
                  name="yourAvailability"
                  render={({ field: { value, onChange } }) => (
                    <YourAvailability
                      value={value}
                      onValueChange={onChange}
                      invalid={hookFormHasError({ errors, name: "projects" })}
                    />
                  )}
                />
                <HookFormErrorMessage
                  name="yourAvailability"
                  errors={errors}
                  render={({ message }) => (
                    <ErrorMessage size="sm">{message}</ErrorMessage>
                  )}
                />
              </div>
            </div>

            <div className="mt-[174px] flex items-center justify-between">
              <Button size="md" variant="outlined" visual="gray" type="button">
                Back
              </Button>

              <div className="flex items-center gap-x-10">
                <Button variant="ghost" visual="gray" type="button">
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

export const LastStep = () => {
  return (
    <div className="min-h-screen flex">
      <div className="relative p-[75px] w-[480px] shrink-0 flex flex-col bg-dark-blue-500">
        <Logo className="h-9 w-[245px] shrink-0" />

        <div className="mt-[94px]">
          <h1 className="text-[30px] leading-[36.31px] font-bold text-white">
            The Future of Remote Work Is Here...
          </h1>

          <ul className="mt-[30px] space-y-5">
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Find Tailored Projects
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Discover curated matches to elevate your talent.
                </p>
              </div>
            </li>
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Connect with Ideal Teams
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Collaborate with teams that align with your expertise.
                </p>
              </div>
            </li>
            <li className="flex gap-x-3">
              <Check className="size-7 shrink-0 text-primary-500" />

              <div className="pt-[5px] space-y-1 flex-auto">
                <h3 className="text-base leading-[19.36px] text-white font-bold">
                  Get Paid, Stress Free
                </h3>
                <p className="text-sm leading-[16.94px] text-white">
                  Secure contracts. Fast, hassle-free payments every time.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <Triangles className="absolute bottom-0 right-0" />
      </div>

      <div className="relative flex justify-stretch items-center flex-auto py-[100px] px-[150px]">
        <div className="max-w-[660px] w-full mx-auto">
          <h1 className="text-2xl leading-[36px] mt-2 text-dark-blue-400 font-semibold">
            What would you like to do next?
          </h1>

          <p className="text-base leading-[19.36px] text-dark-blue-400 mt-2 font-light">
            Choose your next move and get started
          </p>

          <div className="mt-[50px] grid grid-cols-2 gap-5">
            <div className="p-3 flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)] hover:ring-1 hover:ring-gray-300 hover:border-gray-300 cursor-pointer transition duration-300">
              <div className="flex items-center gap-x-3">
                <div className="size-11 rounded-lg border-[1.5px] shrink-0 inline-flex items-center justify-center border-[#EAECF0] text-primary-500">
                  <Briefcase02 className="size-5" />
                </div>
                <span className="text-sm leading-[16.94px] inline-block font-medium text-gray-900">
                  Browse Projects
                </span>
              </div>

              <ChevronRight className="shrink-0 size-5" />
            </div>
            <div className="p-3 flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)] hover:ring-1 hover:ring-gray-300 hover:border-gray-300 cursor-pointer transition duration-300">
              <div className="flex items-center gap-x-3">
                <div className="size-11 rounded-lg border-[1.5px] shrink-0 inline-flex items-center justify-center border-[#EAECF0] text-primary-500">
                  <Users03 className="size-5" />
                </div>
                <span className="text-sm leading-[16.94px] inline-block font-medium text-gray-900">
                  Browse Teams
                </span>
              </div>

              <ChevronRight className="shrink-0 size-5" />
            </div>
            <div className="p-3 flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)] hover:ring-1 hover:ring-gray-300 hover:border-gray-300 cursor-pointer transition duration-300">
              <div className="flex items-center gap-x-3">
                <div className="size-11 rounded-lg border-[1.5px] shrink-0 inline-flex items-center justify-center border-[#EAECF0] text-primary-500">
                  <Briefcase02 className="size-5" />
                </div>
                <span className="text-sm leading-[16.94px] inline-block font-medium text-gray-900">
                  Find Talent
                </span>
              </div>

              <ChevronRight className="shrink-0 size-5" />
            </div>
            <div className="p-3 flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)] hover:ring-1 hover:ring-gray-300 hover:border-gray-300 cursor-pointer transition duration-300">
              <div className="flex items-center gap-x-3">
                <div className="size-11 rounded-lg border-[1.5px] shrink-0 inline-flex items-center justify-center border-[#EAECF0] text-primary-500">
                  <Briefcase02 className="size-5" />
                </div>
                <span className="text-sm leading-[16.94px] inline-block font-medium text-gray-900">
                  Browse Projects
                </span>
              </div>

              <ChevronRight className="shrink-0 size-5" />
            </div>
          </div>

          <div className="mt-[290px] flex justify-end">
            <Button className="text-primary-500" variant="link" visual="gray">
              <Home03 className="size-[15px]" /> Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
