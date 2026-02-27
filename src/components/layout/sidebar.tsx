// // components/layout/sidebar.tsx
// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   Home,
//   User,
//   Building2,
//   Cpu,
//   MapPin,
//   Globe,
//   Award,
//   HeartHandshake,
//   Mail,
//   Menu,
//   X,
//   TrendingUp,
//   Users,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { cn } from "@/lib/utils";

// const navigation = [
//   { name: "Home", href: "/", icon: Home },
//   { name: "About Founder", href: "/about", icon: User },
//   { name: "Business Group", href: "/business-group", icon: Building2 },
//   { name: "Expertise", href: "/expertise", icon: Cpu },
//   { name: "Branches", href: "/branches", icon: MapPin },
//   { name: "Digital Media", href: "/media", icon: Globe },
//   { name: "Awards", href: "/awards", icon: Award },
//   { name: "CSR", href: "/csr", icon: HeartHandshake },
//   { name: "Contact", href: "/contact", icon: Mail },
// ];

// // const businessStats = [
// //   { label: "Annual Sales", value: "$240M+", icon: TrendingUp },
// //   { label: "Happy Clients", value: "50K+", icon: Users },
// //   { label: "Years Experience", value: "12+", icon: TrendingUp },
// // ];

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <aside className="hidden lg:flex flex-col w-64 border-r bg-card">
//         <div className="p-6 border-b">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
//               <span className="text-white font-bold text-lg">MZ</span>
//             </div>
//             <div>
//               <h1 className="font-bold text-lg">Mustaqbal Zamzam</h1>
//               <p className="text-sm text-muted-foreground">Electronics Group</p>
//             </div>
//           </div>
//         </div>

//         {/* <div className="p-4 space-y-2">
//           {businessStats.map((stat) => (
//             <div
//               key={stat.label}
//               className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
//             >
//               <div className="flex items-center space-x-2">
//                 <stat.icon className="h-4 w-4 text-primary" />
//                 <span className="text-sm">{stat.label}</span>
//               </div>
//               <span className="font-bold text-primary">{stat.value}</span>
//             </div>
//           ))}
//         </div> */}

//         <nav className="flex-1 p-4">
//           <div className="space-y-1">
//             {navigation.map((item) => {
//               const Icon = item.icon;
//               const isActive = pathname === item.href;

//               return (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={cn(
//                     "flex items-center space-x-3 px-3 py-3 rounded-lg transition-all hover:bg-accent",
//                     isActive && "bg-primary/10 text-primary font-medium",
//                   )}
//                 >
//                   <Icon className="h-5 w-5" />
//                   <span>{item.name}</span>
//                 </Link>
//               );
//             })}
//           </div>
//         </nav>

//         {/* <div className="p-6 border-t">
//           <Button className="w-full" size="lg">
//             📞 Business Inquiry
//           </Button>
//         </div> */}
//       </aside>

//       {/* Mobile Header */}
//       <header className="lg:hidden flex items-center justify-between p-4 border-b bg-card">
//         <div className="flex items-center space-x-3">
//           <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
//             <span className="text-white font-bold">MZ</span>
//           </div>
//           <div>
//             <h1 className="font-bold">Mustaqbal Zamzam</h1>
//           </div>
//         </div>

//         <Sheet open={open} onOpenChange={setOpen}>
//           <SheetTrigger asChild>
//             <Button variant="ghost" size="icon">
//               <Menu className="h-5 w-5" />
//             </Button>
//           </SheetTrigger>
//           <SheetContent side="left" className="w-64 p-0">
//             <div className="p-6 border-b">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
//                     <span className="text-white font-bold text-lg">MZ</span>
//                   </div>
//                   <div>
//                     <h1 className="font-bold text-lg">Mustaqbal Zamzam</h1>
//                     <p className="text-sm text-muted-foreground">
//                       Electronics Group
//                     </p>
//                   </div>
//                 </div>
//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   onClick={() => setOpen(false)}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>
//             <nav className="p-4">
//               <div className="space-y-2">
//                 {navigation.map((item) => {
//                   const Icon = item.icon;
//                   const isActive = pathname === item.href;

