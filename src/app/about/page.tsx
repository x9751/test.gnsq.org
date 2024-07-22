import Image from "next/image";
import Footer from "../components/footer";
import Header from "../components/header";
import UserAvatar from "../components/UserAvatar";

const teamMembers = [
	{
		name: "Jenkins",
		role: "Goon Captian",
		imgSrc: "/pirate_logo.jpeg",
	},
	{
		name: "Cheeto",
		role: "Goon High Council GodFather",
		imgSrc: "/pirate_logo.jpeg",
	},
	{
		name: "Troy",
		role: "Goon High Council VP",
		imgSrc: "/pirate_logo.jpeg",
	},
	{
		name: "Splitcoin",
		role: "Goon High Council SpitRoast",
		imgSrc: "/pirate_logo.jpeg",
	},
	{
		name: "Cevichewey",
		role: "Goon High Council BigGulp",
		imgSrc: "/pirate_logo.jpeg",
	},
	{
		name: "Tortas0441",
		role: "Goon High Council TeamKiller",
		imgSrc: "/pirate_logo.jpeg",
	},
	{
		name: "Zeelola",
		role: "Goon High Council HR",
		imgSrc: "/pirate_logo.jpeg",
	},
];

export default async function AboutUS() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<div className="container mx-auto p-4">
				<section className="mb-8">
					<h2 className="text-3xl font-bold mb-4">About GNSQ</h2>
					<p className="text-gray-700 mb-4">
						Welcome to GNSQ, where fun and camaraderie come first! We&apos;re a
						group of gaming enthusiasts who love to play games, share tips, and
						enjoy the occasional meme. Join us for exciting gaming sessions,
						forums, and more.
					</p>
					<Image
						src="/community_about_us.webp"
						alt="Gaming Group"
						className="w-full rounded shadow max-w-4xl mx-auto"
						width={800}
						height={400}
					/>
				</section>
				<section className="mb-8">
					<h2 className="text-3xl font-bold mb-4">Our Mission</h2>
					<p className="text-gray-700">
						Our mission is to build a vibrant and inclusive community for gamers
						of all skill levels. Whether you&apos;re here to compete, learn, or
						just hang out, GNSQ is the place for you!
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
								<UserAvatar
									width={150}
									height={150}
									currentAvatar={member.imgSrc}
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
