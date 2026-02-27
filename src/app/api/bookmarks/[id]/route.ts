import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Bookmark from '@/models/Bookmark';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid bookmark ID' }, { status: 400 });
    }

    const bookmark = await Bookmark.findById(id)
      .populate('user', 'name email')
      .populate('post', 'title slug');

    if (!bookmark) {
      return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
    }
    return NextResponse.json(bookmark);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookmark' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Usually bookmarks are not updated; if needed, we allow changing post/user with unique check.
  try {
    await connectToDB();
    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid bookmark ID' }, { status: 400 });
    }

    const bookmark = await Bookmark.findByIdAndUpdate(id, body, { new: true, runValidators: true })
      .populate('user', 'name email')
      .populate('post', 'title slug');

    if (!bookmark) {
      return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
    }
    return NextResponse.json(bookmark);
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Duplicate bookmark' }, { status: 400 });
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
      return NextResponse.json({ error: 'Invalid bookmark ID' }, { status: 400 });
    }

    const bookmark = await Bookmark.findByIdAndDelete(id);
    if (!bookmark) {
      return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Bookmark removed' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete bookmark' }, { status: 500 });
  }
}