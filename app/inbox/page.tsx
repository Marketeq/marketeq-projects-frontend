"use client"

import React, { useCallback, useMemo, useState } from "react"
import { Bubble, YourBubble } from "@/stories/inbox.stories"
import {
  Attachment01,
  ChevronDown,
  Edit05,
  Image03,
  Info,
  MoreHorizontal,
  Pin02,
  Plus,
  SearchMd,
  Send,
  Smile,
  Star,
  X,
} from "@blend-metrics/icons"
import { useToggle } from "react-use"
import { Chat, ChatsContextProvider, useChatsContext } from "@/components/chat"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioTrigger,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Favorite,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  ScrollArea,
  ScrollBar,
} from "@/components/ui"

const LeftSidebar = () => {
  const { pinnedChats, toggleShowPinnedIcon, showPinnedIcon } =
    useChatsContext()
  return (
    <div className="w-[322px] shrink-0 border-r bg-white border-gray-200">
      <div className="pt-1 p-3 border-b border-gray-200">
        <button className="focus-visible:outline-none h-11 px-3.5 inline-flex items-center justify-center shrink-0 text-base leading-6 font-semibold gap-x-1.5">
          All Messages <ChevronDown className="size-4" />
        </button>

        <div className="flex items-center gap-x-1">
          <InputGroup className="flex-auto">
            <Input
              id="search-bar"
              type="text"
              className="h-8 pl-[34px] py-2.5 pr-3 text-xs leading-5"
              placeholder="Search inbox"
            />
            <InputLeftElement>
              <SearchMd className="text-gray-400 size-4" />
            </InputLeftElement>
          </InputGroup>

          <IconButton className="size-8" visual="gray" variant="ghost">
            <Edit05 className="size-4" />
          </IconButton>
        </div>
      </div>
      {pinnedChats > 0 && (
        <div className="py-1 flex h-7 items-center justify-between pr-2 pl-4 bg-gray-25 border-b border-gray-200">
          <div className="flex items-center gap-x-1.5">
            <Pin02 className="text-gray-500 fill-gray-500 size-4" />
            <span className="text-[11px] leading-5 font-semibold text-gray-500">
              {pinnedChats} pinned chats
            </span>
          </div>

          {showPinnedIcon ? (
            <Button
              className="hover:no-underline opacity-50 hover:opacity-100"
              variant="link"
              visual="gray"
              onClick={toggleShowPinnedIcon}
            >
              <X className="size-[15px]" /> Close
            </Button>
          ) : (
            <Button
              className="group"
              variant="link"
              visual="gray"
              onClick={toggleShowPinnedIcon}
            >
              View{" "}
              <X className="size-[15px] opacity-50 group-hover:opacity-100" />
            </Button>
          )}
        </div>
      )}
      <ScrollArea
        className="h-[calc(theme(height.screen)-185px)]"
        scrollBar={<ScrollBar className="w-4 p-1" />}
      >
        <div className="flex flex-col">
          <Chat variant="active" />
          <Chat variant="active" />
          <Chat variant="active" />
          <Chat />
          <Chat variant="active" />
          <Chat variant="active" />
          <Chat />
          <Chat variant="active" />
          <Chat />
        </div>
      </ScrollArea>
    </div>
  )
}

