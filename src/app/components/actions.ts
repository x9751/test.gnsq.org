"use server";
import { put } from "@vercel/blob";

import { getUser } from "@/db/auth";
import db from "@/db/db";
import { revalidatePath } from "next/cache";

export async function followUser(
	prev: any,
	formData: FormData
): Promise<{ error?: string; message?: string }> {
	const session = await getUser();
	const followId = formData.get("follow_id");
	const isFollowing = formData.get("is_following") === "1";

	if (!session) {
		return { error: "Unauthorized" };
	}
	if (!followId) {
		return { error: "No follow_id" };
	}
	const followUser = await db
		.selectFrom("users")
		.selectAll()
		.where("id", "=", Number(followId))
		.executeTakeFirst();
	if (!followUser) {
		return { error: "User not found" };
	}

	const blocked = await db
		.selectFrom("blocked_users")
		.selectAll()
		.where("user_id", "=", Number(followId))
		.where("blocked_user_id", "=", session.id)
		.executeTakeFirst();
	if (blocked) {
		return { error: "Error following user" };
	}

	if (!isFollowing) {
		await db
			.insertInto("feed_follows")
			.values({
				user_id: session.id,
				following_user_id: Number(followId),
			})
			.execute();
	} else {
		await db
			.deleteFrom("feed_follows")
			.where("user_id", "=", session.id)
			.where("following_user_id", "=", Number(followId))
			.execute();
	}

	revalidatePath(`/profile/${followUser.username}`, "page");

	return { message: isFollowing ? "Unfollowed" : "Followed" };
}

export async function blockUser(
	prev: any,
	formData: FormData
): Promise<{ error?: string; message?: string }> {
	const session = await getUser();
	const blockId = formData.get("block_id");
	const isBlocked = formData.get("is_blocked") === "1";

	const user = await db
		.selectFrom("users")
		.selectAll()
		.where("id", "=", Number(blockId))
		.executeTakeFirst();
	if (!user) {
		return { error: "User not found" };
	}

	if (!session) {
		return { error: "Unauthorized" };
	}
	if (!blockId) {
		return { error: "No block_id" };
	}

	if (!isBlocked) {
		await db
			.insertInto("blocked_users")
			.values({
				user_id: session.id,
				blocked_user_id: Number(blockId),
			})
			.execute();
	} else {
		await db
			.deleteFrom("blocked_users")
			.where("user_id", "=", session.id)
			.where("blocked_user_id", "=", Number(blockId))
			.execute();
	}

	revalidatePath(`/profile/${user.username}`, "page");

	return { message: isBlocked ? "Unblocked" : "Blocked" };
}

export async function uploadAvatar(
	prev: any,
	formData: FormData
): Promise<{ error?: string; message?: string }> {
	const session = await getUser();
	if (!session) {
		return { error: "Unauthorized" };
	}

	const randomId = Math.random().toString(36).substring(2);

	const avatar = formData.get("avatar") as File;
	if (!avatar) {
		return { error: "No avatar" };
	}
	const name = avatar.name as string;
	const extension = name.split(".")[name.split(".").length - 1];

	const results = await put(`avatar/${randomId}.${extension}`, avatar, {
		access: "public",
	});

	await db
		.updateTable("users")
		.set({ avatar: results.url })
		.where("id", "=", session.id)
		.execute();

	revalidatePath("/me", "page");

	return { message: "Avatar uploaded" };
}
