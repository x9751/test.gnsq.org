import { getUser, getUserByUsername } from "@/db/auth";
import db from "@/db/db";
import Image from "next/image";

export default async function Achievements({params}: {params: {username: string}}) {
	const logged = await getUser();
	if (!logged) {
		return null;
	}
	const user = await getUserByUsername(params.username);
	if (!user) {
		return null;
	}
	const achievements = await db
		.selectFrom("user_achievements")
		.leftJoin(
			"achievements",
			"user_achievements.achievement_id",
			"achievements.id"
		)
		.select([
			"achievements.name",
			"achievements.icon",
			"user_achievements.created_at",
		])
		.where("user_achievements.user_id", "=", user.id)
		.execute();
	return (
		<section className="mt-8 p-4 bg-white rounded shadow">
			<h2 className="text-2xl font-bold mb-4">Achievements</h2>
			<div className="flex space-x-4">
				{achievements.length === 0 ? (
					<p className="text-gray-800">No achievements yet</p>
				) : (
					achievements.map((achievement, index) => (
						<div key={index} className="text-center">
							<Image
								width={100}
								height={100}
								src={achievement.icon ?? "/pirate_logo.jpeg"}
								alt={achievement.name ?? ""}
								className="w-16 h-16 mx-auto mb-2"
							/>
							<p className="text-gray-800">{achievement.name}</p>
						</div>
					))
				)}
			</div>
		</section>
	);
}
