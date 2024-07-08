"use client";
import Image from "next/image";

import { useState } from "react";

export default function Sidebar() {
  const [isEditing, setIsEditing] = useState(false);

    return (
        <aside className="md:col-span-1 p-4 bg-white rounded shadow">
            <div className="text-center">
                <Image 
                    width={150}
                    height={150}
                    src="https://via.placeholder.com/150" 
                    alt="User Avatar" 
                    className="rounded-full mx-auto mb-2" 
                />
                <h2 className="text-xl font-bold mb-2">Username</h2>
                <p className="text-gray-600 mb-2">Gamer &amp; Enthusiast</p>
                <button 
                    onClick={() => setIsEditing(!isEditing)} 
                    className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700"
                >
                    {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
                {isEditing && (
                    <form className="mt-4">
                        <input type="text" placeholder="Username" className="w-full p-2 mb-2 border rounded"/>
                        <input type="text" placeholder="Bio" className="w-full p-2 mb-2 border rounded"/>
                        {/* Additional form fields as needed */}
                    </form>
                )}
            </div>
        </aside>
    );
}