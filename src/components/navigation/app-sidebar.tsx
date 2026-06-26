
"use client"

import * as React from "react"
import { 
  Layout
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-[#FBBF24] text-black shadow-sm">
            <Layout className="size-6" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-headline text-lg font-bold tracking-tight text-[#064E3B]">
              PKH Mateng
            </span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Workspace</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
      </SidebarContent>
    </Sidebar>
  )
}
