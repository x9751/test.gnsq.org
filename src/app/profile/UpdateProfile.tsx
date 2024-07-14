"use client";

import { useFormState, useFormStatus } from "react-dom";

import { updateProfile } from "./actions";

export default function UpdateProfileForm({
	username,
	bio,
}: {
	username: string;
	bio: string;
}) {
	const [formState, formAction] = useFormState(updateProfile, { message: "" });
	return (
		<form action={formAction} className="flex flex-col gap-4">
			<input
				type="text"
				name="username"
				placeholder={username}
				defaultValue={username}
				className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
			/>
			<input
				type="text"
				name="bio"
				placeholder={bio || "bio"}
				maxLength={100}
				defaultValue={bio}
				className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
			/>
			{/* <input
				type="file"
				name="avatar"
				className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
				accept="image/png, image/jpeg, image/jpg, image/webp, image/gif, image/svg"
			/> */}
			<p
				className={
					formState.message === "Profile updated"
						? "text-green-500"
						: "text-red-500"
				}
			>
				{formState.message}
			</p>
			<SubmitButton />
		</form>
	);
}

function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className={`bg-green-500 transition-colors duration-300 hover:bg-green-700 active:bg-green-400 w-full text-white p-2 font-bold text-sm rounded-md ${
				pending ? "opacity-50 cursor-not-allowed" : ""
			}`}
		>
			{pending ? "Loading..." : "Update"}
		</button>
	);
}
