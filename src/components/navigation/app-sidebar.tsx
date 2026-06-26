
"use client"

import * as React from "react"
import { 
  Layout, 
  Users, 
  ClipboardList, 
  MapPin, 
  Home, 
  Settings,
  PieChart
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
    { title: "Beranda", url: "/", icon: Home },
    { title: "Data KPM", url: "/kpm", icon: Users },
    { title: "Laporan Lapangan", url: "/laporan", icon: ClipboardList },
    { title: "Wilayah", url: "/wilayah", icon: MapPin },
    { title: "Statistik", url: "/statistik", icon: PieChart },
  ]

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
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden">Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="hover:bg-secondary/20 data-[active=true]:bg-secondary/30 data-[active=true]:text-primary"
                  >
                    <Link href={item.url}>
                      <item.icon className="size-5" />
                      <span className="font-medium">{item.title}</span>
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
