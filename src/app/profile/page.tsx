import db from "@/db/db";
import Image from "next/image";
import Footer from "../components/footer";
import Header from "../components/header";
import { getUser } from "@/db/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import UpdateProfileForm from "./UpdateProfile";

export default async function Profile({
	searchParams,
}: {
	searchParams: { edit: string };
}) {
	const user = await getUser();
	if (!user) {
		redirect("/login?redirect=/profile");
	}

	const edit = searchParams["edit"] === "true";

	return (
		<div className="flex min-h-screen flex-col">
			<Header />
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
							{!edit && (
								<Link
									href={`?edit=true`}
									className="bg-green-600 transition-colors duration-300 text-white px-4 py-2 rounded shadow hover:bg-green-700 active:bg-green-400"
								>
									Edit Profile
								</Link>
							)}
							{edit && (
								<div className="mt-4 flex flex-col">
									<UpdateProfileForm
										username={user.username}
										bio={user.bio || ""}
									/>
									<div className="mt-4">
										<Link
											href={`?edit=false`}
											className="bg-orange-600 transition-colors duration-300 text-white px-4 py-2 rounded shadow hover:bg-orange-700 active:bg-orange-400"
										>
											Finish
										</Link>
									</div>
								</div>
							)}
						</div>
					</aside>
					<RecentActivity />
				</div>
				<Achievements />
			</div>
			<Footer />
		</div>
	);
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
