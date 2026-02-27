// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/db";
import { generateOTP, sendOTPEmail } from "@/lib/utils/otp";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { email, password, name } = await req.json();

    const existing = await User.findOne({ email });
    if (existing)
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      otp: { code: otp, expiresAt: otpExpiry, purpose: "email-verification" },
    });

    await sendOTPEmail(email, otp, "email verification");

    return NextResponse.json({
      message: "User created. Please verify your email.",
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
