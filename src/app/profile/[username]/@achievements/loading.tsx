export default function Loading() {
	return (
    <section className="md:col-span-2 p-4 bg-white rounded shadow">
			<h2 className="text-2xl font-bold mb-4">Achievements</h2>
      <div className="flex gap-4">
        <div className="animate-pulse bg-gray-200 w-20 h-20 rounded"></div>
        <div className="animate-pulse bg-gray-200 w-20 h-20 rounded"></div>
        <div className="animate-pulse bg-gray-200 w-20 h-20 rounded"></div>
      </div>
      </section>
  )
}