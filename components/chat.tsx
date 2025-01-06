"use client"

import { useState } from "react"
import { cn } from "@/utils/functions"
import { useUncontrolledState } from "@/utils/hooks"
import { createContext } from "@/utils/react-utils"
import {
  AlertCircle,
  AlertTriangle,
  Archive,
  EyeOff,
  MoreHorizontal,
  Pin02,
  Trash2,
} from "@blend-metrics/icons"
import { cva } from "class-variance-authority"
import { useToggle } from "react-use"
import {
  Avatar,
  AvatarFallbackIcon,
  AvatarImage,
  Badge,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Favorite,
  IconButton,
} from "@/components/ui"

const chatVariants = cva(
  "group/chat relative cursor-pointer flex items-start gap-x-2 pl-3.5 hover:bg-gray-100 data-[state=active]:bg-primary-50 hover:data-[state=active]:bg-primary-100"
)

export const [ChatsContextProvider, useChatsContext] = createContext<{
  pinnedChats: number
  onPinnedChat: (pinned: boolean) => void
  showPinnedIcon: boolean
  toggleShowPinnedIcon: () => void
}>({
  displayName: "ChatsContext",
})

export const Chat = ({
  variant = "default",
  className,
}: {
  variant?: "default" | "active"
  className?: string
}) => {
  const { onPinnedChat, showPinnedIcon } = useChatsContext()
  const [isPinned, setIsPinned] = useUncontrolledState({
    defaultValue: false,
    onChange: (value) => onPinnedChat(value),
  })
  return (
    <article className={cn(chatVariants({ className }))} data-state={variant}>
      <div className="pt-3.5 group">
        <Avatar
          size="md"
          className="hover:ring-0 active:ring-primary-100"
          isOnline
          containerClassName="group-hover:hidden"
        >
          <AvatarImage src="/man.jpg" alt="Man" />
          <AvatarFallbackIcon />
        </Avatar>
        <div className="size-10 group-hover:inline-flex shrink-0 justify-center items-center hidden">
          <Checkbox size="md" />
        </div>
      </div>
      <div className="pr-3.5 flex flex-col flex-auto gap-y-0.5 items-start py-[18px] border-b border-gray-200">
        <div className="flex self-stretch items-center justify-between">
          <h3 className="group-data-[state=active]/chat:font-bold text-[13px] leading-[18.88px] font-medium text-dark-blue-400">
            Susan Rice
          </h3>

          <span className="transition duration-300 group-data-[state=active]/chat:font-bold group-hover/chat:opacity-0 opacity-100 text-xs leading-[14.52px] font-medium text-dark-blue-400">
            Jun 14
          </span>

          <DropdownMenu>
            <DropdownMenuTrigger className="absolute top-[13.73px] right-[15px] size-[27px] hidden group-hover/chat:inline-flex justify-center items-center focus-visible:outline-none text-gray-500 transition duration-300 group-hover/chat:opacity-100 opacity-0 rounded-full hover:text-dark-blue-500 hover:bg-primary-50">
              <MoreHorizontal className="size-[15px]" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-[142px]">
              <DropdownMenuItem>
                <EyeOff className="h-4 w-4" /> Mark Unread
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertCircle className="h-4 w-4" /> Move to Spam
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setIsPinned((prev) => !prev)}>
                <Pin02 className="h-4 w-4" /> {showPinnedIcon ? "Unpin" : "Pin"}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Archive className="h-4 w-4" /> Archive
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertTriangle className="h-4 w-4" /> Block / Report
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem visual="destructive">
                <Trash2 className="h-4 w-4" /> Delete Chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {showPinnedIcon && isPinned && (
            <Pin02 className="size-4 absolute shrink-0 text-primary-500 fill-primary-500 top-[3px] right-1" />
          )}
        </div>

        <div className="flex gap-x-1.5 self-stretch items-end justify-between">
          <span className="group-data-[state=active]/chat:text-dark-blue-500 text-gray-500 text-[11px] line-clamp-2 leading-[13.31px] group-data-[state=active]/chat:font-medium">
            Ad reprehenderit deserunt in qui ut esse magna ipsum fugiat qui
            aliqua aliquip Lorem, ipsum dolor Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Repudiandae, odit.
          </span>

          <Favorite
            className="group-data-[state=active]/chat:hidden fill-transparent group-data-[state=active]/chat:group-hover/chat:inline-flex group-data-[state=active]/chat:group-hover/chat:opacity-100 transition duration-300 size-[22px] text-dark-blue-400/50 hover:text-dark-blue-400/50"
            starClassName="size-[18px]"
          />
          <Badge
            visual="primary"
            className="hidden transition-300 group-data-[state=active]/chat:inline-flex rounded-full size-[22px] group-data-[state=active]/chat:group-hover/chat:group-hover/chat:hidden"
          >
            1
          </Badge>
        </div>
      </div>
    </article>
  )
}
