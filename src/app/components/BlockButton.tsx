"use client";
import { useFormState, useFormStatus } from "react-dom";
import { blockUser } from "./actions";

export default function BlockButton({
	userId,
	isBlocked,
}: {
	userId: number;
	isBlocked: boolean;
}) {
	const [formState, formAction] = useFormState(blockUser, {});
	return (
		<form action={formAction} className="flex flex-col items-center gap-2">
			<input type="hidden" name="block_id" value={userId} />
			<input
				type="hidden"
				name="is_blocked"
				value={String(Number(isBlocked))}
			/>
			<SubmitButton isBlocked={isBlocked} />
			{formState.message && (
				<span className="text-gray-500">{formState.message}</span>
			)}
			{formState.error && (
				<span className="text-red-500">{formState.error}</span>
			)}
		</form>
	);
}

function SubmitButton({ isBlocked }: { isBlocked: boolean }) {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			disabled={pending}
			className={`${
				isBlocked ? "bg-red-500 hover:bg-red-700" : "bg-blue-500 hover:bg-blue-700"
			}  text-white font-bold py-2 px-4 rounded transition-colors duration-300`}
		>
			{pending ? (
				<svg
					aria-hidden="true"
					fill="none"
					strokeWidth={1.5}
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					className={`w-6 h-6 text-black animate-[spin_500ms_linear_infinite]`}
				>
					<path
						d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			) : isBlocked ? (
				"Unblock"
			) : (
				"Block"
			)}
		</button>
	);
}
