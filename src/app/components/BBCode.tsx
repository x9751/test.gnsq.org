import { useState, useRef } from "react";

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
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
		onChange?.(event.target.value);
	};

	const wrapSelectedText = (openTag: string, closeTag: string) => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;
		const selectedText = text.substring(start, end);
		
		let newText: string;
		
		if (start === end) {
			// No text selected, wrap entire content
			newText = `${openTag}${text}${closeTag}`;
		} else {
			// Text selected, wrap only selected portion
			const beforeText = text.substring(0, start);
			const afterText = text.substring(end);
			newText = `${beforeText}${openTag}${selectedText}${closeTag}${afterText}`;
		}

		setText(newText);
		onChange?.(newText);

		// Set cursor position after the inserted tags
		setTimeout(() => {
			textarea.focus();
			if (start === end) {
				// If no text was selected, place cursor at the end
				textarea.setSelectionRange(newText.length, newText.length);
			} else {
				// If text was selected, place cursor after the inserted tags
				textarea.setSelectionRange(
					start + openTag.length,
					end + openTag.length
				);
			}
		}, 0);
	};

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex gap-2 items-center flex-wrap">
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => wrapSelectedText("[b]", "[/b]")}
				>
					B
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => wrapSelectedText("[i]", "[/i]")}
				>
					I
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => wrapSelectedText("[u]", "[/u]")}
				>
					U
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => wrapSelectedText("[url=https://google.com]", "[/url]")}
				>
					Link
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => wrapSelectedText("[img=https://google.com]", "[/img]")}
				>
					Image
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => wrapSelectedText("[color=red]", "[/color]")}
				>
					Color
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => wrapSelectedText("[size=20px]", "[/size]")}
				>
					Size
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onClick={() => wrapSelectedText("[align=center]", "[/align]")}
				>
					Align
				</button>
			</div>
			<textarea
				ref={textareaRef}
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