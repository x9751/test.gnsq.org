export default function Loading() {
	return (
		<div className="bg-white p-4 rounded shadow mb-4 flex flex-col gap-2">
			<div className="w-full h-5 rounded bg-gray-300 animate-pulse"></div>
			<div className="w-full h-5 rounded bg-gray-300 animate-pulse"></div>
			<div className="w-full h-5 rounded bg-gray-300 animate-pulse"></div>
		</div>
	);
}
