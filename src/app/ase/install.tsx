"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { installDB } from "./actions";

export default function Install() {
	const [formState, formAction] = useFormState(installDB, {
		error: "",
	});
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div>
			<button
				className="bg-blue-500 text-white p-2 rounded-md"
				onClick={() => {
					setIsOpen(true);
					formAction();
				}}
			>
				InstallDB
			</button>
			{isOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white p-4 rounded-md">
						<button
							className="bg-red-500 text-white p-2 rounded-md"
							onClick={() => setIsOpen(false)}
						>
							Close
						</button>
						{formState.error && (
							<p className="text-red-500">{formState.error}</p>
						)}
						{formState.message && (
							<p className="text-green-500">{formState.message}</p>
						)}
						{!formState.error && !formState.message && <p>Installing...</p>}
					</div>
				</div>
			)}
		</div>
	);
}
