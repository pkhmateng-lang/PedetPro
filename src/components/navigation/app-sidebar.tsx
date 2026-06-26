
"use client"

import * as React from "react"
import { 
  Layout, 
  Palette, 
  Zap, 
  Box, 
  Home, 
  Settings,
  Grid
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()

  const items = [
    { title: "Home", url: "/", icon: Home },
    { title: "AI Blueprints", url: "/blueprints", icon: Zap },
    { title: "Skeleton Library", url: "/skeletons", icon: Box },
    { title: "Theme Workbench", url: "/workbench", icon: Palette },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Layout className="size-5" />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight group-data-[collapsible=icon]:hidden">
            TABULA
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
