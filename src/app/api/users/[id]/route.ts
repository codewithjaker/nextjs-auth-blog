import { NextRequest, NextResponse } from "next/server";
// import dbConnect from '@/lib/mongodb';
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await User.findById(id).select("-password -refreshTokens");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();
    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    // If updating password, hash it
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const user = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).select("-password -refreshTokens");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }
}
