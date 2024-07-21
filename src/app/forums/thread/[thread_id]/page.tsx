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
		.leftJoin("users", "users.id", "threads.user_id")
		.leftJoin("categories", "categories.id", "threads.category_id")
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

		.executeTakeFirst();

	return (
		<div className="flex flex-col md:flex-row gap-2 divide-x divide-gray-200">
			<div className="flex-col gap-2 items-center p-4 hidden md:flex w-1/4">
				<Image
					src={thread!.user_avatar ?? "/default_avatar_green.png"}
					alt="User Avatar"
					width={100}
					height={100}
					className="rounded-full"
				/>
				<Link
					href={`/profile/${thread!.username}`}
					className="text-sm text-blue-500 visited:text-green-500"
				>
					{thread!.username}
				</Link>
			</div>

			<div className="flex flex-col gap-2 p-2 w-full">
				<div className="p-2 border-b border-gray-200 ">
					<h3 className="text-xl font-bold">{thread!.title}</h3>
				</div>
				<div className="p-2">
					<p
						className="text-black whitespace-pre-wrap"
						dangerouslySetInnerHTML={{ __html: bbcodeToHtml(thread!.content) }}
					/>
				</div>
				<div className="p-2">
					<div className="flex justify-between">
						<span className="text-sm text-gray-500">
							{thread!.created_at.toLocaleDateString()}
						</span>
						<div className="flex gap-1 justify-end md:hidden">
							<Image
								src={thread!.user_avatar ?? "/default_avatar_green.png"}
								alt="User Avatar"
								width={20}
								height={20}
								className="rounded-full"
							/>
							<Link
								href={`/profile/${thread!.username}`}
								className="text-sm text-blue-500 visited:text-green-500"
							>
								{thread!.username}
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
