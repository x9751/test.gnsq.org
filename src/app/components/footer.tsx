import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-green-600 p-4 text-white text-center mt-auto">
			<p>&copy; {new Date().getFullYear()} GNSQ. All rights reserved.</p>
			<ul className="flex justify-center space-x-4">
				<li>
					<Link href="/contact" className="hover:underline">
						Contact
					</Link>
				</li>
				<li>
					<Link href="/privacy" className="hover:underline">
						Privacy
					</Link>
				</li>
			</ul>
		</footer>
	);
}
