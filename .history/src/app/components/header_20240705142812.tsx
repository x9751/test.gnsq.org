import Link from "next/link"
export default function Header() {
  return (
    <header className="bg-green-600 p-4 text-white">
        <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold">GNSQ</h1>
            <ul className="flex space-x-4">
                <li><Link href="/" className="hover:underline">Home</Link></li>
                <li><Link href="/forums" className="hover:underline">Forums</Link></li>
                <li><Link href="/messages" className="hover:underline">Messages</Link></li>
                <li><Link href="/about" className="hover:underline">About Us</Link></li>
                <li><Link href="/profile" className="hover:underline">Profile</Link></li>
            </ul>
        </nav>
    </header>
  )
}