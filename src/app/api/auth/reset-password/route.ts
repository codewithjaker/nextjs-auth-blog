// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import { decode } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { resetToken, newPassword } = await req.json();

    const payload = await decode({
      token: resetToken,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    if (!payload || payload.purpose !== "reset-password") {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 },
      );
    }

    const user = await User.findById(payload.id);
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    // Revoke all refresh tokens after password reset
    user.refreshTokens = [];
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
