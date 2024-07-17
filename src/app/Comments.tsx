import Image from "next/image";
import { useEffect, useState } from "react";

export default function Comments({ postId }: { postId: number }) {
	const [comments, setComments] = useState<
		{
			id: number;
			content: string;
			created_at: string;
			username: string;
			avatar: string;
		}[]
	>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch(`/api/comments?postId=${postId}`)
			.then((res) => res.json())
			.then((data) => {
				setComments(data);
				setIsLoading(false);
			});
	}, [postId]);

	if (isLoading)
		return (
			<div className="text-gray-500 animate-pulse">Loading Comments...</div>
		);
	if (comments.length === 0)
		return <div className="text-gray-500">No comments found</div>;

	return (
		<div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto">
			{comments.map((comment) => (
				<Comment
					key={comment.id}
					username={comment.username}
					avatar={comment.avatar}
					content={comment.content}
					timestamp={comment.created_at}
				/>
			))}
		</div>
	);
}

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
		<Image
			src={avatar ?? "/default_avatar_green.png"}
			alt={`${username}'s avatar`}
			className="w-8 h-8 rounded-full"
			width={32}
			height={32}
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
