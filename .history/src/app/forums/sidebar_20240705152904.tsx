"use client";

import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="relative block w-full sm:w-1/4">
			<button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
				<svg
					aria-hidden="true"
					fill="none"
					strokeWidth={1.5}
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					className="w-8 h-8 text-black data-[active='true']:text-gray-800"
					data-active={isOpen}
				>
					<path
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			<aside data-active={isOpen} className="absolute block -translate-x-full transition-transform sm:translate-x-0 w-full sm:relative p-4 bg-white sm:w-full rounded shadow data-[active='true']:translate-x-0 overflow-hidden">
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
