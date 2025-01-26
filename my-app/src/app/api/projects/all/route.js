import { NextResponse } from "next/server";
import db from "@/utils/db";
import Project from "@/app/models/projectscheme";
import { getToken } from "next-auth/jwt";
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