"use client";

import Image from "next/image";
import { useState } from "react";
import CreatePost from "./CreatePost";
import bbcodeToHtml from "./utils/bbcodeToHtml";


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
}: {
	username: string;
	avatar: string;
	content: string;
	timestamp: string;
}) => {
	const [showComments, setShowComments] = useState(false);

	const toggleComments = () => setShowComments(!showComments);

	return (
		<article className="p-4 bg-white rounded shadow">
			<div className="flex items-start space-x-4">
				<Image
					src={avatar ?? "/default_avatar_green.png"}
					alt={`${username}'s avatar`}
					width={48}
					height={48}
					className="rounded-full"
				/>
				<div>
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
						null
					)}
				</div>
			</div>
		</article>
	);
};

const Comment = ({
	username,
	avatar,
	content,
	timestamp,
}: {
	username: string;
	avatar: string;
	content: string;
	timestamp: string;
}) => (
	<div className="flex items-start space-x-4 mt-4">
		<img
			src={avatar}
			alt={`${username}'s avatar`}
			className="w-8 h-8 rounded-full"
		/>
		<div>
			<h4 className="font-bold text-md">{username}</h4>
			<p className="text-gray-700">{content}</p>
			<time className="text-sm text-gray-500" dateTime={timestamp}>
				{new Date(timestamp).toLocaleDateString()}
			</time>
		</div>
	</div>
);

export default PostList;
