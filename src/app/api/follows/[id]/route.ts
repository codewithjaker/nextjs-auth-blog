import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Follow from '@/models/Follow';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid follow ID' }, { status: 400 });
    }

    const follow = await Follow.findById(id)
      .populate('follower', 'name email')
      .populate('following', 'name email');

    if (!follow) {
      return NextResponse.json({ error: 'Follow not found' }, { status: 404 });
    }
    return NextResponse.json(follow);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch follow' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Follow relationships are usually immutable; updating would mean unfollow then refollow.
  // For completeness, we allow update but check unique constraint.
  try {
    await connectToDB();
    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid follow ID' }, { status: 400 });
    }

    const follow = await Follow.findByIdAndUpdate(id, body, { new: true, runValidators: true })
      .populate('follower', 'name email')
      .populate('following', 'name email');

    if (!follow) {
      return NextResponse.json({ error: 'Follow not found' }, { status: 404 });
    }
    return NextResponse.json(follow);
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Duplicate follow relationship' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid follow ID' }, { status: 400 });
    }

    const follow = await Follow.findByIdAndDelete(id);
    if (!follow) {
      return NextResponse.json({ error: 'Follow not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Unfollowed successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete follow' }, { status: 500 });
  }
}