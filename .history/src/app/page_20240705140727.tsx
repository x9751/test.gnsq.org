import Header from "./components/header";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <section class="mb-8">
            <h2 class="text-3xl font-bold mb-4">Welcome to Goons Gaming</h2>
            <p class="mb-4">Join us for fun and engaging gaming sessions. Check out the latest forum posts below:</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <article class="bg-white p-4 rounded shadow">
                    <h3 class="text-xl font-bold mb-2">Forum Post Title</h3>
                    <p class="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec...</p>
                    <a href="#" class="text-green-600 hover:underline">Read More</a>
                </article>
                <!-- Repeat for more posts -->
            </div>
        </section>
        <section>
            <h2 class="text-3xl font-bold mb-4">Upcoming Events</h2>
            <ul>
                <li class="mb-2">Game Night - <strong>Friday 8 PM</strong></li>
                <li class="mb-2">Tournament - <strong>Saturday 3 PM</strong></li>
                <!-- More events -->
            </ul>
        </section>
      <Footer />
    </main>
  );
}
