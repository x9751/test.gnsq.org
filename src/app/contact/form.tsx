"use client";
import { useFormState, useFormStatus } from "react-dom";
import { submitForm } from "./actions";


export default function Form() {
 const [formStatus, formAction] = useFormState(submitForm, { success: false, message: "" });

  return (
    <form
				className="grid grid-cols-1 md:grid-cols-2 gap-4"
        action={formAction}
			>
				<div className="md:col-span-1">
					<label htmlFor="name" className="block mb-2 text-gray-700">
						Name
					</label>
					<input
						type="text"
						id="name"
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
						className="w-full p-2 border rounded"
						rows={5}
						required
					></textarea>
				</div>
        {formStatus.success && <p className="mt-4 text-green-600">{formStatus.message}</p>}
        {!formStatus.success && <p className="mt-4 text-red-600">{formStatus.message}</p>}
				<div className="md:col-span-2">
					<SubmitButton />
				</div>
			</form>
  )
}

function SubmitButton() {
  const formStatus = useFormStatus();

  return (
    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
      {formStatus.pending ? "Sending..." : "Send Message"}
    </button>
  )
}