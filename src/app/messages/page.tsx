import { getUser } from "@/db/auth";
import db from "@/db/db";
import Image from "next/image";
import { redirect } from "next/navigation";

type Room = {
	room_id: number;
	room_name: string | null;
	last_message: {
		content: string;
		user_id: number;
		username: string;
		avatar: string | null;
		created_at: Date;
	};
};

export default async function Messages() {
	const user = await getUser();
	if (!user) {
		redirect("/login?redirect=/messages");
	}
	const rooms = await db
		.selectFrom("user_rooms")
		.leftJoin("rooms", "rooms.id", "user_rooms.room_id")
		.select(["user_rooms.room_id", "rooms.name as room_name"])
		.where("user_rooms.user_id", "=", user.id)
		.execute() as Room[];
	for (const room of rooms) {
		const lastMessage = await db
			.selectFrom("messages")
			.innerJoin("users", "users.id", "messages.user_id")
			.select([
				"messages.created_at",
				"messages.content",
				"messages.user_id",
				"users.username as username",
				"users.avatar as avatar",
			])
			.where("room_id", "=", room.room_id)
			.orderBy("messages.created_at", "desc")
			.limit(1)
			.execute();
		room.last_message = lastMessage[0]!;
	}
	rooms.sort((a, b) => {
		return new Date(b.last_message.created_at).getTime() - new Date(a.last_message.created_at).getTime();
	});
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
							{rooms.length === 0 && (
								<li className="mb-2">
									<p className="text-gray-600">No conversations</p>
								</li>
							)}
							{rooms.map((room) => (
								<li className="mb-2" key={room.room_id}>
									<a
										href={`/messages/${room.room_id}`}
										className="flex items-center space-x-2 text-green-600 hover:underline"
									>
										<Image
											width={40}
											height={40}
											src={room.last_message.avatar || "/pirate_logo.jpeg"}
											alt="User Avatar"
											className="w-10 h-10 rounded-full"
										/>
										<div>
											<p className="font-bold">{room.room_name}</p>
											<p className="text-sm text-gray-600">
												{room.last_message.content}
											</p>
										</div>
									</a>
								</li>
							))}
						</ul>
				</section>
			</div>
		</>
	);
}
