import Header from "../components/header";
import Footer from "../components/footer";

export default function Messages() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <div className="container mx-auto p-4 flex flex-col sm:flex-row">
      <aside className="w-1/4 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Conversations</h2>
        <ul>
            <li className="mb-2"><a href="/messages/123" className="flex items-center space-x-2 text-green-600 hover:underline">
                <img src="https://via.placeholder.com/40" alt="User Avatar" className="w-10 h-10 rounded-full">
                <div>
                    <p className="font-bold">User123</p>
                    <p className="text-sm text-gray-600">Last message preview...</p>
                </div>
            </a></li>
            {/* Repeat for more conversations */}
        </ul>
    </aside>
      </div>
      <Footer />
    </main>
  )
}