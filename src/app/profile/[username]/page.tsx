import db from "@/db/db";
import { getUser } from "@/db/auth";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
		.select(["username", "avatar", "bio"])
		.where("username", "=", params.username)
		.executeTakeFirst();
	if (!user) {
		notFound();
	}
	return (
    <div className="container mx-auto p-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
					</aside>
					<RecentActivity />
				</div>
				<Achievements />
			</div>
  )
}

const recentActivities = [
	{
		activity: "Posted in General Discussion",
		content: "Excited for the new game update!",
		link: "#",
	},
	{
		activity: "Replied to a thread in Game Tips",
		content: "Here are some tips for the latest update...",
		link: "#",
	},
	// Add more activities as needed
];

const RecentActivity = () => (
	<section className="md:col-span-2 p-4 bg-white rounded shadow">
		<h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
		{recentActivities.map((activity, index) => (
			<div key={index} className="mb-4">
				<p className="text-gray-600 mb-2">
					{activity.activity}{" "}
					<a href={activity.link} className="text-green-600 hover:underline">
						{activity.link}
					</a>
				</p>
				<p className="text-gray-800">{activity.content}</p>
			</div>
		))}
	</section>
);

const achievements = [
	{ title: "Master Gamer", imgSrc: "/pirate_logo.jpeg" },
	{ title: "Top Contributor", imgSrc: "/pirate_logo.jpeg" },
	// Add more achievements as needed
];

const Achievements = () => (
	<section className="mt-8 p-4 bg-white rounded shadow">
		<h2 className="text-2xl font-bold mb-4">Achievements</h2>
		<div className="flex space-x-4">
			{achievements.map((achievement, index) => (
				<div key={index} className="text-center">
					<Image
						width={100}
						height={100}
						src={achievement.imgSrc}
						alt={achievement.title}
						className="w-16 h-16 mx-auto mb-2"
					/>
					<p className="text-gray-800">{achievement.title}</p>
				</div>
			))}
		</div>
	</section>
);