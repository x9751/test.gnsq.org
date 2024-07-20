"use server";

import { getUser } from "@/db/auth";
import db from "@/db/db";
import { revalidatePath } from "next/cache";

export async function createNewRoom(
	prev: any,
	formData: FormData
): Promise<{ error?: string; message: string }> {
	const session = await getUser();
	if (!session) {
		return { error: "User not found", message: "" };
	}
	const username = formData.get("username");
	const message = formData.get("message");
	const room_name = formData.get("room_name");

	if (!username || !message) {
		return { error: "Username and message are required", message: "" };
	}

	const user = await db
		.selectFrom("users")
		.select(["id"])
		.where("username", "=", username.toString())
		.executeTakeFirst();
	if (!user) {
		return { error: "User not found", message: "" };
	}

	const room = await db
		.insertInto("rooms")
		.values({
			name: room_name
				? room_name.toString()
				: [session.username, username.toString()].join(","),
		})
		.returning(["id"])
		.executeTakeFirstOrThrow();
	console.log(room);
	await db
		.insertInto("user_rooms")
		.values([
			{
				user_id: user.id,
				room_id: room.id,
			},
			{
				user_id: Number(session.id),
				room_id: room.id,
			},
		])
		.execute();

	await db
		.insertInto("messages")
		.values({
			room_id: room.id,
			user_id: Number(session.id),
			content: message.toString(),
		})
		.execute();

	revalidatePath("/messages");

	return { message: "Message created" };
}

export async function sendMessage(
	prev: any,
	formData: FormData
): Promise<{ error?: string }> {
	const user = await getUser();
	if (!user) {
		return { error: "session not found" };
	}
	const room_id = formData.get("room_id");
	const message = formData.get("message");

	if (!room_id || !message) {
		return { error: "room_id and message are required" };
	}

	await db
		.insertInto("messages")
		.values({
			room_id: Number(room_id),
			user_id: Number(user.id),
			content: message.toString(),
		})
		.execute();

	revalidatePath(`/messages/${room_id}`, "page");

	return {};
}
