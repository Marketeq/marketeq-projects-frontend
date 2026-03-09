"use client"

import React, { useState } from "react"
import { callAll, cn, isNotEmpty } from "@/utils/functions"
import {
  AlertCircle,
  ChevronDown,
  Link01,
  Minus,
  Plus,
  Settings,
  X2,
} from "@blend-metrics/icons"
import { Combobox } from "@headlessui/react"
import { Slot } from "@radix-ui/react-slot"
import { useToggle } from "react-use"
import { z } from "zod"
import { create } from "zustand"
import { combine } from "zustand/middleware"
import NextImage from "./next-image"
import {
  Badge,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioCheckItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Label,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  inputVariants,
  toast,
} from "./ui"
import { InvitationsAPI } from "@/service/http/invitations"
import { useAuth } from "@/contexts/auth"
import Cookies from "js-cookie"

interface Invitee {
  avatar?: string
  username?: string
  email: string
}

type Invitees = Invitee[]

const options = [
  {
    avatar: "/man.jpg",
    username: "Thomas",
    email: "tranthuy.nute@gmail.com",
  },
  {
    avatar: "/woman.jpg",
    username: "Tiffany Steiner",
    email: "tiff.steinter@gmail.com",
  },
]

const isEmail = (value: string) => z.string().email().safeParse(value).success

function getJwtPayload(): Record<string, any> | null {
  try {
    const token = Cookies.get("access_token")
    if (!token) return null
    const parts = token.split(".")
    if (parts.length !== 3) return null
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/")
    const decoded = atob(base64)
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

export const useInviteWindowStore = create(
  combine({ open: false }, (set) => ({
    toggle: (open?: boolean) =>
      set((state) => ({
        ...state,
        open: typeof open === "boolean" ? open : !state.open,
      })),
  }))
)

export const InviteWindowTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ asChild, onClick, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  const { toggle } = useInviteWindowStore()
  return <Comp onClick={callAll(onClick, toggle)} {...props} ref={ref} />
})

InviteWindowTrigger.displayName = "InviteWindowTrigger"

