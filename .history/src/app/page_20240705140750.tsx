import Header from "./components/header";
import Footer from "./components/footer";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col">
			<Header />
			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Welcome to Goons Gaming</h2>
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
			<Footer />
		</main>
	);
}
