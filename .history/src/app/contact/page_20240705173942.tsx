import Footer from "../components/footer";
import Header from "../components/header";

const teamMembers = [
	{
		name: "Username1",
		role: "Founder & Leader",
		imgSrc: "https://via.placeholder.com/150",
	},
	{
		name: "Username2",
		role: "Co-Leader & Strategist",
		imgSrc: "https://via.placeholder.com/150",
	},
	{
		name: "Username3",
		role: "Community Manager",
		imgSrc: "https://via.placeholder.com/150",
	},
	// Add more team members as needed
];

export default function AboutUS() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<div className="container mx-auto p-4">
				
			</div>
			<Footer />
		</div>
	);
}
