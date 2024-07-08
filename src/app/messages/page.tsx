import Header from "../components/header";
import Footer from "../components/footer";
import Image from "next/image";


import SidebarWrapper from "../components/SidebarWrapper";

export default function Messages() {
	return (
		<main className="flex min-h-screen flex-col">
			<Header />
			<SidebarWrapper
				sidebar={
					<aside className="w-full block p-4 bg-white rounded shadow">
						<div className="flex gap-2 items-center mb-4">
							<button>
								<h2 className="text-xl font-bold ">Conversations</h2>
							</button>
						</div>
						<ul className="transition-all duration-300 block">
							<li className="mb-2">
								<a
									href="/messages/123"
									className="flex items-center space-x-2 text-green-600 hover:underline"
								>
									<Image
										width={40}
										height={40}
										src="https://via.placeholder.com/40"
										alt="User Avatar"
										className="w-10 h-10 rounded-full"
									/>
									<div>
										<p className="font-bold">User123</p>
										<p className="text-sm text-gray-600">
											Last message preview...
										</p>
									</div>
								</a>
							</li>
						</ul>
					</aside>
				}
				content={
					<section className="w-full sm:w-3/4 p-4 bg-white rounded shadow flex flex-col">
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
				}
			/>
			<Footer />
		</main>
	);
}
