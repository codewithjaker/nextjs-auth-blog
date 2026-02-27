// import Link from "next/link";
// import { Building2, MapPin, Mail, Phone } from "lucide-react";

// export function Footer() {
//   return (
//     <footer className="border-t bg-muted/40">
//       <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
//           {/* Company Info */}
//           <div>
//             <div className="flex items-center gap-2">
//               <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
//                 <span className="font-bold text-white text-xs">MZ</span>
//               </div>
//               <span className="font-bold">Mustaqbal Zamzam</span>
//             </div>
//             <p className="mt-3 text-sm text-muted-foreground">
//               Leading electronics trading group in the UAE with 12+ years of
//               excellence and $240M+ annual sales.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-sm font-semibold">Quick Links</h3>
//             <ul className="mt-4 space-y-2 text-sm">
//               <li>
//                 <Link href="/about" className="text-muted-foreground hover:text-primary">
//                   About Founder
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/business-group" className="text-muted-foreground hover:text-primary">
//                   Business Group
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/contact" className="text-muted-foreground hover:text-primary">
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="text-sm font-semibold">Contact</h3>
//             <ul className="mt-4 space-y-2 text-sm">
//               <li className="flex items-center gap-2 text-muted-foreground">
//                 <MapPin className="h-4 w-4" />
//                 Dubai, UAE
//               </li>
//               <li className="flex items-center gap-2 text-muted-foreground">
//                 <Phone className="h-4 w-4" />
//                 +971 4 123 4567
//               </li>
//               <li className="flex items-center gap-2 text-muted-foreground">
//                 <Mail className="h-4 w-4" />
//                 info@mustaqbal-zamzam.com
//               </li>
//             </ul>
//           </div>

//           {/* Business Hours */}
//           <div>
//             <h3 className="text-sm font-semibold">Business Hours</h3>
//             <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
//               <li>Sun - Thu: 9:00 AM - 6:00 PM</li>
//               <li>Fri: 9:00 AM - 12:00 PM</li>
//               <li>Sat: Closed</li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
//           <p>© {new Date().getFullYear()} Mustaqbal Zamzam Group. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }
import Link from "next/link";
import { Building2, MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer>
      {/* Bottom bar */}
      <div className="mt-8 border-t py-2 text-center text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Mustaqbal Zamzam Group. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
