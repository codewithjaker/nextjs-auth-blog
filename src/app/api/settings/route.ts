// import { NextRequest, NextResponse } from 'next/server';
// // import dbConnect from '@/lib/mongodb';
// import { connectToDB } from "@/lib/db";
// import Setting from '@/models/Setting';

// export async function GET() {
//   try {
//     await connectToDB();
//     let settings = await Setting.findOne();
//     if (!settings) {
//       // Optionally create default settings
//       settings = await Setting.create({});
//     }
//     return NextResponse.json(settings);
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     await connectToDB();
//     const body = await request.json();

//     let settings = await Setting.findOne();
//     if (settings) {
//       // Update existing
//       settings.set(body);
//       await settings.save();
//     } else {
//       // Create first document
//       settings = await Setting.create(body);
//     }
//     return NextResponse.json(settings);
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }

// export async function POST() {
//   return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
// }

import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import Setting from "@/models/Setting";

// =============================
// GET - Fetch Settings
// =============================
export async function GET() {
  try {
    await connectToDB();

    const settings = await Setting.findOne();

    return NextResponse.json(
      {
        success: true,
        data: settings,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// =============================
// POST - Create Settings
// =============================
export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    const body = await req.json();

    const existing = await Setting.findOne();
    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message: "Settings already exist",
        },
        { status: 400 }
      );
    }

    const newSetting = await Setting.create(body);

    return NextResponse.json(
      {
        success: true,
        data: newSetting,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// =============================
// PUT - Update Settings
// =============================
export async function PUT(req: NextRequest) {
  try {
    await connectToDB();

    const body = await req.json();

    const updated = await Setting.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          message: "Settings not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updated,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// =============================
// DELETE - Remove Settings
// =============================
export async function DELETE() {
  try {
    await connectToDB();

    const deleted = await Setting.findOneAndDelete();

    if (!deleted) {
      return NextResponse.json(
        {
          success: false,
          message: "Settings not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Settings deleted successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}