import { NextResponse } from "next/server";
import Project from "@/app/models/projectscheme";
import db from "@/utils/db";

import { getToken } from "next-auth/jwt";
export async function GET(request) {
  try {
    await db();
    // TODO: Replace with actual user ID from session
    const session = await getToken({ req: request, secret: process.env.JWT_SECRET });
        if (!session?.user?.id) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
    const projects = await Project.find({ creator: session.user.id });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

