"use client";

import Select from "@/app/components/Select";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

// const tempCategories = [
// 	{ id: 1, name: "General Discussion" },
// 	{ id: 2, name: "Technical Support" },
// 	{ id: 3, name: "Sales" },
// 	{ id: 4, name: "Marketing" },
// 	{ id: 5, name: "Customer Service" },
// ];

type SearchFormProps = {
	popular: boolean;
	search: string;
	order: string;
	limit: number;
	page: number;
	categories: number[];
};

let timer: ReturnType<typeof setTimeout>;
function delayedSearch(
	search: string,
	popular: boolean,
	sort: string,
	page: number,
	limit: number,
	selectedCategories: number[],
	router: any,
	setLoading: (loading: boolean) => void,
	delay: number = 500
) {
	clearTimeout(timer);
	timer = setTimeout(() => {
		setLoading(true);
		const categories = Buffer.from(JSON.stringify(selectedCategories)).toString(
			"base64"
		);
		router.push(
			`/forums?search=${encodeURIComponent(
				search
			)}&popular=${popular}&order=${sort}&page=${page}&limit=${limit}&categories=${categories}`
		);
	}, delay);
}

export default function SearchForm({
	categories,
}: {
	categories: { id: number; name: string }[];
}) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const props = useMemo(() => {
		return {
			search: searchParams.get("search") || "",
			popular: searchParams.get("popular")
				? searchParams.get("popular") === "true"
				: true,
			order: searchParams.get("order") || "asc",
			page: searchParams.get("page") ? Number(searchParams.get("page")) : 1,
			limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
			categories: searchParams.get("categories")
				? JSON.parse(
						Buffer.from(
							searchParams.get("categories") as string,
							"base64"
						).toString()
				  )
				: [],
		};
	}, [searchParams]);

	console.log(props);

	const [menuOpen, setMenuOpen] = useState(false);
	const [showCategories, setShowCategories] = useState(false);
	const [search, setSearch] = useState(props.search);
	const [selectedCategories, setSelectedCategories] = useState<number[]>(
		props.categories
	);
	const [sort, setSort] = useState<"asc" | "desc">(
		props.order as "asc" | "desc"
	);
	const [popular, setPopular] = useState(props.popular);
	const [page, setPage] = useState(props.page);
	const [limit, setLimit] = useState(props.limit);
	const [loading, setLoading] = useState(false);
	const [searching, setSearching] = useState(false);
	const [filtering, setFiltering] = useState(false);

	const serachPlaceholder = useMemo(() => {
		if (selectedCategories.length === 0) {
			return `Search`;
		}
		const filteredCategories = categories.filter((category) =>
			selectedCategories.includes(category.id)
		);
		return `Search ${filteredCategories.map((category) => category.name).join(", ")}`;
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
			if (
				search === props.search &&
				popular === props.popular &&
				sort === props.order &&
				page === props.page &&
				limit === props.limit &&
				selectedCategories.length === props.categories.length &&
				selectedCategories.every(
					(category, index) => category === props.categories[index]
				)
			) {
				return;
			}
			if (search.length < 3) {
				setSearching(false);
				return;
			}
			setSearching(true);
			delayedSearch(
				search,
				popular,
				sort,
				page,
				limit,
				selectedCategories,
				router,
				setLoading,
				0
			);
		},
		[search, selectedCategories, sort, popular, page, limit, router, props]
	);

	const togglePopular = () => {
		setPopular(!popular);
	};

	useEffect(() => {
		if (
			search === props.search &&
			popular === props.popular &&
			sort === props.order &&
			page === props.page &&
			limit === props.limit &&
			selectedCategories.length === props.categories.length &&
			selectedCategories.every(
				(category, index) => category === props.categories[index]
			)
		) {
			return;
		}
		setFiltering(true);
		delayedSearch(
			search,
			popular,
			sort,
			page,
			limit,
			selectedCategories,
			router,
			setLoading
		);
	}, [popular, sort, page, limit, selectedCategories, router]);

	useEffect(() => {
		setLoading(false);
		setSearching(false);
		setFiltering(false);
	}, [searchParams]);

	return (
		<form className="flex items-center gap-2 relative" onSubmit={handleSubmit}>
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
				{searching && loading ? "Searching..." : "Search"}
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
					className={`w-6 h-6 text-black ${
						loading && filtering ? "animate-[spin_500ms_linear_infinite]" : ""
					}`}
				>
					{loading && filtering ? (
						<path
							d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					) : (
						<path
							d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					)}
				</svg>
			</button>

			{menuOpen && (
				<div className="absolute top-14 right-0 bg-white rounded-lg flex flex-col shadow-lg z-20 border border-gray-200">
					<div className="absolute inline-block -translate-x-full -translate-y-full top-0 right-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-transparent">
						<span className="absolute -top-[1px] -left-[1px] w-0 h-0 border-l-[11px] border-l-transparent border-r-[11px] border-r-transparent border-b-[11px] border-b-gray-200"></span>
						<span className="absolute w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-white"></span>
					</div>
					<label className="flex items-center gap-2 p-2 pl-4 border-b">
						<input
							type="checkbox"
							disabled={loading && filtering}
							checked={popular}
							onChange={togglePopular}
						/>
						<span>Popular</span>
					</label>
					<div className="flex items-center gap-2 p-2 pl-4 border-b">
						<span className="text-sm font-medium whitespace-nowrap">Sort</span>
						<Select
							disabled={loading && filtering}
							options={[
								{ value: "asc", label: "Ascending" },
								{ value: "desc", label: "Descending" },
							]}
							value={sort}
							onChange={(value) => setSort(value as "asc" | "desc")}
						/>
					</div>
					<div className="relative border-b">
						<button
							type="button"
							className="p-2 pl-4 rounded-lg flex items-center gap-2 relative"
							onClick={() => setShowCategories(!showCategories)}
							disabled={loading && filtering}
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
							<div className="absolute border z-30 border-gray-200 bottom-0 translate-y-full right-0 left-0 bg-white rounded-lg shadow-lg">
								<ul className="p-2">
									{categories.map((category) => (
										<li key={category.id}>
											<label className="flex gap-2 cursor-pointer py-1 items-center">
												<input
													type="checkbox"
													onChange={(e) => handleCategoryChange(e, category.id)}
													checked={selectedCategories.includes(category.id)}
													disabled={loading && filtering}
												/>
												<span className="font-medium whitespace-nowrap">
													{category.name}
												</span>
											</label>
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
					<div className="flex items-center gap-2 p-2 pl-4">
						<span className="text-sm font-medium whitespace-nowrap">Limit</span>
						<Select
							disabled={loading && filtering}
							options={[
								{ value: "10", label: "10" },
								{ value: "25", label: "25" },
								{ value: "50", label: "50" },
								{ value: "100", label: "100" },
							]}
							value={limit.toString()}
							onChange={(value) => setLimit(Number(value))}
						/>
					</div>
				</div>
			)}
		</form>
	);
}
