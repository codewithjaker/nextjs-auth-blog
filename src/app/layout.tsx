// // app/layout.tsx
// import type { Metadata } from "next";
// import { Inter, Playfair_Display } from "next/font/google";
// import "./globals.css";
// // import  { AppSidebar } from "@/components/layout/sidebar";
// import { ThemeProvider } from "@/components/theme-provider";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import Sidebar from "@/components/layout/sidebar";

// const inter = Inter({ subsets: ["latin"] });
// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   variable: "--font-playfair",
// });

// export const metadata: Metadata = {
//   title: "Mustaqbal Zamzam Group | Electronics Trading",
//   description: "Leading electronics trading group with $240M+ annual turnover",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={`${inter.className} ${playfair.variable}`}>
//       <body className="min-h-screen bg-background">
//         <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
//           <div className="flex min-h-screen">
//             <Sidebar />
//             <main className="flex-1 p-6 lg:p-8">
//               <div className="max-w-7xl mx-auto">{children}</div>
//             </main>
//           </div>
//           {/* <SidebarProvider>
//             <div className="flex min-h-screen">
//               <AppSidebar />
//               <main className="flex-1 p-6 lg:p-8">{children}</main>
//             </div>
//           </SidebarProvider> */}
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ThemeProvider } from "@/components/theme-provider";

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
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              {/* Sidebar - hidden on mobile, collapsible on desktop */}
              <AppSidebar />
              
              {/* Main content area */}
              <div className="flex flex-1 flex-col w-full min-w-0">
                <Header />
                <main className="flex-1 px-4 py-6 lg:px-8">
                  <div className="mx-auto max-w-7xl">
                    {children}
                  </div>
                </main>
                <Footer />
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
