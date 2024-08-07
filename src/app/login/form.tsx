"use client";

import { useFormState } from "react-dom";
import { login } from "./action";
import SubmitButton from "./SubmitButton";

const initialState = {
	message: "",
};

export default function LoginForm({ redirect }: { redirect: string }) {
	const [state, formAction] = useFormState(login, initialState);
	return (
		<form
			className="flex flex-col gap-2 items-center p-4 bg-white rounded-lg shadow-md"
			action={formAction}
		>
			<input type="hidden" name="redirect" value={redirect} />
			<input
				id="email"
				autoComplete="email"
				name="email"
				type="email"
				placeholder="Email"
				className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
			/>
			<input
				id="password"
				autoComplete="password"
				name="password"
				type="password"
				placeholder="Password"
				className="w-full p-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
			/>
			<SubmitButton />
			{state.message && <p className="text-red-500">{state.message}</p>}
		</form>
	);
}
