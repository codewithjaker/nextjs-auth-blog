import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Reaction from '@/models/Reaction';
import Post from '@/models/Post';
import Comment from '@/models/Comment';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const targetType = searchParams.get('targetType');
    const targetId = searchParams.get('targetId');
    const user = searchParams.get('user');

    const query: any = {};
    if (targetType) query.targetType = targetType;
    if (targetId && mongoose.Types.ObjectId.isValid(targetId)) query.targetId = targetId;
    if (user && mongoose.Types.ObjectId.isValid(user)) query.user = user;

    const reactions = await Reaction.find(query)
      .populate('user', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Reaction.countDocuments(query);

    return NextResponse.json({
      reactions,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reactions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await connectToDB();
    const body = await request.json();

    // Validate target exists
    if (!mongoose.Types.ObjectId.isValid(body.targetId) || !mongoose.Types.ObjectId.isValid(body.user)) {
      return NextResponse.json({ error: 'Invalid ID(s)' }, { status: 400 });
    }

    let target;
    if (body.targetType === 'post') {
      target = await Post.findById(body.targetId).session(session);
    } else if (body.targetType === 'comment') {
      target = await Comment.findById(body.targetId).session(session);
    } else {
      return NextResponse.json({ error: 'Invalid targetType' }, { status: 400 });
    }

    if (!target) {
      return NextResponse.json({ error: `${body.targetType} not found` }, { status: 404 });
    }

    // Check if user already reacted (should be caught by unique index, but we'll handle gracefully)
    const existing = await Reaction.findOne({
      user: body.user,
      targetType: body.targetType,
      targetId: body.targetId
    }).session(session);

    if (existing) {
      // If same type, maybe remove (toggle) or error. We'll implement toggle: if same type, delete; if different, update.
      if (existing.type === body.type) {
        // Remove reaction (toggle off)
        await existing.deleteOne({ session });
        // Decrement count
        if (body.targetType === 'post') {
          if (body.type === 'like') await Post.findByIdAndUpdate(body.targetId, { $inc: { likesCount: -1 } }).session(session);
          else await Post.findByIdAndUpdate(body.targetId, { $inc: { dislikesCount: -1 } }).session(session);
        } else {
          if (body.type === 'like') await Comment.findByIdAndUpdate(body.targetId, { $inc: { likesCount: -1 } }).session(session);
          else await Comment.findByIdAndUpdate(body.targetId, { $inc: { dislikesCount: -1 } }).session(session);
        }
        await session.commitTransaction();
        return NextResponse.json({ message: 'Reaction removed' });
      } else {
        // Change reaction type: update existing
        const oldType = existing.type;
        existing.type = body.type;
        await existing.save({ session });
        // Adjust counts
        if (body.targetType === 'post') {
          const inc: any = {};
          if (oldType === 'like') inc.likesCount = -1; else inc.dislikesCount = -1;
          if (body.type === 'like') inc.likesCount = 1; else inc.dislikesCount = 1;
          await Post.findByIdAndUpdate(body.targetId, { $inc: inc }).session(session);
        } else {
          const inc: any = {};
          if (oldType === 'like') inc.likesCount = -1; else inc.dislikesCount = -1;
          if (body.type === 'like') inc.likesCount = 1; else inc.dislikesCount = 1;
          await Comment.findByIdAndUpdate(body.targetId, { $inc: inc }).session(session);
        }
        await session.commitTransaction();
        return NextResponse.json(existing);
      }
    }

    // Create new reaction
    const reaction = await Reaction.create([body], { session });
    // Increment count
    if (body.targetType === 'post') {
      if (body.type === 'like') await Post.findByIdAndUpdate(body.targetId, { $inc: { likesCount: 1 } }).session(session);
      else await Post.findByIdAndUpdate(body.targetId, { $inc: { dislikesCount: 1 } }).session(session);
    } else {
      if (body.type === 'like') await Comment.findByIdAndUpdate(body.targetId, { $inc: { likesCount: 1 } }).session(session);
      else await Comment.findByIdAndUpdate(body.targetId, { $inc: { dislikesCount: 1 } }).session(session);
    }

    await session.commitTransaction();
    return NextResponse.json(reaction[0], { status: 201 });
  } catch (error: any) {
    await session.abortTransaction();
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Reaction already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  } finally {
    session.endSession();
  }
}