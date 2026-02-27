import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
import { connectToDB } from "@/lib/db";
import FAQ from '@/models/FAQ';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid FAQ ID' }, { status: 400 });
    }

    const faq = await FAQ.findById(id);
    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }
    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FAQ' }, { status: 500 });
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
      return NextResponse.json({ error: 'Invalid FAQ ID' }, { status: 400 });
    }

    const faq = await FAQ.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }
    return NextResponse.json(faq);
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
      return NextResponse.json({ error: 'Invalid FAQ ID' }, { status: 400 });
    }

    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete FAQ' }, { status: 500 });
  }
}