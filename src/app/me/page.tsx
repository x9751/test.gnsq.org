import db from "@/db/db";
import { getUser } from "@/db/auth";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import FollowButton from "@/app/components/FollowButton";
import BlockButton from "@/app/components/BlockButton";
import UpdateProfileForm from "./UpdateProfile";
import Link from "next/link";

export default async function ProfilePage({
	params,
	searchParams,
}: {
	params: { username: string };
	searchParams: { edit: string };
}) {
	const logged = await getUser();
	if (!logged) {
		redirect("/login?redirect=/profile/" + params.username);
	}
	const edit = searchParams["edit"] === "true";

	return (
		<aside className="md:col-span-1 p-4 bg-white rounded shadow">
			<div className="text-center">
				<Image
					width={150}
					height={150}
					src={logged.avatar || "/default_avatar_green.png"}
					alt="User Avatar"
					className="rounded-full mx-auto mb-2"
				/>
				<h2 className="text-xl font-bold mb-2">{logged.username}</h2>
				<p className="text-gray-600 mb-2">{logged.bio}</p>
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
							username={logged.username}
							bio={logged.bio || ""}
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
	);
}
