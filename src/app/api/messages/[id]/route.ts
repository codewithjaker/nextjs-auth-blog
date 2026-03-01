import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import Message from '@/models/Message';
import ChatRoom from '@/models/ChatRoom';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid message ID' }, { status: 400 });
    }

    const message = await Message.findById(id)
      .populate('sender', 'name email')
      .populate('isReadBy', 'name email');

    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    return NextResponse.json(message);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch message' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid message ID' }, { status: 400 });
    }

    // Note: Editing message content is usually not allowed in chat; but we allow for completeness.
    // If content changes, you might want to log an "edited" flag; we'll just update.
    const message = await Message.findByIdAndUpdate(id, body, { new: true, runValidators: true })
      .populate('sender', 'name email')
      .populate('isReadBy', 'name email');

    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    // If this message is the last message in the room, update chat room's lastMessage
    const chatRoom = await ChatRoom.findById(message.chatRoom);
    if (chatRoom && chatRoom.lastMessage === message.content) {
      // Actually, you might want to update lastMessage only if this message is the most recent
      const latestMessage = await Message.findOne({ chatRoom: message.chatRoom })
        .sort({ createdAt: -1 });
      if (latestMessage && latestMessage._id.toString() === id) {
        await ChatRoom.findByIdAndUpdate(message.chatRoom, { lastMessage: message.content });
      }
    }

    return NextResponse.json(message);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid message ID' }, { status: 400 });
    }

    // For real messaging, you'd typically soft-delete for the current user only.
    // Here we implement a hard delete for simplicity. If you want soft delete,
    // use a PATCH endpoint to add current user to `deletedFor`.
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }

    // If this was the last message in the room, update chat room's lastMessage
    const latestMessage = await Message.findOne({ chatRoom: message.chatRoom })
      .sort({ createdAt: -1 });
    await ChatRoom.findByIdAndUpdate(message.chatRoom, {
      lastMessage: latestMessage ? latestMessage.content : null,
      lastMessageAt: latestMessage ? latestMessage.createdAt : null
    });

    return NextResponse.json({ message: 'Message deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}