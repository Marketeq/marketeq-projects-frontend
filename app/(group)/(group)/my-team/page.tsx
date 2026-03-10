"use client"

import { useEffect, useMemo, useState } from "react"
import { useAuth } from "@/contexts/auth"
import { InviteWindow, InviteWindowTrigger } from "@/components/invite-window"
import { getFirstItem } from "@/utils/functions"
import {
  Edit03,
  Copy,
  Trash2,
  Zap,
  MoreHorizontal,
  Plus,
  SearchMd,
} from "@blend-metrics/icons"
import { ToggleGroupItem, ToggleGroupRoot } from "@/components/ui/toggle-group"
import { Grid, List, SortAs } from "@/components/icons"
import { InvitationsAPI } from "@/service/http/invitations"
import { TeamsAPI, TeamMember, AffiliatedTeam } from "@/service/http/teams"
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  IconButton,
  ScrollArea,
  ScrollBar,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui"

const GRID_LAYOUT = "GRID"
const LIST_LAYOUT = "LIST"

type ApiInvitation = {
  id: string
  teamId: string
  teamName?: string
  invitedEmail: string
  role: "admin" | "editor" | "viewer"
  status: "pending" | "accepted" | "canceled" | "expired"
  token: string
  createdByUserId: string
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

function toDisplayName(member: TeamMember): string {
  const fullName = [member.firstName, member.lastName].filter(Boolean).join(" ").trim()
  if (fullName) return fullName
  if (member.username) return member.username
  if (member.email) {
    const local = member.email.split("@")[0] || ""
    if (local) return local
  }
  if (uuidPattern.test(member.userId)) return "Team Member"
  return member.userId
}

// ─── Member Card (Grid) ───────────────────────────────────────────────────────
const MemberCard = ({ member }: { member: TeamMember }) => {
  const displayName = toDisplayName(member)
  const avatarUrl = member.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.userId}`
  const fallback = displayName.slice(0, 2).toUpperCase()

  return (
    <article className="relative grid rounded-[6px] lg:rounded-[8px] p-5 lg:py-[35px] lg:px-[30px] bg-white border border-gray-200 shadow-[0px_2px_5px_0px_theme(colors.black/.04)]">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton className="absolute h-6 w-auto top-2.5 px-1.5 right-2.5 text-gray-400" visual="gray" variant="ghost">
            <MoreHorizontal className="size-5" />
          </IconButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[165px]">
          <DropdownMenuItem><Edit03 className="h-4 w-4" /> Edit</DropdownMenuItem>
          <DropdownMenuItem><Copy className="h-4 w-4" /> Duplicate</DropdownMenuItem>
          <DropdownMenuItem><Zap className="h-4 w-4" /> Run Test</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem visual="destructive"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center justify-center">
        <Avatar className="size-[62px] lg:size-[116px]" size="2xl">
          <AvatarImage src={avatarUrl} alt={displayName} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </div>
      <h1 className="text-[13px] leading-[15.73px] lg:text-base text-center lg:leading-[19.36px] font-bold text-[#122A4B] mt-3 lg:mt-[17px]">
        {displayName}
      </h1>
      <p className="text-[11px] leading-[13.31px] lg:text-sm text-center font-light lg:leading-[16.94px] text-[#585C65] mt-1 capitalize">
        {member.role}
      </p>
      {member.email && (
        <div className="flex items-center justify-center mt-3 lg:mt-[17px]">
          <Button className="xs:max-lg:text-[10px] xs:max-lg:leading-4 truncate max-w-full" variant="link" visual="primary">
            {member.email}
          </Button>
        </div>
      )}
    </article>
  )
}

// ─── Member Card (List) ───────────────────────────────────────────────────────
const MemberCardLandscape = ({ member }: { member: TeamMember }) => {
  const displayName = toDisplayName(member)
  const avatarUrl = member.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.userId}`
  const fallback = displayName.slice(0, 2).toUpperCase()

  return (
    <div className="flex xs:max-lg:flex-col xs:max-lg:p-3 rounded-[8px] bg-white shadow-[0px_2px_5px_0px_theme(colors.black/.04)] border border-gray-200">
      <div className="lg:contents flex items-center justify-between">
        <div className="lg:flex-auto flex items-center gap-x-3 md:pl-3 md:py-3 lg:pl-5 lg:py-5">
          <Avatar className="xs:max-lg:size-[50px]" size="md">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <span className="block text-[13px] leading-[15.73px] lg:text-base font-bold lg:leading-[21.79px] text-dark-blue-400">
              {displayName}
            </span>
            {member.email && (
              <span className="text-[11px] leading-[13.31px] lg:text-sm lg:leading-[19.07px] font-light text-[#585C65]">
                {member.email}
              </span>
            )}
          </div>
        </div>
        <div className="flex-auto text-sm font-light flex items-center gap-x-2 text-dark-blue-400 lg:pl-5 lg:py-5 xs:max-lg:hidden">
          Role <span className="font-bold capitalize">{member.role}</span>
        </div>
        <div className="flex lg:flex-auto justify-end items-center lg:pr-5 lg:py-5">
          <IconButton className="text-gray-400 xs:max-lg:size-[30.45px]" visual="gray" variant="ghost">
            <MoreHorizontal className="size-[18.32px] lg:size-5" />
          </IconButton>
        </div>
      </div>
      <div className="flex items-center lg:hidden mt-2">
        <div className="text-[10px] font-light flex items-center gap-x-1.5 text-dark-blue-400">
          Role <span className="font-bold capitalize">{member.role}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Members Display ──────────────────────────────────────────────────────────
const MembersDisplay = ({ members, layout, loading }: { members: TeamMember[]; layout: string; loading: boolean }) => {
  if (loading) return <p className="text-sm text-gray-500 mt-6">Loading...</p>
  if (members.length === 0) return <p className="text-sm text-gray-500 mt-6">No team members found.</p>
  return layout === GRID_LAYOUT ? (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
      {members.map((m) => <MemberCard key={m.userId} member={m} />)}
    </div>
  ) : (
    <div className="grid gap-y-3">
      {members.map((m) => <MemberCardLandscape key={m.userId} member={m} />)}
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const Dropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className="focus-visible:outline-none shrink-0">
        <SortAs className="size-4 lg:size-6 text-gray-500" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <ScrollArea viewportClassName="max-h-[250px]" scrollBar={<ScrollBar className="w-4 p-1" />}>
        <DropdownMenuCheckItem>Name A–Z</DropdownMenuCheckItem>
        <DropdownMenuCheckItem>Name Z–A</DropdownMenuCheckItem>
        <DropdownMenuCheckItem>Role</DropdownMenuCheckItem>
      </ScrollArea>
    </DropdownMenuContent>
  </DropdownMenu>
)

const InviteWindowButton = () => (
  <InviteWindowTrigger asChild>
    <Button
      className="border-primary-500 xs:max-lg:text-[10px] xs:max-lg:leading-[18.63px] xs:max-lg:h-8 xs:max-lg:px-[11px] xs:max-lg:py-1.5 xs:max-lg:gap-x-1.5 text-primary-500 hover:text-white hover:bg-primary-500"
      variant="outlined" visual="gray" size="md"
    >
      <Plus className="size-[11.64px] lg:size-[15px]" /> Add Team Member
    </Button>
  </InviteWindowTrigger>
)

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MyTeam() {
  const { user } = useAuth()
  const [value, setValue] = useState([GRID_LAYOUT])
  const [pendingInvites, setPendingInvites] = useState<ApiInvitation[]>([])
  const [ownMembers, setOwnMembers] = useState<TeamMember[]>([])
  const [networkMembers, setNetworkMembers] = useState<TeamMember[]>([])
  const [allMembers, setAllMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const currentUserId = useMemo(() =>
    (user as any)?.id || (user as any)?.sub || "", [user])

  const currentUserEmail = useMemo(() =>
    ((user as any)?.email || "").toLowerCase(), [user])

  // ─── Fetch members for a list of teamIds, deduped by userId ────────────────
  const fetchMembersForTeams = async (teamIds: string[]): Promise<TeamMember[]> => {
    if (teamIds.length === 0) return []
    const results = await Promise.all(
      teamIds.map((id) =>
        TeamsAPI.getTeamMembers(id)
          .then((r) => {
            const p = r?.data
            return Array.isArray(p) ? p
              : Array.isArray(p?.data) ? p.data
              : Array.isArray(p?.members) ? p.members
              : []
          })
          .catch(() => [])
      )
    )
    const flat: TeamMember[] = results.flat().filter(Boolean)
    const map: Record<string, TeamMember> = {}
    for (const m of flat) {
      if (m?.userId && !map[m.userId]) map[m.userId] = m
    }
    return Object.values(map)
  }

  const fetchAll = async () => {
    if (!currentUserEmail) { setLoading(false); return }
    try {
      setLoading(true)
      setError(null)

      // 1. Fetch affiliated teams (new system)
      let affiliatedTeamIds: string[] = []
      try {
        const res = await TeamsAPI.getAffiliatedTeams()
        const payload = res?.data
        const list: AffiliatedTeam[] = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data) ? payload.data : []
        affiliatedTeamIds = list.map((t) => t.id)
      } catch {
        // non-fatal — fall through to legacy
      }

      // 2. Own team IDs = affiliated team IDs + legacy userId-as-teamId
      //    This ensures yesterday's data (teamId = userId) still shows up
      const ownTeamIds = Array.from(new Set([
        ...affiliatedTeamIds,
        currentUserId,   // ← legacy fallback
      ].filter(Boolean)))

      // 3. Fetch invitations to find joined (network) teams
      const response = await InvitationsAPI.listInvitations({ limit: 100 })
      const payload = response?.data
      let rows: ApiInvitation[] = []
      if (Array.isArray(payload?.data)) rows = payload.data
      else if (Array.isArray(payload)) rows = payload

      const mine = rows.filter((inv) =>
        (inv?.invitedEmail || "").toLowerCase() === currentUserEmail
      )
      setPendingInvites(mine.filter((inv) => inv.status === "pending"))

      // Joined team IDs = accepted invites where teamId is NOT one of our own teams
      const joinedTeamIds = Array.from(new Set(
        mine
          .filter((inv) => inv.status === "accepted")
          .map((inv) => inv.teamId)
          .filter((id) => id && !ownTeamIds.includes(id))
      ))

      // 4. Fetch members
      const [own, network] = await Promise.all([
        fetchMembersForTeams(ownTeamIds),
        fetchMembersForTeams(joinedTeamIds),
      ])

      setOwnMembers(own)
      setNetworkMembers(network)

      // All = own + network, deduped by userId
      const combinedMap: Record<string, TeamMember> = {}
      for (const m of [...own, ...network]) {
        if (m?.userId && !combinedMap[m.userId]) combinedMap[m.userId] = m
      }
      setAllMembers(Object.values(combinedMap))

    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to load team data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchAll() }, [currentUserEmail, currentUserId, refreshKey])

  const acceptInvite = async (token: string) => {
    try {
      await InvitationsAPI.acceptInvitation(token)
      setRefreshKey((k) => k + 1)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to accept invitation")
    }
  }

  const layout = getFirstItem(value) as string

  return (
    <div className="p-3.5 md:p-6 lg:py-[100px] lg:px-[200px]">

      {/* Mobile top bar */}
      <div className="md:hidden items-center flex flex-row-reverse justify-between">
        <div className="flex items-center gap-x-1.5">
          <Dropdown />
          <ToggleGroupRoot value={value} onValueChange={(d) => setValue(d.value)}>
            <ToggleGroupItem value={GRID_LAYOUT}><Grid className="size-4" /></ToggleGroupItem>
            <ToggleGroupItem value={LIST_LAYOUT}><List className="size-4" /></ToggleGroupItem>
          </ToggleGroupRoot>
        </div>
        <InviteWindowButton />
      </div>

      <h1 className="text-lg leading-[21.78px] lg:text-[28px] lg:leading-[33.89px] font-bold text-dark-blue-400 xs:max-md:mt-6">
        My Team
      </h1>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>
      )}

      {/* Pending Invitations */}
      {!loading && pendingInvites.length > 0 && (
        <section className="mt-6 rounded-lg border border-gray-200 bg-white p-4">
          <h2 className="text-base font-semibold text-dark-blue-400">Pending Invitations For You</h2>
          <div className="mt-3 space-y-3">
            {pendingInvites.map((inv) => (
              <div key={inv.id} className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-gray-200 p-3">
                <div>
                  <p className="text-sm font-medium text-gray-900">Team: {inv.teamName || inv.teamId}</p>
                  <p className="text-xs text-gray-600">Role: {inv.role}</p>
                </div>
                <Button
                  className="border-primary-500 text-primary-500 hover:text-white hover:bg-primary-500"
                  variant="outlined" visual="gray" size="md"
                  onClick={() => acceptInvite(inv.token)}
                >
                  Accept
                </Button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Tabs */}
      <Tabs className="mt-7 lg:mt-[19px]" defaultValue="Show All">
        <div className="border-b h-10 lg:h-[60px] flex items-end justify-between border-gray-200">
          <div className="items-end inline-flex gap-x-3 lg:gap-x-3.5">
            <Button className="text-gray-500" variant="ghost" visual="gray" size="md">
              <SearchMd className="size-[18px]" />
            </Button>
            <TabsList className="flex justify-start border-b-0 px-0">
              <TabsTrigger className="xs:max-lg:text-xs xs:max-lg:leading-5" value="Show All">Show All</TabsTrigger>
              <TabsTrigger className="xs:max-lg:text-xs xs:max-lg:leading-5" value="Internal Team">Internal Team</TabsTrigger>
              <TabsTrigger className="xs:max-lg:text-xs xs:max-lg:leading-5" value="Talent Network">Talent Network</TabsTrigger>
            </TabsList>
          </div>
          <div className="hidden items-center gap-x-6 self-start md:flex">
            <div className="flex items-center gap-x-3 lg:gap-x-3.5">
              <Dropdown />
              <ToggleGroupRoot value={value} onValueChange={(d) => setValue(d.value)}>
                <ToggleGroupItem value={GRID_LAYOUT}><Grid className="size-4 lg:size-6" /></ToggleGroupItem>
                <ToggleGroupItem value={LIST_LAYOUT}><List className="size-4 lg:size-6" /></ToggleGroupItem>
              </ToggleGroupRoot>
            </div>
            <InviteWindowButton />
          </div>
        </div>

        {/* Show All = own + network */}
        <TabsContent value="Show All">
          <div className="pt-3.5 lg:pt-6">
            <MembersDisplay members={allMembers} layout={layout} loading={loading} />
          </div>
        </TabsContent>

        {/* Internal Team = own affiliated teams + legacy userId-as-teamId */}
        <TabsContent value="Internal Team">
          <div className="pt-3.5 lg:pt-6">
            <MembersDisplay members={ownMembers} layout={layout} loading={loading} />
          </div>
        </TabsContent>

        {/* Talent Network = teams joined via invitation */}
        <TabsContent value="Talent Network">
          <div className="pt-3.5 lg:pt-6">
            <MembersDisplay members={networkMembers} layout={layout} loading={loading} />
          </div>
        </TabsContent>
      </Tabs>

      <InviteWindow />
    </div>
  )
}
