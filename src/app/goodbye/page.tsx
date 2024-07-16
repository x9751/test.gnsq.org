import Link from "next/link";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Goodbye() {
	return (
		<main className="flex min-h-screen flex-col">
			<Header />
			<div className="flex items-center justify-center flex-grow">
				<div className="text-center">
					<h1 className="text-3xl font-bold mb-4">Sorry to see you go!</h1>
					<p className="text-lg">You have been successfully logged out.</p>
					<p className="mt-4">
						<Link href="/" className="text-blue-500 hover:underline">
							Return to homepage
						</Link>
					</p>
				</div>
			</div>
			<Footer />
		</main>
	);
}
