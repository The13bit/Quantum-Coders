// src/app/api/projects/route.js

import { NextResponse } from "next/server";
import db from "@/utils/db";
import Project from "@/app/models/projectscheme";
import { getToken } from "next-auth/jwt";

// Get all projects
export async function GET(request) {
  try {
    await db();
    const url = new URL(request.url);
    const query = url.searchParams.get('query') || {};
    const projects = await Project.find(query)
      .populate("creator", "name email")
      .populate("collaborators", "name email");
    
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