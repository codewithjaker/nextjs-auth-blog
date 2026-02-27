import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Follow from '@/models/Follow';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const follower = searchParams.get('follower');
    const following = searchParams.get('following');

    const query: any = {};
    if (follower && mongoose.Types.ObjectId.isValid(follower)) query.follower = follower;
    if (following && mongoose.Types.ObjectId.isValid(following)) query.following = following;

    const follows = await Follow.find(query)
      .populate('follower', 'name email')
      .populate('following', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Follow.countDocuments(query);

    return NextResponse.json({
      follows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch follows' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const body = await request.json();

    // Validate users exist
    if (!mongoose.Types.ObjectId.isValid(body.follower) || !mongoose.Types.ObjectId.isValid(body.following)) {
      return NextResponse.json({ error: 'Invalid user ID(s)' }, { status: 400 });
    }
    const [follower, following] = await Promise.all([
      User.findById(body.follower),
      User.findById(body.following)
    ]);
    if (!follower || !following) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (body.follower === body.following) {
      return NextResponse.json({ error: 'Cannot follow yourself' }, { status: 400 });
    }

    const follow = await Follow.create(body);
    return NextResponse.json(follow, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Already following this user' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}