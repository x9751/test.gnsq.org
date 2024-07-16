import { useState } from "react";

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

const BBCodeEditor: React.FC<{
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	name?: string;
	maxLength?: number;
}> = ({ value, onChange, placeholder, name, maxLength }) => {
	const [text, setText] = useState(value || "");

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
		onChange?.(event.target.value);
	};

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex gap-2">
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => {
						setText(`[b]${text}[/b]`);
					}}
				>
					B
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => {
						setText(`[i]${text}[/i]`);
					}}
				>
					I
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => {
						setText(`[u]${text}[/u]`);
					}}
				>
					U
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => {
						setText(`[url=https://google.com]${text}[/url]`);
					}}
				>
					Link
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => {
						setText(`[img=https://google.com]${text}[/img]`);
					}}
				>
					Image
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => {
						setText(`[color=red]${text}[/color]`);
					}}
				>
					Color
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => {
						setText(`[size=20px]${text}[/size]`);
					}}
				>
					Size
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => {
						setText(`[align=center]${text}[/align]`);
					}}
				>
					Align
				</button>
			</div>
			<textarea
				name={name}
				className="w-full h-32 p-2 border rounded-md resize-none"
				maxLength={maxLength || 1000}
				rows={2}
				value={text}
				onChange={handleChange}
				placeholder={placeholder || "Enter BBCode here..."}
			/>
			<div
				className="p-2 border rounded-md bg-gray-100 whitespace-pre-wrap"
				dangerouslySetInnerHTML={{ __html: bbcodeToHtml(text) }}
			/>
		</div>
	);
};

export default BBCodeEditor;
