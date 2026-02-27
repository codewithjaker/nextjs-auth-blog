// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/lib/models/User";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (token) {
      await connectToDB();
      // Optionally revoke all refresh tokens for this user or just current device
      // Here we revoke all (you can be more granular)
      await User.updateOne({ _id: token.id }, { $set: { refreshTokens: [] } });
    }

    cookies().delete("next-auth.session-token");
    return NextResponse.json({ message: "Logged out" });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
