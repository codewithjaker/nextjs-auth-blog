import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
import { connectToDB } from "@/lib/db";
import Setting from '@/models/Setting';

export async function GET() {
  try {
    await connectToDB();
    let settings = await Setting.findOne();
    if (!settings) {
      // Optionally create default settings
      settings = await Setting.create({});
    }
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connectToDB();
    const body = await request.json();

    let settings = await Setting.findOne();
    if (settings) {
      // Update existing
      settings.set(body);
      await settings.save();
    } else {
      // Create first document
      settings = await Setting.create(body);
    }
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}