import Link from "next/link";
import Footer from "../components/footer";
import Header from "../components/header";

import RegisterForm from "./form";

export default function Register({
	searchParams,
}: {
	searchParams: { redirect: string };
}) {
	const redirect = searchParams.redirect || "/";
	return (
		<main className="flex min-h-screen flex-col">
			<Header />
			<div className="flex flex-col items-center justify-center">
				<div className="mx-auto w-full max-w-lg p-4  mt-20">
					<RegisterForm />
					<p className="mt-4 text-sm text-gray-500">
						Already have an account?{" "}
						<Link
							href={`/login?redirect=${encodeURIComponent(redirect)}`}
							className="text-blue-500 hover:text-blue-6000"
						>
							Login
						</Link>
					</p>
				</div>
			</div>
			<Footer />
		</main>
	);
}
