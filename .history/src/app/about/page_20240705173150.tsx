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
				<section className="mb-8">
					<h2 className="text-3xl font-bold mb-4">About GNSQ</h2>
					<p className="text-gray-700 mb-4">
						Welcome to GNSQ, where fun and camaraderie come first! We're
						a group of gaming enthusiasts who love to play games, share tips,
						and enjoy the occasional meme. Join us for exciting gaming sessions,
						forums, and more.
					</p>
					<img
						src="https://via.placeholder.com/800x400"
						alt="Gaming Group"
						className="w-full rounded shadow"
					/>
				</section>
				<section className="mb-8">
					<h2 className="text-3xl font-bold mb-4">Our Mission</h2>
					<p className="text-gray-700">
						Our mission is to build a vibrant and inclusive community for gamers
						of all skill levels. Whether you're here to compete, learn, or just
						hang out, Goons Gaming is the place for you!
					</p>
				</section>
				<section className="mb-8">
					<h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{teamMembers.map((member) => (
							<div
								key={member.name}
								className="bg-white p-4 rounded shadow text-center"
							>
								<img
									src={member.imgSrc}
									alt={member.name}
									className="w-24 h-24 rounded-full mx-auto mb-2"
								/>
								<h3 className="text-xl font-bold mb-2">{member.name}</h3>
								<p className="text-gray-600">{member.role}</p>
							</div>
						))}
					</div>
				</section>
			</div>
			<Footer />
		</div>
	);
}
