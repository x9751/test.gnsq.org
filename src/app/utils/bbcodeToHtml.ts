const bbcodeToHtml = (text: string) => {
	const rules: { [key: string]: string } = {
		"\\[b\\](.*?)\\[/b\\]": "<strong>$1</strong>",
		"\\[i\\](.*?)\\[/i\\]": "<em>$1</em>",
		"\\[u\\](.*?)\\[/u\\]": "<u>$1</u>",
		"\\[url=(.*?)\\](.*?)\\[/url\\]": '<a href="$1" target="_blank">$2</a>',
		"\\[img=(.*?)\\](.*?)\\[/img\\]": '<img src="$1" alt="$2" />',
		"\\[color=(.*?)\\](.*?)\\[/color\\]": '<span style="color: $1">$2</span>',
		"\\[size=(.*?)\\](.*?)\\[/size\\]": '<span style="font-size: $1">$2</span>',
		"\\[align=(.*?)\\](.*?)\\[/align\\]":
			'<div style="text-align: $1">$2</div>',
	};

	let html = text;
	for (const rule in rules) {
		const regex = new RegExp(rule, "g");
		html = html.replace(regex, rules[rule]);
	}

	return html;
};
export default bbcodeToHtml;