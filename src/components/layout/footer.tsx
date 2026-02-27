
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
