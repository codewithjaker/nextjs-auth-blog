import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
import { connectToDB } from "@/lib/db";
import ActivityLog from '@/models/ActivityLog';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const logs = await ActivityLog.find()
      .populate('user', 'name email')
      .skip(skip)
      .limit(limit)
      .sort({ timestamp: -1 });

    const total = await ActivityLog.countDocuments();

    return NextResponse.json({
      logs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch activity logs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const body = await request.json();
    const log = await ActivityLog.create(body);
    return NextResponse.json(log, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}