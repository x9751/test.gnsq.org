import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { login } from "./actions";
import Install from "./install";

export default function Page() {
	const cookieStore = cookies();
	const adminToken = cookieStore.get("adminToken");

  

	if (!adminToken)
		return (
			<main className="flex flex-col items-center justify-center h-screen w-screen">
				<form action={login} className="flex flex-col gap-4">
					<input
						type="password"
						placeholder="Admin Password"
						className="text-black bg-gray-200 p-2 rounded-md"
						name="password"
						required
					/>
					<button
						type="submit"
						className="bg-blue-500 text-white p-2 rounded-md"
					>
						Login
					</button>
				</form>
			</main>
		);
	return (
		<main className="flex flex-col items-center justify-center h-screen w-screen">
			<div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">ASE</h1>
      <Install />
      <button className="bg-red-500 text-white p-2 rounded-md">Logout</button>
      </div>
		</main>
	);
}
