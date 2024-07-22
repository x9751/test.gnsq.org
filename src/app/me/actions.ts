"use server";
import crypto from "crypto";

import db from "@/db/db";
import { getUser } from "@/db/auth";
import { revalidatePath } from "next/cache";

export async function updateProfile(prev: any, formData: FormData) {
	const user = await getUser();
	const username = formData.get("username");
	const bio = formData.get("bio");
	const password = formData.get("password");
	const old_password = formData.get("old_password");

	if (username === prev.username && bio === prev.bio) {
		return {
			message: "No changes",
		};
	}

	try {
		let set: {
			username?: string;
			bio?: string;
			password?: string;
			salt?: string;
		} = {
			username: username?.toString(),
			bio: bio?.toString(),
		};
		if (password !== null && old_password !== null && (password !== "" || old_password !== "")) {
			if (!compare(old_password.toString(), user!.password, user!.salt)) {
				return {
					message: "Old password is incorrect",
				};
			}
			const { hash, salt } = hashPassword(password.toString());
			set.password = hash;
			set.salt = salt;
		}
		await db.updateTable("users").set(set).where("id", "=", user!.id).execute();
	} catch (e: any) {
		return {
			message: e.message,
		};
	}
	revalidatePath("/me", "page");
	return {
		message: "Profile updated",
	};
}

function hashPassword(password: string) {
	const salt = crypto.randomBytes(16).toString("hex");
	const hash = crypto
		.pbkdf2Sync(password, salt, 10000, 512, "sha512")
		.toString("hex");
	return { hash, salt };
}


function compare(password: string, hash: string, salt: string) {
	const hashedPassword = crypto
		.pbkdf2Sync(password, salt, 10000, 512, "sha512")
		.toString("hex");
	return hashedPassword === hash;
}