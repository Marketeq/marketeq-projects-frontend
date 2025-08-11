"use client"

import React, { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { USERNAME_SUGGESTIONS_LIST } from "@/constants/username-suggestions"
import { useAuth } from "@/contexts/auth"
import AuthenticatedRoute from "@/hoc/AuthenticatedRoute"
import { AuthAPI } from "@/service/http/auth"
import { TalentAPI } from "@/service/http/talent"
import { DAY_PERIODS, HOT_KEYS, TIMES } from "@/utils/constants"
import {
  capitalize,
  cn,
  getIsNotEmpty,
  hookFormHasError,
  noop,
} from "@/utils/functions"
import { useControllableState, useStepper } from "@/utils/hooks"
import {
  AlertCircle,
  Briefcase02,
  Check,
  ChevronRight,
  Home03,
  Plus,
  Trash03,
  Upload,
  Users03,
  X,
  X2,
} from "@blend-metrics/icons"
import { ErrorMessage as HookFormErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { Time } from "@internationalized/date"
import { Steps } from "headless-stepper"
import {
  Controller,
  SubmitHandler,
  UseFormSetValue,
  useForm,
  useWatch,
} from "react-hook-form"
import {
  useDebounce,
  useIsomorphicLayoutEffect,
  useToggle,
  useUpdateEffect,
} from "react-use"
import { z } from "zod"
import { DAYS } from "@/types/day"
import { AVAILABILITY, CreateTalentType } from "@/types/talent"
import { User } from "@/types/user"
import { Spinner } from "@/components/ui/spinner/spinner"
import { Logo } from "@/components/icons"
import { Pointer } from "@/components/icons/pointer"
import NextLink from "@/components/next-link"
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
  IconButton,
  ImageEditor,
  Input,
  Label,
  ScaleOutIn,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Step,
  StepControl,
  StepRootProvider,
  StepperProvider,
  Switch,
  buttonVariants,
  useStepContext,
  useStepRootContext,
  useStepperContext,
  useToast,
} from "@/components/ui"

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

const IntroduceYourself = ({
  sidebar,
  stepData,
  setStepData,
}: {
  sidebar: React.ReactNode
  stepData: CreateTalentType | null
  setStepData: React.Dispatch<React.SetStateAction<CreateTalentType | null>>
}) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm<IntroduceYourselfFormValues>({
    resolver: zodResolver(introduceYourselfFormSchema),
    defaultValues: {
      avatar: stepData?.avatar ? [stepData?.avatar] : undefined,
      firstName: stepData?.firstName || "",
      lastName: stepData?.lastName || "",
    },
  })
  const { toggleValidation } = useStepContext()
  const { nextStep, setStep } = useStepperContext()

  useIsomorphicLayoutEffect(() => toggleValidation(isValid), [isValid])

  const { totalSteps, currentStep } = useStepRootContext()

  const progress = ((currentStep + 1) / totalSteps) * 100

  const onSubmit: SubmitHandler<IntroduceYourselfFormValues> = ({
    avatar,
    firstName,
    lastName,
  }) => {
    setStepData({
      ...stepData,
      firstName,
      lastName,
      avatar: avatar[0],
    })

    nextStep()
  }

  const skip = () => {
    toggleValidation(true)
    const nextStepIndex = currentStep + 1
    setStep(nextStepIndex)
  }

  return (
    <div className="min-h-screen flex lg:pl-[480px] bg-white">
      {sidebar}

      <form
        className="relative grid items-start flex-auto py-10 px-5 md:px-10 lg:py-[100px] lg:px-[200px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full max-w-[488px] lg:max-w-[560px] mx-auto">
          <div className="flex gap-x-2 items-center">
            <CircularProgress
              show={false}
              size={15.43}
              strokeWidth={2.5}
              value={progress}
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

          <div className="mt-10 lg:mt-[50px]">
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
                              className="rounded-full bg-primary-50 text-primary-500 hover:text-white hover:bg-primary-500"
                              size="md"
                              onClick={open}
                              type="button"
                            >
                              Change Photo
                            </Button>
                          ) : (
                            <Button
                              className="rounded-full bg-primary-50 text-primary-500 hover:text-white hover:bg-primary-500"
                              size="md"
                              type="button"
                              variant="filled"
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

              <div className="grid lg:grid-cols-2 gap-6">
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
          </div>
        </div>

        <div className="mx-auto max-w-[488px] lg:max-w-[560px] self-end w-full mt-10 lg:mt-[50px]">
          <div className="flex items-center justify-between">
            <NextLink
              className={cn(
                buttonVariants({
                  size: "md",
                  variant: "outlined",
                  visual: "gray",
                })
              )}
              href="/onboarding"
            >
              Back
            </NextLink>

            <div className="flex items-center gap-x-6">
              <Button
                className="opacity-50 hover:opacity-100"
                variant="ghost"
                visual="gray"
                type="button"
                size="md"
                onClick={skip}
              >
                Skip
              </Button>
              <Button size="md" visual="primary">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const createYourUsernameFormSchema = z.object({
  username: z.string()?.trim().min(3, "Please enter at least 3 character(s)"),
})

type CreateYourUsernameFormValues = z.infer<typeof createYourUsernameFormSchema>

const CreateYourUsername = ({
  sidebar,
  stepData,
  setStepData,
}: {
  sidebar: React.ReactNode
  stepData: CreateTalentType | null
  setStepData: React.Dispatch<React.SetStateAction<CreateTalentType | null>>
}) => {
  const [show, toggleShow] = useToggle(false)
  const [isAvailable, setIsAvailable] = React.useState<boolean | null>(null)
  const [isUsernameLoading, setIsUsernameLoading] = useToggle(false)

  const {
    watch,
    formState: { errors, isValid },
    setValue,
    register,
    handleSubmit,
    trigger,
    clearErrors,
    setError,
  } = useForm<CreateYourUsernameFormValues>({
    resolver: zodResolver(createYourUsernameFormSchema),
    defaultValues: {
      username: stepData?.username || "",
    },
  })

  const { username } = watch()

  const { toggleValidation } = useStepContext()
  const { nextStep, prevStep, setStep } = useStepperContext()

  useIsomorphicLayoutEffect(() => toggleValidation(isValid), [isValid])

  const onSubmit: SubmitHandler<CreateYourUsernameFormValues> = ({
    username,
  }) => {
    setStepData({
      ...stepData,
      username,
    })
    nextStep()
  }
  const setFormValue: UseFormSetValue<CreateYourUsernameFormValues> = (
    key,
    value
  ) => {
    setValue(key, value)
    trigger(key)
  }

  const { totalSteps, currentStep } = useStepRootContext()

  const progress = ((currentStep + 1) / totalSteps) * 100

  const skip = () => {
    toggleValidation(true)
    const nextStepIndex = currentStep + 1
    setStep(nextStepIndex)
  }

  const back = () => {
    setStepData({
      ...stepData,
      username,
    })
    prevStep()
  }

  const checkUsernameAvailability = () => {
    if (username?.length > 2) {
      setIsUsernameLoading(true)
      clearErrors("username")

      AuthAPI.CheckUsername({ username })
        .then((response) => {
          if (response?.status === 200 && response?.data?.available) {
            setIsAvailable(response?.data?.available)
          } else {
            setIsAvailable(false)
          }
        })
        .catch((error) => {
          if (error?.response?.data?.errors?.message) {
            setError(
              "username",
              {
                ...errors?.username,
                message: error?.response?.data?.errors?.message,
              },
              {
                shouldFocus: true,
              }
            )
            setIsAvailable(false)
          }
        })
        .finally(() => {
          setIsUsernameLoading(false)
        })
    }
  }

  useDebounce(checkUsernameAvailability, 700, [username])

  return (
    <div className="min-h-screen flex lg:pl-[480px] bg-white">
      {sidebar}

      <form
        className="relative grid items-start flex-auto px-5 md:px-10 py-10 lg:py-[100px] lg:px-[200px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="max-w-[488px] lg:max-w-[560px] w-full mx-auto">
          <div className="flex gap-x-2 items-center">
            <CircularProgress
              show={false}
              size={15.43}
              strokeWidth={2.5}
              value={progress}
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

          <div className="mt-[50px]">
            <div className="flex flex-col gap-y-1.5">
              <Label className="text-dark-blue-400" id="username" size="sm">
                Enter Your Username
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  {...register("username")}
                  isInvalid={hookFormHasError({ errors, name: "username" })}
                  onKeyUp={(e) => {
                    if (username?.length < 3) {
                      setIsAvailable(null)
                    }
                  }}
                  className="pr-32"
                />

                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  {isUsernameLoading ? (
                    <Spinner size={20} strokeWidth={2} />
                  ) : (
                    <>
                      {isAvailable === false && (
                        <ErrorMessage
                          size="sm"
                          className="flex flex-row items-center gap-0.5"
                        >
                          <X width={20} height={20} /> Not Available
                        </ErrorMessage>
                      )}

                      {isAvailable && (
                        <ErrorMessage
                          size="sm"
                          className="text-emerald-600 flex flex-row items-center gap-0.5"
                        >
                          <Check />
                          Available
                        </ErrorMessage>
                      )}
                    </>
                  )}
                </div>
              </div>
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
                {USERNAME_SUGGESTIONS_LIST?.map((username, index) => (
                  <>
                    <Button
                      key={index}
                      className="text-primary-500/50 hover:text-primary-500"
                      size="lg"
                      visual="gray"
                      variant="link"
                      type="button"
                      onClick={() => setFormValue("username", username)}
                    >
                      {username}
                    </Button>

                    {index !== USERNAME_SUGGESTIONS_LIST?.length - 1 && (
                      <span>, </span>
                    )}
                  </>
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <span className="block text-sm leading-[16.94px] text-gray-500">
                  {USERNAME_SUGGESTIONS_LIST?.slice(0, 3)?.map(
                    (username, index) => (
                      <>
                        <Button
                          key={index}
                          className="text-primary-500/50 hover:text-primary-500"
                          size="lg"
                          visual="gray"
                          variant="link"
                          type="button"
                          onClick={() => setFormValue("username", username)}
                        >
                          {username}
                        </Button>

                        {index === 0 && <span>, </span>}
                        {index === 1 && <span> and </span>}
                      </>
                    )
                  )}{" "}
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
                    {`Feel free to browse projects and explore talent without a username. To connect with profiles or post a project, you'll need to create one.`}
                  </AlertDescription>
                </AlertContent>
              </Alert>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[488px] lg:max-w-[560px] self-end w-full mt-10 lg:mt-[50px]">
          <div className="flex items-center justify-between">
            <Button
              size="md"
              variant="outlined"
              visual="gray"
              type="button"
              onClick={back}
            >
              Back
            </Button>

            <div className="flex items-center gap-x-6">
              <Button
                className="opacity-50 hover:opacity-100"
                variant="ghost"
                visual="gray"
                type="button"
                size="md"
                onClick={skip}
              >
                Skip
              </Button>
              <Button
                disabled={isAvailable === false}
                size="md"
                visual="primary"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const shareYourGoalsFormSchema = z.object({
  location: z.string().min(1, "Please enter at least 1 character(s)"),
  languages: z.string().min(1, "Please enter at least 1 character(s)"),
})

type ShareYourGoalsFormValues = z.infer<typeof shareYourGoalsFormSchema>

const ShareYourLocation = ({
  sidebar,
  stepData,
  setStepData,
}: {
  sidebar: React.ReactNode
  stepData: CreateTalentType | null
  setStepData: React.Dispatch<React.SetStateAction<CreateTalentType | null>>
}) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm<ShareYourGoalsFormValues>({
    resolver: zodResolver(shareYourGoalsFormSchema),
    defaultValues: {
      location: stepData?.location || "",
      languages: stepData?.language || "",
    },
  })
  const { toggleValidation } = useStepContext()
  const { nextStep, prevStep, setStep } = useStepperContext()

  useIsomorphicLayoutEffect(() => toggleValidation(isValid), [isValid])

  const onSubmit: SubmitHandler<ShareYourGoalsFormValues> = ({
    languages,
    location,
  }) => {
    setStepData({
      ...stepData,
      location,
      language: languages,
    })
    nextStep()
  }

  const { totalSteps, currentStep } = useStepRootContext()

  const progress = ((currentStep + 1) / totalSteps) * 100

  const skip = () => {
    toggleValidation(true)
    const nextStepIndex = currentStep + 1
    setStep(nextStepIndex)
  }

  const back = () => {
    setStepData({
      ...stepData,
      location: getValues("location"),
      language: getValues("languages"),
    })
    prevStep()
  }

  return (
    <div className="min-h-screen flex lg:pl-[480px] bg-white">
      {sidebar}

      <form
        className="relative grid items-start flex-auto px-5 md:px-10 py-10 lg:py-[100px] lg:px-[200px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="max-w-[488px] lg:max-w-[560px] w-full mx-auto">
          <div className="flex gap-x-2 items-center">
            <CircularProgress
              show={false}
              size={15.43}
              strokeWidth={2.5}
              value={progress}
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

          <div className="mt-10 lg:mt-[50px]">
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
          </div>
        </div>

        <div className="mx-auto max-w-[488px] lg:max-w-[560px] self-end w-full mt-10 lg:mt-[50px]">
          <div className="flex items-center justify-between">
            <Button
              size="md"
              variant="outlined"
              visual="gray"
              type="button"
              onClick={back}
            >
              Back
            </Button>

            <div className="flex items-center gap-x-6">
              <Button
                className="opacity-50 hover:opacity-100"
                variant="ghost"
                visual="gray"
                type="button"
                size="md"
                onClick={skip}
              >
                Skip
              </Button>
              <Button size="md" visual="primary">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </form>
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

  useIsomorphicLayoutEffect(() => {
    setValues((prevValues) => {
      const filteredSelected = selected.filter(
        (value) => !prevValues.includes(value)
      )

      if (filteredSelected.length > 0) {
        return [...prevValues, ...filteredSelected]
      }

      return prevValues
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

const ShowcaseYourTalent = ({
  sidebar,
  stepData,
  setStepData,
}: {
  sidebar: React.ReactNode
  stepData: CreateTalentType | null
  setStepData: React.Dispatch<React.SetStateAction<CreateTalentType | null>>
}) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control,
    getValues,
  } = useForm<ShowcaseYourTalentFormValues>({
    resolver: zodResolver(showcaseYourTalentFormSchema),
    defaultValues: {
      industriesWorkedWith: stepData?.industriesWorkedIn || "",
      yourTopSkills: stepData?.lookingToWorkWith || [],
      recentJobTitle: stepData?.recentJobTitle || "",
      studying: stepData?.isStudent || false,
    },
  })
  const { toggleValidation } = useStepContext()
  const { nextStep, prevStep, setStep } = useStepperContext()

  useIsomorphicLayoutEffect(() => toggleValidation(isValid), [isValid])

  const onSubmit: SubmitHandler<ShowcaseYourTalentFormValues> = ({
    recentJobTitle,
    studying,
    industriesWorkedWith,
    yourTopSkills,
  }) => {
    setStepData({
      ...stepData,
      recentJobTitle,
      isStudent: studying,
      industriesWorkedIn: industriesWorkedWith,
      lookingToWorkWith: yourTopSkills,
    })
    nextStep()
  }

  const { totalSteps, currentStep } = useStepRootContext()

  const progress = ((currentStep + 1) / totalSteps) * 100

  const skip = () => {
    toggleValidation(true)
    const nextStepIndex = currentStep + 1
    setStep(nextStepIndex)
  }

  const back = () => {
    setStepData({
      ...stepData,
      recentJobTitle: getValues("recentJobTitle"),
      isStudent: getValues("studying"),
      industriesWorkedIn: getValues("industriesWorkedWith"),
      lookingToWorkWith: getValues("yourTopSkills"),
    })
    prevStep()
  }

  return (
    <div className="min-h-screen flex lg:pl-[480px] bg-white">
      {sidebar}

      <form
        className="relative grid items-start flex-auto px-5 md:px-10 py-10 lg:py-[100px] lg:px-[200px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="max-w-[488px] lg:max-w-[560px] w-full mx-auto">
          <div className="flex gap-x-2 items-center">
            <CircularProgress
              show={false}
              size={15.43}
              strokeWidth={2.5}
              value={progress}
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

          <div className="mt-10 lg:mt-[50px]">
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
          </div>
        </div>

        <div className="mx-auto max-w-[488px] lg:max-w-[560px] self-end w-full mt-10 lg:mt-[50px]">
          <div className="flex items-center justify-between">
            <Button
              size="md"
              variant="outlined"
              visual="gray"
              type="button"
              onClick={back}
            >
              Back
            </Button>

            <div className="flex items-center gap-x-6">
              <Button
                className="opacity-50 hover:opacity-100"
                variant="ghost"
                visual="gray"
                type="button"
                size="md"
                onClick={skip}
              >
                Skip
              </Button>
              <Button size="md" visual="primary">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </form>
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

  useIsomorphicLayoutEffect(() => {
    setValues((prevValues) => {
      const filteredSelected = selected.filter(
        (value) => !prevValues.includes(value)
      )

      if (filteredSelected.length > 0) {
        return [...prevValues, ...filteredSelected]
      }

      return prevValues
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

const availabilities = ["Full-time", "Part-time", "Custom"]

const YourAvailability = ({
  invalid,
  onValueChange,
  value,
}: {
  invalid?: boolean
  value?: string
  onValueChange?: (value: string) => void
}) => {
  const [state, setState] = useControllableState({
    value,
    onChange: onValueChange,
  })

  return (
    <div className="w-full flex flex-col gap-y-1.5">
      <Select value={state} onValueChange={setState}>
        <Label size="sm" className="text-dark-blue-400" htmlFor="availability">
          What’s your availability?
        </Label>
        <SelectTrigger
          className="rounded-[5px]"
          id="availability"
          invalid={invalid}
        >
          <SelectValue placeholder="Select availability" />
        </SelectTrigger>

        <SelectContent>
          <ScrollArea viewportClassName="max-h-[304px]">
            {availabilities.map((availability, index) => (
              <SelectItem value={availability} key={index}>
                {availability}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  )
}

const TimeSchema = z.object({
  startTime: z.string().optional(),
  startTimeDayPeriod: z.string().optional(),
  endTime: z.string().optional().optional(),
  endTimeDayPeriod: z.string().optional(),
})

const DaySchema = z.object({
  day: z.string().optional(),
  times: z.array(TimeSchema).optional(),
})

const setYourPreferencesFormSchema = z.object({
  projects: z.array(z.string()).min(1, "Please enter at least 1 project(s)"),
  yourAvailability: z.string().min(1, "Please enter at least 1 project(s)"),
  customAvailability: z.array(DaySchema).optional(),
})

type SetYourPreferencesFormValues = z.infer<typeof setYourPreferencesFormSchema>

const CustomAvailabilityTimeSelector = ({
  label,
  value,
  onValueChange,
  disabled,
  onToggle,
}: {
  label: string
  value?: Array<{
    startTime: string
    startTimeDayPeriod: string
    endTime: string
    endTimeDayPeriod: string
  }>
  onValueChange?: (
    value: Array<{
      startTime: string
      startTimeDayPeriod: string
      endTime: string
      endTimeDayPeriod: string
    }>
  ) => void
  disabled?: boolean
  onToggle: (
    value: boolean,
    times: Array<{
      startTime: string
      startTimeDayPeriod: string
      endTime: string
      endTimeDayPeriod: string
    }>
  ) => void
}) => {
  const [state, setState] = useControllableState<
    Array<{
      startTime: string
      startTimeDayPeriod: string
      endTime: string
      endTimeDayPeriod: string
    }>
  >({
    defaultValue: [
      {
        startTime: "09:00",
        startTimeDayPeriod: "AM",
        endTime: "05:00",
        endTimeDayPeriod: "AM",
      },
    ],
    value,
    onChange: onValueChange,
  })

  const [isOn, toggleIsOn] = useToggle(disabled != null ? !disabled : true)

  const add = () => {
    setState((prev) => [
      ...prev,
      {
        startTime: "09:00",
        startTimeDayPeriod: "AM",
        endTime: "05:00",
        endTimeDayPeriod: "AM",
      },
    ])
  }

  const remove = (index: number) => {
    setState((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <article
      className={cn(
        "py-3 flex items-start justify-between border-b border-gray-200",
        !isOn && "opacity-50"
      )}
    >
      <div className="inline-flex items-center gap-x-3 pt-2.5">
        <Switch
          checked={isOn}
          onCheckedChange={(checked) => {
            toggleIsOn(checked)
            onToggle(checked, state)
          }}
          size="sm"
          id={label}
        />

        <Label size="sm" className="text-dark-blue-400" htmlFor={label}>
          {label}
        </Label>
      </div>

      <div className="flex items-star gap-x-3">
        <div className="flex flex-col gap-y-3">
          {state.map((t, index) => (
            <div className="inline-flex items-center gap-x-3" key={index}>
              <div className="flex items-center">
                <Select
                  disabled={!isOn}
                  value={t.startTime}
                  onValueChange={(value) =>
                    setState((prev) => {
                      const nextState = prev
                        .slice()
                        .map((item, i) =>
                          i === index ? { ...item, startTime: value } : item
                        )

                      return nextState
                    })
                  }
                >
                  <SelectTrigger indicator={false} className="rounded-r-none">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <ScrollArea viewportClassName="max-h-[304px]">
                      {TIMES.map((time, index) => (
                        <SelectItem value={time} key={index}>
                          {time}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <Select
                  disabled={!isOn}
                  value={t.startTimeDayPeriod}
                  onValueChange={(value) =>
                    setState((prev) => {
                      const nextState = prev
                        .slice()
                        .map((item, i) =>
                          i === index
                            ? { ...item, startTimeDayPeriod: value }
                            : item
                        )

                      return nextState
                    })
                  }
                >
                  <SelectTrigger
                    indicator={false}
                    className="rounded-l-none rounded-r-[5px] border-l-0"
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <ScrollArea viewportClassName="max-h-[304px]">
                      {DAY_PERIODS.map((dayPeriod, index) => (
                        <SelectItem value={dayPeriod} key={index}>
                          {dayPeriod}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>
              <span className="text-base leading-8 font-semibold text-gray-400">
                to
              </span>
              <div className="flex items-center">
                <Select
                  disabled={!isOn}
                  value={t.endTime}
                  onValueChange={(value) =>
                    setState((prev) => {
                      const nextState = prev
                        .slice()
                        .map((item, i) =>
                          i === index ? { ...item, endTime: value } : item
                        )

                      return nextState
                    })
                  }
                >
                  <SelectTrigger indicator={false} className="rounded-r-none">
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <ScrollArea viewportClassName="max-h-[304px]">
                      {TIMES.map((time, index) => (
                        <SelectItem value={time} key={index}>
                          {time}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
                <Select
                  disabled={!isOn}
                  value={t.endTimeDayPeriod}
                  onValueChange={(value) =>
                    setState((prev) => {
                      const nextState = prev
                        .slice()
                        .map((item, i) =>
                          i === index
                            ? { ...item, endTimeDayPeriod: value }
                            : item
                        )

                      return nextState
                    })
                  }
                >
                  <SelectTrigger
                    indicator={false}
                    className="rounded-l-none rounded-r-[5px] border-l-0"
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <ScrollArea viewportClassName="max-h-[304px]">
                      {DAY_PERIODS.map((dayPeriod, index) => (
                        <SelectItem value={dayPeriod} key={index}>
                          {dayPeriod}
                        </SelectItem>
                      ))}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>

              {index > 0 ? (
                <IconButton
                  className="rounded-full opacity-0 hover:opacity-100"
                  visual="error"
                  variant="ghost"
                  size="md"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Trash03 className="size-[15px]" />
                </IconButton>
              ) : (
                <IconButton
                  className="rounded-[5px] bg-white"
                  variant="outlined"
                  visual="gray"
                  size="md"
                  type="button"
                  onClick={isOn ? add : noop}
                  disabled={!isOn}
                >
                  <Plus className="size-[15px]" />
                </IconButton>
              )}
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}

const days: { id: number; lable: DAYS; disabled: boolean }[] = [
  { id: 1, lable: DAYS.SUNDAY, disabled: true },
  { id: 2, lable: DAYS.MONDAY, disabled: true },
  { id: 3, lable: DAYS.TUESDAY, disabled: true },
  { id: 4, lable: DAYS.WEDNESDAY, disabled: true },
  { id: 5, lable: DAYS.THURSDAY, disabled: true },
  { id: 6, lable: DAYS.FRIDAY, disabled: true },
  { id: 7, lable: DAYS.SATURDAY, disabled: true },
]

const SetYourPreferences = ({
  sidebar,
  stepData,
  setStepData,
  setTalentUser,
}: {
  sidebar: React.ReactNode
  stepData: CreateTalentType | null
  setStepData: React.Dispatch<React.SetStateAction<CreateTalentType | null>>
  setTalentUser: React.Dispatch<React.SetStateAction<User | null>>
}) => {
  const { toast } = useToast()

  const [isLoading, setIsLoading] = React.useState(false)

  const {
    getValues,
    setValue,
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm<SetYourPreferencesFormValues>({
    resolver: zodResolver(setYourPreferencesFormSchema),
    defaultValues: {
      projects: stepData?.projectTypes,
      yourAvailability: capitalize(
        stepData?.availability?.replaceAll("_", "-") || ""
      ),
      customAvailability: stepData?.customAvailability,
    },
  })
  const { toggleValidation } = useStepContext()
  const { nextStep, prevStep, setStep } = useStepperContext()
  const availability = useWatch({
    control,
    name: "yourAvailability",
  })

  useIsomorphicLayoutEffect(() => toggleValidation(isValid), [isValid])

  const onSubmit: SubmitHandler<SetYourPreferencesFormValues> = ({
    projects,
    yourAvailability,
    customAvailability,
  }) => {
    setIsLoading(true)

    const availability: AVAILABILITY = yourAvailability
      ?.replaceAll("-", "_")
      ?.toUpperCase() as AVAILABILITY

    const formData = new FormData()

    formData.append("avatar", stepData?.avatar || "")
    formData.append("username", stepData?.username || "")
    formData.append("firstName", stepData?.firstName || "")
    formData.append("lastName", stepData?.lastName || "")
    formData.append("location", stepData?.location || "")
    formData.append("language", stepData?.language || "")
    formData.append("recentJobTitle", stepData?.recentJobTitle || "")
    formData.append("industriesWorkedIn", stepData?.industriesWorkedIn || "")

    stepData?.lookingToWorkWith?.forEach((item) => {
      formData.append("lookingToWorkWith", item)
    })

    projects?.forEach((item) => {
      formData.append("projectTypes", item)
    })

    formData.append("isStudent", stepData?.isStudent?.toString() || "false")

    formData.append("availability", availability || "")

    if (availability === AVAILABILITY.CUSTOM) {
      formData.append(
        "customAvailability",
        JSON.stringify(customAvailability) || ""
      )
    }

    TalentAPI.CreateTalent(formData)
      .then((response) => {
        if (
          response?.status === 201 &&
          response?.data &&
          response?.data?.user
        ) {
          nextStep()
          setStepData(null)
          setTalentUser(response?.data?.user)
        }
      })
      .catch((error) => {
        if (error?.response?.data?.errors?.message) {
          toast({
            title: error?.response?.data?.errors?.message,
            variant: "destructive",
          })
        } else if (
          Array.isArray(error?.response?.data?.message) &&
          error?.response?.data?.message?.length > 0
        ) {
          toast({
            title: error?.response?.data?.message?.[0],
            variant: "destructive",
          })
        } else {
          toast({
            title: error?.response?.data?.message,
            variant: "destructive",
          })
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const { totalSteps, currentStep } = useStepRootContext()

  const progress = ((currentStep + 1) / totalSteps) * 100

  const skip = () => {
    toggleValidation(true)
    const nextStepIndex = currentStep + 1
    setStep(nextStepIndex)
  }

  const back = () => {
    const availability: AVAILABILITY = getValues("yourAvailability")
      ?.replaceAll("-", "_")
      ?.toUpperCase() as AVAILABILITY

    setStepData({
      ...stepData,
      projectTypes: getValues("projects"),
      availability: availability,
      customAvailability: getValues("customAvailability"),
    })
    prevStep()
  }

  const handleCustomAvailabity = (
    day: string,
    times: {
      startTimeDayPeriod?: string
      endTimeDayPeriod?: string
      startTime?: string
      endTime?: string
    }[]
  ) => {
    const data =
      getValues("customAvailability")?.filter((item) => item?.day !== day) || []

    data?.push({ day, times })
    setValue("customAvailability", data)
  }

  const handleCustomAvailabityDisable = (day: string) => {
    const data =
      getValues("customAvailability")?.filter((item) => item?.day !== day) || []
    setValue("customAvailability", data)
  }

  return (
    <div className="min-h-screen flex lg:pl-[480px] bg-white">
      {sidebar}

      <form
        className="relative grid items-start flex-auto px-5 md:px-10 py-10 lg:py-[100px] lg:px-[200px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="max-w-[488px] lg:max-w-[560px] w-full mx-auto">
          <div className="flex gap-x-2 items-center">
            <CircularProgress
              show={false}
              size={15.43}
              strokeWidth={2.5}
              value={progress}
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

          <div className="mt-[50px]">
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

              {availability === "Custom" && (
                <div className="flex flex-col">
                  {days?.map(({ id, lable, disabled }) => {
                    // const value = getValues("customAvailability")?.find(
                    //   ({ day }) => day === lable
                    // )?.times as Array<{
                    //   startTime: string
                    //   startTimeDayPeriod: string
                    //   endTime: string
                    //   endTimeDayPeriod: string
                    // }>

                    return (
                      <CustomAvailabilityTimeSelector
                        key={id}
                        label={lable}
                        disabled={disabled}
                        // value={value?.length ? value : undefined}
                        onValueChange={(value) => {
                          handleCustomAvailabity(lable, value)
                        }}
                        onToggle={(checked, times) => {
                          if (checked) {
                            handleCustomAvailabity(lable, times)
                          } else {
                            handleCustomAvailabityDisable(lable)
                          }
                        }}
                      />
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[488px] lg:max-w-[560px] self-end w-full mt-10 lg:mt-[50px]">
          <div className="flex items-center justify-between">
            <Button
              size="md"
              variant="outlined"
              visual="gray"
              type="button"
              onClick={back}
            >
              Back
            </Button>

            <div className="flex items-center gap-x-6">
              <Button
                className="opacity-50 hover:opacity-100"
                variant="ghost"
                visual="gray"
                type="button"
                size="md"
                onClick={skip}
              >
                Skip
              </Button>
              <Button disabled={isLoading} size="md" visual="primary">
                {isLoading ? (
                  <Spinner
                    size={24}
                    className="stroke-white"
                    trackClassName="stroke-primary-500"
                    strokeWidth={2}
                  />
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

const DoNext = ({
  sidebar,
  talentUser,
}: {
  sidebar: React.ReactNode
  talentUser: User | null
}) => {
  const router = useRouter()

  const { setUser } = useAuth()

  return (
    <div className="min-h-screen flex md:pl-[480px] bg-white">
      {sidebar}
      <div className="relative grid items-start flex-auto px-5 md:px-10 py-10 lg:py-[100px] lg:px-[150px]">
        <div className="max-w-[608px] lg:max-w-[660px] w-full mx-auto">
          <h1 className="text-2xl leading-[36px] mt-2 text-dark-blue-400 font-semibold">
            What would you like to do next?
          </h1>

          <p className="text-base leading-[19.36px] text-dark-blue-400 mt-2 font-light">
            Choose your next move and get started
          </p>

          <div className="mt-10 lg:mt-[50px] grid md:grid-cols-2 gap-2.5 lg:gap-5">
            <div
              className="p-3 flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)] hover:ring-1 hover:ring-gray-300 hover:border-gray-300 cursor-pointer transition duration-300"
              onClick={() => {
                setUser(talentUser)
                router.push("/")
              }}
            >
              <div className="flex items-center gap-x-3">
                <div className="size-11 rounded-lg border-[1.5px] shrink-0 inline-flex items-center justify-center border-[#EAECF0] text-primary-500">
                  <Briefcase02 className="size-5" />
                </div>
                <span className="text-sm leading-[16.94px] inline-block font-medium text-gray-900">
                  Find open projects
                </span>
              </div>

              <ChevronRight className="shrink-0 size-5" />
            </div>

            {/* <div className="p-3 flex items-center justify-between bg-white border border-gray-200 rounded-lg shadow-[0px_1px_5px_0px_rgba(16,24,40,.02)] hover:ring-1 hover:ring-gray-300 hover:border-gray-300 cursor-pointer transition duration-300">
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
            </div> */}
          </div>
        </div>

        <div className="mt-10 lg:mt-[50px] mx-auto w-full max-w-[608px] lg:max-w-[660px] flex self-end justify-end">
          <Button
            onClick={() => {
              setUser(talentUser)
              router.push("/talent-dashboard")
            }}
            className="text-primary-500"
            variant="link"
            visual="gray"
          >
            <Home03 className="size-[15px]" /> Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}

const Sidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 p-[75px] w-[480px] xs:max-lg:hidden shrink-0 flex flex-col bg-dark-blue-500">
      <NextLink href="/" className="focus-visible:outline">
        <Logo className="h-9 w-[245px] shrink-0" />
      </NextLink>

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
          <NextLink href="/onboarding" className="focus-visible:outline">
            <Button
              className="hover:bg-white hover:text-dark-blue-400 border-white/[.2] text-white hover:border-white"
              size="lg"
              visual="gray"
              variant="outlined"
            >
              Sign In
            </Button>
          </NextLink>

          <Pointer className="absolute top-[34px] right-0 -rotate-6" />
        </div>
      </div>
    </div>
  )
}

const DoNextSidebar = () => {
  return (
    <div className="fixed inset-y-0 left-0 p-[75px] w-[480px] xs:max-lg:hidden shrink-0 flex flex-col bg-dark-blue-500">
      <NextLink href="/" className="focus-visible:outline">
        <Logo className="h-9 w-[245px] shrink-0" />
      </NextLink>

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
  )
}

const steps: Steps[] = [
  { label: "introduce-yourself", isValid: false, disabled: false },
  { label: "create-your-username", isValid: false, disabled: true },
  { label: "share-your-location", isValid: false, disabled: true },
  { label: "showcase-your-talent", isValid: false, disabled: true },
  { label: "set-your-preferences", isValid: false, disabled: true },
  { label: "do-next", isValid: false, disabled: true },
]

const TalentOnboarding = ({
  introduceYourself,
  createYourUsername,
  shareYourLocation,
  showcaseYourTalent,
  setYourPreferences,
  doNext,
}: {
  introduceYourself: React.ReactNode
  createYourUsername: React.ReactNode
  shareYourLocation: React.ReactNode
  showcaseYourTalent: React.ReactNode
  setYourPreferences: React.ReactNode
  doNext: React.ReactNode
}) => {
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

  return (
    <StepperProvider value={stepperValue}>
      <StepRootProvider value={stepperRootValue}>
        <StepControl>
          <Step>{introduceYourself}</Step>
          <Step>{createYourUsername}</Step>
          <Step>{shareYourLocation}</Step>
          <Step>{showcaseYourTalent}</Step>
          <Step>{setYourPreferences}</Step>
          <Step>{doNext}</Step>
        </StepControl>
      </StepRootProvider>
    </StepperProvider>
  )
}

export default function TalentOnboardingRoot() {
  const [talentUser, setTalentUser] = useState<User | null>(null)
  const [stepData, setStepData] = React.useState<CreateTalentType | null>(null)

  return (
    <AuthenticatedRoute>
      <TalentOnboarding
        introduceYourself={
          <IntroduceYourself
            sidebar={<Sidebar />}
            stepData={stepData}
            setStepData={setStepData}
          />
        }
        createYourUsername={
          <CreateYourUsername
            sidebar={<Sidebar />}
            stepData={stepData}
            setStepData={setStepData}
          />
        }
        shareYourLocation={
          <ShareYourLocation
            sidebar={<Sidebar />}
            stepData={stepData}
            setStepData={setStepData}
          />
        }
        showcaseYourTalent={
          <ShowcaseYourTalent
            sidebar={<Sidebar />}
            stepData={stepData}
            setStepData={setStepData}
          />
        }
        setYourPreferences={
          <SetYourPreferences
            sidebar={<Sidebar />}
            stepData={stepData}
            setStepData={setStepData}
            setTalentUser={setTalentUser}
          />
        }
        doNext={<DoNext talentUser={talentUser} sidebar={<DoNextSidebar />} />}
      />
    </AuthenticatedRoute>
  )
}
