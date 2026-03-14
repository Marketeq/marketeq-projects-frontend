import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarItem } from "./sidebar"
import NextLink from "@/components/next-link"
import { Star, Plus } from "@blend-metrics/icons"
import React from "react"

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        {/* Logo or App Name */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* Other sidebar items here */}
          <NextLink href="/publish-project" passHref>
            <SidebarItem aria-label="Create a Project">
              <Plus className="w-6 h-6" />
            </SidebarItem>
          </NextLink>
          <NextLink href="/group/group/my-favorites" passHref>
            <SidebarItem aria-label="My Favorites">
              <Star className="w-6 h-6" />
            </SidebarItem>
          </NextLink>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