export const InviteWindow = () => {
  const [selected, setSelected] = React.useState<Invitees>([])
  const [inputValue, setInputValue] = React.useState("")
  const [selectedRole, setSelectedRole] = React.useState<'admin' | 'editor' | 'viewer'>('viewer')
  const { open, toggle: toggleInviteWindow } = useInviteWindowStore()
  const { user } = useAuth()
  const id = React.useId()
  const [isOpen, toggle] = useToggle(false)
  const [message, setMessage] = useState("")

  const getIsValid = () => {
    return isEmail(inputValue) && !selected.find(s => s.email === inputValue)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && getIsValid()) {
      event.preventDefault()
      handleAddTag()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
  }

  const handleAddTag = () => {
    if (getIsValid()) {
      setSelected(prev => [...prev, { email: inputValue }])
      setInputValue("")
    }
  }

  const onMessageChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    setMessage(value)
  }

  const handleRemove = (email: string) => {
    const filtered = selected?.filter((value) => value.email !== email)
    setSelected(filtered)
  }

  const handleSendInvites = async () => {
    // Auto-add valid email from input if present
    let finalInvitees = [...selected]
    if (inputValue && getIsValid()) {
      finalInvitees = [...selected, { email: inputValue }]
      setSelected(finalInvitees)
      setInputValue("")
    }

    if (!finalInvitees || finalInvitees.length === 0) {
      toast({
        title: "No invitees",
        description: "Please add at least one valid email address",
        variant: "destructive",
      })
      return
    }

    try {
      // Use user's ID as teamId (temporary until team management is implemented)
      const payload = getJwtPayload()
      const resolvedUserId =
        user?.id || (user as any)?.sub || payload?.sub || payload?.id

      if (!resolvedUserId) {
        toast({
          title: "Authentication required",
          description: "Please log in to send invitations",
          variant: "destructive",
        })
        return
      }
      
      await InvitationsAPI.createInvitations({
        teamId: resolvedUserId,
        role: selectedRole,
        emails: finalInvitees.map(s => s.email),
        note: message || undefined,
      })
      
      toast({
        title: "Invitations sent!",
        description: `Successfully sent ${finalInvitees.length} invitation(s)`,
      })
      
      // Reset form
      setSelected([])
      setMessage("")
      setSelectedRole('viewer')
      setInputValue("")
      toggleInviteWindow()
    } catch (error: any) {
      console.error('Failed to send invitations:', error)
      toast({
        title: "Failed to send invitations",
        description: error?.response?.data?.message || "Please try again",
        variant: "destructive",
      })
    }
  }

  const filteredOptions =
    inputValue === ""
      ? options
      : options.filter((option) => {
          return option.username
            ?.toLowerCase()
            .includes(inputValue.toLowerCase())
        })

  const props = { multiple: true } as unknown as { multiple: false }

  return (
    <Dialog open={open} onOpenChange={toggleInviteWindow}>
      <DialogContent className="max-w-[690px] p-0">
        <DialogTitle className="sr-only">Invite Your Team</DialogTitle>
        <DialogDescription className="sr-only">
          Send invitation emails to team members
        </DialogDescription>
        <div className="max-w-[690px] bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg leading-7 font-semibold text-gray-800">
              Invite Your Team
            </h2>

            <div className="inline-flex items-center gap-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-gray-500 hover:text-gray-900">
                    <AlertCircle className="h-6 w-6" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Support</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="text-gray-500 hover:text-gray-900">
                    <Settings className="h-6 w-6" />
                  </TooltipTrigger>
                  <TooltipContent side="bottom">Settings</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="space-y-2 mt-8">
            <Label className="text-gray-700" size="md" htmlFor={id}>
              Invite by email
            </Label>
            <div className="flex items center gap-x-3">
              <Combobox
                className="flex-auto relative"
                as="div"
                value={selected}
                onChange={setSelected}
                {...props}
              >
                <div
                  className={cn(
                    inputVariants({
                      className:
                        "min-h-[44px] h-auto flex flex-wrap gap-2 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-50",
                    })
                  )}
                  tabIndex={0}
                >
                  {selected.map((item, index) => (
                    <Badge
                      key={index}
                      visual="primary"
                    >
                      {item.email}
                      <button
                        onClick={() => handleRemove(item.email)}
                        className="focus-visible:outline-none flex-none"
                      >
                        <X2 className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  <Combobox.Input
                    className="text-base min-w-[132px] flex-auto text-gray-700 p-0 focus:ring-0 border-none placeholder:text-gray-500"
                    placeholder="Add emails or find contacts"
                    id={id}
                    value={inputValue}
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                  />
                </div>

                <Combobox.Options className="absolute w-full z-50 rounded-lg bg-white border border-gray-100 shadow-lg mt-2">
                  {filteredOptions.map((option) => (
                    <Combobox.Option
                      key={option.email}
                      className="flex cursor-pointer items-center gap-x-3 py-2.5 h-16 px-3.5"
                      value={option}
                    >
                      <div className="h-10 flex-none relative rounded-full overflow-hidden w-10">
                        <NextImage
                          className="object-cover"
                          src={option.avatar}
                          alt="man.jpg"
                          sizes="100vh"
                          fill
                        />
                      </div>
                      <div className="flex-auto">
                        <h2 className="text-sm leading-6 font-medium text-gray-800">
                          {option.username}
                        </h2>
                        <p className="text-sm leading-5 text-gray-500">
                          {option.email}
                        </p>
                      </div>
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              </Combobox>
              <Button
                variant="light"
                size="lg"
                type="button"
                onClick={handleAddTag}
              >
                Add
              </Button>
            </div>
          </div>

          <button
            className="inline-flex focus-visible:outline-none gap-x-2 mt-6 text-base font-semibold text-gray-700 items-center"
            onClick={toggle}
          >
            Add a Message{" "}
            {isOpen ? (
              <Minus className="h-6 w-6 flex-none" />
            ) : (
              <Plus className="h-6 w-6 flex-none" />
            )}
          </button>

          {isOpen && (
            <Textarea
              className="h-20 mt-3"
              value={message}
              onChange={onMessageChanged}
              placeholder="Write message here..."
            />
          )}

          {selected && isNotEmpty(selected) && (
            <div className="mt-6 space-y-3">
              <span className="text-base leading-5 font-medium text-gray-700">
                Invites
              </span>
              {selected.map(({ email, avatar, username }) => (
                <div className="space-y-3 mt-3" key={email}>
                  <div className="flex justify-between items-center">
                    <div className="inline-flex items-center gap-x-3">
                      {avatar ? (
                        <div className="h-8 w-8 rounded-full overflow-hidden relative">
                          <NextImage
                            className="object-cover"
                            src={avatar}
                            alt="Man"
                            sizes="100vh"
                            fill
                          />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full overflow-hidden border border-gray-300 border-dashed bg-gray-50 relative" />
                      )}
                      <span className="font-medium text-sm leading-5 text-gray-800">
                        {username ? username : email}
                      </span>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center gap-x-1 text-sm font-medium text-gray-900">
                        {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
                        <ChevronDown className="text-gray-500 h-5 w-5 flex-none" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuRadioGroup 
                          value={selectedRole}
                          onValueChange={(value) => setSelectedRole(value as 'admin' | 'editor' | 'viewer')}
                        >
                          <DropdownMenuRadioCheckItem value="viewer">
                            Viewer
                          </DropdownMenuRadioCheckItem>
                          <DropdownMenuRadioCheckItem value="editor">
                            Editor
                          </DropdownMenuRadioCheckItem>
                          <DropdownMenuRadioCheckItem value="admin">
                            Admin
                          </DropdownMenuRadioCheckItem>
                        </DropdownMenuRadioGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleRemove(email)}>
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex mt-8 justify-between">
            <button className="inline-flex gap-x-2 focus-visible:outline-none text-primary-500 font-semibold items-center">
              <Link01 className="h-[15px] w-[15px]" />
              Copy Link
            </button>
            <div className="inline-flex items-center gap-x-3">
              <DialogClose asChild>
                <Button visual="gray" variant="outlined">
                  Cancel
                </Button>
              </DialogClose>
              <Button onClick={handleSendInvites}>Send Invite</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
