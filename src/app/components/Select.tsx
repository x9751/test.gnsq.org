import { useEffect, useRef, useState } from "react";

type SelectProps = {
	options: {
		value: string;
		label: string;
	}[];
	value?: string;
	onChange?: (value: string) => void;
	name?: string;
	disabled?: boolean;
	placeholder?: string;
	required?: boolean;
};

export default function Select({ options, value, onChange, disabled, name, placeholder, required }: SelectProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [selectedLabel, setSelectedLabel] = useState("");
	const dropdownRef = useRef(null);

	useEffect(() => {
		const selectedOption = options.find((option) => option.value === value);
		setSelectedLabel(selectedOption ? selectedOption.label : "");
	}, [value, options]);


	return (
		<div
			className="relative inline-block w-full text-gray-700"
			ref={dropdownRef}
		>
			<input type="hidden" name={name} ref={inputRef} required={required} />
			<div
				className={`w-full h-10 pl-3 pr-5 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline cursor-pointer flex items-center justify-between hover:bg-gray-100 ${disabled ? "bg-gray-200" : "cursor-pointer"}`}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span>{selectedLabel || placeholder}</span>
				<svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
					<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
				</svg>
			</div>
			{isOpen && (
				<div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg z-10">
					<div className="max-h-[200px] overflow-y-auto">
					{options.map((option) => (
						<div
							key={option.value}
							className="px-4 py-2 cursor-pointer hover:bg-gray-200"
							onClick={() => {
								if (disabled) return;
								onChange?.(option.value);
								setSelectedLabel(option.label);
								setIsOpen(false);
								if (inputRef.current) {
									inputRef.current.value = option.value;
								}
							}}
						>
							{option.label}
						</div>
					))}
						</div>
				</div>
			)}
		</div>
	);
}
