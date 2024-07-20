"use client";

import { useFormState, useFormStatus } from "react-dom";
import { sendMessage } from "../actions";

export default function RespondForm({ room_id }: { room_id: string }) {
	const [formState, formAction] = useFormState(sendMessage, {});
	return (
		<div className="flex flex-col">
			<form action={formAction} className="flex items-center p-4 border-t">
				<input type="hidden" name="room_id" value={room_id} />
				<input
					type="text"
          name="message"
					placeholder="Type your message..."
					className="flex-1 p-2 border rounded"
					required
				/>
				<SendButton />
			</form>
			{formState.error && <p className="text-red-500">{formState.error}</p>}
		</div>
	);
}

function SendButton() {
	const { pending } = useFormStatus();

	return (
		<button type="submit" className="bg-green-600 text-white p-2 rounded ml-2">
			{pending ? "Sending..." : "Send"}
		</button>
	);
}