const RightSidebar = () => {
  return (
    <div className="w-[300px] bg-white flex flex-col shrink-0 pt-10 pb-6 px-5 border-l border-gray-200">
      <div className="pb-5 flex flex-col items-center border-b border-gray-200">
        <Avatar size="2xl">
          <AvatarImage src="/man.jpg" alt="Man" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>

        <div className="mt-2 flex flex-col gap-y-1.5">
          <h3 className="text-base leading-[19.36px] text-center font-bold text-dark-blue-400">
            Andrew
          </h3>
          <p className="text-[13px] leading-[15.73px] text-center text-dark-blue-400">
            @designome234i
          </p>
        </div>

        <div className="mt-5 flex items-center gap-x-2 justify-center">
          <div className="flex items-center">
            <Button
              className="border-r-0 xs:max-lg:gap-x-[5.1px] xs:max-lg:leading-[12.75px] xs:max-lg:text-[8.93px] xs:max-lg:h-[25.75px] rounded-r-none"
              variant="outlined"
              visual="gray"
            >
              <Favorite
                starClassName="size-[12.75px] lg:size-5"
                className="size-[12.75px] lg:size-5"
              />
              Save
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton
                  className="group rounded-l-none xs:max-lg:size-[25.5px] text-gray-500"
                  variant="outlined"
                  visual="gray"
                >
                  <ChevronDown className="duration transition group-data-[state=open]:-rotate-180 size-[12.75px] lg:size-5" />
                </IconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom">
                <DropdownMenuRadioGroup>
                  <DropdownMenuRadioTrigger value="Customer Service">
                    Customer Service
                  </DropdownMenuRadioTrigger>
                  <DropdownMenuRadioTrigger value="Digital Marketing">
                    Digital Marketing
                  </DropdownMenuRadioTrigger>
                  <DropdownMenuRadioTrigger value="Email Marketing">
                    Email Marketing
                  </DropdownMenuRadioTrigger>
                  <DropdownMenuRadioTrigger value="React Developers">
                    React Developers
                  </DropdownMenuRadioTrigger>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-primary-500">
                  <Plus className="size-4" /> Create New List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button visual="primary" variant="filled">
            Hire Me
          </Button>
        </div>
      </div>

      <div className="mt-5 pb-5 flex flex-col gap-y-3 border-b border-gray-200">
        <div className="flex items-center gap-x-2">
          <span className="text-[13px] leading-[15.73px] text-[#122A4B] font-light">
            Rate
          </span>
          <span className="text-[13px] leading-[15.73px] text-[#122A4B] font-light">
            <span className="font-bold">$85 - $120</span> /hr
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="text-[13px] leading-[15.73px] text-[#122A4B] font-light">
            Current Availability
          </span>
          <span className="text-[13px] leading-[15.73px] text-[#122A4B] font-light">
            <span className="font-bold">40 hrs</span> /wk
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <span className="inline-flex text-dark-blue-400 items-center text-xs leading-[14.52px] font-medium gap-x-1 py-1 px-2 bg-primary-50 rounded-[4px]">
            <Star className="size-3 fill-dark-blue-400" /> 4.7
          </span>

          <span className="text-[13px] leading-[15.73px] text-[#122A4B] font-light">
            240 reviews
          </span>
        </div>
      </div>

      <div className="mt-3">
        <h3 className="font-bold text-sm text-dark-blue-400">Skills</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge visual="gray">Lorem</Badge>
          <Badge visual="gray">Lorem</Badge>
          <Badge visual="gray">Lorem</Badge>
          <Badge visual="gray">Lorem</Badge>
          <Badge visual="gray">Lorem</Badge>
          <Badge visual="gray">Lorem</Badge>
          <Badge visual="gray">Lorem</Badge>
          <Badge visual="gray">Lorem</Badge>
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-y-6">
        <Button visual="gray" variant="outlined">
          View Full Profile
        </Button>

        <span className="text-center text-xs leading-[14.52px] text-dark-blue-400">
          Member since <span className="font-semibold">Sep 2024</span>
        </span>
      </div>
    </div>
  )
}

