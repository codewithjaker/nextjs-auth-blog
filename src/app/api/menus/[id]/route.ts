import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
import { connectToDB } from "@/lib/db";
import Menu from '@/models/Menu';
import mongoose from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // await dbConnect();
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid menu ID' }, { status: 400 });
    }

    const menu = await Menu.findById(id).populate('parent', 'name url');
    if (!menu) {
      return NextResponse.json({ error: 'Menu not found' }, { status: 404 });
    }
    return NextResponse.json(menu);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // await dbConnect();
    await connectToDB();
    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid menu ID' }, { status: 400 });
    }

    const menu = await Menu.findByIdAndUpdate(id, body, { new: true, runValidators: true })
      .populate('parent', 'name url');

    if (!menu) {
      return NextResponse.json({ error: 'Menu not found' }, { status: 404 });
    }
    return NextResponse.json(menu);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // await dbConnect();
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid menu ID' }, { status: 400 });
    }

    const menu = await Menu.findByIdAndDelete(id);
    if (!menu) {
      return NextResponse.json({ error: 'Menu not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Menu deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete menu' }, { status: 500 });
  }
}