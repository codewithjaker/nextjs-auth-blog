# Authentication Setup Guide

## Overview
Your NextJS authentication system is now configured with NextAuth.js and automatic redirect to signin on first load.

## What Was Fixed

### 1. **AuthProvider Setup**
   - Created `src/providers/AuthProvider.tsx` that wraps the NextAuth `SessionProvider`
   - Updated root layout to import from the correct provider location
   - Updated admin layout to use the new AuthProvider

### 2. **Middleware Protection**
   - Created `middleware.ts` at project root
   - Protects all routes under `/admin/*` with authentication
   - Automatically redirects unauthenticated users to `/auth/signin`

### 3. **Environment Configuration**
   - `NEXTAUTH_SECRET`: Already configured ✅
   - `NEXTAUTH_URL`: Already configured ✅
   - `MONGODB_URI`: Already configured ✅

## Authentication Flow

### Initial Load (Unauthenticated User)
1. User visits the application (e.g., `http://localhost:3000`)
2. Frontend is public, but trying to access `/admin/*` routes triggers middleware
3. Middleware checks for valid session/token
4. User is redirected to `/auth/signin`

### Sign In Process
1. User navigates to `/auth/signin` 
2. Enters email and password
3. `signIn()` from next-auth/react sends credentials to `/api/auth/[...nextauth]/route`
4. NextAuth validates credentials against MongoDB User model
5. JWT token is created and stored in browser cookies
6. User is redirected to callback URL (default: `/dashboard`)

### Post-Login Access
1. User now has valid session/token
2. Can access protected routes under `/admin`
3. Session persists across page refreshes (stored in JWT cookies)

## File Structure
```
src/
├── providers/
│   └── AuthProvider.tsx (NEW) - SessionProvider wrapper
├── app/
│   ├── layout.tsx (UPDATED) - Uses @/providers/AuthProvider
│   ├── (admin)/
│   │   ├── layout.tsx (UPDATED) - Uses @/providers/AuthProvider
│   │   ├── auth/
│   │   │   ├── signin/page.tsx
│   │   │   └── signup/page.tsx
│   │   └── ...admin routes
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/route.ts (NextAuth config)
│   └── frontend/ (Public routes)
└── ...
middleware.ts (NEW) - Protects /admin/* routes
```

## Running the Application

```bash
npm install  # Install dependencies if needed
npm run dev  # Start development server
```

Visit `http://localhost:3000`:
- Public pages: Accessible directly
- Admin pages (`/admin`): Redirects to `/auth/signin` if not authenticated
- Sign in: Email/password authentication

## Database Models
- User model: Located in `src/models/User.ts`
- MongoDB: Connected via MONGODB_URI in .env.local

## Security Notes
- Tokens are stored in secure HTTP-only cookies
- JWT tokens expire after 15 minutes (configurable)
- Credentials are hashed with bcryptjs before storage
- Session strategy uses JWT (stateless)

## Troubleshooting

### Session Not Persisting
- Check NEXTAUTH_SECRET in .env.local
- Ensure NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

### Middleware Not Redirecting
- Verify middleware.ts is in project root
- Check that route matches the Matcher pattern: `/(admin)/:path*`
- Restart dev server after middleware changes

### Sign In Not Working
- Verify MongoDB connection (MONGODB_URI)
- Check User model fields match credentials
- Ensure bcryptjs password hashing is working
