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
  role: 'admin' | 'editor' | 'viewer'
  invalid?: boolean  // true if email failed validation
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

// Parse multiple emails from a string separated by commas, spaces, or semicolons
const parseEmails = (input: string): string[] => {
  return input.split(/[\s,;]+/).map(e => e.trim()).filter(Boolean)
}

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
  const [defaultRole, setDefaultRole] = React.useState<'admin' | 'editor' | 'viewer'>('viewer')
  const { open, toggle: toggleInviteWindow } = useInviteWindowStore()
  const { user } = useAuth()
  const id = React.useId()
  const [isOpen, toggle] = useToggle(false)
  const [message, setMessage] = useState("")
  const [copySuccess, setCopySuccess] = useState(false)

  // ─── Email validation ───────────────────────────────────────────────────────
  const getIsValid = () => {
    return isEmail(inputValue) && !selected.find(s => s.email === inputValue)
  }

  // ─── Add single or multiple emails from input ───────────────────────────────
  const addEmailsFromInput = (input: string) => {
    const emails = parseEmails(input)
    if (emails.length === 0) return

    const newInvitees: Invitee[] = []
    for (const email of emails) {
      // Skip duplicates already in selected
      if (selected.find(s => s.email === email)) continue
      newInvitees.push({
        email,
        role: defaultRole,
        invalid: !isEmail(email),
      })
    }

    if (newInvitees.length > 0) {
      setSelected(prev => [...prev, ...newInvitees])
    }
    setInputValue("")
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Add on Enter
    if (event.key === "Enter") {
      event.preventDefault()
      addEmailsFromInput(inputValue)
      return
    }
    // Add on comma or semicolon typed
    if (event.key === "," || event.key === ";") {
      event.preventDefault()
      addEmailsFromInput(inputValue)
      return
    }
    // Add on Space if current input looks like a complete email
    if (event.key === " " && isEmail(inputValue.trim())) {
      event.preventDefault()
      addEmailsFromInput(inputValue.trim())
      return
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // Handle paste with multiple emails (contains comma/semicolon/space between emails)
    const hasMultiple = /[\s,;]/.test(value) && parseEmails(value).length > 1
    if (hasMultiple) {
      addEmailsFromInput(value)
      return
    }
    setInputValue(value)
  }

  const handleAddTag = () => {
    addEmailsFromInput(inputValue)
  }

  const onMessageChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value)
  }

  const handleRemove = (email: string) => {
    setSelected(prev => prev.filter((value) => value.email !== email))
  }

  const handleRoleChange = (email: string, role: 'admin' | 'editor' | 'viewer') => {
    setSelected(prev => prev.map(inv => inv.email === email ? { ...inv, role } : inv))
  }

  // ─── Copy invite link ───────────────────────────────────────────────────────
  const handleCopyLink = async () => {
    try {
      const payload = getJwtPayload()
      const teamId = user?.id || (user as any)?.sub || payload?.sub || payload?.id
      // Build a generic invite link using the current user's team (userId as teamId)
      const inviteLink = `${window.location.origin}/invite/accept?teamId=${teamId}`
      await navigator.clipboard.writeText(inviteLink)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
      toast({ title: "Link copied!", description: "Invite link copied to clipboard" })
    } catch {
      toast({ title: "Failed to copy", description: "Please copy the link manually", variant: "destructive" })
    }
  }

  // ─── Send invites ───────────────────────────────────────────────────────────
  const handleSendInvites = async () => {
    // Auto-add valid email from input if present
    let finalInvitees = [...selected]
    if (inputValue.trim()) {
      const emails = parseEmails(inputValue)
      const newOnes = emails
        .filter(e => !finalInvitees.find(s => s.email === e))
        .map(e => ({ email: e, role: defaultRole, invalid: !isEmail(e) }))
      finalInvitees = [...finalInvitees, ...newOnes]
      setSelected(finalInvitees)
      setInputValue("")
    }

    if (finalInvitees.length === 0) {
      toast({ title: "No invitees", description: "Please add at least one email address", variant: "destructive" })
      return
    }

    // Block send if any invalid emails
    const invalidOnes = finalInvitees.filter(i => i.invalid)
    if (invalidOnes.length > 0) {
      toast({
        title: "Invalid emails",
        description: `Please fix or remove: ${invalidOnes.map(i => i.email).join(", ")}`,
        variant: "destructive",
      })
      return
    }

    try {
      const payload = getJwtPayload()
      const teamId = user?.id || (user as any)?.sub || payload?.sub || payload?.id

      if (!teamId) {
        toast({ title: "Authentication required", description: "Please log in to send invitations", variant: "destructive" })
        return
      }

      // Group by role and send — or send all at once with per-invitee roles
      // Since the API accepts one role per batch, send separate requests per role group
      const byRole = finalInvitees.reduce((acc, inv) => {
        if (!acc[inv.role]) acc[inv.role] = []
        acc[inv.role].push(inv.email)
        return acc
      }, {} as Record<string, string[]>)

      await Promise.all(
        Object.entries(byRole).map(([role, emails]) =>
          InvitationsAPI.createInvitations({
            teamId: teamId,
            role: role as 'admin' | 'editor' | 'viewer',
            emails,
            note: message || undefined,
          })
        )
      )

      toast({ title: "Invitations sent!", description: `Successfully sent ${finalInvitees.length} invitation(s)` })

      // Reset form
      setSelected([])
      setMessage("")
      setDefaultRole('viewer')
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
      : options.filter((option) =>
          option.username?.toLowerCase().includes(inputValue.toLowerCase())
        )

  const props = { multiple: true } as unknown as { multiple: false }

  const validSelected = selected.filter(i => !i.invalid)
  const invalidSelected = selected.filter(i => i.invalid)

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
            <p className="text-xs text-gray-500">
              Type one or multiple emails separated by comma, space, or semicolon
            </p>
            <div className="flex items-center gap-x-3">
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
                      visual={item.invalid ? "error" : "primary"}
                      className={item.invalid ? "border-red-300 bg-red-50 text-red-700" : ""}
                    >
                      {item.email}
                      {item.invalid && (
                        <span className="text-red-500 text-[10px] ml-1">invalid</span>
                      )}
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
                      value={{ ...option, role: defaultRole }}
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
              <Button variant="light" size="lg" type="button" onClick={handleAddTag}>
                Add
              </Button>
            </div>

            {/* Invalid email warning */}
            {invalidSelected.length > 0 && (
              <p className="text-xs text-red-600 mt-1">
                {invalidSelected.length} invalid email{invalidSelected.length > 1 ? "s" : ""} — fix or remove before sending
              </p>
            )}
          </div>

          <button
            className="inline-flex focus-visible:outline-none gap-x-2 mt-6 text-base font-semibold text-gray-700 items-center"
            onClick={toggle}
          >
            Add a Message{" "}
            {isOpen ? <Minus className="h-6 w-6 flex-none" /> : <Plus className="h-6 w-6 flex-none" />}
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
                Invites ({validSelected.length} valid{invalidSelected.length > 0 ? `, ${invalidSelected.length} invalid` : ""})
              </span>
              {selected.map(({ email, avatar, username, role, invalid }) => (
                <div className="space-y-3 mt-3" key={email}>
                  <div className="flex justify-between items-center">
                    <div className="inline-flex items-center gap-x-3">
                      {avatar ? (
                        <div className="h-8 w-8 rounded-full overflow-hidden relative">
                          <NextImage className="object-cover" src={avatar} alt="Man" sizes="100vh" fill />
                        </div>
                      ) : (
                        <div className={cn(
                          "h-8 w-8 rounded-full overflow-hidden border border-dashed bg-gray-50 relative",
                          invalid ? "border-red-300" : "border-gray-300"
                        )} />
                      )}
                      <span className={cn(
                        "font-medium text-sm leading-5",
                        invalid ? "text-red-600" : "text-gray-800"
                      )}>
                        {username ? username : email}
                        {invalid && <span className="ml-1 text-xs text-red-400">(invalid)</span>}
                      </span>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="inline-flex items-center gap-x-1 text-sm font-medium text-gray-900">
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                        <ChevronDown className="text-gray-500 h-5 w-5 flex-none" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuRadioGroup
                          value={role}
                          onValueChange={(value) => handleRoleChange(email, value as 'admin' | 'editor' | 'viewer')}
                        >
                          <DropdownMenuRadioCheckItem value="viewer">Viewer</DropdownMenuRadioCheckItem>
                          <DropdownMenuRadioCheckItem value="editor">Editor</DropdownMenuRadioCheckItem>
                          <DropdownMenuRadioCheckItem value="admin">Admin</DropdownMenuRadioCheckItem>
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
            <button
              className="inline-flex gap-x-2 focus-visible:outline-none text-primary-500 font-semibold items-center"
              onClick={handleCopyLink}
            >
              <Link01 className="h-[15px] w-[15px]" />
              {copySuccess ? "Copied!" : "Copy Link"}
            </button>
            <div className="inline-flex items-center gap-x-3">
              <DialogClose asChild>
                <Button visual="gray" variant="outlined">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSendInvites}>Send Invite</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
