import { useState } from "react"
import { Meta } from "@storybook/react"
import {
  Calendar,
  DateRangeCalendar,
  DoubleCalendar,
  DualCalendar,
  RangeCalendar,
} from "./calendar"

const meta: Meta = {
  title: "Marketeq-Projects/Calendar",
}

export default meta

export const Default = () => {
  return <Calendar />
}

export const RangeCalendarVariant = () => {
  return <RangeCalendar />
}

export const DualCalendarVariant = () => {
  return <DualCalendar />
}

export const DoubleCalendarVariant = () => {
  return <DoubleCalendar />
}

export const DateRangeCalendarVariant = () => {
  const [value, setValue] = useState<{ end: Date; start: Date }>()
  console.log({ value })

  return <DateRangeCalendar value={value} onValueChange={setValue} />
}
