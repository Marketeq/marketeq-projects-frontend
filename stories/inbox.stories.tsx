import { useEffect, useState } from "react"
import Image from "next/image"
import { DataEmoji, EmojiProperties, isNotUndefined } from "@/utils/functions"
import { useUncontrolledState } from "@/utils/hooks"
import { createContext } from "@/utils/react-utils"
import {
  AlertCircle,
  Archive,
  Compass03,
  CornerUpLeft,
  DotsHorizontal,
  Download02,
  Edit03,
  EyeOff,
  Send03,
  Smile,
  Tag,
  Trash2,
} from "@blend-metrics/icons"
import { GoogleDrive1Brand } from "@blend-metrics/icons/brands"
import { Meta } from "@storybook/react"
import { useIsomorphicLayoutEffect, useToggle } from "react-use"
import { EmojiPicker } from "@/components/EmojiPicker"
import { Chat } from "@/components/chat"
import {
  Avatar,
  AvatarFallbackIcon,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui"

const meta: Meta = {
  title: "Inbox",
}

export default meta

export const Bubble = ({ message }: { message: string }) => {
  const [value, setValue] = useState(message)
  const { onChatChange, chat, isSaved, onUnsave } = useEditContext()
  const [reaction, setReaction] = useState<string | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (chat && isSaved) {
      setValue(chat)
      onUnsave()
    }
  }, [isSaved])

  const handleEmojiReaction = (emoji: DataEmoji) => {
    const emojiChar = String.fromCodePoint(
      ...emoji[EmojiProperties.unified]
        .split("-")
        .map((hex) => parseInt(hex, 16))
    )
    setReaction(emojiChar)
  }

  return (
    <article className="group inline-flex flex-col items-start gap-y-2">
      <div className="p-5 pt-2.5 flex-auto rounded-xl flex flex-col gap-y-2 bg-primary-500/[.04] relative">
        <div className="flex items-end justify-between">
          <h3 className="text-sm leading-[16.8px] font-bold text-dark-blue-400">
            Me{" "}
            <span className="text-xs leading-[14.52px] font-normal">
              @uxguy297$
            </span>
          </h3>

          <div className="inline-flex transition duration-300 opacity-0 group-hover:opacity-100 items-center gap-x-0.5">
            <button className="size-7 inline-flex rounded-full focus-visible:outline-none text-gray-400 hover:bg-primary-50 hover:text-dark-blue-400 justify-center items-center shrink-0">
              <CornerUpLeft className="size-4" />
            </button>
            <EmojiPicker
              onEmojiSelect={handleEmojiReaction}
              align="end"
              side="top"
            >
              <button className="size-7 inline-flex rounded-full focus-visible:outline-none text-gray-400 hover:bg-primary-50 hover:text-dark-blue-400 justify-center items-center shrink-0">
                <Smile className="size-4" />
              </button>
            </EmojiPicker>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="size-7 inline-flex rounded-full focus-visible:outline-none text-gray-400 hover:bg-primary-50 hover:text-dark-blue-400 justify-center items-center shrink-0">
                <DotsHorizontal className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                align="end"
                className="w-[100px] h-[169px] rounded-[5px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-100"
                sideOffset={4}
                avoidCollisions={false}
              >
                <DropdownMenuItem onSelect={() => onChatChange(value)}>
                  <Edit03 className="h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit03 className="h-4 w-4" /> Pin
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Send03 className="h-4 w-4" /> Forward
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem visual="destructive">
                  <Trash2 className="h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <span className="text-sm leading-[16.94px] text-dark-blue-400">
          {value}
        </span>

        {reaction && (
          <div className="absolute -bottom-3 right-2 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm">
            <span className="text-base">{reaction}</span>
          </div>
        )}
      </div>

      <span className="inline-flex self-end text-[11px] leading-[15.47px] text-gray-500 items-center gap-x-1">
        Sent <span className="font-bold">12:01 AM</span>
      </span>
    </article>
  )
}

export const [EditContextProvider, useEditContext] = createContext<{
  chat: string
  onChatChange: (value: string) => void
  isSaved: boolean
  onSave: () => void
  onUnsave: () => void
}>({
  displayName: "EditContext",
})

