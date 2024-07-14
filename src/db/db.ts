import { Generated, ColumnType, sql } from "kysely";
import { createKysely } from "@vercel/postgres-kysely";

interface Database {
	users: User;
	roles: Role;
	sessions: Session;
	forums: Forum;
	categories: Category;
	threads: Thread;
	thread_posts: ThreadPost;
	feeds: Feed;
	feed_comments: FeedComment;
	achievements: Achievement;
	user_achievements: UserAchievement;
	events: Events;
	activities: Activity;
}

const db = createKysely<Database>();

export default db;

interface User {
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

interface Session {
	id: Generated<number>;
	user_id: number;
	token: string;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

interface Role {
	id: Generated<number>;
	name: string;
	permissions: string[];
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

interface Forum {
	id: Generated<number>;
	title: string;
	description: string;
	category_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

interface Category {
	id: Generated<number>;
	name: string;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

interface Thread {
	id: Generated<number>;
	title: string;
	content: string;
	user_id: number;
	forum_id: number;
	views: number;
	is_pinned: boolean;
	is_locked: boolean;
	is_hidden: boolean;
	is_popular: boolean;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

interface ThreadPost {
	id: Generated<number>;
	content: string;
	user_id: number;
	thread_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

interface Feed {
	id: Generated<number>;
	content: string;
	user_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

interface FeedComment {
	id: Generated<number>;
	content: string;
	user_id: number;
	feed_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

interface Achievement {
	id: Generated<number>;
	name: string;
	description: string;
	icon: string;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

interface UserAchievement {
	id: Generated<number>;
	user_id: number;
	achievement_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
	updated_at: ColumnType<Date, string | undefined, never>;
}

interface Events {
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

interface Activity {
	id: Generated<number>;
	user_id: number;
	action: string;
	reference_id: number;
	created_at: ColumnType<Date, string | undefined, never>;
}
