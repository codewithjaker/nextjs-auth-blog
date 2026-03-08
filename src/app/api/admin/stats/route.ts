import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import User from "@/models/User";
import Post from "@/models/Post";
import Comment from "@/models/Comment";
import Category from "@/models/Category";
import Reaction from "@/models/Reaction";
// import { requireAdmin } from '@/lib/auth';

export async function GET(request: NextRequest) {
  //   const auth = await requireAdmin(request);
  //   if (auth) return auth;

  try {
    await connectToDB();

    const [
      totalUsers,
      totalPosts,
      totalComments,
      totalCategories,
      totalReactions,
      postsByStatus,
      commentsByStatus,
      usersByVerified,
      postsByCategory, // optional extra
    ] = await Promise.all([
      User.countDocuments(),
      Post.countDocuments(),
      Comment.countDocuments(),
      Category.countDocuments(),
      Reaction.countDocuments(),
      Post.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      Comment.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      User.aggregate([
        { $group: { _id: "$isEmailVerified", count: { $sum: 1 } } },
      ]),
      Post.aggregate([
        { $group: { _id: "$category", count: { $sum: 1 } } },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "_id",
            as: "category",
          },
        },
        { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
        { $project: { categoryName: "$category.name", count: 1 } },
      ]),
    ]);

    return NextResponse.json({
      totalUsers,
      totalPosts,
      totalComments,
      totalCategories,
      totalReactions,
      postsByStatus,
      commentsByStatus,
      usersByVerified,
      postsByCategory,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 },
    );
  }
}
