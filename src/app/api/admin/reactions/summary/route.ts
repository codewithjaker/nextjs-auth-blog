import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Reaction from "@/models/Reaction";

export async function GET(request: NextRequest) {
  // ... auth, dbConnect
  await connectToDB();

  const summary = await Reaction.aggregate([
    {
      $group: {
        _id: { targetType: "$targetType", type: "$type" },
        count: { $sum: 1 },
      },
    },
    {
      $group: {
        _id: "$_id.targetType",
        types: { $push: { type: "$_id.type", count: "$count" } },
      },
    },
  ]);

  return NextResponse.json(summary);
}
