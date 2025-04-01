import { useControllableState } from "@/utils/hooks"
import { getValidChildren } from "@/utils/react-utils"
import { useToggle } from "react-use"

const rmWordsFromEndWithFullStop = (words: string[]) => {
  const lastWord = words[words.length - 1]
  if (lastWord.endsWith(".")) {
    return rmWordsFromEndWithFullStop(words.slice(0, -1))
  }
  return words
}

export const ShowMoreLess = ({
  text,
  max = 36,
  children,
}: {
  text: string
  max?: number
  children?: (options: {
    showMore: boolean
    toggle: (...args: any[]) => any
    text: string
  }) => React.ReactNode
}) => {
  const words = text.split(" ")
  const truncatedTextWithEllipses = `${rmWordsFromEndWithFullStop(
    words.splice(0, max)
  )}...`
  const [showMore, toggle] = useToggle(false)
  return (
    <>
      {children?.({
        showMore,
        toggle,
        text: showMore ? text : truncatedTextWithEllipses,
      })}
    </>
  )
}
