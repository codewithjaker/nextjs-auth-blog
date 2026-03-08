"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Users,
  FileText,
  Folder,
  MessageCircle,
  Menu,
  Image,
  File,
  HelpCircle,
  Link2,
  Settings,
  Activity,
  Heart,
  Bookmark,
  Bell,
  MessageSquare,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/users", label: "Users", icon: Users },
  { href: "/categories", label: "Categories", icon: Folder },
  { href: "/posts", label: "Posts", icon: FileText },
  { href: "/comments", label: "Comments", icon: MessageCircle },
  { href: "/follows", label: "Follows", icon: Users },
  { href: "/reactions", label: "Reactions", icon: Heart },
  { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
  { href: "/menus", label: "Menus", icon: Menu },
  { href: "/sliders", label: "Sliders", icon: Image },
  { href: "/pages", label: "Pages", icon: File },
  { href: "/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/social-links", label: "Social Links", icon: Link2 },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/activity-logs", label: "Activity Logs", icon: Activity },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/chat-rooms", label: "Chat", icon: MessageSquare },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-muted/40 h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-4 font-bold text-xl">Admin Panel</div>
      <nav className="space-y-1 p-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
