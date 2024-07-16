export default function Loading() {
	return (
		<div className="flex items-center justify-center h-screen w-screen">
			<div className="w-16 h-16 border-t-4 border-b-4 border-green-500 rounded-full animate-spin flex items-center justify-center">
				<span className="text-green-500 text-xs">Loading...</span>
			</div>
		</div>
	);
}