"use server";
import crypto from "crypto";

import db from "@/db/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function login(prev: any, formData: FormData) {
	const email = formData.get("email");
	const password = formData.get("password");
	const redirectUrl = formData.get("redirect");
	if (!email || !password) {
		return {
			message: "Email and password are required",
		};
	}
	if (!validateEmail(email.toString())) {
		return {
			message: "Invalid email",
		};
	}

	const user = await db
		.selectFrom("users")
		.selectAll()
		.where("email", "=", email.toString())
		.executeTakeFirst();
	if (!user) {
		return {
			message: "Invalid email or password",
		};
	}

	const passwordMatch = compare(password.toString(), user.password, user.salt);
	if (!passwordMatch) {
		return {
			message: "Invalid email or password",
		};
	}
	const sessionToken = crypto.randomBytes(32).toString("hex");
	await db
		.insertInto("sessions")
		.values({
			user_id: user.id,
			token: sessionToken,
		})
		.execute();
	cookies().set("session_token", sessionToken, {
		httpOnly: true,
		path: "/",
		maxAge: 60 * 60 * 24 * 30,
	});
	revalidatePath(redirectUrl ? redirectUrl.toString() : "/");
	redirect(redirectUrl ? redirectUrl.toString() : "/");
}

function validateEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function compare(password: string, hash: string, salt: string) {
	const hashedPassword = crypto
		.pbkdf2Sync(password, salt, 10000, 512, "sha512")
		.toString("hex");
	return hashedPassword === hash;
}
