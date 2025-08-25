import * as React from "react"
import { Amex, Discover, Visa } from "@/stories/checkout.stories"
import { useControllableState } from "@/utils/hooks"
import { CreditCard } from "@blend-metrics/icons"
import { MastercardDefault } from "@blend-metrics/icons/payment-methods"
import { Input, InputGroup, InputLeftElement } from "./ui"

const CARD_TYPES = {
  visa: /^4/,
  mastercard: /^5[1-5]/,
  amex: /^3[47]/,
  discover: /^6(?:011|5\d{2}|4[4-9]\d|22(?:1[2-9]|[2-8]\d|9[01]))/,
} as const

type Cards = keyof typeof CARD_TYPES

export const getCardType = (value: string): Cards | "unknown" => {
  return (
    (Object.keys(CARD_TYPES) as (keyof typeof CARD_TYPES)[]).find((type) =>
      CARD_TYPES[type].test(value)
    ) || "unknown"
  )
}

export const format = (value: string) => {
  const digits = value.slice(0, 19).replace(/\D/g, "")
  return digits.replace(/(\d{4})/g, "$1 ").trim()
}

interface CreditCardInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string
  onValueChange?: (value: string) => void
  isInvalid?: boolean
  defaultValue?: string
}

const CreditCardInput = React.forwardRef<
  HTMLInputElement,
  CreditCardInputProps
>(({ onValueChange, value, defaultValue, ...props }, ref) => {
  const [state, setState] = useControllableState({
    value,
    onChange: onValueChange,
    defaultValue,
  })

  const kind = getCardType(state)

  return (
    <InputGroup>
      <Input
        ref={ref}
        className="pl-[52px]"
        type="text"
        placeholder="0000 0000 0000 0000"
        value={state}
        onChange={(e) => setState(format(e.target.value))}
        {...props}
      />
      <InputLeftElement className="w-[52px]">
        {kind === "visa" ? (
          <Visa />
        ) : kind === "amex" ? (
          <Amex />
        ) : kind === "discover" ? (
          <Discover />
        ) : kind === "mastercard" ? (
          <MastercardDefault />
        ) : (
          <div className="inline-flex items-center rounded-[4px] shrink-0 bg-white border border-gray-100 text-gray-500 justify-center w-[34px] h-[24px]">
            <CreditCard className="size-4" />
          </div>
        )}
      </InputLeftElement>
    </InputGroup>
  )
})

CreditCardInput.displayName = "CreditCardInput"

export { CreditCardInput }
