"use server";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import { getUser } from "@/db/auth";
import Image from "next/image";

export default async function Header() {
	const user = await getUser();
	return (
		<header className="bg-green-600 p-4 text-white overflow-hidden">
			<nav className="container mx-auto flex justify-between items-center">
				<div className="flex gap-2 items-center">
					
					<Link href="/" className="text-2xl font-bold">
						<Image src="/logo.svg" alt="GNSQ Logo" width={50} height={50} />
					</Link>
				</div>
				<div className="flex items-center gap-4">
					{user && (
						<div className="flex items-center gap-2">
							<span>{user.username}</span>
							<Link
								href="/logout"
								prefetch={false}
								className="bg-green-700 p-2 rounded-lg"
							>
								Logout
							</Link>
						</div>
					)}
					<div className="hidden sm:block">
						<ul className="flex space-x-2 *:bg-green-700 *:p-2 *:rounded-lg *:transition-all *:duration-300">
							<li className="hover:bg-green-800 active:bg-green-900">
								<Link href="/">Home</Link>
							</li>
							<li className="hover:bg-green-800 active:bg-green-900">
								<Link href="/forums">Forums</Link>
							</li>
							<li className="hover:bg-green-800 active:bg-green-900">
								<Link href="/messages">Messages</Link>
							</li>
							<li className="hover:bg-green-800 active:bg-green-900">
								<Link href="/about">About Us</Link>
							</li>
							<li className="hover:bg-green-800 active:bg-green-900">
								<Link href="/me">Profile</Link>
							</li>
						</ul>
					</div>
					<div className="block sm:hidden">
						<MobileMenu />
					</div>
				</div>
			</nav>
		</header>
	);
}
