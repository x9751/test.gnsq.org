import Link from "next/link";

import db from "@/db/db";
import { redirect } from "next/navigation";
import RespondForm from "./Respond";
import { getUser } from "@/db/auth";

export default async function Messages({
	params,
}: {
	params: { room_id: string };
}) {
	const user = await getUser();
	if (!user) redirect("/login?redirect=/messages/[room_id]");
	const room = await db
		.selectFrom("user_rooms")
		.leftJoin("users", "users.id", "user_rooms.user_id")
		.leftJoin("rooms", "rooms.id", "user_rooms.room_id")
		.select(["rooms.id", "rooms.name", "users.username"])
		.where("rooms.id", "=", Number(params.room_id))
		.executeTakeFirst();
	if (!room) redirect("/messages");

	const messages = await db
		.selectFrom("messages")
		.innerJoin("users", "users.id", "messages.user_id")
		.select(({ eb, selectFrom, or }) => [
			"messages.id",
			"messages.content",
			"messages.created_at",
			"messages.user_id",
			"users.username",
			"users.avatar",
			eb("messages.user_id", "=", user.id).as("is_me"),
		])
		.where("room_id", "=", Number(params.room_id))
		.execute();
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

			<div className="flex-1 overflow-auto max-h-[80vh] p-4">
				{messages.map((message) => (
					<div key={message.id} className="mb-4">
						<p className="text-sm text-gray-600">
							<Link href={`/profile/${message.username}`} className="hover:underline">{message.username}</Link>{" "}
							<time
								className="text-gray-400 text-xs"
								dateTime={message.created_at.toString()}
							>
								{new Date(message.created_at).toLocaleString()}
							</time>
							{message.is_me && (
								<span className="text-xs text-gray-400"> (You)</span>
							)}
						</p>
						<p
							className={`${
								message.is_me ? "bg-blue-500 " : "bg-green-500"
							} p-2 rounded text-white`}
						>
							{message.content}
						</p>
					</div>
				))}
			</div>

			<RespondForm room_id={params.room_id} />
		</section>
	);
}
