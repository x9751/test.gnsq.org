"use client";

import Link from "next/link";
import { useState } from "react";

export default function MobileMenu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className="">
			<button onClick={() => setIsMenuOpen(!isMenuOpen)}>
				<svg
					aria-hidden="true"
					fill="none"
					strokeWidth={1.5}
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					className="w-8 h-8 text-white"
				>
					<path
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			<div
				data-ismenuopen={isMenuOpen}
				className="fixed top-14 right-0 transition-all duration-300 translate-x-full data-[ismenuopen=true]:-translate-x-0 bg-white text-black rounded-l-lg shadow-lg z-50"
			>
				<ul className="flex flex-col space-y-4 py-4">
					<li>
						<Link href="/" className="hover:underline p-4">
							Home
						</Link>
					</li>
					<li>
						<Link href="/forums" className="hover:underline p-4">
							Forums
						</Link>
					</li>
					<li>
						<Link href="/messages" className="hover:underline p-4">
							Messages
						</Link>
					</li>
					<li>
						<Link href="/about" className="hover:underline p-4">
							About Us
						</Link>
					</li>
					<li>
						<Link href="/profile" className="hover:underline p-4">
							Profile
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
