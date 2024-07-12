"use client";

import Image from "next/image";
import { useState } from "react";

const postData = [
	{
		username: "User1",
		avatar: "https://via.placeholder.com/50",
		content: "This is an example post content. It's engaging and interesting!",
		timestamp: "2024-07-05T12:00:00Z",
		comments: [
			{
				username: "Commenter1",
				avatar: "https://via.placeholder.com/40",
				content: "This is a comment!",
				timestamp: "2024-07-05T12:30:00Z",
			},
			{
				username: "Commenter2",
				avatar: "https://via.placeholder.com/40",
				content: "Another comment!",
				timestamp: "2024-07-05T12:45:00Z",
			},
		],
	},
	// Add more post data as needed
];

const PostList = () => (
	<section className="p-4 bg-white rounded shadow">
		<h2 className="text-3xl font-bold mb-4">Recent Posts</h2>
		<div id="post-list" className="space-y-4">
			{postData.map((post, index) => (
				<Post
					key={index}
					username={post.username}
					avatar={post.avatar}
					content={post.content}
					timestamp={post.timestamp}
					comments={post.comments}
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
	comments,
}: {
	username: string;
	avatar: string;
	content: string;
	timestamp: string;
	comments: any[];
}) => {
	const [showComments, setShowComments] = useState(false);

	const toggleComments = () => setShowComments(!showComments);

	return (
		<article className="p-4 bg-gray-100 rounded shadow">
			<div className="flex items-start space-x-4">
				<Image
					src={avatar}
					alt={`${username}'s avatar`}
					width={48}
					height={48}
					className="rounded-full"
				/>
				<div>
					<h3 className="font-bold text-lg">{username}</h3>
					<p className="text-gray-700">{content}</p>
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
						<div className="mt-4">
							{comments.map((comment, index) => (
								<Comment
									key={index}
									username={comment.username}
									avatar={comment.avatar}
									content={comment.content}
									timestamp={comment.timestamp}
								/>
							))}
						</div>
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
