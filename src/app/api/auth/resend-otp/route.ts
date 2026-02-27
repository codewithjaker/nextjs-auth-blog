import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/lib/models/User";
import { generateOTP, sendOTPEmail } from "@/lib/utils/otp";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const { email, purpose } = await req.json();

    if (!["email-verification", "password-reset"].includes(purpose)) {
      return NextResponse.json({ error: "Invalid purpose" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If email is already verified and purpose is email-verification, prevent resend
    if (purpose === "email-verification" && user.isEmailVerified) {
      return NextResponse.json(
        { error: "Email already verified" },
        { status: 400 },
      );
    }

    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = {
      code: otp,
      expiresAt: otpExpiry,
      purpose,
    };
    await user.save();

    await sendOTPEmail(email, otp, purpose);

    return NextResponse.json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
