import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "./sidebar";

export default function Profile() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<div className="container mx-auto p-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Sidebar />
				</div>
			</div>
			<Footer />
		</div>
	);
}
