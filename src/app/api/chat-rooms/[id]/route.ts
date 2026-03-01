import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
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
      return NextResponse.json({ error: 'Invalid chat room ID' }, { status: 400 });
    }

    const chatRoom = await ChatRoom.findById(id).populate('participants', 'name email');
    if (!chatRoom) {
      return NextResponse.json({ error: 'Chat room not found' }, { status: 404 });
    }
    return NextResponse.json(chatRoom);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch chat room' }, { status: 500 });
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
      return NextResponse.json({ error: 'Invalid chat room ID' }, { status: 400 });
    }

    // For group chats, you may allow adding/removing participants; but we'll keep it simple
    // If participants change, uniqueness for one-to-one must be rechecked
    if (body.participants && !body.isGroup) {
      const sortedParticipants = body.participants.sort();
      const existing = await ChatRoom.findOne({
        _id: { $ne: id },
        participants: { $all: sortedParticipants, $size: 2 },
        isGroup: false
      });
      if (existing) {
        return NextResponse.json({ error: 'Another chat room with same participants already exists' }, { status: 400 });
      }
      body.participants = sortedParticipants;
    }

    const chatRoom = await ChatRoom.findByIdAndUpdate(id, body, { new: true, runValidators: true })
      .populate('participants', 'name email');

    if (!chatRoom) {
      return NextResponse.json({ error: 'Chat room not found' }, { status: 404 });
    }
    return NextResponse.json(chatRoom);
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Duplicate chat room' }, { status: 400 });
    }
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
      return NextResponse.json({ error: 'Invalid chat room ID' }, { status: 400 });
    }

    // Optionally, also delete all messages in this room
    await mongoose.model('Message').deleteMany({ chatRoom: id });

    const chatRoom = await ChatRoom.findByIdAndDelete(id);
    if (!chatRoom) {
      return NextResponse.json({ error: 'Chat room not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Chat room deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete chat room' }, { status: 500 });
  }
}