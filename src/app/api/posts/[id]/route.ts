import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Post from '@/models/Post';
import Category from '@/models/Category';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    const post = await Post.findById(id)
      .populate('author', 'name email')
      .populate('category', 'name slug');

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
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
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    // Re-denormalize if author or category changed
    if (body.author && mongoose.Types.ObjectId.isValid(body.author)) {
      const author = await User.findById(body.author).select('name');
      if (author) body.authorName = author.name;
    }
    if (body.category && mongoose.Types.ObjectId.isValid(body.category)) {
      const category = await Category.findById(body.category).select('name');
      if (category) body.categoryName = category.name;
    }

    const post = await Post.findByIdAndUpdate(id, body, { new: true, runValidators: true })
      .populate('author', 'name email')
      .populate('category', 'name slug');

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
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
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
    }

    // Optionally, you might want to soft-delete by setting status to 'deleted' instead.
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}