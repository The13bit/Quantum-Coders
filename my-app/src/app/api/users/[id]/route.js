//return user name by id
import { NextResponse } from "next/server";
import db from "@/utils/db";
import User from "@/app/models/User";
export async function GET(request, { params }) {
  try {
    await db();
    const { id } = await params;
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({name:user.name});
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
