import Image from "next/image";

export default function Messages() {
	return (
		<>
			<div className="hidden md:flex">
				<div className="w-full p-4 bg-white rounded-lg flex h-[40vh] items-center justify-center">
					<p className="text-gray-600">Select a conversation to start messaging</p>
				</div>
			</div>
			<div className="block md:hidden">
				<section className="w-full block p-4 bg-white rounded shadow">
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
				</section>
			</div>
		</>
	);
}
