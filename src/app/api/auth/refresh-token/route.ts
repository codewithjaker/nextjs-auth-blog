// app/api/auth/refresh-token/route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/lib/models/User";
import { createAccessToken } from "@/lib/utils/token";
import {
  hashRefreshToken,
  getRefreshTokenExpiry,
  generateRefreshToken,
} from "@/lib/utils/refreshToken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { refreshToken } = await req.json();
    if (!refreshToken)
      return NextResponse.json(
        { error: "Refresh token required" },
        { status: 400 },
      );

    const hashed = hashRefreshToken(refreshToken);
    const user = await User.findOne({ "refreshTokens.token": hashed });
    if (!user)
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 },
      );

    const tokenDoc = user.refreshTokens.find((t) => t.token === hashed);
    if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
      // Remove expired token
      user.refreshTokens = user.refreshTokens.filter((t) => t.token !== hashed);
      await user.save();
      return NextResponse.json(
        { error: "Refresh token expired" },
        { status: 401 },
      );
    }

    // Optional: rotate refresh token
    const newRefreshToken = generateRefreshToken();
    const newHashed = hashRefreshToken(newRefreshToken);
    tokenDoc.token = newHashed;
    tokenDoc.expiresAt = getRefreshTokenExpiry();
    await user.save();

    // Issue new access token
    const accessToken = await createAccessToken({
      id: user._id.toString(),
      email: user.email,
    });
    cookies().set("next-auth.session-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
    });

    return NextResponse.json({ refreshToken: newRefreshToken });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
