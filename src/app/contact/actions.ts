"use server";

import db from "@/db/db";

export async function submitForm(prev: any, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");
  if (!name || !email || !subject || !message) {
    return { success: false, message: "All fields are required" };
  }
  try {
    await db.insertInto("contacts").values({
      name: name as string,
      email: email as string,
      subject: subject as string,
      message: message as string,
    }).execute();
  } catch(e: any) {
    console.log(e);
    return { success: false, message: "An error occurred while submitting the form" };
  }
  return { success: true, message: "Form submitted successfully" }
}