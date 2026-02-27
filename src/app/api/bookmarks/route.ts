import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Bookmark from '@/models/Bookmark';
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
    const user = searchParams.get('user');
    const post = searchParams.get('post');

    const query: any = {};
    if (user && mongoose.Types.ObjectId.isValid(user)) query.user = user;
    if (post && mongoose.Types.ObjectId.isValid(post)) query.post = post;

    const bookmarks = await Bookmark.find(query)
      .populate('user', 'name email')
      .populate('post', 'title slug')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Bookmark.countDocuments(query);

    return NextResponse.json({
      bookmarks,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const body = await request.json();

    // Validate user and post exist
    if (!mongoose.Types.ObjectId.isValid(body.user) || !mongoose.Types.ObjectId.isValid(body.post)) {
      return NextResponse.json({ error: 'Invalid ID(s)' }, { status: 400 });
    }
    const [user, post] = await Promise.all([
      User.findById(body.user),
      Post.findById(body.post)
    ]);
    if (!user || !post) {
      return NextResponse.json({ error: 'User or Post not found' }, { status: 404 });
    }

    const bookmark = await Bookmark.create(body);
    return NextResponse.json(bookmark, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Bookmark already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}