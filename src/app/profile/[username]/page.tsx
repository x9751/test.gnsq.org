import db from "@/db/db";
import { getUser } from "@/db/auth";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import FollowButton from "@/app/components/FollowButton";
import BlockButton from "@/app/components/BlockButton";

export default async function ProfilePage({
	params,
}: {
	params: { username: string };
}) {
	const logged = await getUser();
	if (!logged) {
		redirect("/login?redirect=/profile/" + params.username);
	}
	const user = await db
		.selectFrom("users")
		.select(["id", "username", "avatar", "bio"])
		.where("username", "=", params.username)
		.executeTakeFirst();
	if (!user) {
		notFound();
	}
	const isFollowing = await db
		.selectFrom("feed_follows")
		.selectAll()
		.where("user_id", "=", logged.id)
		.where("following_user_id", "=", user.id)
		.executeTakeFirst();
	const isBlocked = await db
		.selectFrom("blocked_users")
		.selectAll()
		.where("user_id", "=", logged.id)
		.where("blocked_user_id", "=", user.id)
		.executeTakeFirst();
	return (
		<aside className="md:col-span-1 p-4 bg-white rounded shadow">
					<div className="text-center">
						<Image
							width={150}
							height={150}
							src={user.avatar || "/default_avatar_green.png"}
							alt="User Avatar"
							className="rounded-full mx-auto mb-2"
						/>
						<h2 className="text-xl font-bold mb-2">{user.username}</h2>
						<p className="text-gray-600 mb-2">{user.bio}</p>
					</div>
					{user.id !== logged.id && (
						<div className="flex justify-center mt-4 gap-4">
							<FollowButton
								userId={user.id}
								isFollowing={isFollowing ? true : false}
							/>
							<BlockButton
								userId={user.id}
								isBlocked={isBlocked ? true : false}
							/>
						</div>
					)}
				</aside>
	);
}
