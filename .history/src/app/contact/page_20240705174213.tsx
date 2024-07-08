import Footer from "../components/footer";
import Header from "../components/header";
import ContactForm from "./form";


export default function AboutUS() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<div className="container mx-auto p-4">
				<ContactForm />
        <section className="mt-8 p-4 bg-white rounded shadow">
        <h2 className="text-3xl font-bold mb-4">Our Contact Details</h2>
        <ul className="text-gray-700">
            <li>Email: <a href="mailto:info@goonsgaming.com" className="text-green-600 hover:underline">info@goonsgaming.com</a></li>
            <li>Twitter: <a href="https://twitter.com/goonsgaming" className="text-green-600 hover:underline">@goonsgaming</a></li>
            <li>Discord: <a href="https://discord.com/invite/goonsgaming" className="text-green-600 hover:underline">Join Our Discord</a></li>
            {/* Add more contact details as needed */}
        </ul>
    </section>
			</div>
			<Footer />
		</div>
	);
}


