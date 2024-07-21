import Header from "./components/header";
import Footer from "./components/footer";
import PostList from "./PostList";
import { getUser } from "@/db/auth";
import db from "@/db/db";
import Link from "next/link";
import bbcodeToHtml from "./utils/bbcodeToHtml";
import { FeedPost } from "./types";


export default async function Home() {
	const user = await getUser();
	let post: FeedPost[] = [];
	let latest_popular_thread: any;
	let latest_events: any;
	if (user) {
		let userFeeds: FeedPost[] = await db
			.selectFrom("feeds")
			.innerJoin("users", "users.id", "feeds.user_id")
			.select([
				"feeds.id",
				"feeds.content",
				"feeds.created_at",
				"feeds.user_id",
				"users.username",
				"users.avatar",
			])
			.where("feeds.user_id", "=", user.id)
			.execute();

		for (const feed of userFeeds) {
				const likes = await db
					.selectFrom("feed_likes")
					.select(["user_id"])
					.where("feed_id", "=", feed.id)
					.execute()
				feed.likes = likes.length;
				feed.liked = likes.some(like => like.user_id === user.id);
		}

		const followedFeeds = await db
			.selectFrom("feeds")
			.innerJoin(
				"feed_follows",
				"feed_follows.following_user_id",
				"feeds.user_id"
			)
			.innerJoin("users", "users.id", "feeds.user_id")
			.select([
				"feeds.id",
				"feeds.content",
				"feeds.created_at",
				"feeds.user_id",
				"users.username",
				"users.avatar",
			])
			.where("feed_follows.user_id", "=", user.id)
			.execute();


		post = [...userFeeds, ...followedFeeds].sort(
			(a, b) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
		);
	} else {
		latest_popular_thread = await db
			.selectFrom("threads")
			.select(["id", "title", "content", "created_at"])
			.orderBy("created_at", "desc")
			.where("is_popular", "=", true)
			.limit(1)
			.executeTakeFirst();
		latest_events = await db
			.selectFrom("events")
			.select(["id", "name", "start_date", "created_at"])
			.where("start_date", ">=", new Date())
			.orderBy("created_at", "desc")
			.execute();
	}

	return (
		<main className="flex min-h-screen flex-col">
			<Header />
			<div className="w-full max-w-5xl mx-auto p-4">
				{user ? (
					<PostList post={post} />
				) : (
					<GuestView
						latest_popular_thread={latest_popular_thread}
						latest_events={latest_events}
					/>
				)}
			</div>
			<Footer />
		</main>
	);
}

function GuestView({
	latest_popular_thread,
	latest_events,
}: {
	latest_popular_thread: any | null;
	latest_events: any[];
}) {
	return (
		<>
			<section className="mb-8">
				<h2 className="text-3xl font-bold mb-4">Welcome to GNSQ!</h2>
				<p className="mb-4">
					Join us for fun and engaging gaming sessions. Check out the latest
					forum posts below:
				</p>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{latest_popular_thread && (
					<article className="bg-white p-4 rounded shadow">
						<h3 className="text-xl font-bold mb-2">{latest_popular_thread.title}</h3>
						<p className="text-gray-7000 ">
							<span className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: bbcodeToHtml(latest_popular_thread.content) }} />
						</p>
						<Link href={`/thread/${latest_popular_thread.id}`} className="text-green-600 hover:underline">
							Read More
							</Link>
						</article>
					)}
				</div>
			</section>
			<section>
				<h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
				{latest_events.length > 0 ? (
				<ul>
					{latest_events.map((event) => (
						<li className="mb-2" key={event.id}>
							{event.name} - <strong>{event.start_date}</strong>
						</li>
					))}
					
					</ul>
				) : (
					<p>No upcoming events</p>
				)}
			</section>
		</>
	);
}
