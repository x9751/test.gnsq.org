"use client";

import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Modal from "../components/Modal";
import { createNewRoom } from "./actions";

export default function NewChat() {
	const [isOpen, setIsOpen] = useState(false);
	const [formStatus, formAction] = useFormState(createNewRoom, {
		message: "",
	});

	return (
		<>
			<button
				className="p-2 rounded-md text-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
				onClick={() => setIsOpen(true)}
			>
				<svg
					aria-hidden="true"
					fill="none"
					strokeWidth={1.5}
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					className="w-6 h-6 "
				>
					<path
						d="M12 4.5v15m7.5-7.5h-15"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>
			{isOpen && (
				<Modal>
					<form action={formAction} className="flex flex-col gap-4">
						<div className="flex justify-between items-center">
							<h2 className="text-2xl font-bold">New Chat</h2>
							<button
								className="text-gray-500 p-2 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
								onClick={() => setIsOpen(false)}
							>
								<svg
									aria-hidden="true"
									fill="none"
									strokeWidth={1.5}
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									className="w-6 h-6"
								>
									<path
										d="M6 18 18 6M6 6l12 12"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
						<input
							name="room_name"
							placeholder="Room Name"
							className="p-2 rounded-md border-2 border-gray-300"
						/>
						<input
							name="username"
							placeholder="Username *"
							className="p-2 rounded-md border-2 border-gray-300"
						/>
						<textarea
							name="message"
							placeholder="Message *"
							className="p-2 rounded-md border-2 border-gray-300"
						/>
						{formStatus.error && (
							<p className="text-red-600">{formStatus.error}</p>
						)}
						{formStatus.message && (
							<p className="text-green-600">{formStatus.message}</p>
						)}
						<SubmitButton />
					</form>
				</Modal>
			)}
		</>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button
			type="submit"
			className="p-2 rounded-md bg-green-600 text-white"
			disabled={pending}
		>
			{pending ? "Submitting..." : "Send"}
		</button>
	);
}
