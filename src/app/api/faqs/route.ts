import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from "@/lib/db";
import FAQ from '@/models/FAQ';

export async function GET(request: NextRequest) {
  try {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const faqs = await FAQ.find()
      .skip(skip)
      .limit(limit)
      .sort({ order: 1, createdAt: -1 });

    const total = await FAQ.countDocuments();

    return NextResponse.json({
      faqs,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();
    const body = await request.json();
    const faq = await FAQ.create(body);
    return NextResponse.json(faq, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}