"use client";

export default function Sidebar() {
	return (
		<div className="relative flex-shrink">
			<aside className="absolute -translate-x-full transition-transform sm:translate-x-0 sm:relative p-4 bg-white w-full rounded shadow data-[active='true']:translate-x-0">
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
		</div>
	);
}