//                   return (
//                     <Link
//                       key={item.name}
//                       href={item.href}
//                       onClick={() => setOpen(false)}
//                       className={cn(
//                         "flex items-center space-x-3 px-3 py-3 rounded-lg transition-all hover:bg-accent",
//                         isActive && "bg-primary/10 text-primary font-medium",
//                       )}
//                     >
//                       <Icon className="h-5 w-5" />
//                       <span>{item.name}</span>
//                     </Link>
//                   );
//                 })}
//               </div>
//             </nav>
//           </SheetContent>
//         </Sheet>
//       </header>
//     </>
//   );
// }

// // "use client";

// // import * as React from "react";
// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import {
// //   Home,
// //   User,
// //   Building2,
// //   Cpu,
// //   MapPin,
// //   Globe,
// //   Award,
// //   HeartHandshake,
// //   Mail,
// //   Menu,
// //   TrendingUp,
// //   Users,
// //   X,
// // } from "lucide-react";

// // import { cn } from "@/lib/utils";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetTrigger,
// // } from "@/components/ui/sheet";
// // import {
// //   Sidebar as Sidebars,
// //   SidebarContent,
// //   SidebarFooter,
// //   SidebarHeader,
// //   SidebarMenu,
// //   SidebarMenuItem,
// //   SidebarMenuButton,
// //   SidebarGroup,
// //   SidebarGroupLabel,
// //   SidebarSeparator,
// //   useSidebar,
// // } from "@/components/ui/sidebar";

// // const navigation = [
// //   { name: "Home", href: "/", icon: Home },
// //   { name: "About Founder", href: "/about", icon: User },
// //   { name: "Business Group", href: "/business-group", icon: Building2 },
// //   { name: "Expertise", href: "/expertise", icon: Cpu },
// //   { name: "Branches", href: "/branches", icon: MapPin },
// //   { name: "Digital Media", href: "/media", icon: Globe },
// //   { name: "Awards", href: "/awards", icon: Award },
// //   { name: "CSR", href: "/csr", icon: HeartHandshake },
// //   { name: "Contact", href: "/contact", icon: Mail },
// // ];

// // const businessStats = [
// //   { label: "Annual Sales", value: "$240M+", icon: TrendingUp },
// //   { label: "Happy Clients", value: "50K+", icon: Users },
// //   { label: "Years Experience", value: "12+", icon: TrendingUp },
// // ];

// // // Desktop Sidebar using Shadcn Sidebar component
// // export function AppSidebar() {
// //   const pathname = usePathname();
// //   const { open, toggleSidebar } = useSidebar(); // comes from SidebarProvider

// //   return (
// //     <Sidebars collapsible="icon" variant="sidebar">
// //       <SidebarHeader>
// //         <div className="flex items-center gap-3 px-2 py-4">
// //           <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
// //             <span className="font-bold text-white text-lg">MZ</span>
// //           </div>
// //           <div className="flex flex-col overflow-hidden transition-all duration-200 data-[collapsed=true]:hidden">
// //             <h1 className="font-bold text-lg truncate">Mustaqbal Zamzam</h1>
// //             <p className="text-sm text-muted-foreground truncate">
// //               Electronics Group
// //             </p>
// //           </div>
// //         </div>
// //       </SidebarHeader>

// //       <SidebarContent>
// //         <SidebarGroup>
// //           <SidebarGroupLabel>Business Metrics</SidebarGroupLabel>
// //           <div className="px-2 py-2 space-y-2">
// //             {businessStats.map((stat) => {
// //               const Icon = stat.icon;
// //               return (
// //                 <div
// //                   key={stat.label}
// //                   className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
// //                 >
// //                   <div className="flex items-center gap-2">
// //                     <Icon className="h-4 w-4 text-primary" />
// //                     <span className="text-sm">{stat.label}</span>
// //                   </div>
// //                   <span className="font-bold text-primary">{stat.value}</span>
// //                 </div>
// //               );
// //             })}
// //           </div>
// //         </SidebarGroup>

// //         <SidebarSeparator />

