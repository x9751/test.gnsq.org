"use server";
import crypto from "crypto";

import db from "@/db/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function register(prev: any, formData: FormData) {
	const username = formData.get("username");
	const email = formData.get("email");
	const password = formData.get("password");
	const confirmPassword = formData.get("confirmPassword");
	if (!username || !email || !password || !confirmPassword) {
		return {
			message: "All fields are required",
		};
	}
	if (!validateEmail(email.toString())) {
		return {
			message: "Invalid email",
		};
	}
	if (password !== confirmPassword) {
		return {
			message: "Passwords do not match",
		};
	}
	const { hash, salt } = hashPassword(password.toString());
	try {
		await db
			.insertInto("users")
			.values({
				username: username.toString(),
				email: email.toString(),
				password: hash,
				salt,
				name: username.toString(),
				role_id: 1,
			})
			.execute();
	} catch (error) {
		console.log(error);
		return {
			message: "User already exists",
		};
	}
	const sessionToken = crypto.randomBytes(32).toString("hex");
	const user = await db
		.selectFrom("users")
		.selectAll()
		.where("email", "=", email.toString())
		.executeTakeFirstOrThrow();
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
	redirect("/");
}

function validateEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function hashPassword(password: string) {
	const salt = crypto.randomBytes(16).toString("hex");
	const hash = crypto
		.pbkdf2Sync(password, salt, 10000, 512, "sha512")
		.toString("hex");
	return { hash, salt };
}
