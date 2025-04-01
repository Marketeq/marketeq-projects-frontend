import { useControllableState } from "@/utils/hooks"
import { getValidChildren } from "@/utils/react-utils"

export const ShowMoreLess = ({
  children,
  max = 3,
  value,
  onValueChange,
  defaultValue = false,
}: {
  children?: React.ReactNode
  max?: number
  value?: boolean
  onValueChange?: (value: boolean) => void
  defaultValue?: boolean
}) => {
  const validChildren = getValidChildren(children)
  const extra = validChildren.length > max
  const [state] = useControllableState({
    value,
    onChange: onValueChange,
    defaultValue,
  })

  return extra
    ? state
      ? validChildren
      : validChildren.slice(0, max)
    : validChildren
}
