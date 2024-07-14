import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = cookies();

  cookieStore.delete("session_token");
  revalidatePath("/");
  redirect("/");
}