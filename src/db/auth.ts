import { cookies } from "next/headers";
import db from "./db";

export async function getUser() {
	const cookieStore = cookies();
	const token = cookieStore.get("session_token");
	if (!token) return null;
	const session = await db
		.selectFrom("sessions")
		.selectAll()
		.where("token", "=", token.value)
		.executeTakeFirst();
	if (!session) return null;
	const user = await db
		.selectFrom("users")
		.selectAll()
		.where("id", "=", session.user_id)
		.executeTakeFirst();
	return user;
}