// //         <SidebarGroup>
// //           <SidebarGroupLabel>Navigation</SidebarGroupLabel>
// //           <SidebarMenu>
// //             {navigation.map((item) => {
// //               const Icon = item.icon;
// //               const isActive = pathname === item.href;
// //               return (
// //                 <SidebarMenuItem key={item.name}>
// //                   <SidebarMenuButton
// //                     asChild
// //                     isActive={isActive}
// //                     tooltip={item.name}
// //                   >
// //                     <Link href={item.href}>
// //                       <Icon className="h-5 w-5" />
// //                       <span>{item.name}</span>
// //                     </Link>
// //                   </SidebarMenuButton>
// //                 </SidebarMenuItem>
// //               );
// //             })}
// //           </SidebarMenu>
// //         </SidebarGroup>
// //       </SidebarContent>

// //       <SidebarFooter>
// //         <div className="p-4">
// //           <Button className="w-full" size="lg">
// //             📞 Business Inquiry
// //           </Button>
// //         </div>
// //       </SidebarFooter>
// //     </Sidebars>
// //   );
// // }

// // // Mobile Header with Sheet
// // export function MobileHeader() {
// //   const [open, setOpen] = React.useState(false);
// //   const pathname = usePathname();

// //   return (
// //     <header className="lg:hidden flex items-center justify-between p-4 border-b bg-card sticky top-0 z-50">
// //       <div className="flex items-center gap-3">
// //         <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
// //           <span className="text-white font-bold">MZ</span>
// //         </div>
// //         <div>
// //           <h1 className="font-bold">Mustaqbal Zamzam</h1>
// //         </div>
// //       </div>

// //       <Sheet open={open} onOpenChange={setOpen}>
// //         <SheetTrigger asChild>
// //           <Button variant="ghost" size="icon">
// //             <Menu className="h-5 w-5" />
// //           </Button>
// //         </SheetTrigger>
// //         <SheetContent side="left" className="w-72 p-0">
// //           <div className="flex flex-col h-full">
// //             <div className="p-6 border-b">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
// //                     <span className="text-white font-bold text-lg">MZ</span>
// //                   </div>
// //                   <div>
// //                     <h1 className="font-bold text-lg">Mustaqbal Zamzam</h1>
// //                     <p className="text-sm text-muted-foreground">
// //                       Electronics Group
// //                     </p>
// //                   </div>
// //                 </div>
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   onClick={() => setOpen(false)}
// //                 >
// //                   <X className="h-4 w-4" />
// //                 </Button>
// //               </div>
// //             </div>

// //             <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
// //               {/* Mobile Stats */}
// //               <div className="space-y-3">
// //                 <h3 className="text-sm font-medium text-muted-foreground">
// //                   Business Metrics
// //                 </h3>
// //                 <div className="grid grid-cols-3 gap-2">
// //                   {businessStats.map((stat) => {
// //                     const Icon = stat.icon;
// //                     return (
// //                       <div
// //                         key={stat.label}
// //                         className="text-center p-3 rounded-lg bg-muted/50"
// //                       >
// //                         <Icon className="h-4 w-4 text-primary mx-auto" />
// //                         <div className="font-bold text-primary mt-1">
// //                           {stat.value}
// //                         </div>
// //                         <div className="text-xs text-muted-foreground">
// //                           {stat.label}
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               </div>

// //               <div className="space-y-3">
// //                 <h3 className="text-sm font-medium text-muted-foreground">
// //                   Navigation
// //                 </h3>
// //                 <div className="space-y-1">
// //                   {navigation.map((item) => {
// //                     const Icon = item.icon;
// //                     const isActive = pathname === item.href;
// //                     return (
// //                       <Link
// //                         key={item.name}
// //                         href={item.href}
// //                         onClick={() => setOpen(false)}
// //                         className={cn(
// //                           "flex items-center gap-3 px-3 py-3 rounded-lg transition-all hover:bg-accent",
// //                           isActive && "bg-primary/10 text-primary font-medium"
// //                         )}
// //                       >
// //                         <Icon className="h-5 w-5" />
// //                         <span>{item.name}</span>
// //                       </Link>
// //                     );
// //                   })}
// //                 </div>
// //               </div>
// //             </nav>

// //             <div className="p-6 border-t">
// //               <Button className="w-full" onClick={() => setOpen(false)}>
// //                 📞 Business Inquiry
// //               </Button>
// //             </div>
// //           </div>
// //         </SheetContent>
// //       </Sheet>
// //     </header>
// //   );
// // }

