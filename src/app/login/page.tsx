import { redirect } from "next/navigation";
import Link from "next/link";
import Footer from "../components/footer";
import Header from "../components/header";

import LoginForm from "./form";
import { getUser } from "@/db/auth";

export default async function Login({
	searchParams,
}: {
	searchParams: { redirect: string };
}) {
	const user = await getUser();

	const red = searchParams.redirect || "/";
	if (user) {
		redirect(red);
	}
	return (
		<main className="flex min-h-screen flex-col">
			<Header />
			<div className="flex flex-col items-center justify-center">
				<div className="mx-auto w-full max-w-lg p-4  mt-20">
					<LoginForm />
					<p className="mt-4 text-sm text-gray-500">
						Don&apos;t have an account?{" "}
						<Link
							href={`/register?redirect=${encodeURIComponent(red)}`}
							className="text-blue-500 hover:text-blue-600"
						>
							Register
						</Link>
					</p>
				</div>
			</div>
			<Footer />
		</main>
	);
}
