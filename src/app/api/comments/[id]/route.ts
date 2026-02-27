import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Comment from '@/models/Comment';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid comment ID' }, { status: 400 });
    }

    const comment = await Comment.findById(id)
      .populate('user', 'name email')
      .populate('post', 'title slug')
      .populate('parentComment');

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comment' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid comment ID' }, { status: 400 });
    }

    // Mark as edited if content changes
    if (body.content) {
      body.isEdited = true;
      body.editedAt = new Date();
    }

    const comment = await Comment.findByIdAndUpdate(id, body, { new: true, runValidators: true })
      .populate('user', 'name email')
      .populate('post', 'title slug')
      .populate('parentComment');

    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }
    return NextResponse.json(comment);
  } catch (error: any) {
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
      return NextResponse.json({ error: 'Invalid comment ID' }, { status: 400 });
    }

    // Optionally soft-delete by setting status to 'deleted'
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 });
  }
}