export default function Footer() {
  return (
    <footer className="bg-green-600 p-4 text-white text-center">
        <p>&copy; 2024 Goons Gaming Group. All rights reserved.</p>
        <ul className="flex justify-center space-x-4">
            <li><a href="#" className="hover:underline">Contact</a></li>
            <li><a href="#" className="hover:underline">Privacy</a></li>
        </ul>
    </footer>
  );
}