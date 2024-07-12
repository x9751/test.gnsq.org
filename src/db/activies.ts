import db from "./db";

export async function getUserActivies(user_id: number) {
	const activities = await db
		.selectFrom("activities")
		.selectAll()
		.where("user_id", "==", user_id)
		.fullJoin("users", "users.id", "activities.user_id")
		.execute();
	return activities;
}
