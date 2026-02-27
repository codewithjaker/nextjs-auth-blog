// app/not-found.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
      {/* Error Number */}
      <div className="relative mb-8">
        <div className="text-9xl font-bold text-primary/10">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
            <p className="text-muted-foreground">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <Link href="/" className="flex-1">
          <Button className="w-full bg-primary hover:bg-primary/90">
            <Home className="h-4 w-4 mr-2" />
            Homepage
          </Button>
        </Link>

        <Button
          variant="outline"
          className="flex-1"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>

      {/* Additional Info */}
      <div className="mt-12 max-w-md">
        <p className="text-sm text-muted-foreground">
          If you believe this is an error, please{" "}
          <Link
            href="/contact"
            className="text-primary hover:underline font-medium"
          >
            contact our team
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
