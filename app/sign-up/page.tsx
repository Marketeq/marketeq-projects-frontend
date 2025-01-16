"use client"

import { hookFormHasError } from "@/utils/functions"
import { Check } from "@blend-metrics/icons"
import { GoogleDefault, LinkedInDefault } from "@blend-metrics/icons/social"
import { ErrorMessage as HookFormErrorMessage } from "@hookform/error-message"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Logo } from "@/components/icons"
import { MarketeqIcon1 } from "@/components/marketeq-icon-1"
import { Button, Checkbox, ErrorMessage, Input, Label } from "@/components/ui"

const signUpSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter at least 1 character(s)")
    .email("Please enter a valid email"),
  agreesToTermsPrivacyPolicy: z.boolean(),
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUp() {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      agreesToTermsPrivacyPolicy: false,
    },
  })

  const onSubmit: SubmitHandler<SignUpFormValues> = () => {}

  return (
    <div className="flex min-h-screen bg-white">
      <div className="relative hidden lg:flex overflow-hidden flex-col justify-between p-[75px] w-[480px] bg-dark-blue-500 shrink-0">
        <div>
          <Logo className="w-[245px] h-9" />

          <div className="mt-[50px]">
            <h1 className="text-[26px] leading-[31.47px] font-semibold text-white">
              You control the agency
            </h1>

            <ul className="mt-[29px] space-y-[29px]">
              <li className="flex items-start gap-x-[13px]">
                <Check className="size-[22px] text-primary-500" />{" "}
                <span className="text-white text-sm leading-[16.94px]">
                  Work with the top hand picked tech gurus in the country
                </span>
              </li>
              <li className="flex items-start gap-x-[13px]">
                <Check className="size-[22px] text-primary-500" />{" "}
                <span className="text-white text-sm leading-[16.94px]">
                  Manage all your digital projects and assets from one dashboard
                </span>
              </li>
              <li className="flex items-start gap-x-[13px]">
                <Check className="size-[22px] text-primary-500" />{" "}
                <span className="text-white text-sm leading-[16.94px]">
                  Invite team members and collaborate on project feedback and
                  objectives
                </span>
              </li>
              <li className="flex items-start gap-x-[13px]">
                <Check className="size-[22px] text-primary-500" />{" "}
                <span className="text-white text-sm leading-[16.94px]">
                  Access curated tech news from our content partners
                </span>
              </li>
            </ul>
          </div>
        </div>

        <MarketeqIcon1 className="absolute -bottom-[36.41px] left-[41.11px]" />

        <div className="flex items-start gap-y-5 flex-col relative">
          <Button className="text-white" visual="gray" variant="link" size="md">
            Don’t have an account?
          </Button>

          <div className="inline-block relative">
            <Button
              className="text-white hover:bg-white/10 border-white/20"
              visual="gray"
              variant="outlined"
              size="lg"
            >
              Join Us For Free
            </Button>
            <svg
              className="size-[23px] absolute right-[15.33px] top-[34px] text-primary-500"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.5955 2.21973C9.29477 -0.162931 5.28434 0.73532 4.42508 3.82574L0.744613 17.0629C-0.0339209 19.8629 2.59557 22.5434 5.50714 21.8913C6.71521 21.6207 7.65054 20.7109 8.62686 19.7017C10.1067 18.172 12.274 17.6503 14.3559 18.3132C14.4019 18.3279 14.4477 18.3425 14.4934 18.3571C15.9509 18.8218 17.2961 19.2508 18.5757 18.9642L19.049 18.8582C22.2152 18.149 23.3072 14.3487 21.0395 12.0001L11.5955 2.21973Z"
                fill="currentColor"
                fill-opacity="0.5"
                stroke="currentColor"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-auto grid place-content-center px-5 md:px-10 py-16">
        <div className="max-w-[560px]">
          <h1 className="md:text-left text-center text-2xl leading-9 font-semibold text-dark-blue-400">
            Welcome Changemakers!
          </h1>
          <p className="md:text-left text-center text-base mt-2 leading-[19.36px] font-light text-dark-blue-400">
            Create your account below
          </p>

          <div className="grid md:grid-cols-2 mt-10 md:mt-[50px] gap-3 items-center">
            <Button
              className="xs:max-md:text-sm xs:max-md:py-2 xs:max-md:px-[14px] xs:max-md:h-9"
              variant="outlined"
              visual="gray"
              size="lg"
            >
              <GoogleDefault className="size-5 md:size-6" /> Sign in with Google
            </Button>
            <Button
              className="xs:max-md:text-sm xs:max-md:py-2 xs:max-md:px-[14px] xs:max-md:h-9"
              variant="outlined"
              visual="gray"
              size="lg"
            >
              <LinkedInDefault className="size-5 md:size-6" /> Sign in with
              Linkedin
            </Button>
          </div>

          <div className="flex gap-x-[9px] mt-6 items-center">
            <span className="inline-block bg-[#E1E6EA] flex-auto h-px" />
            <span className="text-xs text-[#939DA7] leading-5 font-medium">
              Or use your email
            </span>
            <span className="inline-block bg-[#E1E6EA] flex-auto h-px" />
          </div>

          <form className="mt-5 md:mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-y-1.5">
              <Label className="text-dark-blue-500" size="sm" htmlFor="email">
                Email
              </Label>
              <Input
                placeholder="you@email.com"
                id="email"
                type="email"
                {...register("email")}
                isInvalid={hookFormHasError({
                  errors,
                  name: "email",
                })}
              />
              <HookFormErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <ErrorMessage size="sm">{message}</ErrorMessage>
                )}
              />
            </div>

            <div className="mt-5 flex items-center gap-x-2">
              <Controller
                name="agreesToTermsPrivacyPolicy"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <Checkbox
                    id="agrees-to-terms-privacy-policy"
                    checked={value}
                    onCheckedChange={onChange}
                    {...field}
                  />
                )}
              />
              <Label
                className="text-[#939DA7] font-normal"
                htmlFor="agrees-to-terms-privacy-policy"
              >
                I agree to Markerteq’s{" "}
                <Button
                  className="whitespace-normal font-normal"
                  size="sm"
                  variant="link"
                >
                  Terms of Use
                </Button>{" "}
                and{" "}
                <Button
                  className="whitespace-normal font-normal"
                  size="sm"
                  variant="link"
                >
                  Privacy Policy
                </Button>
              </Label>
            </div>

            <Button
              className="mt-5 xs:max-md:text-sm xs:max-md:py-2 xs:max-md:px-[14px] xs:max-md:h-9 md:mt-6 w-full"
              size="lg"
            >
              Login to my account
            </Button>

            <div className="flex gap-x-1 mt-10 md:mt-[50px] items-center">
              <span className="text-sm leading-6 text-[#68707B]">
                Don’t have an account?
              </span>
              <Button
                className="underline font-normal"
                variant="link"
                size="sm"
              >
                Sign up?
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
