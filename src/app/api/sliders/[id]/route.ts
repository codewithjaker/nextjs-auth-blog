import { NextRequest, NextResponse } from "next/server";
// import dbConnect from '@/lib/mongodb';
import { connectToDB } from "@/lib/db";
import Slider from "@/models/Slider";
import mongoose from "mongoose";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid slider ID" }, { status: 400 });
    }

    const slider = await Slider.findById(id);
    if (!slider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }
    return NextResponse.json(slider);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch slider" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();
    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid slider ID" }, { status: 400 });
    }

    const slider = await Slider.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!slider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }
    return NextResponse.json(slider);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDB();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid slider ID" }, { status: 400 });
    }

    const slider = await Slider.findByIdAndDelete(id);
    if (!slider) {
      return NextResponse.json({ error: "Slider not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Slider deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete slider" },
      { status: 500 },
    );
  }
}
