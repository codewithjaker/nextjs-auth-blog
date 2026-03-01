import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
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
    const participant = searchParams.get('participant'); // filter by user ID

    const query: any = {};
    if (participant && mongoose.Types.ObjectId.isValid(participant)) {
      query.participants = participant;
    }

    const chatRooms = await ChatRoom.find(query)
      .populate('participants', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ lastMessageAt: -1, createdAt: -1 });

    const total = await ChatRoom.countDocuments(query);

    return NextResponse.json({
      chatRooms,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch chat rooms' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const body = await request.json();

    // Validate participants exist
    if (!body.participants || !Array.isArray(body.participants) || body.participants.length < 2) {
      return NextResponse.json({ error: 'At least two participants required' }, { status: 400 });
    }

    // Ensure all participant IDs are valid
    const invalidIds = body.participants.filter((id: string) => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return NextResponse.json({ error: 'Invalid participant ID(s)' }, { status: 400 });
    }

    // Check if users exist
    const users = await User.find({ _id: { $in: body.participants } });
    if (users.length !== body.participants.length) {
      return NextResponse.json({ error: 'One or more participants not found' }, { status: 404 });
    }

    // For one-to-one chats, ensure uniqueness
    if (!body.isGroup) {
      // Sort participants to guarantee consistent ordering for uniqueness check
      const sortedParticipants = body.participants.sort();
      const existing = await ChatRoom.findOne({
        participants: { $all: sortedParticipants, $size: 2 },
        isGroup: false
      });
      if (existing) {
        return NextResponse.json({ error: 'Chat room already exists' }, { status: 400 });
      }
      body.participants = sortedParticipants;
    }

    const chatRoom = await ChatRoom.create(body);
    return NextResponse.json(chatRoom, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Chat room already exists (duplicate participants)' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}