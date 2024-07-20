export default function Modal({ children }: { children: React.ReactNode }) {
	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
			<div className="bg-white p-4 rounded-md w-[90%] max-w-[600px] max-h-[600px] overflow-hidden">
				{children}
			</div>
		</div>
	);
}
