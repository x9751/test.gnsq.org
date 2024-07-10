import Image from "next/image";
import Link from "next/link";

export default function Error404() {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h2 className="text-4xl font-bold">Sorry!</h2>
			<p className="text-2xl text-center">
				We couldn&apos;t find the page you were looking for.
			</p>
			<Link
				href="/"
				className="text-2xl font-bold underline underline-offset-4 hover:text-blue-500 transition-all duration-300 mt-4"
			>
				Go back to the home page
			</Link>
		</div>
	);
}
