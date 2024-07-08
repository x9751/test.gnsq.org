import Footer from "../components/footer";
import Header from "../components/header";
import ContactForm from "./form";


export default function AboutUS() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<div className="container mx-auto p-4">
				<ContactForm />
			</div>
			<Footer />
		</div>
	);
}


