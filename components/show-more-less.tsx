import { Dispatch, SetStateAction, useMemo } from "react"
import { useControllableState } from "@/utils/hooks"
import { createContext, getValidChildren } from "@/utils/react-utils"

interface ShowMoreLessRootContextState {
  isShowing: boolean
  setIsShowing: Dispatch<SetStateAction<boolean>>
}

const [ShowMoreLessRootProvider, useShowMoreLessRootContext] =
  createContext<ShowMoreLessRootContextState>({
    displayName: "ShowMoreLessContext",
    errorMessage:
      "useShowMoreLessRootContext return undefined. Seems you forgot to wrap your component in `<ShowMoreLessRoot />`",
  })

export const ShowMoreLessRoot = ({
  children,
  ...props
}: {
  value?: boolean
  onValueChange?: (value: boolean) => void
  children?: (options: ShowMoreLessRootContextState) => React.ReactNode
}) => {
  const [state, setState] = useControllableState({
    value: props.value,
    onChange: props.onValueChange,
    defaultValue: false,
  })
  const value = useMemo(
    () => ({ isShowing: state, setIsShowing: setState }),
    [state, setState]
  )
  return (
    <ShowMoreLessRootProvider value={value}>
      {children?.(value)}
    </ShowMoreLessRootProvider>
  )
}

export const ShowMoreLess = ({
  children,
  max = 3,
}: {
  children?: React.ReactNode
  max?: number
}) => {
  const validChildren = getValidChildren(children)
  const extra = validChildren.length > max
  const { isShowing } = useShowMoreLessRootContext()

  return (
    <>
      {extra
        ? isShowing
          ? validChildren
          : validChildren.slice(0, max)
        : validChildren}
    </>
  )
}
