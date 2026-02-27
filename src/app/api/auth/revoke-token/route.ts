import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/lib/models/User";
import { hashRefreshToken } from "@/lib/utils/refreshToken";

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { refreshToken } = await req.json();
    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token required" },
        { status: 400 },
      );
    }

    await connectToDB();

    const hashed = hashRefreshToken(refreshToken);
    const result = await User.updateOne(
      { _id: token.id },
      { $pull: { refreshTokens: { token: hashed } } },
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { error: "Token not found or already revoked" },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: "Token revoked successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
