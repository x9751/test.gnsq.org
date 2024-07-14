export default function Loading() {
	return (
		<div className="flex flex-col md:flex-row justify-between items-center gap-4 relative mb-4 bg-white rounded-lg p-4">
			<h2 className="text-2xl font-bold">Forums</h2>
			<div className="flex gap-2 w-full md:w-1/2">
				<div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse" />
				<div className="w-20 h-10 bg-gray-200 rounded-lg animate-pulse" />
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
			</div>
		</div>
	);
}
