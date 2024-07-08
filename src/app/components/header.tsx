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
						<ul className="flex space-x-4">
							<li>
								<Link href="/" className="hover:underline">
									Home
								</Link>
							</li>
							<li>
								<Link href="/forums" className="hover:underline">
									Forums
								</Link>
							</li>
							<li>
								<Link href="/messages" className="hover:underline">
									Messages
								</Link>
							</li>
							<li>
								<Link href="/about" className="hover:underline">
									About Us
								</Link>
							</li>
							<li>
								<Link href="/profile" className="hover:underline">
									Profile
								</Link>
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
