import { NextResponse } from "next/server";
import db from "@/utils/db";
import User from "@/app/models/User";
import UserInfo from "@/app/models/UserInfo";
import { getToken } from "next-auth/jwt";

// Get user info
export async function GET(request) {
  try {
    const session = await getToken({ req: request, secret: process.env.JWT_SECRET });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db();
    const userInfo = await UserInfo.findOne({ user: session.user.id });
    
    if (!userInfo) {
      return NextResponse.json({ error: "User info not found" }, { status: 404 });
    }

    return NextResponse.json(userInfo);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update user info
export async function PUT(request) {
  try {
    const session = await getToken({ req: request, secret: process.env.JWT_SECRET });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await db();

    const userInfo = await UserInfo.findOneAndUpdate(
      { user: session.user.id },
      {
        phoneNumber: body.phone,
        dateOfBirth: body.dob,
        gender: body.gender,
        address: {
          street: body.street,
          city: body.city,
          state: body.state,
          country: body.country,
          pinCode: body.pinCode
        }
      },
      { new: true, upsert: true }
    );

    return NextResponse.json(userInfo);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}