import Footer from "../components/footer";
import Header from "../components/header";
import Sidebar from "./sidebar";

const recentActivities = [
  { activity: 'Posted in General Discussion', content: 'Excited for the new game update!', link: '#' },
  { activity: 'Replied to a thread in Game Tips', content: 'Here are some tips for the latest update...', link: '#' },
  // Add more activities as needed
];
export default function Profile() {
	return (
		<div className="flex min-h-screen flex-col">
			<Header />
			<div className="container mx-auto p-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Sidebar />
          <section className="md:col-span-2 p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        {recentActivities.map((activity, index) => (
            <div key={index} className="mb-4">
                <p className="text-gray-600 mb-2">
                    {activity.activity} <a href={activity.link} className="text-green-600 hover:underline">{activity.link}</a>
                </p>
                <p className="text-gray-800">{activity.content}</p>
            </div>
        ))}
    </section>
				</div>
			</div>
			<Footer />
		</div>
	);
}