// // // Main Sidebar component that combines desktop and mobile
// // export default function Sidebar() {
// //   return (
// //     <>
// //       <AppSidebar />
// //       <MobileHeader />
// //     </>
// //   );
// // }

// // // components/layout/sidebar.tsx
// // "use client"

// // import { useState, useEffect } from 'react'
// // import Link from 'next/link'
// // import { usePathname } from 'next/navigation'
// // import { cva } from 'class-variance-authority'
// // import { 
// //   Home, 
// //   User, 
// //   Building2, 
// //   Cpu, 
// //   MapPin, 
// //   Globe, 
// //   Award, 
// //   HeartHandshake, 
// //   Mail,
// //   Menu,
// //   X,
// //   TrendingUp,
// //   Users,
// //   ChevronRight,
// //   Smartphone,
// //   ShoppingBag,
// //   Phone,
// //   ChevronLeft,
// //   BarChart3,
// //   Shield,
// //   Briefcase,
// //   Calendar
// // } from 'lucide-react'
// // import { Button } from '@/components/ui/button'
// // import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
// // import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// // import { Separator } from '@/components/ui/separator'
// // import { Badge } from '@/components/ui/badge'
// // import { cn } from '@/lib/utils'
// // import { motion, AnimatePresence } from 'framer-motion'

// // const navigation = [
// //   { 
// //     name: 'Dashboard', 
// //     href: '/', 
// //     icon: Home,
// //     badge: 'Home'
// //   },
// //   { 
// //     name: 'About Founder', 
// //     href: '/about', 
// //     icon: User,
// //     description: 'Leadership & Journey'
// //   },
// //   { 
// //     name: 'Business Group', 
// //     href: '/business-group', 
// //     icon: Building2,
// //     badge: '5 Companies'
// //   },
// //   { 
// //     name: 'Expertise', 
// //     href: '/expertise', 
// //     icon: Cpu,
// //     description: 'Electronics Trading'
// //   },
// //   { 
// //     name: 'Branches', 
// //     href: '/branches', 
// //     icon: MapPin,
// //     badge: '5+ Locations'
// //   },
// //   { 
// //     name: 'Digital Media', 
// //     href: '/media', 
// //     icon: Globe,
// //     description: '862K+ Followers'
// //   },
// //   { 
// //     name: 'Awards', 
// //     href: '/awards', 
// //     icon: Award,
// //     badge: '2024'
// //   },
// //   { 
// //     name: 'CSR', 
// //     href: '/csr', 
// //     icon: HeartHandshake,
// //     description: 'Community Impact'
// //   },
// //   { 
// //     name: 'Contact', 
// //     href: '/contact', 
// //     icon: Mail,
// //     badge: 'Inquiry'
// //   },
// // ]

// // const businessStats = [
// //   { 
// //     label: 'Annual Sales', 
// //     value: '$240M+', 
// //     icon: TrendingUp,
// //     change: '+15%',
// //     color: 'text-green-600'
// //   },
// //   { 
// //     label: 'Happy Clients', 
// //     value: '50K+', 
// //     icon: Users,
// //     change: '+25%',
// //     color: 'text-blue-600'
// //   },
// //   { 
// //     label: 'Experience', 
// //     value: '12+ Years', 
// //     icon: Calendar,
// //     change: 'Est. 2012',
// //     color: 'text-amber-600'
// //   },
// // ]

// // const sidebarVariants = cva(
// //   "h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-white border-r border-gray-800 transition-all duration-300 flex flex-col",
// //   {
// //     variants: {
// //       collapsed: {
// //         true: "w-20",
// //         false: "w-72"
// //       }
// //     },
// //     defaultVariants: {
// //       collapsed: false
// //     }
// //   }
// // )

// // const navItemVariants = cva(
// //   "flex items-center rounded-xl transition-all duration-200 group hover:bg-white/5",
// //   {
// //     variants: {
// //       active: {
// //         true: "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg",
// //         false: "text-gray-300 hover:text-white"
// //       },
// //       collapsed: {
// //         true: "justify-center p-3",
// //         false: "px-4 py-3 space-x-3"
// //       }
// //     }
// //   }
// // )

