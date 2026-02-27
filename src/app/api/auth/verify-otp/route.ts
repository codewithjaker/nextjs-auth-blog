// app/api/auth/verify-otp/route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/lib/models/User";
import { encode } from "next-auth/jwt";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { email, otp, purpose } = await req.json();

    const user = await User.findOne({ email });
    if (
      !user ||
      !user.otp ||
      user.otp.code !== otp ||
      user.otp.purpose !== purpose
    ) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (user.otp.expiresAt < new Date()) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    // Clear OTP after successful verification
    user.otp = undefined;
    await user.save();

    if (purpose === "email-verification") {
      user.isEmailVerified = true;
      await user.save();
      return NextResponse.json({ message: "Email verified" });
    }

    if (purpose === "password-reset") {
      // Issue a short-lived JWT for password reset
      const resetToken = await encode({
        token: { id: user._id.toString(), purpose: "reset-password" },
        secret: process.env.NEXTAUTH_SECRET!,
        maxAge: 10 * 60, // 10 minutes
      });
      return NextResponse.json({ resetToken });
    }

    return NextResponse.json({ error: "Invalid purpose" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
