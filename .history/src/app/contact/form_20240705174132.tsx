"use client";
import { useState } from "react";

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [formStatus, setFormStatus] = useState("");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [id]: value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Replace with form submission logic (e.g., API call)
		setFormStatus("Your message has been sent!");
	};

	return (
		<section className="p-4 bg-white rounded shadow">
			<h2 className="text-3xl font-bold mb-4">Contact Us</h2>
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-1 md:grid-cols-2 gap-4"
			>
				<div className="md:col-span-1">
					<label htmlFor="name" className="block mb-2 text-gray-700">
						Name
					</label>
					<input
						type="text"
						id="name"
						value={formData.name}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div className="md:col-span-1">
					<label htmlFor="email" className="block mb-2 text-gray-700">
						Email
					</label>
					<input
						type="email"
						id="email"
						value={formData.email}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div className="md:col-span-2">
					<label htmlFor="subject" className="block mb-2 text-gray-700">
						Subject
					</label>
					<input
						type="text"
						id="subject"
						value={formData.subject}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						required
					/>
				</div>
				<div className="md:col-span-2">
					<label htmlFor="message" className="block mb-2 text-gray-7000">
						Message
					</label>
					<textarea
						id="message"
						value={formData.message}
						onChange={handleChange}
						className="w-full p-2 border rounded"
						rows={5}
						required
					></textarea>
				</div>
				<div className="md:col-span-2">
					<button
						type="submit"
						className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
					>
						Send Message
					</button>
				</div>
			</form>
			{formStatus && <p className="mt-4 text-green-600">{formStatus}</p>}
		</section>
	);
};