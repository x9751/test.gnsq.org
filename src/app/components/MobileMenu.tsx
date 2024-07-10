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
				className="fixed top-0 bottom-0 w-screen right-0 transition-all duration-300 translate-x-full data-[ismenuopen=true]:-translate-x-0 bg-white text-black z-50"
			>
				<div className="flex justify-between p-4">
					<Link href="/" className="text-2xl font-bold">
						GNSQ
					</Link>
					<button onClick={() => setIsMenuOpen(false)}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							version="1.1"
							x="0px"
							y="0px"
							viewBox="0 0 100 125"
							className="w-8 h-8 text-black"
							stroke="currentColor"
						>
							<g>
								<path d="M86.8,13.2c-2.9-2.9-7.7-2.9-10.6,0L50,39.4L23.8,13.2c-2.9-2.9-7.7-2.9-10.6,0c-2.9,2.9-2.9,7.7,0,10.6L39.4,50L13.2,76.2   c-2.9,2.9-2.9,7.7,0,10.6c1.5,1.5,3.4,2.2,5.3,2.2s3.8-0.7,5.3-2.2L50,60.6l26.2,26.2c1.5,1.5,3.4,2.2,5.3,2.2s3.8-0.7,5.3-2.2   c2.9-2.9,2.9-7.7,0-10.6L60.6,50l26.2-26.2C89.7,20.9,89.7,16.1,86.8,13.2z" />
							</g>
						</svg>
					</button>
				</div>
				<ul className="flex flex-col items-center justify-center divide-y divide-gray-200 py-4 *:py-4 *:w-full *:text-center">
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
