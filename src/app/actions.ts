"use server";

import { getUser } from "@/db/auth";
import db from "@/db/db";
import { revalidatePath } from "next/cache";

export async function createPost(
	prev: any,
	formData: FormData
): Promise<{ error?: string; message?: string }> {
	const user = await getUser();
	const content = formData.get("content");
	if (!user) {
		return { error: "Unauthorized" };
	}
	if (!content) {
		return { error: "Content is required" };
	}
	if (content.toString().length > 1000) {
		return { error: "Content is too long" };
	}
	if (content.toString().length < 1) {
		return { error: "Content is too short" };
	}

	await db
		.insertInto("feeds")
		.values({
			content: content.toString(),
			user_id: user.id,
			created_at: new Date().toISOString(),
		})
		.execute();
	revalidatePath("/");

	return { message: "Post created" };
}

export async function createComment(
	prev: any,
	formData: FormData
): Promise<{ error?: string; message?: string }> {
	const user = await getUser();
	const content = formData.get("content");
	const postId = formData.get("postId");
	if (!user) {
		return { error: "Unauthorized" };
	}
	if (!content) {
		return { error: "Content is required" };
	}
	if (!postId) {
		return { error: "Post ID is required" };
	}

	const comment = await db
		.insertInto("feed_comments")
		.values({
			content: content.toString(),
			user_id: user.id,
			feed_id: Number(postId.toString()),
			created_at: new Date().toISOString(),
		})
		.returning(["id"])
		.executeTakeFirstOrThrow();

	await db
		.insertInto("activities")
		.values({
			user_id: user.id,
			reference_id: comment.id,
			action: "4",
		})
		.execute();

	revalidatePath("/");

	return { message: "Comment created" };
}

export async function likePost(
	prev: any,
	formData: FormData
): Promise<{ error?: string; success?: boolean }> {
	const user = await getUser();
	const feed_id = formData.get("feed_id");
	if (!user) {
		return { error: "Unauthorized" };
	}
	if (!feed_id) {
		return { error: "Post ID is required" };
	}

	const existingLike = await db
		.selectFrom("feed_likes")
		.select(["id"])
		.where("feed_id", "=", Number(feed_id.toString()))
		.where("user_id", "=", user.id)
		.executeTakeFirst();
	if (existingLike) {
		await db
			.deleteFrom("feed_likes")
			.where("id", "=", existingLike.id)
			.execute();
		await db
			.deleteFrom("activities")
			.where("reference_id", "=", existingLike.id)
			.execute();
	} else {
		const like = await db
			.insertInto("feed_likes")
			.values({ feed_id: Number(feed_id.toString()), user_id: user.id })
			.returning(["id"])
			.executeTakeFirstOrThrow();
		await db
			.insertInto("activities")
			.values({
				user_id: user.id,
				reference_id: like.id,
				action: "3",
			})
			.execute();
	}
	revalidatePath("/");
	return { success: true };
}
