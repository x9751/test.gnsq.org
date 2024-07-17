"use client";

import BBCode from "./components/BBCode";
import { useFormStatus, useFormState } from "react-dom";
import { createComment } from "./actions";

export default function CreatePost({ postId }: { postId: number }) {
	const [formState, formAction] = useFormState(createComment, {
		error: "",
		message: "",
	});

	return (
		<form className="flex flex-col gap-4 mt-2" action={formAction}>
			<BBCode name="content" placeholder="Comment" />
			<input type="hidden" name="postId" value={postId} />
			{formState.error && (
				<p className="text-red-500 text-sm">{formState.error}</p>
			)}
			{formState.message && (
				<p className="text-green-500 text-sm">{formState.message}</p>
			)}
			<SubmitButton />
		</form>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className={`bg-green-500 w-full text-white p-2 font-bold text-sm rounded-md ${
				pending ? "opacity-50 cursor-not-allowed" : ""
			}`}
		>
			{pending ? "Posting..." : "Post"}
		</button>
	);
}
