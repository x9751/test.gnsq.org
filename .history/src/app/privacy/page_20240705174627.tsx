import Footer from "../components/footer";
import Header from "../components/header";

export default function AboutUS() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<div className="container mx-auto p-4">
				<Section title="Privacy Policy">
					At Goons Gaming, we are committed to protecting your privacy. This
					Privacy Policy explains how we collect, use, and protect your personal
					information.
				</Section>
				<Section title="Data Collection">
					We collect information that you provide to us directly, such as when
					you create an account, post in forums, or contact us. This may include
					your name, email address, and other contact information. We also
					collect information automatically, such as your IP address, browser
					type, and activity on our site, to help us improve our services.
				</Section>
				<Section title="Data Usage">
					We use the information we collect to provide, maintain, and improve
					our services, to communicate with you, and to protect our users.
				</Section>
				<Section title="Data Protection">
					We implement a variety of security measures to maintain the safety of
					your personal information. However, no method of transmission over the
					Internet, or method of electronic storage, is 100% secure.
				</Section>
				<Section title="User Rights">
					You have the right to access, correct, or delete your personal
					information. You can also object to or restrict certain processing of
					your data.
				</Section>
				<Section title="Contact Information">
					If you have any questions or concerns about our Privacy Policy, please
					contact us at{" "}
					<a
						href="mailto:privacy@gnsq.org"
						className="text-green-600 hover:underline"
					>
						privacy@gnsq.org
					</a>
					.
				</Section>
			</div>
			<Footer />
		</div>
	);
}

const Section = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<section className="mb-8">
		<h3 className="text-2xl font-bold mb-4">{title}</h3>
		<p className="text-gray-700">{children}</p>
	</section>
);
