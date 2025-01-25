// src/app/api/projects/[id]/route.js

import { NextResponse } from "next/server";
import db from "@/utils/db";
import Project from "@/app/models/projectscheme";
import { getToken } from "next-auth/jwt";

// Get specific project
export async function GET(request, { params }) {
  try {
    await db();
    const { id } = await params
    const project = await Project.findById(id)
      .populate("creator", "name email")
      .populate("collaborators", "name email");

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update project
export async function PUT(request, { params }) {
  try {
    const session = await getToken({ req: request, secret: process.env.JWT_SECRET });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await db();
    const { id } = await params
    const project = await Project.findOneAndUpdate(
      { _id: id, creator: session.user.id },
      body,
      { new: true }
    );

    if (!project) {
      return NextResponse.json({ error: "Project not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete project
export async function DELETE(request, { params }) {
  try {
    const session = await getToken({ req: request, secret: process.env.JWT_SECRET });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db();
   const { id } = await params
    const project = await Project.findOneAndDelete({
      _id: id,
      creator: session.user.id
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}