"use client";

import { useState } from "react";

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<aside className="w-full sm:w-1/4 p-4 bg-white rounded shadow">
			<div className="flex gap-2">
				<h2 className="text-xl font-bold mb-4">Conversations</h2>
				<button onClick={() => setIsOpen(!isOpen)} data-active={isOpen} className="data-[active='true']:rotate-180">
					<svg
						aria-hidden="true"
						fill="none"
						strokeWidth={1.5}
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 text-black"
					>
						<path
							d="m19.5 8.25-7.5 7.5-7.5-7.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</div>
			<ul className="hidden sm:block">
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
