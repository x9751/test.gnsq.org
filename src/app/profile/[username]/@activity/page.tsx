import { getUserActivies } from "@/db/activies";
import { getUser } from "@/db/auth";
import Link from "next/link";

export default async function Activity() {
	const logged = await getUser();
	if (!logged) {
		return null;
	}
	const activities = await getUserActivies(logged.id);
	return (
		<section className="md:col-span-2 p-4 bg-white rounded shadow">
			<h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
      {activities.length === 0 && <p className="text-gray-800">No activities yet</p>}
			{activities.map((activity, index) => (
			<div key={index} className="mb-4">
				<p className="text-gray-600 mb-2">
					{activity.activity}{" "}
					{activity.link && (
						<Link href={activity.link} className="text-green-6000 hover:underline">
							#
						</Link>
					)}
				</p>
				<p className="text-gray-800">{activity.content}</p>
				</div>
			))}
		</section>
	);
}
