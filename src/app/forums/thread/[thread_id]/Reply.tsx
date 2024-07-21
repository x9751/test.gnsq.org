"use client";

import BBCodeEditor from "@/app/components/BBCode";
import { useFormState, useFormStatus } from "react-dom";
import { replyToThread } from "./actions";

export default function ReplyThread({ thread_id }: { thread_id: number }) {
	const [formState, formAction] = useFormState(replyToThread, {
		error: "",
		message: "",
	});
	return (
		<>
			<form className="flex gap-4 border-t p-4" action={formAction}>
				<input type="hidden" name="thread_id" value={thread_id} />
				<BBCodeEditor name="content" placeholder="Reply to thread..." />
				<SubmitButton />
			</form>
			{formState.error && <p className="text-red-500">{formState.error}</p>}
			{formState.message && (
				<p className="text-green-500">{formState.message}</p>
			)}
		</>
	);
}

function SubmitButton() {
	const { pending} = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
		>
			{pending ? "Replying..." : "Reply"}
		</button>
	);
}
