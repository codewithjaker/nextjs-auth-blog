// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import { generateOTP, sendOTPEmail } from "@/lib/utils/otp";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const otp = generateOTP();
    user.otp = {
      code: otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      purpose: "password-reset",
    };
    await user.save();

    await sendOTPEmail(email, otp, "password reset");
    return NextResponse.json({ message: "OTP sent" });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
