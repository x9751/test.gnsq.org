import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-green-600 p-4 text-white text-center mt-auto">
			<p>&copy; 2024 Goons Gaming Group. All rights reserved.</p>
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
