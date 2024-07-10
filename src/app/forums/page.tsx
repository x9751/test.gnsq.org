
export default async function Forum({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) {
	const popular = searchParams.popular as string || "";
	const search = searchParams.search as string || "";
	const order = searchParams.order as string || "";
	const page = searchParams.page as string || "";
	const limit = searchParams.limit as string || "";
	const categories = JSON.parse(
		Buffer.from(searchParams?.categories as string || "e30=", "base64").toString("utf8")
	);
	await new Promise((resolve) => setTimeout(resolve, 2000));
	return <JsonPrettifier jsonString={JSON.stringify({ popular: popular === "true", search, order, page: parseInt(page), categories, limit: parseInt(limit) })} />;
}

function syntaxHighlight(json: string) {
	if (typeof json != 'string') {
			json = JSON.stringify(json, undefined, 2);
	}
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*?"(\s*:)?|\b(true|false|null)\b|\b-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?\b)/g, function (match) {
			var cls = 'text-gray-500';
			if (/^"/.test(match)) {
					if (/:$/.test(match)) {
							cls = 'text-yellow-500';
					} else {
							cls = 'text-blue-500';
					}
			} else if (/true|false/.test(match)) {
					cls = 'text-green-500';
			} else if (/null/.test(match)) {
					cls = 'text-red-500';
			}
			return '<span class="' + cls + '">' + match + '</span>';
	});
}

const prettifyJson = (jsonString: string) => {
  try {
    const jsonObj = JSON.parse(jsonString);
    const prettyJsonString = JSON.stringify(jsonObj, null, 2);
    return syntaxHighlight(prettyJsonString);
  } catch (e) {
    return 'Error: Invalid JSON';
  }
};

const JsonPrettifier = ({ jsonString }: { jsonString: string }) => {
  const prettyHtml = prettifyJson(jsonString);
  return (
    <pre className="bg-black text-white p-4 text-wrap" dangerouslySetInnerHTML={{ __html: prettyHtml }} />
  );
};