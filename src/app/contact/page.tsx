import Footer from "../components/footer";
import Header from "../components/header";
import Form from "./form";

export default function AboutUS() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<div className="container mx-auto p-4">
			<section className="p-4 bg-white rounded shadow">
			<h2 className="text-3xl font-bold mb-4">Contact Us</h2>
			<Form />
		</section>
				<section className="mt-8 p-4 bg-white rounded shadow">
					<h2 className="text-3xl font-bold mb-4">Our Contact Details</h2>
					<ul className="text-gray-700">
						<li>
							Email:{" "}
							<a
								href="mailto:info@gnsq.org"
								className="text-green-600 hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								info@gnsq.org
							</a>
						</li>
						<li>
							Twitter:{" "}
							<a
								href="https://twitter.com/gnsq"
								className="text-green-6000 hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								@gnsq
							</a>
						</li>
						<li>
							Discord:{" "}
							<a
								href="https://discord.com/invite/UKF34DVKUj"
								className="text-green-600 hover:underline"
								target="_blank"
								rel="noopener noreferrer"
							>
								Join Our Discord
							</a>
						</li>
						{/* Add more contact details as needed */}
					</ul>
				</section>
			</div>
			<Footer />
		</div>
	);
}
