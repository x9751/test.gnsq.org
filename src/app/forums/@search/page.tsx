import SearchForm from "./form";

export default async function ForumSearch() {
	return (
		<div className="flex flex-col md:flex-row justify-between items-center gap-4 relative mb-4 bg-white rounded-lg p-4">
			<h2 className="text-2xl font-bold">Forums</h2>
			<SearchForm  />
		</div>
	)
}