// // export default function Sidebar() {
// //   const pathname = usePathname()
// //   const [isMobileOpen, setIsMobileOpen] = useState(false)
// //   const [isCollapsed, setIsCollapsed] = useState(false)
// //   const [hoveredItem, setHoveredItem] = useState<string | null>(null)

// //   // Auto-collapse on mobile
// //   useEffect(() => {
// //     const handleResize = () => {
// //       if (window.innerWidth < 1024) {
// //         setIsCollapsed(false)
// //       }
// //     }
// //     handleResize()
// //     window.addEventListener('resize', handleResize)
// //     return () => window.removeEventListener('resize', handleResize)
// //   }, [])

// //   return (
// //     <>
// //       {/* Desktop Sidebar */}
// //       <aside className={cn(
// //         "hidden lg:flex flex-col fixed left-0 top-0 z-40 h-screen",
// //         sidebarVariants({ collapsed: isCollapsed })
// //       )}>
// //         {/* Header with Logo */}
// //         <div className={cn(
// //           "p-6 border-b border-gray-800 transition-all duration-300",
// //           isCollapsed ? "px-4" : "px-6"
// //         )}>
// //           <div className={cn(
// //             "flex items-center transition-all duration-300",
// //             isCollapsed ? "justify-center" : "space-x-3"
// //           )}>
// //             <div className={cn(
// //               "relative rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transition-all duration-300",
// //               isCollapsed ? "w-12 h-12" : "w-14 h-14"
// //             )}>
// //               <span className={cn(
// //                 "font-bold transition-all duration-300",
// //                 isCollapsed ? "text-xl" : "text-2xl"
// //               )}>MZ</span>
// //               <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
// //             </div>
            
// //             <AnimatePresence>
// //               {!isCollapsed && (
// //                 <motion.div
// //                   initial={{ opacity: 0, x: -10 }}
// //                   animate={{ opacity: 1, x: 0 }}
// //                   exit={{ opacity: 0, x: -10 }}
// //                   className="overflow-hidden"
// //                 >
// //                   <h1 className="font-bold text-lg leading-tight">Mustaqbal Zamzam</h1>
// //                   <p className="text-sm text-gray-400">Electronics Group</p>
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>
// //           </div>
// //         </div>

// //         {/* Toggle Button */}
// //         <div className={cn(
// //           "absolute -right-3 top-20 z-50 transition-all duration-300",
// //           isCollapsed ? "" : ""
// //         )}>
// //           <Button
// //             size="icon"
// //             className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary border-2 border-gray-900 shadow-xl hover:scale-110 transition-transform"
// //             onClick={() => setIsCollapsed(!isCollapsed)}
// //           >
// //             {isCollapsed ? (
// //               <ChevronRight className="h-4 w-4" />
// //             ) : (
// //               <ChevronLeft className="h-4 w-4" />
// //             )}
// //           </Button>
// //         </div>

// //         {/* Quick Stats */}
// //         <AnimatePresence>
// //           {!isCollapsed && (
// //             <motion.div
// //               initial={{ opacity: 0, height: 0 }}
// //               animate={{ opacity: 1, height: 'auto' }}
// //               exit={{ opacity: 0, height: 0 }}
// //               className="px-4 py-6 space-y-3"
// //             >
// //               <div className="flex items-center justify-between px-2">
// //                 <span className="text-sm font-medium text-gray-400">Business Metrics</span>
// //                 <BarChart3 className="h-4 w-4 text-primary" />
// //               </div>
              
// //               {businessStats.map((stat, index) => {
// //                 const Icon = stat.icon
// //                 return (
// //                   <motion.div
// //                     key={stat.label}
// //                     initial={{ x: -20, opacity: 0 }}
// //                     animate={{ x: 0, opacity: 1 }}
// //                     transition={{ delay: index * 0.1 }}
// //                     className="group p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
// //                   >
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-center space-x-3">
// //                         <div className="p-2 rounded-lg bg-white/10 group-hover:bg-white/20 transition-colors">
// //                           <Icon className={cn("h-4 w-4", stat.color)} />
// //                         </div>
// //                         <div>
// //                           <div className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
// //                             {stat.label}
// //                           </div>
// //                           <div className="text-lg font-bold">{stat.value}</div>
// //                         </div>
// //                       </div>
// //                       <Badge variant="outline" className="text-xs bg-white/10 border-white/20">
// //                         {stat.change}
// //                       </Badge>
// //                     </div>
// //                   </motion.div>
// //                 )
// //               })}
// //             </motion.div>
// //           )}
// //         </AnimatePresence>

