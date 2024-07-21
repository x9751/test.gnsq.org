import { useState, useRef, useEffect } from "react";

const bbcodeToHtml = (text: string) => {
	const rules: { [key: string]: string } = {
		"\\[b\\](.*?)\\[/b\\]": "<strong>$1</strong>",
		"\\[i\\](.*?)\\[/i\\]": "<em>$1</em>",
		"\\[u\\](.*?)\\[/u\\]": "<u>$1</u>",
		"\\[url=(.*?)\\](.*?)\\[/url\\]": '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>',
		"\\[img(\\s+width=(\\d+px))?(\\s+height=(\\d+px))?\\](.*?)\\[/img\\]": 
			'<img src="$5" alt="" $1 $3 />',
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
	required?: boolean;	
}> = ({ value, onChange, placeholder, name, maxLength, required }) => {
	const [text, setText] = useState(value || "");
	const [history, setHistory] = useState<string[]>([]);
	const [isFocused, setIsFocused] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const cursorPositionRef = useRef<{ start: number; end: number }>({ start: 0, end: 0 });

	useEffect(() => {
		const handleUndo = (event: KeyboardEvent) => {
			if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
				event.preventDefault();
				undoChange();
			}
		};

		document.addEventListener('keydown', handleUndo);
		return () => {
			document.removeEventListener('keydown', handleUndo);
		};
	}, [history]);

	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newText = event.target.value;
		setHistory([...history, text]);
		setText(newText);
		onChange?.(newText);
	};

	const handleMouseDown = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			cursorPositionRef.current = {
				start: textarea.selectionStart,
				end: textarea.selectionEnd,
			};
		}
	};

	const handleFocus = () => {
		setIsFocused(true);
	};

	const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
		if (!event.currentTarget.contains(event.relatedTarget as Node)) {
			setIsFocused(false);
		}
	};

	const wrapSelectedText = (openTag: string, closeTag: string) => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const { start, end } = cursorPositionRef.current;
		const selectedText = text.substring(start, end);

		let newText: string;

		if (start === end) {
			if (isFocused) {
				// No text selected, insert at cursor position
				const beforeText = text.substring(0, start);
				const afterText = text.substring(start);
				newText = `${beforeText}${openTag}${closeTag}${afterText}`;
			} else {
				// No text selected, cursor is not active, wrap entire content
				newText = `${openTag}${text}${closeTag}`;
			}
		} else {
			// Text selected, wrap only selected portion
			const beforeText = text.substring(0, start);
			const afterText = text.substring(end);
			newText = `${beforeText}${openTag}${selectedText}${closeTag}${afterText}`;
		}

		setHistory([...history, text]);
		setText(newText);
		onChange?.(newText);

		// Set cursor position after the inserted tags
		setTimeout(() => {
			textarea.focus();
			if (start === end) {
				if (isFocused) {
					// If no text was selected, place cursor between the tags
					textarea.setSelectionRange(start + openTag.length, start + openTag.length);
				} else {
					// If cursor was not active, place cursor at the end
					textarea.setSelectionRange(newText.length, newText.length);
				}
			} else {
				// If text was selected, place cursor after the inserted tags
				textarea.setSelectionRange(start + openTag.length, end + openTag.length);
			}
		}, 0);
	};

	const undoChange = () => {
		if (history.length > 0) {
			const previousText = history.pop()!;
			setText(previousText);
			setHistory([...history]);
			onChange?.(previousText);
		}
	};

	return (
		<div className="flex flex-col gap-2 w-full">
			<div className="flex gap-2 items-center flex-wrap">
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onMouseDown={handleMouseDown}
					onClick={() => wrapSelectedText("[b]", "[/b]")}
				>
					B
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onMouseDown={handleMouseDown}
					onClick={() => wrapSelectedText("[i]", "[/i]")}
				>
					I
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onMouseDown={handleMouseDown}
					onClick={() => wrapSelectedText("[u]", "[/u]")}
				>
					U
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onMouseDown={handleMouseDown}
					onClick={() => wrapSelectedText("[url=https://google.com]", "[/url]")}
				>
					Link
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onMouseDown={handleMouseDown}
					onClick={() => wrapSelectedText("[img=https://google.com]", "[/img]")}
				>
					Image
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onMouseDown={handleMouseDown}
					onClick={() => wrapSelectedText("[color=red]", "[/color]")}
				>
					Color
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onMouseDown={handleMouseDown}
					onClick={() => wrapSelectedText("[size=20px]", "[/size]")}
				>
					Size
				</button>
				<button
					type="button"
					className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
					onMouseDown={handleMouseDown}
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
				onFocus={handleFocus}
				onBlur={handleBlur}
				placeholder={placeholder || "Enter BBCode here..."}
				required={required}
			/>
			<div
				className="p-2 border rounded-md bg-gray-100 whitespace-pre-wrap max-h-[100px] overflow-y-auto"
				dangerouslySetInnerHTML={{ __html: bbcodeToHtml(text) }}
			/>
		</div>
	);
};

export default BBCodeEditor;