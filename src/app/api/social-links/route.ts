import { NextRequest, NextResponse } from 'next/server';
// import dbConnect from '@/lib/mongodb';
import { connectToDB } from "@/lib/db";
import SocialLink from '@/models/SocialLink';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const socialLinks = await SocialLink.find()
      .skip(skip)
      .limit(limit)
      .sort({ order: 1, createdAt: -1 });

    const total = await SocialLink.countDocuments();

    return NextResponse.json({
      socialLinks,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch social links' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const body = await request.json();
    const socialLink = await SocialLink.create(body);
    return NextResponse.json(socialLink, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}