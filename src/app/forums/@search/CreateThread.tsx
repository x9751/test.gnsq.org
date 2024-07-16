"use client";

import { useState } from "react";
import { useFormStatus, useFormState } from "react-dom";

import { createThread } from "./actions";
import Select from "@/app/components/Select";
import BBCode from "@/app/components/BBCode";

export default function CreateThread({ categories }: { categories: { id: number, name: string }[] }) {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, formAction] = useFormState(createThread, {});
	return (
		<>
			<button
				className="bg-green-500 text-white px-4 py-2 rounded-md"
				onClick={() => setIsOpen(true)}
			>
				Create Thread
			</button>
			{isOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-4 rounded-md w-full max-w-[600px]">
						<div className="flex items-center justify-between">
							<h2 className="text-lg font-bold">Create Thread</h2>
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
							<input
								name="title"
								required
								type="text"
								placeholder="Title"
								className="w-full p-2 rounded-md border-2 border-gray-3000 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
							/>
							<Select
								options={categories.map((category) => ({
									label: category.name,
									value: category.id.toString(),
								}))}
								placeholder="Select Category"
								name="category"
								required
							/>
							{/* <textarea
								name="content"
								required
								placeholder="Content"
								className="w-full resize-none p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
							/> */}
							<BBCode name="content" placeholder="Content" />
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
			{pending ? "Creating..." : "Create"}
		</button>
	);
}