export const YourBubble = ({ message }: { message: string }) => {
  const [reaction, setReaction] = useState<string | null>(null)

  const handleEmojiReaction = (emoji: DataEmoji) => {
    const emojiChar = String.fromCodePoint(
      ...emoji[EmojiProperties.unified]
        .split("-")
        .map((hex) => parseInt(hex, 16))
    )
    setReaction(emojiChar)
  }

  return (
    <article className="inline-flex items-end gap-x-2">
      <Avatar
        size="md"
        className="hover:ring-0 active:ring-primary-100"
        isOnline
      >
        <AvatarImage src="/man.jpg" alt="Man" />
        <AvatarFallbackIcon />
      </Avatar>

      <div className="group inline-flex flex-col items-start gap-y-2">
        <div className="p-5 pt-2.5 flex-auto rounded-xl flex flex-col gap-y-2 bg-primary-500/[.04] relative">
          <div className="flex items-end justify-between">
            <h3 className="text-sm leading-[16.8px] font-bold text-dark-blue-400">
              Me{" "}
              <span className="text-xs leading-[14.52px] font-normal">
                @uxguy297$
              </span>
            </h3>

            <div className="inline-flex transition duration-300 opacity-0 group-hover:opacity-100 items-center gap-x-0.5">
              <button className="size-7 inline-flex rounded-full focus-visible:outline-none text-gray-400 hover:bg-primary-50 hover:text-dark-blue-400 justify-center items-center shrink-0">
                <CornerUpLeft className="size-4" />
              </button>
              <EmojiPicker
                onEmojiSelect={handleEmojiReaction}
                align="end"
                side="top"
              >
                <button className="size-7 inline-flex rounded-full focus-visible:outline-none text-gray-400 hover:bg-primary-50 hover:text-dark-blue-400 justify-center items-center shrink-0">
                  <Smile className="size-4" />
                </button>
              </EmojiPicker>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="size-7 inline-flex rounded-full focus-visible:outline-none text-gray-400 hover:bg-primary-50 hover:text-dark-blue-400 justify-center items-center shrink-0">
                  <DotsHorizontal className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="bottom"
                  align="end"
                  className="w-[100px] h-[169px] rounded-[5px] data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=closed]:duration-100"
                  sideOffset={4}
                  avoidCollisions={false}
                >
                  <DropdownMenuItem>
                    <Edit03 className="h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit03 className="h-4 w-4" /> Pin
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Send03 className="h-4 w-4" /> Forward
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem visual="destructive">
                    <Trash2 className="h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <span className="text-sm leading-[16.94px] text-dark-blue-400">
            {message}
          </span>

          {reaction && (
            <div className="absolute -bottom-3 left-2 bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm">
              <span className="text-base">{reaction}</span>
            </div>
          )}
        </div>

        <span className="inline-flex self-start text-[11px] leading-[15.47px] text-gray-500 items-center gap-x-1">
          Sent <span className="font-bold">12:01 AM</span>
        </span>
      </div>
    </article>
  )
}

export const ChatDefault = () => {
  return <Chat />
}

export const ChatActive = () => {
  return <Chat variant="active" />
}

export const BubbleWithPicture = () => {
  return (
    <div className="flex flex-col items-end gap-y-2">
      <div className="p-5 pt-2.5 rounded-xl bg-primary-25">
        <h3 className="text-sm leading-[16.94px] text-dark-blue-400 font-bold">
          Me
          <span className="text-xs leading-[14.52px]">@uxguy297$</span>
        </h3>

        <div className="relative mt-2 h-[146.09px] rounded-lg border-primary-50 border-[4px] overflow-hidden">
          <Image
            className="object-cover"
            src="/dashboard.png"
            alt="Message"
            fill
          />
        </div>

        <div className="mt-3 flex items-center gap-x-2">
          <Download02 className="size-[15px] shrink-0" />
          <span className="text-sm leading-5 text-dark-blue-400 font-semibold">
            ai_screenshot.png <span className="font-normal">(2 MB)</span>
          </span>
        </div>
      </div>

      <span className="text-[11px] leading-[15.47px] text-gray-500">
        Sent
        <span className="font-semibold">12:01 AM</span>
      </span>
    </div>
  )
}

export const BubbleWithLink = () => {
  return (
    <div className="flex flex-col items-end gap-y-2">
      <div className="flex flex-col rounded-lg overflow-hidden border border-gray-200 bg-white">
        <div className="relative flex items-center justify-center h-[131px] p-2.5 bg-gray-100">
          <Image
            className="object-cover"
            src="/google-drive-01.png"
            alt="Google Drive"
            fill
          />
        </div>

        <div className="p-2 bg-gray-50 border-t border-gray-200 flex items-center gap-x-2 rounded-b-lg">
          <div className="size-7 inline-flex shrink-0 items-center justify-center bg-white border-gray-200 border rounded-full shadow-[0px_1px_4px_0px_rgba(0,0,0,.03)]">
            <GoogleDrive1Brand className="size-7" />
          </div>

          <div className="flex flex-col gap-y-px">
            <h1 className="text-xs leading-[14.52px] font-semibold text-dark-blue-400">
              Google Drive
            </h1>
            <span className="text-xs leading-[21.1px] text-dark-blue-400 line-clamp-1">
              https//drive.google.com
            </span>
          </div>
        </div>
      </div>

      <span className="text-[11px] leading-[15.47px] text-gray-500">
        Sent
        <span className="font-semibold">12:01 AM</span>
      </span>
    </div>
  )
}

export const BubbleWithLinkBlack = () => {
  return (
    <div className="flex flex-col items-end gap-y-2">
      <div className="flex flex-col rounded-lg overflow-hidden border border-gray-200 bg-white">
        <div className="relative flex items-center justify-center h-[131px] p-2.5 bg-gray-100">
          <Compass03 className="size-16 shrink-0 text-gray-300 stroke-[3px]" />
        </div>

        <div className="p-2 bg-gray-50 border-t border-gray-200 flex items-center gap-x-2 rounded-b-lg">
          <div className="size-7 inline-flex shrink-0 items-center justify-center bg-white border-gray-200 border rounded-full shadow-[0px_1px_4px_0px_rgba(0,0,0,.03)]">
            <GoogleDrive1Brand className="size-7" />
          </div>

          <div className="flex flex-col gap-y-px">
            <h1 className="text-xs leading-[14.52px] font-semibold text-dark-blue-400">
              Google Drive
            </h1>
            <span className="text-xs leading-[21.1px] text-dark-blue-400 line-clamp-1">
              https//drive.google.com
            </span>
          </div>
        </div>
      </div>

      <span className="text-[11px] leading-[15.47px] text-gray-500">
        Sent
        <span className="font-semibold">12:01 AM</span>
      </span>
    </div>
  )
}
