import Header from "../components/header";
import Footer from "../components/footer";
export default function Forum() {
	return (
		<main className="flex min-h-screen flex-col">
			<Header />
			<div className="container mx-auto p-4 flex">
				<aside className="w-1/4 p-4 bg-white rounded shadow">
					<h2 className="text-xl font-bold mb-4">Forum Categories</h2>
					<ul>
						<li>
							<a
								href="/forums/general"
								className="text-green-600 hover:underline"
							>
								General Discussion
							</a>
						</li>
						<li>
							<a href="/forums/tips" className="text-green-600 hover:underline">
								Game Tips
							</a>
						</li>
						<li>
							<a
								href="/forums/off-topic"
								className="text-green-600 hover:underline"
							>
								Off-Topic
							</a>
						</li>
						<li>
							<a
								href="/forums/announcements"
								className="text-green-600 hover:underline"
							>
								Announcements
							</a>
						</li>
					</ul>
				</aside>
				<section className="w-3/4 p-4">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-2xl font-bold">Forum Threads</h2>
						<button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
							New Thread
						</button>
					</div>
					<div className="bg-white p-4 rounded shadow mb-4">
						<h3 className="text-xl font-bold mb-2">Thread Title</h3>
						<p className="text-gray-700 mb-2">
							Started by{" "}
							<a
								href="/profile/user123"
								className="text-green-600 hover:underline"
							>
								User123
							</a>
						</p>
						<p className="text-gray-700">
							Last reply by{" "}
							<a
								href="/profile/user456"
								className="text-green-600 hover:underline"
							>
								User456
							</a>{" "}
							at <time datetime="2024-07-05">July 5, 2024</time>
						</p>
						<a href="/thread/123" className="text-green-600 hover:underline">
							Read More
						</a>
					</div>
					{/* Repeat for more threads */}
					<nav className="mt-4">
						<ul className="flex justify-center space-x-2">
							<li>
								<a
									href="?page=1"
									className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
								>
									1
								</a>
							</li>
							<li>
								<a
									href="?page=2"
									className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
								>
									2
								</a>
							</li>
							<li>
								<a
									href="?page=3"
									className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
								>
									3
								</a>
							</li>
							{/* Pagination links */}
						</ul>
					</nav>
				</section>
			</div>
			<Footer />
		</main>
	);
}
