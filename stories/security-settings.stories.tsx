import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  EyeOff,
} from "@blend-metrics/icons"
import { Meta } from "@storybook/react"
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

export const Step1 = () => {
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

        <form className="mt-8">
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
                  type="text"
                  placeholder="Type your password"
                />
                <InputRightElement>
                  <EyeOff className="text-gray-400 size-4" />
                </InputRightElement>
              </InputGroup>
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
                  type="text"
                  placeholder="Type your password again"
                />
                <InputRightElement>
                  <EyeOff className="text-gray-400 size-4" />
                </InputRightElement>
              </InputGroup>
            </div>

            <ul className="space-y-2">
              <li className="pl-3 flex items-center gap-x-2">
                <Check className="size-[18px] text-gray-300" />
                <span className="text-sm leading-5 text-gray-600">
                  At least 8 characters
                </span>
              </li>
              <li className="pl-3 flex items-center gap-x-2">
                <Check className="size-[18px] text-gray-300" />
                <span className="text-sm leading-5 text-gray-600">
                  One lowercase letter
                </span>
              </li>
              <li className="pl-3 flex items-center gap-x-2">
                <Check className="size-[18px] text-gray-300" />
                <span className="text-sm leading-5 text-gray-600">
                  One uppercase letter
                </span>
              </li>
              <li className="pl-3 flex items-center gap-x-2">
                <Check className="size-[18px] text-gray-300" />
                <span className="text-sm leading-5 text-gray-600">
                  One number
                </span>
              </li>
              <li className="pl-3 flex items-center gap-x-2">
                <Check className="size-[18px] text-gray-300" />
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

export const Step2 = () => {
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

        <form className="mt-6">
          <div className="space-y-1.5">
            <Label size="sm" htmlFor="phone-number" className="text-gray-700">
              Phone Number
            </Label>
            <div className="flex items-center">
              <Select defaultValue="US">
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="US">US</SelectItem>
                    <SelectItem value="BE">BE</SelectItem>
                    <SelectItem value="RS">RS</SelectItem>
                    <SelectItem value="TR">TR</SelectItem>
                    <SelectItem value="LV">LV</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Input
                className="rounded-l-none"
                type="tel"
                id="phone-number"
                placeholder="+1 (555) 000-0000"
              />
            </div>
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
