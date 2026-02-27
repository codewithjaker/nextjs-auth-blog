// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/db";
import User from "@/lib/models/User";
import { createAccessToken } from "@/lib/utils/token";
import {
  generateRefreshToken,
  hashRefreshToken,
  getRefreshTokenExpiry,
} from "@/lib/utils/refreshToken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { email, password, device } = await req.json();

    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );

    // Generate refresh token
    const refreshToken = generateRefreshToken();
    const hashedRefresh = hashRefreshToken(refreshToken);
    user.refreshTokens.push({
      token: hashedRefresh,
      device: device || "unknown",
      expiresAt: getRefreshTokenExpiry(),
    });
    await user.save();

    // Create access token (NextAuth JWT)
    const accessToken = await createAccessToken({
      id: user._id.toString(),
      email: user.email,
    });

    // Set httpOnly cookie
    cookies().set("next-auth.session-token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15 minutes
    });

    return NextResponse.json({
      message: "Login successful",
      refreshToken, // client must store this securely (e.g., in memory, not localStorage)
      user: { id: user._id, email: user.email, name: user.name },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
