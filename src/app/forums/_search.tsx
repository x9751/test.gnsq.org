"use client";

import { useCallback, useMemo, useState } from "react";

const tempCategories = [
	{ id: 1, name: "General Discussion" },
	{ id: 2, name: "Technical Support" },
	{ id: 3, name: "Sales" },
	{ id: 4, name: "Marketing" },
	{ id: 5, name: "Customer Service" },
];

export default function ForumSearch() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [showCategories, setShowCategories] = useState(false);
	const [search, setSearch] = useState("");
	const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
	const [sort, setSort] = useState<"asc" | "desc">("asc");
	const [popular, setPopular] = useState(true);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	const serachPlaceholder = useMemo(() => {
		if (selectedCategories.length === 0) {
			return `Search`;
		}
		const categories = tempCategories.filter((category) =>
			selectedCategories.includes(category.id)
		);
		return `Search ${categories.map((category) => category.name).join(", ")}`;
	}, [selectedCategories]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleCategoryChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		categoryId: number
	) => {
		if (e.target.checked) {
			setSelectedCategories([...selectedCategories, categoryId]);
		} else {
			setSelectedCategories(
				selectedCategories.filter((id) => id !== categoryId)
			);
		}
	};

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			console.log(search, selectedCategories, sort, popular, page, limit);
		},
		[search, selectedCategories, sort, popular, page, limit]
	);

	return (
		<div className="flex justify-end items-center gap-4 relative">
			<form
				className="flex items-center gap-2 relative"
				onSubmit={handleSubmit}
			>
				<div className="relative">
					<input
						type="text"
						placeholder={serachPlaceholder}
						className="w-full p-2 rounded-lg bg-gray-200"
						value={search}
						onInput={handleSearch}
					/>
				</div>

				<button
					type="submit"
					className="p-2 rounded-lg bg-gray-200"
					title="Search"
				>
					Search
				</button>
				<button
					className={`p-2 rounded-lg bg-gray-200 ${
						menuOpen ? "bg-gray-300" : ""
					}`}
					title="Menu"
					onClick={() => setMenuOpen(!menuOpen)}
					type="button"
				>
					<svg
						aria-hidden="true"
						fill="none"
						strokeWidth={1.5}
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						className="w-6 h-6 text-black"
					>
						<path
							d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
						<path
							d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>

				{menuOpen && (
					<div className="absolute top-12 right-0 opacity-0 animate-slideRightAndFade bg-white rounded-lg flex flex-col">
						<label className="flex items-center gap-2 p-2 pl-4 border-b">
							<input
								type="checkbox"
								checked={popular}
								onChange={(e) => setPopular(e.target.checked)}
							/>
							<span>Popular</span>
						</label>
						<div className="flex items-center gap-2 p-2 pl-4 border-b">
							<span className="text-sm font-medium whitespace-nowrap">
								Sort
							</span>
							<select
								className="w-full p-2 rounded-lg bg-transparent border selection:bg-white"
								value={sort}
								onChange={(e) => setSort(e.target.value as "asc" | "desc")}
							>
								<option value="asc">Ascending</option>
								<option value="desc">Descending</option>
							</select>
						</div>
						<div className="relative">
							<button
								type="button"
								className="p-2 pl-4 rounded-lg flex items-center gap-2 relative"
								onClick={() => setShowCategories(!showCategories)}
							>
								<span>Categories</span>
								<svg
									aria-hidden="true"
									fill="none"
									strokeWidth={1.5}
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									className={`w-4 h-4 transition-transform duration-300 ${
										showCategories ? "rotate-90" : ""
									}`}
								>
									<path
										d="m8.25 4.5 7.5 7.5-7.5 7.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
							{showCategories && (
								<div className="absolute border border-gray-200 bottom-0 translate-y-full right-0 left-0 bg-white rounded-lg shadow-lg">
									<ul className="p-2">
										{tempCategories.map((category) => (
											<li key={category.id}>
												<label className="flex gap-2 cursor-pointer py-1">
													<input
														type="checkbox"
														onChange={(e) =>
															handleCategoryChange(e, category.id)
														}
														checked={selectedCategories.includes(category.id)}
													/>
													<span className="text-sm font-medium whitespace-nowrap">
														{category.name}
													</span>
												</label>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>
				)}
			</form>
		</div>
	);
}
