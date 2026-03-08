import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
import { connectToDB } from "@/lib/db";
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password -refreshTokens')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    return NextResponse.json({
      users,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const body = await request.json();

    // Hash password
    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const user = await User.create(body);
    // Remove sensitive fields from response
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshTokens;

    return NextResponse.json(userObj, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}