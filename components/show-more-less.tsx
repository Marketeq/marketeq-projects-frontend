import { Dispatch, SetStateAction, useMemo, useState } from "react"
import { useControllableState } from "@/utils/hooks"
import { createContext, getValidChildren } from "@/utils/react-utils"
import { useFirstMountState, useIsomorphicLayoutEffect } from "react-use"
import useMeasure from "react-use-measure"

interface ShowMoreLessRootContextState {
  isShowing: boolean
  setIsShowing: Dispatch<SetStateAction<boolean>>
  height: number
  contentRef: (...args: any[]) => any
  initialHeight: number
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
  const [contentRef, { height }] = useMeasure()
  const [initialHeight, setInitialHeight] = useState(height)

  const value = useMemo(
    () => ({
      isShowing: state,
      setIsShowing: setState,
      height,
      contentRef,
      initialHeight,
    }),
    [state, setState, height, contentRef, initialHeight]
  )

  useIsomorphicLayoutEffect(() => {
    if (!state) {
      setInitialHeight(height)
    }
  }, [state, height])

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

export const ShowMoreLessComp = ({
  children,
  max = 3,
}: {
  children?: React.ReactNode
  max?: number
}) => {
  const validChildren = getValidChildren(children)
  const extra = validChildren.length > max
  const { isShowing } = useShowMoreLessRootContext()
  let isFirstMount = true

  if (isShowing && isFirstMount) {
    isFirstMount = false
  }

  return (
    <>
      {extra
        ? isFirstMount
          ? validChildren.slice(0, max)
          : validChildren
        : validChildren}
    </>
  )
}
