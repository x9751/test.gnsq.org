import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default function Header() {
	return (
		<header className="bg-green-600 p-4 text-white overflow-hidden">
			<nav className="container mx-auto flex justify-between items-center">
				<Link href="/" className="text-2xl font-bold">
					GNSQ
				</Link>
				<div>
					<div className="hidden sm:block">
						<ul className="flex space-x-4 *:bg-green-700 *:p-2 *:rounded-lg *:transition-all *:duration-300">
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
								<Link href="/profile">Profile</Link>
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
