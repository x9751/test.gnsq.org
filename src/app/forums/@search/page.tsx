import { getUser } from "@/db/auth";
import CreateThread from "./CreateThread";
import SearchForm from "./form";
import Link from "next/link";
import db from "@/db/db";

export default async function ForumSearch() {
	const user = await getUser();
	const categories = await db.selectFrom("categories").selectAll().execute();
	return (
		<div className="flex flex-col md:flex-row justify-between items-center gap-4 relative mb-4 bg-white rounded-lg p-4">
			<h2 className="text-2xl font-bold">Forums</h2>
			<SearchForm categories={categories} />
			{user ? <CreateThread categories={categories} /> : <Link href="/login?redirect=/forums" className="text-blue-500">Login to create a thread</Link>}
		</div>
	)
}
