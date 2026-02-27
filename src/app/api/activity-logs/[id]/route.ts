import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
import { connectToDB } from "@/lib/db";
import ActivityLog from '@/models/ActivityLog';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid log ID' }, { status: 400 });
    }

    const log = await ActivityLog.findById(id).populate('user', 'name email');
    if (!log) {
      return NextResponse.json({ error: 'Activity log not found' }, { status: 404 });
    }
    return NextResponse.json(log);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch activity log' }, { status: 500 });
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
      return NextResponse.json({ error: 'Invalid log ID' }, { status: 400 });
    }

    const log = await ActivityLog.findByIdAndUpdate(id, body, { new: true, runValidators: true })
      .populate('user', 'name email');

    if (!log) {
      return NextResponse.json({ error: 'Activity log not found' }, { status: 404 });
    }
    return NextResponse.json(log);
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
      return NextResponse.json({ error: 'Invalid log ID' }, { status: 400 });
    }

    const log = await ActivityLog.findByIdAndDelete(id);
    if (!log) {
      return NextResponse.json({ error: 'Activity log not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Activity log deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete activity log' }, { status: 500 });
  }
}