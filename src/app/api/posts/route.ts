import { NextRequest, NextResponse } from "next/server";
// import dbConnect from '@/lib/mongodb';
// import Post from "@/models/Post";
import { connectToDB } from "@/lib/db";
import Post from "@/models/Post";

export async function GET(request: NextRequest) {
  try {
    // await dbConnect();
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate("author", "name email")
      .populate("category", "name slug")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Post.countDocuments();

    return NextResponse.json({
      posts,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // await dbConnect();
    await connectToDB();
    const body = await request.json();

    // Auto-generate slug if not provided (example)
    if (!body.slug && body.title) {
      body.slug = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    }

    const post = await Post.create(body);
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Slug must be unique" },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
