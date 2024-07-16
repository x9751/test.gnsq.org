"use server";
import { getUser } from "@/db/auth";
import db from "@/db/db";
import { redirect } from "next/navigation";

export async function createThread(
	prev: any,
	formData: FormData
): Promise<{ message?: string; error?: string }> {
	const user = await getUser();
	if (!user) {
		return {
			error: "You are not logged in",
		};
	}
	const title = formData.get("title");
	const content = formData.get("content");
	const category = formData.get("category");

	if (!title || !content || !category) {
		return {
			error: "All fields are required",
		};
	}

	let insert;
	try {
		insert = await db
			.insertInto("threads")
			.values({
				title: title as string,
				content: filterHtml(content as string),
				category_id: Number(category),
				user_id: user.id,
				views: 0,
				is_pinned: false,
				is_locked: false,
				is_hidden: false,
				is_popular: false,
			})
			.executeTakeFirstOrThrow();
	} catch (e) {
		console.log(e);
		return {
			error: "Failed to create thread",
		};
	}
	console.log(insert);
	// redirect(`/forums/thread/${insert.insertId?.toString()}`);

	return {
		message: "Thread created successfully",
	};
}

function filterHtml(html: string) {
	return html.replace(/<[^>]*>/gm, "");
}
