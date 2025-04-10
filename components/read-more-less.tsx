import { motion } from "framer-motion"
import { useToggle } from "react-use"

const rmWordsFromEndWithFullStop = (words: string[]) => {
  const lastWord = words[words.length - 1]
  if (lastWord.endsWith(".") || lastWord.endsWith("?")) {
    return rmWordsFromEndWithFullStop(words.slice(0, -1))
  }
  return words
}

export const ReadMoreLess = ({
  text,
  max = 36,
  children,
}: {
  text: string
  max?: number
  children?: (options: {
    readMore: boolean
    toggle: (...args: any[]) => any
    text: string
  }) => React.ReactNode
}) => {
  const words = text.split(" ")
  const truncatedTextWithEllipses = rmWordsFromEndWithFullStop(
    words.splice(0, max)
  ).join(" ")
  const [readMore, toggle] = useToggle(false)
  return (
    <motion.div layout transition={{ ease: "easeInOut", duration: 0.3 }}>
      {children?.({
        readMore,
        toggle,
        text: readMore ? text : truncatedTextWithEllipses,
      })}
    </motion.div>
  )
}
