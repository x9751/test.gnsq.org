"use client";

export default function Sidebar() {
	return (
		<aside className="w-full sm:w-1/4 p-4 bg-white rounded shadow">
			<h2 className="text-xl font-bold mb-4">Conversations</h2>
			<ul>
				<li className="mb-2">
					<a
						href="/messages/123"
						className="flex items-center space-x-2 text-green-600 hover:underline"
					>
						<img
							src="https://via.placeholder.com/40"
							alt="User Avatar"
							className="w-10 h-10 rounded-full"
						/>
						<div>
							<p className="font-bold">User123</p>
							<p className="text-sm text-gray-600">Last message preview...</p>
						</div>
					</a>
				</li>
			</ul>
		</aside>
	);
}
