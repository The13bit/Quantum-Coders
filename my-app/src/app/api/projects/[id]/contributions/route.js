// src/app/api/projects/[id]/contributions/route.js

import { NextResponse } from "next/server";
import db from "@/utils/db";
import Project from "@/app/models/projectscheme";
import { getToken } from "next-auth/jwt";

// Add contribution to project
export async function POST(request, { params }) {
  try {
    const session = await getToken({ req: request, secret: process.env.JWT_SECRET });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await db();
    const {id}=await params;

    const project = await Project.findByIdAndUpdate(
      id,
      {
        $push: {
          contributions: {
            contributor: session.user.id,
            amount: body.amount,
            isAnonymous: body.isAnonymous
          }
        }
      },
      { new: true }
    );

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function GET(request, { params }) {
  try {
    await db();
    
    const project = await Project.findById(params.id)
      .populate({
        path: 'contributions.contributor',
        select: 'name email',
        match: { 'contributions.isAnonymous': false }
      });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Filter out anonymous contributions and map to required format
    const contributors = project.contributions
      .filter(contribution => !contribution.isAnonymous)
      .map(contribution => ({
        name: contribution.contributor?.name || 'Unknown',
        amount: contribution.amount,
        contributedAt: contribution.contributedAt
      }));

    return NextResponse.json(contributors);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}