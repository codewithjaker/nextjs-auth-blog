import { connectToDB } from "@/lib/db";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // ... auth, dbConnect
  await connectToDB();
  
  const popularPosts = await Post.aggregate([
    { $match: { status: "published" } },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "post",
        as: "comments",
      },
    },
    {
      $addFields: {
        commentCount: { $size: "$comments" },
        // likesCount is already a field
      },
    },
    { $sort: { views: -1, likesCount: -1, commentCount: -1 } },
    { $limit: 10 },
    {
      $project: {
        title: 1,
        slug: 1,
        views: 1,
        likesCount: 1,
        commentCount: 1,
        authorName: 1,
      },
    },
  ]);

  return NextResponse.json(popularPosts);
}
