import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Notification from '@/models/Notification';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const recipient = searchParams.get('recipient');
    const isRead = searchParams.get('isRead'); // 'true' or 'false'

    const query: any = {};
    if (recipient && mongoose.Types.ObjectId.isValid(recipient)) query.recipient = recipient;
    if (isRead !== null) query.isRead = isRead === 'true';

    const notifications = await Notification.find(query)
      .populate('recipient', 'name email')
      .populate('sender', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Notification.countDocuments(query);

    return NextResponse.json({
      notifications,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const body = await request.json();

    // Validate recipient exists
    if (!mongoose.Types.ObjectId.isValid(body.recipient)) {
      return NextResponse.json({ error: 'Invalid recipient ID' }, { status: 400 });
    }
    const recipient = await User.findById(body.recipient);
    if (!recipient) {
      return NextResponse.json({ error: 'Recipient not found' }, { status: 404 });
    }

    // If sender provided, validate
    if (body.sender && !mongoose.Types.ObjectId.isValid(body.sender)) {
      return NextResponse.json({ error: 'Invalid sender ID' }, { status: 400 });
    }

    const notification = await Notification.create(body);
    return NextResponse.json(notification, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}