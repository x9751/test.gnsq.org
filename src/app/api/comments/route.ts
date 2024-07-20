import db from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const postId = req.nextUrl.searchParams.get("postId");
	if (!postId) {
		return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
	}

	const comments = await db
		.selectFrom("feed_comments")
		.leftJoin("users", "users.id", "feed_comments.user_id")
		.select(["feed_comments.id", "feed_comments.content", "feed_comments.created_at", "users.username", "users.avatar"])
		.where("feed_id", "=", Number(postId))
		
		.execute();
	console.log(comments);
	return NextResponse.json(comments);
}
