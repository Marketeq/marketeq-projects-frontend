import { useState } from "react"
import { useUncontrolledState } from "@/utils/hooks"
import { ThumbsDownToggle } from "./thumbs-down"
import { ThumbsUpToggle } from "./thumbs-up"

export const LikeDislike = ({
  defaultLikes = 0,
  defaultState,
}: {
  defaultLikes?: number
  defaultState?: "liked" | "disliked"
}) => {
  const [state, setState] = useUncontrolledState<"liked" | "disliked" | null>({
    defaultValue: defaultState ?? null,
    onChange: (value) => {
      if (value === "liked") {
        setLikes((prev) => prev + 1)
      } else if (value === "disliked") {
        setLikes((prev) => Math.max(prev - 1, 0))
      }
    },
  })
  const [likes, setLikes] = useState(defaultLikes)

  return (
    <div className="inline-flex items-center gap-x-2.5">
      <div className="inline-flex items-center gap-x-0.5">
        <ThumbsUpToggle
          pressed={state === "liked"}
          onPressedChange={(open) => setState(open ? "liked" : null)}
        />
        <span className="text-[13px] font-light text-dark-blue-400">
          ({likes})
        </span>
      </div>
      <ThumbsDownToggle
        pressed={state === "disliked"}
        onPressedChange={(open) => setState(open ? "disliked" : null)}
      />
    </div>
  )
}