// //         {/* Navigation */}
// //         <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
// //           <div className="space-y-2">
// //             {navigation.map((item) => {
// //               const Icon = item.icon
// //               const isActive = pathname === item.href
              
// //               return (
// //                 <motion.div
// //                   key={item.name}
// //                   whileHover={{ scale: 1.02 }}
// //                   whileTap={{ scale: 0.98 }}
// //                   onMouseEnter={() => setHoveredItem(item.name)}
// //                   onMouseLeave={() => setHoveredItem(null)}
// //                 >
// //                   <Link
// //                     href={item.href}
// //                     className={cn(
// //                       navItemVariants({ 
// //                         active: isActive, 
// //                         collapsed: isCollapsed 
// //                       })
// //                     )}
// //                   >
// //                     <div className="relative">
// //                       <Icon className={cn(
// //                         "h-5 w-5 transition-colors",
// //                         isActive && "text-white"
// //                       )} />
// //                       {isActive && (
// //                         <motion.div
// //                           layoutId="activeIndicator"
// //                           className="absolute -inset-1 bg-primary/20 rounded-xl -z-10"
// //                         />
// //                       )}
// //                     </div>
                    
// //                     <AnimatePresence>
// //                       {!isCollapsed && (
// //                         <motion.div
// //                           initial={{ opacity: 0, x: -10 }}
// //                           animate={{ opacity: 1, x: 0 }}
// //                           exit={{ opacity: 0, x: -10 }}
// //                           className="flex-1 flex items-center justify-between min-w-0"
// //                         >
// //                           <div className="flex flex-col min-w-0">
// //                             <span className="font-medium truncate">{item.name}</span>
// //                             {item.description && (
// //                               <span className="text-xs text-gray-400 truncate">
// //                                 {item.description}
// //                               </span>
// //                             )}
// //                           </div>
                          
// //                           {item.badge && (
// //                             <Badge 
// //                               variant={isActive ? "default" : "secondary"}
// //                               className={cn(
// //                                 "text-xs",
// //                                 isActive ? "bg-white/20" : "bg-white/5"
// //                               )}
// //                             >
// //                               {item.badge}
// //                             </Badge>
// //                           )}
// //                         </motion.div>
// //                       )}
// //                     </AnimatePresence>
// //                   </Link>
                  
// //                   {/* Hover Tooltip for Collapsed State */}
// //                   {isCollapsed && hoveredItem === item.name && (
// //                     <motion.div
// //                       initial={{ opacity: 0, x: 10 }}
// //                       animate={{ opacity: 1, x: 0 }}
// //                       className="fixed left-20 ml-2 px-3 py-2 bg-gray-900 border border-gray-800 rounded-lg shadow-xl z-50"
// //                     >
// //                       <div className="text-sm font-medium">{item.name}</div>
// //                       {item.description && (
// //                         <div className="text-xs text-gray-400">{item.description}</div>
// //                       )}
// //                       {item.badge && (
// //                         <Badge className="mt-1 text-xs bg-primary">{item.badge}</Badge>
// //                       )}
// //                     </motion.div>
// //                   )}
// //                 </motion.div>
// //               )
// //             })}
// //           </div>
// //         </nav>

// //         {/* Profile Section */}
// //         <AnimatePresence>
// //           {!isCollapsed && (
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               exit={{ opacity: 0, y: 20 }}
// //               className="p-4 border-t border-gray-800"
// //             >
// //               <div className="p-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm">
// //                 <div className="flex items-center space-x-3">
// //                   <Avatar className="h-12 w-12 border-2 border-white/20">
// //                     <AvatarImage src="/founder.jpg" alt="Mohammod Showkat" />
// //                     <AvatarFallback className="bg-gradient-to-br from-primary to-secondary">
// //                       MS
// //                     </AvatarFallback>
// //                   </Avatar>
// //                   <div className="flex-1 min-w-0">
// //                     <h4 className="font-bold truncate">Mohammod Showkat</h4>
// //                     <p className="text-sm text-gray-300 truncate">Founder & Chairman</p>
// //                   </div>
// //                 </div>
                
