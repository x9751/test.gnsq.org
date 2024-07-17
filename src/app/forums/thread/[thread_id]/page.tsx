import Image from "next/image";
import db from "@/db/db";
import bbcodeToHtml from "@/app/utils/bbcodeToHtml";
import Link from "next/link";

export default async function ThreadPage({
	params,
}: {
	params: { thread_id: string };
}) {
	const thread = await db
		.selectFrom("threads")
		// @ts-ignore
		.select([
			"threads.id",
			"threads.title",
			"threads.created_at",
			"users.username",
			"users.avatar as user_avatar",
			"categories.name as category_name",
			"threads.content",
		])
		.where("threads.id", "=", Number(params.thread_id))
		.leftJoin("users", "users.id", "threads.user_id")
		.leftJoin("categories", "categories.id", "threads.category_id")
		.executeTakeFirst();

	return (
    <div className="flex flex-col md:flex-row gap-2 divide-x divide-gray-200">
				<div className="flex flex-col gap-2 items-center p-4">
					<Image
						src={thread!.user_avatar ?? "/default_avatar_green.png"}
						alt="User Avatar"
						width={75}
						height={75}
						className="rounded-full"
					/>
					<Link href={`/profile/${thread!.username}`} className="text-sm text-blue-500 visited:text-green-500">{thread!.username}</Link>
				</div>
				<div className="flex flex-col gap-2 p-2">
					<div className="p-2">
						<h3 className="text-xl font-bold">{thread!.title}</h3>
					</div>
					<div className="p-2">
						<p className="text-black" dangerouslySetInnerHTML={{ __html: bbcodeToHtml(thread!.content) }} />
					</div>
					<div className="p-2">
						<span className="text-sm text-gray-500">
							{thread!.created_at.toLocaleDateString()}
						</span>
					</div>
				</div>
			</div>
	);
}
