"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Building2,
  Cpu,
  MapPin,
  Globe,
  Award,
  HeartHandshake,
  Mail,
  TrendingUp,
  Users,
  Calendar,
  ChevronUp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// Navigation items (your existing data)
const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About Founder", href: "/about", icon: User },
  { name: "Business Group", href: "/business-group", icon: Building2 },
  { name: "Expertise", href: "/expertise", icon: Cpu },
  { name: "Branches", href: "/branches", icon: MapPin },
  { name: "Digital Media", href: "/media", icon: Globe },
  { name: "Awards", href: "/awards", icon: Award },
  { name: "CSR", href: "/csr", icon: HeartHandshake },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      {/* Header with Logo */}
      <SidebarHeader>
        <div
          className={cn(
            "flex items-center gap-3 px-2 py-4",
            isCollapsed && "justify-center",
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
            <span className="font-bold text-white text-lg">MZ</span>
          </div>
          <div
            className={cn(
              "flex flex-col overflow-hidden transition-all duration-200",
              isCollapsed && "hidden",
            )}
          >
            <h1 className="font-bold text-lg truncate">Mustaqbal Zamzam</h1>
            <p className="text-sm text-muted-foreground truncate">
              Electronics Group
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        {/* Business Metrics - hidden when collapsed */}
        {/* {!isCollapsed && (
          <SidebarGroup>
            <SidebarGroupLabel>Business Metrics</SidebarGroupLabel>
            <div className="px-2 py-2 space-y-2">
              {businessStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-sm">{stat.label}</span>
                    </div>
                    <span className="font-bold text-primary">{stat.value}</span>
                  </div>
                );
              })}
            </div>
            <SidebarSeparator className="my-2" />
          </SidebarGroup>
        )} */}

        {/* Navigation Group */}
        <SidebarGroup>
          <SidebarGroupLabel className={cn(isCollapsed && "sr-only")}>
            Navigation
          </SidebarGroupLabel>
          <SidebarMenu>
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.name}
                  >
                    <Link href={item.href}>
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with User Profile */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  tooltip="Mohammod Showkat"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-6 w-6 rounded-lg">
                    <AvatarImage src="/founder.jpg" alt="Founder" />
                    <AvatarFallback className="rounded-lg bg-primary text-white text-xs">
                      MS
                    </AvatarFallback>
                  </Avatar>
                  <span className={cn(isCollapsed && "hidden")}>
                    Mohammod Showkat
                  </span>
                  <ChevronUp
                    className={cn("ml-auto h-4 w-4", isCollapsed && "hidden")}
                  />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] bg-popover text-popover-foreground"
              >
                <DropdownMenuItem asChild>
                  <Link href="/contact">Business Inquiry</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about">View Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

// Default export for use in layout
export default AppSidebar;
