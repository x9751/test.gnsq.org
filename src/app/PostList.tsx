"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import CreatePost from "./CreatePost";
import bbcodeToHtml from "./utils/bbcodeToHtml";

import CreateComment from "./CreateComment";
import Link from "next/link";
import { FeedPost } from "./types";
import LikeFeed from "./LikeFeed";
import UserAvatar from "./components/UserAvatar";

const Comments = dynamic(() => import("./Comments"), {
	loading: () => (
		<div className="text-gray-500 animate-pulse">Loading Comments...</div>
	),
});

const PostList = ({ post }: { post: FeedPost[] }) => (
	<section className="flex flex-col gap-4">
		<div className="flex justify-between">
			<h1 className="text-2xl font-bold">Feed</h1>
			<CreatePost />
		</div>
		<div id="post-list" className="space-y-4">
			{post.map((post, index) => (
				<Post
					key={index}
					username={post.username}
					avatar={post.avatar}
					content={post.content}
					timestamp={post.created_at}
					postId={post.id}
					liked={post.liked ?? false}
					likes={post.likes ?? 0}
				/>
			))}
		</div>
	</section>
);

const Post = ({
	username,
	avatar,
	content,
	timestamp,
	postId,
	liked,
	likes,
}: {
	username: string;
	avatar: string | null;
	content: string;
	timestamp: Date;
	postId: number;
	liked: boolean;
	likes: number;
}) => {
	const [showComments, setShowComments] = useState(false);

	const toggleComments = () => setShowComments(!showComments);

	return (
		<article className="p-4 bg-white rounded shadow">
			<div className="flex items-start space-x-4 w-full">
				<UserAvatar
					currentAvatar={avatar}
					width={48}
					height={48}
				/>
				<div className="w-full">
					<h3 className="font-bold text-lg">
						<Link href={`/profile/${username}`} className="hover:underline">
							{username}
						</Link>
					</h3>
					<p className="text-gray-700">
						<span
							className="whitespace-pre-wrap"
							dangerouslySetInnerHTML={{ __html: bbcodeToHtml(content) }}
						/>
					</p>
					<div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
						<time dateTime={timestamp.toISOString()}>
							{new Date(timestamp).toLocaleDateString()}
						</time>
						<div className="flex gap-1">
							<LikeFeed feed_id={postId} serverLiked={liked} />
							<span>{likes}</span>
						</div>
						<button className="hover:underline" onClick={toggleComments}>
							{showComments ? "Hide Comments" : "Show Comments"}
						</button>
					</div>
					{showComments && (
						<div className="mt-4 flex flex-col gap-2 border-t border-gray-200 pt-4">
							<Comments postId={postId} />
							<div className="mt-4 w-full max-w-[600px] flex flex-col">
								<h4 className="text-lg font-bold">Create Comment</h4>
								<CreateComment postId={postId} />
							</div>
						</div>
					)}
				</div>
			</div>
		</article>
	);
};

export default PostList;
