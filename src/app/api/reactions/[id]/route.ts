import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Reaction from '@/models/Reaction';
import Post from '@/models/Post';
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
      return NextResponse.json({ error: 'Invalid reaction ID' }, { status: 400 });
    }

    const reaction = await Reaction.findById(id).populate('user', 'name email');
    if (!reaction) {
      return NextResponse.json({ error: 'Reaction not found' }, { status: 404 });
    }
    return NextResponse.json(reaction);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reaction' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Changing a reaction is rare; could be handled via POST (toggle/update). We'll allow update but adjust counts accordingly.
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await connectToDB();
    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid reaction ID' }, { status: 400 });
    }

    const reaction = await Reaction.findById(id).session(session);
    if (!reaction) {
      return NextResponse.json({ error: 'Reaction not found' }, { status: 404 });
    }

    // If type is changing, adjust counts
    if (body.type && body.type !== reaction.type) {
      const oldType = reaction.type;
      const newType = body.type;

      if (reaction.targetType === 'post') {
        const inc: any = {};
        if (oldType === 'like') inc.likesCount = -1; else inc.dislikesCount = -1;
        if (newType === 'like') inc.likesCount = 1; else inc.dislikesCount = 1;
        await Post.findByIdAndUpdate(reaction.targetId, { $inc: inc }).session(session);
      } else {
        const inc: any = {};
        if (oldType === 'like') inc.likesCount = -1; else inc.dislikesCount = -1;
        if (newType === 'like') inc.likesCount = 1; else inc.dislikesCount = 1;
        await Comment.findByIdAndUpdate(reaction.targetId, { $inc: inc }).session(session);
      }
    }

    // Update other fields (though only type likely)
    Object.assign(reaction, body);
    await reaction.save({ session });

    await session.commitTransaction();
    return NextResponse.json(reaction);
  } catch (error: any) {
    await session.abortTransaction();
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    session.endSession();
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid reaction ID' }, { status: 400 });
    }

    const reaction = await Reaction.findById(id).session(session);
    if (!reaction) {
      return NextResponse.json({ error: 'Reaction not found' }, { status: 404 });
    }

    // Decrement count on target
    if (reaction.targetType === 'post') {
      if (reaction.type === 'like') await Post.findByIdAndUpdate(reaction.targetId, { $inc: { likesCount: -1 } }).session(session);
      else await Post.findByIdAndUpdate(reaction.targetId, { $inc: { dislikesCount: -1 } }).session(session);
    } else {
      if (reaction.type === 'like') await Comment.findByIdAndUpdate(reaction.targetId, { $inc: { likesCount: -1 } }).session(session);
      else await Comment.findByIdAndUpdate(reaction.targetId, { $inc: { dislikesCount: -1 } }).session(session);
    }

    await reaction.deleteOne({ session });
    await session.commitTransaction();
    return NextResponse.json({ message: 'Reaction removed' });
  } catch (error) {
    await session.abortTransaction();
    return NextResponse.json({ error: 'Failed to delete reaction' }, { status: 500 });
  } finally {
    session.endSession();
  }
}