// //                 <Separator className="my-3 bg-white/10" />
                
// //                 <div className="flex items-center justify-between text-sm">
// //                   <div className="flex items-center space-x-2">
// //                     <Shield className="h-4 w-4 text-green-500" />
// //                     <span className="text-gray-300">Verified</span>
// //                   </div>
// //                   <Badge variant="outline" className="text-xs border-primary/30">
// //                     <Briefcase className="h-3 w-3 mr-1" />
// //                     12+ Years
// //                   </Badge>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>

// //         {/* Quick Action Button */}
// //         <div className={cn(
// //           "p-4 border-t border-gray-800 transition-all duration-300",
// //           isCollapsed ? "px-3" : "px-4"
// //         )}>
// //           <Button 
// //             className={cn(
// //               "w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300",
// //               isCollapsed && "p-0"
// //             )}
// //             size={isCollapsed ? "icon" : "lg"}
// //           >
// //             {isCollapsed ? (
// //               <Phone className="h-5 w-5" />
// //             ) : (
// //               <>
// //                 <Phone className="mr-2 h-4 w-4" />
// //                 Business Inquiry
// //               </>
// //             )}
// //           </Button>
// //         </div>
// //       </aside>

// //       {/* Mobile Header */}
// //       <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-gray-950 border-b border-gray-800">
// //         <div className="flex items-center justify-between p-4">
// //           <div className="flex items-center space-x-3">
// //             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
// //               <span className="font-bold text-white text-lg">MZ</span>
// //             </div>
// //             <div>
// //               <h1 className="font-bold text-white">Mustaqbal Zamzam</h1>
// //               <p className="text-xs text-gray-400">Electronics Group</p>
// //             </div>
// //           </div>
          
// //           <div className="flex items-center space-x-2">
// //             <Button 
// //               size="icon" 
// //               variant="ghost" 
// //               className="text-white hover:bg-white/10"
// //               onClick={() => setIsMobileOpen(true)}
// //             >
// //               <Menu className="h-5 w-5" />
// //             </Button>
// //           </div>
// //         </div>

// //         {/* Quick Stats Bar for Mobile */}
// //         <div className="flex items-center justify-around px-4 py-3 bg-white/5">
// //           {businessStats.map((stat, index) => {
// //             const Icon = stat.icon
// //             return (
// //               <div key={index} className="text-center">
// //                 <div className="flex items-center justify-center space-x-1">
// //                   <Icon className={cn("h-3 w-3", stat.color)} />
// //                   <div className="text-xs text-gray-400">{stat.label}</div>
// //                 </div>
// //                 <div className="text-sm font-bold text-white">{stat.value}</div>
// //               </div>
// //             )
// //           })}
// //         </div>
// //       </header>

// //       {/* Mobile Sheet */}
// //       <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
// //         <SheetContent side="left" className="w-80 p-0 bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-800 text-white">
// //           <div className="flex flex-col h-full">
// //             {/* Mobile Header */}
// //             <div className="p-6 border-b border-gray-800">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center space-x-3">
// //                   <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
// //                     <span className="font-bold text-white text-xl">MZ</span>
// //                   </div>
// //                   <div>
// //                     <h1 className="font-bold text-lg">Mustaqbal Zamzam</h1>
// //                     <p className="text-sm text-gray-400">Electronics Group</p>
// //                   </div>
// //                 </div>
// //                 <Button
// //                   variant="ghost"
// //                   size="icon"
// //                   className="text-white hover:bg-white/10"
// //                   onClick={() => setIsMobileOpen(false)}
// //                 >
// //                   <X className="h-5 w-5" />
// //                 </Button>
// //               </div>
// //             </div>

