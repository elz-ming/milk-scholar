"use client";

import { useParams } from "next/navigation";
import { USERS } from "@/app/data/userData";
import Sidebar from "../../subcomponents/Sidebar";
import { notFound } from "next/navigation";
import Image from "next/image";

export default function UserProfile() {
  const { id } = useParams();
  const userId = parseInt(id as string, 10);
  const user = USERS.find((u) => u.id === userId);

  if (!user) {
    notFound(); // ✅ works fine if used like this in a client component
  }

  return (
    <main className="flex min-h-screen">
      <Sidebar />

      <section className="flex-1 p-8 bg-gray-100">
        <div className="flex items-center gap-6 mb-6">
          <Image
            src={user.image}
            alt={`${user.name} profile`}
            width={120}
            height={120}
            className="rounded-full"
          />
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-gray-600">{user.institution}</p>
            <p className="text-gray-600">
              {user.gender}, {user.age} years old
            </p>
            <p className="mt-2">
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  user.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : user.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {user.status}
              </span>
            </p>
          </div>
        </div>

        <p className="mb-2">
          <strong>LinkedIn:</strong>{" "}
          <a
            href={user.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            View Profile
          </a>
        </p>
      </section>
    </main>
  );
}
