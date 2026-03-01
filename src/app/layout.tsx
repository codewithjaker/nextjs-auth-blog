import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mustaqbal Zamzam Group | Electronics Trading",
  description: "Leading electronics trading group with $240M+ annual turnover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div>
            {children}
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
