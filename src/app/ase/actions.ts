"use server";

import { install } from "@/db/db";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {

  const password = formData.get("password");
  if (!password) {
    console.log("Password is required");
    return {
      error: "Password is required",
    };
  }
  if (password !== process.env.ADMIN_PASSWORD) {
    console.log("Password is incorrect");
    return {
      error: "Password is incorrect",
    };
  }
  const token = Buffer.from(`${process.env.ADMIN_PASSWORD}`).toString("base64");
  cookies().set("adminToken", token);
  revalidatePath("/ase");
  redirect("/ase");
}


export async function installDB(prev: any) {
	const token = cookies().get("adminToken");
	if (!token) {
		return {
			error: "Unauthorized",
		};
	}
	try {
		await install();
	} catch (error) {
		return {
			error: "Database installation failed",
		};
	}
	return {
		message: "Database installed",
	};
}

export async function logout() {
	cookies().delete("adminToken");
	revalidatePath("/ase");
	redirect("/ase");
}