const Chats = () => {
  return (
    <div className="flex-auto relative">
      <div className="px-8 sticky top-0 border-b flex items-center justify-between border-gray-200 py-6">
        <div className="inline-flex items-center gap-x-3">
          <Avatar className="size-[43px]" size="md" isOnline>
            <AvatarImage src="/man.jpg" alt="Man" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-y-1">
            <div className="inline-flex items-center gap-x-1">
              <span className="text-lg leading-[21.78px] font-semibold text-dark-blue-400">
                Andrew
              </span>
              <span className="text-base leading-[19.36px] text-dark-blue-400">
                @designome234i
              </span>
            </div>
            <div className="inline-flex items-center gap-x-2">
              <span className="text-sm leading-[16.94px] text-dark-blue-400">
                Active now
              </span>
              <span className="inline-block h-4 w-px bg-gray-300" />
              <span className="text-sm leading-[16.94px] text-dark-blue-400">
                UX/UI Designer
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-1">
          <IconButton
            className="rounded-full text-gray-500"
            visual="gray"
            variant="ghost"
            size="lg"
          >
            <Info className="size-[22px]" />
          </IconButton>
          <div className="size-11 flex items-center justify-center shrink-0">
            <Favorite className="text-gray-500" />
          </div>
          <IconButton
            className="rounded-full text-gray-500"
            visual="gray"
            variant="ghost"
            size="lg"
          >
            <MoreHorizontal className="size-[22px]" />
          </IconButton>
        </div>
      </div>

      <ScrollArea
        viewportClassName="max-h-[calc(theme(height.screen)-158px)]"
        scrollBar={<ScrollBar className="w-4 p-1" />}
      >
        <div className="p-8 pb-[100px] grid gap-y-6">
          <div className="flex gap-x-3 py-6 items-center">
            <span className="inline-block bg-gray-200 flex-auto h-px" />
            <span className="text-xs leading-[14.52px] font-medium text-gray-500">
              Jun 14, 2024
            </span>
            <span className="inline-block bg-gray-200 flex-auto h-px" />
          </div>

          <div className="flex justify-start">
            <YourBubble />
          </div>

          <div className="flex justify-end">
            <Bubble />
          </div>

          <div className="flex justify-start">
            <YourBubble />
          </div>

          <div className="flex gap-x-3 py-6 items-center">
            <span className="inline-block bg-gray-200 flex-auto h-px" />
            <span className="text-xs leading-[14.52px] font-medium text-gray-500">
              Jun 14, 2024
            </span>
            <span className="inline-block bg-gray-200 flex-auto h-px" />
          </div>

          <div className="flex justify-end">
            <Bubble />
          </div>

          <div className="flex justify-start">
            <YourBubble />
          </div>

          <div className="flex gap-x-3 py-6 items-center">
            <span className="inline-block bg-gray-200 flex-auto h-px" />
            <span className="text-xs leading-[14.52px] font-medium text-gray-500">
              Jun 14, 2024
            </span>
            <span className="inline-block bg-gray-200 flex-auto h-px" />
          </div>

          <div className="flex justify-end">
            <Bubble />
          </div>
        </div>
      </ScrollArea>

      <div className="px-3 flex h-[68px] bg-white items-center gap-x-3 absolute bottom-0 inset-x-0">
        <div className="flex items-center gap-x-1">
          <IconButton
            className="rounded-full text-gray-500"
            visual="gray"
            variant="ghost"
            size="lg"
          >
            <Smile className="size-[22px]" />
          </IconButton>
          <IconButton
            className="rounded-full text-gray-500"
            visual="gray"
            variant="ghost"
            size="lg"
          >
            <Image03 className="size-[22px]" />
          </IconButton>
          <IconButton
            className="rounded-full text-gray-500"
            visual="gray"
            variant="ghost"
            size="lg"
          >
            <Attachment01 className="size-[22px]" />
          </IconButton>
        </div>

        <InputGroup className="flex-auto">
          <Input
            className="pr-[38px]"
            type="text"
            placeholder="Send message..."
          />
          <InputRightElement>
            <Send className="text-gray-500 size-[18px]" />
          </InputRightElement>
        </InputGroup>
      </div>
    </div>
  )
}

export const Inbox = ({ children }: { children?: React.ReactNode }) => {
  const [pinnedChats, setPinnedChats] = useState(0)
  const [showPinnedIcon, toggleShowPinnedIcon] = useToggle(false)
  const onPinnedChat = useCallback(
    (value: boolean) =>
      value
        ? setPinnedChats((prev) => prev + 1)
        : setPinnedChats((prev) => prev - 1),
    []
  )

  const value = useMemo(
    () => ({ pinnedChats, onPinnedChat, showPinnedIcon, toggleShowPinnedIcon }),
    [pinnedChats, onPinnedChat, showPinnedIcon, toggleShowPinnedIcon]
  )

  return <ChatsContextProvider value={value}>{children}</ChatsContextProvider>
}

export default function InboxRoot() {
  return (
    <Inbox>
      <div className="flex bg-white flex-auto">
        <LeftSidebar />
        <Chats />
        <RightSidebar />
      </div>
    </Inbox>
  )
}
