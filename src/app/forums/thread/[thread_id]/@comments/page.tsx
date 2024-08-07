import UserAvatar from "@/app/components/UserAvatar";
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
		.leftJoin("users", "users.id", "thread_posts.user_id")
		.leftJoin("threads", "threads.id", "thread_posts.thread_id")
		.select([
			"thread_posts.id",
			"thread_posts.content",
			"thread_posts.created_at",
			"users.username",
			"users.avatar as user_avatar",
			"threads.title as title",
		])
		.where("thread_posts.thread_id", "=", Number(params.thread_id))

		.execute()) as any[];

	if (comments.length === 0) {
		return (
			<div className="flex flex-col gap-2">
				<p className="text-gray-500 text-center text-sm">No comments found</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col divide-y">
			{comments.map((comment: any) => (
				<div
					className="flex flex-col md:flex-row gap-2 divide-x divide-gray-200"
					id={`c${comment.id}`}
					key={comment.id}
				>
					<div className="flex-col gap-2 items-center p-4 hidden md:flex w-1/4">
						<UserAvatar
							width={100}
							height={100}
							currentAvatar={comment!.user_avatar}
						/>
						<Link
							href={`/profile/${comment!.username}`}
							className="text-sm text-blue-500 visited:text-green-500"
						>
							{comment!.username}
						</Link>
					</div>

					<div className="flex flex-col gap-2 p-2 w-full">
						<div className="p-2">
							<p
								className="text-black whitespace-pre-wrap"
								dangerouslySetInnerHTML={{
									__html: bbcodeToHtml(comment!.content),
								}}
							/>
						</div>
						<div className="p-2">
							<div className="flex justify-between">
								<span className="text-sm text-gray-500">
									{comment!.created_at.toLocaleDateString()}
								</span>
								<div className="flex gap-1 justify-end md:hidden">
									<UserAvatar
										width={20}
										height={20}
										currentAvatar={comment!.user_avatar}
									/>
									<Link
										href={`/profile/${comment!.username}`}
										className="text-sm text-blue-500 visited:text-green-500"
									>
										{comment!.username}
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
				// <div
				// 	className="flex flex-col md:flex-row gap-2 divide-x divide-gray-200"
				// 	key={comment.id}
				// >
				// 	<div className="flex flex-col gap-2 items-center p-4 w-1/4">
				// 		<Image
				// 			src={comment.user_avatar ?? "/default_avatar_green.png"}
				// 			alt="User Avatar"
				// 			width={75}
				// 			height={75}
				// 			className="rounded-full"
				// 		/>
				// 		<Link
				// 			href={`/profile/${comment.username}`}
				// 			className="text-sm text-blue-500 visited:text-green-500"
				// 		>
				// 			{comment.username}
				// 		</Link>
				// 	</div>
				// 	<div className="flex flex-col gap-2 p-2 w-full">
				// 		<div className="p-2">
				// 			<h3 className="text-lg font-bold">RE: {comment!.title}</h3>
				// 		</div>
				// 		<div className="p-2">
				// 			<p
				// 				className="text-black"
				// 				dangerouslySetInnerHTML={{
				// 					__html: bbcodeToHtml(comment!.content),
				// 				}}
				// 			/>
				// 		</div>
				// 		<div className="p-2">
				// 			<span className="text-sm text-gray-500">
				// 				{comment!.created_at.toLocaleDateString()}
				// 			</span>
				// 		</div>
				// 	</div>
				// </div>
			))}
		</div>
	);
}
