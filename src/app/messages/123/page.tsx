import Link from "next/link";

export default function Messages() {
	return (
		<section className="w-full sm:w-3/4 p-4 bg-white rounded shadow flex flex-col">
			<Link href="/messages">
				<button className="bg-gray-200 p-2 rounded mb-4 md:hidden">
					<svg
						aria-hidden="true"
						fill="none"
						strokeWidth={1.5}
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						className="w-5 h-5 text-gray-600"
						role="img"
					>
						<path
							d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>
			</Link>
			<div className="flex-1 overflow-auto p-4">
				<div className="mb-4">
					<p className="text-sm text-gray-600">
						User123 <time dateTime="2024-07-05T12:00">12:00 PM</time>
					</p>
					<p className="bg-gray-200 p-2 rounded">Hello! How are you?</p>
				</div>
			</div>
			<form className="flex items-center p-4 border-t">
				<input
					type="text"
					placeholder="Type your message..."
					className="flex-1 p-2 border rounded"
				/>
				<button
					type="submit"
					className="bg-green-600 text-white p-2 rounded ml-2"
				>
					Send
				</button>
			</form>
		</section>
	);
}
