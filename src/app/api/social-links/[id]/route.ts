import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
import { connectToDB } from "@/lib/db";
import SocialLink from '@/models/SocialLink';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid social link ID' }, { status: 400 });
    }

    const socialLink = await SocialLink.findById(id);
    if (!socialLink) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }
    return NextResponse.json(socialLink);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch social link' }, { status: 500 });
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
      return NextResponse.json({ error: 'Invalid social link ID' }, { status: 400 });
    }

    const socialLink = await SocialLink.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!socialLink) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }
    return NextResponse.json(socialLink);
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
      return NextResponse.json({ error: 'Invalid social link ID' }, { status: 400 });
    }

    const socialLink = await SocialLink.findByIdAndDelete(id);
    if (!socialLink) {
      return NextResponse.json({ error: 'Social link not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Social link deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete social link' }, { status: 500 });
  }
}