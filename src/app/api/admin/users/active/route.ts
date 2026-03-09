import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  // ... auth, dbConnect

  await connectToDB();

  const activeUsers = await User.aggregate([
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "author",
        as: "posts",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "user",
        as: "comments",
      },
    },
    {
      $addFields: {
        postCount: { $size: "$posts" },
        commentCount: { $size: "$comments" },
        totalActivity: { $add: [{ $size: "$posts" }, { $size: "$comments" }] },
      },
    },
    { $sort: { totalActivity: -1 } },
    { $limit: 10 },
    {
      $project: {
        name: 1,
        email: 1,
        postCount: 1,
        commentCount: 1,
        totalActivity: 1,
      },
    },
  ]);

  return NextResponse.json(activeUsers);
}
