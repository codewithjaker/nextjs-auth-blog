"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
// import { ModeToggle } from "@/components/mode-toggle";
import { Menu, Phone } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      {/* Mobile sidebar trigger */}
      <SidebarTrigger className="lg:hidden">
        <Menu className="h-5 w-5" />
      </SidebarTrigger>

      {/* Desktop spacer */}
      <div className="hidden lg:block lg:w-4" />

      {/* Logo - mobile only */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <span className="font-bold text-white text-sm">MZ</span>
        </div>
        <span className="font-bold">Mustaqbal Zamzam</span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
          <Link href="/contact">
            <Phone className="mr-2 h-4 w-4" />
            Contact
          </Link>
        </Button>
        {/* <ModeToggle /> */}
        <Button size="sm" className="bg-primary hover:bg-primary/90 lg:hidden">
          Inquiry
        </Button>
      </div>
    </header>
  );
}