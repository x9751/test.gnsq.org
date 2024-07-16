import Highlight from "@/app/components/Highlight";

export default async function Forum({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const popular = (searchParams.popular as string) || "true";
	const search = (searchParams.search as string) || "";
	const order = (searchParams.order as string) || "asc";
	const page = (searchParams.page as string) || "1";
	const limit = (searchParams.limit as string) || "10";
	const categories = JSON.parse(
		Buffer.from(
			(searchParams?.categories as string) || "W10=",
			"base64"
		).toString("utf8")
	);
	return (
		<section className="w-full ">
			<div className="bg-white p-4 rounded shadow mb-4">
				<h3 className="text-xl font-bold mb-2">
					<Highlight text="Thread Title" highlight={search} />
				</h3>
				<p className="text-gray-700 mb-2">
					Started by{" "}
					<a href="#" className="text-green-600 hover:underline">
						User123
					</a>
				</p>
				<p className="text-gray-700">
					Last reply by{" "}
					<a href="#" className="text-green-6000 hover:underline">
						User456
					</a>{" "}
					at <time className="text-gray-7000">July 5, 2024</time>
				</p>
				<a href="#" className="text-green-6000 hover:underline">
					Read More
				</a>
			</div>

			<div className="bg-white p-4 rounded shadow mb-4">
				<h3 className="text-xl font-bold mb-2">
					<Highlight text="Thread Title" highlight={search} />
				</h3>
				<p className="text-gray-700 mb-2">
					Started by{" "}
					<a href="#" className="text-green-600 hover:underline">
						User123
					</a>
				</p>
				<p className="text-gray-700">
					Last reply by{" "}
					<a href="#" className="text-green-6000 hover:underline">
						User456
					</a>{" "}
					at <time className="text-gray-7000">July 5, 2024</time>
				</p>
				<a href="#" className="text-green-6000 hover:underline">
					Read More
				</a>
			</div>

			<nav className="mt-4">
				<ul className="flex justify-center space-x-2">
					<li>
						<a
							href="#"
							className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
						>
							1
						</a>
					</li>
					<li>
						<a
							href="#"
							className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
						>
							2
						</a>
					</li>
					<li>
						<a
							href="#"
							className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
						>
							3
						</a>
					</li>
				</ul>
			</nav>
		</section>
	);
	// return <JsonPrettifier jsonString={JSON.stringify({ popular: popular === "true", search, order, page: parseInt(page), categories, limit: parseInt(limit) })} />;
}

function syntaxHighlight(json: string) {
	if (typeof json != "string") {
		json = JSON.stringify(json, undefined, 2);
	}
	json = json
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;");
	return json.replace(
		/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*?"(\s*:)?|\b(true|false|null)\b|\b-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?\b)/g,
		function (match) {
			var cls = "text-gray-500";
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					cls = "text-yellow-500";
				} else {
					cls = "text-blue-500";
				}
			} else if (/true|false/.test(match)) {
				cls = "text-green-500";
			} else if (/null/.test(match)) {
				cls = "text-red-500";
			}
			return '<span class="' + cls + '">' + match + "</span>";
		}
	);
}

const prettifyJson = (jsonString: string) => {
	try {
		const jsonObj = JSON.parse(jsonString);
		const prettyJsonString = JSON.stringify(jsonObj, null, 2);
		return syntaxHighlight(prettyJsonString);
	} catch (e) {
		return "Error: Invalid JSON";
	}
};

const JsonPrettifier = ({ jsonString }: { jsonString: string }) => {
	const prettyHtml = prettifyJson(jsonString);
	return (
		<pre
			className="bg-black text-white p-4 text-wrap"
			dangerouslySetInnerHTML={{ __html: prettyHtml }}
		/>
	);
};
