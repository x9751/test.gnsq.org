import { Activity } from "@/app/types";
import db from "./db";

export async function getUserActivies(user_id: number): Promise<Activity[]> {
	const activities = (await db
		.selectFrom("activities")

		.innerJoin("users", "users.id", "activities.user_id")
		.select(({ eb, selectFrom, or }) => [
			"activities.created_at",
			"activities.reference_id",
			"activities.action",
			"users.username",
			eb("activities.action", "=", "1").as("is_thread"),
			eb("activities.action", "=", "2").as("is_post"),
			eb("activities.action", "=", "3").as("is_like"),
			eb("activities.action", "=", "4").as("is_comment"),
		])
		.where("activities.user_id", "=", user_id)
		.execute()) as Activity[];
	for (const activity of activities) {
		if (activity.is_thread) {
			const thread = await db
				.selectFrom("threads")
				.where("threads.id", "=", activity.reference_id)
				.select(["title", "created_at"])
				.executeTakeFirst();
			activity.thread = thread;
			activity.activity = `Posted in ${thread!.title}`;
			activity.link = `/thread/${activity.reference_id}`;
			activity.content = thread!.title;
		}
		if (activity.is_post) {
			const post = await db
				.selectFrom("thread_posts")
				.where("thread_posts.id", "=", activity.reference_id)
				.innerJoin("threads", "threads.id", "thread_posts.thread_id")
				.select([
					"thread_posts.content",
					"thread_posts.created_at",
					"threads.title",
				])
				.executeTakeFirst();

			activity.post = post;
			activity.activity = `Replied to to a thread in ${post!.title}`;
			activity.link = `/thread/${activity.reference_id}`;
			activity.content = post!.content;
		}
		if (activity.is_like) {
			const like = await db
				.selectFrom("feed_likes")
				.where("feed_likes.id", "=", activity.reference_id)
				.innerJoin("users", "users.id", "feed_likes.user_id")
				.select(["feed_likes.created_at", "users.username"])
				.executeTakeFirst();
			activity.activity = `Liked a post by ${like!.username}`;
			activity.link = `#`;
			activity.content = "";
			activity.like = {
				created_at: activity.created_at!,
			};
		}
		if (activity.is_comment) {
			const comment = await db
				.selectFrom("feed_comments")
				.where("id", "==", activity.reference_id)
				.select(["content", "created_at"])
				.executeTakeFirst();
			activity.activity = "Commented on a feed post";
			activity.link = `#`;
			activity.content = comment!.content;
			activity.comment = comment;
		}
	}
	return activities;
}
