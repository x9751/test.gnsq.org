import bbcodeToHtml from "@/app/utils/bbcodeToHtml";
import db from "@/db/db";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
	params,
}: {
	params: { thread_id: string };
}) {
	await new Promise((resolve) => setTimeout(resolve, 2000));
	const comments = (await db
		.selectFrom("thread_posts")
		.select([
			"thread_posts.id",
			"thread_posts.content",
			"thread_posts.created_at",
			"users.username",
			"users.avatar as user_avatar",
			"threads.title as title",
		])
		.where("thread_posts.thread_id", "=", Number(params.thread_id))
		.leftJoin("users", "users.id", "thread_posts.user_id")
		.leftJoin("threads", "threads.id", "thread_posts.thread_id")
		.execute()) as any[];

	if (comments.length === 0) {
		return (
			<div className="flex flex-col gap-2">
				<p className="text-gray-500 text-center text-sm">No comments found</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			{comments.map((comment: any) => (
				<div
					className="flex flex-col md:flex-row gap-2 divide-x divide-gray-200"
					key={comment.id}
				>
					<div className="flex flex-col gap-2 items-center p-4">
						<Image
							src={comment.user_avatar ?? "/default_avatar_green.png"}
							alt="User Avatar"
							width={50}
							height={50}
							className="rounded-full"
						/>
						<Link href={`/profile/${comment.username}`} className="text-sm text-blue-500 visited:text-green-500">
							{comment.username}
						</Link>
					</div>
					<div className="flex flex-col gap-2 p-2">
						<div className="p-2">
							<h3 className="text-lg font-bold">RE: {comment!.title}</h3>
						</div>
						<div className="p-2">
							<p
								className="text-black"
								dangerouslySetInnerHTML={{
									__html: bbcodeToHtml(comment!.content),
								}}
							/>
						</div>
						<div className="p-2">
							<span className="text-sm text-gray-500">
								{comment!.created_at.toLocaleDateString()}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
