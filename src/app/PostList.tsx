"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import CreatePost from "./CreatePost";
import bbcodeToHtml from "./utils/bbcodeToHtml";

import CreateComment from "./CreateComment";

const Comments = dynamic(() => import("./Comments"), { loading: () => <div className="text-gray-500 animate-pulse">Loading Comments...</div> });

const PostList = ({ post }: { post: any[] }) => (
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
}: {
	username: string;
	avatar: string;
	content: string;
	timestamp: string;
	postId: number;
}) => {
	const [showComments, setShowComments] = useState(false);

	const toggleComments = () => setShowComments(!showComments);

	return (
		<article className="p-4 bg-white rounded shadow">
			<div className="flex items-start space-x-4 w-full">
				<Image
					src={avatar ?? "/default_avatar_green.png"}
					alt={`${username}'s avatar`}
					width={48}
					height={48}
					className="rounded-full"
				/>
				<div className="w-full">
					<h3 className="font-bold text-lg">{username}</h3>
					<p className="text-gray-700"><span dangerouslySetInnerHTML={{ __html: bbcodeToHtml(content) }} /></p>
					<div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
						<time dateTime={timestamp}>
							{new Date(timestamp).toLocaleDateString()}
						</time>
						<button className="hover:underline">Like</button>
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
