"use server";
import db from "@/db/db";

import { getUser } from "@/db/auth";
import { revalidatePath } from "next/cache";

export async function replyToThread(prev: any, formData: FormData): Promise<{ error?: string; message?: string; }> {
	const content = formData.get("content");
	const thread_id = formData.get("thread_id") as string;

	if (!content) {
		return { error: "Content is required" };
	}

	const user = await getUser();
	if (!user) {
		return { error: "You must be logged in to reply to a thread" };
	}

	const thread = await db
		.selectFrom("threads")
		.selectAll()
		.where("id", "=", Number(thread_id))
		.executeTakeFirst();
	if (!thread) {
		return { error: "Thread not found" };
	}

	await db
		.insertInto("thread_posts")
		.values({
			content: content.toString(),
			user_id: user.id,
			thread_id: Number(thread_id),
		})
		.execute();

	revalidatePath(`/forums/thread/${thread_id}`);
	return {
		message: "",
	};
}
