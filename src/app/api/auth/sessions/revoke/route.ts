// app/api/auth/sessions/revoke/route.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import { hashRefreshToken } from "@/lib/utils/refreshToken";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { refreshToken } = await req.json(); // or sessionId
    await connectToDB();

    const hashed = hashRefreshToken(refreshToken);
    await User.updateOne(
      { _id: token.id },
      { $pull: { refreshTokens: { token: hashed } } },
    );

    return NextResponse.json({ message: "Session revoked" });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
