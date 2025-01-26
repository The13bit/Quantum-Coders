import { NextResponse } from "next/server";

import User from "@/app/models/User";
import db from "@/utils/db";

export async function GET(request) {
    try {
        // Get search query from URL
        const { searchParams } = new URL(request.url);
        const name = searchParams.get("name");

        if (!name) {
            return NextResponse.json(
                { error: "Name parameter is required" },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await db();

        // Search users with case-insensitive regex pattern
        const users = await User.find({
            name: { $regex: name, $options: "i" }
        }).select('-password'); // Exclude password from results

        return NextResponse.json(users);

    } catch (error) {
        console.error("Error searching users:", error);
        return NextResponse.json(
            { error: "Failed to search users" },
            { status: 500 }
        );
    }
}