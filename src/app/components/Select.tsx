import { useEffect, useRef, useState } from "react";

type SelectProps = {
	options: {
		value: string;
		label: string;
	}[];
	value: string;
	onChange: (value: string) => void;
};

export default function Select({ options, value, onChange }: SelectProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedLabel, setSelectedLabel] = useState("");
	const dropdownRef = useRef(null);

	useEffect(() => {
		const selectedOption = options.find((option) => option.value === value);
		setSelectedLabel(selectedOption ? selectedOption.label : "");
	}, [value, options]);

	const handleClickOutside = (event: MouseEvent) => {
    console.log("clicked outside", dropdownRef.current);
		// if (
		// 	dropdownRef.current &&
		// 	!dropdownRef.current.contains(event.target as Node)
		// ) {
			
		// }
    // setIsOpen(false);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	return (
		<div
			className="relative inline-block w-full text-gray-700"
			ref={dropdownRef}
		>
			<div
				className="w-full h-10 pl-3 pr-5 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline cursor-pointer flex items-center justify-between"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>{selectedLabel}</span>
				<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
					<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
				</svg>
			</div>
			{isOpen && (
				<div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
					{options.map((option) => (
						<div
							key={option.value}
							className="px-4 py-2 cursor-pointer hover:bg-gray-200"
							onClick={() => {
								onChange(option.value);
								setIsOpen(false);
							}}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
