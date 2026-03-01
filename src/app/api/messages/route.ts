import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Message from '@/models/Message';
import ChatRoom from '@/models/ChatRoom';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const chatRoom = searchParams.get('chatRoom');
    const sender = searchParams.get('sender');
    const currentUser = searchParams.get('currentUser'); // to filter out messages deleted for this user

    const query: any = {};
    if (chatRoom && mongoose.Types.ObjectId.isValid(chatRoom)) query.chatRoom = chatRoom;
    if (sender && mongoose.Types.ObjectId.isValid(sender)) query.sender = sender;
    if (currentUser && mongoose.Types.ObjectId.isValid(currentUser)) {
      // Exclude messages where currentUser is in deletedFor array
      query.deletedFor = { $ne: currentUser };
    }

    const messages = await Message.find(query)
      .populate('sender', 'name email')
      .populate('isReadBy', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Message.countDocuments(query);

    return NextResponse.json({
      messages,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const body = await request.json();

    // Validate chatRoom exists
    if (!mongoose.Types.ObjectId.isValid(body.chatRoom)) {
      return NextResponse.json({ error: 'Invalid chat room ID' }, { status: 400 });
    }
    const chatRoom = await ChatRoom.findById(body.chatRoom);
    if (!chatRoom) {
      return NextResponse.json({ error: 'Chat room not found' }, { status: 404 });
    }

    // Validate sender exists and is a participant
    if (!mongoose.Types.ObjectId.isValid(body.sender)) {
      return NextResponse.json({ error: 'Invalid sender ID' }, { status: 400 });
    }
    const sender = await User.findById(body.sender);
    if (!sender) {
      return NextResponse.json({ error: 'Sender not found' }, { status: 404 });
    }
    if (!chatRoom.participants.includes(body.sender)) {
      return NextResponse.json({ error: 'Sender is not a participant of this chat room' }, { status: 400 });
    }

    const message = await Message.create(body);

    // Update chat room's last message and timestamp
    await ChatRoom.findByIdAndUpdate(body.chatRoom, {
      lastMessage: body.content,
      lastMessageAt: new Date()
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}