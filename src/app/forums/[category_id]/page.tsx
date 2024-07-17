import db from "@/db/db";

import Link from "next/link";
import Highlight from "@/app/components/Highlight";
import bbcodeToHtml from "@/app/utils/bbcodeToHtml";

export default async function CategoryPage({ params }: { params: { category_id: string } }) {
	const category_id = parseInt(params.category_id);

	let threadQuery = db
		.selectFrom("threads")
		// @ts-ignore
		.select([
			"threads.id",
			"threads.title",
			"threads.content",
			"threads.created_at",
			"threads.user_id",
			"threads.category_id",
			"users.username",
			"categories.name as category_name",
		])
		.leftJoin("users", "users.id", "threads.user_id")
		.leftJoin("categories", "categories.id", "threads.category_id")
		.where("threads.category_id", "=", category_id);

	const threads = await threadQuery.execute() as any[];

	return (
		<section className="w-full ">
			{threads.map(
				(thread: {
					id: number;
					title: string;
					content: string;
					created_at: string;
					user_id: number;
					category_id: number;
					category_name: string;
					username: string;
				}) => (
					<div className="bg-white p-4 rounded shadow mb-4" key={thread.id}>
						<h3 className="text-xl font-bold mb-2">
							<Highlight text={thread.title} highlight={""} />
						</h3>
						<p className="text-gray-700 mb-2">
							Started by{" "}
							<Link
								href={`/profile/${thread.username}`}
								className="text-green-600 hover:underline"
							>
								{thread.username}
							</Link>{" "}
							in{" "}
							<Link
								href={`/forums/${thread.category_id}`}
								className="text-green-600 hover:underline"
							>
								{thread.category_name}
							</Link>
						</p>
						<p
							className="text-gray-700 line-clamp-2"
							dangerouslySetInnerHTML={{ __html: bbcodeToHtml(thread.content) }}
						/>
						<Link
							href={`/forums/thread/${thread.id}`}
							className="text-green-6000 hover:underline"
						>
							Read More
						</Link>
					</div>
				)
			)}

			{/* <nav className="mt-4">
				<ul className="flex justify-center space-x-2">
					<li>
						<a
							href="#"
							className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
						>
							1
						</a>
					</li>
					<li>
						<a
							href="#"
							className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
						>
							2
						</a>
					</li>
					<li>
						<a
							href="#"
							className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
						>
							3
						</a>
					</li>
				</ul>
			</nav> */}
		</section>
	);
}