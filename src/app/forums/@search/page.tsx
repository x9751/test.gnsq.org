import SearchForm from "./form";

export default function ForumSearch({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const popular = searchParams.popular as string || "true";
	const search = searchParams.search as string || "";
	const order = searchParams.order as string || "asc";
	const page = searchParams.page as string || "1";
	const limit = searchParams.limit as string || "10";
	const categories = JSON.parse(
		Buffer.from(searchParams?.categories as string || "W10=", "base64").toString("utf8")
	);
	return (
		<div className="flex flex-col md:flex-row justify-between items-center gap-4 relative mb-4">
			<h2 className="text-2xl font-bold">Forums</h2>
			<SearchForm popular={popular === "true"} search={search} order={order} page={parseInt(page)} categories={categories} limit={parseInt(limit)} />
		</div>
	)
}
