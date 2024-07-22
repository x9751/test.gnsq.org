"use client";
import Image from "next/image";
import { useFormState, useFormStatus } from "react-dom";
import { uploadAvatar } from "./actions";
import { useRef } from "react";

const defaultAvatar = "/default_avatar_green.png";
const defaultWidth = 64;
const defaultHeight = 64;

export default function UserAvatar({
	currentAvatar,
	editable,
	width = defaultWidth,
	height = defaultHeight,
	title = "User Avatar",
}: {
	currentAvatar?: string;
	editable: boolean;
	width?: number;
	height?: number;
	title?: string;
}) {
	const [formStatus, formAction] = useFormState(uploadAvatar, {});
	const formRef = useRef<HTMLFormElement>(null);

	function onInputChanged() {
		if (formRef.current) formRef.current.requestSubmit();
	}
	return (
		<form
			className="relative group mx-auto"
			style={{ width: width, height: height }}
			action={formAction}
			ref={formRef}
		>
			<Image
				width={150}
				height={150}
				src={currentAvatar || defaultAvatar}
				alt={title}
				className="rounded-full mx-auto mb-2"
			/>
			{editable && (
				<label
					htmlFor="avatar-upload"
					className="hidden cursor-pointer absolute top-0 left-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 group-hover:flex z-20 rounded-full items-center justify-center"
				>
					<div className="flex justify-center items-center">
						<svg
							aria-hidden="true"
							fill="none"
							strokeWidth={1.5}
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							className="w-6 h-6 text-white"
						>
							<path
								d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</label>
			)}
			{formStatus.error && (
				<p className="text-red-500 py-3">{formStatus.error}</p>
			)}
			{formStatus.message && (
				<p className="text-green-500 py-3">{formStatus.message}</p>
			)}
			<FormStatus />
			<input
				type="file"
				id="avatar-upload"
				className="hidden"
				name="avatar"
				accept="image/*"
				onInput={onInputChanged}
			/>
		</form>
	);
}

function FormStatus() {
	const { pending } = useFormStatus();
	if (pending) {
		return (
			<div className="flex cursor-pointer absolute top-0 left-0 w-full h-full bg-black/50 opacity-0  z-20 rounded-full items-center justify-center">
				<div className="flex justify-center items-center">
					<svg
						aria-hidden="true"
						fill="none"
						strokeWidth={1.5}
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 text-white animate-[spin_500ms_linear_infinite]"
					>
						<path
							d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</div>
			</div>
		);
	}
	return null;
}
