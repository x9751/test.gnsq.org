"use client";

import { useState } from "react";
import BBCode from "./components/BBCode";
import { useFormStatus, useFormState } from "react-dom";
import { createPost } from "./actions";

export default function CreatePost() {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, formAction] = useFormState(createPost, {
		error: "",
		message: "",
	});
  const [contentLength, setContentLength] = useState(0);

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 active:bg-blue-400"
				type="button"
        title="Create New Post"
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
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-4 rounded-md w-full max-w-[600px]">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-bold">Create Post</h2>
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
						<form className="flex flex-col gap-4 mt-2" action={formAction}>
							<BBCode
								name="content"
								placeholder="Content"
								required
								onChange={(value) => setContentLength(value.length)}
							/>
							<p className="text-gray-500 text-sm">{contentLength} / 1000</p>
							{formState.error && (
								<p className="text-red-500 text-sm">{formState.error}</p>
							)}
							{formState.message && (
								<p className="text-green-500 text-sm">{formState.message}</p>
							)}
							<SubmitButton />
						</form>
					</div>
				</div>
			)}
		</>
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
