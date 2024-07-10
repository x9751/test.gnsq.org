import Footer from "../components/footer";
import Header from "../components/header";
// import ForumSearch from "./search";

export default function Layout({
	children,
	search,
}: {
	children: React.ReactNode;
	search: React.ReactNode;
}) {
	return (
		<main className="flex min-h-screen flex-col">
			<Header />
			<div className="w-full max-w-3xl mx-auto p-4 flex flex-col">
				{search}
				{children}
			</div>
			<Footer />
		</main>
	);
}