// //             {/* Mobile Profile */}
// //             <div className="p-6">
// //               <div className="flex items-center space-x-3">
// //                 <Avatar className="h-16 w-16 border-2 border-primary/30">
// //                   <AvatarImage src="/founder.jpg" alt="Mohammod Showkat" />
// //                   <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-lg">
// //                     MS
// //                   </AvatarFallback>
// //                 </Avatar>
// //                 <div>
// //                   <h2 className="font-bold text-lg">Mohammod Showkat</h2>
// //                   <p className="text-sm text-gray-300">Founder & Chairman</p>
// //                   <div className="flex items-center space-x-2 mt-1">
// //                     <Badge className="bg-primary">Verified</Badge>
// //                     <Badge variant="outline" className="border-primary/30 text-xs">
// //                       12+ Years
// //                     </Badge>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Mobile Navigation */}
// //             <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
// //               {navigation.map((item, index) => {
// //                 const Icon = item.icon
// //                 const isActive = pathname === item.href
                
// //                 return (
// //                   <motion.div
// //                     key={item.name}
// //                     initial={{ x: -20, opacity: 0 }}
// //                     animate={{ x: 0, opacity: 1 }}
// //                     transition={{ delay: index * 0.05 }}
// //                   >
// //                     <Link
// //                       href={item.href}
// //                       onClick={() => setIsMobileOpen(false)}
// //                       className={cn(
// //                         "flex items-center space-x-3 px-4 py-4 rounded-xl transition-all",
// //                         isActive 
// //                           ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg"
// //                           : "text-gray-300 hover:bg-white/5 hover:text-white"
// //                       )}
// //                     >
// //                       <div className="relative">
// //                         <Icon className="h-5 w-5" />
// //                         {isActive && (
// //                           <motion.div
// //                             layoutId="mobileActive"
// //                             className="absolute -inset-1 bg-primary/20 rounded-xl -z-10"
// //                           />
// //                         )}
// //                       </div>
// //                       <div className="flex-1 flex items-center justify-between">
// //                         <span className="font-medium">{item.name}</span>
// //                         {item.badge && (
// //                           <Badge 
// //                             variant={isActive ? "default" : "secondary"}
// //                             className={cn(
// //                               "text-xs",
// //                               isActive ? "bg-white/20" : "bg-white/5"
// //                             )}
// //                           >
// //                             {item.badge}
// //                           </Badge>
// //                         )}
// //                       </div>
// //                       {item.description && !item.badge && (
// //                         <span className="text-xs text-gray-400">{item.description}</span>
// //                       )}
// //                     </Link>
// //                   </motion.div>
// //                 )
// //               })}
// //             </nav>

// //             {/* Mobile Footer */}
// //             <div className="p-6 border-t border-gray-800">
// //               <Button 
// //                 className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
// //                 size="lg"
// //                 onClick={() => setIsMobileOpen(false)}
// //               >
// //                 <Phone className="mr-2 h-4 w-4" />
// //                 Contact for Business
// //               </Button>
              
// //               <div className="grid grid-cols-2 gap-3 mt-4">
// //                 <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
// //                   <Smartphone className="mr-2 h-3 w-3" />
// //                   Products
// //                 </Button>
// //                 <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
// //                   <ShoppingBag className="mr-2 h-3 w-3" />
// //                   Wholesale
// //                 </Button>
// //               </div>
// //             </div>
// //           </div>
// //         </SheetContent>
// //       </Sheet>

// //       {/* Main Content Spacing for Desktop Sidebar */}
// //       <div className={cn(
// //         "transition-all duration-300",
// //         "lg:ml-20",
// //         !isCollapsed && "lg:ml-72"
// //       )}>
// //         {/* Mobile top spacing */}
// //         <div className="h-24 lg:h-0" />
// //       </div>
// //     </>
// //   )
// // }



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

// Business metrics
// const businessStats = [
//   { label: "Annual Sales", value: "$240M+", icon: TrendingUp },
//   { label: "Happy Clients", value: "50K+", icon: Users },
//   { label: "Experience", value: "12+ Years", icon: Calendar },
// ];

export function AppSidebar() {
  const pathname = usePathname();
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      {/* Header with Logo */}
      <SidebarHeader>
        <div className={cn(
          "flex items-center gap-3 px-2 py-4",
          isCollapsed && "justify-center"
        )}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary">
            <span className="font-bold text-white text-lg">MZ</span>
          </div>
          <div className={cn(
            "flex flex-col overflow-hidden transition-all duration-200",
            isCollapsed && "hidden"
          )}>
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
                  <ChevronUp className={cn(
                    "ml-auto h-4 w-4",
                    isCollapsed && "hidden"
                  )} />
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