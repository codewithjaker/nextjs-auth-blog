// app/api/auth/change-password/route.ts
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDB } from "@/lib/db";
import User from "@/lib/models/User";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await connectToDB();
    const { currentPassword, newPassword } = await req.json();

    const user = await User.findById(token.id).select("+password");
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid)
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 },
      );

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    // Optional: revoke all other refresh tokens
    user.refreshTokens = [];
    await user.save();

    return NextResponse.json({ message: "Password changed" });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
