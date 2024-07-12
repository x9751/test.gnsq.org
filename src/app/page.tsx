import Header from "./components/header";
import Footer from "./components/footer";
import PostList from "./PostList";
import { getUser } from "@/db/auth";
import Link from "next/link";

export default async function Home() {
	const user = await getUser();

	return (
		<main className="flex min-h-screen flex-col">
			<Header />
			<div className="w-full max-w-5xl mx-auto p-4">
				{user ? <PostList /> : <GuestView />}
			</div>
			<Footer />
		</main>
	);
}

function GuestView() {
	return (
		<>
			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Welcome to GNSQ!</h2>
				<p className="mb-4">
					Join us for fun and engaging gaming sessions. Check out the latest
					forum posts below:
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<article className="bg-white p-4 rounded shadow">
						<h3 className="text-xl font-bold mb-2">Forum Post Title</h3>
						<p className="text-gray-700">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
							nec...
						</p>
						<a href="#" className="text-green-600 hover:underline">
							Read More
						</a>
					</article>
				</div>
			</section>
			<section>
				<h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
				<ul>
					<li className="mb-2">
						Game Night - <strong>Friday 8 PM</strong>
					</li>
					<li className="mb-2">
						Tournament - <strong>Saturday 3 PM</strong>
					</li>
				</ul>
			</section>
		</>
	);
	return (
		<div className="flex flex-col items-center justify-center p-4">
			<div className="bg-white p-4 rounded-md shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
				<div className="flex flex-col items-center justify-center gap-2">
					<h1 className="text-2xl font-bold text-center">
						Welcome to the home page
					</h1>
					<p className="text-lg text-center">Please login to continue</p>
					<Link href="/login" className="bg-blue-500 text-white p-2 rounded-md">
						Login
					</Link>
				</div>
			</div>
		</div>
	);
}
