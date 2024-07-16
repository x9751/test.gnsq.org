"use server";

import { getUser } from "@/db/auth";
import db from "@/db/db";
import { revalidatePath } from "next/cache";

export async function createPost(prev: any, formData: FormData): Promise<{ error?: string; message?: string }> {
  const user = await getUser();
  const content = formData.get("content");
  if (!user) {
    return { error: "Unauthorized" };
  }
  if (!content) {
    return { error: "Content is required" };
  }

  await db.insertInto("feeds").values({
    content: content.toString(),
    user_id: user.id,
    created_at: new Date().toISOString(),
  }).execute();
  revalidatePath("/");

  return { message: "Post created" };
}