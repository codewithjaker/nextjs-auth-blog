import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { email, otp } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (
      !user.otp ||
      user.otp.code !== otp ||
      user.otp.purpose !== "email-verification"
    ) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    if (user.otp.expiresAt < new Date()) {
      return NextResponse.json({ error: "OTP expired" }, { status: 400 });
    }

    // Mark email as verified and clear OTP
    user.isEmailVerified = true;
    user.otp = undefined;
    await user.save();

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
