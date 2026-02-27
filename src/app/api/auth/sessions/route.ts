// app/api/auth/sessions/route.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/lib/models/User";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDB();
    const user = await User.findById(token.id).select("refreshTokens");
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const sessions = user.refreshTokens.map((t: any) => ({
      id: t._id,
      device: t.device,
      createdAt: t.createdAt,
      expiresAt: t.expiresAt,
    }));

    return NextResponse.json({ sessions });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
