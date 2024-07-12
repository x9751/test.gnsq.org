"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			className={`bg-green-500 w-full text-white p-2 font-bold text-sm rounded-md ${
				pending ? "opacity-50 cursor-not-allowed" : ""
			}`}
		>
			{pending ? "Registering..." : "Register"}
		</button>
	);
}
