import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Post from '@/models/Post';
import Category from '@/models/Category';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const status = searchParams.get('status'); // optional filter

    const query: any = {};
    if (status) query.status = status;

    const posts = await Post.find(query)
      .populate('author', 'name email')
      .populate('category', 'name slug')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Post.countDocuments(query);

    return NextResponse.json({
      posts,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const body = await request.json();

    // Auto-generate slug if not provided
    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    // Denormalize authorName
    if (body.author && mongoose.Types.ObjectId.isValid(body.author)) {
      const author = await User.findById(body.author).select('name');
      if (author) body.authorName = author.name;
    }

    // Denormalize categoryName
    if (body.category && mongoose.Types.ObjectId.isValid(body.category)) {
      const category = await Category.findById(body.category).select('name');
      if (category) body.categoryName = category.name;
    }

    const post = await Post.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug must be unique' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}