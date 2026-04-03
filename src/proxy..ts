// // middleware.ts
// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//     pages: { signIn: "/login" },
//   },
// );

// export const config = {
//   matcher: ["/api/auth/me", "/api/auth/sessions/:path*"],
//   // protect dashboard pages
//   // matcher: ["/dashboard/:path*", "/admin/:path*"],
//   // protect everything except public routes
//   // matcher: ["/((?!login|register|api|_next|favicon.ico).*)"],
// };

import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // This middleware will only be executed if the user is authenticated
    // Non-authenticated users will be redirected to signin by NextAuth
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // User must be authenticated
    },
    pages: {
      signIn: "/auth/signin", // Redirect to signin if not authenticated
    },
  }
);

// Protect the admin routes with authentication
export const config = {
  matcher: ["/(admin)/:path*"], // Protect all routes under /admin
};