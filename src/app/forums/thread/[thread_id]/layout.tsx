import db from "@/db/db";
import { notFound } from "next/navigation";
import ReplyThread from "./Reply";

export default async function Layout({
	children,
	comments,
	params,
}: {
	children: React.ReactNode;
	comments: React.ReactNode;
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

	if (!thread) {
		notFound();
	}
	return (
		<div className="bg-white rounded-lg">
			<div className="flex flex-col gap-4">
				{children}
				<div className="border-t border-gray-200"></div>
				<h3 className="text-xl font-bold text-center">Comments</h3>
				{comments}
        <ReplyThread thread_id={thread.id} />
			</div>
		</div>
	);
}
