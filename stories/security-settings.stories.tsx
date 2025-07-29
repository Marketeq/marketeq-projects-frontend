import {
  cn,
  containsNumberOfChars,
  containsOneLowerCaseLetter,
  containsOneNumber,
  containsOneSymbol,
  containsOneUpperCaseLetter,
  hookFormHasError,
} from "@/utils/functions"
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
} from "@blend-metrics/icons"
import { ErrorMessage as HookFormErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { Meta } from "@storybook/react"
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form"
import { useToggle } from "react-use"
import { z } from "zod"
import { PhoneNumberInput } from "@/components/phone-number-input"
import {
  Button,
  CircularProgress,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"

const meta: Meta = {
  title: "Security Settings",
}

export default meta

const secureYourAccountFormSchema = z
  .object({
    password: z
      .string()
      .min(8, "Please enter at least 8 character(s)")
      .refine(containsOneUpperCaseLetter, {
        message: "Please enter at least 1 uppercase letter(s)",
      })
      .refine(containsOneSymbol, {
        message: "Please enter at least 1 symbol(s)",
      })
      .refine(containsOneLowerCaseLetter, {
        message: "Please enter at least 1 lower letter(s)",
      })
      .refine(containsOneNumber, {
        message: "Please enter at least 1 number(s)",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password !== data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SecureYourAccountFormValues = z.infer<typeof secureYourAccountFormSchema>

export const Step1 = () => {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SecureYourAccountFormValues>({
    resolver: zodResolver(secureYourAccountFormSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  })
  const [showPassword, toggleShowPassword] = useToggle(true)
  const [showConfirmPassword, toggleShowConfirmPassword] = useToggle(true)
  const password = useWatch({
    control,
    name: "password",
  })
  const onSubmit: SubmitHandler<SecureYourAccountFormValues> = (values) => {}

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Trigger</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[408px]">
        <div className="flex items-center gap-x-2">
          <CircularProgress
            strokeWidth={1.5}
            size={15.43}
            value={30}
            show={false}
          />
          <span className="text-[11px] leading-[15.43px] text-gray-700">
            STEP 1 / 3
          </span>
        </div>

        <div className="mt-2">
          <h3 className="text-2xl leading-9 font-semibold text-dark-blue-400">
            Secure your account
          </h3>
        </div>

        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <Label
                size="sm"
                htmlFor="create-password"
                className="text-gray-700"
              >
                Create Password
              </Label>

              <InputGroup>
                <Input
                  id="create-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Type your password"
                  {...register("password")}
                  isInvalid={hookFormHasError({ errors, name: "password" })}
                />
                <InputRightElement>
                  <button
                    className="focus-visible:outline-none"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? (
                      <EyeOff className="text-gray-400 size-4" />
                    ) : (
                      <Eye className="text-gray-400 size-4" />
                    )}
                  </button>
                </InputRightElement>
              </InputGroup>

              <HookFormErrorMessage
                name="password"
                errors={errors}
                render={({ message }) => (
                  <ErrorMessage size="sm">{message}</ErrorMessage>
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label
                size="sm"
                htmlFor="confirm-password"
                className="text-gray-700"
              >
                Confirm Password
              </Label>
              <InputGroup>
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Type your password again"
                  isInvalid={hookFormHasError({
                    errors,
                    name: "confirmPassword",
                  })}
                />
                <InputRightElement>
                  <button
                    className="focus-visible:outline-none"
                    onClick={toggleShowConfirmPassword}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="text-gray-400 size-4" />
                    ) : (
                      <Eye className="text-gray-400 size-4" />
                    )}
                  </button>
                </InputRightElement>
              </InputGroup>

              <HookFormErrorMessage
                name="confirmPassword"
                errors={errors}
                render={({ message }) => (
                  <ErrorMessage size="sm">{message}</ErrorMessage>
                )}
              />
            </div>

            <ul className="space-y-2">
              <li className="pl-3 flex items-center gap-x-2">
                <Check
                  className={cn(
                    "size-[18px] text-gray-300",
                    containsNumberOfChars({
                      numberOfChars: 8,
                      value: password,
                    }) && "text-green-500"
                  )}
                />
                <span className="text-sm leading-5 text-gray-600">
                  At least 8 characters
                </span>
              </li>
              <li className="pl-3 flex items-center gap-x-2">
                <Check
                  className={cn(
                    "size-[18px] text-gray-300",
                    containsOneLowerCaseLetter(password) && "text-green-500"
                  )}
                />
                <span className="text-sm leading-5 text-gray-600">
                  One lowercase letter
                </span>
              </li>
              <li className="pl-3 flex items-center gap-x-2">
                <Check
                  className={cn(
                    "size-[18px] text-gray-300",
                    containsOneUpperCaseLetter(password) && "text-green-500"
                  )}
                />
                <span className="text-sm leading-5 text-gray-600">
                  One uppercase letter
                </span>
              </li>
              <li className="pl-3 flex items-center gap-x-2">
                <Check
                  className={cn(
                    "size-[18px] text-gray-300",
                    containsOneNumber(password) && "text-green-500"
                  )}
                />
                <span className="text-sm leading-5 text-gray-600">
                  One number
                </span>
              </li>
              <li className="pl-3 flex items-center gap-x-2">
                <Check
                  className={cn(
                    "size-[18px] text-gray-300",
                    containsOneSymbol(password) && "text-green-500"
                  )}
                />
                <span className="text-sm leading-5 text-gray-600">
                  One symbol
                </span>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-end mt-8">
            <Button size="md">Continue</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const secondStepFormSchema = z.object({
  phoneNumber: z.string().min(1, "Please enter your phone number"),
})

type SecondStepFormValues = z.infer<typeof secondStepFormSchema>

export const Step2 = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SecondStepFormValues>({
    resolver: zodResolver(secondStepFormSchema),
  })
  const onSubmit: SubmitHandler<SecondStepFormValues> = (values) => {}

  return (
    <Dialog>
      <DialogTrigger>
        <Button>Trigger</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[408px]">
        <div className="flex items-center gap-x-2">
          <CircularProgress
            strokeWidth={1.5}
            size={15.43}
            value={30}
            show={false}
          />
          <span className="text-[11px] leading-[15.43px] text-gray-700">
            STEP 2 / 3
          </span>
        </div>

        <div className="mt-2">
          <h3 className="text-2xl leading-9 font-semibold text-dark-blue-400">
            Secure your account
          </h3>
        </div>

        <div className="mt-8">
          <h1 className="text-lg leading-7 font-medium text-dark-blue-400">
            Set up two-factor authentication
          </h1>
          <p className="text-sm leading-5 mt-3 text-dark-blue-400">
            Enter your phone number and we’ll send a magic link to the number
            entered. This helps keep your account secure.
          </p>
        </div>

        <form className="mt-6" onClick={handleSubmit(onSubmit)}>
          <div className="space-y-1.5">
            <Label size="sm" htmlFor="phone-number" className="text-gray-700">
              Phone Number
            </Label>
            <Controller
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <PhoneNumberInput
                  {...field}
                  invalid={hookFormHasError({
                    errors,
                    name: "phoneNumber",
                  })}
                />
              )}
            />

            <HookFormErrorMessage
              name="phoneNumber"
              errors={errors}
              render={({ message }) => (
                <ErrorMessage size="sm">{message}</ErrorMessage>
              )}
            />
          </div>

          <div className="flex items-center justify-between mt-[168px]">
            <Button size="md" variant="ghost" visual="gray">
              <ArrowLeft className="size-[15px]" />
              Back
            </Button>
            <Button size="md">Continue</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export const Step3 = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Trigger</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[408px]">
        <div className="flex items-center gap-x-2">
          <CircularProgress
            strokeWidth={1.5}
            size={15.43}
            value={30}
            show={false}
          />
          <span className="text-[11px] leading-[15.43px] text-gray-700">
            STEP 2 / 3
          </span>
        </div>

        <div className="mt-2">
          <h3 className="text-2xl leading-9 font-semibold text-dark-blue-400">
            Secure your account
          </h3>
        </div>

        <div className="mt-8">
          <h1 className="text-lg leading-7 font-medium text-dark-blue-400">
            Set up two-factor authentication
          </h1>
          <p className="text-sm leading-5 mt-3 text-dark-blue-400 whitespace-pre-line">
            We sent a magic link sent to phone number ending with 7890. Click
            the link to confirm your phone number. The link will expire in 24
            hours.
          </p>
        </div>

        <div className="mt-6 flex items-center gap-x-2">
          <span className="text-sm leading-5 text-dark-blue-400">
            Not seeing the link?
          </span>
          <Button variant="link">Resend</Button>
        </div>

        <div className="flex items-center justify-between mt-[160px]">
          <Button size="md" variant="ghost" visual="gray">
            <ArrowLeft className="size-[15px]" />
            Back
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export const SaveChangesExit = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col gap-y-2">
            <DialogTitle>All set! You’ve secured your account.</DialogTitle>
            <DialogDescription>
              Click the link below to continue setting up your account... Or
              close this window to start browsing the marketplace. We’re excited
              to have you with us!
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter className="mt-8">
          <DialogClose asChild>
            <Button variant="outlined" visual="gray">
              Close Window
            </Button>
          </DialogClose>

          <DialogClose asChild>
            <Button>
              Continue Setup
              <ArrowRight className="size-[15px]" />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
