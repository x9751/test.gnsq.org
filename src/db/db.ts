import { Generated, ColumnType, sql } from "kysely";
import { createKysely } from "@vercel/postgres-kysely";

interface Database {
	users: User;
	roles: Role;
	sessions: Session;
	categories: Category;
	threads: Thread;
	thread_posts: ThreadPost;
	feeds: Feed;
	feed_likes: FeedLike;
	feed_images: FeedImage;
	feed_videos: FeedVideo;
	feed_follows: FeedFollow;
	feed_comments: FeedComment;
	blocked_users: BlockedUser;
	achievements: Achievement;
	user_achievements: UserAchievement;
	events: Events;
	activities: Activity;
	rooms: Room;
	user_rooms: UserRoom;
	messages: Message;
	contacts: Contact;
}

const db = createKysely<Database>();

export default db;

export interface User {
	id: Generated<number>;
	name: string | null;
	username: string;
	email: string;
	password: string;
	salt: string;
	role_id: number;
	avatar: string | null;
	bio: string | null;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export interface Session {
	id: Generated<number>;
	user_id: number;
	token: string;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export interface Role {
	id: Generated<number>;
	name: string;
	permissions: string[];
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export interface Category {
	id: Generated<number>;
	name: string;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export interface Thread {
	id: Generated<number>;
	title: string;
	content: string;
	user_id: number;
	category_id: number;
	views: number;
	is_pinned: boolean;
	is_locked: boolean;
	is_hidden: boolean;
	is_popular: boolean;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export interface ThreadPost {
	id: Generated<number>;
	content: string;
	user_id: number;
	thread_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export interface Feed {
	id: Generated<number>;
	content: string;
	user_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export interface FeedFollow {
	id: Generated<number>;
	user_id: number;
	following_user_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
}

export interface FeedVideo {
	id: Generated<number>;
	feed_id: number;
	video: string;
	created_at: ColumnType<Date, string | undefined, never>;
}

export interface FeedImage {
	id: Generated<number>;
	feed_id: number;
	image: string;
	created_at: ColumnType<Date, string | undefined, never>;
}

export interface FeedLike {
	id: Generated<number>;
	user_id: number;
	feed_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
}

export interface FeedComment {
	id: Generated<number>;
	content: string;
	user_id: number;
	feed_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export interface BlockedUser {
	id: Generated<number>;
	user_id: number;
	blocked_user_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
}

export interface Achievement {
	id: Generated<number>;
	name: string;
	description: string;
	icon: string;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export interface UserAchievement {
	id: Generated<number>;
	user_id: number;
	achievement_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export interface Events {
	id: Generated<number>;
	name: string;
	description: string;
	location: string;
	date: ColumnType<Date, string | undefined, never>;
	time: ColumnType<Date, string | undefined, never>;
	image: string | null;
	user_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export interface Activity {
	id: Generated<number>;
	user_id: number;
	action: string;
	reference_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
}

export interface Room {
	id: Generated<number>;
	name: string;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export interface UserRoom {
	id: Generated<number>;
	user_id: number;
	room_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export interface Message {
	id: Generated<number>;
	content: string;
	user_id: number;
	room_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

export interface Contact {
	id: Generated<number>;
	name: string;
	email: string;
	subject: string;
	message: string;
	user_id: number | null;
	created_at: ColumnType<Date, string | undefined, never>;
}

async function install() {
	try {
		await db.schema
			.createTable("users")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("name", "varchar(255)")
			.addColumn("username", "varchar(255)", (col) => col.notNull().unique())
			.addColumn("email", "varchar(255)", (col) => col.notNull().unique())
			.addColumn("password", "text", (col) => col.notNull())
			.addColumn("salt", "varchar(255)", (col) => col.notNull())
			.addColumn("role_id", "integer", (col) => col.notNull())
			.addColumn("avatar", "varchar(255)")
			.addColumn("bio", "text")
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.addColumn("updated_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("roles")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("name", "varchar(255)", (col) => col.notNull().unique())
			.addColumn("permissions", "json", (col) => col.notNull())
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.addColumn("updated_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("sessions")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("user_id", "integer", (col) =>
				col.notNull().references("users.id")
			)
			.addColumn("token", "varchar(255)", (col) => col.notNull().unique())
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.addColumn("updated_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("categories")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("name", "varchar(255)", (col) => col.notNull().unique())
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.addColumn("updated_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();


		await db.schema
			.createTable("threads")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("title", "varchar(255)", (col) => col.notNull())
			.addColumn("content", "text", (col) => col.notNull())
			.addColumn("category_id", "integer", (col) =>
				col.notNull().references("categories.id")
			)
			.addColumn("user_id", "integer", (col) =>
				col.notNull().references("users.id")
			)
			.addColumn("views", "integer", (col) => col.notNull().defaultTo(0))
			.addColumn("is_pinned", "boolean", (col) =>
				col.notNull().defaultTo(false)
			)
			.addColumn("is_locked", "boolean", (col) =>
				col.notNull().defaultTo(false)
			)
			.addColumn("is_hidden", "boolean", (col) =>
				col.notNull().defaultTo(false)
			)
			.addColumn("is_popular", "boolean", (col) =>
				col.notNull().defaultTo(false)
			)
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.addColumn("updated_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("thread_posts")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("content", "text", (col) => col.notNull())
			.addColumn("user_id", "integer", (col) =>
				col.notNull().references("users.id")
			)
			.addColumn("thread_id", "integer", (col) =>
				col.notNull().references("threads.id")
			)
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.addColumn("updated_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("feeds")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("content", "text", (col) => col.notNull())
			.addColumn("user_id", "integer", (col) =>
				col.notNull().references("users.id")
			)
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.addColumn("updated_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("feed_likes")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("user_id", "integer", (col) =>
				col.notNull().references("users.id")
			)
			.addColumn("feed_id", "integer", (col) =>
				col.notNull().references("feeds.id")
			)
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("feed_images")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("feed_id", "integer", (col) =>
				col.notNull().references("feeds.id")
			)
			.addColumn("image", "varchar(255)", (col) => col.notNull())
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("feed_videos")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("feed_id", "integer", (col) =>
				col.notNull().references("feeds.id")
			)
			.addColumn("video", "varchar(255)", (col) => col.notNull())
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("feed_follows")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("user_id", "integer", (col) =>
				col.notNull().references("users.id")
			)
			.addColumn("following_user_id", "integer", (col) =>
				col.notNull().references("users.id")
			)
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("feed_comments")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("content", "text", (col) => col.notNull())
			.addColumn("user_id", "integer", (col) =>
				col.notNull().references("users.id")
			)
			.addColumn("feed_id", "integer", (col) =>
				col.notNull().references("feeds.id")
			)
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.addColumn("updated_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await

		await db.schema
			.createTable("achievements")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("name", "varchar(255)", (col) => col.notNull().unique())
			.addColumn("description", "text", (col) => col.notNull())
			.addColumn("icon", "varchar(255)", (col) => col.notNull())
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.addColumn("updated_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("user_achievements")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("user_id", "integer", (col) =>
				col.notNull().references("users.id")
			)
			.addColumn("achievement_id", "integer", (col) =>
				col.notNull().references("achievements.id")
			)
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.addColumn("updated_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("events")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("name", "varchar(255)", (col) => col.notNull())
			.addColumn("description", "text", (col) => col.notNull())
			.addColumn("location", "varchar(255)", (col) => col.notNull())
			.addColumn("date", "date", (col) => col.notNull())
			.addColumn("time", "time", (col) => col.notNull())
			.addColumn("image", "varchar(255)")
			.addColumn("user_id", "integer", (col) =>
				col.notNull().references("users.id")
			)
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.addColumn("updated_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("activities")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("user_id", "integer", (col) =>
				col.notNull().references("users.id")
			)
			.addColumn("action", "varchar(255)", (col) => col.notNull())
			.addColumn("reference_id", "integer", (col) => col.notNull())
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("rooms")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("name", "varchar(255)", (col) => col.notNull())
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.addColumn("updated_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("user_rooms")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("user_id", "integer", (col) =>
				col.notNull().references("users.id")
			)
			.addColumn("room_id", "integer", (col) =>
				col.notNull().references("rooms.id")
			)
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.addColumn("updated_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("messages")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("content", "text", (col) => col.notNull())
			.addColumn("user_id", "integer", (col) =>
				col.notNull().references("users.id")
			)
			.addColumn("room_id", "integer", (col) =>
				col.notNull().references("rooms.id")
			)
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.addColumn("updated_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db.schema
			.createTable("contacts")
			.addColumn("id", "serial", (col) => col.primaryKey())
			.addColumn("name", "varchar(255)", (col) => col.notNull())
			.addColumn("email", "varchar(255)", (col) => col.notNull())
			.addColumn("message", "text", (col) => col.notNull())
			.addColumn("user_id", "integer", (col) =>
				col.notNull().references("users.id")
			)
			.addColumn("created_at", "timestamp", (col) =>
				col.defaultTo(sql`CURRENT_TIMESTAMP`)
			)
			.execute();

		await db
			.insertInto("roles")
			.values({
				name: "user",
				permissions: ["user"],
			})
			.execute();
		await db
			.insertInto("roles")
			.values({
				name: "admin",
				permissions: ["admin"],
			})
			.execute();

		await db
			.insertInto("categories")
			.values([
				{
					name: "General",
				},
				{
					name: "PC Games",
				},
				{
					name: "Mobile Games",
				},
				{
					name: "Anime",
				},
				{
					name: "Art",
				},
				{
					name: "Music",
				},
				{
					name: "Movies",
				},
				{
					name: "Books",
				},
				{
					name: "Food",
				},
			])
			.execute();

		console.log("Database tables created successfully");
	} catch (error) {
		console.error("Error creating database tables:", error);
		throw error;
	}
}

export { install };
