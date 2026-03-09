import { connectToDB } from "@/lib/db";
import Notification from "@/models/Notification";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // ... auth, dbConnect
  await connectToDB();
  
  const unreadCount = await Notification.countDocuments({ isRead: false });
  return NextResponse.json({ unreadCount });
}
