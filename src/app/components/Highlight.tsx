export default function Hightlight({ text = "", highlight = "", className = "" }) {
	if (!highlight.trim()) {
		return <span>{text}</span>;
	}

	const regex = new RegExp(`(${highlight})`, "gi");
	const parts = text.split(regex);

	return (
		<span>
			{parts
				.filter((part) => part)
				.map((part, i) =>
					regex.test(part) ? (
						<span key={i} className={className || "bg-green-300"}>
							{part}
						</span>
					) : (
						part
					)
				)}
		</span>
	);
}
