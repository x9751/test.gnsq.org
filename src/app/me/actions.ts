"use server";
import db from "@/db/db";
import { getUser } from "@/db/auth";
import { revalidatePath } from "next/cache";

export async function updateProfile(prev: any, formData: FormData) {
	const user = await getUser();
	const username = formData.get("username");
	const bio = formData.get("bio");

	if (username === prev.username && bio === prev.bio) {
		return {
			message: "No changes",
		};
	}

	try {
    await db
		.updateTable("users")
		.set({
			username: username?.toString(),
			bio: bio?.toString(),
		})
		.where("id", "=", user!.id).execute();
	} catch (e: any) {
		return {
			message: e.message,
		};
	}
	revalidatePath("/profile");
	return {
		message: "Profile updated",
	};
}
