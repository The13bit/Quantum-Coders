// src/app/api/projects/route.js

import { NextResponse } from "next/server";
import db from "@/utils/db";
import Project from "@/app/models/projectscheme";
import { getToken } from "next-auth/jwt";

// Get all projects
// src/app/api/projects/route.js

export async function GET(request) {
  try {
    await db();
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page')) || 1;
    const limit = parseInt(url.searchParams.get('limit')) || 6;
    const skip = (page - 1) * limit;
    
    const projects = await Project.find()
      .populate("creator", "name email avatar")
      .populate("collaborators", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create new project
export async function POST(request) {
  try {
    const session = await getToken({ req: request, secret: process.env.JWT_SECRET });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await db();

    const project = await Project.create({
      creator: session.user.id,
      ...body
    });

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}