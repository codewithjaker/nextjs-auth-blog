// import { Footer } from "@/components/layout/footer";
// import { Header } from "@/components/layout/header";
// import { Sidebar } from "@/components/sidebar";
// import { SidebarProvider } from "@/components/ui/sidebar";
// import { AuthProvider } from "@/lib/auth";

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <AuthProvider>
//       <div className="flex">
//         <SidebarProvider>
//           <div className="flex min-h-screen w-full">
//             {/* Sidebar - hidden on mobile, collapsible on desktop */}
//             <Sidebar />
//             {/* <AppSidebar /> */}

//             {/* Main content area */}
//             <div className="flex flex-1 flex-col w-full min-w-0">
//               <Header />
//               <main className="flex-1 px-4 py-6 lg:px-8">
//                 <div className="mx-auto max-w-7xl">{children}</div>
//               </main>
//               <Footer />
//             </div>
//           </div>
//         </SidebarProvider>
//       </div>
//     </AuthProvider>
//   );
// }

import { Sidebar } from "@/components/sidebar";
import { AuthProvider } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">{children}</main>
      </div>
    </AuthProvider>
  );
}
