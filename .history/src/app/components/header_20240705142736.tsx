export default function Header() {
  return (
    <header className="bg-green-600 p-4 text-white">
        <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">GNSQ</h1>
            <ul className="flex space-x-4">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">Forums</a></li>
                <li><a href="#" className="hover:underline">Messages</a></li>
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Profile</a></li>
            </ul>
        </nav>
    </header>
  )
}