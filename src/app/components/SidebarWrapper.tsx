"use client";
import { useState } from "react";

type WrapperComponentProps = {
	sidebar: React.ReactNode;
	content: React.ReactNode;
	sidebarOpenText?: string;
	sidebarCloseText?: string;
};

export default function SiebarWrapper({
	sidebar,
	content,
	sidebarOpenText,
	sidebarCloseText,
}: WrapperComponentProps) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="flex flex-col md:flex-row min-h-screen relative overflow-hidden">
			<div
				className={`absolute md:static inset-0 top-12 md:top-0 transition-transform transform ${
					isSidebarOpen
						? "-translate-x-0"
						: "-translate-x-full md:translate-x-0"
				} w-2/3 md:w-1/4 z-20 md:z-auto`}
			>
				<div className="p-4">{sidebar}</div>
			</div>
			<div
				className={`flex-grow transition-transform transform ${
					isSidebarOpen ? "translate-x-2/3" : "translate-x-0"
				} w-full md:w-3/4 ml-auto md:mt-4`}
			>
				<button
					className="flex gap-2 md:hidden text-black font-bold p-2 my-2 bg-white rounded-md shadow items-center"
					onClick={toggleSidebar}
				>
					<svg
						aria-hidden="true"
						fill="none"
						strokeWidth={1.5}
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						className="w-8 h-8 text-black"
					>
						<path
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					{isSidebarOpen ? sidebarCloseText || "Close" : sidebarOpenText || "Menu"}
				</button>
				{content}
			</div>
		</div>
	);
}
