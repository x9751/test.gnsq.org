import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import { getUser } from "@/db/auth";
import { redirect } from "next/navigation";

export default async function Layout({
	children,
	activity,
	achievements,
}: {
	children: React.ReactNode;
	activity: React.ReactNode;
	achievements: React.ReactNode;
}) {
	const logged = await getUser();
	if (!logged) {
		redirect("/login?redirect=/me");
	}
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<main className="flex-1">
				<div className="container mx-auto p-4">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{children}
						{activity}
					</div>
					{achievements}
				</div>
			</main>
			<Footer />
		</div>
	);
}
