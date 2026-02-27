import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Comment from '@/models/Comment';
import Post from '@/models/Post';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const postId = searchParams.get('post'); // filter by post
    const status = searchParams.get('status');

    const query: any = {};
    if (postId && mongoose.Types.ObjectId.isValid(postId)) query.post = postId;
    if (status) query.status = status;

    const comments = await Comment.find(query)
      .populate('user', 'name email')
      .populate('post', 'title slug')
      .populate('parentComment')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Comment.countDocuments(query);

    return NextResponse.json({
      comments,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const body = await request.json();

    // Validate post exists
    if (!mongoose.Types.ObjectId.isValid(body.post)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }
    const post = await Post.findById(body.post);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // If parentComment is provided, validate and set depth
    if (body.parentComment) {
      if (!mongoose.Types.ObjectId.isValid(body.parentComment)) {
        return NextResponse.json({ error: 'Invalid parent comment ID' }, { status: 400 });
      }
      const parent = await Comment.findById(body.parentComment);
      if (!parent) {
        return NextResponse.json({ error: 'Parent comment not found' }, { status: 404 });
      }
      // Ensure parent belongs to same post
      if (parent.post.toString() !== body.post) {
        return NextResponse.json({ error: 'Parent comment does not belong to this post' }, { status: 400 });
      }
      body.depth = (parent.depth || 0) + 1;
    }

    const comment = await Comment.create(body);
    return NextResponse.json(comment, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}